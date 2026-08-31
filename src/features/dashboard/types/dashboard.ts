import type { Contact } from "@/types/contact";
import type { Transaction } from "@/types/transaction";

export type AccountCard = {
  holderName: string;
  maskedNumber: string;
  expiryLabel: string;
  brand: "visa";
};

export type AccountSummary = {
  card: AccountCard;
  availableBalance: number;
  currency: "USD";
  sourceLabel: string;
};

export type MoneyFlowPoint = {
  label: string;
  income: number;
  savings: number;
};

export type MoneyFlowSeries = {
  periodLabel: string;
  changePercent: number;
  seriesLabel: string;
  points: MoneyFlowPoint[];
};

export type DashboardData = {
  account: AccountSummary;
  moneyFlow: MoneyFlowSeries;
  recentContacts: Contact[];
  recentTransactions: Transaction[];
  recipientCount: number;
};
