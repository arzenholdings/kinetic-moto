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

  const specs = [
    { label: "Range", value: bike.range },
    { label: "Top speed", value: bike.topSpeed },
    { label: "Fast charge", value: bike.chargeTime },
    { label: "Ride style", value: bike.category },
  ];

  const mailSubject = encodeURIComponent(`Kinetic Moto ${bike.name}`);

  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="bike-detail-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.24),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_48%,_#292524_100%)]" />
        <div className="mx-auto max-w-7xl py-14 lg:py-24">
          <Link href="/bikes" className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Back to /bikes
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">{bike.category}</p>
              <h1 id="bike-detail-heading" className="mt-3 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                {bike.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">{bike.description}</p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href={`mailto:demo@kineticmoto.example?subject=${mailSubject}%20demo%20ride`} className="rounded-full bg-orange-500 px-7 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
                  Book Ride
                </a>
                <a href={`mailto:sales@kineticmoto.example?subject=${mailSubject}%20question`} className="rounded-full border border-stone-500 px-7 py-4 text-center text-base font-bold text-white transition hover:border-orange-300 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
                  Contact
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl" aria-label={`${bike.name} product rendering`} role="img">
              <div className={`absolute -inset-8 rounded-full bg-gradient-to-br ${bike.accent} opacity-30 blur-3xl`} />
              <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${bike.accent} p-6 shadow-2xl shadow-black/30`}>
                <div className="rounded-[1.5rem] bg-stone-950/72 p-6 backdrop-blur">
                  <div className="mb-8 flex items-center justify-between gap-4 text-sm text-stone-300">
                    <span>{bike.name} / product detail</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 font-bold text-white">{bike.price}</span>
                  </div>
                  <div className="relative h-64 sm:h-80">
                    <div className="absolute bottom-8 left-4 h-24 w-24 rounded-full border-[14px] border-stone-300/75 bg-stone-950 shadow-inner" />
                    <div className="absolute bottom-8 right-4 h-24 w-24 rounded-full border-[14px] border-stone-300/75 bg-stone-950 shadow-inner" />
                    <div className="absolute bottom-24 left-20 right-20 h-12 -skew-x-12 rounded-full bg-white shadow-lg shadow-white/20" />
                    <div className="absolute bottom-36 left-28 h-20 w-56 -skew-x-12 rounded-[2rem] bg-stone-200" />
                    <div className="absolute bottom-44 right-24 h-4 w-28 -rotate-12 rounded-full bg-stone-500" />
                    <div className="absolute bottom-48 left-24 h-3 w-28 rotate-12 rounded-full bg-stone-500" />
                    <div className="absolute bottom-32 left-40 h-24 w-24 rounded-full border border-orange-300/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-950 px-6 pb-20 sm:px-8 lg:px-12" aria-label={`${bike.name} specifications`}>
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_1fr]">
          <div className="rounded-[2rem] border border-orange-300/20 bg-orange-400/10 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Starting price</p>
            <p className="mt-3 text-5xl font-black tracking-tight text-white">{bike.price}</p>
            <p className="mt-4 leading-7 text-orange-100">
              Estimated launch pricing for the {bike.name}. Final availability, trim packages, and delivery options can be confirmed with Kinetic Moto sales.
            </p>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <dt className="text-sm text-stone-400">{spec.label}</dt>
                <dd className="mt-1 text-3xl font-black text-white">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
