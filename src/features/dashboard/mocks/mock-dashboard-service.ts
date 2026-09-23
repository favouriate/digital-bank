import { getMockRecentRecipients } from "@/features/transfers/mocks/mock-recipient-lookup";
import { hydrateDemoLedger } from "@/mocks/demo-ledger";
import { mockTransactions } from "@/mocks/transactions";
import { mockUser } from "@/mocks/user";

import type { DashboardData } from "../types/dashboard";
import { mockAccountSummary, mockBalanceTrend } from "./mock-account";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const RECENT_TRANSACTION_COUNT = 3;

export async function mockGetDashboard(): Promise<DashboardData> {
  hydrateDemoLedger();
  await wait(450);

  return {
    greetingName: mockUser.firstName,
    account: {
      ...mockAccountSummary,
      card: { ...mockAccountSummary.card },
    },
    balanceTrend: [...mockBalanceTrend.slice(0, -1), mockAccountSummary.availableBalance],
    recentRecipients: getMockRecentRecipients().slice(0, 3),
    recentTransactions: mockTransactions.slice(0, RECENT_TRANSACTION_COUNT),
  };
}
