export const ADMIN_SESSION_COOKIE = "kinetic_admin_session";

const SESSION_TTL_SECONDS = 12 * 60 * 60;

type AdminSessionPayload = {
  sub: string;
  iat: number;
  exp: number;
};

function getAdminConfig() {
  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  const sessionSecret = (process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD)?.trim();

  if (!username || !password || !sessionSecret) {
    return null;
  }

  return {
    username,
    password,
    sessionSecret,
  };
}

function base64UrlEncode(value: string | ArrayBuffer) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));

  return base64UrlEncode(signature);
}

export async function isValidAdminPassword(username: string, password: string) {
  const config = getAdminConfig();

  if (!config) {
    return false;
  }

  return username === config.username && password === config.password;
}

export async function createAdminSessionToken(username: string) {
  const config = getAdminConfig();

  if (!config) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    sub: username,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await sign(encodedPayload, config.sessionSecret);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  const config = getAdminConfig();

  if (!config || !token) {
    return false;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return false;
  }

  const expectedSignature = await sign(encodedPayload, config.sessionSecret);

  if (signature !== expectedSignature) {
    return false;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSessionPayload;
    const now = Math.floor(Date.now() / 1000);

    return payload.sub === config.username && payload.exp > now;
  } catch {
    return false;
  }
}

export function getAdminSessionMaxAge() {
  return SESSION_TTL_SECONDS;
}

