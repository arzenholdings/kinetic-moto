import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";

const stats = [
  { label: "Electric range", value: "180 mi" },
  { label: "Charge to 80%", value: "28 min" },
  { label: "Demo fleet", value: "12 bikes" },
];

export function HeroSection() {
  return (
    <section id="about" className="relative isolate scroll-mt-24 px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.28),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_48%,_#292524_100%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-orange-200">
            Kinetic Moto
          </p>
          <h1 id="hero-heading" className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Electric motorcycles built for everyday velocity.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
            Explore responsive, high-torque bikes designed for commuters, weekend canyon runs, and riders who want cleaner performance without losing soul.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href="/bikes" className="rounded-full bg-orange-500 px-7 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              View all bikes
            </Link>
            <TrackedLink href="/contact" eventName="home_cta_click" eventProperties={{ intent: "book_demo" }} className="rounded-full border border-stone-500 px-7 py-4 text-center text-base font-bold text-white transition hover:border-orange-300 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              Book a demo ride
            </TrackedLink>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <dt className="text-sm text-stone-400">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-black text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-xl" aria-label="Concept image placeholder for the Kinetic Moto Volt RS electric motorcycle" role="img">
          <div className="absolute -inset-8 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-stone-800 to-stone-950 p-6 shadow-2xl">
            <div className="rounded-[1.5rem] bg-stone-900 p-6">
              <div className="mb-8 flex items-center justify-between text-sm text-stone-400">
                <span>Volt RS / prototype visual</span>
                <span aria-hidden="true">● ● ●</span>
              </div>
              <div className="relative h-64 sm:h-80">
                <div className="absolute bottom-8 left-4 h-24 w-24 rounded-full border-[14px] border-stone-600 bg-stone-950 shadow-inner" />
                <div className="absolute bottom-8 right-4 h-24 w-24 rounded-full border-[14px] border-stone-600 bg-stone-950 shadow-inner" />
                <div className="absolute bottom-24 left-20 right-20 h-12 -skew-x-12 rounded-full bg-orange-500 shadow-lg shadow-orange-500/40" />
                <div className="absolute bottom-36 left-28 h-20 w-56 -skew-x-12 rounded-[2rem] bg-stone-200" />
                <div className="absolute bottom-44 right-24 h-4 w-28 -rotate-12 rounded-full bg-stone-500" />
                <div className="absolute bottom-48 left-24 h-3 w-28 rotate-12 rounded-full bg-stone-500" />
                <div className="absolute bottom-32 left-40 h-24 w-24 rounded-full border border-orange-300/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
