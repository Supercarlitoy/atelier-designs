"use client";

export function track(name: string, props?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.info("track", name, props ?? {});
  }
}
