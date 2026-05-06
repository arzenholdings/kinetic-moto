import { CtaSection } from "@/components/cta-section";
import { FeaturedBikes } from "@/components/featured-bikes";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <HeroSection />
      <FeaturedBikes />
      <CtaSection />
    </main>
  );
}
