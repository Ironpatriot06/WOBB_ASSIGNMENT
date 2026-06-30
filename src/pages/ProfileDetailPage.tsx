import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { LayoutProvider } from "@/components/layout/LayoutProvider";
import { AddToListButton } from "@/components/list/AddToListButton";
import { ProfileSkeleton } from "@/components/profiles/ProfileSkeleton";
import { StatsGrid } from "@/components/profiles/StatsGrid";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { Button } from "@/components/ui/Button";
import { useProfileDetail } from "@/hooks/useProfileDetail";
import { normalizeProfile } from "@/utils/dataHelpers";

function parsePlatform(value: string | null): Platform {
  if (value === "instagram" || value === "youtube" || value === "tiktok") {
    return value;
  }
  return "instagram";
}

function toProfileSummary(user: UserProfileSummary): UserProfileSummary {
  return normalizeProfile({ ...user, username: user.username });
}

interface ProfileDetailContentProps {
  username: string;
  platform: Platform;
}

function ProfileDetailContent({ username, platform }: ProfileDetailContentProps) {
  const { profileData, isLoading, error } = useProfileDetail(username);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !profileData) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-left dark:border-red-900 dark:bg-red-950/30">
        <p className="font-medium text-red-700 dark:text-red-400">
          {error ?? "Profile not found"}
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Detailed data is only available for a subset of profiles in this demo
          dataset.
        </p>
        <Link to="/" className="mt-4 inline-block">
          <Button variant="secondary" size="sm">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to search
          </Button>
        </Link>
      </div>
    );
  }

  const user = profileData.data.user_profile;
  const profileSummary = toProfileSummary(user);

  return (
    <div className="space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to search
      </Link>

      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:flex-row sm:items-start">
        <img
          src={user.picture}
          alt={`${user.fullname}'s profile picture`}
          className="h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-accent/10"
        />

        <div className="min-w-0 flex-1 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="flex items-center gap-1.5 text-2xl font-bold text-text-heading">
              @{user.username}
              <VerifiedBadge verified={user.is_verified} />
            </h2>
            <PlatformBadge platform={platform} />
          </div>

          <p className="mt-1 text-lg text-text-muted">{user.fullname}</p>

          {user.description && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-heading/80">
              {user.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button variant="secondary" size="md">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  View on platform
                </Button>
              </a>
            )}
            <AddToListButton
              profile={profileSummary}
              platform={platform}
              size="md"
            />
          </div>
        </div>
      </div>

      <section aria-labelledby="profile-stats-heading">
        <h3
          id="profile-stats-heading"
          className="mb-4 text-lg font-semibold text-text-heading"
        >
          Profile Stats
        </h3>
        <StatsGrid user={user} />
      </section>
    </div>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = parsePlatform(searchParams.get("platform"));

  if (!username) {
    return (
      <LayoutProvider title="Profile not found">
        <p className="text-text-muted">Invalid profile URL.</p>
        <Link to="/" className="mt-4 inline-block text-accent hover:underline">
          Back to search
        </Link>
      </LayoutProvider>
    );
  }

  return (
    <LayoutProvider title={`@${username}`}>
      <ProfileDetailContent key={username} username={username} platform={platform} />
    </LayoutProvider>
  );
}
