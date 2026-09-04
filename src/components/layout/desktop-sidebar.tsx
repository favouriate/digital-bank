"use client";

import { LogOut } from "lucide-react";

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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { getNavigationByPlacement } from "@/lib/navigation";

export function DesktopSidebar() {
  const { state } = useSidebar();
  const logout = useLogout();
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
                  <SidebarNavItem key={item.id} item={item} />
                ))}
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-5">
        <nav aria-label="Account">
          <SidebarMenu className="gap-1.5">
            {footerItems.map((item) => (
              <SidebarNavItem key={item.id} item={item} />
            ))}
          </SidebarMenu>
        </nav>
        <SidebarSeparator className="mx-0 my-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              tooltip="Log out"
              onClick={logout}
              className="h-11 min-h-11 rounded-xl px-3 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&_svg]:size-5 group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:p-2!"
            >
              <LogOut aria-hidden="true" />
              <span className="group-data-[collapsible=icon]:sr-only">
                Log out
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail aria-label={railLabel} title={railLabel} />
    </Sidebar>
  );
}
