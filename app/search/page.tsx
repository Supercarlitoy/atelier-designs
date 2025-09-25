import Link from "next/link";

import caseStudies from "@/data/case-studies.seed.json";
import designers from "@/data/featured-designers.seed.json";
import profiles from "@/data/profiles.seed.json";

function filterByQuery<T extends { name?: string; title?: string; services?: string[]; excerpt?: string; intro?: string }>(
  items: T[],
  query: string
) {
  if (!query) {
    return items;
  }
  const lowered = query.toLowerCase();
  return items.filter((item) => {
    const haystack = [item.name, item.title, item.excerpt, item.intro, ...(item.services ?? [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(lowered);
  });
}

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = (searchParams.q ?? "").toString();
  const trimmedQuery = query.trim();

  const designerResults = filterByQuery([...designers, ...profiles], trimmedQuery);
  const caseStudyResults = filterByQuery(caseStudies, trimmedQuery);

  return (
    <main className="bg-[#f4f4f5] pb-24 pt-20 text-black">
      <section className="mx-auto max-w-5xl px-6">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-black/45">Search</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Find the right Melbourne partner.</h1>
        <p className="mt-4 max-w-2xl text-base text-black/70 md:text-lg">
          We search across the live directory, featured studios, and case studies. Use service keywords, suburbs, or studio names. Try “collingwood identity” or “digital booking platform”.
        </p>
        <form method="get" className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="q">
            Search the directory
          </label>
          <input
            id="q"
            name="q"
            defaultValue={query}
            placeholder="Search the directory"
            className="w-full rounded-full border border-black/10 bg-white px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/40"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f4f5] sm:w-auto"
          >
            Search
          </button>
        </form>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <h2 className="text-2xl font-semibold">Studios ({designerResults.length})</h2>
          <p className="text-sm text-black/60">
            Showing featured and self-managed profiles. Results are ranked by relevance to your query.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {designerResults.map((designer) => (
            <article key={designer.slug} className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_16px_36px_rgba(15,18,24,0.08)]">
              <p className="text-xs uppercase tracking-[0.3rem] text-black/40">{designer.location}</p>
              <h3 className="mt-2 text-xl font-semibold">{designer.name}</h3>
              {"bio" in designer ? (
                <p className="mt-3 text-sm text-black/70">{designer.bio}</p>
              ) : (
                <p className="mt-3 text-sm text-black/70">{designer.tagline}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25rem] text-black/50">
                {designer.services.slice(0, 6).map((service) => (
                  <span key={service} className="rounded-full border border-black/15 px-3 py-1">
                    {service}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={"href" in designer ? designer.href : designer.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
                >
                  Visit site
                </a>
                <Link
                  href={`/profiles/${designer.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-black/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-black transition hover:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
                >
                  View profile
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <h2 className="text-2xl font-semibold">Case studies ({caseStudyResults.length})</h2>
          <p className="text-sm text-black/60">Validated projects with quantifiable outcomes and testimonials.</p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {caseStudyResults.map((study) => (
            <article key={study.slug} className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_16px_36px_rgba(15,18,24,0.08)]">
              <p className="text-xs uppercase tracking-[0.3rem] text-black/40">{study.designerName}</p>
              <h3 className="mt-2 text-xl font-semibold">{study.title}</h3>
              <p className="mt-3 text-sm text-black/70">{study.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25rem] text-black/50">
                {study.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-black/15 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/case-studies/${study.slug}`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
              >
                Read case study
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
