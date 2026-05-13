import type { Metadata } from "next";
import Link from "next/link";
import { BikeCard } from "@/components/bike-card";
import { getBikes } from "@/lib/supabase-products";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse Kinetic Moto launch catalog candidates and request availability for brand-name electric motorcycles.",
};

export default async function BikesPage() {
  const bikes = await getBikes();

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
                Launch catalog preview.
              </h1>
            </div>
            <p className="text-lg leading-8 text-stone-300 sm:text-xl">
              The catalog framework is being converted from concept placeholders to real authorized reseller SKUs. Ask about availability, setup, pickup, and financing while dealer accounts are being opened.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-950 px-6 pb-20 sm:px-8 lg:px-12" aria-label="All Kinetic Moto bikes">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {bikes.map((bike) => (
              <BikeCard key={bike.slug} bike={bike} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
