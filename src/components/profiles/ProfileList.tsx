import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { AddToListButton } from "@/components/list/AddToListButton";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { formatFollowersLabel } from "@/utils/formatters";
import { cn } from "@/lib/cn";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const profileUrl = `/profile/${profile.username}?platform=${platform}`;

  const handleCardClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if ((event.target as HTMLElement).closest("button")) {
        event.preventDefault();
      }
    },
    []
  );

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md">
      <Link
        to={profileUrl}
        onClick={handleCardClick}
        className="flex items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
        aria-label={`View profile for ${profile.fullname}`}
      >
        <img
          src={profile.picture}
          alt={`${profile.fullname}'s profile picture`}
          className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-border transition-transform group-hover:scale-105"
          loading="lazy"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-semibold text-text-heading">
              @{profile.username}
            </span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <p className="truncate text-sm text-text-muted">{profile.fullname}</p>
          <p className="mt-0.5 text-sm font-medium text-text-heading/80">
            {formatFollowersLabel(profile.followers)}
          </p>
        </div>
      </Link>

      <div className="mt-3 flex justify-end border-t border-border/60 pt-3">
        <AddToListButton profile={profile} platform={platform} />
      </div>
    </article>
  );
});

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
}

export function ProfileList({ profiles, platform }: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border",
          "bg-surface-muted/50 px-6 py-16 text-center"
        )}
      >
        <p className="text-lg font-medium text-text-heading">
          No profiles found
        </p>
        <p className="mt-1 text-sm text-text-muted">
          Try adjusting your search or switching platforms.
        </p>
      </div>
    );
  }

  return (
    <ul
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2"
      role="list"
      aria-label="Influencer profiles"
    >
      {profiles.map((profile) => (
        <li key={profile.user_id}>
          <ProfileCard profile={profile} platform={platform} />
        </li>
      ))}
    </ul>
  );
}
