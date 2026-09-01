"use client";

import { useEffect, useState } from "react";

import { useSendTransferMutation } from "../hooks/use-send-transfer-mutation";
import { useTransferQuery } from "../hooks/use-transfer-query";
import { useValidateTransferMutation } from "../hooks/use-validate-transfer-mutation";
import { useVerifyPinMutation } from "../hooks/use-verify-pin-mutation";
import { createTransferAmountSchema } from "../schemas/amount-schema";
import { transferPinSchema } from "../schemas/transfer-schema";
import {
  resetTransferDraft,
  setTransferStep,
  useTransferDraftStore,
} from "../store/transfer-draft-store";
import { PinError, TransferError, type Recipient } from "../types/transfer";

import { SendMoneyCompose } from "./send-money-compose";
import { SendMoneyDetails } from "./send-money-details";
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
  const amountInput = useTransferDraftStore((state) => state.amountInput);
  const note = useTransferDraftStore((state) => state.note);

  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [failureMessage, setFailureMessage] = useState(
    "We couldn't send money right now. Please try again.",
  );

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
      setTransferStep("compose");
      setPin("");
      setPinError(null);
    }
  }, []);

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
          avatarUrl: null,
          frequent: false,
        }
      : null);

  function currentRequest() {
    const parsed = createTransferAmountSchema(
      pageQuery.data?.availableBalance ?? 0,
    ).safeParse(amountInput);
    const nextAmount = parsed.success ? parsed.data : amount;

    if (!selectedRecipient || nextAmount === null) {
      return null;
    }

    return {
      recipientId: selectedRecipient.id,
      amount: nextAmount,
      note,
    };
  }

  async function goValidateThenReview() {
    const request = currentRequest();

    if (!request) {
      setTransferStep("compose");
      return;
    }

    setDetailsError(null);
    setTransferStep("validating");

    try {
      await validateMutation.mutateAsync(request);
      setTransferStep("review");
    } catch (error) {
      setDetailsError(
        error instanceof TransferError
          ? error.message
          : "We couldn't validate this transfer. Please try again.",
      );
      setTransferStep("details");
    }
  }

  async function submitTransfer() {
    const request = currentRequest();

    if (!request) {
      setTransferStep("compose");
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

    await submitTransfer();
  }

  if (
    (step === "success" || step === "pending") &&
    selectedRecipient &&
    amount !== null
  ) {
    return (
      <SendMoneyResult
        status={step}
        recipient={selectedRecipient}
        amount={amount}
        onDone={() => {
          resetTransferDraft();
          setPin("");
        }}
      />
    );
  }

  if (step === "failure") {
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
          setTransferStep("compose");
        }}
      />
    );
  }

  if (step === "processing" && selectedRecipient && amount !== null) {
    return (
      <SendMoneyProcessing recipient={selectedRecipient} amount={amount} />
    );
  }

  if (step === "pin" && selectedRecipient && amount !== null) {
    return (
      <SendMoneyPin
        recipient={selectedRecipient}
        amount={amount}
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

  if (step === "review" && selectedRecipient && amount !== null) {
    return (
      <SendMoneyReview
        recipient={selectedRecipient}
        amount={amount}
        note={note}
        onBack={() => setTransferStep("details")}
        onContinue={() => setTransferStep("pin")}
      />
    );
  }

  if (step === "validating") {
    return <SendMoneyValidating />;
  }

  if (step === "details" && selectedRecipient && amount !== null) {
    return (
      <SendMoneyDetails
        recipient={selectedRecipient}
        amount={amount}
        error={detailsError}
        onBack={() => setTransferStep("compose")}
        onContinue={() => {
          void goValidateThenReview();
        }}
      />
    );
  }

  return (
    <SendMoneyCompose
      data={pageQuery.data}
      onContinueTo={(next) => {
        if (next === "review") {
          void goValidateThenReview();
          return;
        }
        setTransferStep("details");
      }}
    />
  );
}
