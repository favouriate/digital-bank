"use client";

import { ChevronRight, Fingerprint, KeyRound, LockKeyhole, Shield } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { maskSecret } from "../lib/display";
import type { Profile } from "../types/profile";

import { SettingRow } from "./setting-row";
import { SettingsStatusBadge } from "./settings-status-badge";

type SecuritySettingsSectionProps = {
  profile: Profile;
  isUpdatingFlags: boolean;
  onChangePassword: () => void;
  onChangePin: () => void;
  onToggleTwoFactor: (enabled: boolean) => void;
  onToggleBiometric: (enabled: boolean) => void;
};

export function SecuritySettingsSection({
  profile,
  isUpdatingFlags,
  onChangePassword,
  onChangePin,
  onToggleTwoFactor,
  onToggleBiometric,
}: SecuritySettingsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Shield className="size-5 text-primary" aria-hidden="true" />
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
  );
}

export function SecuritySettingsList({
  profile,
  isUpdatingFlags,
  onChangePassword,
  onChangePin,
  onToggleTwoFactor,
  onToggleBiometric,
}: SecuritySettingsSectionProps) {
  return (
    <div className="divide-y divide-border">
      <SettingRow
        icon={LockKeyhole}
        label="Login password"
        value={maskSecret(8)}
        action={<ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />}
        onClick={onChangePassword}
      />
      <SettingRow
        icon={KeyRound}
        label="Transaction PIN"
        value={maskSecret(4)}
        action={<ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />}
        onClick={onChangePin}
      />
      <SettingRow
        icon={Fingerprint}
        label="Biometric login"
        value={
          profile.biometricEnabled ? (
            <SettingsStatusBadge label="Enabled" />
          ) : (
            "Off"
          )
        }
        action={
          <Switch
            checked={profile.biometricEnabled}
            disabled={isUpdatingFlags}
            aria-label="Biometric login"
            onCheckedChange={onToggleBiometric}
          />
        }
      />
      <SettingRow
        icon={Shield}
        label="Two-factor authentication"
        value={
          profile.twoFactorEnabled ? (
            <SettingsStatusBadge label="Enabled" />
          ) : (
            "Off"
          )
        }
        action={
          <Switch
            checked={profile.twoFactorEnabled}
            disabled={isUpdatingFlags}
            aria-label="Two-factor authentication"
            onCheckedChange={onToggleTwoFactor}
          />
        }
      />
    </div>
  );
}
