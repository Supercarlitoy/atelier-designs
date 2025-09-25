"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitted");
    event.currentTarget.reset();
  };

  return (
    <main className="bg-[#f7f7f7] pb-24 pt-20 text-black">
      <section className="mx-auto max-w-4xl rounded-3xl border border-black/10 bg-white px-6 py-10 shadow-[0_18px_40px_rgba(15,18,24,0.08)] sm:p-12">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/40">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Let’s build your shortlist.</h1>
        <p className="mt-4 text-base text-black/70 md:text-lg">
          Whether you’re planning a rebrand, product launch, or exhibition, share a few details and we’ll curate designers that match your timeline, budget, and culture.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2 text-sm text-black/70">
              <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Name</span>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
              />
            </label>
            <label className="space-y-2 text-sm text-black/70">
              <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Email</span>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
              />
            </label>
          </div>
          <label className="space-y-2 text-sm text-black/70">
            <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Organisation</span>
            <input
              type="text"
              name="organisation"
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
            />
          </label>
          <label className="space-y-2 text-sm text-black/70">
            <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Project overview</span>
            <textarea
              name="brief"
              rows={5}
              required
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
              placeholder="Tell us about scope, timing, and what success looks like."
            />
          </label>
          <label className="flex items-center gap-3 text-xs text-black/60">
            <input type="checkbox" name="consent" required className="h-4 w-4 rounded border-black/20" />
            I agree to receive follow-up emails about my enquiry.
          </label>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
          >
            Send enquiry
          </button>
        </form>

        {status === "submitted" ? (
          <p className="mt-6 text-sm text-green-600">Thanks! We’ll be in touch within 24 hours.</p>
        ) : null}
      </section>
    </main>
  );
}
