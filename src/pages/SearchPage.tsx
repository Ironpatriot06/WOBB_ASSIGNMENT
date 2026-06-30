import { useMemo, useState, useCallback } from "react";
import type { Platform } from "@/types";
import { LayoutProvider } from "@/components/layout/LayoutProvider";
import { PlatformFilter } from "@/components/profiles/PlatformFilter";
import { ProfileList } from "@/components/profiles/ProfileList";
import { extractProfiles, filterProfiles, getPlatformLabel } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);

  const filteredProfiles = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  const handlePlatformChange = useCallback((nextPlatform: Platform) => {
    setPlatform(nextPlatform);
    setSearchQuery("");
  }, []);

  return (
    <LayoutProvider
      title="Find Influencers"
      subtitle="Browse top creators across Instagram, YouTube, and TikTok. Build your shortlist and compare profiles side by side."
    >
      <div className="space-y-6">
        <PlatformFilter
          selected={platform}
          onChange={handlePlatformChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <p className="text-sm text-text-muted" aria-live="polite">
          Showing{" "}
          <span className="font-medium text-text-heading">
            {filteredProfiles.length}
          </span>{" "}
          of {allProfiles.length} on {getPlatformLabel(platform)}
        </p>

        <ProfileList profiles={filteredProfiles} platform={platform} />
      </div>
    </LayoutProvider>
  );
}
