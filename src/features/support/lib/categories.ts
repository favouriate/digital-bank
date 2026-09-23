import {
  Bell,
  CircleDollarSign,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import type { SupportCategoryId } from "../types/support";

export type SupportCategoryMeta = {
  id: SupportCategoryId;
  label: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
};

export const SUPPORT_CATEGORIES: SupportCategoryMeta[] = [
  {
    id: "account",
    label: "Account & Profile",
    description: "Manage your account, profile and settings",
    icon: UserRound,
    iconClassName: "bg-primary/10 text-primary",
  },
  {
    id: "payments",
    label: "Payments & Transfers",
    description: "Send money and transactions",
    icon: CircleDollarSign,
    iconClassName: "bg-success/10 text-success",
  },
  {
    id: "security",
    label: "Security & Privacy",
    description: "Security settings, PIN, 2FA and privacy",
    icon: ShieldCheck,
    iconClassName: "bg-savings/10 text-savings",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Manage alerts and notification preferences",
    icon: Bell,
    iconClassName: "bg-warning/10 text-warning",
  },
];

export const SUPPORT_EMAIL = "support@example.com";
export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("OpenPay support")}`;
