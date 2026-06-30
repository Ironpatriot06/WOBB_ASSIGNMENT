import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, SavedProfile, UserProfileSummary } from "@/types";
import { getProfileKey } from "@/utils/dataHelpers";

interface SelectedListState {
  profiles: SavedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => boolean;
  removeProfile: (platform: Platform, userId: string) => void;
  clearList: () => void;
  isInList: (platform: Platform, userId: string) => boolean;
}

function toSavedProfile(
  profile: UserProfileSummary,
  platform: Platform
): SavedProfile {
  return {
    user_id: profile.user_id,
    username: profile.username,
    fullname: profile.fullname,
    picture: profile.picture,
    followers: profile.followers,
    platform,
    is_verified: profile.is_verified,
  };
}

export const useSelectedListStore = create<SelectedListState>()(
  persist(
    (set, get) => ({
      profiles: [],

      addProfile: (profile, platform) => {
        const key = getProfileKey(platform, profile.user_id);
        const exists = get().profiles.some(
          (item) => getProfileKey(item.platform, item.user_id) === key
        );

        if (exists) return false;

        set((state) => ({
          profiles: [...state.profiles, toSavedProfile(profile, platform)],
        }));

        return true;
      },

      removeProfile: (platform, userId) => {
        const key = getProfileKey(platform, userId);
        set((state) => ({
          profiles: state.profiles.filter(
            (item) => getProfileKey(item.platform, item.user_id) !== key
          ),
        }));
      },

      clearList: () => set({ profiles: [] }),

      isInList: (platform, userId) => {
        const key = getProfileKey(platform, userId);
        return get().profiles.some(
          (item) => getProfileKey(item.platform, item.user_id) === key
        );
      },
    }),
    {
      name: "wobb-selected-profiles",
    }
  )
);
