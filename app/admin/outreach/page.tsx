import type { Metadata } from "next";
import Link from "next/link";
import { getFirstWaveTargets, getOutreachStatusLabel, outreachTargets, type OutreachStatus } from "@/lib/outreach-targets";

export const metadata: Metadata = {
  title: "Admin Outreach | Kinetic Moto",
  description: "Dealer and manufacturer outreach tracker for Kinetic Moto.",
};

const statusStyles: Record<OutreachStatus, string> = {
  application_first: "border-sky-300/30 bg-sky-400/10 text-sky-100",
  ready_to_draft: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
  verify_first: "border-amber-300/30 bg-amber-400/10 text-amber-100",
  blocked: "border-red-300/30 bg-red-400/10 text-red-100",
};

export default function AdminOutreachPage() {
  const firstWave = getFirstWaveTargets();
  const readyCount = outreachTargets.filter((target) => target.status === "ready_to_draft" || target.status === "application_first").length;
  const verifyCount = outreachTargets.filter((target) => target.status === "verify_first").length;
  const blockedCount = outreachTargets.filter((target) => target.status === "blocked").length;

  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="admin-outreach-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_50%,_#292524_100%)]" />
        <div className="mx-auto max-w-7xl py-14 lg:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Admin</p>
              <h1 id="admin-outreach-heading" className="mt-3 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Dealer outreach
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
                Track first-wave dealer applications, drafting blockers, official contact paths, and the exact next action before Outlook sends anything.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/partners" className="rounded-full border border-orange-400/30 bg-orange-400/10 px-5 py-3 text-center text-sm font-bold text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
                Partner page
              </Link>
              <Link href="/admin/leads" className="rounded-full border border-stone-600 px-5 py-3 text-center text-sm font-bold text-stone-200 transition hover:border-stone-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
                Leads
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <Metric label="Total targets" value={outreachTargets.length.toString()} />
            <Metric label="First wave" value={firstWave.length.toString()} />
            <Metric label="Ready/application" value={readyCount.toString()} />
            <Metric label="Verify/blocked" value={(verifyCount + blockedCount).toString()} />
          </div>
        </div>
      </section>

      <section className="bg-stone-950 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8">
          <section className="rounded-[2rem] border border-white/10 bg-stone-900/80 shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="text-xl font-black text-white">First wave execution</h2>
              <p className="mt-1 text-sm text-stone-400">Draft these first in Outlook, but keep Ben review before send.</p>
            </div>
            <div className="grid divide-y divide-white/10">
              {firstWave.map((target) => (
                <OutreachCard key={target.brand} target={target} />
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-stone-900/80 shadow-2xl shadow-black/20">
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="text-xl font-black text-white">Research queue</h2>
              <p className="mt-1 text-sm text-stone-400">These brands need source verification before sending sensitive business details.</p>
            </div>
            <div className="grid divide-y divide-white/10">
              {outreachTargets
                .filter((target) => target.priority !== 1 || target.status === "verify_first")
                .map((target) => (
                  <OutreachCard key={target.brand} target={target} compact />
                ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-orange-300/20 bg-orange-400/10 p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-200">OpenClaw handoff</p>
            <h2 className="mt-3 text-3xl font-black text-white">Draft-first, send-second.</h2>
            <p className="mt-4 max-w-4xl leading-8 text-orange-100">
              Use <code className="rounded bg-stone-950/60 px-2 py-1 text-sm">docs/manufacturer-outreach.md</code> and the gitignored private profile for application-only fields. Do not include EIN, UBI, full address, phone, or reseller permit in casual first-contact emails unless a dealer form requires them.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-stone-400">{label}</p>
      <p className="mt-1 text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function OutreachCard({ target, compact = false }: { target: (typeof outreachTargets)[number]; compact?: boolean }) {
  return (
    <article className="grid gap-5 px-6 py-6 lg:grid-cols-[0.62fr_1.38fr]">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-black text-white">{target.brand}</h3>
          <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${statusStyles[target.status]}`}>
            {getOutreachStatusLabel(target.status)}
          </span>
        </div>
        <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-300">Priority {target.priority}</p>
        <p className="mt-4 leading-7 text-stone-300">{target.contactPath}</p>
        <p className="mt-4 text-sm text-stone-400">Models: {target.models.join(", ")}</p>
      </div>

      <div className="grid gap-5">
        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-stone-400">Next action</h4>
          <p className="mt-2 leading-7 text-stone-200">{target.nextAction}</p>
          <p className="mt-2 leading-7 text-stone-400">{target.openClawAction}</p>
        </div>

        {!compact && (
          <div className="grid gap-5 lg:grid-cols-2">
            <List title="Ask for" items={target.askFor} />
            <List title="Blockers / watchouts" items={target.blockers} />
          </div>
        )}

        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-stone-400">Official paths</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {target.officialUrls.length > 0 ? (
              target.officialUrls.map((url) => (
                <a key={url} href={url} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-stone-200 transition hover:border-orange-300/50 hover:text-orange-200">
                  {new URL(url).hostname}
                </a>
              ))
            ) : (
              <span className="text-sm text-stone-500">No verified URL yet.</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-stone-400">{title}</h4>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-stone-300">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}
