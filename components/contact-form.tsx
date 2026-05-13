"use client";

import { FormEvent, useState } from "react";

type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  bike_slug: string;
  interest_type: string;
  financing_interest: boolean;
  budget_range: string;
  purchase_timeframe: string;
  company: string;
  started_at: string;
};

type ContactFormProps = {
  initialBikeSlug?: string;
  initialInterestType?: string;
  initialFinancingInterest?: boolean;
};

const defaultFormState: LeadFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  bike_slug: "",
  interest_type: "general",
  financing_interest: false,
  budget_range: "",
  purchase_timeframe: "",
  company: "",
  started_at: "",
};

function getInitialFormState({
  initialBikeSlug = "",
  initialInterestType = "general",
  initialFinancingInterest = false,
}: ContactFormProps): LeadFormState {
  const interestType = initialInterestType || "general";

  return {
    ...defaultFormState,
    bike_slug: initialBikeSlug,
    interest_type: interestType,
    financing_interest: initialFinancingInterest || interestType === "financing",
    started_at: String(Date.now()),
  };
}

export function ContactForm(props: ContactFormProps) {
  const initialFormState = getInitialFormState(props);
  const [formState, setFormState] = useState(initialFormState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field: keyof LeadFormState, value: string | boolean) {
    setFormState((current) => ({ ...current, [field]: value }));
    setStatus("idle");
    setErrorMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message.");
      }

      setStatus("success");
      setFormState(initialFormState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to send your message.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-stone-900/80 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8" aria-label="Contact Kinetic Moto">
      <div className="grid gap-5 sm:grid-cols-2">
        <input
          type="text"
          name="company"
          value={formState.company}
          onChange={(event) => updateField("company", event.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <input type="hidden" name="started_at" value={formState.started_at} readOnly />

        <label className="block">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Name</span>
          <input
            required
            type="text"
            name="name"
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Email</span>
          <input
            required
            type="email"
            name="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Phone</span>
        <input
          type="tel"
          name="phone"
          value={formState.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className="mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
          placeholder="(555) 123-4567"
        />
      </label>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Bike</span>
          <input
            type="text"
            name="bike_slug"
            value={formState.bike_slug}
            onChange={(event) => updateField("bike_slug", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
            placeholder="volt-rs"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Interest</span>
          <select
            name="interest_type"
            value={formState.interest_type}
            onChange={(event) => {
              const nextInterestType = event.target.value;
              setFormState((current) => ({
                ...current,
                interest_type: nextInterestType,
                financing_interest: nextInterestType === "financing" ? true : current.financing_interest,
              }));
              setStatus("idle");
              setErrorMessage("");
            }}
            className="mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
          >
            <option value="general">General question</option>
            <option value="book_ride">Book a ride</option>
            <option value="financing">Financing</option>
            <option value="fleet">Fleet sales</option>
            <option value="support">Support</option>
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Budget</span>
          <select
            name="budget_range"
            value={formState.budget_range}
            onChange={(event) => updateField("budget_range", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
          >
            <option value="">Select range</option>
            <option value="under_15000">Under $15k</option>
            <option value="15000_20000">$15k-$20k</option>
            <option value="20000_25000">$20k-$25k</option>
            <option value="25000_plus">$25k+</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Timeline</span>
          <select
            name="purchase_timeframe"
            value={formState.purchase_timeframe}
            onChange={(event) => updateField("purchase_timeframe", event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
          >
            <option value="">Select timing</option>
            <option value="now">Ready now</option>
            <option value="30_days">Within 30 days</option>
            <option value="90_days">Within 90 days</option>
            <option value="researching">Researching</option>
          </select>
        </label>
      </div>

      <label className="mt-5 flex items-center gap-3 rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white">
        <input
          type="checkbox"
          name="financing_interest"
          checked={formState.financing_interest}
          onChange={(event) => updateField("financing_interest", event.target.checked)}
          className="h-5 w-5 rounded border-stone-600 bg-stone-900 text-orange-500 focus:ring-orange-200"
        />
        <span className="font-bold">I want financing information</span>
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Message</span>
        <textarea
          required
          name="message"
          value={formState.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="mt-2 min-h-40 w-full resize-y rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
          placeholder="Tell us which bike, route, or fleet question is on your mind."
        />
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "submitting"} className="rounded-full bg-orange-500 px-7 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-900 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-300 disabled:shadow-none">
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" ? (
          <p className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100" role="status">
            Thanks, we received your message.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="rounded-full border border-red-300/30 bg-red-400/10 px-5 py-3 text-sm font-bold text-red-100" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
