"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { track } from "@/lib/analytics";
import { useParallax } from "@/hooks/useParallax";
import { useReveal } from "@/hooks/useReveal";

type LeadModalProps = {
  onClose: () => void;
};

type SubmitState = "idle" | "success";

const SERVICE_OPTIONS = [
  "Brand Identity",
  "Digital Product",
  "Interior / Spatial",
  "Experiential",
  "Strategy",
  "Content"
];

function LeadModal({ onClose }: LeadModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!dialogRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    firstFieldRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      previouslyFocused?.focus();
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const services = formData.getAll("services").map((value) => value.toString());

    const suburb = formData.get("suburb");

    track("lead_submit", {
      success: true,
      source: "lead_strip",
      services,
      suburb: suburb ? suburb.toString() : undefined
    });

    setSubmitState("success");
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = "Thanks! We’ll be in touch shortly.";
    }
    event.currentTarget.reset();
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 px-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-heading"
        className="w-full max-w-2xl rounded-3xl bg-white p-8 text-black shadow-[0_32px_64px_rgba(15,18,24,0.16)]"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-black/50">Request connected designers</p>
            <h3 id="lead-modal-heading" className="mt-2 text-3xl font-semibold">
              Tell us about your project
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close lead form"
            onClick={onClose}
            className="rounded-full border border-black/10 px-4 py-2 text-sm"
          >
            ✕
          </button>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="lead-name" className="text-xs uppercase tracking-[0.3rem] text-black/50">
                Your name
              </label>
              <input
                id="lead-name"
                ref={firstFieldRef}
                name="name"
                type="text"
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
                placeholder="Jordan Smith"
                required
              />
            </div>
            <div>
              <label htmlFor="lead-email" className="text-xs uppercase tracking-[0.3rem] text-black/50">
                Email
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
                placeholder="jordan@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="lead-suburb" className="text-xs uppercase tracking-[0.3rem] text-black/50">
                Suburb
              </label>
              <input
                id="lead-suburb"
                name="suburb"
                type="text"
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
                placeholder="Collingwood"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.3rem] text-black/50">Services needed</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((option) => (
                  <label key={option} className="flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-xs text-black/70">
                    <input type="checkbox" name="services" value={option} className="h-4 w-4" />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="lead-brief" className="text-xs uppercase tracking-[0.3rem] text-black/50">
              Project brief
            </label>
            <textarea
              id="lead-brief"
              name="brief"
              rows={5}
              className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              placeholder="Outline scope, budget, timelines, and dream outcomes."
              required
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-black/60">
            <input type="checkbox" name="consent" required className="h-4 w-4" />
            I agree to be contacted about my enquiry and receive occasional directory updates.
          </label>
          <div className="flex items-center justify-between">
            <div
              ref={liveRegionRef}
              className="text-xs text-black/60"
              aria-live="polite"
            >
              {submitState === "success" ? "Thanks! We’ll be in touch shortly." : ""}
            </div>
            <button
              type="submit"
              className="rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.3rem] text-white focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-2 focus:ring-offset-white"
            >
              Submit brief
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default function LeadStrip() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef, {
    threshold: 0.2,
    onReveal: () => track("reveal_view", { id: "lead-strip", section: "lead", index: 0 })
  });
  useParallax(sectionRef, { depth: 2 });

  const handleOpen = () => {
    setOpen(true);
    track("lead_cta_open", { source: "lead_strip" });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section
      ref={sectionRef}
      id="lead"
      aria-labelledby="lead-heading"
      className="bg-[#f8f1e6] px-6 py-24 text-black"
    >
      <div className="mx-auto max-w-6xl rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 p-12 text-center shadow-[0_16px_40px_rgba(15,18,24,0.08)]">
        <p className="text-xs uppercase tracking-[0.3rem] text-black/50">Lead capture</p>
        <h2 id="lead-heading" className="mt-3 text-3xl font-semibold md:text-4xl">
          Request connected designers for your next project.
        </h2>
        <p className="mt-4 text-sm text-black/70 md:text-base">
          Share a quick brief and we&apos;ll match you with curated studios and independents suited to your timeline, budget, and goals.
        </p>
        <button
          type="button"
          onClick={handleOpen}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.3rem] text-white focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-2 focus:ring-offset-white"
        >
          Request a brief
        </button>
      </div>
      {open ? <LeadModal onClose={handleClose} /> : null}
    </section>
  );
}
