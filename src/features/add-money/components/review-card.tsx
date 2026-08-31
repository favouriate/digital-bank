import { ChevronDown, Info } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FundingMethod } from "../types/add-money";

import { formatAddMoneyAmount } from "../lib/format";
import { FundingMethodMark } from "./funding-method-mark";

type ReviewCardProps = {
  method: FundingMethod | null;
  amount: number | null;
  collapsible?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
};

export function ReviewCard({
  method,
  amount,
  collapsible = false,
  expanded = true,
  onToggle,
}: ReviewCardProps) {
  const total = amount ?? 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        {collapsible ? (
          <button
            type="button"
            className="flex min-h-11 w-full items-center justify-between text-left"
            aria-expanded={expanded}
            onClick={onToggle}
          >
            <CardTitle>Review Transaction</CardTitle>
            <ChevronDown
              className={cn(
                "size-5 text-muted-foreground transition-transform",
                expanded && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
        ) : (
          <CardTitle>Review Transaction</CardTitle>
        )}
      </CardHeader>
      {expanded ? (
        <CardContent className="flex flex-col gap-3 pb-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">Funding method</p>
            {method ? (
              <div className="flex min-w-0 items-center gap-2">
                <FundingMethodMark method={method} />
                <p className="truncate text-sm font-medium">
                  {method.accountMask ?? method.label}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a method</p>
            )}
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-sm font-medium">
              {amount ? formatAddMoneyAmount(amount) : "—"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              Processing fee
              <Info className="size-3.5" aria-hidden="true" />
            </p>
            <p className="text-sm font-semibold text-success">FREE</p>
          </div>
          <div className="flex items-end justify-between gap-3 border-t border-border pt-3">
            <div>
              <p className="text-sm font-medium">Total</p>
              <p className="text-xs text-muted-foreground">You will receive</p>
            </div>
            <p className="text-financial-md font-semibold text-primary">
              {formatAddMoneyAmount(total)}
            </p>
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}
