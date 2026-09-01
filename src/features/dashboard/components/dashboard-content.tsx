import { QuickTransfer } from "./quick-transfer";
import { RecentTransactions } from "./recent-transactions";
import { SendMoneyRecipientCard } from "./send-money-recipient-card";
import { TotalBalanceCard } from "./total-balance-card";
import type { DashboardData } from "../types/dashboard";

type DashboardContentProps = {
  data: DashboardData;
  balanceVisible: boolean;
  onToggleVisibility: () => void;
};

export function DashboardContent({
  data,
  balanceVisible,
  onToggleVisibility,
}: DashboardContentProps) {
  return (
    <div className="flex flex-col gap-6 overflow-x-hidden lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
      <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
        <TotalBalanceCard
          availableBalance={data.account.availableBalance}
          currency={data.account.currency}
          monthlyChangePercent={data.account.monthlyChangePercent}
          balanceVisible={balanceVisible}
          onToggleVisibility={onToggleVisibility}
        />
      </div>
      <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2">
        <SendMoneyRecipientCard />
      </div>
      <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
        <QuickTransfer recipients={data.recentRecipients} />
      </div>
      <div className="lg:col-span-5 lg:col-start-8 lg:row-start-2">
        <RecentTransactions transactions={data.recentTransactions} />
      </div>
    </div>
  );
}
