import { List } from "lucide-react";
import { useSelectedListStore } from "@/store/selectedListStore";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface ListToggleButtonProps {
  onClick: () => void;
  className?: string;
}

export function ListToggleButton({ onClick, className }: ListToggleButtonProps) {
  const count = useSelectedListStore((s) => s.profiles.length);

  return (
    <Button
      variant="secondary"
      size="md"
      onClick={onClick}
      aria-expanded={false}
      aria-controls="selected-list-panel"
      className={cn("relative", className)}
    >
      <List className="h-4 w-4" aria-hidden />
      My List
      {count > 0 && (
        <span
          className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white"
          aria-label={`${count} profiles in list`}
        >
          {count}
        </span>
      )}
    </Button>
  );
}
