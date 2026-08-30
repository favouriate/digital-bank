"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { AppLogo } from "@/components/layout/app-logo";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getNavigationByPlacement } from "@/lib/navigation";
import type { NotificationSummary } from "@/types/notification";

type MobileNavSheetProps = {
  notifications: NotificationSummary;
};

export function MobileNavSheet({ notifications }: MobileNavSheetProps) {
  const [open, setOpen] = useState(false);
  const menuItems = getNavigationByPlacement("mobile-menu");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="size-11 lg:hidden"
          />
        }
      >
        <Menu className="size-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-sidebar p-0">
        <SheetHeader className="border-b border-sidebar-border px-5 py-5">
          <SheetTitle className="sr-only">Application menu</SheetTitle>
          <AppLogo />
        </SheetHeader>
        <nav aria-label="More" className="flex flex-1 flex-col px-3 py-4">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  item={item}
                  variant="mobile-menu"
                  badgeCount={
                    item.badgeKey === "messages"
                      ? notifications.messagesCount
                      : undefined
                  }
                  onNavigate={() => setOpen(false)}
                />
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
