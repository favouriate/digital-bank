"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { isNavItemActive } from "@/lib/navigation";
import type { NavigationItem } from "@/types/navigation";

type SidebarNavItemProps = {
  item: NavigationItem;
  badgeCount?: number;
};

export function SidebarNavItem({ item, badgeCount }: SidebarNavItemProps) {
  const pathname = usePathname();
  const active = isNavItemActive(pathname, item.href);
  const Icon = item.icon;
  const showBadge = typeof badgeCount === "number" && badgeCount > 0;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={item.href} />}
        isActive={active}
        tooltip={item.label}
        aria-current={active ? "page" : undefined}
        className="relative min-h-11 rounded-lg px-3 font-medium [&_svg]:size-5 group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:p-2! data-active:before:absolute data-active:before:inset-y-1.5 data-active:before:-left-3 data-active:before:w-1 data-active:before:rounded-full data-active:before:bg-primary group-data-[collapsible=icon]:data-active:before:hidden"
      >
        <Icon aria-hidden="true" />
        <span className="group-data-[collapsible=icon]:sr-only">{item.label}</span>
      </SidebarMenuButton>
      {showBadge ? (
        <SidebarMenuBadge className="rounded-full bg-primary px-1.5 text-[0.65rem] font-semibold text-primary-foreground group-data-[collapsible=icon]:top-1 group-data-[collapsible=icon]:right-1 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:min-w-4 group-data-[collapsible=icon]:px-1">
          {badgeCount}
        </SidebarMenuBadge>
      ) : null}
    </SidebarMenuItem>
  );
}
