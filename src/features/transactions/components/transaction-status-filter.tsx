"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import {
  isStatusFilter,
  STATUS_DROPDOWN_LABEL,
  STATUS_FILTER_OPTIONS,
} from "../lib/status-options";
import type { TransactionStatusFilter } from "../types/transaction-list";

type TransactionStatusFilterMenuProps = {
  value: TransactionStatusFilter;
  onChange: (status: TransactionStatusFilter) => void;
  className?: string;
};

export function TransactionStatusFilterMenu({
  value,
  onChange,
  className,
}: TransactionStatusFilterMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            aria-label="Filter by status"
            className={cn(
              "h-11 min-h-11 min-w-0 justify-between gap-2 rounded-lg px-3 font-normal",
              className,
            )}
          />
        }
      >
        <span className="truncate">{STATUS_DROPDOWN_LABEL[value]}</span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(next) => {
            if (isStatusFilter(next)) {
              onChange(next);
            }
          }}
        >
          {STATUS_FILTER_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {STATUS_DROPDOWN_LABEL[option.value]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
