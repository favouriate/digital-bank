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

import { formatTransferAmount } from "../lib/format";
import {
  MAX_TRANSFER_AMOUNT,
  MIN_TRANSFER_AMOUNT,
} from "../schemas/amount-schema";

import { UsdMark } from "./usd-mark";

type AmountEntryProps = {
  value: string;
  error: string | null;
  availableBalance: number;
  onChange: (value: string) => void;
};

export function AmountEntry({
  value,
  error,
  availableBalance,
  onChange,
}: AmountEntryProps) {
  return (
    <section>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            2. Amount Entry
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Enter the amount you want to send.
          </p>
        </div>
      </div>
      <Label htmlFor="send-money-amount" className="sr-only">
        Amount
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
                className="h-12 min-h-11 shrink-0 gap-2 px-2 font-semibold"
              />
            }
          >
            <UsdMark />
            USD
            <ChevronDown className="size-4" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <UsdMark />
              USD
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          id="send-money-amount"
          inputMode="decimal"
          value={value}
          aria-invalid={!!error}
          aria-describedby={
            error ? "send-money-amount-error" : "send-money-amount-hint"
          }
          className="h-14 min-h-11 border-0 bg-transparent text-right text-2xl font-semibold shadow-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {error ? (
        <p
          id="send-money-amount-error"
          role="alert"
          className="mt-2 text-sm text-destructive"
        >
          {error}
        </p>
      ) : (
        <div
          id="send-money-amount-hint"
          className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground"
        >
          <p>
            Min. {formatTransferAmount(MIN_TRANSFER_AMOUNT)} • Max.{" "}
            {formatTransferAmount(MAX_TRANSFER_AMOUNT)}
          </p>
          <p>
            Available Balance:{" "}
            <span className="font-medium text-primary">
              {formatTransferAmount(availableBalance)}
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
