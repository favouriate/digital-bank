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

import { formatAddMoneyAmount } from "../lib/format";
import {
  MAX_ADD_MONEY_AMOUNT,
  MIN_ADD_MONEY_AMOUNT,
  QUICK_AMOUNTS,
} from "../schemas/amount-schema";

type AmountEntryProps = {
  value: string;
  parsedAmount: number | null;
  error: string | null;
  onChange: (value: string) => void;
  onSelectQuickAmount: (amount: number) => void;
};

export function AmountEntry({
  value,
  parsedAmount,
  error,
  onChange,
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
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                className="h-12 min-h-11 shrink-0 gap-1 px-2 font-semibold"
              />
            }
          >
            USD
            <ChevronDown className="size-4" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>USD</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          id="add-money-amount"
          inputMode="decimal"
          value={value}
          aria-invalid={!!error}
          aria-describedby={error ? "add-money-amount-error" : "add-money-amount-hint"}
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
          Min. {formatAddMoneyAmount(MIN_ADD_MONEY_AMOUNT)} • Max.{" "}
          {formatAddMoneyAmount(MAX_ADD_MONEY_AMOUNT)}
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
              {formatAddMoneyAmount(amount)}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
