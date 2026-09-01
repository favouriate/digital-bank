"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CountryFlag } from "@/features/transfers/components/country-flag";
import { DISPLAY_CURRENCIES, isCurrencyCode } from "@/lib/currency";
import type { CurrencyCode } from "@/types/currency";

type CurrencySelectProps = {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
  triggerClassName?: string;
  ariaLabel?: string;
};

export function CurrencySelect({
  value,
  onChange,
  triggerClassName,
  ariaLabel,
}: CurrencySelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            className={triggerClassName}
            aria-label={
              ariaLabel ?? `Currency ${value}. Change currency`
            }
          />
        }
      >
        {value}
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-max min-w-56">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(next) => {
            if (isCurrencyCode(next)) {
              onChange(next);
              setOpen(false);
            }
          }}
        >
          {DISPLAY_CURRENCIES.map((currency) => (
            <DropdownMenuRadioItem
              key={currency.code}
              value={currency.code}
              className="min-h-11 gap-2"
              aria-label={`${currency.name} ${currency.code}`}
            >
              <CountryFlag countryCode={currency.countryCode} />
              <span className="flex min-w-0 flex-1 flex-col items-start leading-tight">
                <span>{currency.name}</span>
                <span className="text-xs text-muted-foreground">
                  {currency.code}
                </span>
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
