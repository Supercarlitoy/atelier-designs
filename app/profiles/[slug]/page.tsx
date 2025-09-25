import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProfileAbout } from "@/components/profile/ProfileAbout";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { ProfilePortfolio } from "@/components/profile/ProfilePortfolio";
import { ProfileSharePanel } from "@/components/profile/ProfileSharePanel";
import { getProfileBySlug, getProfiles } from "@/lib/profiles";

export async function generateStaticParams() {
  return getProfiles().map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const profile = getProfileBySlug(params.slug);
  if (!profile) {
    return {};
  }

  const title = `${profile.name} — Melbourne Designers Directory`;
  const description = profile.tagline;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/profiles/${profile.slug}`,
      images: [
        {
          url: profile.coverImage,
          width: 1200,
          height: 630,
          alt: `${profile.name} cover`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profile.coverImage]
    }
  };
}

export default function ProfilePage({ params }: { params: { slug: string } }) {
  const profile = getProfileBySlug(params.slug);

  if (!profile) {
    notFound();
  }

  return (
    <main className="bg-[#f4f4f4] pb-24 pt-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:px-0">
        <ProfileHero profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfilePortfolio profile={profile} />
        <ProfileSharePanel profile={profile} />
      </div>
    </main>
  );
}
