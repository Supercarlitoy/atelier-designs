"use client";

import { useRef } from "react";

import { useParallax } from "@/hooks/useParallax";
import { useReveal } from "@/hooks/useReveal";
import { track } from "@/lib/analytics";

export default function Hero() {
  const circleLargeRef = useRef<HTMLDivElement>(null);
  const circleMidRef = useRef<HTMLDivElement>(null);
  const circleSmallRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useParallax(circleLargeRef, { depth: 2, axis: "both", maxShift: 10 });
  useParallax(circleMidRef, { depth: 1, invert: true, maxShift: 7 });
  useParallax(circleSmallRef, { depth: 1, axis: "x", maxShift: 5 });
  useReveal(headingRef, {
    threshold: 0.4,
    onReveal: () => track("reveal_view", { id: "hero-heading", section: "hero", index: 0 })
  });
  useReveal(paragraphRef, {
    threshold: 0.4,
    delayMs: 90,
    onReveal: () => track("reveal_view", { id: "hero-supporting", section: "hero", index: 1 })
  });

  const handleClaimClick = () => {
    track("hero_claim_click", { source: "hero" });
  };

  return (
    <section
      id="hero"
      className="hero-gradient relative overflow-hidden px-6 pb-20 pt-14 text-black md:px-14 md:pb-30 md:pt-24"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <h1
            ref={headingRef}
            id="hero-heading"
            className="reveal-target font-medium tracking-[-0.015em] text-[#111111]"
            style={{ fontSize: "clamp(36px, 5.6vw, 84px)", lineHeight: 1.08 }}
          >
            <span className="block whitespace-nowrap text-[#111111]">Designers. Curated.</span>
            <span className="mt-1 block text-[#f6f6f6]">Melbourne.</span>
          </h1>
        </div>
        <div className="md:col-span-4 md:col-start-8 md:justify-self-end">
          <p
            ref={paragraphRef}
            className="max-w-xs text-sm leading-relaxed text-[#1c1c1c] md:max-w-sm md:text-base"
          >
            We hand-vet studios and independents so founders, cultural teams, and developers can connect with Melbourne&apos;s strongest creative talent.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="/designers"
              className="rounded-full bg-black px-7 py-3 text-xs font-semibold uppercase tracking-[0.32rem] text-white shadow-[0_18px_28px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5"
            >
              Explore designers
            </a>
            <a
              href="/claim"
              onClick={handleClaimClick}
              className="text-xs uppercase tracking-[0.42rem] text-black/65 underline decoration-black/35 underline-offset-10"
            >
              Claim your profile →
            </a>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none"
        aria-hidden
      >
        <div
          ref={circleLargeRef}
          className="absolute -left-36 bottom-[-220px] h-[520px] w-[520px] rounded-full border border-white/25"
        />
        <div
          ref={circleMidRef}
          className="absolute left-[72px] bottom-[-150px] h-[420px] w-[420px] rounded-full border border-white/18"
        />
        <div
          ref={circleSmallRef}
          className="absolute left-[240px] bottom-[-110px] h-[260px] w-[260px] rounded-full border border-white/15"
        />
      </div>
      <div className="pointer-events-none absolute bottom-[70px] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/70" />
    </section>
  );
}
