"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Plus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Contact } from "@/types/contact";

import { useStartTransfer } from "../hooks/use-start-transfer";
import { formatBalance } from "../lib/format-balance";
import { amountSchema } from "../schemas/amount-schema";
import type { AccountSummary } from "../types/dashboard";

type SendMoneyCardProps = {
  account: AccountSummary;
  contacts: Contact[];
  balanceVisible: boolean;
  onToggleVisibility?: () => void;
};

export function SendMoneyCard({
  account,
  contacts,
  balanceVisible,
  onToggleVisibility,
}: SendMoneyCardProps) {
  const startTransfer = useStartTransfer();
  const defaultRecipient = contacts[0] ?? null;
  const [recipient, setRecipient] = useState<Contact | null>(defaultRecipient);
  const [amount, setAmount] = useState("800.00");
  const [error, setError] = useState<string | null>(null);

  function selectNextRecipient() {
    if (contacts.length === 0) {
      return;
    }

    const currentIndex = recipient
      ? contacts.findIndex((contact) => contact.id === recipient.id)
      : -1;
    const next = contacts[(currentIndex + 1) % contacts.length];
    setRecipient(next);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = amountSchema.safeParse(amount);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid amount");
      return;
    }

    setError(null);
    startTransfer({
      recipientId: recipient?.id ?? null,
      amount: parsed.data,
    });
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Send Money</h2>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-muted px-3 py-2.5">
            <div>
              <p className="text-sm font-medium text-foreground">{account.sourceLabel}</p>
              <p className="text-xs text-muted-foreground">Source</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-foreground">
                {formatBalance(account.availableBalance, balanceVisible)}
              </p>
              {onToggleVisibility ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="size-11 min-h-11 min-w-11"
                  aria-pressed={balanceVisible}
                  aria-label={balanceVisible ? "Hide balance" : "Show balance"}
                  onClick={onToggleVisibility}
                >
                  {balanceVisible ? (
                    <Eye className="size-4" aria-hidden="true" />
                  ) : (
                    <EyeOff className="size-4" aria-hidden="true" />
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="send-money-amount">Enter the amount</Label>
            <Input
              id="send-money-amount"
              inputMode="decimal"
              value={amount}
              aria-invalid={!!error}
              className="h-12 min-h-11 text-lg font-semibold"
              onChange={(event) => {
                setAmount(event.target.value);
                setError(null);
              }}
            />
            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            {recipient ? (
              <div className="flex min-w-0 items-center gap-2">
                <Avatar size="sm">
                  <AvatarFallback>{recipient.initials}</AvatarFallback>
                </Avatar>
                <p className="truncate text-sm font-medium">{recipient.name}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recipient selected</p>
            )}
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="size-11 min-h-11 min-w-11 rounded-full"
              aria-label="Choose next recipient"
              onClick={selectNextRecipient}
            >
              <Plus className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <Button type="submit" className="h-12 min-h-12 w-full rounded-lg text-base">
            Send Money
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
