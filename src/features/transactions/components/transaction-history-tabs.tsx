"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { isStatusFilter, STATUS_FILTER_OPTIONS } from "../lib/status-options";
import type { TransactionStatusFilter } from "../types/transaction-list";

type TransactionHistoryTabsProps = {
  value: TransactionStatusFilter;
  onChange: (status: TransactionStatusFilter) => void;
};

export function TransactionHistoryTabs({
  value,
  onChange,
}: TransactionHistoryTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => {
        if (isStatusFilter(next)) {
          onChange(next);
        }
      }}
      className="gap-0 border-b border-border"
    >
      <TabsList
        variant="line"
        className="h-auto w-full justify-start gap-0 rounded-none bg-transparent p-0"
      >
        {STATUS_FILTER_OPTIONS.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className={cn(
              "h-11 flex-none rounded-none px-4 text-sm font-medium",
              option.tabClassName,
            )}
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
