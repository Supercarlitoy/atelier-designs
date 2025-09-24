"use client";

import { useRef } from "react";

import { useParallax } from "@/hooks/useParallax";
import { useReveal } from "@/hooks/useReveal";
import { track } from "@/lib/analytics";

export default function Hero() {
  const circleLargeRef = useRef<HTMLDivElement>(null);
  const circleSmallRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useParallax(circleLargeRef, 3);
  useParallax(circleSmallRef, 2);
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
      className="hero-gradient relative overflow-hidden px-6 py-24 text-black md:px-10 md:py-32"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <h1
            ref={headingRef}
            id="hero-heading"
            className="reveal-target font-black leading-[0.95]"
            style={{ fontSize: "clamp(42px, -3.07px + 9vw, 170px)" }}
          >
            <span className="block text-[#000000]">Designers. Curated.</span>
            <span className="block text-[#ffffff]">Melbourne.</span>
          </h1>
        </div>
        <div className="md:col-span-5 md:justify-self-end">
          <p
            ref={paragraphRef}
            className="max-w-sm text-base text-[#000000] md:text-lg"
          >
            We hand-vet studios and independents so founders, cultural teams, and developers can connect with Melbourne&apos;s strongest creative talent.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="/designers"
              className="rounded-full border border-black/20 bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.2rem] text-white"
            >
              Explore designers
            </a>
            <a
              href="/claim"
              onClick={handleClaimClick}
              className="text-sm uppercase tracking-[0.3rem] text-black/70 underline decoration-black/30 underline-offset-4"
            >
              Claim your profile →
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none" aria-hidden>
        <div
          ref={circleLargeRef}
          className="absolute -left-32 bottom-[-140px] h-[420px] w-[420px] rounded-full border border-black/10"
        />
        <div
          ref={circleSmallRef}
          className="absolute -left-10 bottom-[-60px] h-[220px] w-[220px] rounded-full border border-black/15"
        />
      </div>
    </section>
  );
}
