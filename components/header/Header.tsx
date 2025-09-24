"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import designers from "@/data/featured-designers.seed.json";
import { track } from "@/lib/analytics";

import DesktopDesignersDropdown from "./DesktopDesignersDropdown";
import MobileMenuOverlay from "./MobileMenuOverlay";

type NavLink = {
  href: string;
  label: string;
};

type Designer = (typeof designers)[number];

const NAV_LINKS: NavLink[] = [
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" }
];

const ACTION_LINKS: NavLink[] = [
  { href: "/claim", label: "Claim profile" },
  { href: "/lead", label: "Request brief" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const firstRunRef = useRef(true);
  const topDesigners = useMemo<Designer[]>(() => designers.slice(0, 5), []);

  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }

    if (menuOpen) {
      track("nav_menu_open", { source: "mobile" });
    } else {
      track("nav_menu_close", { source: "mobile" });
    }
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(17,17,17,0.06)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center px-6">
        <div className="flex flex-1 items-center">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Melbourne Designers" className="h-6" />
            <span className="sr-only">Melbourne Designers home</span>
          </a>
        </div>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-8 md:flex"
        >
          <DesktopDesignersDropdown designers={topDesigners} />
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-[0.2rem] text-black hover:text-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
          {ACTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-black/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2rem] text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="ml-4 inline-flex items-center rounded-full border border-black/10 px-3 py-2 text-sm md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </div>
      <MobileMenuOverlay
        id="mobile-nav"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={NAV_LINKS}
        actionLinks={ACTION_LINKS}
        designers={topDesigners}
      />
    </header>
  );
}
