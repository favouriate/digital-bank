import { ChevronRight } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recipientInitials } from "@/features/transfers/lib/format";
import type { Transaction } from "@/types/transaction";

import { formatAccountHint } from "../lib/format-amount";
import { partyCardTitle, partyKind } from "../lib/transaction-details";

type TransactionDetailsPartyProps = {
  transaction: Transaction;
};

export function TransactionDetailsParty({
  transaction,
}: TransactionDetailsPartyProps) {
  const kind = partyKind(transaction);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          {partyCardTitle(kind)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Avatar size="lg" className="shrink-0">
            <AvatarFallback className="bg-primary text-sm font-medium text-primary-foreground">
              {recipientInitials(transaction.counterparty)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-foreground">
              {transaction.counterparty}
            </p>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {formatAccountHint(transaction.bankName, transaction.accountMask)}
            </p>
            {transaction.counterpartyEmail ? (
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {transaction.counterpartyEmail}
              </p>
            ) : null}
            {transaction.counterpartyPhone ? (
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {transaction.counterpartyPhone}
              </p>
            ) : null}
          </div>
          <ChevronRight
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      </CardContent>
    </Card>
  );
}
