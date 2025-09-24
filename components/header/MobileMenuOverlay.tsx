"use client";

import { useEffect, useRef } from "react";

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
  ctaLink: NavLink;
  designers: Designer[];
};

export default function MobileMenuOverlay({
  id,
  open,
  onClose,
  navLinks,
  ctaLink,
  designers
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
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

    const overlay = overlayRef.current;
    overlay?.focus();
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      firstFocusableRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleDesignerClick = (designer: Designer, index: number) => {
    track("nav_designer_click", {
      designer_id: designer.id,
      slug: designer.slug,
      rank: index + 1,
      source: "mobile-nav"
    });
  };

  return (
    <div
      id={id}
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-white"
      tabIndex={-1}
    >
      <button
        ref={firstFocusableRef}
        aria-label="Close menu"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-black/10 px-4 py-2 text-sm"
      >
        ✕
      </button>
      <div className="flex h-full animate-slideIn flex-col justify-between p-8">
        <nav aria-label="Mobile Primary" className="space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block text-4xl font-semibold text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3rem] text-black/50">Top designers</p>
            <ul className="mt-3 space-y-3">
              {designers.map((designer, index) => (
                <li key={designer.id}>
                  <a
                    href={designer.href}
                    onClick={() => {
                      handleDesignerClick(designer, index);
                      onClose();
                    }}
                    className="block text-lg text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    {designer.name}
                    <span className="block text-xs text-black/60">
                      {designer.location} • {designer.services.slice(0, 2).join(", ")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/designers"
              onClick={onClose}
              className="mt-3 inline-flex items-center text-xs font-semibold uppercase tracking-[0.3rem] text-black underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              View all designers →
            </a>
          </div>
          <div className="border-t border-[rgba(17,17,17,0.06)] pt-6">
            <a
              href={ctaLink.href}
              onClick={onClose}
              className="block rounded-full bg-black px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.3rem] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {ctaLink.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
