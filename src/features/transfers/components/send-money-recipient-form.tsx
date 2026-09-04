"use client";

import { useMemo, useState } from "react";
import { CircleCheck, LoaderCircle, ShieldCheck, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useTransferBanksQuery } from "../hooks/use-transfer-banks-query";
import { useTransferDestinationsQuery } from "../hooks/use-transfer-destinations-query";
import { useRecipientLookupQuery } from "../hooks/use-recipient-lookup-query";
import { isValidAccountNumber, getAccountNumberMaxLength, createAccountNumberSchema } from "../schemas/account-number-schema";
import type {
  DestinationCountryCode,
  ResolvedRecipient,
  TransferBank,
  TransferDestination,
} from "../types/destination";
import { isDestinationCountryCode, RecipientLookupError } from "../types/destination";

import { BankCombobox } from "./bank-combobox";
import { DestinationCombobox } from "./destination-combobox";

type SendMoneyRecipientFormProps = {
  onContinue: (payload: {
    resolvedRecipient: ResolvedRecipient;
    accountNumber: string;
  }) => void;
  initialCountryCode?: string | null;
  initialBankId?: string | null;
  initialAccountNumber?: string | null;
  continueLabel?: string;
};

export function SendMoneyRecipientForm({
  onContinue,
  initialCountryCode = null,
  initialBankId = null,
  initialAccountNumber = "",
  continueLabel = "Continue",
}: SendMoneyRecipientFormProps) {
  const destinationsQuery = useTransferDestinationsQuery();
  const destinations = destinationsQuery.data ?? [];

  const [countryCode, setCountryCode] = useState<DestinationCountryCode | null>(
    () => (isDestinationCountryCode(initialCountryCode) ? initialCountryCode : null),
  );
  const [bankId, setBankId] = useState<string | null>(initialBankId);
  const [accountNumber, setAccountNumber] = useState(initialAccountNumber ?? "");

  const banksQuery = useTransferBanksQuery(countryCode);
  const banks = banksQuery.data ?? [];

  const selectedDestination =
    destinations.find((destination) => destination.countryCode === countryCode) ??
    null;
  const selectedBank = banks.find((bank) => bank.id === bankId) ?? null;

  const lookupEnabled =
    countryCode !== null &&
    Boolean(bankId) &&
    isValidAccountNumber(countryCode, accountNumber.trim());

  const lookupQuery = useRecipientLookupQuery({
    countryCode,
    bankId,
    accountNumber,
  });

  const lookupErrorMessage = useMemo(() => {
    if (!lookupEnabled || !lookupQuery.isError) {
      return null;
    }

    if (lookupQuery.error instanceof RecipientLookupError) {
      return lookupQuery.error.message;
    }

    return "We couldn't find this account. Check the account number and try again.";
  }, [lookupEnabled, lookupQuery.error, lookupQuery.isError]);

  const formatErrorMessage = useMemo(() => {
    if (!countryCode || !bankId) {
      return null;
    }

    const trimmed = accountNumber.trim();
    if (!trimmed || isValidAccountNumber(countryCode, trimmed)) {
      return null;
    }

    const result = createAccountNumberSchema(countryCode).safeParse(trimmed);
    if (result.success) {
      return null;
    }

    return result.error.issues[0]?.message ?? null;
  }, [accountNumber, bankId, countryCode]);

  const resolved =
    lookupEnabled && lookupQuery.isSuccess ? lookupQuery.data : null;
  const canContinue = Boolean(resolved) && !lookupQuery.isFetching;

  function handleDestinationChange(destination: TransferDestination) {
    setCountryCode(destination.countryCode);
    setBankId(null);
    setAccountNumber("");
  }

  function handleBankChange(bank: TransferBank) {
    setBankId(bank.id);
    setAccountNumber("");
  }

  function handleContinue() {
    if (!resolved) {
      return;
    }

    onContinue({
      resolvedRecipient: resolved,
      accountNumber: accountNumber.trim(),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <Label htmlFor="destination-country">Country / currency</Label>
        <DestinationCombobox
          id="destination-country"
          destinations={destinations}
          value={selectedDestination}
          isLoading={destinationsQuery.isPending}
          isError={destinationsQuery.isError}
          onRetry={() => {
            void destinationsQuery.refetch();
          }}
          onChange={handleDestinationChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="destination-bank">Bank</Label>
        <BankCombobox
          id="destination-bank"
          banks={banks}
          value={selectedBank}
          disabled={countryCode === null}
          isLoading={countryCode !== null && banksQuery.isPending}
          isError={countryCode !== null && banksQuery.isError}
          onRetry={() => {
            void banksQuery.refetch();
          }}
          onChange={handleBankChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination-account">Account number</Label>
        <InputGroup className="h-12 min-h-11">
          <InputGroupInput
            id="destination-account"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Enter account number"
            value={accountNumber}
            disabled={countryCode === null || bankId === null}
            maxLength={
              countryCode ? getAccountNumberMaxLength(countryCode) : 17
            }
            aria-invalid={Boolean(lookupErrorMessage || formatErrorMessage)}
            aria-describedby="destination-account-hint"
            onChange={(event) => {
              setAccountNumber(event.target.value.replace(/\D/g, ""));
            }}
          />
          <InputGroupAddon align="inline-end">
            <User className="size-4" aria-hidden="true" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div
        id="destination-account-hint"
        className="flex gap-2 rounded-xl bg-accent px-3 py-3 text-sm text-accent-foreground"
      >
        <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <p>We&apos;ll find the account details and confirm the recipient.</p>
      </div>

      <div aria-live="polite">
        {lookupEnabled && lookupQuery.isFetching ? (
          <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-3">
            <LoaderCircle
              className="size-4 animate-spin text-primary"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">Checking account...</p>
          </div>
        ) : null}

        {resolved ? (
          <div className="flex gap-2 rounded-lg border border-success/20 bg-success/5 px-3 py-3">
            <CircleCheck
              className="mt-0.5 size-4 shrink-0 text-success"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-success">Account found</p>
              <p className="font-semibold text-foreground">{resolved.name}</p>
              <p className="text-sm text-muted-foreground">
                {resolved.bankName} {resolved.accountNumberMasked} ·{" "}
                {resolved.currencyCode}
              </p>
            </div>
          </div>
        ) : null}

        {formatErrorMessage ? (
          <p role="alert" className="text-sm text-destructive">
            {formatErrorMessage}
          </p>
        ) : null}

        {lookupErrorMessage ? (
          <p role="alert" className="text-sm text-destructive">
            {lookupErrorMessage}
          </p>
        ) : null}
      </div>

      <Button
        type="button"
        className="h-12 min-h-12 w-full rounded-xl text-base"
        disabled={!canContinue}
        title={
          canContinue
            ? undefined
            : "Confirm the recipient before continuing"
        }
        onClick={handleContinue}
      >
        {continueLabel}
      </Button>
    </div>
  );
}
