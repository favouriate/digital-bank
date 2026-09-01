import { Landmark } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { displayValue } from "../lib/display";
import type { Profile } from "../types/profile";

import { SettingRow } from "./setting-row";
import { SettingsStatusBadge } from "./settings-status-badge";

export function AccountInformationSection({ profile }: { profile: Profile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Landmark className="size-5 text-primary" aria-hidden="true" />
          Account overview
        </CardTitle>
        <CardDescription>Quick view of your account status.</CardDescription>
      </CardHeader>
      <CardContent>
        <AccountInformationList profile={profile} />
      </CardContent>
    </Card>
  );
}

export function AccountInformationList({ profile }: { profile: Profile }) {
  const statusLabel =
    profile.account.status === "active" ? "Active" : profile.account.status;

  return (
    <div className="divide-y divide-border">
      <SettingRow
        label="Account status"
        value={<SettingsStatusBadge label={statusLabel} />}
      />
      <SettingRow
        label="Account type"
        value={displayValue(profile.account.type)}
      />
      <SettingRow
        label="Account number"
        value={displayValue(profile.account.accountNumber)}
      />
      <SettingRow
        label="Currency"
        value={displayValue(profile.account.currency)}
      />
    </div>
  );
}
