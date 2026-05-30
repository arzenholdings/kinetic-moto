import type { MetadataRoute } from "next";
import { bikes } from "@/lib/kinetic-catalog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-30");

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/catalog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...bikes.map((bike) => ({
      url: `${siteConfig.url}/catalog/${bike.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
