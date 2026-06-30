import { Search } from "lucide-react";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { cn } from "@/lib/cn";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="space-y-4">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter by platform"
      >
        {PLATFORMS.map((platform) => {
          const isSelected = selected === platform;

          return (
            <button
              key={platform}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onChange(platform)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                isSelected
                  ? "bg-accent text-white shadow-md shadow-accent/25"
                  : "border border-border bg-surface text-text-muted hover:border-accent/40 hover:text-text-heading"
              )}
            >
              {getPlatformLabel(platform)}
            </button>
          );
        })}
      </div>

      <div className="relative max-w-xl">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by username or name..."
          aria-label="Search influencers"
          className={cn(
            "w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-sm text-text-heading",
            "placeholder:text-text-muted/70",
            "transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          )}
        />
      </div>
    </div>
  );
}
