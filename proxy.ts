import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

const ADMIN_REALM = "Kinetic Moto Admin";

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
    },
  });
}

function getCredentials(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = atob(authorization.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  return handleAdminRequest(request);
}

async function handleAdminRequest(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  if (await verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.next();
  }

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    console.error("Admin route requested without ADMIN_USERNAME and ADMIN_PASSWORD configured.");
    return unauthorized();
  }

  const credentials = getCredentials(request);

  if (credentials?.username !== expectedUsername || credentials.password !== expectedPassword) {
    if (pathname.startsWith("/api/admin/")) {
      return Response.json({ error: "Authentication required." }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
