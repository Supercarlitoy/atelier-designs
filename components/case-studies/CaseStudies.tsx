"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import caseStudies from "@/data/case-studies.seed.json";
import { useParallax } from "@/hooks/useParallax";
import { useReveal } from "@/hooks/useReveal";
import { track } from "@/lib/analytics";

type CaseStudy = (typeof caseStudies)[number];

type CaseStudyCardProps = {
  study: CaseStudy;
  index: number;
};

function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const hasTrackedRef = useRef(false);

  useParallax(imageRef, {
    depth: 2,
    axis: index % 2 === 0 ? "y" : "x",
    invert: index % 2 === 1
  });
  useReveal(cardRef, {
    threshold: 0.3,
    delayMs: index * 80,
    onReveal: () =>
      track("reveal_view", {
        id: `case-study-${study.slug}`,
        section: "case_studies",
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
          if (entry.isIntersecting && !hasTrackedRef.current) {
            hasTrackedRef.current = true;
            track("project_view", { slug: study.slug, index });
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [index, study.slug]);

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f5f6]"
      onClick={() => track("project_click", { slug: study.slug })}
    >
      <div
        ref={cardRef}
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 shadow-[0_16px_40px_rgba(15,18,24,0.08)] transition-transform duration-300 ease-out group-hover:-translate-y-1"
      >
        <div ref={imageRef} className="relative aspect-[4/3] overflow-hidden bg-[#d8d9da]">
          <img
            src={study.coverUrl}
            alt={study.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent" />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6 text-black">
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-black/70">{study.designerName}</p>
            <h3 className="mt-2 text-2xl font-semibold leading-tight">{study.title}</h3>
          </div>
          <p className="text-sm text-black/70">{study.excerpt}</p>
          <ul className="mt-auto flex flex-wrap gap-2 text-xs uppercase tracking-[0.3rem] text-black/70">
            {study.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-black/15 px-3 py-1">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef, {
    threshold: 0.2,
    onReveal: () => track("reveal_view", { id: "case-studies", section: "case_studies", index: 0 })
  });

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="bg-[#f4f5f6] px-6 py-24 text-black"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-black/70">Case studies</p>
            <h2 id="case-studies-heading" className="text-3xl font-semibold md:text-4xl">
              Latest work shipping out of Melbourne.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-black/75">
            Reserved aspect ratios reduce layout shift while parallax-ready imagery maintains depth. Data pulls from `GET /api/case-studies?limit=6`.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
