"use client";

import {
  Calendar,
  Globe,
  Mail,
  MapPin,
  Pencil,
  Phone,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { displayValue, formatDateOfBirth } from "../lib/display";
import type { Profile } from "../types/profile";

import { SettingRow } from "./setting-row";

type PersonalDetailsSectionProps = {
  profile: Profile;
  onEdit: () => void;
};

export function PersonalDetailsSection({
  profile,
  onEdit,
}: PersonalDetailsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Personal details</CardTitle>
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
      <CardContent>
        <PersonalDetailsList profile={profile} />
      </CardContent>
    </Card>
  );
}

export function PersonalDetailsList({ profile }: { profile: Profile }) {
  return (
    <div className="divide-y divide-border">
      <SettingRow icon={User} label="Full name" value={displayValue(profile.name)} />
      <SettingRow icon={Mail} label="Email address" value={displayValue(profile.email)} />
      <SettingRow icon={Phone} label="Phone number" value={displayValue(profile.phone)} />
      <SettingRow
        icon={Calendar}
        label="Date of birth"
        value={formatDateOfBirth(profile.dateOfBirth)}
      />
      <SettingRow
        icon={Globe}
        label="Nationality"
        value={displayValue(profile.nationality)}
      />
      <SettingRow
        icon={MapPin}
        label="Address"
        value={displayValue(profile.address)}
      />
    </div>
  );
}

