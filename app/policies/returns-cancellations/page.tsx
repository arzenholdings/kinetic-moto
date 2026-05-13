import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Returns & Cancellations",
  description: "Kinetic Moto cancellation, return, preorder, and restocking policy.",
};

export default function ReturnsCancellationsPage() {
  return (
    <PolicyPage
      title="Returns and cancellations"
      intro="Vehicle returns and cancellations depend on order timing, supplier rules, shipment status, and product condition. Final order documents may include product-specific terms."
      sections={[
        {
          title: "Before shipment",
          body: <p>Orders, deposits, or preorders may be cancellable before allocation, build, shipment, or special-order commitment. Any non-refundable deposit or special-order condition will be disclosed before payment.</p>,
        },
        {
          title: "After shipment or pickup",
          body: <p>Once a vehicle has shipped, been picked up, titled where applicable, registered, assembled, charged, ridden, or transferred, returns may be restricted or unavailable. Approved returns may require original packaging and may be subject to freight and restocking costs.</p>,
        },
        {
          title: "Condition requirements",
          body: <p>Returned products, if approved, must be complete, undamaged, and in the condition required by Kinetic Moto, the supplier, or the manufacturer. Missing parts, damage, use, or altered electronics can reduce or prevent refund eligibility.</p>,
        },
        {
          title: "Manufacturer policies",
          body: <p>Some cancellations, exchanges, warranty remedies, and defect claims are governed by manufacturer or supplier policy. Kinetic Moto will help coordinate the process when the issue falls under those policies.</p>,
        },
      ]}
    />
  );
}
