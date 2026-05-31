import type { KineticLeadInput } from "@/lib/kinetic-leads";

const HIGHLEVEL_CONTACTS_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";
const DEFAULT_HIGHLEVEL_API_VERSION = "2021-07-28";
const HIGHLEVEL_REQUEST_TIMEOUT_MS = 6000;

const HIGHLEVEL_CUSTOM_FIELD_IDS = {
  selectedModel: "NOjylK4NDQCCQuHGurfb",
  purchaseTimeframe: "dEBIp4cuQfYq7IGUFq9l",
  financingInterest: "J8Tm1N3NQZXjOv0t3BYY",
  reserveDepositInterest: "FFzZ4V0VALjfvN3gyDF6",
  kineticLocation: "T6jHJ253pchjRqatq3bw",
  intent: "kcDgbNseWZeN0AuDPjBG",
  message: "ONemjdBtKHxaEnjIOvMt",
} as const;

type HighLevelResult =
  | { configured: false; ok: false; reason: "missing-env" }
  | { configured: true; ok: true }
  | { configured: true; ok: false; reason: "request-failed" };

function getHighLevelConfig() {
  const token = process.env.HIGHLEVEL_PRIVATE_INTEGRATION_TOKEN;
  const locationId = process.env.HIGHLEVEL_LOCATION_ID;
  const apiVersion = process.env.HIGHLEVEL_API_VERSION || DEFAULT_HIGHLEVEL_API_VERSION;

  if (!token || !locationId) {
    return null;
  }

  return { apiVersion, locationId, token };
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const [firstName, ...lastNameParts] = parts;

  return {
    firstName: firstName || name.trim(),
    lastName: lastNameParts.join(" "),
  };
}

function buildCustomFields(lead: KineticLeadInput) {
  return [
    { id: HIGHLEVEL_CUSTOM_FIELD_IDS.selectedModel, field_value: lead.selectedModel },
    { id: HIGHLEVEL_CUSTOM_FIELD_IDS.purchaseTimeframe, field_value: lead.purchaseTimeframe },
    { id: HIGHLEVEL_CUSTOM_FIELD_IDS.financingInterest, field_value: lead.financingInterest },
    {
      id: HIGHLEVEL_CUSTOM_FIELD_IDS.reserveDepositInterest,
      field_value: lead.reserveDepositInterest,
    },
    { id: HIGHLEVEL_CUSTOM_FIELD_IDS.kineticLocation, field_value: lead.location },
    { id: HIGHLEVEL_CUSTOM_FIELD_IDS.intent, field_value: lead.intent },
    { id: HIGHLEVEL_CUSTOM_FIELD_IDS.message, field_value: lead.message },
  ].filter(({ field_value }) => field_value.trim().length > 0);
}

export async function upsertHighLevelContact(lead: KineticLeadInput): Promise<HighLevelResult> {
  const config = getHighLevelConfig();

  if (!config) {
    return { configured: false, ok: false, reason: "missing-env" };
  }

  const { firstName, lastName } = splitName(lead.name);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), HIGHLEVEL_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(HIGHLEVEL_CONTACTS_UPSERT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        Version: config.apiVersion,
      },
      signal: controller.signal,
      body: JSON.stringify({
        locationId: config.locationId,
        name: lead.name,
        firstName,
        ...(lastName ? { lastName } : {}),
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
        customFields: buildCustomFields(lead),
      }),
    });

    if (response.ok) {
      return { configured: true, ok: true };
    }

    console.error("Kinetic HighLevel contact upsert failed", {
      status: response.status,
      statusText: response.statusText,
      body: (await response.text()).slice(0, 500),
    });
  } catch (error) {
    console.error("Kinetic HighLevel contact upsert error", error);
  } finally {
    clearTimeout(timeout);
  }

  return { configured: true, ok: false, reason: "request-failed" };
}
