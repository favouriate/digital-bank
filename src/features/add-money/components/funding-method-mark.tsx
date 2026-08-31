import Image from "next/image";

import { cn } from "@/lib/utils";
import type { FundingMethod } from "../types/add-money";

type FundingMethodMarkProps = {
  method: FundingMethod;
};

function BrandAsset({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={72}
      height={24}
      unoptimized
      className={cn("w-auto shrink-0 object-contain", className)}
      aria-hidden="true"
    />
  );
}

const MARK_SRC: Record<
  FundingMethod["id"],
  { src: string; className: string }
> = {
  "debit-card": { src: "/visa-logo.png", className: "h-5" },
  paypal: { src: "/paypal-logo.png", className: "h-5" },
  "bank-transfer": { src: "/bank-transfer-logo.png", className: "h-7" },
  "credit-card": { src: "/credit-card-logo.png", className: "h-7" },
};

export function FundingMethodMark({ method }: FundingMethodMarkProps) {
  const mark = MARK_SRC[method.id];
  return <BrandAsset src={mark.src} className={mark.className} />;
}
