import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NOTIFICATION_PREFS_KEY = "openpay.notification-prefs";

export type NotificationPrefs = {
  transactionAlerts: boolean;
  securityAlerts: boolean;
  billAlerts: boolean;
  promotionalAlerts: boolean;
};

const defaultPrefs: NotificationPrefs = {
  transactionAlerts: true,
  securityAlerts: true,
  billAlerts: true,
  promotionalAlerts: false,
};

type NotificationPrefsStore = NotificationPrefs & {
  setPref: (key: keyof NotificationPrefs, value: boolean) => void;
};

export const useNotificationPrefsStore = create<NotificationPrefsStore>()(
  persist(
    (set) => ({
      ...defaultPrefs,
      setPref: (key, value) => set({ [key]: value }),
    }),
    { name: NOTIFICATION_PREFS_KEY },
  ),
);
