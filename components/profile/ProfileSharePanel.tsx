"use client";

import { useMemo, useState } from "react";

import { track } from "@/lib/analytics";
import { ProfileRecord } from "@/types/profile";

const SHARE_TARGETS = [
  { id: "linkedin", label: "LinkedIn", buildUrl: (url: string, text: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}` },
  { id: "twitter", label: "X", buildUrl: (url: string, text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}` },
  { id: "facebook", label: "Facebook", buildUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` }
];

type ProfileSharePanelProps = {
  profile: ProfileRecord;
};

export function ProfileSharePanel({ profile }: ProfileSharePanelProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  const baseUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_SITE_URL ?? "https://atelierdesigns.com";
  }, []);

  const shareUrl = `${baseUrl}/profiles/${profile.slug}`;
  const shareText = `${profile.name} — ${profile.tagline || "Curated Melbourne designer"}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyState("copied");
      track("profile_share_click", { profile_id: profile.id, platform: "copy" });
      setTimeout(() => setCopyState("idle"), 2000);
    } catch (error) {
      console.error("Clipboard error", error);
    }
  };

  const handleShare = (platform: string, href: string) => {
    track("profile_share_click", { profile_id: profile.id, platform });
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: profile.name, text: shareText, url: shareUrl });
        track("profile_share_click", { profile_id: profile.id, platform: "native" });
      } catch (error) {
        console.warn("Share cancelled", error);
      }
    } else {
      void handleCopy();
    }
  };

  return (
    <section className="rounded-3xl border border-[rgba(17,17,17,0.06)] bg-black px-6 py-8 text-white shadow-[0_24px_48px_rgba(15,18,24,0.2)] md:px-8 md:py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3rem] text-white/50">Share</p>
          <h2 className="mt-2 text-3xl font-semibold">Spread the word.</h2>
          <p className="mt-3 max-w-md text-sm text-white/70">
            Share your curated profile with prospective clients or collaborators. Each share is tracked so you can see what channels convert.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3rem] text-white transition hover:bg-white hover:text-black"
        >
          {copyState === "copied" ? "Link copied" : "Copy link"}
        </button>
        <button
          type="button"
          onClick={handleNativeShare}
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3rem] text-white transition hover:bg-white hover:text-black md:hidden"
        >
          Share...
        </button>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {SHARE_TARGETS.map((target) => (
          <button
            key={target.id}
            type="button"
            onClick={() => handleShare(target.id, target.buildUrl(shareUrl, shareText))}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3rem] text-black transition hover:bg-black hover:text-white"
          >
            {target.label}
          </button>
        ))}
      </div>
    </section>
  );
}
