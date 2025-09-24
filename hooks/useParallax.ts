"use client";

import { useEffect } from "react";

const DEPTH_PX = [0, 4, 8, 12, 16] as const;

type DepthIndex = 0 | 1 | 2 | 3 | 4;

export function useParallax(ref: React.RefObject<HTMLElement | null>, depth: DepthIndex = 1) {
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frame = 0;
    const baseTop = el.getBoundingClientRect().top + window.scrollY;
    const maxShift = DEPTH_PX[depth];

    const loop = () => {
      const viewportHeight = window.innerHeight || 1;
      const relative = (window.scrollY - baseTop + viewportHeight) / viewportHeight;
      const offset = Math.max(Math.min(relative * maxShift, maxShift), -maxShift);
      el.style.willChange = "transform";
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      el.style.willChange = "";
      el.style.transform = "";
    };
  }, [ref, depth]);
}
