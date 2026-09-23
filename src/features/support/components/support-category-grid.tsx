"use client";

import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { SUPPORT_CATEGORIES } from "../lib/categories";
import type { SupportCategoryId } from "../types/support";

type SupportCategoryGridProps = {
  selected: SupportCategoryId | null;
  onSelect: (id: SupportCategoryId) => void;
};

export function SupportCategoryGrid({
  selected,
  onSelect,
}: SupportCategoryGridProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-foreground">Help Categories</h2>
      <div className="grid gap-3 lg:grid-cols-4">
        {SUPPORT_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const active = selected === category.id;

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(category.id)}
              className={cn(
                "flex min-h-14 items-center gap-3 rounded-xl border border-border bg-card p-4 text-left outline-none ring-1 ring-foreground/10 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/50 lg:min-h-40 lg:flex-col lg:items-start lg:justify-between",
                active ? "border-primary/40 bg-primary/5 ring-primary/20" : undefined,
              )}
            >
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full",
                  category.iconClassName,
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 lg:flex-none">
                <span className="block font-semibold text-foreground">
                  {category.label}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {category.description}
                </span>
              </span>
              <ChevronRight
                className="size-4 shrink-0 text-muted-foreground lg:mt-auto"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
