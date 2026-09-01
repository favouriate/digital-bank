"use client";

import Link from "next/link";
import { ChevronRight, Eye, EyeOff, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CurrencyCode } from "@/types/currency";

import { useDisplayCurrency } from "../hooks/use-display-currency";
import { useExchangeRateQuery } from "../hooks/use-exchange-rate-query";
import { convertFromBase } from "../lib/convert-balance";
import { formatBalance } from "../lib/format-balance";
import { BalanceCurrencySelector } from "./balance-currency-selector";
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
  currency: baseCurrency,
  monthlyChangePercent,
  balanceVisible,
  onToggleVisibility,
}: TotalBalanceCardProps) {
  const { displayCurrency, setDisplayCurrency } =
    useDisplayCurrency(baseCurrency);
  const rateQuery = useExchangeRateQuery(baseCurrency, displayCurrency);

  const rate = rateQuery.rate;
  const showConverted =
    !rateQuery.isIdentity && !rateQuery.isRateError && typeof rate === "number";
  const displayAmount = showConverted
    ? convertFromBase(availableBalance, rate)
    : availableBalance;
  const amountCurrency = showConverted ? displayCurrency : baseCurrency;

  const gradientControlClassName =
    "text-balance-foreground hover:bg-balance-foreground/10 hover:text-balance-foreground focus-visible:ring-balance-foreground/80 focus-visible:ring-offset-0";

  return (
    <Card className="gap-0 rounded-2xl border-0 bg-linear-to-br from-balance-from to-balance-to py-5 text-balance-foreground ring-0">
      <CardContent className="flex flex-col gap-6">
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
              aria-busy={rateQuery.isRateLoading}
              className="min-w-0"
            >
              {rateQuery.isRateLoading ? (
                <>
                  <span className="sr-only">Loading converted balance</span>
                  <Skeleton className="mt-1 h-9 w-44 max-w-full bg-balance-foreground/25" />
                </>
              ) : (
                <p className="text-financial-lg font-semibold tracking-tight wrap-break-word lg:text-financial-xl">
                  {formatBalance(
                    displayAmount,
                    balanceVisible,
                    amountCurrency,
                  )}
                </p>
              )}
            </div>
            {showConverted && !rateQuery.isRateLoading ? (
              <p className="mt-1 text-xs text-balance-foreground/70">
                ≈ {formatBalance(availableBalance, balanceVisible, baseCurrency)}{" "}
                {baseCurrency}
              </p>
            ) : null}
            {rateQuery.isRateError ? (
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-balance-foreground/80">
                <p>
                  Couldn&apos;t load exchange rate. Showing {baseCurrency}{" "}
                  balance.
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  className={`h-8 min-h-8 px-2 text-xs font-medium ${gradientControlClassName}`}
                  onClick={() => {
                    void rateQuery.refetch();
                  }}
                >
                  Retry
                </Button>
              </div>
            ) : null}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <BalanceCurrencySelector
                value={displayCurrency}
                onChange={setDisplayCurrency}
                triggerClassName={gradientControlClassName}
              />
              <span className="inline-flex items-center gap-1 rounded-full bg-balance-foreground/15 px-2.5 py-1 text-xs font-medium text-balance-trend">
                <TrendingUp className="size-3" aria-hidden="true" />
                {formatMonthlyChange(monthlyChangePercent)}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            className={`size-11 min-h-11 min-w-11 shrink-0 ${gradientControlClassName}`}
            aria-label="View wallets"
            render={<Link href="/wallets" />}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </Button>
        </div>
        <QuickActions />
      </CardContent>
    </Card>
  );
}
