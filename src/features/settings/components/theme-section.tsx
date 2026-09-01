"use client";

import { Monitor, Moon, Palette, Sun } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ThemePreference } from "@/lib/theme";

import { SegmentedControl } from "./segmented-control";

type ThemeSettingsSectionProps = {
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
};

export function ThemeSettingsSection({
  theme,
  onThemeChange,
}: ThemeSettingsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Palette className="size-5 text-primary" aria-hidden="true" />
          Theme settings
        </CardTitle>
        <CardDescription>Choose your preferred theme.</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
