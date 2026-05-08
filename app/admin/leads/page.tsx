import type { Metadata } from "next";
import Link from "next/link";
import { AdminLeadsTable } from "@/components/admin-leads-table";
import { getContactLeads } from "@/lib/supabase-leads";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Leads | Kinetic Moto",
  description: "Contact lead management dashboard for Kinetic Moto.",
};

export default async function AdminLeadsPage() {
  const { leads, status, message } = await getContactLeads();

  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="admin-leads-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_50%,_#292524_100%)]" />
        <div className="mx-auto max-w-7xl py-14 lg:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Admin</p>
              <h1 id="admin-leads-heading" className="mt-3 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Contact leads
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
                Review recent contact form submissions, mark new leads as reviewed, and keep internal notes.
              </p>
            </div>
            <Link href="/contact" className="rounded-full border border-orange-400/30 bg-orange-400/10 px-5 py-3 text-center text-sm font-bold text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              View contact form
            </Link>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900/80 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="flex flex-col justify-between gap-3 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-black text-white">Recent leads</h2>
                <p className="mt-1 text-sm text-stone-400">Most recent submissions appear first.</p>
              </div>
              <span className="w-fit rounded-full bg-white/5 px-3 py-1 text-sm font-bold text-stone-300">
                {leads.length} {leads.length === 1 ? "lead" : "leads"}
              </span>
            </div>

            {leads.length > 0 ? (
              <AdminLeadsTable leads={leads} />
            ) : (
              <div className="px-6 py-16 text-center">
                <p className="text-2xl font-black text-white">No leads to show.</p>
                <p className="mx-auto mt-3 max-w-xl leading-7 text-stone-400">
                  {message || (status === "ready" ? "New contact form submissions will appear here." : "Lead data is unavailable right now.")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
