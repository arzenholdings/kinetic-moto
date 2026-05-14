import { CtaSection } from "@/components/cta-section";
import { HeroSection } from "@/components/hero-section";
import { LaunchCatalogSection } from "@/components/launch-catalog-section";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <HeroSection />
      <LaunchCatalogSection />
      <CtaSection />
    </main>
  );
}
