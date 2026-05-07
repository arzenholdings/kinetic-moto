import type { Metadata } from "next";
import Link from "next/link";

type ContactLead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

type LeadsResult = {
  leads: ContactLead[];
  status: "ready" | "unconfigured" | "error";
  message?: string;
};

const SUPABASE_CONTACT_LEADS_TABLE = "contact_leads";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Leads | Kinetic Moto",
  description: "Read-only contact lead dashboard for Kinetic Moto.",
};

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
    typeof lead.created_at === "string"
  );
}

async function getContactLeads(): Promise<LeadsResult> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      leads: [],
      status: "unconfigured",
      message: "Supabase is not configured yet. Add the Supabase env vars to load leads here.",
    };
  }

  const endpoint = new URL(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${SUPABASE_CONTACT_LEADS_TABLE}`);
  endpoint.searchParams.set("select", "id,name,email,phone,message,created_at");
  endpoint.searchParams.set("order", "created_at.desc");

  try {
    const response = await fetch(endpoint, {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
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

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminLeadsPage() {
  const { leads, status, message } = await getContactLeads();

  return (
    <main className="min-h-screen overflow-hidden bg-stone-950 text-stone-50">
      <section className="relative isolate px-6 py-10 sm:px-8 lg:px-12" aria-labelledby="admin-leads-heading">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),_transparent_34%),linear-gradient(135deg,_#0c0a09_0%,_#1c1917_50%,_#292524_100%)]" />
        <div className="mx-auto max-w-7xl py-14 lg:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-orange-300">Admin</p>
              <h1 id="admin-leads-heading" className="mt-3 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Contact leads
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
                Read-only view of recent contact form submissions from Supabase.
              </p>
            </div>
            <Link href="/contact" className="rounded-full border border-orange-400/30 bg-orange-400/10 px-5 py-3 text-center text-sm font-bold text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-950">
              View contact form
            </Link>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-stone-900/80 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="flex flex-col justify-between gap-3 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-black text-white">Recent leads</h2>
                <p className="mt-1 text-sm text-stone-400">Most recent submissions appear first.</p>
              </div>
              <span className="w-fit rounded-full bg-white/5 px-3 py-1 text-sm font-bold text-stone-300">
                {leads.length} {leads.length === 1 ? "lead" : "leads"}
              </span>
            </div>

            {leads.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10 text-left">
                  <thead className="bg-stone-950/80">
                    <tr>
                      {["Name", "Email", "Phone", "Message", "Created"].map((heading) => (
                        <th key={heading} scope="col" className="px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-stone-400">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="align-top transition hover:bg-white/5">
                        <td className="whitespace-nowrap px-5 py-5 font-bold text-white">{lead.name}</td>
                        <td className="whitespace-nowrap px-5 py-5 text-orange-200">{lead.email}</td>
                        <td className="whitespace-nowrap px-5 py-5 text-stone-300">{lead.phone || "Not provided"}</td>
                        <td className="max-w-xl px-5 py-5 leading-7 text-stone-300">{lead.message}</td>
                        <td className="whitespace-nowrap px-5 py-5 text-stone-400">{formatDate(lead.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <p className="text-2xl font-black text-white">No leads to show.</p>
                <p className="mx-auto mt-3 max-w-xl leading-7 text-stone-400">
                  {message || (status === "ready" ? "New contact form submissions will appear here." : "Lead data is unavailable right now.")}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
