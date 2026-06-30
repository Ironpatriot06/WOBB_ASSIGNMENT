import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { ListToggleButton } from "@/components/list/ListToggleButton";
import { SelectedListPanel } from "@/components/list/SelectedListPanel";
import { cn } from "@/lib/cn";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  isListOpen: boolean;
  onListToggle: () => void;
  onListClose: () => void;
}

export function AppLayout({
  children,
  title,
  subtitle,
  isListOpen,
  onListToggle,
  onListClose,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-30 border-b border-border/80 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-text-heading transition-colors hover:text-accent"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Influencer Search
            </span>
          </Link>

          <ListToggleButton onClick={onListToggle} />
        </div>
      </header>

      <main
        id="main-content"
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10"
      >
        {(title || subtitle) && (
          <div className="mb-8 text-left">
            {title && (
              <h1 className="text-3xl font-bold tracking-tight text-text-heading sm:text-4xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 max-w-2xl text-base text-text-muted">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn("animate-fade-in")}>{children}</div>
      </main>

      <SelectedListPanel isOpen={isListOpen} onClose={onListClose} />
    </div>
  );
}
