import { describe, expect, it } from "vitest";
import {
  filterProfiles,
  normalizeProfile,
} from "@/utils/dataHelpers";
import type { UserProfileSummary } from "@/types";
import {
  formatEngagementRate,
  formatFollowers,
  formatNumber,
} from "@/utils/formatters";

const profiles: UserProfileSummary[] = [
  {
    user_id: "1",
    username: "cristiano",
    url: "",
    picture: "",
    fullname: "Cristiano Ronaldo",
    is_verified: true,
    followers: 100,
  },
  {
    user_id: "2",
    username: "",
    handle: "VladandNiki",
    url: "",
    picture: "",
    fullname: "Vlad and Niki",
    is_verified: false,
    followers: 200,
  },
];

describe("dataHelpers", () => {
  it("normalizes username from handle when missing", () => {
    const normalized = normalizeProfile(profiles[1]);
    expect(normalized.username).toBe("VladandNiki");
  });

  it("filters profiles case-insensitively by username and fullname", () => {
    expect(filterProfiles(profiles, "CRIST")).toHaveLength(1);
    expect(filterProfiles(profiles, "vlad")).toHaveLength(1);
    expect(filterProfiles(profiles, "niki")).toHaveLength(1);
  });
});

describe("formatters", () => {
  it("formats follower counts", () => {
    expect(formatFollowers(1_500_000)).toBe("1.50M");
    expect(formatFollowers(12_500)).toBe("13K");
    expect(formatFollowers(500)).toBe("500");
  });

  it("formats engagement rate as percentage", () => {
    expect(formatEngagementRate(0.012551)).toBe("1.26%");
  });

  it("formats large numbers with locale separators", () => {
    expect(formatNumber(7_539_473)).toBe("7,539,473");
  });
});
