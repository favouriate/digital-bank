"use client";

import { useEffect, useState } from "react";

import { isCurrencyCode } from "@/lib/currency";

import { useSendTransferMutation } from "../hooks/use-send-transfer-mutation";
import { useTransferQuery } from "../hooks/use-transfer-query";
import { useValidateTransferMutation } from "../hooks/use-validate-transfer-mutation";
import { useVerifyPinMutation } from "../hooks/use-verify-pin-mutation";
import { createTransferAmountSchema } from "../schemas/amount-schema";
import { transferPinSchema } from "../schemas/transfer-schema";
import {
  beginTransferOperation,
  resetTransferDraft,
  setTransferStep,
  useTransferDraftStore,
} from "../store/transfer-draft-store";
import { PinError, TransferError, type Recipient } from "../types/transfer";

import { SendMoneyAmount } from "./send-money-amount";
import { SendMoneyCompose } from "./send-money-compose";
import { SendMoneyErrorState } from "./send-money-error";
import { SendMoneyPin } from "./send-money-pin";
import { SendMoneyProcessing } from "./send-money-processing";
import { SendMoneyResult } from "./send-money-result";
import { SendMoneyReview } from "./send-money-review";
import { SendMoneySkeleton } from "./send-money-skeleton";
import { SendMoneyValidating } from "./send-money-validating";

export function SendMoneyView() {
  const pageQuery = useTransferQuery();
  const sendMutation = useSendTransferMutation();
  const validateMutation = useValidateTransferMutation();
  const verifyPinMutation = useVerifyPinMutation();

  const step = useTransferDraftStore((state) => state.step);
  const recipientId = useTransferDraftStore((state) => state.recipientId);
  const resolvedRecipient = useTransferDraftStore(
    (state) => state.resolvedRecipient,
  );
  const amount = useTransferDraftStore((state) => state.amount);
  const note = useTransferDraftStore((state) => state.note);
  const destCurrency = useTransferDraftStore((state) => state.destinationCurrencyCode);

  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [failureMessage, setFailureMessage] = useState(
    "We couldn't send money right now. Please try again.",
  );

  const hasRecipient = Boolean(resolvedRecipient);
  const hasAmount = amount !== null;

  useEffect(() => {
    const current = useTransferDraftStore.getState();
    if (
      current.step === "success" ||
      current.step === "pending" ||
      current.step === "failure" ||
      current.step === "processing" ||
      current.step === "validating" ||
      current.step === "pin"
    ) {
      setTransferStep(current.resolvedRecipient ? "amount" : "compose");
      setPin("");
      setPinError(null);
    }
  }, []);

  useEffect(() => {
    if (step === "amount" && !hasRecipient) {
      setTransferStep("compose");
      return;
    }

    if (
      (step === "review" ||
        step === "pin" ||
        step === "processing" ||
        step === "details") &&
      (!hasRecipient || !hasAmount)
    ) {
      setTransferStep(hasRecipient ? "amount" : "compose");
    }
  }, [hasAmount, hasRecipient, step]);

  if (pageQuery.isPending) {
    return <SendMoneySkeleton />;
  }

  if (pageQuery.isError || !pageQuery.data) {
    return <SendMoneyErrorState onRetry={() => pageQuery.refetch()} />;
  }

  const selectedRecipient: Recipient | null =
    pageQuery.data.recipients.find((recipient) => recipient.id === recipientId) ??
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
  function fallbackStep() {
    if (step === "amount" && !hasRecipient) {
      return "compose" as const;
    }

    if (
      (step === "review" ||
        step === "pin" ||
        step === "processing" ||
        step === "details") &&
      (!hasRecipient || !hasAmount)
    ) {
      return hasRecipient ? ("amount" as const) : ("compose" as const);
    }

    return step;
  }

  const renderStep = fallbackStep();

  function currentRequest() {
    const draft = useTransferDraftStore.getState();
    const currency = draft.destinationCurrencyCode;
    if (!isCurrencyCode(currency)) {
      setAmountError("Select a supported currency.");
      return null;
    }
    const parsed = createTransferAmountSchema(
      pageQuery.data?.availableBalance ?? 0,
      currency,
    ).safeParse(draft.amountInput);
    if (!parsed.success) {
      setAmountError(parsed.error.issues[0]?.message ?? "Enter a valid amount.");
      return null;
    }
    const destAmount = parsed.data;
    const recipient =
      pageQuery.data?.recipients.find(
        (item) => item.id === draft.recipientId,
      ) ??
      (draft.resolvedRecipient
        ? {
            id: draft.resolvedRecipient.id,
            name: draft.resolvedRecipient.name,
            email: "",
            initials: draft.resolvedRecipient.initials,
            avatarUrl: draft.resolvedRecipient.avatarUrl,
            frequent: false,
          }
        : null);

    if (!recipient || destAmount === null) {
      return null;
    }

    return {
      transferId: draft.transferId ?? beginTransferOperation(),
      bankName: draft.resolvedRecipient?.bankName,
      accountMask: draft.resolvedRecipient?.accountNumberMasked,
      recipientId: recipient.id,
      amount: destAmount,
      currency,
      note: draft.note,
      recipientName: recipient.name,
    };
  }

  function returnToAmountOrCompose() {
    setTransferStep(hasRecipient ? "amount" : "compose");
  }

  async function goValidateThenReview() {
    beginTransferOperation();
    const request = currentRequest();

    if (!request) {
      returnToAmountOrCompose();
      return;
    }

    setAmountError(null);
    setTransferStep("validating");

    try {
      await validateMutation.mutateAsync(request);
      setTransferStep("review");
    } catch (error) {
      setAmountError(
        error instanceof TransferError
          ? error.message
          : "We couldn't validate this transfer. Please try again.",
      );
      setTransferStep("amount");
    }
  }

  async function submitTransfer() {
    const request = currentRequest();

    if (!request) {
      returnToAmountOrCompose();
      return;
    }

    setTransferStep("processing");

    try {
      const result = await sendMutation.mutateAsync(request);
      setTransferStep(result.outcome === "pending" ? "pending" : "success");
    } catch (error) {
      setFailureMessage(
        error instanceof TransferError
          ? error.message
          : "We couldn't send money right now. Please try again.",
      );
      setTransferStep("failure");
    }
  }

  async function handlePinSubmit() {
    const parsed = transferPinSchema.safeParse(pin);

    if (!parsed.success) {
      setPinError(parsed.error.issues[0]?.message ?? "Enter a 4-digit PIN");
      return;
    }

    setPinError(null);

    try {
      await verifyPinMutation.mutateAsync(parsed.data);
    } catch (error) {
      setPinError(
        error instanceof PinError
          ? error.message
          : "That PIN is incorrect. Please try again.",
      );
      return;
    }

    setPin("");
    await submitTransfer();
  }

  if (
    (renderStep === "success" || renderStep === "pending") &&
    selectedRecipient &&
    amount !== null && sendMutation.data
  ) {
    return (
      <SendMoneyResult
        status={renderStep}
        recipient={selectedRecipient}
        amount={sendMutation.data.amount}
        currency={sendMutation.data.currency}
        onDone={() => {
          resetTransferDraft();
          setPin("");
        }}
      />
    );
  }

  if (renderStep === "failure") {
    return (
      <SendMoneyResult
        status="failure"
        message={failureMessage}
        onRetry={() => {
          void submitTransfer();
        }}
        onChangeDetails={() => {
          setPin("");
          setPinError(null);
          returnToAmountOrCompose();
        }}
      />
    );
  }

  if (renderStep === "processing" && selectedRecipient && amount !== null && isCurrencyCode(destCurrency)) {
    return (
      <SendMoneyProcessing
        recipient={selectedRecipient}
        amount={amount}
        currency={destCurrency}
      />
    );
  }

  if (renderStep === "pin" && selectedRecipient && amount !== null && isCurrencyCode(destCurrency)) {
    return (
      <SendMoneyPin
        recipient={selectedRecipient}
        amount={amount}
        currency={destCurrency}
        pin={pin}
        error={pinError}
        isPending={verifyPinMutation.isPending || sendMutation.isPending}
        onPinChange={(value) => {
          setPin(value);
          setPinError(null);
        }}
        onBack={() => setTransferStep("review")}
        onSubmit={() => {
          void handlePinSubmit();
        }}
      />
    );
  }

  if (renderStep === "review" && selectedRecipient && amount !== null && isCurrencyCode(destCurrency)) {
    return (
      <SendMoneyReview
        recipient={selectedRecipient}
        resolvedRecipient={resolvedRecipient}
        amount={amount}
        currency={destCurrency}
        note={note}
        onBack={() => setTransferStep("amount")}
        onContinue={() => setTransferStep("pin")}
      />
    );
  }

  if (renderStep === "validating") {
    return <SendMoneyValidating />;
  }

  if (renderStep === "amount" && resolvedRecipient) {
    return (
      <SendMoneyAmount
        data={pageQuery.data}
        recipient={resolvedRecipient}
        error={amountError}
        onBack={() => setTransferStep("compose")}
        onDismissError={() => setAmountError(null)}
        onContinue={() => {
          void goValidateThenReview();
        }}
      />
    );
  }

  return <SendMoneyCompose data={pageQuery.data} />;
}
