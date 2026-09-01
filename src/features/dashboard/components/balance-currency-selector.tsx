"use client";

import { CurrencySelect } from "@/components/currency-select";
import type { CurrencyCode } from "@/types/currency";

type BalanceCurrencySelectorProps = {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
  triggerClassName: string;
};

export function BalanceCurrencySelector({
  value,
  onChange,
  triggerClassName,
}: BalanceCurrencySelectorProps) {
  return (
    <CurrencySelect
      value={value}
      onChange={onChange}
      triggerClassName={`h-8 min-h-8 gap-1 px-2 text-sm font-medium ${triggerClassName}`}
      ariaLabel={`Balance currency ${value}. Change display currency`}
    />
  );
}
