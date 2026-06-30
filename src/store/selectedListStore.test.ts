import { beforeEach, describe, expect, it } from "vitest";
import { useSelectedListStore } from "@/store/selectedListStore";
import type { UserProfileSummary } from "@/types";

const mockProfile: UserProfileSummary = {
  user_id: "user-1",
  username: "cristiano",
  url: "https://instagram.com/cristiano",
  picture: "https://example.com/pic.jpg",
  fullname: "Cristiano Ronaldo",
  is_verified: true,
  followers: 600_000_000,
};

describe("useSelectedListStore", () => {
  beforeEach(() => {
    useSelectedListStore.setState({ profiles: [] });
    localStorage.clear();
  });

  it("adds a profile to the list", () => {
    const added = useSelectedListStore
      .getState()
      .addProfile(mockProfile, "instagram");

    expect(added).toBe(true);
    expect(useSelectedListStore.getState().profiles).toHaveLength(1);
    expect(useSelectedListStore.getState().profiles[0].username).toBe(
      "cristiano"
    );
  });

  it("prevents duplicate entries for the same platform and user", () => {
    const store = useSelectedListStore.getState();

    expect(store.addProfile(mockProfile, "instagram")).toBe(true);
    expect(store.addProfile(mockProfile, "instagram")).toBe(false);
    expect(useSelectedListStore.getState().profiles).toHaveLength(1);
  });

  it("allows the same user on different platforms", () => {
    const store = useSelectedListStore.getState();

    expect(store.addProfile(mockProfile, "instagram")).toBe(true);
    expect(store.addProfile(mockProfile, "youtube")).toBe(true);
    expect(useSelectedListStore.getState().profiles).toHaveLength(2);
  });

  it("removes a profile from the list", () => {
    const store = useSelectedListStore.getState();
    store.addProfile(mockProfile, "instagram");
    store.removeProfile("instagram", "user-1");

    expect(useSelectedListStore.getState().profiles).toHaveLength(0);
  });

  it("tracks membership with isInList", () => {
    const store = useSelectedListStore.getState();
    store.addProfile(mockProfile, "instagram");

    expect(store.isInList("instagram", "user-1")).toBe(true);
    expect(store.isInList("youtube", "user-1")).toBe(false);
  });
});
