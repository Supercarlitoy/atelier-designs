"use client";

import { useEffect } from "react";

const DEPTH_PX = [0, 4, 8, 14, 22] as const;

type DepthIndex = 0 | 1 | 2 | 3 | 4;

type ParallaxOptions =
  | DepthIndex
  | {
      depth?: DepthIndex;
      axis?: "x" | "y" | "both";
      invert?: boolean;
      maxShift?: number;
    };

export function useParallax(ref: React.RefObject<HTMLElement | null>, options: ParallaxOptions = 1) {
  const dependencyKey = typeof options === "number" ? options : JSON.stringify(options);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const resolvedDepth: DepthIndex = typeof options === "number" ? options : options.depth ?? 1;
    const axis = typeof options === "number" ? "y" : options.axis ?? "y";
    const invert = typeof options === "number" ? false : options.invert ?? false;
    const maxShiftConfigured = typeof options === "number" ? undefined : options.maxShift;

    const mobileFactor = window.innerWidth < 768 ? 0.7 : 1;
    const maxShiftBase = DEPTH_PX[Math.max(0, Math.min(DEPTH_PX.length - 1, resolvedDepth))];
    const maxShift = (maxShiftConfigured ?? maxShiftBase) * mobileFactor;

    let frame = 0;
    let baseTop = el.getBoundingClientRect().top + window.scrollY;

    const recomputeBase = () => {
      baseTop = el.getBoundingClientRect().top + window.scrollY;
    };

    const loop = () => {
      const viewportHeight = window.innerHeight || 1;
      const relative = (window.scrollY - baseTop + viewportHeight) / viewportHeight;
      const rawOffset = Math.max(Math.min(relative * maxShift, maxShift), -maxShift);
      const offset = invert ? -rawOffset : rawOffset;

      let transform = "";
      if (axis === "x") {
        transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      } else if (axis === "both") {
        transform = `translate3d(${(offset / 1.5).toFixed(2)}px, ${offset.toFixed(2)}px, 0)`;
      } else {
        transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      }

      el.style.willChange = "transform";
      el.style.transform = transform;
      frame = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      recomputeBase();
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      el.style.willChange = "";
      el.style.transform = "";
    };
  }, [ref, dependencyKey]);
}
