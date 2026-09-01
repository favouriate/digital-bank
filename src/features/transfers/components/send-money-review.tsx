"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTransferAmount } from "../lib/format";
import type { Recipient } from "../types/transfer";

import { FlowStepper } from "./flow-stepper";
import { NeedHelp } from "./info-cards";
import { TransferSummary } from "./transfer-summary";

type SendMoneyReviewProps = {
  recipient: Recipient;
  amount: number;
  note: string;
  onBack: () => void;
  onContinue: () => void;
};

export function SendMoneyReview({
  recipient,
  amount,
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
          Confirm {formatTransferAmount(amount)} to {recipient.name} before
          entering your PIN.
        </p>
      </div>

      <FlowStepper currentStep={4} />

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Transfer details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Recipient</span>
                <span className="font-medium">{recipient.name}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Email</span>
                <span className="truncate font-medium">{recipient.email}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">
                  {formatTransferAmount(amount)}
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
          <TransferSummary recipient={recipient} amount={amount} />
          <NeedHelp />
        </div>
      </div>
    </div>
  );
}
