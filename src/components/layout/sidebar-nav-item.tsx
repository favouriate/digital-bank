"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { isNavItemActive } from "@/lib/navigation";
import type { NavigationItem } from "@/types/navigation";

type SidebarNavItemProps = {
  item: NavigationItem;
};

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const pathname = usePathname();
  const active = isNavItemActive(pathname, item.href);
  const Icon = item.icon;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={item.href} />}
        isActive={active}
        tooltip={item.label}
        aria-current={active ? "page" : undefined}
        className="h-11 min-h-11 rounded-xl px-3 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&_svg]:size-5 group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:p-2! data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-active:hover:bg-sidebar-accent data-active:hover:text-sidebar-accent-foreground"
      >
        <Icon aria-hidden="true" />
        <span className="group-data-[collapsible=icon]:sr-only">{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
