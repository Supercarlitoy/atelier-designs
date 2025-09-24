"use client";

import { FormEvent, useRef, useState } from "react";

import { track } from "@/lib/analytics";
import { useReveal } from "@/hooks/useReveal";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterSignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef, {
    threshold: 0.2,
    onReveal: () => track("reveal_view", { id: "newsletter", section: "newsletter", index: 0 })
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString().trim();

    if (!email) {
      setStatus("error");
      setMessage("Please add an email address.");
      return;
    }

    setStatus("loading");
    setMessage("Subscribing…");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      event.currentTarget.reset();
      setStatus("success");
      setMessage("Thanks! Check your inbox to confirm the subscription.");
      track("newsletter_subscribe", { source: "homepage" });
    } catch (error) {
      setStatus("error");
      setMessage("Could not subscribe right now. Try again later.");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="px-6 py-24 text-black"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-6 rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 p-10 text-center shadow-[0_16px_40px_rgba(15,18,24,0.08)]">
        <div>
          <p className="text-xs uppercase tracking-[0.3rem] text-black/50">Newsletter</p>
          <h2 id="newsletter-heading" className="mt-3 text-3xl font-semibold md:text-4xl">
            Stay in the loop on featured designers.
          </h2>
          <p className="mt-3 text-sm text-black/70">
            Subscribe for new profiles, case studies, and launch events. Double opt-in keeps the list clean.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-xl flex-col gap-3 md:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="name@studio.com"
            className="h-12 flex-1 rounded-full border border-black/10 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
            aria-describedby="newsletter-hint"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 rounded-full bg-black px-6 text-xs font-semibold uppercase tracking-[0.3rem] text-white focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-2 focus:ring-offset-white disabled:opacity-60"
          >
            {status === "loading" ? "Submitting…" : "Subscribe"}
          </button>
        </form>
        <p id="newsletter-hint" className="text-xs text-black/50" aria-live="polite">
          {message}
        </p>
      </div>
    </section>
  );
}
