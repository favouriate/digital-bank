"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ThemePreference } from "@/lib/theme";

import type { Profile } from "../types/profile";
import type { SettingsSectionId } from "../types/section";

import { AccountInformationList } from "./account-section";
import { PersonalDetailsList } from "./personal-details-section";
import { ProfileAvatar } from "./profile-hub";
import { SettingsCategoryGrid } from "./settings-category-grid";
import { SettingsStatusBadge } from "./settings-status-badge";
import { SecuritySettingsList } from "./security-section";

type MobileProfileOverviewProps = {
  profile: Profile;
  theme: ThemePreference;
  isUpdatingFlags: boolean;
  onThemeChange: (theme: ThemePreference) => void;
  onSelectSection: (section: SettingsSectionId) => void;
  onEdit: () => void;
  onChangePassword: () => void;
  onChangePin: () => void;
  onToggleTwoFactor: (enabled: boolean) => void;
  onToggleBiometric: (enabled: boolean) => void;
};

export function MobileProfileOverview({
  profile,
  theme,
  isUpdatingFlags,
  onThemeChange,
  onSelectSection,
  onEdit,
  onChangePassword,
  onChangePin,
  onToggleTwoFactor,
  onToggleBiometric,
}: MobileProfileOverviewProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Profile</CardTitle>
          <CardDescription>Your personal information.</CardDescription>
          <CardAction>
            <Button
              type="button"
              variant="outline"
              className="h-11 min-h-11 gap-2"
              onClick={onEdit}
            >
              <Pencil className="size-4" aria-hidden="true" />
              Edit
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <ProfileAvatar profile={profile} />
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-foreground">
                {profile.name}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {profile.email}
              </p>
              {profile.verified ? (
                <SettingsStatusBadge label="Verified" className="mt-2" />
              ) : null}
            </div>
          </div>
          <PersonalDetailsList profile={profile} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Account overview
          </CardTitle>
          <CardDescription>Quick view of your account status.</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountInformationList profile={profile} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Security settings
          </CardTitle>
          <CardDescription>Keep your account safe and secure.</CardDescription>
        </CardHeader>
        <CardContent>
          <SecuritySettingsList
            profile={profile}
            isUpdatingFlags={isUpdatingFlags}
            onChangePassword={onChangePassword}
            onChangePin={onChangePin}
            onToggleTwoFactor={onToggleTwoFactor}
            onToggleBiometric={onToggleBiometric}
          />
        </CardContent>
      </Card>

      <SettingsCategoryGrid
        compact
        onSelect={onSelectSection}
        theme={theme}
        onThemeChange={onThemeChange}
      />
    </div>
  );
}
