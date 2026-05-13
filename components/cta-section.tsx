import { TrackedLink } from "@/components/tracked-link";

const callsToAction = [
  {
    title: "Ask about a bike",
    body: "Tell us the model or riding style you want and we will confirm availability, supplier path, and next steps.",
    href: "/contact?intent=product_question",
    label: "Request info",
  },
  {
    title: "Plan payment options",
    body: "Start the conversation around deposits, manual invoice, pickup, freight, or future financing support.",
    href: "/contact?intent=financing&financing=true",
    label: "Talk financing",
  },
];

export function CtaSection() {
  return (
    <section id="financing" className="scroll-mt-24 bg-stone-100 px-6 py-20 text-stone-950 sm:px-8 lg:px-12" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-600">Ready when you are</p>
            <h2 id="cta-heading" className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Get the buying path clear before you commit.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-600">
              Start with a target model, budget, or timeline. The team can confirm availability, payment path, freight or pickup options, and dealer-account status before any final purchase.
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
