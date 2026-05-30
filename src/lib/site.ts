export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://kinetic-moto.com";

export const siteConfig = {
  name: "Kinetic Moto Sports",
  shortName: "Kinetic Moto",
  url: siteUrl,
  domain: "kinetic-moto.com",
  email: "sales@kineticmotosports.com",
  description:
    "Launch bike catalog and availability checks for Kinetic Moto Sports buyers.",
  socialDescription:
    "Check availability for Kinetic Moto Sports launch bikes, pricing, financing options, and pickup or shipping path.",
};
