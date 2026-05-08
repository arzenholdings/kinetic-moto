import { bikeInventory } from "@/lib/inventory";

export const bikes = bikeInventory;

export const featuredBikes = bikeInventory.filter((bike) => bike.featured);

export function getBikeBySlug(slug: string) {
  return bikeInventory.find((bike) => bike.slug === slug);
}
