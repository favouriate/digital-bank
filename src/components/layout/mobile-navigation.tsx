"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Ellipsis } from "lucide-react";

import { MobileMoreSheet } from "@/components/layout/mobile-more-sheet";
import { NavLink } from "@/components/layout/nav-link";
import { getNavigationByPlacement, isMoreRoute } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const items = getNavigationByPlacement("mobile-tab");
  const moreActive = isMoreRoute(pathname);

  return (
    <>
      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
      >
        <ul className="flex h-16 items-stretch">
          {items.map((item) => (
            <li key={item.id} className="flex min-w-0 flex-1">
              <NavLink item={item} variant="mobile-tab" />
            </li>
          ))}
          <li className="flex min-w-0 flex-1">
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-current={moreActive ? "page" : undefined}
              onClick={() => setMoreOpen(true)}
              className={cn(
                "flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-center text-[0.65rem] leading-tight font-medium transition-colors duration-[var(--duration-fast)] ease-standard sm:px-2 sm:text-xs",
                moreActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Ellipsis className="size-5" aria-hidden="true" />
              <span>More</span>
            </button>
          </li>
        </ul>
      </nav>
      <MobileMoreSheet open={moreOpen} onOpenChange={setMoreOpen} />
    </>
  );
}
