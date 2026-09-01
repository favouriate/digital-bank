"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { TransferBank } from "../types/destination";

type BankComboboxProps = {
  id?: string;
  banks: TransferBank[];
  value: TransferBank | null;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onChange: (bank: TransferBank) => void;
};

export function BankCombobox({
  id,
  banks,
  value,
  disabled = false,
  isLoading = false,
  isError = false,
  onRetry,
  onChange,
}: BankComboboxProps) {
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <Skeleton className="h-12 w-full rounded-lg" />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
        <p role="alert" className="text-sm text-destructive">
          We couldn&apos;t load banks.
        </p>
        {onRetry ? (
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            className="h-12 min-h-11 w-full justify-between font-normal"
            aria-label="Destination bank"
          />
        }
      >
        {value ? (
          <span className="flex min-w-0 items-center gap-2">
            <Landmark className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="truncate">{value.name}</span>
          </span>
        ) : (
          <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
            <Landmark className="size-4 shrink-0" aria-hidden="true" />
            Select bank
          </span>
        )}
        <ChevronsUpDown className="size-4 shrink-0 opacity-50" aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width) p-0" align="start">
        <Command>
          <CommandInput placeholder="Search bank" />
          <CommandList>
            <CommandEmpty>No bank found.</CommandEmpty>
            <CommandGroup>
              {banks.map((bank) => (
                <CommandItem
                  key={bank.id}
                  value={`${bank.name} ${bank.id}`}
                  data-checked={value?.id === bank.id || undefined}
                  onSelect={() => {
                    onChange(bank);
                    setOpen(false);
                  }}
                >
                  <span className="min-w-0 flex-1 truncate">{bank.name}</span>
                  <Check
                    className={cn(
                      "size-4",
                      value?.id === bank.id ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden="true"
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
