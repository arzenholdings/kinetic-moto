import Link from "next/link";
import { BikeMediaGallery } from "@/components/bike-media-gallery";
import type { Bike } from "@/lib/bike-types";

type BikeDetailLayoutProps = {
  bike: Bike;
};

export function BikeDetailLayout({ bike }: BikeDetailLayoutProps) {
  const media = {
    heroVideo: bike.heroMedia.video,
    galleryImages: bike.galleryImages.length > 0 ? bike.galleryImages : [bike.heroMedia.image],
  };

  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="bike-detail-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.24),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_48%,_#292524_100%)]" />
        <div className="mx-auto max-w-7xl py-14 lg:py-24">
          <Link href="/bikes" className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Back to /bikes
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">{bike.category}</p>
              <h1 id="bike-detail-heading" className="mt-3 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                {bike.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">{bike.description}</p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href="/contact" className="rounded-full bg-orange-500 px-7 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
                  Request Info
                </Link>
                <Link href="#financing-options" className="rounded-full border border-stone-500 px-7 py-4 text-center text-base font-bold text-white transition hover:border-orange-300 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
                  Financing
                </Link>
              </div>
            </div>

            <BikeMediaGallery accent={bike.accent} bikeName={bike.name} media={media} />
          </div>
        </div>
      </section>

      <section className="bg-stone-950 px-6 py-20 sm:px-8 lg:px-12" aria-label={`${bike.name} specifications`}>
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.55fr_1fr]">
          <div className="rounded-[2rem] border border-orange-300/20 bg-orange-400/10 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Starting price</p>
            <p className="mt-3 text-5xl font-black tracking-tight text-white">{bike.price}</p>
            <p className="mt-4 leading-7 text-orange-100">
              Estimated launch pricing for the {bike.name}. Final availability, trim packages, and delivery options can be confirmed with Kinetic Moto.
            </p>
            <Link href="/contact" className="mt-6 inline-flex rounded-full bg-orange-500 px-5 py-3 font-bold text-stone-950 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              Contact Sales
            </Link>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {bike.specs.items.map((spec) => (
              <div key={spec.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <dt className="text-sm text-stone-400">{spec.label}</dt>
                <dd className="mt-1 text-3xl font-black text-white">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="financing-options" className="scroll-mt-24 bg-stone-100 px-6 py-20 text-stone-950 sm:px-8 lg:px-12" aria-labelledby="financing-heading">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-600">Financing</p>
            <h2 id="financing-heading" className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              {bike.financing.headline}
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">{bike.financing.body}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {bike.financing.highlights.map((highlight) => (
              <div key={highlight} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xl shadow-stone-950/5">
                <p className="leading-7 text-stone-700">{highlight}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <Link href="/contact" className="inline-flex rounded-full bg-stone-950 px-7 py-4 text-base font-bold text-white transition hover:bg-orange-500 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              {bike.financing.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
