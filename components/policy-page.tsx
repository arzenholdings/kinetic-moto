import Link from "next/link";
import type { ReactNode } from "react";

type PolicySection = {
  title: string;
  body: ReactNode;
};

type PolicyPageProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  sections: PolicySection[];
};

export function PolicyPage({ eyebrow = "Kinetic Moto policies", title, intro, sections }: PolicyPageProps) {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="policy-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.2),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_52%,_#292524_100%)]" />
        <div className="mx-auto max-w-4xl py-14 lg:py-20">
          <Link href="/policies" className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Policies
          </Link>
          <p className="mt-10 text-sm font-bold uppercase tracking-[0.28em] text-orange-300">{eyebrow}</p>
          <h1 id="policy-heading" className="mt-3 text-5xl font-black tracking-tight text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-300">{intro}</p>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-4xl gap-5">
          {sections.map((section) => (
            <article key={section.title} className="border-t border-white/10 py-7">
              <h2 className="text-2xl font-black tracking-tight text-white">{section.title}</h2>
              <div className="mt-3 space-y-4 leading-8 text-stone-300">{section.body}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
