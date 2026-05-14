import type { MetadataRoute } from "next";

const SITE_URL = "https://kinetic-moto.com";
const staticRoutes = [
  { path: "/about", priority: 0.7 },
  { path: "/partners", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/policies", priority: 0.6 },
  { path: "/policies/terms", priority: 0.5 },
  { path: "/policies/privacy", priority: 0.5 },
  { path: "/policies/shipping-pickup", priority: 0.5 },
  { path: "/policies/returns-cancellations", priority: 0.5 },
  { path: "/policies/warranty", priority: 0.5 },
  { path: "/policies/financing", priority: 0.5 },
  { path: "/policies/legal", priority: 0.5 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/bikes`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
  ];
}
