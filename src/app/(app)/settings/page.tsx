import { Suspense } from "react";
import type { Metadata } from "next";

import { SettingsSkeleton } from "@/features/settings/components/settings-skeleton";
import { SettingsView } from "@/features/settings/components/settings-view";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsSkeleton />}>
      <SettingsView />
    </Suspense>
  );
}
