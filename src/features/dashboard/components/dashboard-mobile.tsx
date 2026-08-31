import { AccountCard } from "./account-card";
import { BalanceBlock } from "./balance-block";
import { BankingActions } from "./banking-actions";
import { MoneyFlowChart } from "./money-flow-chart";
import { QuickTransfer } from "./quick-transfer";
import { RecentTransactions } from "./recent-transactions";
import type { DashboardData } from "../types/dashboard";

type DashboardMobileProps = {
  data: DashboardData;
  balanceVisible: boolean;
  onToggleVisibility: () => void;
};

export function DashboardMobile({
  data,
  balanceVisible,
  onToggleVisibility,
}: DashboardMobileProps) {
  return (
    <div className="flex flex-col gap-6 lg:hidden">
      <AccountCard card={data.account.card} />
      <BalanceBlock
        availableBalance={data.account.availableBalance}
        balanceVisible={balanceVisible}
        onToggleVisibility={onToggleVisibility}
      />
      <BankingActions />
      <QuickTransfer
        account={data.account}
        contacts={data.recentContacts}
        balanceVisible={balanceVisible}
        variant="mobile"
      />
      <MoneyFlowChart series={data.moneyFlow} compact />
      <RecentTransactions
        transactions={data.recentTransactions}
        variant="mobile"
      />
    </div>
  );
}
