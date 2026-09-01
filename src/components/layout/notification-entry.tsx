import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotificationEntryProps = {
  unreadCount: number;
  className?: string;
};

export function NotificationEntry({
  unreadCount,
  className,
}: NotificationEntryProps) {
  const hasUnread = unreadCount > 0;
  const badgeLabel = unreadCount > 9 ? "9+" : String(unreadCount);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={
        hasUnread
          ? `Notifications, ${unreadCount} unread`
          : "Notifications"
      }
      className={cn("relative size-9", className)}
    >
      <Bell className="size-4" aria-hidden="true" />
      {hasUnread ? (
        <span
          aria-hidden="true"
          className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground"
        >
          {badgeLabel}
        </span>
      ) : null}
    </Button>
  );
}
