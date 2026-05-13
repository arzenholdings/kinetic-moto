import { updateContactLead } from "@/lib/supabase-leads";

type LeadUpdateRequestBody = {
  action?: unknown;
  status?: unknown;
  priority?: unknown;
  follow_up_at?: unknown;
  internal_notes?: unknown;
};

const VALID_STATUSES = new Set(["new", "contacted", "qualified", "follow_up", "closed"]);
const VALID_PRIORITIES = new Set(["low", "normal", "high"]);

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readDateTime(value: unknown) {
  const text = readString(value);

  if (!text) {
    return null;
  }

  const date = new Date(text);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
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

  if (body.action === "update_pipeline") {
    const status = readString(body.status);
    const priority = readString(body.priority);

    if (!VALID_STATUSES.has(status) || !VALID_PRIORITIES.has(priority)) {
      return Response.json({ error: "Invalid lead status or priority." }, { status: 400 });
    }

    const result = await updateContactLead(id, {
      status,
      priority,
      follow_up_at: readDateTime(body.follow_up_at),
    });

    if (!result.ok) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json({ ok: true });
  }

  return Response.json({ error: "Unsupported lead action." }, { status: 400 });
}
