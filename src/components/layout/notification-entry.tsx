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
      className={cn("relative size-11 lg:size-9", className)}
    >
      <Bell className="size-5" aria-hidden="true" />
      {hasUnread ? (
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 size-2 rounded-full bg-primary ring-2 ring-background lg:top-1.5 lg:right-1.5"
        />
      ) : null}
    </Button>
  );
}
