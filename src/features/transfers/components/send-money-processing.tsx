import { LoaderCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatTransferAmount } from "../lib/format";
import type { Recipient } from "../types/transfer";

import { FlowStepper } from "./flow-stepper";

type SendMoneyProcessingProps = {
  recipient: Recipient;
  amount: number;
};

export function SendMoneyProcessing({
  recipient,
  amount,
}: SendMoneyProcessingProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          Sending money
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Please wait while we process your transfer.
        </p>
      </div>
      <FlowStepper currentStep={6} />
      <Card className="mx-auto w-full max-w-lg py-8">
        <CardContent className="flex flex-col items-center gap-3 text-center">
          <LoaderCircle
            className="size-10 animate-spin text-primary"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Sending {formatTransferAmount(amount)} to {recipient.name}…
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
