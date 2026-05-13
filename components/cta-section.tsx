import { TrackedLink } from "@/components/tracked-link";

const callsToAction = [
  {
    title: "Reserve a demo ride",
    body: "Pick a model, choose your preferred route, and get a guided introduction to electric performance.",
    href: "/contact",
    label: "Request demo",
  },
  {
    title: "Build your fleet",
    body: "Need commuter, delivery, or campus mobility options? Start with a tailored fleet consultation.",
    href: "/contact",
    label: "Talk fleet",
  },
];

export function CtaSection() {
  return (
    <section id="financing" className="scroll-mt-24 bg-stone-100 px-6 py-20 text-stone-950 sm:px-8 lg:px-12" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-6 shadow-2xl shadow-stone-950/10 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-600">Ready when you are</p>
            <h2 id="cta-heading" className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Feel the pull before you commit.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">
              Kinetic Moto is currently using placeholder content for launch planning. These CTAs are wired as accessible links and can be swapped for booking flows later.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {callsToAction.map((cta) => (
              <div key={cta.title} className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="text-2xl font-black">{cta.title}</h3>
                <p className="mt-3 leading-7 text-stone-600">{cta.body}</p>
                <TrackedLink href={cta.href} eventName="home_cta_click" eventProperties={{ intent: cta.label }} className="mt-6 inline-flex rounded-full bg-stone-950 px-5 py-3 font-bold text-white transition hover:bg-orange-500 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  {cta.label}
                </TrackedLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
