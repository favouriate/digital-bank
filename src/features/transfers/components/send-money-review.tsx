"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CurrencyCode } from "@/types/currency";

import { formatTransferAmount } from "../lib/format";
import type { ResolvedRecipient } from "../types/destination";
import type { Recipient } from "../types/transfer";

import { FlowStepper } from "./flow-stepper";
import { NeedHelp } from "./info-cards";
import { TransferSummary } from "./transfer-summary";

type SendMoneyReviewProps = {
  recipient: Recipient;
  resolvedRecipient: ResolvedRecipient | null;
  amount: number;
  currency: CurrencyCode;
  note: string;
  onBack: () => void;
  onContinue: () => void;
};

export function SendMoneyReview({
  recipient,
  resolvedRecipient,
  amount,
  currency,
  note,
  onBack,
  onContinue,
}: SendMoneyReviewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <button
          type="button"
          className="mb-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground"
          onClick={onBack}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </button>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          Review transfer
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirm {formatTransferAmount(amount, currency)} to {recipient.name} before
          entering your PIN.
        </p>
      </div>

      <FlowStepper currentStep={3} />

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Transfer details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">To</span>
                <span className="truncate text-right font-medium">
                  {resolvedRecipient ? (
                    <>
                      {resolvedRecipient.name}
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        {resolvedRecipient.bankName}{" "}
                        {resolvedRecipient.accountNumberMasked}
                      </span>
                    </>
                  ) : (
                    recipient.name
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">From</span>
                <span className="text-right font-medium">
                  OpenPay balance
                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                    USD
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">
                  {formatTransferAmount(amount, currency)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Note</span>
                <span className="font-medium">{note || "None"}</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-12 min-h-12 flex-1 rounded-lg"
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="button"
              className="h-12 min-h-12 flex-1 rounded-lg"
              onClick={onContinue}
            >
              Continue to PIN
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5">
          <TransferSummary
            recipient={recipient}
            amount={amount}
            currency={currency}
          />
          <NeedHelp />
        </div>
      </div>
    </div>
  );
}
