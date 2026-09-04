import { Suspense } from "react";
import type { Metadata } from "next";

import { SupportSkeleton } from "@/features/support/components/support-skeleton";
import { SupportView } from "@/features/support/components/support-view";

export const metadata: Metadata = {
  title: "Support",
};

export default function SupportPage() {
  return (
    <Suspense fallback={<SupportSkeleton />}>
      <SupportView />
    </Suspense>
  );
}
