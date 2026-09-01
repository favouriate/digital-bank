"use client";

import { AppLogo } from "@/components/layout/app-logo";
import { SidebarNavItem } from "@/components/layout/sidebar-nav-item";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { getNavigationByPlacement } from "@/lib/navigation";
import type { NotificationSummary } from "@/types/notification";

type DesktopSidebarProps = {
  notifications: NotificationSummary;
};

export function DesktopSidebar({ notifications }: DesktopSidebarProps) {
  const { state } = useSidebar();
  const primaryItems = getNavigationByPlacement("sidebar");
  const footerItems = getNavigationByPlacement("sidebar-footer");
  const railLabel =
    state === "expanded" ? "Collapse sidebar" : "Expand sidebar";

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="px-4 py-5 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        <AppLogo className="group-data-[collapsible=icon]:justify-center" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3">
          <SidebarGroupContent>
            <nav aria-label="Primary">
              <SidebarMenu className="gap-1.5">
                {primaryItems.map((item) => (
                  <SidebarNavItem
                    key={item.id}
                    item={item}
                    badgeCount={
                      item.badgeKey === "messages"
                        ? notifications.messagesCount
                        : undefined
                    }
                  />
                ))}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-5">
        <nav aria-label="Secondary">
          <SidebarMenu className="gap-1.5">
            {footerItems.map((item) => (
              <SidebarNavItem key={item.id} item={item} />
            ))}
          </SidebarMenu>
        </nav>
      </SidebarFooter>

      <SidebarRail aria-label={railLabel} title={railLabel} />
    </Sidebar>
  );
}
