import { formatEngagementRate, formatFollowers, formatNumber } from "@/utils/formatters";
import type { FullUserProfile } from "@/types";

interface StatItem {
  label: string;
  value: string;
}

function buildStats(user: FullUserProfile): StatItem[] {
  const stats: StatItem[] = [
    { label: "Followers", value: formatFollowers(user.followers) },
  ];

  if (user.engagement_rate !== undefined) {
    stats.push({
      label: "Engagement Rate",
      value: formatEngagementRate(user.engagement_rate),
    });
  }

  if (user.posts_count !== undefined) {
    stats.push({
      label: "Posts",
      value: formatNumber(user.posts_count),
    });
  }

  if (user.avg_likes !== undefined) {
    stats.push({
      label: "Avg Likes",
      value: formatFollowers(user.avg_likes),
    });
  }

  if (user.avg_comments !== undefined) {
    stats.push({
      label: "Avg Comments",
      value: formatNumber(user.avg_comments),
    });
  }

  if (user.avg_views !== undefined && user.avg_views > 0) {
    stats.push({
      label: "Avg Views",
      value: formatFollowers(user.avg_views),
    });
  }

  if (user.engagements !== undefined) {
    stats.push({
      label: "Engagements",
      value: formatNumber(user.engagements),
    });
  }

  return stats;
}

interface StatsGridProps {
  user: FullUserProfile;
}

export function StatsGrid({ user }: StatsGridProps) {
  const stats = buildStats(user);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-surface-muted/50 p-4"
        >
          <dt className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {stat.label}
          </dt>
          <dd className="mt-1 text-lg font-semibold text-text-heading">
            {stat.value}
          </dd>
        </div>
      ))}
    </div>
  );
}
