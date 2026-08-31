"use client";

import Link from "next/link";
import { Eye, EyeOff, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { formatBalance } from "../lib/format-balance";

type BalanceBlockProps = {
  availableBalance: number;
  balanceVisible: boolean;
  onToggleVisibility: () => void;
};

export function BalanceBlock({
  availableBalance,
  balanceVisible,
  onToggleVisibility,
}: BalanceBlockProps) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Available Balance</p>
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
        </div>
        <p className="text-financial-lg font-semibold tracking-tight text-foreground">
          {formatBalance(availableBalance, balanceVisible)}
        </p>
      </div>
      <Button
        variant="secondary"
        nativeButton={false}
        className="h-11 min-h-11 rounded-lg"
        render={<Link href="/wallets" />}
      >
        <Plus className="size-4" aria-hidden="true" />
        Add Money
      </Button>
    </div>
  );
}
