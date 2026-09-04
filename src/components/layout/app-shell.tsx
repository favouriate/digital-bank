import type { ReactNode } from "react";

import { AppAuthGate } from "@/components/layout/app-auth-gate";
import { AppHeader } from "@/components/layout/app-header";
import { DesktopSidebar } from "@/components/layout/desktop-sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { PageContainer } from "@/components/layout/page-container";
import { SidebarShell } from "@/components/layout/sidebar-shell";
import { getCurrentUser } from "@/lib/current-user";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const user = getCurrentUser();

  return (
    <AppAuthGate>
      <SidebarShell>
        <DesktopSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader user={user} />
          <PageContainer>
            <main className="flex-1 pt-4">{children}</main>
          </PageContainer>
          <MobileNavigation />
        </div>
      </SidebarShell>
    </AppAuthGate>
  );
}
