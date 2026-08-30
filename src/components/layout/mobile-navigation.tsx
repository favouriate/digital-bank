"use client";

import { NavLink } from "@/components/layout/nav-link";
import { getNavigationByPlacement } from "@/lib/navigation";

export function MobileNavigation() {
  const items = getNavigationByPlacement("mobile-tab");

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
    >
      <ul className="flex h-16 items-stretch">
        {items.map((item) => (
          <li key={item.id} className="flex flex-1">
            <NavLink item={item} variant="mobile-tab" />
          </li>
        ))}
      </ul>
    </nav>
  );
}
