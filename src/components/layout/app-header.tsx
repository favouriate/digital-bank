import { DesktopSidebarTrigger } from "@/components/layout/desktop-sidebar-trigger";
import { MobileNavSheet } from "@/components/layout/mobile-nav-sheet";
import { NotificationEntry } from "@/components/layout/notification-entry";
import { SearchEntry } from "@/components/layout/search-entry";
import { UserAvatar } from "@/components/layout/user-avatar";
import { getTimeOfDayGreeting } from "@/lib/greeting";
import type { NotificationSummary } from "@/types/notification";
import type { User } from "@/types/user";

type AppHeaderProps = {
  user: User;
  notifications: NotificationSummary;
};

export function AppHeader({ user, notifications }: AppHeaderProps) {
  const greeting = getTimeOfDayGreeting();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card shadow-xs dark:shadow-none">
      <div className="mx-auto flex w-full max-w-content items-center justify-between gap-3 px-page-mobile pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 md:px-page-tablet lg:px-page-desktop lg:pt-5 lg:pb-4">
        <div className="flex min-w-0 items-center gap-1 lg:hidden">
          <MobileNavSheet notifications={notifications} />
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-foreground">
              Hi, {user.firstName}{" "}
              <span aria-hidden="true">👋</span>
            </p>
            <p className="truncate text-sm text-muted-foreground">{greeting}</p>
          </div>
        </div>
        <DesktopSidebarTrigger />

        <div className="flex shrink-0 items-center gap-1">
          <SearchEntry />
          <NotificationEntry unreadCount={notifications.unreadCount} />
          <UserAvatar user={user} />
        </div>
      </div>
    </header>
  );
}
