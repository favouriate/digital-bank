import type { LucideIcon } from "lucide-react";
import {
  Bell,
  KeyRound,
  Landmark,
  Palette,
  Shield,
  User,
} from "lucide-react";

import type { SettingsSectionId } from "../types/section";

export type SettingsSectionMeta = {
  id: SettingsSectionId;
  label: string;
  mobileLabel: string;
  description: string;
  icon: LucideIcon;
};

export const SETTINGS_SECTIONS: SettingsSectionMeta[] = [
  {
    id: "profile",
    label: "Profile",
    mobileLabel: "Profile",
    description: "Manage your profile information and how others see you.",
    icon: User,
  },
  {
    id: "personal",
    label: "Personal details",
    mobileLabel: "Personal",
    description: "Update your personal information",
    icon: User,
  },
  {
    id: "account",
    label: "Account information",
    mobileLabel: "Account",
    description: "View and manage your account details",
    icon: Landmark,
  },
  {
    id: "security",
    label: "Security settings",
    mobileLabel: "Security",
    description: "Manage password, 2FA and login activity",
    icon: Shield,
  },
  {
    id: "pin",
    label: "Transaction PIN",
    mobileLabel: "PIN",
    description: "Manage your transaction PIN settings",
    icon: KeyRound,
  },
  {
    id: "theme",
    label: "Theme settings",
    mobileLabel: "Theme",
    description: "Choose your preferred theme.",
    icon: Palette,
  },
  {
    id: "notifications",
    label: "Notification settings",
    mobileLabel: "Notifs",
    description: "Manage how and when you receive alerts",
    icon: Bell,
  },
];

export const HUB_CARD_IDS: SettingsSectionId[] = [
  "personal",
  "account",
  "security",
  "pin",
  "theme",
  "notifications",
];
