import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Shipping & Pickup",
  description: "Kinetic Moto shipping, freight, local pickup, and delivery inspection policy.",
};

export default function ShippingPickupPage() {
  return (
    <PolicyPage
      title="Shipping and pickup"
      intro="Electric motorcycles and high-performance e-motos often require freight planning, delivery inspection, and setup coordination. Kinetic Moto confirms the fulfillment path before purchase."
      sections={[
        {
          title: "Fulfillment options",
          body: <p>Available options may include freight delivery, local pickup, supplier-direct shipment, or coordinated handoff. Options depend on product, supplier authorization, customer location, and service readiness.</p>,
        },
        {
          title: "Freight and delivery",
          body: <p>Freight costs, residential delivery fees, liftgate service, appointment requirements, and transit timelines are confirmed before final payment. Customers should inspect packaging and note visible damage before accepting freight delivery.</p>,
        },
        {
          title: "Local pickup and setup",
          body: <p>Local pickup or assembly support may be offered when available. Any setup checklist, safety acknowledgement, documentation, or pickup appointment requirement will be confirmed before pickup.</p>,
        },
        {
          title: "Damage claims",
          body: <p>Shipping damage must be reported promptly with photos of the packaging, crate, labels, and product condition. Kinetic Moto will help coordinate claims with the carrier, supplier, or manufacturer where applicable.</p>,
        },
      ]}
    />
  );
}
