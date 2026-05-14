import Link from "next/link";
import { launchCandidates, type LaunchCandidateStatus } from "@/lib/launch-catalog";

const statusStyles: Record<LaunchCandidateStatus, string> = {
  dealer_pending: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
  pre_application: "border-amber-300/30 bg-amber-400/10 text-amber-100",
  verify_channel: "border-sky-300/30 bg-sky-400/10 text-sky-100",
};

export function LaunchCatalogSection() {
  return (
    <section id="featured-bikes" className="bg-stone-950 px-6 py-20 sm:px-8 lg:px-12" aria-labelledby="launch-catalog-heading">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Launch catalog</p>
            <h2 id="launch-catalog-heading" className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              Real brands, pending authorization.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-stone-300">
            Kinetic Moto is building the first dealer-approved catalog around brand-name e-motos. Products go live only after source, media, pricing, warranty, and fulfillment terms are confirmed.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {launchCandidates.map((candidate) => (
            <article key={candidate.brand} className="flex h-full flex-col overflow-hidden rounded-3xl border border-stone-800 bg-stone-900/70 shadow-xl shadow-black/20">
              <div className={`relative min-h-44 bg-gradient-to-br ${candidate.accent} p-6`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,_rgba(255,255,255,0.16),_transparent_28%)]" />
                <div className="relative flex h-full flex-col justify-between gap-10">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
                      {candidate.category}
                    </span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${statusStyles[candidate.status]}`}>
                      {candidate.statusLabel}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-200">Target brand</p>
                    <h3 className="mt-2 text-4xl font-black tracking-tight text-white">{candidate.brand}</h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="leading-7 text-stone-300">{candidate.summary}</p>
                <div className="mt-5">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-stone-500">Candidate models</p>
                  <p className="mt-2 font-semibold text-stone-100">{candidate.models.join(", ")}</p>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
                  {candidate.needs.map((need) => (
                    <span key={need} className="rounded-2xl bg-stone-950 px-3 py-2 font-semibold text-stone-300">
                      {need}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/bikes" className="rounded-full bg-orange-500 px-7 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            View launch catalog
          </Link>
          <Link href="/partners" className="rounded-full border border-stone-600 px-7 py-4 text-center text-base font-bold text-white transition hover:border-orange-300 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Partner overview
          </Link>
        </div>
      </div>
    </section>
  );
}
