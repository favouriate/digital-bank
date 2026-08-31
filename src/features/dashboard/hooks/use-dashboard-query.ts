"use client";

import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../services/dashboard-service";

export const dashboardQueryKey = ["dashboard"] as const;

export function useDashboardQuery() {
  return useQuery({
    queryKey: dashboardQueryKey,
    queryFn: getDashboard,
  });
}
