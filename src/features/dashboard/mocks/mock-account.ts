import type { AccountSummary, MoneyFlowSeries } from "../types/dashboard";

export const mockAccountSummary: AccountSummary = {
  card: {
    holderName: "Carla Rosser",
    maskedNumber: "1200  ••••  54215",
    expiryLabel: "08/23",
    brand: "visa",
  },
  availableBalance: 10680,
  currency: "USD",
  monthlyChangePercent: 4.8,
  sourceLabel: "Debit",
};

export const mockBalanceTrend = [
  9200, 9450, 9100, 9800, 10120, 9980, 10340, 10680,
];

export const mockMoneyFlow: MoneyFlowSeries = {
  periodLabel: "Week",
  changePercent: 6.79,
  seriesLabel: "Savings",
  points: [
    { label: "Dec 2", income: 400, savings: 900 },
    { label: "Dec 3", income: 1100, savings: 1500 },
    { label: "Dec 4", income: 800, savings: 1200 },
    { label: "Dec 5", income: 2600, savings: 2100 },
    { label: "Dec 6", income: 1700, savings: 1800 },
    { label: "Dec 7", income: 1900, savings: 2300 },
    { label: "Dec 8", income: 1400, savings: 2000 },
  ],
};
