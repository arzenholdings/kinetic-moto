import type { Metadata } from "next";
import Link from "next/link";
import { launchCandidates, type LaunchCandidateStatus } from "@/lib/launch-catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse Kinetic Moto launch catalog targets while dealer approvals and authorized product assets are being sourced.",
};

const statusStyles: Record<LaunchCandidateStatus, string> = {
  dealer_pending: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
  pre_application: "border-amber-300/30 bg-amber-400/10 text-amber-100",
  verify_channel: "border-sky-300/30 bg-sky-400/10 text-sky-100",
};

export default function BikesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="bikes-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.26),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_50%,_#292524_100%)]" />
        <div className="mx-auto max-w-7xl py-14 lg:py-20">
          <Link href="/" className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Kinetic Moto
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Product listing</p>
              <h1 id="bikes-heading" className="mt-3 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Launch catalog in sourcing.
              </h1>
            </div>
            <p className="text-lg leading-8 text-stone-300 sm:text-xl">
              These are the real target brands and model families Kinetic Moto is pursuing. Nothing here is presented as in-stock inventory until dealer authorization, approved media, pricing, warranty, and fulfillment terms are confirmed.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-950 px-6 pb-20 sm:px-8 lg:px-12" aria-label="Kinetic Moto launch catalog candidates">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {launchCandidates.map((candidate) => (
              <article key={candidate.brand} className="flex h-full flex-col rounded-3xl border border-stone-800 bg-stone-900/70 p-6 shadow-xl shadow-black/20">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-300">{candidate.category}</p>
                    <h2 className="mt-3 text-3xl font-black text-white">{candidate.brand}</h2>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${statusStyles[candidate.status]}`}>
                    {candidate.statusLabel}
                  </span>
                </div>
                <p className="mt-5 flex-1 leading-7 text-stone-300">{candidate.summary}</p>
                <div className="mt-6">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-stone-500">Target models</p>
                  <p className="mt-2 font-semibold text-stone-100">{candidate.models.join(", ")}</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2 text-sm">
                  {candidate.needs.map((need) => (
                    <span key={need} className="rounded-2xl bg-stone-950 px-3 py-2 font-semibold text-stone-300">
                      {need}
                    </span>
                  ))}
                </div>
                <Link href={`/contact?intent=product_question&brand=${encodeURIComponent(candidate.brand)}`} className="mt-6 inline-flex items-center justify-center rounded-full border border-stone-700 px-5 py-3 font-bold text-orange-200 transition hover:border-orange-300 hover:bg-orange-400 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-900">
                  Ask about {candidate.brand}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
