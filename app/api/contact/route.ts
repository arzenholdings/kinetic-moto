type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

type Lead = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type LoggedLead = Lead & {
  timestamp: string;
};

const RESEND_EMAIL_ENDPOINT = "https://api.resend.com/emails";

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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
  const lead = {
    name: readString(body.name),
    email: readString(body.email),
    phone: readString(body.phone),
    message: readString(body.message),
  };

  if (!lead.name || !isValidEmail(lead.email) || !lead.message) {
    return null;
  }

  return lead;
}

function buildLeadEmail(lead: Lead) {
  const phone = lead.phone || "Not provided";

  return {
    subject: `New Kinetic Moto lead from ${lead.name}`,
    text: [
      "New Kinetic Moto contact form submission",
      "",
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${phone}`,
      "",
      "Message:",
      lead.message,
    ].join("\n"),
    html: `
      <h1>New Kinetic Moto lead</h1>
      <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
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
    timestamp: lead.timestamp,
  });
}

async function sendLeadEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!apiKey || !to || !from) {
    console.info("Contact email skipped because Resend is not fully configured.");
    return;
  }

  const email = buildLeadEmail(lead);

  try {
    const resendResponse = await fetch(RESEND_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: lead.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Resend contact email failed, but lead submission was accepted.", {
        status: resendResponse.status,
        body: resendError,
      });
    }
  } catch (error) {
    console.error("Resend contact email threw, but lead submission was accepted.", error);
  }
}

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const lead = validateLead(body);

  if (!lead) {
    return Response.json({ error: "Please provide a name, valid email, and message." }, { status: 400 });
  }

  const loggedLead = {
    ...lead,
    timestamp: new Date().toISOString(),
  };

  logLead(loggedLead);
  await sendLeadEmail(lead);

  return Response.json({
    ok: true,
    message: "Thanks, we received your message.",
  });
}
