import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "Kinetic Moto terms for inquiries, quotes, availability, pricing, and purchases.",
};

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of service"
      intro="These terms describe how Kinetic Moto handles inquiries, quotes, availability checks, and future purchases. They are intended for a launch-stage reseller site and may be updated as supplier and merchant approvals are finalized."
      sections={[
        {
          title: "Information requests are not final orders",
          body: <p>Submitting a contact form, financing inquiry, demo request, or model request does not create a purchase contract. Kinetic Moto confirms product availability, specifications, pricing, taxes, shipping, pickup options, and any financing terms before an order is accepted.</p>,
        },
        {
          title: "Pricing and availability",
          body: <p>Prices, specifications, colors, model years, fees, freight charges, and delivery timing can change before a final quote is issued. Catalog-preview items are not represented as in-stock inventory unless Kinetic Moto confirms that status in writing.</p>,
        },
        {
          title: "Supplier and legal requirements",
          body: <p>Some products may require manufacturer approval, dealer authorization, age restrictions, safety acknowledgements, off-road-use acknowledgement, signed documents, or local-law review before sale or delivery.</p>,
        },
        {
          title: "Policy updates",
          body: <p>Kinetic Moto may update these terms as the dealer, checkout, financing, and fulfillment model matures. The version presented at final quote or checkout governs the purchase unless a separate written agreement says otherwise.</p>,
        },
      ]}
    />
  );
}
