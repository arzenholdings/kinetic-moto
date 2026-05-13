import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Financing",
  description: "Kinetic Moto financing disclosure for electric motorcycle inquiries and future checkout options.",
};

export default function FinancingPage() {
  return (
    <PolicyPage
      title="Financing disclosure"
      intro="Kinetic Moto can collect financing interest and help route buying conversations, but financing is subject to provider approval and final written terms."
      sections={[
        {
          title: "Inquiry only",
          body: <p>Checking the financing-interest option or asking about estimated payments does not create a loan, lease, approval, or commitment. Final financing terms must come from an approved financing provider.</p>,
        },
        {
          title: "Approval requirements",
          body: <p>Financing availability may depend on product category, customer credit, identity verification, state, transaction amount, down payment, provider rules, and merchant underwriting approval.</p>,
        },
        {
          title: "No guaranteed rates",
          body: <p>Any payment estimate, if provided, is informational only until a financing provider issues final terms. Taxes, fees, freight, accessories, setup, and insurance can affect the amount financed.</p>,
        },
        {
          title: "Manual invoices and deposits",
          body: <p>For high-ticket bikes or preorders, Kinetic Moto may use manual invoices, deposits, wire transfer, or provider-hosted checkout depending on approved payment options and supplier requirements.</p>,
        },
      ]}
    />
  );
}
