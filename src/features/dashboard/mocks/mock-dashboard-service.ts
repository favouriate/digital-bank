import { mockUser } from "@/mocks/user";
import { mockTransactions } from "@/mocks/transactions";
import { getMockRecentRecipients } from "@/features/transfers/mocks/mock-recipient-lookup";

import type { DashboardData } from "../types/dashboard";
import { mockAccountSummary, mockBalanceTrend } from "./mock-account";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const RECENT_TRANSACTION_COUNT = 3;

export async function mockGetDashboard(): Promise<DashboardData> {
  await wait(450);

  return {
    greetingName: mockUser.firstName,
    account: mockAccountSummary,
    balanceTrend: mockBalanceTrend,
    recentRecipients: getMockRecentRecipients().slice(0, 3),
    recentTransactions: mockTransactions.slice(0, RECENT_TRANSACTION_COUNT),
  };
}
