"use client";

import { useState, useTransition } from "react";

import designers from "@/data/profiles.seed.json";
import { track } from "@/lib/analytics";

const STUDIO_OPTIONS = designers.map((profile) => ({ value: profile.slug, label: profile.name }));

type ClaimStatus = "idle" | "success" | "error";

export default function ClaimPage() {
  const [status, setStatus] = useState<ClaimStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    startTransition(async () => {
      try {
        const response = await fetch("/api/profiles/claim", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        track("profile_claim_request", {
          slug: payload.profileSlug,
          email: payload.email
        });

        setStatus("success");
        setMessage("Thanks! Our team will review and confirm within 2 business days.");
        form.reset();
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      }
    });
  };

  return (
    <main className="bg-[#f4f4f4] pb-24 pt-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 p-10 shadow-[0_24px_60px_rgba(15,18,24,0.12)]">
        <p className="text-xs uppercase tracking-[0.4rem] text-black/40">Claim a profile</p>
        <h1 className="mt-2 text-3xl font-semibold text-black md:text-4xl">
          Verify ownership of an existing studio profile.
        </h1>
        <p className="mt-4 text-sm text-black/70">
          Complete the form below so we can connect the live profile to your account. We&apos;ll send a verification email and follow up if we need more information.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2 text-sm text-black/70">
              <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Your name</span>
              <input
                name="fullName"
                type="text"
                required
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              />
            </label>
            <label className="space-y-2 text-sm text-black/70">
              <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Work email</span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              />
            </label>
          </div>
          <label className="space-y-2 text-sm text-black/70">
            <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Which profile are you claiming?</span>
            <select
              name="profileSlug"
              required
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              defaultValue=""
            >
              <option value="" disabled>
                Select a studio
              </option>
              {STUDIO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm text-black/70">
            <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Proof of ownership</span>
            <textarea
              name="proof"
              rows={4}
              required
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              placeholder="Share links or details we can use to confirm you represent this studio."
            />
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.3rem] text-white transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Submitting…" : "Submit claim"}
          </button>
        </form>

        {status !== "idle" ? (
          <p
            role="status"
            className={`mt-6 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </main>
  );
}
