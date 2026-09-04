"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { resolveTransferCurrency } from "../lib/convert-amount";
import {
  setResolvedTransferRecipient,
  useTransferDraftStore,
} from "../store/transfer-draft-store";
import type { Recipient, TransferPageData } from "../types/transfer";

import { FlowStepper } from "./flow-stepper";
import { NeedHelp, WhyOpenPay } from "./info-cards";
import { SendMoneyRecipientForm } from "./send-money-recipient-form";
import { TransferSummary } from "./transfer-summary";

type SendMoneyComposeProps = {
  data: TransferPageData;
};

export function SendMoneyCompose({ data }: SendMoneyComposeProps) {
  const resolvedRecipient = useTransferDraftStore(
    (state) => state.resolvedRecipient,
  );
  const recipientId = useTransferDraftStore((state) => state.recipientId);
  const draftCountry = useTransferDraftStore(
    (state) => state.destinationCountryCode,
  );
  const draftBankId = useTransferDraftStore((state) => state.bankId);
  const draftAccountNumber = useTransferDraftStore(
    (state) => state.accountNumber,
  );

  const selectedRecipient: Recipient | null =
    data.recipients.find((recipient) => recipient.id === recipientId) ??
    (resolvedRecipient
      ? {
          id: resolvedRecipient.id,
          name: resolvedRecipient.name,
          email: "",
          initials: resolvedRecipient.initials,
          avatarUrl: resolvedRecipient.avatarUrl,
          frequent: false,
        }
      : null);

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

      <FlowStepper currentStep={1} />

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-6 lg:col-span-7">
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
              onContinue={({
                resolvedRecipient: nextRecipient,
                accountNumber,
              }) => {
                setResolvedTransferRecipient(nextRecipient, accountNumber);
              }}
            />
          </section>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <TransferSummary
            recipient={selectedRecipient}
            amount={null}
            currency={resolveTransferCurrency(
              resolvedRecipient?.currencyCode,
            )}
          />
          <WhyOpenPay />
          <NeedHelp />
        </div>
      </div>
    </div>
  );
}
