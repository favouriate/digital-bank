"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatBalance } from "../lib/format-balance";
import { QuickActions } from "./quick-actions";

type TotalBalanceCardProps = {
  availableBalance: number;
  currency: "USD";
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
  currency,
  monthlyChangePercent,
  balanceVisible,
  onToggleVisibility,
}: TotalBalanceCardProps) {
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
            <p className="text-financial-lg font-semibold tracking-tight lg:text-financial-xl">
              {formatBalance(availableBalance, balanceVisible)}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      className={`h-8 min-h-8 gap-1 px-2 text-sm font-medium ${gradientControlClassName}`}
                      aria-label={`Account currency ${currency}`}
                    />
                  }
                >
                  {currency}
                  <ChevronDown className="size-3.5" aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>{currency}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
