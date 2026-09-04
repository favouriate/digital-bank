"use client";

import { usePathname } from "next/navigation";

import { AppLogo } from "@/components/layout/app-logo";
import { DesktopSidebarTrigger } from "@/components/layout/desktop-sidebar-trigger";
import { SearchEntry } from "@/components/layout/search-entry";
import { UserMenu } from "@/components/layout/user-menu";
import { ThemeToggle } from "@/features/auth/login/components/theme-toggle";
import { DashboardGreeting } from "@/features/dashboard/components/dashboard-greeting";
import type { User } from "@/types/user";

type AppHeaderProps = {
  user: User;
};

export function AppHeader({ user }: AppHeaderProps) {
  const pathname = usePathname();
  const isDashboard = pathname === "/";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card shadow-xs dark:shadow-none">
      <div className="mx-auto flex w-full max-w-content flex-col gap-1 px-page-mobile pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 md:px-page-tablet lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-page-desktop lg:py-2.5">
        <div className="flex items-center justify-between gap-2 lg:contents">
          <div className="flex min-w-0 items-center gap-1 lg:order-1">
            <AppLogo className="lg:hidden [&_span:first-child]:size-7" />
            <DesktopSidebarTrigger />
          </div>

          <div className="flex shrink-0 items-center gap-0.5 lg:order-3 lg:gap-2">
            <SearchEntry />
            <ThemeToggle compact />
            <UserMenu user={user} />
          </div>
        </div>

        {isDashboard ? (
          <div className="min-w-0 lg:order-2 lg:flex-1">
            <DashboardGreeting firstName={user.firstName} />
          </div>
        ) : null}
      </div>
    </header>
  );
}
