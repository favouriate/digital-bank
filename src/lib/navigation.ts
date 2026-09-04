import {
  ArrowLeftRight,
  CircleHelp,
  LayoutDashboard,
  Send,
  Settings,
} from "lucide-react";

import type {
  NavigationItem,
  NavigationPlacement,
} from "@/types/navigation";

export const primaryNavigation: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    placements: ["sidebar", "mobile-tab"],
  },
  {
    id: "transfers",
    label: "Send Money",
    href: "/transfers",
    icon: Send,
    placements: ["sidebar", "mobile-tab"],
  },
  {
    id: "transactions",
    label: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
    placements: ["sidebar", "mobile-tab"],
  },
];

export const secondaryNavigation: NavigationItem[] = [
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
    placements: ["sidebar-footer", "mobile-more"],
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    icon: CircleHelp,
    placements: ["sidebar-footer", "mobile-more"],
  },
];

export const navigationItems: NavigationItem[] = [
  ...primaryNavigation,
  ...secondaryNavigation,
];

const MORE_HREFS = ["/settings", "/support"] as const;

export function getNavigationByPlacement(placement: NavigationPlacement) {
  return navigationItems.filter((item) => item.placements.includes(placement));
}

export function isNavItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isMoreRoute(pathname: string) {
  return MORE_HREFS.some(
    (href) => pathname === href || pathname.startsWith(`${href}/`),
  );
}
