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
  return (
    <article id={bike.slug} className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-[2rem] border border-stone-800 bg-stone-900/70 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-orange-400/50">
      <div className={`relative min-h-56 bg-gradient-to-br ${bike.accent} p-6`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,_rgba(255,255,255,0.22),_transparent_28%)]" />
        <div className="relative flex items-start justify-between gap-4">
          <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
            {bike.category}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            /{bike.slug}
          </span>
        </div>
        <div className="absolute bottom-8 left-6 right-6" aria-label={`${bike.name} image placeholder`} role="img">
          <div className="relative h-28">
            <div className="absolute bottom-0 left-2 h-16 w-16 rounded-full border-[10px] border-white/75 bg-black/35" />
            <div className="absolute bottom-0 right-2 h-16 w-16 rounded-full border-[10px] border-white/75 bg-black/35" />
            <div className="absolute bottom-12 left-16 right-16 h-8 -skew-x-12 rounded-full bg-white/90" />
            <div className="absolute bottom-17 left-24 h-12 w-28 -skew-x-12 rounded-3xl bg-black/35" />
          </div>
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
