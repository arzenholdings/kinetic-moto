"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AdminLoginFormProps = {
  nextPath: string;
};

export function AdminLoginForm({ nextPath }: AdminLoginFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setStatus("submitting");
    setErrorMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    if (!response.ok) {
      setStatus("error");
      setErrorMessage("Invalid admin credentials.");
      return;
    }

    router.push(nextPath);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Username</span>
        <input
          required
          type="text"
          name="username"
          autoComplete="username"
          className="mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
        />
      </label>

      <label className="block">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Password</span>
        <input
          required
          type="password"
          name="password"
          autoComplete="current-password"
          className="mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-orange-300 focus:ring-2 focus:ring-orange-200"
        />
      </label>

      <button type="submit" disabled={status === "submitting"} className="w-full rounded-full bg-orange-500 px-7 py-4 text-center text-base font-bold text-stone-950 shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 focus:ring-offset-stone-900 disabled:cursor-not-allowed disabled:bg-stone-600 disabled:text-stone-300 disabled:shadow-none">
        {status === "submitting" ? "Signing in..." : "Sign in"}
      </button>

      {status === "error" ? (
        <p className="rounded-full border border-red-300/30 bg-red-400/10 px-5 py-3 text-sm font-bold text-red-100" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}

