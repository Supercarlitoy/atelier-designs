"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import designers from "@/data/featured-designers.seed.json";
import { track } from "@/lib/analytics";

import MobileMenuOverlay from "./MobileMenuOverlay";
import { TransitionLink } from "@/components/transitions/TransitionLink";

type NavLink = {
  href: string;
  label: string;
};

type Designer = (typeof designers)[number];

const PAGE_LINKS: NavLink[] = [
  { href: "/designers", label: "Designers" },
  { href: "/collections", label: "Collections" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" }
];

const SECTION_LINKS: NavLink[] = [
  { href: "#featured", label: "Featured" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#lead", label: "Request a brief" }
];

const MENU_LINKS: NavLink[] = [...PAGE_LINKS, ...SECTION_LINKS];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const firstRunRef = useRef(true);
  const topDesigners = useMemo<Designer[]>(() => designers.slice(0, 5), []);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }

    if (menuOpen) {
      track("nav_menu_open", { source: "header-toggle" });
    } else {
      track("nav_menu_close", { source: "header-toggle" });
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!mainRef.current) {
      mainRef.current = document.querySelector("main");
    }
    const mainEl = mainRef.current;
    if (!mainEl) {
      return;
    }
    if (menuOpen) {
      mainEl.setAttribute("aria-hidden", "true");
      mainEl.setAttribute("inert", "");
    } else {
      mainEl.removeAttribute("aria-hidden");
      mainEl.removeAttribute("inert");
    }
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-6">
        <TransitionLink
          href="/"
          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35rem] text-black"
        >
          <img
            src="/logo.svg"
            alt="Atelier Digital Melbourne"
            className="h-7 md:h-8"
            style={{ viewTransitionName: "brand-logo" }}
          />
          <span className="hidden md:inline">Atelier Digital</span>
        </TransitionLink>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-black transition-colors hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white ${menuOpen ? "border-black bg-black text-white" : "border-black/20"}`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close navigation" : "Open navigation"}</span>
          <span aria-hidden className="relative flex h-4 w-6 flex-col justify-between">
            <span className="h-[2px] w-full rounded bg-current" />
            <span className="h-[2px] w-full rounded bg-current" />
            <span className="h-[2px] w-full rounded bg-current" />
          </span>
        </button>
      </div>
      <MobileMenuOverlay
        id="mobile-nav"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={MENU_LINKS}
        designers={topDesigners}
      />
    </header>
  );
}
