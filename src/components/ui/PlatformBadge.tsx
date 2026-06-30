import type { Platform } from "@/types";
import { getPlatformLabel } from "@/utils/dataHelpers";
import { cn } from "@/lib/cn";

const platformStyles: Record<Platform, string> = {
  instagram:
    "bg-gradient-to-r from-purple-500/15 to-pink-500/15 text-pink-700 border-pink-200 dark:text-pink-300 dark:border-pink-900",
  youtube:
    "bg-red-500/10 text-red-700 border-red-200 dark:text-red-300 dark:border-red-900",
  tiktok:
    "bg-slate-500/10 text-slate-700 border-slate-200 dark:text-slate-300 dark:border-slate-700",
};

interface PlatformBadgeProps {
  platform: Platform;
  className?: string;
}

export function PlatformBadge({ platform, className }: PlatformBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        platformStyles[platform],
        className
      )}
    >
      {getPlatformLabel(platform)}
    </span>
  );
}
