import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Banknote, CheckCircle2 } from "lucide-react";
import { bikes, getBikeBySlug } from "@/lib/kinetic-catalog";
import { kineticDesign } from "@/lib/kinetic-design";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return bikes.map((bike) => ({ slug: bike.slug }));
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const bike = getBikeBySlug(slug);

  if (!bike) {
    return {
      title: "Bike Not Found",
    };
  }

  return {
    title: `${bike.brand} ${bike.model}`,
    description: `Request availability and financing options for the ${bike.brand} ${bike.model} through Kinetic Moto Sports.`,
    alternates: {
      canonical: `/catalog/${bike.slug}`,
    },
    openGraph: {
      title: `${bike.brand} ${bike.model} | Kinetic Moto Sports`,
      description: bike.summary,
      url: `/catalog/${bike.slug}`,
    },
  };
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { slug } = await params;
  const bike = getBikeBySlug(slug);

  if (!bike) {
    notFound();
  }

  return (
    <main className={kineticDesign.page}>
      <section className={`relative py-6 ${kineticDesign.section}`}>
        <div className={kineticDesign.detailGlow} />
        <div className={`relative ${kineticDesign.content}`}>
          <header className="flex items-center justify-between py-4">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to catalog
            </Link>
            <Link
              href={`/?bike=${bike.slug}&intent=availability#inquiry`}
              className={kineticDesign.navButton}
            >
              Request Availability
            </Link>
          </header>

          <div className="grid min-h-[70vh] items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className={kineticDesign.pill}>
                {bike.category}
              </p>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
                {bike.brand} {bike.model}
              </h1>
              <p className="mt-5 text-2xl font-semibold text-white">{bike.price}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-kinetic-muted sm:text-lg">
                {bike.summary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/?bike=${bike.slug}&intent=availability#inquiry`}
                  className={`h-12 w-full max-w-[22rem] sm:w-auto ${kineticDesign.primaryButton}`}
                >
                  Request Availability
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/?bike=${bike.slug}&intent=financing#inquiry`}
                  className={`h-12 w-full max-w-[22rem] sm:w-auto ${kineticDesign.secondaryButton}`}
                >
                  <Banknote className="h-4 w-4" />
                  Financing Options
                </Link>
              </div>
            </div>

            <aside className={kineticDesign.elevatedCard}>
              <div className={kineticDesign.panel}>
                <p className={kineticDesign.eyebrow}>
                  Availability status
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{bike.availability}</h2>
                <p className="mt-3 text-sm leading-6 text-kinetic-muted">
                  Submit a request and Kinetic will confirm current model status, pricing,
                  financing options, and pickup or shipping path.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={`pb-16 ${kineticDesign.section}`}>
        <div className={`grid gap-4 lg:grid-cols-[0.9fr_1.1fr] ${kineticDesign.content}`}>
          <div className={kineticDesign.card}>
            <p className={kineticDesign.eyebrow}>
              Short specs
            </p>
            <ul className="mt-5 grid gap-3 text-sm text-slate-200">
              {bike.specs.map((spec) => (
                <li key={spec} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kinetic-cyan" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={kineticDesign.card}>
            <p className={kineticDesign.eyebrow}>
              Why request now
            </p>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-200">
              {bike.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-kinetic-cyan" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className={kineticDesign.alertUrgency}>
              Best for: {bike.bestFor}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
