import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

export function generateMetadata(): Metadata {
  return {
    title: "Catalog candidate",
    description: "Kinetic Moto is replacing concept bike detail pages with authorized brand-name catalog SKUs.",
    alternates: {
      canonical: "/bikes",
    },
  };
}

export default function BikeDetailPage() {
  redirect("/bikes");
}
