"use client";

import { useEffect, useRef, useState } from "react";

import { track } from "@/lib/analytics";

type Designer = {
  id: string;
  slug: string;
  name: string;
  services: string[];
  location: string;
  href: string;
};

type Props = {
  designers: Designer[];
};

export default function DesktopDesignersDropdown({ designers }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (!panelRef.current || !buttonRef.current) {
        return;
      }

      if (
        panelRef.current.contains(event.target as Node) ||
        buttonRef.current.contains(event.target as Node)
      ) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  const firstRunRef = useRef(true);

  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      return;
    }

    if (open) {
      track("nav_designers_open", { source: "desktop" });
    } else {
      track("nav_designers_close", { source: "desktop" });
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((current) => !current);
  };

  const handleDesignerClick = (designer: Designer, index: number) => {
    track("nav_designer_click", {
      designer_id: designer.id,
      slug: designer.slug,
      rank: index + 1,
      source: "desktop-nav"
    });
  };

  return (
    <div className="relative hidden md:block">
      <button
        ref={buttonRef}
        id="nav-designers"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="designers-panel"
        onClick={handleToggle}
        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.35rem] text-black hover:text-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        <span className="flex items-center gap-1" aria-hidden>
          Designers
          <span className="text-lg leading-none">•</span>
        </span>
        <span className="sr-only">Designers menu</span>
      </button>
      {open ? (
        <div
          ref={panelRef}
          id="designers-panel"
          role="listbox"
          aria-labelledby="nav-designers"
          className="animate-dropdown fixed left-0 right-0 z-50 border-t border-black/10 bg-[#f4f4f4] shadow-[0_32px_60px_rgba(18,18,18,0.08)]"
          style={{ top: "72px" }}
        >
          <div className="mx-auto grid max-w-6xl gap-8 p-12 md:grid-cols-2 lg:grid-cols-3">
            {designers.map((designer, index) => (
              <a
                key={designer.id}
                role="option"
                aria-selected="false"
                href={designer.href}
                onClick={() => handleDesignerClick(designer, index)}
                className="block text-2xl leading-tight text-black transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f4f4]"
              >
                {designer.name}
                <span className="block text-sm text-black/60">
                  {designer.location} • {designer.services.slice(0, 2).join(", ")}
                </span>
              </a>
            ))}
            <a
              href="/designers"
              className="mt-4 text-sm uppercase tracking-[0.2rem] text-black underline"
            >
              View all designers →
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
