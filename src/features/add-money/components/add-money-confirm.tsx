"use client";

import { ArrowLeft, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { FundingMethod } from "../types/add-money";
import { formatAddMoneyAmount } from "../lib/format";

import { FlowStepper } from "./flow-stepper";
import { ImportantNotice, SecurityNotice } from "./info-notices";
import { ReviewCard } from "./review-card";

type AddMoneyConfirmProps = {
  method: FundingMethod;
  amount: number;
  isPending: boolean;
  onBack: () => void;
  onConfirm: () => void;
};

export function AddMoneyConfirm({
  method,
  amount,
  isPending,
  onBack,
  onConfirm,
}: AddMoneyConfirmProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <button
          type="button"
          className="mb-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground"
          onClick={onBack}
          disabled={isPending}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </button>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          Confirm deposit
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review {formatAddMoneyAmount(amount)} from {method.label} before you
          confirm.
        </p>
      </div>

      <FlowStepper currentStep={4} />

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <ReviewCard method={method} amount={amount} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-12 min-h-12 flex-1 rounded-lg"
              disabled={isPending}
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="button"
              className="h-12 min-h-12 flex-1 rounded-lg"
              disabled={isPending}
              onClick={onConfirm}
            >
              {isPending ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                  Processing
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-5">
          <SecurityNotice />
          <ImportantNotice />
        </div>
      </div>
    </div>
  );
}
