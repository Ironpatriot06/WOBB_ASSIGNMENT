import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { AppLayout } from "@/components/layout/AppLayout";

interface LayoutProviderProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function LayoutProvider({
  children,
  title,
  subtitle,
}: LayoutProviderProps) {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleListToggle = useCallback(() => {
    setIsListOpen((open) => !open);
  }, []);

  const handleListClose = useCallback(() => {
    setIsListOpen(false);
  }, []);

  return (
    <AppLayout
      title={title}
      subtitle={subtitle}
      isListOpen={isListOpen}
      onListToggle={handleListToggle}
      onListClose={handleListClose}
    >
      {children}
    </AppLayout>
  );
}
