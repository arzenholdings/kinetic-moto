import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const response = Response.redirect(new URL("/admin/login", request.url), 303);
  response.headers.append("Set-Cookie", `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);

  return response;
}
