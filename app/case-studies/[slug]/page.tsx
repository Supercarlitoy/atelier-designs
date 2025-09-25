import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import caseStudies from "@/data/case-studies.seed.json";
import profiles from "@/data/profiles.seed.json";

const studies = caseStudies as typeof caseStudies;

const studyMap = new Map(studies.map((study) => [study.slug, study]));
const profileMap = new Map(profiles.map((profile) => [profile.slug, profile]));

export function generateStaticParams() {
  return studies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = studyMap.get(params.slug);
  if (!study) {
    return {};
  }

  return {
    title: `${study.title} – Melbourne Designers Directory case study`,
    description: study.excerpt,
    openGraph: {
      title: study.title,
      description: study.excerpt,
      type: "article",
      images: [
        {
          url: study.coverUrl,
          width: 1200,
          height: 630,
          alt: study.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.excerpt,
      images: [study.coverUrl]
    }
  };
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const study = studyMap.get(params.slug);
  if (!study) {
    notFound();
  }

  const profile = profileMap.get(study.designerSlug);

  return (
    <main className="bg-[#05070b] pb-24 pt-16 text-white">
      <article className="mx-auto max-w-5xl px-6">
        <Link
          href="/case-studies"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.4rem] text-white/50 underline-offset-8 hover:underline"
        >
          ← All case studies
        </Link>
        <header className="mt-6">
          <p className="text-[12px] uppercase tracking-[0.5rem] text-white/40">{study?.designerName}</p>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{study?.title}</h1>
          <p className="mt-4 max-w-3xl text-base text-white/70 md:text-lg">{study?.intro}</p>
        </header>
        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
          <img src={study?.coverUrl} alt={study?.title} className="w-full" />
        </div>

        <section className="mt-12 grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-[0.3rem] text-white/50">Background</h2>
              <p className="mt-3 text-sm text-white/70">{study?.background}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-[0.3rem] text-white/50">Approach</h2>
              <ul className="mt-3 space-y-3 text-sm text-white/70">
                {study?.approach.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[6px] inline-block h-2 w-2 rounded-full bg-white/50" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3rem] text-white/50">Results</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {study?.results.map((result) => (
                <li key={result.label} className="flex items-baseline justify-between gap-4">
                  <span className="text-white/60">{result.label}</span>
                  <span className="text-lg font-semibold text-white">{result.value}</span>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {study?.testimonial ? (
          <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
            <p className="text-lg italic text-white/80">“{study.testimonial.quote}”</p>
            <p className="mt-4 text-sm uppercase tracking-[0.3rem] text-white/50">
              {study.testimonial.name} · {study.testimonial.role}
            </p>
          </section>
        ) : null}

        {profile ? (
          <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-semibold">About {profile.name}</h2>
            <p className="mt-3 text-sm text-white/70">{profile.bio}</p>
            <div className="mt-5 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.3rem] text-white/50">
              {profile.services.map((service) => (
                <span key={service} className="rounded-full border border-white/20 px-3 py-1">
                  {service}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/profiles/${profile.slug}`}
                className="w-full rounded-full bg-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.35rem] text-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070b] sm:w-auto"
              >
                View profile
              </Link>
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-full border border-white/20 px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.35rem] text-white transition hover:border-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070b] sm:w-auto"
              >
                Visit website
              </a>
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
