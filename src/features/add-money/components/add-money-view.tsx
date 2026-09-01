"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAddMoneyMutation } from "../hooks/use-add-money-mutation";
import { useAddMoneyQuery } from "../hooks/use-add-money-query";
import { addMoneyAmountSchema } from "../schemas/amount-schema";
import { useAddMoneyDraftStore } from "../store/add-money-draft-store";
import { AddMoneyError } from "../types/add-money";

import { AddMoneyCompose } from "./add-money-compose";
import { AddMoneyConfirm } from "./add-money-confirm";
import { AddMoneyErrorState } from "./add-money-error";
import { AddMoneyResult } from "./add-money-result";
import { AddMoneySkeleton } from "./add-money-skeleton";

export function AddMoneyView() {
  const router = useRouter();
  const pageQuery = useAddMoneyQuery();
  const mutation = useAddMoneyMutation();
  const step = useAddMoneyDraftStore((state) => state.step);
  const methodId = useAddMoneyDraftStore((state) => state.methodId);
  const amount = useAddMoneyDraftStore((state) => state.amount);
  const amountInput = useAddMoneyDraftStore((state) => state.amountInput);
  const currency = useAddMoneyDraftStore((state) => state.currency);
  const setStep = useAddMoneyDraftStore((state) => state.setStep);
  const setParsedAmount = useAddMoneyDraftStore((state) => state.setParsedAmount);
  const reset = useAddMoneyDraftStore((state) => state.reset);
  const [failureMessage, setFailureMessage] = useState(
    "We couldn't add money right now. Please try again.",
  );

  useEffect(() => {
    const current = useAddMoneyDraftStore.getState();
    if (current.step === "success" || current.step === "failure") {
      current.reset();
    }
  }, []);

  if (pageQuery.isPending) {
    return <AddMoneySkeleton />;
  }

  if (pageQuery.isError || !pageQuery.data) {
    return <AddMoneyErrorState onRetry={() => pageQuery.refetch()} />;
  }

  const selectedMethod =
    pageQuery.data.methods.find((method) => method.id === methodId) ??
    pageQuery.data.methods[0];

  async function submitDeposit() {
    const parsed = addMoneyAmountSchema.safeParse(amountInput);
    const nextAmount = parsed.success ? parsed.data : amount;

    if (!parsed.success || nextAmount === null) {
      setStep("compose");
      return;
    }

    setParsedAmount(nextAmount);

    try {
      await mutation.mutateAsync({
        methodId: selectedMethod.id,
        amount: nextAmount,
      });
      setStep("success");
    } catch (error) {
      setFailureMessage(
        error instanceof AddMoneyError
          ? error.message
          : "We couldn't add money right now. Please try again.",
      );
      setStep("failure");
    }
  }

  if (step === "success" && amount !== null) {
    return (
      <AddMoneyResult
        status="success"
        method={selectedMethod}
        amount={amount}
        currency={currency}
        onDone={() => {
          reset();
          router.push("/");
        }}
      />
    );
  }

  if (step === "failure") {
    return (
      <AddMoneyResult
        status="failure"
        message={failureMessage}
        onRetry={() => {
          setStep("confirm");
          void submitDeposit();
        }}
        onChangeDetails={() => setStep("compose")}
      />
    );
  }

  if (step === "confirm" && amount !== null) {
    return (
      <AddMoneyConfirm
        method={selectedMethod}
        amount={amount}
        currency={currency}
        isPending={mutation.isPending}
        onBack={() => setStep("compose")}
        onConfirm={() => {
          void submitDeposit();
        }}
      />
    );
  }

  return <AddMoneyCompose data={pageQuery.data} />;
}
