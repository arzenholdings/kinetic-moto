import type { Bike, BikeMedia } from "@/components/bike-card";
import { bikes as localBikes } from "@/lib/bikes";

type SupabaseBikeRecord = {
  slug: string;
  name: string;
  category: string;
  range: string;
  top_speed: string;
  charge_time: string;
  price: string;
  description: string;
  accent: string;
  media: unknown;
  active: boolean;
};

const SUPABASE_BIKES_TABLE = "bikes";

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return {
    baseUrl: supabaseUrl.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

function getSupabaseHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function isBikeMedia(value: unknown): value is BikeMedia {
  if (!value || typeof value !== "object") {
    return false;
  }

  const media = value as Partial<BikeMedia>;

  return (
    (media.images === undefined || Array.isArray(media.images)) &&
    (media.heroVideo === undefined || typeof media.heroVideo === "object")
  );
}

function isSupabaseBikeRecord(value: unknown): value is SupabaseBikeRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const bike = value as Partial<SupabaseBikeRecord>;

  return (
    typeof bike.slug === "string" &&
    typeof bike.name === "string" &&
    typeof bike.category === "string" &&
    typeof bike.range === "string" &&
    typeof bike.top_speed === "string" &&
    typeof bike.charge_time === "string" &&
    typeof bike.price === "string" &&
    typeof bike.description === "string" &&
    typeof bike.accent === "string" &&
    typeof bike.active === "boolean"
  );
}

function mapSupabaseBike(record: SupabaseBikeRecord): Bike {
  return {
    slug: record.slug,
    name: record.name,
    category: record.category,
    range: record.range,
    topSpeed: record.top_speed,
    chargeTime: record.charge_time,
    price: record.price,
    description: record.description,
    accent: record.accent,
    media: isBikeMedia(record.media) ? record.media : undefined,
  };
}

async function fetchSupabaseBikes() {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const endpoint = new URL(`${config.baseUrl}/rest/v1/${SUPABASE_BIKES_TABLE}`);
  endpoint.searchParams.set(
    "select",
    "slug,name,category,range,top_speed,charge_time,price,description,accent,media,active"
  );
  endpoint.searchParams.set("active", "eq.true");
  endpoint.searchParams.set("order", "created_at.asc");

  try {
    const response = await fetch(endpoint, {
      headers: getSupabaseHeaders(config.serviceRoleKey),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error("Supabase bikes fetch failed; falling back to local catalog.", {
        status: response.status,
        body: await response.text(),
      });

      return null;
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      console.error("Supabase bikes fetch returned an unexpected response; falling back to local catalog.");
      return null;
    }

    const bikes = data.filter(isSupabaseBikeRecord).map(mapSupabaseBike);

    return bikes.length > 0 ? bikes : null;
  } catch (error) {
    console.error("Supabase bikes fetch threw; falling back to local catalog.", error);
    return null;
  }
}

export async function getBikes() {
  return (await fetchSupabaseBikes()) || localBikes;
}

export async function getFeaturedBikes() {
  return (await getBikes()).slice(0, 3);
}

export async function getBikeBySlug(slug: string) {
  const bikes = await getBikes();

  return bikes.find((bike) => bike.slug === slug) || null;
}
