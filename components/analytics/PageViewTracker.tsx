"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics";

export default function PageViewTracker() {
  useEffect(() => {
    track("page_view", {
      page: "home",
      timestamp: Date.now()
    });
  }, []);

  return null;
}
