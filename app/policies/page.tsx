import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Policies",
  description: "Review Kinetic Moto terms, privacy, shipping, returns, warranty, financing, and legal policies.",
};

const policies = [
  { title: "Terms", href: "/policies/terms", body: "How inquiries, quotes, availability, and purchases are handled." },
  { title: "Privacy", href: "/policies/privacy", body: "What contact and lead information is collected and how it is used." },
  { title: "Shipping & pickup", href: "/policies/shipping-pickup", body: "Freight, local pickup, inspection, and delivery expectations." },
  { title: "Returns & cancellations", href: "/policies/returns-cancellations", body: "Cancellation timing, shipped-order limits, and restocking considerations." },
  { title: "Warranty", href: "/policies/warranty", body: "Manufacturer warranty coordination and service-support boundaries." },
  { title: "Financing", href: "/policies/financing", body: "Financing-interest disclosures and approval requirements." },
  { title: "Legal", href: "/policies/legal", body: "Off-road, street-use, safety, and local-law responsibilities." },
];

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="policies-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_52%,_#292524_100%)]" />
        <div className="mx-auto max-w-7xl py-14 lg:py-20">
          <Link href="/" className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
            Kinetic Moto
          </Link>
          <p className="mt-10 text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Policies</p>
          <h1 id="policies-heading" className="mt-3 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Clear terms before anyone commits.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
            These pages set the baseline for inquiries, quotes, delivery, financing conversations, warranty coordination, and legal-use expectations.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {policies.map((policy) => (
            <Link key={policy.href} href={policy.href} className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-orange-300/50 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              <h2 className="text-2xl font-black text-white">{policy.title}</h2>
              <p className="mt-3 leading-7 text-stone-300">{policy.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
