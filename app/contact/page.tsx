"use client";

import { FormEvent, useState, useTransition } from "react";

import { track } from "@/lib/analytics";

type ContactStatus = "idle" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("consent")) {
      setStatus("error");
      setMessage("Please provide consent so we can follow up.");
      return;
    }

    const payload = {
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      organisation: formData.get("organisation")?.toString().trim() ?? "",
      brief: formData.get("brief")?.toString().trim(),
      consent: true
    };

    startTransition(async () => {
      try {
        const response = await fetch("/api/leads/submit", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload)
        });

        const json = (await response.json().catch(() => null)) as
          | { ok: boolean; message?: string; error?: string }
          | null;

        if (!response.ok || !json?.ok) {
          const errorCode = json?.error;
          const friendlyMessage =
            errorCode === "duplicate_submission"
              ? "We already have your enquiry. We’ll reply shortly."
              : errorCode === "configuration_error"
                ? "Contact form is temporarily offline. Please email hello@atelierdesigns.com."
                : json?.message ?? "Could not send enquiry right now. Please try again later.";

          setStatus("error");
          setMessage(friendlyMessage);
          return;
        }

        track("lead_submit", { source: "contact_page" });
        setStatus("success");
        setMessage("Thanks! We’ll be in touch within 24 hours.");
        form.reset();
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage("Could not send enquiry right now. Please try again later.");
      }
    });
  };

  return (
    <main className="bg-[#f7f7f7] pb-24 pt-20 text-black">
      <section className="mx-auto max-w-4xl rounded-3xl border border-black/10 bg-white px-6 py-10 shadow-[0_18px_40px_rgba(15,18,24,0.08)] sm:p-12">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/75">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Let’s build your shortlist.</h1>
        <p className="mt-4 text-base text-black/70 md:text-lg">
          Whether you’re planning a rebrand, product launch, or exhibition, share a few details and we’ll curate designers that match your timeline, budget, and culture.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2 text-sm text-black/70">
              <span className="text-xs uppercase tracking-[0.3rem] text-black/75">Name</span>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
              />
            </label>
            <label className="space-y-2 text-sm text-black/70">
              <span className="text-xs uppercase tracking-[0.3rem] text-black/75">Email</span>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
              />
            </label>
          </div>
          <label className="space-y-2 text-sm text-black/70">
            <span className="text-xs uppercase tracking-[0.3rem] text-black/75">Organisation</span>
            <input
              type="text"
              name="organisation"
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
            />
          </label>
          <label className="space-y-2 text-sm text-black/70">
            <span className="text-xs uppercase tracking-[0.3rem] text-black/75">Project overview</span>
            <textarea
              name="brief"
              rows={5}
              required
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
              placeholder="Tell us about scope, timing, and what success looks like."
            />
          </label>
          <label className="flex items-center gap-3 text-xs text-black/75">
            <input type="checkbox" name="consent" required className="h-4 w-4 rounded border-black/20" />
            I agree to receive follow-up emails about my enquiry.
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isPending ? "Sending…" : "Send enquiry"}
          </button>
        </form>

        <p className="mt-6 text-sm" aria-live="polite">
          {status === "success" ? (
            <span className="text-green-600">{message}</span>
          ) : status === "error" ? (
            <span className="text-red-600">{message}</span>
          ) : null}
        </p>
      </section>
    </main>
  );
}
