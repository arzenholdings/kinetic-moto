import type { Bike } from "@/lib/bike-types";

const defaultFinancing = {
  headline: "Plan the ride before the reservation.",
  body: "Talk through estimated payments, delivery timing, and fleet needs before making a commitment. No checkout or cart flow has been added.",
  highlights: [
    "Flexible terms for qualified riders",
    "Trade-in and fleet conversations welcome",
    "Final pricing confirmed before reservation",
  ],
  ctaLabel: "Ask about financing",
};

const bikeMedia = {
  voltRs: [
    { src: "/bikes/volt-rs-side.png", alt: "Volt RS side profile electric motorcycle render", width: 1200, height: 800 },
    { src: "/bikes/volt-rs-front.png", alt: "Volt RS front three-quarter electric motorcycle render", width: 1200, height: 800 },
  ],
  terraX: [
    { src: "/bikes/terra-x-side.png", alt: "Terra X side profile adventure electric motorcycle render", width: 1200, height: 800 },
    { src: "/bikes/terra-x-front.png", alt: "Terra X front three-quarter adventure electric motorcycle render", width: 1200, height: 800 },
  ],
  pulseC: [
    { src: "/bikes/pulse-c-side.png", alt: "Pulse C side profile urban electric motorcycle render", width: 1200, height: 800 },
    { src: "/bikes/pulse-c-front.png", alt: "Pulse C front three-quarter urban electric motorcycle render", width: 1200, height: 800 },
  ],
  vectorGt: [
    { src: "/bikes/vector-gt-side.png", alt: "Vector GT side profile touring electric motorcycle render", width: 1200, height: 800 },
    { src: "/bikes/vector-gt-front.png", alt: "Vector GT front three-quarter touring electric motorcycle render", width: 1200, height: 800 },
  ],
  ridgeMx: [
    { src: "/bikes/ridge-mx-side.png", alt: "Ridge MX side profile trail electric motorcycle render", width: 1200, height: 800 },
    { src: "/bikes/ridge-mx-front.png", alt: "Ridge MX front three-quarter trail electric motorcycle render", width: 1200, height: 800 },
  ],
  metroS: [
    { src: "/bikes/metro-s-side.png", alt: "Metro S side profile city electric motorcycle render", width: 1200, height: 800 },
    { src: "/bikes/metro-s-front.png", alt: "Metro S front three-quarter city electric motorcycle render", width: 1200, height: 800 },
  ],
} satisfies Record<string, Bike["galleryImages"]>;

export const bikeInventory: Bike[] = [
  {
    slug: "volt-rs",
    name: "Volt RS",
    category: "Street performance",
    description:
      "A sharp, city-to-canyon machine with instant torque, adaptive ride modes, and a compact fast-charge battery pack.",
    price: "$18,900",
    specs: {
      range: "180 mi",
      topSpeed: "128 mph",
      chargeTime: "28 min",
      items: [
        { label: "Range", value: "180 mi" },
        { label: "Top speed", value: "128 mph" },
        { label: "Fast charge", value: "28 min" },
        { label: "Ride style", value: "Street performance" },
      ],
    },
    heroMedia: { image: bikeMedia.voltRs[0] },
    galleryImages: bikeMedia.voltRs,
    financing: defaultFinancing,
    availabilityStatus: "preorder",
    featured: true,
    accent: "from-orange-500 via-amber-500 to-stone-800",
  },
  {
    slug: "terra-x",
    name: "Terra X",
    category: "Adventure",
    description:
      "Long-travel suspension, upright ergonomics, and rugged utility for riders who split time between pavement and dirt roads.",
    price: "$21,400",
    specs: {
      range: "210 mi",
      topSpeed: "105 mph",
      chargeTime: "34 min",
      items: [
        { label: "Range", value: "210 mi" },
        { label: "Top speed", value: "105 mph" },
        { label: "Fast charge", value: "34 min" },
        { label: "Ride style", value: "Adventure" },
      ],
    },
    heroMedia: { image: bikeMedia.terraX[0] },
    galleryImages: bikeMedia.terraX,
    financing: defaultFinancing,
    availabilityStatus: "preorder",
    featured: true,
    accent: "from-emerald-500 via-lime-500 to-stone-800",
  },
  {
    slug: "pulse-c",
    name: "Pulse C",
    category: "Urban commuter",
    description:
      "Lightweight, quiet, and nimble with integrated storage options and confidence-focused power delivery for daily rides.",
    price: "$14,800",
    specs: {
      range: "145 mi",
      topSpeed: "92 mph",
      chargeTime: "24 min",
      items: [
        { label: "Range", value: "145 mi" },
        { label: "Top speed", value: "92 mph" },
        { label: "Fast charge", value: "24 min" },
        { label: "Ride style", value: "Urban commuter" },
      ],
    },
    heroMedia: { image: bikeMedia.pulseC[0] },
    galleryImages: bikeMedia.pulseC,
    financing: defaultFinancing,
    availabilityStatus: "available",
    featured: true,
    accent: "from-sky-500 via-cyan-400 to-stone-800",
  },
  {
    slug: "vector-gt",
    name: "Vector GT",
    category: "Grand touring",
    description:
      "A composed long-range tourer with wind protection, passenger-ready geometry, and effortless highway passing power.",
    price: "$24,600",
    specs: {
      range: "240 mi",
      topSpeed: "118 mph",
      chargeTime: "38 min",
      items: [
        { label: "Range", value: "240 mi" },
        { label: "Top speed", value: "118 mph" },
        { label: "Fast charge", value: "38 min" },
        { label: "Ride style", value: "Grand touring" },
      ],
    },
    heroMedia: { image: bikeMedia.vectorGt[0] },
    galleryImages: bikeMedia.vectorGt,
    financing: defaultFinancing,
    availabilityStatus: "coming_soon",
    featured: false,
    accent: "from-violet-500 via-fuchsia-500 to-stone-800",
  },
  {
    slug: "ridge-mx",
    name: "Ridge MX",
    category: "Trail",
    description:
      "A lightweight off-road platform tuned for quick line changes, steep climbs, and quiet access to technical terrain.",
    price: "$13,900",
    specs: {
      range: "120 mi",
      topSpeed: "84 mph",
      chargeTime: "22 min",
      items: [
        { label: "Range", value: "120 mi" },
        { label: "Top speed", value: "84 mph" },
        { label: "Fast charge", value: "22 min" },
        { label: "Ride style", value: "Trail" },
      ],
    },
    heroMedia: { image: bikeMedia.ridgeMx[0] },
    galleryImages: bikeMedia.ridgeMx,
    financing: defaultFinancing,
    availabilityStatus: "available",
    featured: false,
    accent: "from-yellow-500 via-orange-500 to-stone-800",
  },
  {
    slug: "metro-s",
    name: "Metro S",
    category: "City sport",
    description:
      "Compact proportions, lively acceleration, and smart daily features for riders who want a fast way through dense city miles.",
    price: "$15,700",
    specs: {
      range: "155 mi",
      topSpeed: "98 mph",
      chargeTime: "26 min",
      items: [
        { label: "Range", value: "155 mi" },
        { label: "Top speed", value: "98 mph" },
        { label: "Fast charge", value: "26 min" },
        { label: "Ride style", value: "City sport" },
      ],
    },
    heroMedia: { image: bikeMedia.metroS[0] },
    galleryImages: bikeMedia.metroS,
    financing: defaultFinancing,
    availabilityStatus: "available",
    featured: false,
    accent: "from-rose-500 via-red-500 to-stone-800",
  },
];
