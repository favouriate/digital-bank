"use client";

import { useState } from "react";

import { DashboardContent } from "./dashboard-content";
import { DashboardError } from "./dashboard-error";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { useDashboardQuery } from "../hooks/use-dashboard-query";

export function DashboardView() {
  const dashboardQuery = useDashboardQuery();
  const [balanceVisible, setBalanceVisible] = useState(true);

  if (dashboardQuery.isPending) {
    return <DashboardSkeleton />;
  }

  if (dashboardQuery.isError || !dashboardQuery.data) {
    return <DashboardError onRetry={() => dashboardQuery.refetch()} />;
  }

  return (
    <DashboardContent
      data={dashboardQuery.data}
      balanceVisible={balanceVisible}
      onToggleVisibility={() => setBalanceVisible((current) => !current)}
    />
  );
}
