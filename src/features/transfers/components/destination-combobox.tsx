"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import type { TransferDestination } from "../types/destination";

import { CountryFlag } from "./country-flag";

type DestinationComboboxProps = {
  id?: string;
  destinations: TransferDestination[];
  value: TransferDestination | null;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onChange: (destination: TransferDestination) => void;
};

export function DestinationCombobox({
  id,
  destinations,
  value,
  disabled = false,
  isLoading = false,
  isError = false,
  onRetry,
  onChange,
}: DestinationComboboxProps) {
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <Skeleton className="h-12 w-full rounded-lg" />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2">
        <p role="alert" className="text-sm text-destructive">
          We couldn&apos;t load destinations.
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
            aria-label="Destination country and currency"
          />
        }
      >
        {value ? (
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <CountryFlag countryCode={value.countryCode} />
            <span className="truncate">{value.countryName}</span>
          </span>
        ) : (
          <span className="text-muted-foreground">Select country</span>
        )}
        <span className="flex shrink-0 items-center gap-1 text-muted-foreground">
          {value ? (
            <span className="text-sm font-medium text-foreground">
              {value.currencyCode}
            </span>
          ) : null}
          <ChevronsUpDown className="size-4 opacity-50" aria-hidden="true" />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width) p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country or currency" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {destinations.map((destination) => (
                <CommandItem
                  key={destination.countryCode}
                  value={`${destination.countryName} ${destination.currencyCode} ${destination.countryCode}`}
                  data-checked={value?.countryCode === destination.countryCode || undefined}
                  onSelect={() => {
                    onChange(destination);
                    setOpen(false);
                  }}
                >
                  <CountryFlag countryCode={destination.countryCode} />
                  <span className="min-w-0 flex-1 truncate">
                    {destination.countryName} · {destination.currencyCode}
                  </span>
                  <Check
                    className={cn(
                      "size-4",
                      value?.countryCode === destination.countryCode
                        ? "opacity-100"
                        : "opacity-0",
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
