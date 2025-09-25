"use client";

import { useState, useTransition } from "react";

import { track } from "@/lib/analytics";
import { ProfileRecord, ProfileState } from "@/types/profile";

type ProfileEditorProps = {
  profile: ProfileRecord;
};

type RequestStatus = "idle" | "saving" | "success" | "error";

export function ProfileEditor({ profile }: ProfileEditorProps) {
  const [draft, setDraft] = useState(profile);
  const [profileState, setProfileState] = useState<ProfileState>("DRAFT");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, startTransition] = useTransition();

  const handleFieldChange = <K extends keyof ProfileRecord>(field: K, value: ProfileRecord[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    setStatus("saving");
    setMessage("");
    try {
      const response = await fetch(`/api/profiles/${profile.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(draft)
      });
      if (!response.ok) {
        throw new Error("Save failed");
      }
      track("profile_update", { profile_id: profile.id });
      setStatus("success");
      setMessage("Saved. Your draft is up to date.");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Could not save right now. Please retry.");
    }
  };

  const handleSubmitReview = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/profiles/${profile.id}/submit`, { method: "POST" });
        if (!response.ok) {
          throw new Error("Submit failed");
        }
        const data = await response.json();
        setProfileState(data.state ?? "UNDER_REVIEW");
        track("profile_submit_review", { profile_id: profile.id });
        setMessage("Submitted for review. We’ll email you with next steps.");
      } catch (error) {
        console.error(error);
        setStatus("error");
        setMessage("Could not submit for review. Try again later.");
      }
    });
  };

  return (
    <section className="rounded-3xl border border-[rgba(17,17,17,0.08)] bg-white p-8 shadow-[0_32px_60px_rgba(15,18,24,0.12)] md:p-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3rem] text-black/40">Inline editor</p>
          <h2 className="mt-2 text-3xl font-semibold">Shape your profile before publishing.</h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.3rem] text-white">
          {profileState === "DRAFT" ? "Draft" : profileState.replace("_", " ")}
        </span>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Tagline</span>
          <input
            value={draft.tagline}
            onChange={(event) => handleFieldChange("tagline", event.target.value)}
            className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Location</span>
          <input
            value={draft.location}
            onChange={(event) => handleFieldChange("location", event.target.value)}
            className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
          />
        </label>
      </div>

      <label className="mt-6 block space-y-2">
        <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Bio</span>
        <textarea
          value={draft.bio}
          onChange={(event) => handleFieldChange("bio", event.target.value)}
          rows={5}
          className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
        />
      </label>

      <label className="mt-6 block space-y-2">
        <span className="text-xs uppercase tracking-[0.3rem] text-black/40">Highlights (comma separated)</span>
        <input
          value={draft.highlights.join(", ")}
          onChange={(event) => handleFieldChange("highlights", event.target.value.split(/\s*,\s*/).filter(Boolean))}
          className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
        />
      </label>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.3rem] text-white"
        >
          Save draft
        </button>
        <button
          type="button"
          onClick={handleSubmitReview}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full border border-black/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3rem] text-black disabled:opacity-50"
        >
          {isSubmitting ? "Submitting…" : "Submit for review"}
        </button>
      </div>

      {status !== "idle" || message ? (
        <p className={`mt-6 text-sm ${status === "error" ? "text-red-600" : "text-black/70"}`}>{message}</p>
      ) : null}
    </section>
  );
}
