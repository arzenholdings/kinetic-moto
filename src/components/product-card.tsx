import Link from "next/link";
import { ArrowRight, Banknote, CheckCircle2 } from "lucide-react";
import type { Bike } from "@/lib/kinetic-catalog";
import { kineticDesign } from "@/lib/kinetic-design";

export function ProductCard({ bike }: { bike: Bike }) {
  return (
    <article className={`flex h-full flex-col ${kineticDesign.card} ${kineticDesign.cardHover}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className={kineticDesign.eyebrow}>
            {bike.brand}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{bike.name}</h2>
          <p className="mt-1 text-sm text-kinetic-subtle">{bike.model}</p>
        </div>
        <span className={`self-start ${kineticDesign.statusSuccess}`}>
          {bike.availability}
        </span>
      </div>

      <p className="mt-5 text-2xl font-semibold text-white">{bike.price}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{bike.summary}</p>

      <ul className="mt-5 grid gap-2 text-sm text-slate-200">
        {bike.specs.map((spec) => (
          <li key={spec} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-kinetic-cyan" />
            <span>{spec}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto grid gap-3 pt-6">
        <Link
          href={`/?bike=${bike.slug}&intent=availability#inquiry`}
          className={`h-11 px-4 ${kineticDesign.primaryButton}`}
        >
          Request Availability
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={`/?bike=${bike.slug}&intent=financing#inquiry`}
          className={`h-11 px-4 ${kineticDesign.secondaryButton}`}
        >
          <Banknote className="h-4 w-4" />
          Financing Options
        </Link>
        <Link
          href={`/catalog/${bike.slug}`}
          className="text-center text-sm font-medium text-cyan-100 underline-offset-4 transition hover:text-white hover:underline"
        >
          View product details
        </Link>
      </div>
    </article>
  );
}
