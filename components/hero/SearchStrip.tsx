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
      className="border-t border-black/10 bg-[#000000] py-6 text-black"
      aria-label="Search designers"
    >
      <form
        action="/search"
        method="get"
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-5xl flex-col gap-3 px-6 text-sm md:flex-row md:items-center"
      >
        <div
          className="relative flex-1"
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
            className="h-12 w-full rounded-full border border-white/10 bg-[#e6e6e6] px-5 text-base text-[#000000] placeholder-[#bdbdbd] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
            required
          />
          {suggestions.length > 0 ? (
            <ul
              id={listboxId}
              role="listbox"
              className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl"
            >
              {suggestions.map((suggestion) => (
                <li key={suggestion.id} role="option" aria-selected={false}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="flex w-full flex-col items-start gap-1 px-4 py-3 text-left hover:bg-black/5 focus:outline-none focus-visible:bg-black/5"
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
          className="h-12 rounded-full border border-white/10 bg-white px-6 text-sm font-medium uppercase tracking-[0.2rem] text-black focus:outline-none focus:ring-2 focus:ring-[var(--focus)]"
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
