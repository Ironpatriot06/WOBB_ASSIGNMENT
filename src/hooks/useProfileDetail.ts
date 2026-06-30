import { useEffect, useState } from "react";
import type { ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";

interface UseProfileDetailResult {
  profileData: ProfileDetailResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function useProfileDetail(username: string): UseProfileDetailResult {
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadProfileByUsername(username)
      .then((data) => {
        if (cancelled) return;

        if (!data) {
          setError(`Could not load profile details for @${username}`);
          setProfileData(null);
        } else {
          setProfileData(data);
          setError(null);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setError("Something went wrong while loading this profile.");
        setProfileData(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { profileData, isLoading, error };
}
