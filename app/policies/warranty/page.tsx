import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Warranty",
  description: "Kinetic Moto warranty coordination and service support policy.",
};

export default function WarrantyPage() {
  return (
    <PolicyPage
      title="Warranty and service support"
      intro="Kinetic Moto helps riders understand warranty coverage, documentation, and service options, while manufacturer warranties remain product-specific."
      sections={[
        {
          title: "Manufacturer warranty",
          body: <p>Warranty length, covered parts, exclusions, transferability, and claim procedures vary by brand and model. Kinetic Moto confirms available warranty information before final purchase when supplier documentation is available.</p>,
        },
        {
          title: "Coordination role",
          body: <p>Kinetic Moto may help collect photos, serial numbers, mileage, diagnostic notes, proof of purchase, and other documentation needed for a supplier or manufacturer warranty review.</p>,
        },
        {
          title: "Common exclusions",
          body: <p>Wear items, crash damage, misuse, water intrusion, racing use, unauthorized modifications, improper charging, neglected maintenance, and consumables may be excluded depending on manufacturer policy.</p>,
        },
        {
          title: "Service path",
          body: <p>As the local support model grows, Kinetic Moto will identify setup, inspection, and service options available for each product. Service capability may vary by brand, region, parts availability, and dealer authorization.</p>,
        },
      ]}
    />
  );
}
