import Link from "next/link";

import caseStudies from "@/data/case-studies.seed.json";

export default function CaseStudiesPage() {
  return (
    <main className="bg-[#0f1116] pb-24 pt-20 text-white">
      <section className="mx-auto max-w-6xl px-6 text-center md:text-left">
        <p className="text-[12px] uppercase tracking-[0.5rem] text-white/40">Case studies</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-5xl">Deep dives into Melbourne projects that move the dial.</h1>
        <p className="mt-4 max-w-3xl text-base text-white/70 md:text-lg">
          Every project below is verified with client outcomes and testimonial quotes. Filter our work library by industry, impact, or studio and request intros straight from each detail page.
        </p>
        <div className="mt-6 inline-flex flex-wrap justify-center gap-3 md:justify-start">
          <Link
            href="/lead"
            className="rounded-full bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1116]"
          >
            Request a brief
          </Link>
          <Link
            href="/designers"
            className="rounded-full border border-white/20 px-7 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1116]"
          >
            View directory
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        {caseStudies.map((study) => (
          <article
            key={study.id}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_32px_80px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
              <img src={study.coverUrl} alt={study.title} className="w-full rounded-2xl border border-white/10" />
            </div>
            <div className="mt-6 flex flex-col gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3rem] text-white/40">{study.designerName}</p>
                <h2 className="mt-2 text-2xl font-semibold">{study.title}</h2>
              </div>
              <p className="text-sm text-white/70">{study.intro}</p>
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25rem] text-white/50">
                {study.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/20 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/case-studies/${study.slug}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.35rem] text-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1116] md:w-auto"
              >
                Read the case study
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
