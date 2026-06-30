export function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Loading profile">
      <div className="flex gap-6">
        <div className="h-24 w-24 shrink-0 rounded-full bg-surface-muted" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-48 rounded-lg bg-surface-muted" />
          <div className="h-4 w-32 rounded-lg bg-surface-muted" />
          <div className="h-4 w-full max-w-md rounded-lg bg-surface-muted" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-surface-muted" />
        ))}
      </div>
    </div>
  );
}
