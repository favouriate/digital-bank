"use client";

import { Camera, Pencil } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

import { SettingsCategoryGrid } from "./settings-category-grid";
import { SettingsStatusBadge } from "./settings-status-badge";

type ProfileHubProps = {
  profile: Profile;
  theme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
  onSelectSection: (section: SettingsSectionId) => void;
  onEdit: () => void;
};

export function ProfileHub({
  profile,
  theme,
  onThemeChange,
  onSelectSection,
  onEdit,
}: ProfileHubProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Profile</CardTitle>
          <CardDescription>
            Manage your profile information and how others see you.
          </CardDescription>
          <CardAction>
            <Button
              type="button"
              variant="outline"
              className="h-11 min-h-11 gap-2"
              onClick={onEdit}
            >
              <Pencil className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <ProfileAvatar profile={profile} />
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-foreground">
              {profile.name}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {profile.email}
            </p>
            {profile.verified ? (
              <SettingsStatusBadge
                label="Verified"
                className="mt-2 gap-1"
              />
            ) : null}
          </div>
        </CardContent>
      </Card>

      <SettingsCategoryGrid
        onSelect={onSelectSection}
        theme={theme}
        onThemeChange={onThemeChange}
      />
    </div>
  );
}

export function ProfileAvatar({ profile }: { profile: Profile }) {
  return (
    <div className="relative shrink-0">
      <Avatar className="size-16 after:hidden">
        {profile.avatarUrl ? (
          <AvatarImage src={profile.avatarUrl} alt="" />
        ) : null}
        <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
          {profile.initials}
        </AvatarFallback>
      </Avatar>
      <Button
        type="button"
        size="icon"
        className="absolute -right-1 -bottom-1 size-7 rounded-full"
        aria-label="Change photo (demo)"
      >
        <Camera className="size-3.5" aria-hidden="true" />
      </Button>
    </div>
  );
}

