import { SETTINGS_SECTIONS } from "../lib/sections";
import type { SettingsSectionId } from "../types/section";
import { cn } from "@/lib/utils";

type SettingsNavProps = {
  section: SettingsSectionId;
  onSectionChange: (section: SettingsSectionId) => void;
};

export function SettingsDesktopNav({
  section,
  onSectionChange,
}: SettingsNavProps) {
  return (
    <nav aria-label="Settings" className="hidden flex-col gap-1 lg:flex">
      {SETTINGS_SECTIONS.map((item) => {
        const Icon = item.icon;
        const active = item.id === section;

        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

export function SettingsMobileTabs({
  section,
  onSectionChange,
}: SettingsNavProps) {
  return (
    <nav
      aria-label="Settings"
      className="lg:hidden -mx-1 overflow-x-auto overflow-y-hidden"
    >
      <div className="flex min-w-max gap-1 pb-1">
        {SETTINGS_SECTIONS.map((item) => {
          const Icon = item.icon;
          const active = item.id === section;

          return (
            <button
              key={item.id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {item.mobileLabel}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
