"use client";

import { ArrowLeft, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { formatTransferAmount } from "../lib/format";
import { TRANSFER_PIN_LENGTH } from "../schemas/transfer-schema";
import type { Recipient } from "../types/transfer";

import { FlowStepper } from "./flow-stepper";
import { TransferSummary } from "./transfer-summary";

type SendMoneyPinProps = {
  recipient: Recipient;
  amount: number;
  pin: string;
  error: string | null;
  isPending: boolean;
  onPinChange: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export function SendMoneyPin({
  recipient,
  amount,
  pin,
  error,
  isPending,
  onPinChange,
  onBack,
  onSubmit,
}: SendMoneyPinProps) {
  const complete = pin.length === TRANSFER_PIN_LENGTH;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <button
          type="button"
          className="mb-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground"
          disabled={isPending}
          onClick={onBack}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </button>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          Enter transaction PIN
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Authorize {formatTransferAmount(amount)} to {recipient.name}.
        </p>
      </div>

      <FlowStepper currentStep={5} />

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div>
            <Label htmlFor="transfer-pin" className="text-base font-semibold">
              4-digit PIN
            </Label>
            <div className="mt-3">
              <InputOTP
                id="transfer-pin"
                maxLength={TRANSFER_PIN_LENGTH}
                value={pin}
                disabled={isPending}
                aria-invalid={!!error}
                aria-describedby={error ? "transfer-pin-error" : undefined}
                onChange={onPinChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="size-12 text-lg" />
                  <InputOTPSlot index={1} className="size-12 text-lg" />
                  <InputOTPSlot index={2} className="size-12 text-lg" />
                  <InputOTPSlot index={3} className="size-12 text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error ? (
              <p
                id="transfer-pin-error"
                role="alert"
                className="mt-2 text-sm text-destructive"
              >
                {error}
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Enter the 4-digit PIN for this demo transfer.
              </p>
            )}
          </div>
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
              disabled={!complete || isPending}
              onClick={onSubmit}
            >
              {isPending ? (
                <>
                  <LoaderCircle
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                  Authorizing
                </>
              ) : (
                "Confirm transfer"
              )}
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5">
          <TransferSummary recipient={recipient} amount={amount} />
        </div>
      </div>
    </div>
  );
}
