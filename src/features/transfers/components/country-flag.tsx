"use client";

import { CircleFlag } from "react-circle-flags";

import { cn } from "@/lib/utils";

type CountryFlagProps = {
  countryCode: string;
  className?: string;
  size?: number;
};

export function CountryFlag({
  countryCode,
  className,
  size = 20,
}: CountryFlagProps) {
  return (
    <CircleFlag
      countryCode={countryCode.toLowerCase()}
      width={size}
      height={size}
      alt=""
      title=""
      className={cn("size-5 shrink-0 rounded-full", className)}
      aria-hidden="true"
    />
  );
}
