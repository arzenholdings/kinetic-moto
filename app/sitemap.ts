import type { MetadataRoute } from "next";
import { getBikes } from "@/lib/supabase-products";

const SITE_URL = "https://kinetic-moto.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bikes = await getBikes();
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/bikes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...bikes.map((bike) => ({
      url: `${SITE_URL}/bikes/${bike.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
