import type { Metadata } from "next";
import { KineticCatalogPage } from "@/components/kinetic-catalog-page";

export const metadata: Metadata = {
  title: "Kinetic Moto Launch Bike Catalog",
  description:
    "Request availability for Arctic Leopard, Surron, Talaria, E Ride, Rawrr, Dust Moto, and Ventus launch bikes.",
};

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function Home({ searchParams }: HomeProps) {
  const query = await searchParams;

  return (
    <KineticCatalogPage
      selectedBikeSlug={getQueryValue(query.bike)}
      inquiryState={getQueryValue(query.inquiry)}
      intent={getQueryValue(query.intent)}
    />
  );
}
