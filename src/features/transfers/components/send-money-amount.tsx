"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { destFromUsd } from "../lib/convert-amount";
import { createTransferAmountSchema } from "../schemas/amount-schema";
import {
  setTransferParsedAmount,
  useTransferDraftStore,
} from "../store/transfer-draft-store";
import type { ResolvedRecipient } from "../types/destination";
import type { TransferPageData } from "../types/transfer";

import { AmountEntry } from "./amount-entry";

type SendMoneyAmountProps = {
  data: TransferPageData;
  recipient: ResolvedRecipient;
  error?: string | null;
  onBack: () => void;
  onContinue: () => void;
  onDismissError?: () => void;
};

export function SendMoneyAmount({
  data,
  recipient,
  error: parentError = null,
  onBack,
  onContinue,
  onDismissError,
}: SendMoneyAmountProps) {
  const draftAmountInput = useTransferDraftStore((state) => state.amountInput);
  const [value, setValue] = useState(draftAmountInput);
  const [error, setError] = useState<string | null>(null);

  const currencyCode = recipient.currencyCode;
  const destAvailableBalance = destFromUsd(
    data.availableBalance,
    currencyCode,
  );
  const amountSchema = createTransferAmountSchema(
    data.availableBalance,
    currencyCode,
  );
  const parsed = amountSchema.safeParse(value);
  const canContinue = parsed.success;
  const displayError = error ?? parentError ??
    (value.trim() && !parsed.success ? parsed.error.issues[0]?.message : null);

  function handleContinue() {
    const next = amountSchema.safeParse(value);

    if (!next.success) {
      setError(next.error.issues[0]?.message ?? "Enter a valid amount");
      return;
    }

    setError(null);
    useTransferDraftStore.setState({ destinationCurrencyCode: currencyCode });
    setTransferParsedAmount(next.data);
    onContinue();
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <button
          type="button"
          className="mb-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground"
          onClick={onBack}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Send Money
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col gap-8">
        <section className="flex flex-col items-center text-center">
          <p className="text-sm text-muted-foreground">You&apos;re sending to</p>
          <Avatar size="lg" className="mt-3 size-14 after:hidden">
            {recipient.avatarUrl ? (
              <AvatarImage src={recipient.avatarUrl} alt="" />
            ) : null}
            <AvatarFallback>{recipient.initials}</AvatarFallback>
          </Avatar>
          <h1 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
            {recipient.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {recipient.bankName} {recipient.accountNumberMasked}
          </p>
        </section>

        <AmountEntry
          value={value}
          error={displayError}
          currencyCode={currencyCode}
          countryCode={recipient.countryCode}
          destAvailableBalance={destAvailableBalance}
          usdAvailableBalance={data.availableBalance}
          onChange={(next) => {
            setValue(next);
            setError(null);
            onDismissError?.();
          }}
        />

        <Button
          type="button"
          className="h-12 min-h-12 w-full rounded-xl text-base"
          disabled={!canContinue}
          title={
            canContinue ? undefined : "Enter a valid amount to continue"
          }
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
