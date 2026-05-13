import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Legal",
  description: "Kinetic Moto legal disclaimers for off-road use, street legality, safety, and local laws.",
};

export default function LegalPage() {
  return (
    <PolicyPage
      title="Legal and safety"
      intro="Electric motorcycles, e-motos, and high-powered bikes can be regulated differently by location. Riders are responsible for lawful, safe use."
      sections={[
        {
          title: "Street use is not assumed",
          body: <p>Some products may be off-road only, competition use only, or not legal for public-road use without required equipment, registration, insurance, licensing, or inspections. Kinetic Moto confirms known product status where available, but riders must verify local requirements.</p>,
        },
        {
          title: "Rider responsibility",
          body: <p>Customers are responsible for following helmet laws, age restrictions, licensing requirements, trail rules, speed limits, land-use rules, charging guidance, maintenance schedules, and safe operating practices.</p>,
        },
        {
          title: "Performance and risk",
          body: <p>High-torque electric bikes can accelerate quickly and may cause injury, property damage, or death if used improperly. Protective gear, training, inspection, and conservative first rides are strongly recommended.</p>,
        },
        {
          title: "Product information",
          body: <p>Specifications, range, top speed, charge time, and performance claims depend on rider weight, terrain, temperature, battery condition, riding mode, accessories, and manufacturer testing. Final product documentation controls where available.</p>,
        },
      ]}
    />
  );
}
