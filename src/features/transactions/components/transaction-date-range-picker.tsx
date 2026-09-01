"use client";

import { format, parseISO } from "date-fns";
import { CalendarDays } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { formatDateRangeLabel } from "../lib/format-date";

type TransactionDateRangePickerProps = {
  startDate: string | null;
  endDate: string | null;
  onChange: (range: { startDate: string | null; endDate: string | null }) => void;
  className?: string;
};

function toIsoDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function toSelectedRange(
  startDate: string | null,
  endDate: string | null,
): DateRange | undefined {
  if (!startDate) {
    return undefined;
  }

  return {
    from: parseISO(startDate),
    to: endDate ? parseISO(endDate) : parseISO(startDate),
  };
}

export function TransactionDateRangePicker({
  startDate,
  endDate,
  onChange,
  className,
}: TransactionDateRangePickerProps) {
  const label =
    startDate && endDate
      ? formatDateRangeLabel(startDate, endDate)
      : "Select dates";

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            aria-label="Filter by date range"
            className={cn(
              "h-11 min-h-11 min-w-0 justify-start gap-2 rounded-lg px-3 font-normal",
              className,
            )}
          />
        }
      >
        <CalendarDays className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="truncate">{label}</span>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2">
        <Calendar
          mode="range"
          selected={toSelectedRange(startDate, endDate)}
          defaultMonth={startDate ? parseISO(startDate) : undefined}
          numberOfMonths={1}
          onSelect={(range) => {
            if (!range?.from) {
              onChange({ startDate: null, endDate: null });
              return;
            }

            const nextStart = toIsoDate(range.from);
            onChange({
              startDate: nextStart,
              endDate: range.to ? toIsoDate(range.to) : nextStart,
            });
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
