import { mockContacts } from "@/mocks/contacts";
import { mockTransactions } from "@/mocks/transactions";

import type { DashboardData } from "../types/dashboard";
import { mockAccountSummary, mockMoneyFlow } from "./mock-account";

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const RECENT_TRANSACTION_COUNT = 3;

export async function mockGetDashboard(): Promise<DashboardData> {
  await wait(450);

  const people = mockContacts.filter((contact) => contact.provider === "OpenPay");

  return {
    account: mockAccountSummary,
    moneyFlow: mockMoneyFlow,
    recentContacts: people,
    recentTransactions: mockTransactions.slice(0, RECENT_TRANSACTION_COUNT),
    recipientCount: people.length,
  };
}
