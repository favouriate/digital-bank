import {
  Activity,
  BarChart3,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  Send,
  Settings,
  Wallet,
} from "lucide-react";

import type {
  NavigationItem,
  NavigationPlacement,
} from "@/types/navigation";

export const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    placements: ["sidebar", "mobile-tab"],
  },
  {
    id: "invoices",
    label: "Invoices",
    href: "/invoices",
    icon: FileText,
    placements: ["sidebar", "mobile-menu"],
  },
  {
    id: "messages",
    label: "Messages",
    href: "/messages",
    icon: MessageSquare,
    placements: ["sidebar", "mobile-menu"],
    badgeKey: "messages",
  },
  {
    id: "wallets",
    label: "My Wallets",
    href: "/wallets",
    icon: Wallet,
    placements: ["sidebar", "mobile-menu"],
  },
  {
    id: "activity",
    label: "Activity",
    href: "/activity",
    icon: Activity,
    placements: ["sidebar", "mobile-menu"],
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    placements: ["sidebar", "mobile-menu"],
  },
  {
    id: "transfers",
    label: "Transfer",
    href: "/transfers",
    icon: Send,
    placements: ["mobile-tab"],
  },
  {
    id: "transactions",
    label: "Transactions",
    href: "/transactions",
    icon: Receipt,
    placements: ["mobile-tab"],
  },
  {
    id: "support",
    label: "Get Help",
    href: "/support",
    icon: HelpCircle,
    placements: ["sidebar-footer", "mobile-menu"],
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
    placements: ["sidebar-footer", "mobile-tab"],
  },
];

export function getNavigationByPlacement(placement: NavigationPlacement) {
  return navigationItems.filter((item) => item.placements.includes(placement));
}

export function isNavItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
