"use client";

import { useRef } from "react";

import { useParallax } from "@/hooks/useParallax";
import { useReveal } from "@/hooks/useReveal";
import { track } from "@/lib/analytics";

const STEPS = [
  {
    title: "Discover",
    description: "Browse Melbourne’s curated designers by style and suburb."
  },
  {
    title: "Connect",
    description: "Shortlist and contact verified designers securely."
  },
  {
    title: "Hire",
    description: "Start projects with clarity. Designers manage their profile, portfolio, and services."
  }
];

type StepCardProps = {
  title: string;
  description: string;
  index: number;
};

function StepCard({ title, description, index }: StepCardProps) {
  const ref = useRef<HTMLLIElement>(null);
  useReveal(ref, {
    threshold: 0.3,
    delayMs: index * 80,
    onReveal: () =>
      track("reveal_view", {
        id: `how-step-${index}`,
        section: "how_it_works",
        index
      })
  });

  return (
    <li ref={ref} className="rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/90 p-6 text-black shadow-[0_12px_32px_rgba(15,18,24,0.06)]">
      <p className="text-xs uppercase tracking-[0.3rem] text-black/40">Step {index + 1}</p>
      <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-black/70">{description}</p>
    </li>
  );
}

export default function HowItWorks() {
  const calloutRef = useRef<HTMLDivElement>(null);
  useReveal(calloutRef, {
    threshold: 0.3,
    delayMs: 120,
    onReveal: () =>
      track("reveal_view", {
        id: "how-callout",
        section: "how_it_works",
        index: STEPS.length
      })
  });
  useParallax(calloutRef, 1);

  const handleClaimClick = () => {
    track("profile_claim_click", { source: "how_it_works" });
  };

  return (
    <section id="process" aria-labelledby="how-it-works-heading" className="bg-[#f6f6f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3rem] text-black/50">How it works</p>
          <h2 id="how-it-works-heading" className="mt-3 text-3xl font-semibold md:text-4xl">
            Simple pathways for clients and designers to meet.
          </h2>
        </div>
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <StepCard key={step.title} index={index} {...step} />
          ))}
        </ol>
        <div
          ref={calloutRef}
          className="mt-12 flex flex-col gap-4 rounded-3xl border border-black/10 bg-black text-white p-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-white/60">Designer callout</p>
            <p className="mt-2 text-lg font-semibold">
              Are you a designer? Apply to be curated and claim your profile.
            </p>
          </div>
          <a
            href="/claim"
            onClick={handleClaimClick}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3rem] text-black focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-2 focus:ring-offset-black"
          >
            Claim your profile
          </a>
        </div>
        <div className="mt-12 rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 p-8 text-sm text-black/70 shadow-[0_12px_32px_rgba(15,18,24,0.05)]">
          <p className="text-xs uppercase tracking-[0.3rem] text-black/50">Profile system scaffolding</p>
          <ul className="mt-4 space-y-2">
            <li>Claim flow: `/claim?slug=:designer` verifies ownership before unlocking edits.</li>
            <li>New signups auto-create a draft profile with supplied studio details.</li>
            <li>Workflow states: <code>DRAFT → UNDER_REVIEW → PUBLISHED | REJECTED</code> with moderation guardrails.</li>
            <li>API endpoints: `POST /api/profiles`, `PUT /api/profiles/:id`, `POST /api/profiles/:id/submit`, `POST /api/profiles/:id/share/og`.</li>
            <li>Analytics hooks queued: `profile_created`, `profile_submit_review`, `profile_share_click`.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
