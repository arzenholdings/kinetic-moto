export type KineticLeadInput = {
  name: string;
  email: string;
  phone: string;
  selectedModel: string;
  purchaseTimeframe: string;
  financingInterest: string;
  reserveDepositInterest: string;
  location: string;
  message: string;
  intent: string;
  source: string;
};

type InsertResult =
  | { configured: false; ok: false; reason: "missing-env" }
  | { configured: true; ok: true }
  | { configured: true; ok: false; reason: "request-failed" };

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return { serviceRoleKey, supabaseUrl };
}

export async function insertKineticLead(lead: KineticLeadInput): Promise<InsertResult> {
  const config = getSupabaseConfig();

  if (!config) {
    return { configured: false, ok: false, reason: "missing-env" };
  }

  const row = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    selected_model: lead.selectedModel,
    purchase_timeframe: lead.purchaseTimeframe,
    financing_interest: lead.financingInterest,
    reserve_deposit_interest: lead.reserveDepositInterest,
    location: lead.location,
    message: lead.message,
    intent: lead.intent,
    source: lead.source,
    status: "new",
  };

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/kinetic_leads`, {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });

    if (response.ok) {
      return { configured: true, ok: true };
    }

    console.error("Kinetic lead Supabase insert failed", {
      status: response.status,
      statusText: response.statusText,
      body: (await response.text()).slice(0, 500),
    });
  } catch (error) {
    console.error("Kinetic lead Supabase insert error", error);
  }

  return { configured: true, ok: false, reason: "request-failed" };
}
