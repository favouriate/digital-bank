"use client";

import { useState } from "react";

import { DashboardDesktop } from "./dashboard-desktop";
import { DashboardError } from "./dashboard-error";
import { DashboardMobile } from "./dashboard-mobile";
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
    <>
      <DashboardDesktop
        data={dashboardQuery.data}
        balanceVisible={balanceVisible}
        onToggleVisibility={() => setBalanceVisible((current) => !current)}
      />
      <DashboardMobile
        data={dashboardQuery.data}
        balanceVisible={balanceVisible}
        onToggleVisibility={() => setBalanceVisible((current) => !current)}
      />
    </>
  );
}
