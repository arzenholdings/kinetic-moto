import type { Metadata } from "next";
import { KineticCatalogPage } from "@/components/kinetic-catalog-page";

export const metadata: Metadata = {
  title: "Launch Bike Catalog",
  description:
    "Browse the first Kinetic Moto Sports launch catalog and request availability for electric dirt bike brands.",
  alternates: {
    canonical: "/catalog",
  },
};

type CatalogProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Catalog({ searchParams }: CatalogProps) {
  const query = await searchParams;

  return (
    <KineticCatalogPage
      selectedBikeSlug={getQueryValue(query.bike)}
      inquiryState={getQueryValue(query.inquiry)}
      intent={getQueryValue(query.intent)}
    />
  );
}
