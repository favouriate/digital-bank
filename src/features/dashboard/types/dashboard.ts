import type { CurrencyCode } from "@/types/currency";
import type { Transaction } from "@/types/transaction";
import type { ResolvedRecipient } from "@/features/transfers/types/destination";

export type AccountCard = {
  holderName: string;
  maskedNumber: string;
  expiryLabel: string;
  brand: "visa";
};

export type AccountSummary = {
  card: AccountCard;
  availableBalance: number;
  currency: CurrencyCode;
  monthlyChangePercent: number;
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
  greetingName: string;
  account: AccountSummary;
  balanceTrend: number[];
  recentRecipients: ResolvedRecipient[];
  recentTransactions: Transaction[];
};
