"use client";

import { Eye, EyeOff, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CurrencyCode } from "@/types/currency";

import { formatBalance } from "../lib/format-balance";
import { QuickActions } from "./quick-actions";

type TotalBalanceCardProps = {
  availableBalance: number;
  currency: CurrencyCode;
  monthlyChangePercent: number;
  balanceVisible: boolean;
  onToggleVisibility: () => void;
};

function formatMonthlyChange(percent: number) {
  const sign = percent >= 0 ? "+" : "";
  return `${sign}${percent.toFixed(1)}% this month`;
}

export function TotalBalanceCard({
  availableBalance,
  monthlyChangePercent,
  balanceVisible,
  onToggleVisibility,
}: TotalBalanceCardProps) {
  const gradientControlClassName =
    "text-balance-foreground hover:bg-balance-foreground/10 hover:text-balance-foreground focus-visible:ring-balance-foreground/80 focus-visible:ring-offset-0";

  return (
    <Card className="gap-0 rounded-2xl border-0 bg-linear-to-br from-balance-from to-balance-to py-5 text-balance-foreground ring-0 lg:py-3">
      <CardContent className="flex flex-col gap-6 lg:gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium text-balance-foreground/85">
                Total Balance
              </p>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className={`size-11 min-h-11 min-w-11 ${gradientControlClassName}`}
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
            <div
              aria-live="polite"
              className="min-w-0"
            >
              <p className="text-financial-lg font-semibold tracking-tight wrap-break-word lg:text-financial-xl">
                {formatBalance(availableBalance, balanceVisible, "NGN")}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-balance-foreground/15 px-2.5 py-1 text-xs font-medium text-balance-trend">
                <TrendingUp className="size-3" aria-hidden="true" />
                {formatMonthlyChange(monthlyChangePercent)}
              </span>
            </div>
          </div>
        </div>
        <QuickActions />
      </CardContent>
    </Card>
  );
}
