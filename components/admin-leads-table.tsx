"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContactLead } from "@/lib/supabase-leads";

type AdminLeadsTableProps = {
  leads: ContactLead[];
};

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

export function AdminLeadsTable({ leads }: AdminLeadsTableProps) {
  const router = useRouter();
  const [pendingLeadId, setPendingLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function updateLead(id: string, body: Record<string, string>) {
    setPendingLeadId(id);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Lead could not be updated.");
      }

      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Lead could not be updated.");
    } finally {
      setPendingLeadId(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      {errorMessage ? (
        <p className="border-b border-red-300/20 bg-red-400/10 px-6 py-4 text-sm font-bold text-red-100" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <table className="min-w-full divide-y divide-white/10 text-left">
        <thead className="bg-stone-950/80">
          <tr>
            {["Status", "Name", "Email", "Phone", "Message", "Internal notes", "Created"].map((heading) => (
              <th key={heading} scope="col" className="px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-stone-400">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {leads.map((lead) => {
            const isPending = pendingLeadId === lead.id;

            return (
              <tr key={lead.id} className="align-top transition hover:bg-white/5">
                <td className="whitespace-nowrap px-5 py-5">
                  {lead.reviewed_at ? (
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-stone-300">
                      Reviewed
                    </span>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <span className="w-fit rounded-full bg-orange-500 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-stone-950">
                        New
                      </span>
                      <button type="button" disabled={isPending} onClick={() => updateLead(lead.id, { action: "mark_reviewed" })} className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-2 text-xs font-bold text-orange-200 transition hover:border-orange-300 hover:bg-orange-400/20 disabled:cursor-not-allowed disabled:border-stone-700 disabled:bg-stone-800 disabled:text-stone-500">
                        {isPending ? "Saving..." : "Mark reviewed"}
                      </button>
                    </div>
                  )}
                </td>
                <td className="whitespace-nowrap px-5 py-5 font-bold text-white">{lead.name}</td>
                <td className="whitespace-nowrap px-5 py-5 text-orange-200">{lead.email}</td>
                <td className="whitespace-nowrap px-5 py-5 text-stone-300">{lead.phone || "Not provided"}</td>
                <td className="max-w-xl px-5 py-5 leading-7 text-stone-300">{lead.message}</td>
                <td className="min-w-72 px-5 py-5">
                  <form
                    className="flex flex-col gap-3"
                    onSubmit={(event) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      updateLead(lead.id, {
                        action: "save_notes",
                        internal_notes: String(formData.get("internal_notes") || ""),
                      });
                    }}
                  >
                    <textarea name="internal_notes" defaultValue={lead.internal_notes || ""} rows={3} className="w-full resize-y rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-stone-600 focus:border-orange-300 focus:ring-2 focus:ring-orange-200" placeholder="Add internal notes" />
                    <button type="submit" disabled={isPending} className="w-fit rounded-full bg-stone-100 px-4 py-2 text-xs font-bold text-stone-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-400">
                      {isPending ? "Saving..." : "Save notes"}
                    </button>
                  </form>
                </td>
                <td className="whitespace-nowrap px-5 py-5 text-stone-400">{formatDate(lead.created_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
