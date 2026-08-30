"use client";

import type { ReactNode } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function SidebarShell({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen className="min-h-svh bg-muted">
        {children}
      </SidebarProvider>
    </TooltipProvider>
  );
}
