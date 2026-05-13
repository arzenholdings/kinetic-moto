type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  bike_slug?: unknown;
  interest_type?: unknown;
  financing_interest?: unknown;
  budget_range?: unknown;
  purchase_timeframe?: unknown;
  company?: unknown;
  started_at?: unknown;
};

type Lead = {
  name: string;
  email: string;
  phone: string;
  message: string;
  bike_slug: string | null;
  interest_type: string;
  financing_interest: boolean;
  budget_range: string | null;
  purchase_timeframe: string | null;
};

type LoggedLead = Lead & {
  source: string;
  timestamp: string;
};

type DeliveryResult =
  | { status: "sent" | "stored" }
  | { status: "skipped"; reason: string }
  | { status: "error"; error: string };

const RESEND_EMAIL_ENDPOINT = "https://api.resend.com/emails";
const CONTACT_LEAD_SOURCE = "contact_form";
const SUPABASE_CONTACT_LEADS_TABLE = "contact_leads";
const DEFAULT_STATUS = "new";
const HIGH_INTENT_INTERESTS = new Set(["book_ride", "financing"]);
const VALID_INTEREST_TYPES = new Set(["general", "book_ride", "financing", "fleet", "support"]);
const MIN_FORM_SECONDS = 2;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readNullableString(value: unknown) {
  const text = readString(value);

  return text || null;
}

function readBoolean(value: unknown) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return ["true", "yes", "on", "1"].includes(value.toLowerCase());
  }

  return false;
}

function readTimestamp(value: unknown) {
  const text = readString(value);

  if (!text) {
    return null;
  }

  const timestamp = Number(text);

  return Number.isFinite(timestamp) ? timestamp : null;
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();

  return forwardedFor || realIp || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validateLead(body: ContactRequestBody): Lead | null {
  const interestType = readString(body.interest_type) || "general";

  const lead = {
    name: readString(body.name),
    email: readString(body.email),
    phone: readString(body.phone),
    message: readString(body.message),
    bike_slug: readNullableString(body.bike_slug),
    interest_type: VALID_INTEREST_TYPES.has(interestType) ? interestType : "general",
    financing_interest: readBoolean(body.financing_interest),
    budget_range: readNullableString(body.budget_range),
    purchase_timeframe: readNullableString(body.purchase_timeframe),
  };

  if (!lead.name || !isValidEmail(lead.email) || !lead.message) {
    return null;
  }

  return lead;
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = (process.env.CONTACT_EMAIL_TO || process.env.CONTACT_TO_EMAIL)?.trim();
  const from = (process.env.CONTACT_EMAIL_FROM || process.env.CONTACT_FROM_EMAIL)?.trim();

  if (!apiKey || !to || !from) {
    return null;
  }

  return {
    apiKey,
    to,
    from,
  };
}

function buildLeadEmail(lead: Lead) {
  const phone = lead.phone || "Not provided";
  const selectedBike = lead.bike_slug || "Not provided";
  const financingInterest = lead.financing_interest ? "Yes" : "No";
  const budgetRange = lead.budget_range || "Not provided";
  const purchaseTimeframe = lead.purchase_timeframe || "Not provided";

  return {
    subject: `New Kinetic Moto lead from ${lead.name}`,
    text: [
      "New Kinetic Moto contact form submission",
      "",
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${phone}`,
      `Selected bike: ${selectedBike}`,
      `Interest: ${lead.interest_type}`,
      `Financing interest: ${financingInterest}`,
      `Budget range: ${budgetRange}`,
      `Purchase timeframe: ${purchaseTimeframe}`,
      "",
      "Message:",
      lead.message,
    ].join("\n"),
    html: `
      <h1>New Kinetic Moto lead</h1>
      <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Selected bike:</strong> ${escapeHtml(selectedBike)}</p>
      <p><strong>Interest:</strong> ${escapeHtml(lead.interest_type)}</p>
      <p><strong>Financing interest:</strong> ${escapeHtml(financingInterest)}</p>
      <p><strong>Budget range:</strong> ${escapeHtml(budgetRange)}</p>
      <p><strong>Purchase timeframe:</strong> ${escapeHtml(purchaseTimeframe)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(lead.message).replace(/\n/g, "<br />")}</p>
    `,
  };
}

function logLead(lead: LoggedLead) {
  console.info("Kinetic Moto contact lead received", {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    message: lead.message,
    bike_slug: lead.bike_slug,
    interest_type: lead.interest_type,
    financing_interest: lead.financing_interest,
    budget_range: lead.budget_range,
    purchase_timeframe: lead.purchase_timeframe,
    source: lead.source,
    timestamp: lead.timestamp,
  });
}

function getLeadPriority(lead: Lead) {
  return lead.financing_interest || HIGH_INTENT_INTERESTS.has(lead.interest_type) ? "high" : "normal";
}

async function storeLeadInSupabase(lead: LoggedLead): Promise<DeliveryResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.info("Supabase contact lead storage skipped because Supabase is not configured.");
    return { status: "skipped", reason: "Supabase is not configured." };
  }

  const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${SUPABASE_CONTACT_LEADS_TABLE}`;

  try {
    const supabaseResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || null,
        message: lead.message,
        source: lead.source,
        bike_slug: lead.bike_slug,
        interest_type: lead.interest_type,
        financing_interest: lead.financing_interest,
        budget_range: lead.budget_range,
        purchase_timeframe: lead.purchase_timeframe,
        status: DEFAULT_STATUS,
        priority: getLeadPriority(lead),
        created_at: lead.timestamp,
      }),
    });

    if (!supabaseResponse.ok) {
      const supabaseError = await supabaseResponse.text();
      console.error("Supabase contact lead insert failed.", {
        status: supabaseResponse.status,
        body: supabaseError,
      });

      return { status: "error", error: "Lead storage failed." };
    }

    return { status: "stored" };
  } catch (error) {
    console.error("Supabase contact lead insert threw.", error);
    return { status: "error", error: "Lead storage failed." };
  }
}

async function sendLeadEmail(lead: Lead): Promise<DeliveryResult> {
  const config = getEmailConfig();

  if (!config) {
    console.info("Contact email skipped because Resend is not fully configured.");
    return { status: "skipped", reason: "Resend is not fully configured." };
  }

  const email = buildLeadEmail(lead);

  try {
    const resendResponse = await fetch(RESEND_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: config.to,
        reply_to: lead.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Resend contact email failed.", {
        status: resendResponse.status,
        body: resendError,
      });

      return { status: "error", error: "Contact email could not be sent." };
    }

    return { status: "sent" };
  } catch (error) {
    console.error("Resend contact email threw.", error);
    return { status: "error", error: "Contact email could not be sent." };
  }
}

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (readString(body.company)) {
    return Response.json({
      ok: true,
      message: "Thanks, we received your message.",
    });
  }

  const startedAt = readTimestamp(body.started_at);

  if (!startedAt || Date.now() - startedAt < MIN_FORM_SECONDS * 1000) {
    return Response.json({ error: "Please wait a moment before sending your message." }, { status: 400 });
  }

  if (isRateLimited(getClientKey(request))) {
    return Response.json({ error: "Too many messages were submitted. Please try again later." }, { status: 429 });
  }

  const lead = validateLead(body);

  if (!lead) {
    return Response.json({ error: "Please provide a name, valid email, and message." }, { status: 400 });
  }

  const loggedLead = {
    ...lead,
    source: CONTACT_LEAD_SOURCE,
    timestamp: new Date().toISOString(),
  };

  logLead(loggedLead);
  const [storageResult, emailResult] = await Promise.all([storeLeadInSupabase(loggedLead), sendLeadEmail(lead)]);

  if (emailResult.status === "error") {
    return Response.json(
      { error: "We could not send your message right now. Please try again or email us directly." },
      { status: 502 }
    );
  }

  const hasDelivery = storageResult.status === "stored" || emailResult.status === "sent";

  if (!hasDelivery) {
    console.error("Contact lead accepted but no delivery channel is configured.", {
      storageStatus: storageResult.status,
      emailStatus: emailResult.status,
    });

    return Response.json(
      { error: "Contact form delivery is not configured yet. Please email us directly." },
      { status: 503 }
    );
  }

  return Response.json({
    ok: true,
    message: "Thanks, we received your message.",
  });
}
