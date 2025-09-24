"use client";

import { useEffect } from "react";

export function useStickyRange(
  ref: React.RefObject<HTMLElement | null>,
  topPx = 72,
  rangePx = 480
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    const update = () => {
      const y = window.scrollY;
      const active = y > topPx && y < topPx + rangePx;
      if (active) {
        el.style.position = "sticky";
        el.style.top = `${topPx}px`;
      } else {
        el.style.position = "";
        el.style.top = "";
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.style.position = "";
      el.style.top = "";
    };
  }, [ref, topPx, rangePx]);
}
