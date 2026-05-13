import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
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
    "Explore Kinetic Moto electric motorcycles, compare concept models, and book a ride or financing conversation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kinetic Moto | Electric Motorcycles",
    description:
      "Explore Kinetic Moto electric motorcycles, compare concept models, and book a ride or financing conversation.",
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
        <Analytics />
      </body>
    </html>
  );
}
