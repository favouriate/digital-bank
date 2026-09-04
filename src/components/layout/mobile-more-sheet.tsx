"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { getNavigationByPlacement } from "@/lib/navigation";

type MobileMoreSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileMoreSheet({ open, onOpenChange }: MobileMoreSheetProps) {
  const pathname = usePathname();
  const logout = useLogout();
  const items = getNavigationByPlacement("mobile-more");

  useEffect(() => {
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      >
        <SheetHeader className="px-4 pt-2 pb-1">
          <SheetTitle>More</SheetTitle>
        </SheetHeader>
        <nav aria-label="More" className="flex flex-col px-3 pb-2">
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <NavLink item={item} variant="mobile-more" />
              </li>
            ))}
          </ul>
          <Separator className="my-3" />
          <Button
            type="button"
            variant="ghost"
            onClick={logout}
            className="h-11 min-h-11 w-full justify-start gap-3 px-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-5" aria-hidden="true" />
            Log out
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
