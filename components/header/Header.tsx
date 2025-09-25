"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import designers from "@/data/featured-designers.seed.json";
import { track } from "@/lib/analytics";

import MobileMenuOverlay from "./MobileMenuOverlay";

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
  { href: "/contact", label: "Contact" }
];

const SECTION_LINKS: NavLink[] = [
  { href: "#featured", label: "Featured" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Testimonials" }
];

const MENU_LINKS: NavLink[] = [...PAGE_LINKS, ...SECTION_LINKS];

const CTA_LINK: NavLink = { href: "#lead", label: "Request a brief" };

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
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4 md:h-[72px] md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35rem] text-black"
        >
          <img src="/logo.svg" alt="Atelier Digital Melbourne" className="h-7 md:h-8" />
          <span className="hidden md:inline">Atelier Digital</span>
        </Link>

        <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.35rem] text-black/75 md:flex">
          {PAGE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {link.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-black/10" aria-hidden />
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={CTA_LINK.href}
            className="rounded-full border border-black/15 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.3rem] text-black transition hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {CTA_LINK.label}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3rem] text-black/70 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          onClick={() => setMenuOpen(true)}
        >
          Menu
          <span aria-hidden>•</span>
        </button>
      </div>
      <MobileMenuOverlay
        id="mobile-nav"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={MENU_LINKS}
        ctaLink={CTA_LINK}
        designers={topDesigners}
      />
    </header>
  );
}
