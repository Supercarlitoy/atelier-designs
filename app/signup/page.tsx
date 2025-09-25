"use client";

import { useMemo, useState, useTransition } from "react";

import featuredDesigners from "@/data/featured-designers.seed.json";
import { track } from "@/lib/analytics";

const SERVICE_OPTIONS = Array.from(
  new Set(featuredDesigners.flatMap((designer) => designer.services))
).sort();

type SignupStatus = "idle" | "success" | "error";

export default function SignupPage() {
  const [status, setStatus] = useState<SignupStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const services = useMemo(() => SERVICE_OPTIONS, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.services = formData.getAll("services");

    startTransition(async () => {
      try {
        const response = await fetch("/api/profiles/signup", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        track("signup_complete", {
          email: payload.email,
          services: payload.services
        });

        setStatus("success");
        setMessage("Thanks! Your draft profile has been created. Check your inbox to continue onboarding.");
        form.reset();
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage("Could not create profile right now. Please try again later.");
      }
    });
  };

  return (
    <main className="bg-[#f4f4f4] pb-24 pt-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 p-10 shadow-[0_24px_60px_rgba(15,18,24,0.12)]">
        <p className="text-xs uppercase tracking-[0.4rem] text-black/40">Designer signup</p>
        <h1 className="mt-2 text-3xl font-semibold text-black md:text-4xl">
          List your Melbourne studio in the directory.
        </h1>
        <p className="mt-4 text-sm text-black/70">
          Tell us about your practice and the types of work you deliver. We&apos;ll spin up a draft profile and guide you through the moderation checklist before going live.
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
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2 text-sm text-black/70">
              <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Studio name</span>
              <input
                name="studioName"
                type="text"
                required
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              />
            </label>
            <label className="space-y-2 text-sm text-black/70">
              <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Location / suburb</span>
              <input
                name="location"
                type="text"
                required
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              />
            </label>
          </div>
          <label className="space-y-2 text-sm text-black/70">
            <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Website</span>
            <input
              name="website"
              type="url"
              required
              placeholder="https://"
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
            />
          </label>
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-black/40">Services you offer</p>
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {services.map((service) => (
                <label key={service} className="flex items-center gap-2 rounded-xl border border-black/15 px-3 py-2 text-sm text-black/70">
                  <input type="checkbox" name="services" value={service} />
                  {service}
                </label>
              ))}
            </div>
          </div>
          <label className="space-y-2 text-sm text-black/70">
            <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Tell us about your studio</span>
            <textarea
              name="bio"
              rows={5}
              required
              className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              placeholder="Who do you design for? What makes your practice unique?"
            />
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.3rem] text-white transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Creating profile…" : "Create draft profile"}
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
