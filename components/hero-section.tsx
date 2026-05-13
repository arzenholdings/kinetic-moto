import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";

const stats = [
  { label: "Launch catalog", value: "In sourcing" },
  { label: "Dealer accounts", value: "Opening" },
  { label: "Support model", value: "Local-first" },
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
            Brand-name electric motorcycles, online convenience, real rider support.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
            Shop a curated e-moto storefront, then talk with Kinetic Moto about availability, setup, pickup, financing, and local support as the showroom and service program grows.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href="/bikes" className="rounded-full bg-orange-500 px-7 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              View all bikes
            </Link>
            <TrackedLink href="/contact" eventName="home_cta_click" eventProperties={{ intent: "book_demo" }} className="rounded-full border border-stone-500 px-7 py-4 text-center text-base font-bold text-white transition hover:border-orange-300 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              Ask about availability
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

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900 shadow-2xl shadow-black/40">
            <Image
              src="/bikes/volt-rs-side.png"
              alt="Electric motorcycle catalog preview render"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/85 to-transparent p-5">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-200">Launch catalog preview</p>
              <p className="mt-1 text-sm text-stone-300">Real SKUs and approved media added as dealer accounts land.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
