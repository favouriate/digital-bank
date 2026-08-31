"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { FundingMethod, FundingMethodId } from "../types/add-money";

import { FundingMethodMark } from "./funding-method-mark";

type FundingMethodListProps = {
  methods: FundingMethod[];
  value: FundingMethodId;
  onChange: (methodId: FundingMethodId) => void;
};

export function FundingMethodList({
  methods,
  value,
  onChange,
}: FundingMethodListProps) {
  return (
    <section>
      <h2 className="text-base font-semibold text-foreground">
        Select Funding Method
      </h2>
      <RadioGroup
        className="mt-3 gap-3"
        value={value}
        onValueChange={(next) => {
          if (next) {
            onChange(next as FundingMethodId);
          }
        }}
      >
        {methods.map((method) => {
          const selected = method.id === value;

          return (
            <label
              key={method.id}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-border px-3 py-3",
                selected && "border-primary bg-primary/5",
              )}
            >
              <RadioGroupItem value={method.id} className="mt-0.5" />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-foreground">
                    {method.label}
                  </span>
                  {method.recommended ? (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      Recommended
                    </span>
                  ) : null}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {method.description}
                </span>
              </span>
              <FundingMethodMark method={method} />
            </label>
          );
        })}
      </RadioGroup>
    </section>
  );
}
