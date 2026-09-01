import { ChevronRight, Monitor, Moon, Sun } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ThemePreference } from "@/lib/theme";

import { HUB_CARD_IDS, SETTINGS_SECTIONS } from "../lib/sections";
import type { SettingsSectionId } from "../types/section";

import { SegmentedControl } from "./segmented-control";

type SettingsCategoryGridProps = {
  onSelect: (id: SettingsSectionId) => void;
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
  compact?: boolean;
};

export function SettingsCategoryGrid({
  onSelect,
  theme,
  onThemeChange,
  compact = false,
}: SettingsCategoryGridProps) {
  const ids = compact
    ? HUB_CARD_IDS.filter((id) => id !== "security" && id !== "pin")
    : HUB_CARD_IDS;

  return (
    <div
      className={cn(
        "grid gap-3",
        compact ? "grid-cols-2" : "sm:grid-cols-2",
      )}
    >
      {ids.map((id) => {
        const section = SETTINGS_SECTIONS.find((item) => item.id === id);

        if (!section) {
          return null;
        }

        const Icon = section.icon;

        if (id === "theme") {
          return (
            <Card key={id} className="gap-3 p-4">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">{section.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
              <SegmentedControl
                ariaLabel="Color theme"
                value={theme}
                onChange={onThemeChange}
                options={[
                  { value: "light", label: "Light", icon: Sun },
                  { value: "dark", label: "Dark", icon: Moon },
                  { value: "system", label: "System", icon: Monitor },
                ]}
              />
            </Card>
          );
        }

        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left outline-none ring-1 ring-foreground/10 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-foreground">
                {section.label}
              </span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                {section.description}
              </span>
            </span>
            <ChevronRight
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
