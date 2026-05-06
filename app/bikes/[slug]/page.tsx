import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bikes } from "@/lib/bikes";

type BikeDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return bikes.map((bike) => ({ slug: bike.slug }));
}

export async function generateMetadata({ params }: BikeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const bike = bikes.find((item) => item.slug === slug);

  if (!bike) {
    return {
      title: "Bike not found | Kinetic Moto",
    };
  }

  return {
    title: `${bike.name} | Kinetic Moto`,
    description: bike.description,
  };
}

export default async function BikeDetailPage({ params }: BikeDetailPageProps) {
  const { slug } = await params;
  const bike = bikes.find((item) => item.slug === slug);

  if (!bike) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="bike-detail-heading">
        <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${bike.accent}`} />
        <div className="absolute inset-0 -z-10 bg-stone-950/50" />
        <div className="mx-auto max-w-5xl py-14 lg:py-24">
          <Link href="/bikes" className="inline-flex rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-white backdrop-blur transition hover:border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Back to bikes
          </Link>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-stone-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-10 lg:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">{bike.category}</p>
            <h1 id="bike-detail-heading" className="mt-3 text-5xl font-black tracking-tight text-white sm:text-6xl">
              {bike.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">{bike.description}</p>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <dt className="text-sm text-stone-400">Range</dt>
                <dd className="mt-1 text-3xl font-black text-white">{bike.range}</dd>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <dt className="text-sm text-stone-400">Top speed</dt>
                <dd className="mt-1 text-3xl font-black text-white">{bike.topSpeed}</dd>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <dt className="text-sm text-stone-400">Charge time</dt>
                <dd className="mt-1 text-3xl font-black text-white">{bike.chargeTime}</dd>
              </div>
            </dl>

            <p className="mt-10 rounded-3xl border border-orange-300/20 bg-orange-400/10 p-5 leading-7 text-orange-100">
              Detail content is a routing-ready placeholder for the product page build-out. The listing already uses this stable URL: /bikes/{bike.slug}.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
