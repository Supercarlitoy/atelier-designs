import { notFound } from "next/navigation";

import { ProfileEditor } from "@/components/profile/ProfileEditor";
import { getProfileBySlug } from "@/lib/profiles";

export default function ProfileEditPage({ params }: { params: { slug: string } }) {
  const profile = getProfileBySlug(params.slug);

  if (!profile) {
    notFound();
  }

  return (
    <main className="bg-[#f4f4f4] pb-24 pt-16">
      <div className="mx-auto max-w-4xl px-6 md:px-0">
        <ProfileEditor profile={profile} />
      </div>
    </main>
  );
}
