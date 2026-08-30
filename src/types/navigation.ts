import type { LucideIcon } from "lucide-react";

export type NavigationPlacement =
  | "sidebar"
  | "sidebar-footer"
  | "mobile-tab"
  | "mobile-menu";

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  placements: NavigationPlacement[];
  badgeKey?: "messages";
};
