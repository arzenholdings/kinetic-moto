import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact | Kinetic Moto",
  description: "Contact Kinetic Moto to book a ride or ask about electric motorcycles.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="contact-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.26),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_50%,_#292524_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 py-14 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:py-24">
          <div>
            <Link href="/" className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              Kinetic Moto
            </Link>
            <p className="mt-10 text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Contact</p>
            <h1 id="contact-heading" className="mt-3 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Start your next electric ride.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              Book a demo ride, ask about a model, or start a fleet conversation. The form logs submissions locally for now while the lead pipeline is being wired.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/bikes" className="rounded-full border border-stone-500 px-7 py-4 text-center text-base font-bold text-white transition hover:border-orange-300 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
                Browse bikes
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
