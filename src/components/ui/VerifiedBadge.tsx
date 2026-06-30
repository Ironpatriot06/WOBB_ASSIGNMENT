import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/cn";

interface VerifiedBadgeProps {
  verified: boolean;
  className?: string;
}

export function VerifiedBadge({ verified, className }: VerifiedBadgeProps) {
  if (!verified) return null;

  return (
    <BadgeCheck
      className={cn("inline h-4 w-4 shrink-0 text-sky-500", className)}
      aria-label="Verified account"
    />
  );
}
