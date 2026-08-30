import type { LucideIcon } from "lucide-react";

import { navigationItems } from "@/lib/navigation";

export type SearchPage = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

const SEARCH_PAGE_DEFS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "transfers", label: "Transfer" },
  { id: "transactions", label: "Transactions" },
  { id: "settings", label: "Settings" },
  { id: "support", label: "Help" },
] as const;

export function getSearchPages(): SearchPage[] {
  return SEARCH_PAGE_DEFS.map((definition) => {
    const item = navigationItems.find((page) => page.id === definition.id);
    if (!item) {
      throw new Error(`Missing search page: ${definition.id}`);
    }

    return {
      id: item.id,
      label: definition.label,
      href: item.href,
      icon: item.icon,
    };
  });
}

export const searchPages = getSearchPages();
