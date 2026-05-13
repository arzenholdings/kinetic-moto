export type ContactLead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  source: string;
  bike_slug: string | null;
  interest_type: string | null;
  financing_interest: boolean;
  budget_range: string | null;
  purchase_timeframe: string | null;
  status: string;
  priority: string;
  follow_up_at: string | null;
  internal_notes: string | null;
  reviewed_at: string | null;
  created_at: string;
};

export type LeadsResult = {
  leads: ContactLead[];
  status: "ready" | "unconfigured" | "error";
  message?: string;
};

const SUPABASE_CONTACT_LEADS_TABLE = "contact_leads";

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return {
    baseUrl: supabaseUrl.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

function getSupabaseHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function isContactLead(value: unknown): value is ContactLead {
  if (!value || typeof value !== "object") {
    return false;
  }

  const lead = value as Partial<ContactLead>;

  return (
    typeof lead.id === "string" &&
    typeof lead.name === "string" &&
    typeof lead.email === "string" &&
    (typeof lead.phone === "string" || lead.phone === null) &&
    typeof lead.message === "string" &&
    typeof lead.source === "string" &&
    (typeof lead.bike_slug === "string" || lead.bike_slug === null) &&
    (typeof lead.interest_type === "string" || lead.interest_type === null) &&
    typeof lead.financing_interest === "boolean" &&
    (typeof lead.budget_range === "string" || lead.budget_range === null) &&
    (typeof lead.purchase_timeframe === "string" || lead.purchase_timeframe === null) &&
    typeof lead.status === "string" &&
    typeof lead.priority === "string" &&
    (typeof lead.follow_up_at === "string" || lead.follow_up_at === null) &&
    (typeof lead.internal_notes === "string" || lead.internal_notes === null) &&
    (typeof lead.reviewed_at === "string" || lead.reviewed_at === null) &&
    typeof lead.created_at === "string"
  );
}

export async function getContactLeads(): Promise<LeadsResult> {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      leads: [],
      status: "unconfigured",
      message: "Supabase is not configured yet. Add the Supabase env vars to load leads here.",
    };
  }

  const endpoint = new URL(`${config.baseUrl}/rest/v1/${SUPABASE_CONTACT_LEADS_TABLE}`);
  endpoint.searchParams.set(
    "select",
    "id,name,email,phone,message,source,bike_slug,interest_type,financing_interest,budget_range,purchase_timeframe,status,priority,follow_up_at,internal_notes,reviewed_at,created_at"
  );
  endpoint.searchParams.set("order", "created_at.desc");

  try {
    const response = await fetch(endpoint, {
      headers: getSupabaseHeaders(config.serviceRoleKey),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Supabase admin leads fetch failed.", {
        status: response.status,
        body: await response.text(),
      });

      return {
        leads: [],
        status: "error",
        message: "Leads could not be loaded right now.",
      };
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return {
        leads: [],
        status: "error",
        message: "Supabase returned an unexpected leads response.",
      };
    }

    return {
      leads: data.filter(isContactLead),
      status: "ready",
    };
  } catch (error) {
    console.error("Supabase admin leads fetch threw.", error);

    return {
      leads: [],
      status: "error",
      message: "Leads could not be loaded right now.",
    };
  }
}

export async function updateContactLead(
  id: string,
  updates: {
    status?: string;
    priority?: string;
    follow_up_at?: string | null;
    internal_notes?: string | null;
    reviewed_at?: string;
  }
) {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      ok: false,
      status: 503,
      error: "Supabase is not configured.",
    };
  }

  const endpoint = new URL(`${config.baseUrl}/rest/v1/${SUPABASE_CONTACT_LEADS_TABLE}`);
  endpoint.searchParams.set("id", `eq.${id}`);

  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: {
      ...getSupabaseHeaders(config.serviceRoleKey),
      Prefer: "return=minimal",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    console.error("Supabase contact lead update failed.", {
      status: response.status,
      body: await response.text(),
    });

    return {
      ok: false,
      status: response.status,
      error: "Lead could not be updated.",
    };
  }

  return {
    ok: true,
    status: 200,
  };
}
