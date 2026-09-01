"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createTransferAmountSchema } from "../schemas/amount-schema";
import {
  clearResolvedTransferRecipient,
  setResolvedTransferRecipient,
  setTransferAmountInput,
  setTransferParsedAmount,
  useTransferDraftStore,
} from "../store/transfer-draft-store";
import type { ResolvedRecipient } from "../types/destination";
import type { Recipient, TransferPageData } from "../types/transfer";

import { AmountEntry } from "./amount-entry";
import { FlowStepper } from "./flow-stepper";
import { NeedHelp, WhyOpenPay } from "./info-cards";
import { LaterStepsList } from "./later-steps-list";
import { SendMoneyRecipientForm } from "./send-money-recipient-form";
import { TransferSummary } from "./transfer-summary";
import { CountryFlag } from "./country-flag";

type SendMoneyComposeProps = {
  data: TransferPageData;
  onContinueTo: (step: "details" | "review") => void;
};

function ResolvedRecipientSummary({
  recipient,
  onChange,
}: {
  recipient: ResolvedRecipient;
  onChange: () => void;
}) {
  return (
    <section className="rounded-xl border border-border bg-card px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">Sending to</p>
          <p className="truncate text-base font-semibold text-foreground">
            {recipient.name}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <CountryFlag countryCode={recipient.countryCode} />
            <span className="truncate">
              {recipient.bankName} {recipient.accountNumberMasked} ·{" "}
              {recipient.currencyCode}
            </span>
          </p>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onChange}>
          Change
        </Button>
      </div>
    </section>
  );
}

export function SendMoneyCompose({
  data,
  onContinueTo,
}: SendMoneyComposeProps) {
  const resolvedRecipient = useTransferDraftStore(
    (state) => state.resolvedRecipient,
  );
  const recipientId = useTransferDraftStore((state) => state.recipientId);
  const amount = useTransferDraftStore((state) => state.amount);
  const amountInput = useTransferDraftStore((state) => state.amountInput);
  const draftCountry = useTransferDraftStore(
    (state) => state.destinationCountryCode,
  );
  const draftBankId = useTransferDraftStore((state) => state.bankId);
  const draftAccountNumber = useTransferDraftStore(
    (state) => state.accountNumber,
  );
  const [error, setError] = useState<string | null>(null);

  const selectedRecipient: Recipient | null =
    data.recipients.find((recipient) => recipient.id === recipientId) ??
    (resolvedRecipient
      ? {
          id: resolvedRecipient.id,
          name: resolvedRecipient.name,
          email: "",
          initials: resolvedRecipient.initials,
          avatarUrl: null,
          frequent: false,
        }
      : null);

  const amountSchema = createTransferAmountSchema(data.availableBalance);
  const parsedPreview = amountSchema.safeParse(amountInput);
  const liveAmount = parsedPreview.success ? parsedPreview.data : amount;
  const canContinue = Boolean(resolvedRecipient) && parsedPreview.success;

  function handleContinue(next: "details" | "review") {
    if (!resolvedRecipient) {
      return;
    }

    const parsed = amountSchema.safeParse(amountInput);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid amount");
      return;
    }

    setError(null);
    setTransferParsedAmount(parsed.data);
    onContinueTo(next);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/"
          className="mb-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground lg:hidden"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          Send Money
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Send money to anyone, anywhere in the world.
        </p>
      </div>

      <FlowStepper currentStep={resolvedRecipient ? 2 : 1} />

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-6 lg:col-span-7">
          {resolvedRecipient ? (
            <>
              <ResolvedRecipientSummary
                recipient={resolvedRecipient}
                onChange={() => clearResolvedTransferRecipient()}
              />
              <AmountEntry
                value={amountInput}
                error={error}
                availableBalance={data.availableBalance}
                onChange={(next) => {
                  setTransferAmountInput(next);
                  setError(null);
                }}
              />
              <LaterStepsList
                canContinue={canContinue}
                onSelect={(step) => {
                  if (step === "details" || step === "review") {
                    handleContinue(step);
                  }
                }}
              />
              <Button
                type="button"
                className="hidden h-12 min-h-12 w-full rounded-lg text-base lg:inline-flex"
                disabled={!canContinue}
                onClick={() => handleContinue("details")}
              >
                Continue
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </>
          ) : (
            <section>
              <h2 className="text-base font-semibold text-foreground">
                1. Recipient
              </h2>
              <p className="mt-0.5 mb-4 text-sm text-muted-foreground">
                Choose a country, bank, and account number.
              </p>
              <SendMoneyRecipientForm
                initialCountryCode={draftCountry}
                initialBankId={draftBankId}
                initialAccountNumber={draftAccountNumber}
                onContinue={({ resolvedRecipient: nextRecipient, accountNumber }) => {
                  setResolvedTransferRecipient(nextRecipient, accountNumber);
                }}
              />
            </section>
          )}
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <TransferSummary
            recipient={selectedRecipient}
            amount={liveAmount}
            onContinue={
              resolvedRecipient
                ? () => handleContinue("details")
                : undefined
            }
            continueDisabled={!canContinue}
          />
          <WhyOpenPay />
          <NeedHelp />
        </div>
      </div>

      {resolvedRecipient ? (
        <Button
          type="button"
          className="h-12 min-h-12 w-full rounded-lg text-base lg:hidden"
          disabled={!canContinue}
          onClick={() => handleContinue("details")}
        >
          Continue
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  );
}
