"use client";

import { Bell } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  useNotificationPrefsStore,
  type NotificationPrefs,
} from "../store/notification-prefs-store";

import { SettingRow } from "./setting-row";

const ITEMS: {
  key: keyof NotificationPrefs;
  label: string;
  description: string;
}[] = [
  {
    key: "transactionAlerts",
    label: "Transaction alerts",
    description: "Credits, debits, and transfer updates",
  },
  {
    key: "securityAlerts",
    label: "Security alerts",
    description: "Login and PIN activity",
  },
  {
    key: "billAlerts",
    label: "Bill and payment alerts",
    description: "Upcoming and completed bill payments",
  },
  {
    key: "promotionalAlerts",
    label: "Promotional notifications",
    description: "Product news and offers",
  },
];

export function NotificationSettingsSection() {
  const prefs = useNotificationPrefsStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Bell className="size-5 text-primary" aria-hidden="true" />
          Notification settings
        </CardTitle>
        <CardDescription>
          Manage how and when you receive alerts. These stay on this device
          only.
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        {ITEMS.map((item) => (
          <SettingRow
            key={item.key}
            label={item.label}
            value={item.description}
            action={
              <Switch
                checked={prefs[item.key]}
                aria-label={item.label}
                onCheckedChange={(checked) => prefs.setPref(item.key, checked)}
              />
            }
          />
        ))}
      </CardContent>
    </Card>
  );
}
