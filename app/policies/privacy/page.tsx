import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Kinetic Moto privacy policy for contact forms, lead tracking, analytics, and email handling.",
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      intro="Kinetic Moto collects the information needed to respond to riders, prepare quotes, support financing conversations, and improve the storefront."
      sections={[
        {
          title: "Information collected",
          body: <p>Contact forms may collect name, email, phone, message, selected bike, interest type, financing interest, budget range, purchase timeframe, and related sales-intent details.</p>,
        },
        {
          title: "How information is used",
          body: <p>Information is used to reply to inquiries, prepare availability updates, route financing or sales conversations, maintain internal lead notes, and improve site performance. Kinetic Moto does not sell contact information.</p>,
        },
        {
          title: "Service providers",
          body: <p>The site may use providers such as Vercel for hosting and analytics, Supabase for lead storage, Resend for email delivery, and future financing or commerce providers when a rider chooses to continue a buying process.</p>,
        },
        {
          title: "Data requests",
          body: <p>To request an update or deletion of submitted contact information, email info@kinetic-moto.com from the same email address used in the inquiry.</p>,
        },
      ]}
    />
  );
}
