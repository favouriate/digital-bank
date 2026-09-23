import { ArrowRight, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMockRate } from "@/features/dashboard/mocks/mock-exchange-rates";
import type { CurrencyCode } from "@/types/currency";

import { formatTransferAmount } from "../lib/format";
import type { Recipient } from "../types/transfer";

type TransferSummaryProps = {
  recipient: Recipient | null;
  amount: number | null;
  currency?: CurrencyCode;
  onContinue?: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
};

export function TransferSummary({
  recipient,
  amount,
  currency = "USD",
  onContinue,
  continueDisabled = false,
  continueLabel = "Continue",
}: TransferSummaryProps) {
  const total = amount ?? 0;
  const rate = getMockRate("USD", currency);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">You Send</p>
            <p className="text-lg font-semibold">
              {formatTransferAmount(total, currency)}
            </p>
          </div>
          {onContinue ? (
            <Button
              type="button"
              size="icon-lg"
              className="size-11 rounded-xl"
              disabled={continueDisabled}
              aria-label={continueLabel}
              onClick={onContinue}
            >
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          )}
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Recipient Gets</p>
            <p className="text-lg font-semibold">
              {formatTransferAmount(total, currency)}
            </p>
          </div>
        </div>
        {recipient ? (
          <p className="truncate text-sm text-muted-foreground">
            To {recipient.name}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Select a recipient</p>
        )}
        <div className="flex flex-col gap-2 border-t border-border pt-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span>1 USD = {formatTransferAmount(rate, currency)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Transfer Fee</span>
            <span className="font-medium text-success">
              {formatTransferAmount(0, currency)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="font-medium">Total</span>
            <span className="font-semibold text-primary">
              {formatTransferAmount(total, currency)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm text-foreground">
          <Zap className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <p>
            Estimated delivery: <span className="font-semibold">Instant</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
