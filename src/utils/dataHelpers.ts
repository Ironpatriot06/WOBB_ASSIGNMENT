import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as SearchData,
  youtube: youtubeData as SearchData,
  tiktok: tiktokData as SearchData,
};

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

/** Normalize profiles so username is always available (YouTube entries may only have handle). */
export function normalizeProfile(
  profile: UserProfileSummary
): UserProfileSummary {
  return {
    ...profile,
    username: profile.username || profile.handle || profile.user_id,
  };
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) =>
    normalizeProfile(item.account.user_profile)
  );
}

export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  if (!query.trim()) return profiles;

  const normalizedQuery = query.trim().toLowerCase();

  return profiles.filter((profile) => {
    const username = profile.username.toLowerCase();
    const fullname = profile.fullname.toLowerCase();
    const handle = profile.handle?.toLowerCase() ?? "";

    return (
      username.includes(normalizedQuery) ||
      fullname.includes(normalizedQuery) ||
      handle.includes(normalizedQuery)
    );
  });
}

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

export function getPlatformLabel(platform: Platform): string {
  return PLATFORM_LABELS[platform];
}

export function getProfileKey(platform: Platform, userId: string): string {
  return `${platform}:${userId}`;
}
