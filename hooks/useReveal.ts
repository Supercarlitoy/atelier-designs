"use client";

import { useEffect } from "react";

type Options = {
  threshold?: number;
  delayMs?: number;
  onReveal?: () => void;
};

export function useReveal(
  ref: React.RefObject<HTMLElement | null>,
  { threshold = 0.3, delayMs = 0, onReveal }: Options = {}
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("reveal-in");
      onReveal?.();
      return undefined;
    }

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const trigger = () => {
            node.classList.add("reveal-in");
            onReveal?.();
          };
          timer = window.setTimeout(trigger, delayMs);
          observer.disconnect();
        });
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [ref, threshold, delayMs, onReveal]);
}
