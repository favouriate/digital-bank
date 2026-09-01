"use client";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type { TransactionStatusFilter } from "../types/transaction-list";

import { TransactionDateRangePicker } from "./transaction-date-range-picker";
import { TransactionStatusFilterMenu } from "./transaction-status-filter";

type FilterFieldsProps = {
  startDate: string | null;
  endDate: string | null;
  status: TransactionStatusFilter;
  onDateChange: (range: { startDate: string | null; endDate: string | null }) => void;
  onStatusChange: (status: TransactionStatusFilter) => void;
  onReset: () => void;
};

function FilterFields({
  startDate,
  endDate,
  status,
  onDateChange,
  onStatusChange,
  onReset,
}: FilterFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Date range</Label>
        <TransactionDateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={onDateChange}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <TransactionStatusFilterMenu
          value={status}
          onChange={onStatusChange}
          className="w-full"
        />
      </div>
      <Button type="button" variant="outline" className="h-11 min-h-11" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}

type TransactionHistoryFilterControlsProps = FilterFieldsProps & {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

export function TransactionHistoryFilterControls({
  mobileOpen,
  onMobileOpenChange,
  ...fields
}: TransactionHistoryFilterControlsProps) {
  return (
    <>
      <div className="hidden lg:block">
        <Popover>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                aria-label="Open filters"
                className="h-11 min-h-11 gap-2 rounded-lg px-3"
              />
            }
          >
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Filters
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 p-4">
            <FilterFields {...fields} />
          </PopoverContent>
        </Popover>
      </div>

      <Button
        type="button"
        variant="outline"
        aria-label="Open filters"
        className="h-11 min-h-11 shrink-0 gap-2 rounded-lg px-3 lg:hidden"
        onClick={() => onMobileOpenChange(true)}
      >
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Filters</span>
      </Button>

      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Narrow transactions by date and status.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-2">
            <FilterFields {...fields} />
          </div>
          <SheetFooter>
            <Button
              type="button"
              className="h-11 min-h-11"
              onClick={() => onMobileOpenChange(false)}
            >
              Done
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
