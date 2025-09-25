export type ProfilePortfolioItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
};

export type ProfileSocial = {
  website?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  dribbble?: string;
  behance?: string;
  [key: string]: string | undefined;
};

export type ProfileRecord = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  services: string[];
  website: string;
  email: string;
  phone?: string;
  coverImage: string;
  avatarImage?: string;
  bio: string;
  social: ProfileSocial;
  highlights: string[];
  portfolio: ProfilePortfolioItem[];
};

export type ProfileState = "DRAFT" | "UNDER_REVIEW" | "PUBLISHED" | "REJECTED";

export type ProfileOwnership = {
  profileId: string;
  userId: string;
  state: ProfileState;
  claimedAt?: string;
  publishedAt?: string;
  updatedAt: string;
};
