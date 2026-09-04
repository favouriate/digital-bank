"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { CountryCode, CurrencyCode } from "@/types/currency";

import { formatAmountInput, formatTransferAmount } from "../lib/format";
import { getQuickAmounts } from "../lib/quick-amounts";

import { CountryFlag } from "./country-flag";

type AmountEntryProps = {
  value: string;
  error: string | null;
  currencyCode: CurrencyCode;
  countryCode: CountryCode;
  destAvailableBalance: number;
  usdAvailableBalance: number;
  onChange: (value: string) => void;
};

export function AmountEntry({
  value,
  error,
  currencyCode,
  countryCode,
  destAvailableBalance,
  usdAvailableBalance,
  onChange,
}: AmountEntryProps) {
  const showUsdTranslation = currencyCode !== "USD";
  const selectedAmount = Number(value.replace(/[^\d.]/g, ""));

  return (
    <section className="flex flex-col items-center text-center">
      <Label
        htmlFor="send-money-amount"
        className="text-sm font-medium text-muted-foreground"
      >
        Amount
      </Label>
      <Input
        id="send-money-amount"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        placeholder={formatTransferAmount(0, currencyCode)}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? "send-money-amount-error" : "send-money-amount-hint"
        }
        className={cn(
          "h-16 min-h-16 border-0 bg-transparent px-0 text-center text-5xl font-semibold shadow-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent",
          error && "text-destructive",
        )}
        onChange={(event) => onChange(event.target.value)}
      />
      <div
        className="mt-2 flex w-full gap-2 overflow-x-auto pb-1"
        aria-label="Quick amounts"
      >
        {getQuickAmounts(currencyCode).map((amount) => {
          const label = formatTransferAmount(amount, currencyCode);
          const selected = selectedAmount === amount;

          return (
            <button
              key={amount}
              type="button"
              aria-label={`Set amount to ${label}`}
              aria-pressed={selected}
              className={cn(
                "min-h-11 shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-xs transition-[transform,opacity,background-color,color] duration-150 hover:bg-muted active:scale-95 active:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                selected && "bg-primary text-primary-foreground",
              )}
              onClick={() => onChange(formatAmountInput(amount))}
            >
              {label}
            </button>
          );
        })}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              className="mt-1 h-11 min-h-11 gap-2 px-3 font-semibold"
            />
          }
        >
          <CountryFlag countryCode={countryCode} />
          {currencyCode}
          <ChevronDown className="size-4" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem>
            <CountryFlag countryCode={countryCode} />
            {currencyCode}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {error ? (
        <p
          id="send-money-amount-error"
          role="alert"
          className="mt-3 text-sm text-destructive"
        >
          {error}
        </p>
      ) : (
        <div id="send-money-amount-hint" className="mt-3">
          <p className="text-sm text-muted-foreground">
            Available balance:{" "}
            <span className="font-medium text-foreground">
              {formatTransferAmount(destAvailableBalance, currencyCode)}
            </span>
          </p>
          {showUsdTranslation ? (
            <p className="mt-1 text-xs text-muted-foreground">
              ≈ {formatTransferAmount(usdAvailableBalance, "USD")} USD — this is
              your OpenPay balance in this currency
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}
