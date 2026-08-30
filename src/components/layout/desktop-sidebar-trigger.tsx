"use client";

import { PanelLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function DesktopSidebarTrigger({ className }: { className?: string }) {
  const { state, toggleSidebar } = useSidebar();
  const label =
    state === "expanded" ? "Collapse sidebar" : "Expand sidebar";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      aria-expanded={state === "expanded"}
      onClick={toggleSidebar}
      className={cn("hidden size-9 lg:inline-flex", className)}
    >
      <PanelLeftIcon className="size-5" aria-hidden="true" />
    </Button>
  );
}
