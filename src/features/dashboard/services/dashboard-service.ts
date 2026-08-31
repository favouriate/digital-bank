import { mockGetDashboard } from "../mocks/mock-dashboard-service";
import type { DashboardData } from "../types/dashboard";

export async function getDashboard(): Promise<DashboardData> {
  return mockGetDashboard();
}
