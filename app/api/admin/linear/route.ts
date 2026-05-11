import { getLinearDashboardProjects } from "@/lib/linear-dashboard";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await getLinearDashboardProjects();

  return Response.json(result, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
