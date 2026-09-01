import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/app-header";
import { DesktopSidebar } from "@/components/layout/desktop-sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { PageContainer } from "@/components/layout/page-container";
import { SidebarShell } from "@/components/layout/sidebar-shell";
import { getCurrentUser } from "@/lib/current-user";
import { getNotificationSummary } from "@/lib/notifications";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const user = getCurrentUser();
  const notifications = getNotificationSummary();

  return (
    <SidebarShell>
      <DesktopSidebar notifications={notifications} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader user={user} notifications={notifications} />
        <PageContainer>
          <main className="flex-1 pt-4">{children}</main>
        </PageContainer>
        <MobileNavigation />
      </div>
    </SidebarShell>
  );
}
