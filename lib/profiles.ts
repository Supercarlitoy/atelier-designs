import profiles from "@/data/profiles.seed.json";
import { ProfileRecord } from "@/types/profile";

export function getProfiles(): ProfileRecord[] {
  return profiles as ProfileRecord[];
}

export function getProfileBySlug(slug: string): ProfileRecord | undefined {
  return getProfiles().find((profile) => profile.slug === slug);
}
