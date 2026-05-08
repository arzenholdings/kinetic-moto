import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BikeDetailLayout } from "@/components/bike-detail-layout";
import { bikes } from "@/lib/bikes";

type BikeDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function getPriceAmount(price: string) {
  return price.replace(/[^\d.]/g, "");
}

export function generateStaticParams() {
  return bikes.map((bike) => ({ slug: bike.slug }));
}

export async function generateMetadata({ params }: BikeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const bike = bikes.find((item) => item.slug === slug);

  if (!bike) {
    return {
      title: "Bike not found | Kinetic Moto",
    };
  }

  return {
    title: `${bike.name} | Kinetic Moto`,
    description: bike.description,
    alternates: {
      canonical: `/bikes/${bike.slug}`,
    },
    openGraph: {
      title: `${bike.name} | Kinetic Moto`,
      description: bike.description,
      type: "website",
      url: `/bikes/${bike.slug}`,
    },
  };
}

export default async function BikeDetailPage({ params }: BikeDetailPageProps) {
  const { slug } = await params;
  const bike = bikes.find((item) => item.slug === slug);

  if (!bike) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: bike.name,
    brand: {
      "@type": "Brand",
      name: "Kinetic Moto",
    },
    category: bike.category,
    description: bike.description,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      price: getPriceAmount(bike.price),
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <BikeDetailLayout bike={bike} />
    </>
  );
}
