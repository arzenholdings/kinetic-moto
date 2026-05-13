import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";

export type BikeMediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BikeMediaVideo = {
  src: string;
  label: string;
  poster?: string;
};

export type BikeMedia = {
  images?: BikeMediaImage[];
  heroVideo?: BikeMediaVideo;
};

export type Bike = {
  name: string;
  slug: string;
  category: string;
  range: string;
  topSpeed: string;
  chargeTime: string;
  price: string;
  description: string;
  accent: string;
  media?: BikeMedia;
};

type BikeCardProps = {
  bike: Bike;
  ctaLabel?: string;
};

export function BikeCard({ bike, ctaLabel = `View ${bike.name}` }: BikeCardProps) {
  const primaryImage = bike.media?.images?.[0];

  return (
    <article id={bike.slug} className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[2rem] border border-stone-800 bg-stone-900/70 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-orange-400/50">
      <div className={`relative aspect-[3/2] overflow-hidden bg-gradient-to-br ${bike.accent}`}>
        {primaryImage ? (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,_rgba(255,255,255,0.22),_transparent_28%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/20" />
        <div className="relative flex items-start justify-between gap-4 p-5">
          <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
            {bike.category}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            /{bike.slug}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-black text-white">{bike.name}</h3>
        <p className="mt-3 flex-1 leading-7 text-stone-300">{bike.description}</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl bg-stone-950 p-3">
            <dt className="text-stone-500">Range</dt>
            <dd className="mt-1 font-bold text-white">{bike.range}</dd>
          </div>
          <div className="rounded-2xl bg-stone-950 p-3">
            <dt className="text-stone-500">Top speed</dt>
            <dd className="mt-1 font-bold text-white">{bike.topSpeed}</dd>
          </div>
          <div className="rounded-2xl bg-stone-950 p-3">
            <dt className="text-stone-500">Charge</dt>
            <dd className="mt-1 font-bold text-white">{bike.chargeTime}</dd>
          </div>
        </dl>
        <TrackedLink href={`/bikes/${bike.slug}`} eventName="bike_card_click" eventProperties={{ bike: bike.slug }} className="mt-6 inline-flex items-center justify-center rounded-full border border-stone-700 px-5 py-3 font-bold text-orange-200 transition group-hover:border-orange-300 group-hover:bg-orange-400 group-hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-900">
          {ctaLabel}
        </TrackedLink>
      </div>
    </article>
  );
}
