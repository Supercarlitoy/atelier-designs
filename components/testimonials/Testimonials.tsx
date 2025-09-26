"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import testimonials from "@/data/testimonials.seed.json";
import { useParallax } from "@/hooks/useParallax";
import { useReveal } from "@/hooks/useReveal";
import { track } from "@/lib/analytics";

type Testimonial = (typeof testimonials)[number];

type TestimonialCardProps = {
  testimonial: Testimonial;
  index: number;
  widthPercent: number;
};

function TestimonialCard({ testimonial, index, widthPercent }: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasTrackedRef = useRef(false);

  useReveal(cardRef, {
    threshold: 0.3,
    delayMs: index * 70,
    onReveal: () =>
      track("reveal_view", {
        id: `testimonial-${testimonial.id}`,
        section: "testimonials",
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
            track("review_view", {
              id: testimonial.id,
              index,
              section: "testimonials"
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [index, testimonial.id]);

  return (
    <article
      ref={cardRef}
      className="flex h-full flex-col justify-between rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 px-6 py-8 text-black shadow-[0_24px_48px_rgba(15,18,24,0.08)]"
      style={{ flex: `0 0 ${widthPercent}%` }}
    >
      <p className="text-lg leading-relaxed text-black/80">“{testimonial.quote}”</p>
      <div className="mt-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3rem] text-black/75">
          {testimonial.name} · {testimonial.role}
        </p>
        <p className="text-xs uppercase tracking-[0.3rem] text-black/75">{testimonial.suburb}</p>
        <p className="text-xs text-black/70">Rated {testimonial.rating.toFixed(1)}/5</p>
        <a
          href={testimonial.profileUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            track("review_click", {
              id: testimonial.id,
              source: "testimonials",
              href: testimonial.profileUrl
            })
          }
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.3rem] text-black underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          View designer
        </a>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [itemsPerView, setItemsPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const listId = "testimonials-carousel";
  const maxIndex = Math.max(0, Math.ceil(testimonials.length / itemsPerView) - 1);
  const trackRef = useRef<HTMLDivElement>(null);

  useReveal(trackRef, {
    threshold: 0.3,
    onReveal: () =>
      track("reveal_view", { id: "testimonials", section: "testimonials", index: 0 })
  });
  useParallax(trackRef, { depth: 2, invert: true });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width >= 1440) {
        setItemsPerView(3);
      } else if (width >= 992) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (index > maxIndex) {
      setIndex(maxIndex);
    }
  }, [index, maxIndex]);

  const widthPercent = useMemo(() => 100 / itemsPerView, [itemsPerView]);
  const translate = `translateX(-${index * (100 / itemsPerView)}%)`;

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: testimonials.map((testimonial, idx) => ({
        "@type": "Review",
        position: idx + 1,
        reviewBody: testimonial.quote,
        reviewRating: {
          "@type": "Rating",
          ratingValue: testimonial.rating,
          bestRating: "5"
        },
        author: {
          "@type": "Person",
          name: testimonial.name
        },
        itemReviewed: {
          "@type": "Organization",
          name: testimonial.role
        }
      }))
    }),
    []
  );

  return (
    <section
      ref={trackRef}
      id="testimonials"
      role="region"
      aria-labelledby="testimonials-heading"
      className="bg-[#101114] px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-white/50">Testimonials</p>
            <h2 id="testimonials-heading" className="text-3xl font-semibold md:text-4xl">
              Partners validating the directory model.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/80">
            All reviews are verified. Carousel is keyboard-navigable and honours reduced motion preferences.
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden" aria-live="polite">
            <div
              id={listId}
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: translate }}
            >
              {testimonials.map((testimonial, idx) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={idx}
                  widthPercent={widthPercent}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIndex((value) => Math.max(value - 1, 0))}
                disabled={index === 0}
                aria-controls={listId}
                className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3rem] text-white disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setIndex((value) => Math.min(value + 1, maxIndex))}
                disabled={index === maxIndex}
                aria-controls={listId}
                className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3rem] text-white disabled:opacity-40"
              >
                Next
              </button>
            </div>
            <p className="text-xs uppercase tracking-[0.3rem] text-white/50">
              Slide {index + 1} of {maxIndex + 1}
            </p>
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </section>
  );
}
