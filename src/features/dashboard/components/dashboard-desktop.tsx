import { AccountCard } from "./account-card";
import { MoneyFlowChart } from "./money-flow-chart";
import { QuickTransfer } from "./quick-transfer";
import { RecentContacts } from "./recent-contacts";
import { RecentTransactions } from "./recent-transactions";
import { SendMoneyCard } from "./send-money-card";
import type { DashboardData } from "../types/dashboard";

type DashboardDesktopProps = {
  data: DashboardData;
  balanceVisible: boolean;
  onToggleVisibility: () => void;
};

export function DashboardDesktop({
  data,
  balanceVisible,
  onToggleVisibility,
}: DashboardDesktopProps) {
  return (
    <div className="hidden gap-6 lg:grid lg:grid-cols-12">
      <div className="flex flex-col gap-6 lg:col-span-4">
        <AccountCard card={data.account.card} />
        <SendMoneyCard
          account={data.account}
          contacts={data.recentContacts}
          balanceVisible={balanceVisible}
          onToggleVisibility={onToggleVisibility}
        />
        <QuickTransfer
          account={data.account}
          contacts={data.recentContacts}
          balanceVisible={balanceVisible}
          variant="desktop"
        />
      </div>

      <div className="flex flex-col gap-6 lg:col-span-8 xl:col-span-5">
        <MoneyFlowChart series={data.moneyFlow} />
        <RecentTransactions
          transactions={data.recentTransactions}
          variant="desktop"
        />
        <div className="xl:hidden">
          <RecentContacts
            contacts={data.recentContacts}
            recipientCount={data.recipientCount}
          />
        </div>
      </div>

      <div className="hidden xl:col-span-3 xl:block">
        <RecentContacts
          contacts={data.recentContacts}
          recipientCount={data.recipientCount}
        />
      </div>
    </div>
  );
}
