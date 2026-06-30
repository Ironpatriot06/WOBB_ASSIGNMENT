import { Check, ListPlus } from "lucide-react";
import { memo, useCallback } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { useSelectedListStore } from "@/store/selectedListStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface AddToListButtonProps {
  profile: UserProfileSummary;
  platform: Platform;
  size?: "sm" | "md";
  className?: string;
}

export const AddToListButton = memo(function AddToListButton({
  profile,
  platform,
  size = "sm",
  className,
}: AddToListButtonProps) {
  const addProfile = useSelectedListStore((s) => s.addProfile);
  const removeProfile = useSelectedListStore((s) => s.removeProfile);
  const isInList = useSelectedListStore((s) =>
    s.isInList(platform, profile.user_id)
  );

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();

      if (isInList) {
        removeProfile(platform, profile.user_id);
      } else {
        addProfile(profile, platform);
      }
    },
    [addProfile, removeProfile, isInList, platform, profile]
  );

  return (
    <Button
      variant={isInList ? "secondary" : "outline"}
      size={size}
      onClick={handleClick}
      aria-pressed={isInList}
      aria-label={
        isInList
          ? `Remove ${profile.fullname} from list`
          : `Add ${profile.fullname} to list`
      }
      className={cn(
        isInList && "border-accent/40 bg-accent/10 text-accent",
        className
      )}
    >
      {isInList ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden />
          Added
        </>
      ) : (
        <>
          <ListPlus className="h-3.5 w-3.5" aria-hidden />
          Add to List
        </>
      )}
    </Button>
  );
});
