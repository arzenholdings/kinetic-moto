import type { Bike } from "@/components/bike-card";

export const bikes: Bike[] = [
  {
    name: "Volt RS",
    slug: "volt-rs",
    category: "Street performance",
    range: "180 mi",
    topSpeed: "128 mph",
    chargeTime: "28 min",
    price: "$18,900",
    description:
      "A compact streetfighter tuned for quick launches, canyon exits, and weekday commutes. Volt RS pairs a low-mounted battery pack with sharp steering geometry and configurable ride modes.",
    accent: "from-orange-500 via-amber-500 to-stone-800",
    media: {
      images: [
        { src: "/bikes/volt-rs-side.png", alt: "Volt RS side profile electric motorcycle render", width: 1200, height: 800 },
        { src: "/bikes/volt-rs-front.png", alt: "Volt RS front three-quarter electric motorcycle render", width: 1200, height: 800 },
      ],
    },
  },
  {
    name: "Terra X",
    slug: "terra-x",
    category: "Adventure",
    range: "210 mi",
    topSpeed: "105 mph",
    chargeTime: "34 min",
    price: "$21,400",
    description:
      "A long-range dual-sport built for riders who split their week between pavement, gravel, and fire-road miles. Terra X adds upright ergonomics, protected bodywork, and utility mounting points.",
    accent: "from-emerald-500 via-lime-500 to-stone-800",
    media: {
      images: [
        { src: "/bikes/terra-x-side.png", alt: "Terra X side profile adventure electric motorcycle render", width: 1200, height: 800 },
        { src: "/bikes/terra-x-front.png", alt: "Terra X front three-quarter adventure electric motorcycle render", width: 1200, height: 800 },
      ],
    },
  },
  {
    name: "Pulse C",
    slug: "pulse-c",
    category: "Urban commuter",
    range: "145 mi",
    topSpeed: "92 mph",
    chargeTime: "24 min",
    price: "$14,800",
    description:
      "A lightweight commuter with quiet acceleration, simple charging, and city-friendly proportions. Pulse C is built for daily riders who want predictable range without giving up weekend fun.",
    accent: "from-sky-500 via-cyan-400 to-stone-800",
    media: {
      images: [
        { src: "/bikes/pulse-c-side.png", alt: "Pulse C side profile urban electric motorcycle render", width: 1200, height: 800 },
        { src: "/bikes/pulse-c-front.png", alt: "Pulse C front three-quarter urban electric motorcycle render", width: 1200, height: 800 },
      ],
    },
  },
  {
    name: "Vector GT",
    slug: "vector-gt",
    category: "Grand touring",
    range: "240 mi",
    topSpeed: "118 mph",
    chargeTime: "38 min",
    price: "$24,600",
    description:
      "A composed electric tourer for longer rides, passenger comfort, and fast highway passing. Vector GT brings wind protection, stable geometry, and the largest estimated pack in the lineup.",
    accent: "from-violet-500 via-fuchsia-500 to-stone-800",
    media: {
      images: [
        { src: "/bikes/vector-gt-side.png", alt: "Vector GT side profile touring electric motorcycle render", width: 1200, height: 800 },
        { src: "/bikes/vector-gt-front.png", alt: "Vector GT front three-quarter touring electric motorcycle render", width: 1200, height: 800 },
      ],
    },
  },
  {
    name: "Ridge MX",
    slug: "ridge-mx",
    category: "Trail",
    range: "120 mi",
    topSpeed: "84 mph",
    chargeTime: "22 min",
    price: "$13,900",
    description:
      "A quiet trail platform for technical terrain, steep climbs, and quick line changes. Ridge MX keeps weight low and response immediate for riders who care about control more than noise.",
    accent: "from-yellow-500 via-orange-500 to-stone-800",
    media: {
      images: [
        { src: "/bikes/ridge-mx-side.png", alt: "Ridge MX side profile trail electric motorcycle render", width: 1200, height: 800 },
        { src: "/bikes/ridge-mx-front.png", alt: "Ridge MX front three-quarter trail electric motorcycle render", width: 1200, height: 800 },
      ],
    },
  },
  {
    name: "Metro S",
    slug: "metro-s",
    category: "City sport",
    range: "155 mi",
    topSpeed: "98 mph",
    chargeTime: "26 min",
    price: "$15,700",
    description:
      "A compact city sport bike with lively acceleration, confident brakes, and daily-friendly ergonomics. Metro S is aimed at dense streets, short hops, and riders who want an easy electric step-up.",
    accent: "from-rose-500 via-red-500 to-stone-800",
    media: {
      images: [
        { src: "/bikes/metro-s-side.png", alt: "Metro S side profile city electric motorcycle render", width: 1200, height: 800 },
        { src: "/bikes/metro-s-front.png", alt: "Metro S front three-quarter city electric motorcycle render", width: 1200, height: 800 },
      ],
    },
  },
];

export const featuredBikes = bikes.slice(0, 3);
