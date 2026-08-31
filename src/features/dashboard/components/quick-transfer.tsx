"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, LayoutGrid, ArrowDownLeft, Plus, Send } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Contact } from "@/types/contact";

import { useStartTransfer } from "../hooks/use-start-transfer";
import { formatBalance } from "../lib/format-balance";
import { amountSchema } from "../schemas/amount-schema";
import type { AccountSummary } from "../types/dashboard";

type QuickTransferProps = {
  account: AccountSummary;
  contacts: Contact[];
  balanceVisible: boolean;
  variant: "desktop" | "mobile";
};

const desktopActions = [
  { href: "/transfers", label: "Send", icon: Send },
  { href: "/wallets", label: "Receive", icon: ArrowDownLeft },
  { href: "/invoices", label: "Invoicing", icon: FileText },
  { href: "/activity", label: "More", icon: LayoutGrid },
] as const;

export function QuickTransfer({
  account,
  contacts,
  balanceVisible,
  variant,
}: QuickTransferProps) {
  const startTransfer = useStartTransfer();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const people = contacts.slice(0, 4);

  function continueWith(contact?: Contact) {
    const parsed = amount.trim() ? amountSchema.safeParse(amount) : null;

    if (parsed && !parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Enter a valid amount");
      return;
    }

    startTransfer({
      recipientId: contact?.id ?? null,
      amount: parsed?.data ?? null,
    });
  }

  if (variant === "mobile") {
    return (
      <section aria-labelledby="quick-transfer-heading">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id="quick-transfer-heading" className="text-base font-semibold">
            Quick Transfer
          </h2>
          <Link
            href="/transfers"
            className="text-sm font-medium text-primary hover:underline"
          >
            See all
          </Link>
        </div>
        {people.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent contacts. Recipients you send money to will appear here.
          </p>
        ) : (
          <ul className="flex gap-4 overflow-x-auto pb-1">
            {people.map((contact) => (
              <li key={contact.id} className="shrink-0">
                <button
                  type="button"
                  className="flex min-h-11 w-16 flex-col items-center gap-2"
                  aria-label={`Send money to ${contact.name}`}
                  onClick={() => continueWith(contact)}
                >
                  <Avatar>
                    <AvatarFallback>{contact.initials}</AvatarFallback>
                  </Avatar>
                  <span className="w-full truncate text-center text-xs font-medium">
                    {contact.name.split(" ")[0]}
                  </span>
                </button>
              </li>
            ))}
            <li className="shrink-0">
              <Link
                href="/transfers"
                aria-label="See all recipients"
                className="flex min-h-11 w-16 flex-col items-center gap-2"
              >
                <span className="flex size-8 items-center justify-center rounded-full border border-dashed border-border">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
                <span className="text-xs font-medium">Add</span>
              </Link>
            </li>
          </ul>
        )}
      </section>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Transfer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm">
          <p className="font-medium">{account.sourceLabel}</p>
          <p className="text-muted-foreground">
            {formatBalance(account.availableBalance, balanceVisible)}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quick-transfer-amount">Enter amount</Label>
          <div className="relative">
            <Input
              id="quick-transfer-amount"
              inputMode="decimal"
              placeholder="$0.00"
              value={amount}
              aria-invalid={!!error}
              className="h-12 min-h-11 pr-24 font-semibold"
              onChange={(event) => {
                setAmount(event.target.value);
                setError(null);
              }}
            />
            <div className="absolute top-1/2 right-2 flex -translate-y-1/2">
              {people.slice(0, 2).map((contact, index) => (
                <Avatar
                  key={contact.id}
                  size="sm"
                  className={cn(index > 0 && "-ml-2")}
                >
                  <AvatarFallback>{contact.initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {desktopActions.map((action) => {
            const Icon = action.icon;
            const isSend = action.href === "/transfers";

            if (isSend) {
              return (
                <Button
                  key={action.label}
                  type="button"
                  variant="outline"
                  className="h-auto min-h-11 flex-col gap-1 py-2"
                  onClick={() => continueWith(people[0])}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="text-xs">{action.label}</span>
                </Button>
              );
            }

            return (
              <Button
                key={action.label}
                variant="outline"
                nativeButton={false}
                className="h-auto min-h-11 flex-col gap-1 py-2"
                render={<Link href={action.href} />}
              >
                <Icon className="size-4" aria-hidden="true" />
                <span className="text-xs">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
