export function formatFollowers(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(count >= 10_000_000 ? 1 : 2)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(count >= 10_000 ? 0 : 1)}K`;
  }
  return count.toLocaleString();
}

export function formatFollowersLabel(count: number): string {
  return `${formatFollowers(count)} followers`;
}

export function formatEngagementRate(rate: number | undefined): string {
  if (rate === undefined) return "N/A";
  return `${(rate * 100).toFixed(2)}%`;
}

export function formatNumber(count: number): string {
  return count.toLocaleString();
}
