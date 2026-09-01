import { ChevronRight, MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Transaction } from "@/types/transaction";

import {
  fictionalIpFromId,
  TRANSACTION_LOCATION,
} from "../lib/transaction-details";

type TransactionDetailsLocationProps = {
  transaction: Transaction;
};

export function TransactionDetailsLocation({
  transaction,
}: TransactionDetailsLocationProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MapPin className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground">
              {TRANSACTION_LOCATION}
            </p>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              IP Address: {fictionalIpFromId(transaction.id)}
            </p>
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
