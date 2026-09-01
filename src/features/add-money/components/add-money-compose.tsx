"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AddMoneyPageData, FundingMethodId } from "../types/add-money";
import { addMoneyAmountSchema } from "../schemas/amount-schema";
import { useAddMoneyDraftStore } from "../store/add-money-draft-store";

import { AmountEntry } from "./amount-entry";
import { FlowStepper } from "./flow-stepper";
import { FundingMethodList } from "./funding-method-list";
import { ImportantNotice, SecurityNotice } from "./info-notices";
import { RecentDeposits } from "./recent-deposits";
import { ReviewCard } from "./review-card";

type AddMoneyComposeProps = {
  data: AddMoneyPageData;
};

export function AddMoneyCompose({ data }: AddMoneyComposeProps) {
  const methodId = useAddMoneyDraftStore((state) => state.methodId);
  const amount = useAddMoneyDraftStore((state) => state.amount);
  const amountInput = useAddMoneyDraftStore((state) => state.amountInput);
  const currency = useAddMoneyDraftStore((state) => state.currency);
  const setMethodId = useAddMoneyDraftStore((state) => state.setMethodId);
  const setAmountInput = useAddMoneyDraftStore((state) => state.setAmountInput);
  const setParsedAmount = useAddMoneyDraftStore((state) => state.setParsedAmount);
  const setCurrency = useAddMoneyDraftStore((state) => state.setCurrency);
  const setStep = useAddMoneyDraftStore((state) => state.setStep);
  const [error, setError] = useState<string | null>(null);
  const [reviewOpen, setReviewOpen] = useState(true);

  const selectedMethod =
    data.methods.find((method) => method.id === methodId) ?? data.methods[0];
  const parsedPreview = addMoneyAmountSchema.safeParse(amountInput);
  const liveAmount = parsedPreview.success ? parsedPreview.data : amount;

  function handleMethodChange(next: FundingMethodId) {
    setMethodId(next);
  }

  function handleContinue() {
    const parsed = addMoneyAmountSchema.safeParse(amountInput);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid amount");
      return;
    }

    setError(null);
    setParsedAmount(parsed.data);
    setStep("confirm");
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
          Add Money
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add funds using your preferred payment method.
        </p>
      </div>

      <FlowStepper currentStep={1} />

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <FundingMethodList
            methods={data.methods}
            value={selectedMethod.id}
            onChange={handleMethodChange}
          />
          <AmountEntry
            value={amountInput}
            parsedAmount={liveAmount}
            currency={currency}
            error={error}
            onChange={(next) => {
              setAmountInput(next);
              setError(null);
            }}
            onCurrencyChange={setCurrency}
            onSelectQuickAmount={(next) => {
              setParsedAmount(next);
              setError(null);
            }}
          />
          <Button
            type="button"
            className="hidden h-12 min-h-12 w-full rounded-lg text-base lg:inline-flex"
            onClick={handleContinue}
          >
            Continue
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="lg:hidden">
            <ReviewCard
              method={selectedMethod}
              amount={liveAmount}
              currency={currency}
              collapsible
              expanded={reviewOpen}
              onToggle={() => setReviewOpen((current) => !current)}
            />
          </div>
          <div className="hidden lg:block">
            <ReviewCard
              method={selectedMethod}
              amount={liveAmount}
              currency={currency}
            />
          </div>
          <SecurityNotice />
          <ImportantNotice />
        </div>
      </div>

      <Button
        type="button"
        className="h-12 min-h-12 w-full rounded-lg text-base lg:hidden"
        onClick={handleContinue}
      >
        Continue
        <ChevronRight className="size-4" aria-hidden="true" />
      </Button>

      <RecentDeposits deposits={data.deposits} />
    </div>
  );
}
