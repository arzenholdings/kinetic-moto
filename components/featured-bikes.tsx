import Link from "next/link";
import { BikeCard } from "@/components/bike-card";
import { getFeaturedBikes } from "@/lib/supabase-products";

export async function FeaturedBikes() {
  const featuredBikes = await getFeaturedBikes();

  return (
    <section id="featured-bikes" className="bg-stone-950 px-6 py-20 sm:px-8 lg:px-12" aria-labelledby="featured-bikes-heading">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Catalog preview</p>
            <h2 id="featured-bikes-heading" className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              The storefront is ready for real inventory.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-stone-300">
            Temporary launch previews are being replaced with authorized brand-name SKUs, approved product photos, and manufacturer-backed specifications.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredBikes.map((bike) => (
            <BikeCard key={bike.slug} bike={bike} ctaLabel={`View ${bike.name}`} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/bikes" className="rounded-full bg-orange-500 px-7 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Explore all bikes
          </Link>
        </div>
      </div>
    </section>
  );
}
