import Link from "next/link";

import designers from "@/data/featured-designers.seed.json";
import { getProfileBySlug } from "@/lib/profiles";

const COLLECTION_DEFINITIONS = [
  {
    slug: "brand-identity",
    title: "Brand Identity",
    description: "Studios who live and breathe typographic craft, verbal identity, and packaging systems.",
    services: ["Brand Identity", "Brand Strategy", "Visual Identity", "Brand Voice"]
  },
  {
    slug: "digital-product",
    title: "Digital Product",
    description: "Partners for complex UX, UI, and engineering-led website builds.",
    services: ["UX", "UX/UI", "Digital Design", "Web Development"]
  },
  {
    slug: "experiential",
    title: "Experiential & Spatial",
    description: "Studios shaping interiors, installations, and experiential activations across the city.",
    services: ["Experiential", "Spatial", "Interior / Spatial"]
  }
];

const collectionEntries = COLLECTION_DEFINITIONS.map((collection) => ({
  ...collection,
  designers: designers.filter((designer) =>
    designer.services.some((service) => collection.services.includes(service))
  )
}));

export default function CollectionsPage() {
  return (
    <main className="bg-[#f4f4f4] pb-24 pt-20 text-black">
      <section className="mx-auto max-w-5xl px-6 text-center md:text-left">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/50">Collections</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">
          Curated groupings to shortcut your shortlists.
        </h1>
        <p className="mt-4 text-base text-black/70 md:text-lg">
          We assemble living collections so you can see which studios specialise in identity, product, or spatial experiences. Browse the sets below or request a bespoke shortlist via the lead form.
        </p>
        <div className="mt-6 inline-flex flex-wrap justify-center gap-3 md:justify-start">
          <Link
            href="/lead"
            className="rounded-full bg-black px-7 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f4f4]"
          >
            Request a brief
          </Link>
          <Link
            href="/designers"
            className="rounded-full border border-black/15 px-7 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-black transition hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f4f4]"
          >
            View all designers
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-16 flex max-w-6xl flex-col gap-10 px-6">
        {collectionEntries.map((collection) => (
          <article
            key={collection.slug}
            className="rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 p-8 shadow-[0_18px_40px_rgba(15,18,24,0.08)]"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3rem] text-black/40">Collection</p>
                <h2 className="text-2xl font-semibold md:text-3xl">{collection.title}</h2>
                <p className="mt-2 max-w-3xl text-sm text-black/65">{collection.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3rem] text-black/50">
                {collection.services.map((service) => (
                  <span key={service} className="rounded-full border border-black/15 px-3 py-1">
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {collection.designers.map((designer) => {
                const profile = getProfileBySlug(designer.slug);
                return (
                  <div
                    key={designer.id}
                    className="rounded-2xl border border-black/10 bg-white/95 p-5 shadow-[0_12px_30px_rgba(15,18,24,0.08)]"
                  >
                    <p className="text-xs uppercase tracking-[0.3rem] text-black/40">{designer.location}</p>
                    <h3 className="mt-1 text-lg font-semibold">{designer.name}</h3>
                  <p className="mt-3 text-xs text-black/60">{designer.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25rem] text-black/50">
                    {designer.services.slice(0, 4).map((service) => (
                      <span key={service} className="rounded-full border border-black/15 px-3 py-1">
                        {service}
                      </span>
                    ))}
                  </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href={designer.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        Visit site
                      </a>
                      {profile ? (
                        <Link
                          href={`/profiles/${profile.slug}`}
                          className="inline-flex flex-1 items-center justify-center rounded-full border border-black/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3rem] text-black transition hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        >
                          View profile
                        </Link>
                      ) : (
                        <Link
                          href="/lead"
                          className="inline-flex flex-1 items-center justify-center rounded-full border border-black/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3rem] text-black transition hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        >
                          Request intro
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
