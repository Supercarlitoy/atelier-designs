"use client";

import { track } from "@/lib/analytics";

const LINK_GROUPS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press" }
    ]
  },
  {
    title: "Directory",
    links: [
      { href: "/designers", label: "Designers" },
      { href: "/collections", label: "Collections" },
      { href: "/case-studies", label: "Case studies" }
    ]
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/claim", label: "Claim profile" },
      { href: "/faq", label: "FAQ" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/sitemap.xml", label: "Sitemap" }
    ]
  }
] as const;

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://www.instagram.com", label: "Instagram" }
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleClick = (href: string, label: string) => {
    track("footer_link_click", { href, label });
  };

  return (
    <footer role="contentinfo" className="border-t border-[rgba(17,17,17,0.06)] bg-[#0b0d0f] px-6 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_3fr]">
        <div className="space-y-6">
          <img src="/logo.svg" alt="Melbourne Designers" className="h-8" />
          <p className="text-sm text-white/60">
            © {year} Melbourne Designers Directory · ABN 00 000 000 000
          </p>
          <ul className="flex gap-4 text-sm">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleClick(social.href, social.label)}
                  className="inline-flex items-center text-white/70 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d0f]"
                  aria-label={`Follow on ${social.label}`}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3rem] text-white/60">{group.title}</h3>
              <ul className="space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => handleClick(link.href, link.label)}
                      className="text-white/80 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0d0f]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/40">
        Built for launch on Vercel · All analytics and motion respect privacy & reduced motion settings.
      </div>
    </footer>
  );
}
