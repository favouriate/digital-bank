"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CurrencyCode } from "@/types/currency";

import { formatTransferAmount } from "../lib/format";
import { transferNoteSchema } from "../schemas/transfer-schema";
import {
  setTransferNote,
  useTransferDraftStore,
} from "../store/transfer-draft-store";
import type { Recipient } from "../types/transfer";

import { FlowStepper } from "./flow-stepper";
import { NeedHelp } from "./info-cards";
import { TransferSummary } from "./transfer-summary";

type SendMoneyDetailsProps = {
  recipient: Recipient;
  amount: number;
  currency?: CurrencyCode;
  error: string | null;
  onBack: () => void;
  onContinue: () => void;
};

export function SendMoneyDetails({
  recipient,
  amount,
  currency = "USD",
  error,
  onBack,
  onContinue,
}: SendMoneyDetailsProps) {
  const note = useTransferDraftStore((state) => state.note);

  function handleContinue() {
    const parsed = transferNoteSchema.safeParse(note);

    if (!parsed.success) {
      return;
    }

    setTransferNote(parsed.data);
    onContinue();
  }

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
          Transfer details
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a note for {recipient.name}. This is optional.
        </p>
      </div>

      <FlowStepper currentStep={3} />

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div>
            <Label htmlFor="transfer-note" className="text-base font-semibold">
              Note
            </Label>
            <Textarea
              id="transfer-note"
              value={note}
              maxLength={140}
              placeholder="What's this transfer for?"
              className="mt-3 min-h-28"
              aria-describedby="transfer-note-hint"
              onChange={(event) => setTransferNote(event.target.value)}
            />
            <p
              id="transfer-note-hint"
              className="mt-2 text-sm text-muted-foreground"
            >
              {note.length}/140
            </p>
          </div>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
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
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5">
          <TransferSummary
            recipient={recipient}
            amount={amount}
            currency={currency}
          />
          <p className="text-sm text-muted-foreground">
            Sending {formatTransferAmount(amount, currency)} to {recipient.name}.
          </p>
          <NeedHelp />
        </div>
      </div>
    </div>
  );
}
