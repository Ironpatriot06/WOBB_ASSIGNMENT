import { Trash2, UserMinus, List, X } from "lucide-react";
import { Link } from "react-router-dom";
import type { SavedProfile } from "@/types";
import { useSelectedListStore } from "@/store/selectedListStore";
import { PlatformBadge } from "@/components/ui/PlatformBadge";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { Button } from "@/components/ui/Button";
import { formatFollowersLabel } from "@/utils/formatters";
import { cn } from "@/lib/cn";

interface SelectedListPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

function SelectedListItem({ profile }: { profile: SavedProfile }) {
  const removeProfile = useSelectedListStore((s) => s.removeProfile);

  return (
    <li className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent/30">
      <img
        src={profile.picture}
        alt=""
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-border"
      />
      <div className="min-w-0 flex-1 text-left">
        <div className="flex items-center gap-1.5">
          <Link
            to={`/profile/${profile.username}?platform=${profile.platform}`}
            className="truncate font-semibold text-text-heading hover:text-accent"
            onClick={() => {}}
          >
            @{profile.username}
          </Link>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <p className="truncate text-sm text-text-muted">{profile.fullname}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <PlatformBadge platform={profile.platform} />
          <span className="text-xs text-text-muted">
            {formatFollowersLabel(profile.followers)}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeProfile(profile.platform, profile.user_id)}
        aria-label={`Remove ${profile.fullname} from list`}
        className="shrink-0 opacity-60 group-hover:opacity-100"
      >
        <UserMinus className="h-4 w-4" aria-hidden />
      </Button>
    </li>
  );
}

export function SelectedListPanel({ isOpen, onClose }: SelectedListPanelProps) {
  const profiles = useSelectedListStore((s) => s.profiles);
  const clearList = useSelectedListStore((s) => s.clearList);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        id="selected-list-panel"
        aria-label="Selected profiles"
        aria-hidden={!isOpen}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-text-heading">
              Selected Profiles
            </h2>
            <p className="text-sm text-text-muted">
              {profiles.length} profile{profiles.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close selected list"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {profiles.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 rounded-full bg-accent/10 p-4">
                <List className="h-8 w-8 text-accent" aria-hidden />
              </div>
              <p className="font-medium text-text-heading">No profiles yet</p>
              <p className="mt-1 text-sm text-text-muted">
                Browse creators and tap &ldquo;Add to List&rdquo; to build your
                shortlist.
              </p>
            </div>
          ) : (
            <ul className="space-y-3" role="list">
              {profiles.map((profile) => (
                <SelectedListItem
                  key={`${profile.platform}:${profile.user_id}`}
                  profile={profile}
                />
              ))}
            </ul>
          )}
        </div>

        {profiles.length > 0 && (
          <div className="border-t border-border p-4">
            <Button
              variant="danger"
              size="md"
              className="w-full"
              onClick={clearList}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Clear all
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
