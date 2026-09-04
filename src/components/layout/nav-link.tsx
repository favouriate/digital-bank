"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { isNavItemActive } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

type NavLinkVariant = "mobile-tab" | "mobile-more";

type NavLinkProps = {
  item: NavigationItem;
  variant: NavLinkVariant;
  onNavigate?: () => void;
};

export function NavLink({ item, variant, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = isNavItemActive(pathname, item.href);
  const Icon = item.icon;

  if (variant === "mobile-tab") {
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-center text-[0.65rem] leading-tight font-medium transition-colors duration-[var(--duration-fast)] ease-standard sm:px-2 sm:text-xs",
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
        "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)] ease-standard",
        active
          ? "bg-accent text-accent-foreground"
          : "text-foreground hover:bg-muted",
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      <span className="flex-1 truncate">{item.label}</span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </Link>
  );
}
