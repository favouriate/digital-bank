"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isNavItemActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

type NavLinkVariant = "sidebar" | "mobile-tab" | "mobile-menu";

type NavLinkProps = {
  item: NavigationItem;
  variant: NavLinkVariant;
  badgeCount?: number;
  onNavigate?: () => void;
};

export function NavLink({
  item,
  variant,
  badgeCount,
  onNavigate,
}: NavLinkProps) {
  const pathname = usePathname();
  const active = isNavItemActive(pathname, item.href);
  const Icon = item.icon;
  const showBadge = typeof badgeCount === "number" && badgeCount > 0;

  if (variant === "mobile-tab") {
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex min-h-11 min-w-11 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-2 text-xs font-medium transition-colors duration-[var(--duration-fast)] ease-standard",
          active
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "relative flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)] ease-standard",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-muted hover:text-foreground",
        variant === "sidebar" &&
          active &&
          "before:absolute before:inset-y-1.5 before:-left-3 before:w-1 before:rounded-full before:bg-primary",
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      <span className="flex-1 truncate">{item.label}</span>
      {showBadge ? (
        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.65rem] font-semibold text-primary-foreground">
          {badgeCount}
        </span>
      ) : null}
    </Link>
  );
}
