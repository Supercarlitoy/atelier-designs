"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import designers from "@/data/featured-designers.seed.json";
import { track } from "@/lib/analytics";

type Designer = (typeof designers)[number];

export default function SearchStrip() {
  const [query, setQuery] = useState("");
  const [announcement, setAnnouncement] = useState("Suggestions hidden");
  const inputRef = useRef<HTMLInputElement>(null);
  const skipAnnouncementRef = useRef(false);
  const listboxId = "hero-search-suggestions";

  const suggestions = useMemo(() => {
    if (!query.trim()) {
      return [] as Designer[];
    }

    const lowered = query.toLowerCase();
    return designers
      .filter((designer) =>
        [designer.name, designer.location, ...designer.services]
          .join(" ")
          .toLowerCase()
          .includes(lowered)
      )
      .slice(0, 5);
  }, [query]);

  useEffect(() => {
    if (skipAnnouncementRef.current) {
      skipAnnouncementRef.current = false;
      return;
    }

    if (!query.trim()) {
      setAnnouncement("Suggestions hidden");
    } else if (suggestions.length === 0) {
      setAnnouncement("No suggestions available");
    } else {
      setAnnouncement(`${suggestions.length} suggestions available`);
    }
  }, [query, suggestions]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const value = String(formData.get("q") ?? "").trim();

    if (!value) {
      event.preventDefault();
      return;
    }

    track("hero_search_submit", { query: value, method: "form" });
  };

  const handleSuggestionSelect = (suggestion: Designer) => {
    skipAnnouncementRef.current = true;
    setQuery(suggestion.name);
    setAnnouncement(`${suggestion.name} selected`);
    inputRef.current?.focus();
  };

  return (
    <section
      id="search"
      className="border-t border-black bg-[#101010] py-8 text-black"
      aria-label="Search designers"
    >
      <form
        action="/search"
        method="get"
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-5xl flex-col items-stretch gap-4 px-6 text-sm sm:flex-row sm:items-center sm:gap-6"
      >
        <div
          className="relative flex-1 w-full"
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={suggestions.length > 0}
          aria-haspopup="listbox"
        >
          <label htmlFor="q" className="sr-only">
            Search designers
          </label>
          <input
            id="q"
            name="q"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-controls={listboxId}
            aria-autocomplete="list"
            placeholder="Try: brand identity in Fitzroy"
            className="h-16 w-full rounded-full border border-white/15 bg-[#dcdcdc] px-7 text-base font-medium text-[#141414] placeholder:text-[#8d8d8d] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white/70"
            required
          />
          {suggestions.length > 0 ? (
            <ul
              id={listboxId}
              role="listbox"
              className="absolute left-0 right-0 top-full z-20 mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.16)]"
            >
              {suggestions.map((suggestion) => (
                <li key={suggestion.id} role="option" aria-selected={false}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="flex w-full flex-col items-start gap-1 px-5 py-3 text-left transition-colors hover:bg-black/5 focus:outline-none focus-visible:bg-black/5"
                  >
                    <span className="font-medium text-black">{suggestion.name}</span>
                    <span className="text-xs text-black/60">
                      {suggestion.location} • {suggestion.services.slice(0, 3).join(", ")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <button
          type="submit"
          className="h-16 w-full rounded-full border border-white/25 bg-white px-10 text-xs font-semibold uppercase tracking-[0.4rem] text-black shadow-[0_18px_32px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-white/80 sm:w-auto"
        >
          Search
        </button>
        <div className="sr-only" aria-live="polite">
          {announcement}
        </div>
      </form>
    </section>
  );
}
