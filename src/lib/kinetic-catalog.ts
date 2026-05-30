export type Bike = {
  slug: string;
  brand: string;
  name: string;
  model: string;
  category: string;
  price: string;
  availability: string;
  specs: string[];
  highlights: string[];
  summary: string;
  bestFor: string;
};

export const launchOffer = {
  headline: "First Kinetic Moto launch bikes are opening for availability checks",
  subheadline:
    "Tell us what you want to ride, and we'll confirm availability, pricing, financing options, and pickup/shipping path.",
  cta: "Request Availability",
  urgency:
    "First launch allocation is limited while vendor/dealer availability is confirmed.",
};

export const bikes: Bike[] = [
  {
    slug: "arctic-leopard-exe-880",
    brand: "Arctic Leopard",
    name: "Arctic Leopard EXE",
    model: "880 Electric Enduro",
    category: "Electric dirt bike",
    price: "Starting price by quote",
    availability: "Availability check open",
    specs: ["Electric off-road platform", "Enduro geometry", "Vendor quote required"],
    highlights: [
      "Launch candidate for riders comparing premium e-moto options.",
      "Availability and trim details confirmed through dealer/vendor channels.",
      "Built for buyers who want electric torque and trail-focused hardware.",
    ],
    summary:
      "A premium electric off-road option for riders who want a sharper enduro-style launch bike with confirmed availability before committing.",
    bestFor: "Premium electric trail and enduro buyers",
  },
  {
    slug: "surron-light-bee-x",
    brand: "Surron",
    name: "Surron Light Bee X",
    model: "Light Bee X",
    category: "Electric dirt bike",
    price: "Starting price by quote",
    availability: "High-interest launch check",
    specs: ["Electric drive", "Lightweight chassis", "Trail and urban capable"],
    highlights: [
      "One of the most requested electric dirt bike platforms.",
      "Good fit for buyers comparing electric moto, trail, and pit use.",
      "Availability, color, and freight path confirmed before next steps.",
    ],
    summary:
      "A lightweight electric dirt platform for riders who want quick torque, low maintenance, and a broad aftermarket path.",
    bestFor: "Electric dirt bike buyers who want a proven platform",
  },
  {
    slug: "talaria-sting-r-mx4",
    brand: "Talaria",
    name: "Talaria Sting R",
    model: "MX4",
    category: "Electric dirt bike",
    price: "Starting price by quote",
    availability: "Launch allocation check",
    specs: ["Electric drive", "Reinforced chassis", "Off-road suspension setup"],
    highlights: [
      "Strong launch option for riders cross-shopping Surron and E Ride.",
      "Financing and pickup/shipping path can be confirmed with the quote.",
      "Positioned for trail riders who want more substantial e-moto feel.",
    ],
    summary:
      "A serious electric off-road bike for riders who want a stronger chassis feel and a capable launch allocation option.",
    bestFor: "Riders comparing midweight electric moto platforms",
  },
  {
    slug: "e-ride-pro-ss",
    brand: "E Ride",
    name: "E Ride Pro",
    model: "SS",
    category: "Electric dirt bike",
    price: "Starting price by quote",
    availability: "Limited availability check",
    specs: ["Electric performance platform", "Sport suspension", "Hydraulic disc brakes"],
    highlights: [
      "Performance-focused launch option for electric dirt bike buyers.",
      "Useful fit when speed, range, and financing options drive the decision.",
      "Kinetic confirms current model, color, and fulfillment path before commitment.",
    ],
    summary:
      "A higher-output electric moto candidate for buyers who want performance first and need availability verified fast.",
    bestFor: "Performance-minded electric moto buyers",
  },
  {
    slug: "rawrr-mantis-x",
    brand: "Rawrr",
    name: "Rawrr Mantis",
    model: "X",
    category: "Electric dirt bike",
    price: "Starting price by quote",
    availability: "Special order check",
    specs: ["Electric drive", "Compact moto stance", "Trail-ready component set"],
    highlights: [
      "A compact electric option for buyers who want a nimble ride.",
      "Good candidate for availability checks before comparing trim packages.",
      "Financing interest can be captured with the same request.",
    ],
    summary:
      "A compact electric dirt bike candidate for riders who want a nimble, quick-to-confirm launch option.",
    bestFor: "Nimble electric dirt and trail use",
  },
  {
    slug: "dust-moto-alpha",
    brand: "Dust Moto",
    name: "Dust Moto Alpha",
    model: "Alpha",
    category: "Electric dirt bike",
    price: "Starting price by quote",
    availability: "Reservation interest check",
    specs: ["Electric moto platform", "Modern dirt-bike geometry", "Reservation path to confirm"],
    highlights: [
      "Forward-looking option for early electric dirt bike buyers.",
      "Best handled through reservation and availability confirmation.",
      "Kinetic can collect buyer intent before final allocation is confirmed.",
    ],
    summary:
      "A reservation-oriented electric moto candidate for buyers who want to get ahead of launch allocation.",
    bestFor: "Early adopters tracking next-wave electric moto",
  },
  {
    slug: "ventus-one",
    brand: "Ventus",
    name: "Ventus One",
    model: "One",
    category: "Electric dirt bike",
    price: "Starting price by quote",
    availability: "Vendor confirmation in progress",
    specs: ["Electric off-road platform", "Performance-focused setup", "Quote and availability required"],
    highlights: [
      "A premium comparison option in the electric launch catalog.",
      "Ideal for buyers who need current pricing and dealer availability confirmed.",
      "Inquiry captures pickup, shipping, financing, and reservation intent.",
    ],
    summary:
      "A premium electric off-road candidate for buyers comparing availability, pricing, and delivery path across high-demand brands.",
    bestFor: "Premium electric off-road comparison shoppers",
  },
];

export const brandList = bikes.map((bike) => bike.brand);

export const purchaseTimeframes = [
  "Ready this week",
  "Ready within 30 days",
  "Planning 1 to 3 months out",
  "Comparing options",
];

export function getBikeBySlug(slug: string) {
  return bikes.find((bike) => bike.slug === slug);
}

export function getBikeLabel(bike: Bike) {
  return `${bike.brand} ${bike.model}`;
}
