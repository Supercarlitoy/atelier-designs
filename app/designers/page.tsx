import Link from "next/link";

import featuredDesigners from "@/data/featured-designers.seed.json";
import profiles from "@/data/profiles.seed.json";
import { getProfileBySlug } from "@/lib/profiles";

const SERVICE_GROUPS = [
  {
    title: "Brand & Identity",
    tags: ["Brand Identity", "Brand Strategy", "Visual Identity", "Brand Voice"]
  },
  {
    title: "Digital Product",
    tags: ["Digital Design", "Web Development", "UX", "UX/UI"]
  },
  {
    title: "Experiential",
    tags: ["Experiential", "Spatial", "Interior / Spatial"]
  }
];

const directory = Array.from(
  new Map(
    [...featuredDesigners, ...profiles].map((entry) => {
      const profile = getProfileBySlug(entry.slug);
      return [
        entry.slug,
        {
          id: entry.id,
          slug: entry.slug,
          name: entry.name,
          services: entry.services,
          location: entry.location,
          href: "href" in entry ? entry.href : entry.website,
          bio: "bio" in entry ? entry.bio : entry.tagline,
          hasProfile: Boolean(profile)
        }
      ];
    })
  ).values()
);

export default function DesignersPage() {
  return (
    <main className="bg-[#f5f5f6] pb-24 pt-20 text-black">
      <section className="mx-auto max-w-6xl px-6">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/50">Directory</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Curated Melbourne designers ready for your next project.</h1>
        <p className="mt-4 max-w-2xl text-base text-black/70 md:text-lg">
          Our team monitors every profile for craft, collaboration, and reliability. Explore the studios below, shortlist your favourites, then request a brief to get matched.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/claim"
            className="w-full rounded-full bg-black px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f6] sm:w-auto"
          >
            Claim your studio profile
          </Link>
          <Link
            href="/signup"
            className="w-full rounded-full border border-black/15 px-7 py-3 text-center text-xs font-semibold uppercase tracking-[0.35rem] text-black transition hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f6] sm:w-auto"
          >
            Join the directory
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {SERVICE_GROUPS.map((group) => (
          <article key={group.title} className="rounded-3xl border border-black/10 bg-white/95 p-6 shadow-[0_18px_40px_rgba(15,18,24,0.08)]">
            <h2 className="text-lg font-semibold">{group.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              {group.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Studios & independents</h2>
            <p className="mt-2 text-sm text-black/60">
              {directory.length} profiles verified for craft and client experience. This view combines highlighted partners and the growing self-serve directory.
            </p>
          </div>
          <Link
            href="#search"
            className="text-xs font-semibold uppercase tracking-[0.35rem] text-black/60 underline"
          >
            Search directory ↓
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {directory.map((entry) => (
            <article
              key={entry.id}
              className="flex flex-col justify-between rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white p-6 shadow-[0_16px_36px_rgba(15,18,24,0.08)]"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3rem] text-black/40">{entry.location}</p>
                <h3 className="mt-2 text-xl font-semibold">{entry.name}</h3>
                <p className="mt-3 text-sm text-black/70">{entry.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.25rem] text-black/50">
                  {entry.services.slice(0, 6).map((service) => (
                    <li key={service} className="rounded-full border border-black/15 px-3 py-1">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-full bg-black px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
                >
                  View portfolio
                </a>
                {entry.hasProfile ? (
                  <Link
                    href={`/profiles/${entry.slug}`}
                    className="w-full rounded-full border border-black/15 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.35rem] text-black transition hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
                  >
                    View directory profile
                  </Link>
                ) : (
                  <Link
                    href="/lead"
                    className="w-full rounded-full border border-black/15 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.35rem] text-black transition hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
                  >
                    Request introduction
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="search" className="mx-auto mt-24 max-w-5xl rounded-3xl border border-black/10 bg-white px-6 py-12 shadow-[0_24px_48px_rgba(15,18,24,0.12)]">
        <h2 className="text-2xl font-semibold">Looking for something specific?</h2>
        <p className="mt-2 text-sm text-black/65">Jump into the live search experience and filter by suburb, service, or studio name.</p>
        <Link
          href="/search"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
        >
          Open search
        </Link>
      </section>
    </main>
  );
}
