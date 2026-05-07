"use client";

import { FormEvent, useState } from "react";

type LeadFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialFormState: LeadFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function updateField(field: keyof LeadFormState, value: string) {
    setFormState((current) => ({ ...current, [field]: value }));
    setIsSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Kinetic Moto lead form submitted", formState);
    setIsSubmitted(true);
    setFormState(initialFormState);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-stone-900/80 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8" aria-label="Contact Kinetic Moto">
      <div className="grid gap-5 sm:grid-cols-2">
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
        <button type="submit" className="rounded-full bg-orange-500 px-7 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-900">
          Send Message
        </button>

        {isSubmitted ? (
          <p className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-100" role="status">
            Thanks. Your message was logged.
          </p>
        ) : null}
      </div>
    </form>
  );
}
