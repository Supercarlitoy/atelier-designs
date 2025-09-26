import Image from "next/image";

import { ProfileRecord } from "@/types/profile";

export type ProfilePortfolioProps = {
  profile: ProfileRecord;
};

export function ProfilePortfolio({ profile }: ProfilePortfolioProps) {
  if (!profile.portfolio.length) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-[rgba(17,17,17,0.06)] bg-white/95 p-8 text-black shadow-[0_18px_48px_rgba(15,18,24,0.08)] md:p-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3rem] text-black/75">Featured work</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Selected case studies</h2>
        </div>
        <p className="max-w-md text-sm text-black/75">
          Highlights from recent launches curated for the Melbourne Designers directory.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {profile.portfolio.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-[rgba(17,17,17,0.06)] bg-white shadow-[0_16px_36px_rgba(15,18,24,0.08)]"
          >
            <div className="relative h-56">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                <p className="text-sm text-black/70">{item.description}</p>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3rem] text-black underline"
              >
                View project
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
