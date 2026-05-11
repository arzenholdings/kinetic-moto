import type { Metadata } from "next";
import { LinearProjectsDashboard } from "@/components/linear-projects-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Linear Projects | Kinetic Moto",
  description: "Read-only internal dashboard for Linear projects.",
};

export default function AdminLinearPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-50">
      <LinearProjectsDashboard />
    </main>
  );
}
