import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dealer Partners",
  description: "Manufacturer and distributor partnership information for Kinetic Moto.",
};

const capabilities = [
  {
    title: "Brand-safe storefront",
    body: "A focused Next.js storefront with lead capture, product detail pages, analytics, and clear policy pages for terms, privacy, shipping, returns, warranty, financing, and legal-use expectations.",
  },
  {
    title: "Sales-intent workflow",
    body: "Incoming riders can identify model interest, financing interest, budget range, purchase timeframe, and follow-up needs before a sales conversation begins.",
  },
  {
    title: "Local support model",
    body: "Kinetic Moto is building toward setup guidance, pickup coordination, warranty routing, and practical rider support alongside online discovery.",
  },
];

const partnerNeeds = [
  "Authorized dealer or reseller application requirements",
  "Wholesale pricing, MAP policy, and opening-order expectations",
  "Approved product photos, descriptions, specs, and media usage rules",
  "Warranty, parts, freight, and damage-claim process",
  "Online-sales rules, territory guidance, and showroom requirements",
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="partners-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.24),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_50%,_#292524_100%)]" />
        <div className="mx-auto max-w-7xl py-14 lg:py-24">
          <Link href="/" className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Kinetic Moto
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.84fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Dealer partners</p>
              <h1 id="partners-heading" className="mt-3 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Building an authorized e-moto reseller channel.
              </h1>
            </div>
            <p className="text-lg leading-8 text-stone-300 sm:text-xl">
              Kinetic Moto is preparing a brand-name electric motorcycle catalog with approved product assets, accurate specs, clear fulfillment terms, and a local rider-support path.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-950 px-6 py-20 sm:px-8 lg:px-12" aria-label="Kinetic Moto capabilities">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {capabilities.map((capability) => (
            <article key={capability.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-black text-white">{capability.title}</h2>
              <p className="mt-4 leading-8 text-stone-300">{capability.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-stone-100 px-6 py-20 text-stone-950 sm:px-8 lg:px-12" aria-labelledby="partner-needs-heading">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-600">What we need</p>
            <h2 id="partner-needs-heading" className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Approved source, approved assets, clean support path.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-700">
              Kinetic Moto will not present products as available inventory until the brand or distributor confirms the reseller path and product presentation rules.
            </p>
          </div>

          <div className="grid gap-3">
            {partnerNeeds.map((need) => (
              <div key={need} className="rounded-2xl border border-stone-200 bg-white px-5 py-4 font-semibold text-stone-800 shadow-lg shadow-stone-950/5">
                {need}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-950 px-6 py-20 sm:px-8 lg:px-12" aria-labelledby="partner-contact-heading">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-300">Contact</p>
            <h2 id="partner-contact-heading" className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Manufacturer, distributor, and dealer teams can reach us directly.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-300">
              Send application requirements, media-kit rules, and wholesale onboarding details to the Kinetic Moto team.
            </p>
          </div>

          <div className="rounded-3xl border border-orange-300/20 bg-orange-400/10 p-6">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-200">Primary contact</p>
            <a href="mailto:info@kinetic-moto.com" className="mt-3 block break-words text-3xl font-black text-white transition hover:text-orange-200">
              info@kinetic-moto.com
            </a>
            <Link href="/contact?intent=dealer_partner" className="mt-6 inline-flex rounded-full bg-orange-500 px-6 py-3 font-bold text-stone-950 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              Send partner details
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
