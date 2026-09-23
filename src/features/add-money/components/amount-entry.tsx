"use client";

import { CurrencySelect } from "@/components/currency-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CurrencyCode } from "@/types/currency";

import { formatAddMoneyAmount } from "../lib/format";
import {
  MAX_ADD_MONEY_AMOUNT,
  MIN_ADD_MONEY_AMOUNT,
  QUICK_AMOUNTS,
} from "../schemas/amount-schema";

type AmountEntryProps = {
  value: string;
  parsedAmount: number | null;
  currency: CurrencyCode;
  error: string | null;
  onChange: (value: string) => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onSelectQuickAmount: (amount: number) => void;
};

export function AmountEntry({
  value,
  parsedAmount,
  currency,
  error,
  onChange,
  onCurrencyChange,
  onSelectQuickAmount,
}: AmountEntryProps) {
  return (
    <section>
      <Label htmlFor="add-money-amount" className="text-base font-semibold">
        Enter Amount
      </Label>
      <div
        className={cn(
          "mt-3 flex items-center rounded-xl border border-input bg-background px-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20",
          error &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
        )}
      >
        <CurrencySelect
          value={currency}
          onChange={onCurrencyChange}
          triggerClassName="h-12 min-h-11 shrink-0 gap-1 px-2 font-semibold"
          ariaLabel={`Add money currency ${currency}. Change currency`}
        />
        <Input
          id="add-money-amount"
          inputMode="decimal"
          value={value}
          aria-invalid={!!error}
          aria-describedby={
            error ? "add-money-amount-error" : "add-money-amount-hint"
          }
          className="h-14 min-h-11 border-0 bg-transparent text-right text-2xl font-semibold shadow-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {error ? (
        <p
          id="add-money-amount-error"
          role="alert"
          className="mt-2 text-sm text-destructive"
        >
          {error}
        </p>
      ) : (
        <p id="add-money-amount-hint" className="mt-2 text-sm text-muted-foreground">
          Min. {formatAddMoneyAmount(MIN_ADD_MONEY_AMOUNT, currency)} • Max.{" "}
          {formatAddMoneyAmount(MAX_ADD_MONEY_AMOUNT, currency)}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_AMOUNTS.map((amount) => {
          const selected = parsedAmount === amount;

          return (
            <Button
              key={amount}
              type="button"
              variant={selected ? "default" : "outline"}
              className="min-h-11 rounded-full px-4"
              aria-pressed={selected}
              onClick={() => onSelectQuickAmount(amount)}
            >
              {formatAddMoneyAmount(amount, currency)}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
