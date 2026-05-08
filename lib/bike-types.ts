export type BikeAvailabilityStatus = "available" | "preorder" | "coming_soon";

export type BikeSpec = {
  label: string;
  value: string;
};

export type BikeMediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BikeMediaVideo = {
  src: string;
  label: string;
  poster?: string;
};

export type BikeMedia = {
  heroVideo?: BikeMediaVideo;
  galleryImages: BikeMediaImage[];
};

export type BikeHeroMedia = {
  image: BikeMediaImage;
  video?: BikeMediaVideo;
};

export type BikeFinancing = {
  headline: string;
  body: string;
  highlights: string[];
  ctaLabel: string;
};

export type Bike = {
  slug: string;
  name: string;
  category: string;
  description: string;
  price: string;
  specs: {
    range: string;
    topSpeed: string;
    chargeTime: string;
    items: BikeSpec[];
  };
  heroMedia: BikeHeroMedia;
  galleryImages: BikeMediaImage[];
  financing: BikeFinancing;
  availabilityStatus: BikeAvailabilityStatus;
  featured: boolean;
  accent: string;
};
