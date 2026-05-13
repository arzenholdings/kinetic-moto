import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how Kinetic Moto is building an ecommerce-first electric motorcycle reseller with local rider support.",
};

const pillars = [
  {
    title: "Brand-name catalog",
    body: "Kinetic Moto is preparing an authorized reseller catalog for established electric motorcycle and e-moto brands, replacing early concept placeholders with approved SKUs, photos, and specifications.",
  },
  {
    title: "Online first",
    body: "The site starts as a clean inquiry and sales-intent flow for availability, quotes, financing conversations, and preorder planning before full checkout is switched on.",
  },
  {
    title: "Local support path",
    body: "The operating model is built toward showroom pickup, setup help, service coordination, and real rider support instead of a faceless cart-only experience.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="about-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.24),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_48%,_#292524_100%)]" />
        <div className="mx-auto max-w-7xl py-14 lg:py-24">
          <Link href="/" className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Kinetic Moto
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">About</p>
              <h1 id="about-heading" className="mt-3 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                A real electric moto shop, built online first.
              </h1>
            </div>
            <p className="text-lg leading-8 text-stone-300 sm:text-xl">
              Kinetic Moto is being built as a legitimate reseller for brand-name electric motorcycles, with ecommerce convenience today and local setup, pickup, and support as the operating footprint grows.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-950 px-6 py-20 sm:px-8 lg:px-12" aria-label="Kinetic Moto operating model">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-black text-white">{pillar.title}</h2>
              <p className="mt-4 leading-8 text-stone-300">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-stone-100 px-6 py-20 text-stone-950 sm:px-8 lg:px-12" aria-labelledby="next-heading">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-600">Now building</p>
            <h2 id="next-heading" className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Dealer accounts, merchant support, and approved inventory.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-stone-700">
            <p>
              Current catalog pages are a working storefront structure while manufacturer authorization, product feeds, and approved photos are finalized. Final availability, specifications, pricing, warranty terms, and legal use status are confirmed before purchase.
            </p>
            <Link href="/contact" className="inline-flex rounded-full bg-stone-950 px-7 py-4 text-base font-bold text-white transition hover:bg-orange-500 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Contact Kinetic Moto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
