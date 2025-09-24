"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import designers from "@/data/featured-designers.seed.json";
import { useParallax } from "@/hooks/useParallax";
import { useReveal } from "@/hooks/useReveal";
import { track } from "@/lib/analytics";

type Designer = (typeof designers)[number];

type ContactModalProps = {
  designer: Designer;
  onClose: () => void;
};

function ContactModal({ designer, onClose }: ContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const nameId = `contact-name-${designer.slug}`;
  const emailId = `contact-email-${designer.slug}`;
  const briefId = `contact-brief-${designer.slug}`;

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

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-designer-heading"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-lg rounded-3xl bg-white p-8 text-black shadow-[0_32px_64px_rgba(15,18,24,0.18)]"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-black/60">Contact designer</p>
            <h3 id="contact-designer-heading" className="mt-2 text-2xl font-semibold">
              {designer.name}
            </h3>
            <p className="text-sm text-black/60">
              {designer.location} • {designer.services.slice(0, 3).join(", ")}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close contact form"
            onClick={onClose}
            className="rounded-full border border-black/10 px-4 py-2 text-sm"
          >
            ✕
          </button>
        </div>
        <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
          <div>
            <label htmlFor={nameId} className="text-xs uppercase tracking-[0.3rem] text-black/50">
              Your name
            </label>
            <input
              id={nameId}
              ref={firstFieldRef}
              type="text"
              className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              placeholder="Alex Lee"
              required
            />
          </div>
          <div>
            <label htmlFor={emailId} className="text-xs uppercase tracking-[0.3rem] text-black/50">
              Email
            </label>
            <input
              id={emailId}
              type="email"
              className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              placeholder="alex@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor={briefId} className="text-xs uppercase tracking-[0.3rem] text-black/50">
              Project brief
            </label>
            <textarea
              id={briefId}
              rows={4}
              className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
              placeholder="Tell us a little about the work you need."
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-black/60">
              <input type="checkbox" className="h-4 w-4 rounded border-black/20" />
              Keep me on the directory launch list
            </label>
            <button
              type="submit"
              className="rounded-full bg-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.2rem] text-white"
            >
              Send brief
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

type CardProps = {
  designer: Designer;
  index: number;
  onContact: (designer: Designer) => void;
};

function FeaturedDesignerCard({ designer, index, onContact }: CardProps) {
  const cardRef = useRef<HTMLLIElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const hasTrackedView = useRef(false);

  useParallax(imageRef, 2);
  useReveal(cardRef, {
    threshold: 0.4,
    delayMs: index * 60,
    onReveal: () =>
      track("reveal_view", {
        id: `featured-${designer.slug}`,
        section: "featured",
        index
      })
  });

  useEffect(() => {
    const node = cardRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            hasTrackedView.current = true;
            track("featured_profile_view", {
              designer_id: designer.id,
              slug: designer.slug,
              index
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [designer.id, designer.slug, index]);

  return (
    <li
      ref={cardRef}
      role="listitem"
      className="snap-start min-w-[72%] first:min-w-[80%] md:min-w-0 md:snap-none"
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 shadow-[0_24px_48px_rgba(15,18,24,0.08)] transition-transform duration-300 ease-out hover:scale-[1.02] md:min-h-[520px]">
        <div
          ref={imageRef}
          className="relative h-56 overflow-hidden bg-[#d8d9da]"
        >
          <img
            src="/og-template.png"
            alt={`Placeholder project collage for ${designer.name}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent" />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6 text-black">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold leading-tight">{designer.name}</h3>
            <p className="text-sm text-black/60">
              {designer.location} • {designer.services.join(", ")}
            </p>
          </div>
          <p className="text-sm text-black/70">{designer.bio}</p>
          <p className="text-xs uppercase tracking-[0.3rem] text-black/50">
            Rating {designer.rating.toFixed(1)} / 5
          </p>
          <div className="mt-auto flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                track("profile_contact_click", {
                  designer_id: designer.id,
                  slug: designer.slug,
                  source: "featured" 
                });
                onContact(designer);
              }}
              aria-label={`Contact ${designer.name}`}
              className="rounded-full bg-black px-5 py-2 text-xs font-semibold uppercase tracking-[0.3rem] text-white focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-2 focus:ring-offset-white"
            >
              Contact
            </button>
            <a
              href={designer.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${designer.name} profile`}
              className="rounded-full border border-black/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3rem] text-black transition-colors hover:border-black focus:outline-none focus:ring-2 focus:ring-[var(--focus)] focus:ring-offset-2 focus:ring-offset-white"
            >
              View profile
            </a>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function FeaturedDesignersCarousel() {
  const [activeDesigner, setActiveDesigner] = useState<Designer | null>(null);
  const listStyles = useMemo(
    () =>
      "flex snap-x gap-6 overflow-x-auto pb-6 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0",
    []
  );

  return (
    <section id="featured" aria-labelledby="featured-heading" className="px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-black/50">Featured designers</p>
            <h2 id="featured-heading" className="text-3xl font-semibold md:text-4xl">
              Curated Melbourne studios in focus.
            </h2>
          </div>
          <a
            href="/designers"
            className="text-xs uppercase tracking-[0.3rem] text-black underline"
          >
            View all →
          </a>
        </div>
        <ul role="list" className={listStyles}>
          {designers.map((designer, index) => (
            <FeaturedDesignerCard
              key={designer.id}
              designer={designer}
              index={index}
              onContact={(selection) => setActiveDesigner(selection)}
            />
          ))}
        </ul>
      </div>
      {activeDesigner ? (
        <ContactModal designer={activeDesigner} onClose={() => setActiveDesigner(null)} />
      ) : null}
    </section>
  );
}
