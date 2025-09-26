"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { track } from "@/lib/analytics";

type NavLink = {
  href: string;
  label: string;
};

type Designer = {
  id: string;
  slug: string;
  name: string;
  services: string[];
  location: string;
  href: string;
};

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  designers: Designer[];
};

export default function MobileMenuOverlay({
  id,
  open,
  onClose,
  navLinks,
  designers
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = document.createElement("div");
    node.setAttribute("data-menu-overlay-root", "");
    document.body.appendChild(node);
    setPortalNode(node);
    return () => {
      document.body.removeChild(node);
      setPortalNode(null);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const overlay = overlayRef.current;
    if (!overlay) {
      return undefined;
    }

    overlay.focus();

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }
    firstFocusableRef.current?.focus();
  }, [open]);

  const handleDesignerClick = (designer: Designer, index: number) => {
    track("nav_designer_click", {
      designer_id: designer.id,
      slug: designer.slug,
      rank: index + 1,
      source: "mobile-nav"
    });
  };

  const headingId = useMemo(() => `${id}-title`, [id]);

  if (!portalNode) {
    return null;
  }

  const overlayContent = !open
    ? null
    : (
        <div
          id={id}
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          className="animate-overlay fixed inset-0 z-[100] overflow-y-auto bg-[#05060a] text-white"
          tabIndex={-1}
          onClick={onClose}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(19,22,30,0.9),_rgba(5,6,10,0.98))]" />
          <button
            ref={firstFocusableRef}
            aria-label="Close menu"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="pointer-events-auto absolute right-6 top-6 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-base transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060a]"
          >
            ✕
          </button>
          <div
            className="pointer-events-auto flex min-h-full animate-slideIn flex-col justify-between px-8 pb-12 pt-28 text-white sm:px-16"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id={headingId} className="sr-only">
              Main navigation
            </h2>
            <nav aria-labelledby={headingId} className="space-y-8 md:space-y-10">
              {navLinks.map((link, index) => {
                const isHash = link.href.startsWith("#");
                const className =
                  "block text-4xl font-semibold tracking-tight transition hover:translate-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:text-6xl lg:text-7xl";
                const labelPrefix = (
                  <span className="block text-[11px] uppercase tracking-[0.5rem] text-white/80 md:text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                );

                return isHash ? (
                  <a key={link.href} href={link.href} onClick={onClose} className={className}>
                    {labelPrefix}
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} onClick={onClose} className={className}>
                    {labelPrefix}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-7">
              <div>
                <p className="text-[11px] uppercase tracking-[0.4rem] text-white/50">Top designers</p>
                <ul className="mt-4 space-y-3 text-lg">
              {designers.map((designer, index) => (
                <li key={designer.id}>
                  <a
                    href={designer.href}
                    onClick={() => {
                      handleDesignerClick(designer, index);
                      onClose();
                    }}
                    className="block font-medium text-white transition hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    {designer.name}
                    <span className="block text-xs uppercase tracking-[0.35rem] text-white/70">
                      {designer.location} • {designer.services.slice(0, 2).join(", ")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/designers"
              onClick={onClose}
              className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.35rem] text-white underline decoration-white/40 underline-offset-8"
            >
              Browse all designers →
            </a>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/lead"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060a] sm:w-auto"
            >
              Request a brief
            </a>
            <a
              href="/signup"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060a] sm:w-auto"
            >
              Join directory
            </a>
          </div>
            </div>
          </div>
        </div>
      );

  return createPortal(overlayContent, portalNode);
}
