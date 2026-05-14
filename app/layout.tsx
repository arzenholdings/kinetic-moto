import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kinetic-moto.com"),
  title: {
    default: "Kinetic Moto | Electric Motorcycles",
    template: "%s | Kinetic Moto",
  },
  description:
    "Explore Kinetic Moto's brand-name electric motorcycle launch catalog, dealer approval path, local support model, and financing conversations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kinetic Moto | Electric Motorcycles",
    description:
      "Explore Kinetic Moto's brand-name electric motorcycle launch catalog, dealer approval path, local support model, and financing conversations.",
    url: "/",
    siteName: "Kinetic Moto",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-stone-950">
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
