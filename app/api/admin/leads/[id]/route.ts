import { updateContactLead } from "@/lib/supabase-leads";

type LeadUpdateRequestBody = {
  action?: unknown;
  internal_notes?: unknown;
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: LeadUpdateRequestBody;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.action === "mark_reviewed") {
    const result = await updateContactLead(id, {
      reviewed_at: new Date().toISOString(),
    });

    if (!result.ok) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json({ ok: true });
  }

  if (body.action === "save_notes") {
    const result = await updateContactLead(id, {
      internal_notes: readString(body.internal_notes) || null,
    });

    if (!result.ok) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json({ ok: true });
  }

  return Response.json({ error: "Unsupported lead action." }, { status: 400 });
}
