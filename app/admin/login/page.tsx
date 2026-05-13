import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { AdminLoginForm } from "@/components/admin-login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login | Kinetic Moto",
  description: "Sign in to the Kinetic Moto admin.",
};

type AdminLoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

function getSafeNextPath(value: string | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin/leads";
  }

  return value;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const nextPath = getSafeNextPath((await searchParams).next);
  const cookieStore = await cookies();
  const hasSession = await verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (hasSession) {
    redirect(nextPath);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="admin-login-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_50%,_#292524_100%)]" />
        <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-lg items-center py-14">
          <div className="w-full rounded-[2rem] border border-white/10 bg-stone-900/80 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Admin</p>
            <h1 id="admin-login-heading" className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Sign in
            </h1>
            <p className="mt-4 leading-7 text-stone-300">
              Access lead review, follow-up status, and internal sales notes.
            </p>
            <AdminLoginForm nextPath={nextPath} />
          </div>
        </div>
      </section>
    </main>
  );
}

