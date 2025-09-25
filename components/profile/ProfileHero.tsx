import Image from "next/image";
import Link from "next/link";

import { ProfileRecord } from "@/types/profile";

function formatPhone(phone?: string) {
  if (!phone) return undefined;
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits : `tel:${digits}`;
}

export type ProfileHeroProps = {
  profile: ProfileRecord;
};

export function ProfileHero({ profile }: ProfileHeroProps) {
  const phoneHref = formatPhone(profile.phone);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[rgba(17,17,17,0.08)] bg-white shadow-[0_40px_120px_rgba(15,18,24,0.12)]">
      <div className="relative h-[240px] w-full sm:h-[320px] md:h-[420px]">
        <Image
          src={profile.coverImage}
          alt={`${profile.name} studio cover`}
          fill
          priority
          sizes="(min-width: 1024px) 1200px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
      </div>
      <div className="relative px-6 pb-10 pt-8 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            {profile.avatarImage ? (
              <div className="relative mt-[-90px] h-[120px] w-[120px] shrink-0 overflow-hidden rounded-full border-4 border-white shadow-[0_24px_48px_rgba(15,18,24,0.25)]">
                <Image
                  src={profile.avatarImage}
                  alt={`${profile.name} logo`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="text-white">
              <p className="text-[11px] uppercase tracking-[0.35rem] text-white/70 sm:text-xs">{profile.location}</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl md:text-5xl">{profile.name}</h1>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base md:text-lg">{profile.tagline}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-white/80 md:items-end">
            <Link
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3rem] text-black transition hover:bg-black hover:text-white"
            >
              Visit website
            </Link>
            <div className="flex flex-col md:items-end">
              <a href={`mailto:${profile.email}`} className="hover:text-white">
                {profile.email}
              </a>
              {phoneHref ? (
                <a href={phoneHref} className="hover:text-white">
                  {profile.phone}
                </a>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25rem] text-white/70">
          {profile.services.map((service) => (
            <span key={service} className="rounded-full border border-white/30 px-4 py-2">
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
