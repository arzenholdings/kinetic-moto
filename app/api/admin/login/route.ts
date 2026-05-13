import { ADMIN_SESSION_COOKIE, createAdminSessionToken, getAdminSessionMaxAge, isValidAdminPassword } from "@/lib/admin-auth";

type LoginRequestBody = {
  username?: unknown;
  password?: unknown;
};

const LOGIN_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const LOGIN_RATE_LIMIT_MAX_ATTEMPTS = 10;
const loginBuckets = new Map<string, { count: number; resetAt: number }>();

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  return forwardedFor || realIp || "unknown";
}

function isLoginRateLimited(key: string) {
  const now = Date.now();
  const current = loginBuckets.get(key);

  if (!current || current.resetAt <= now) {
    loginBuckets.set(key, {
      count: 1,
      resetAt: now + LOGIN_RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= LOGIN_RATE_LIMIT_MAX_ATTEMPTS) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function POST(request: Request) {
  let body: LoginRequestBody;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const username = readString(body.username);
  const password = readString(body.password);

  if (isLoginRateLimited(getClientKey(request))) {
    return Response.json({ error: "Too many sign-in attempts. Please try again later." }, { status: 429 });
  }

  if (!(await isValidAdminPassword(username, password))) {
    return Response.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  const token = await createAdminSessionToken(username);

  if (!token) {
    return Response.json({ error: "Admin authentication is not configured." }, { status: 503 });
  }

  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${ADMIN_SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${getAdminSessionMaxAge()}; ${process.env.NODE_ENV === "production" ? "Secure; " : ""}`
  );

  return response;
}
