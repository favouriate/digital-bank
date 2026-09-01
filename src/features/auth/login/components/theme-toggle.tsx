"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  parseThemePreference,
  type ThemePreference,
} from "@/lib/theme";

type ThemeToggleProps = {
  className?: string;
  compact?: boolean;
};

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export function useThemePreference() {
  const [theme, setTheme] = useState<ThemePreference>("system");

  useEffect(() => {
    const nextTheme = parseThemePreference(
      window.localStorage.getItem(THEME_STORAGE_KEY),
    );
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  useEffect(() => {
    if (theme !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  function handleThemeChange(nextTheme: ThemePreference) {
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  return { theme, handleThemeChange };
}

type ThemeMenuItemsProps = {
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
};

export function ThemeMenuItems({ theme, onThemeChange }: ThemeMenuItemsProps) {
  return (
    <DropdownMenuRadioGroup
      value={theme}
      onValueChange={(value) => {
        if (value === "light" || value === "dark" || value === "system") {
          onThemeChange(value);
        }
      }}
    >
      {OPTIONS.map((option) => (
        <DropdownMenuRadioItem key={option.value} value={option.value}>
          {option.value === "light" ? (
            <Sun className="size-4" aria-hidden="true" />
          ) : null}
          {option.value === "dark" ? (
            <Moon className="size-4" aria-hidden="true" />
          ) : null}
          {option.value === "system" ? (
            <Monitor className="size-4" aria-hidden="true" />
          ) : null}
          {option.label}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
}

export function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
  const { theme, handleThemeChange } = useThemePreference();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant={compact ? "ghost" : "outline"}
            size={compact ? "icon" : "default"}
            aria-label="Color theme"
            className={cn(
              compact
                ? "size-9"
                : "h-11 min-h-11 gap-2 rounded-lg px-2.5",
              className,
            )}
          />
        }
      >
        <Sun className="size-4 dark:hidden" aria-hidden="true" />
        <Moon className="hidden size-4 dark:block" aria-hidden="true" />
        {compact ? null : (
          <span className="text-sm font-medium">
            {OPTIONS.find((option) => option.value === theme)?.label ?? "System"}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <ThemeMenuItems theme={theme} onThemeChange={handleThemeChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
