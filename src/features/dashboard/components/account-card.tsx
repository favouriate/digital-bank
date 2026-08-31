import { cn } from "@/lib/utils";
import type { AccountCard as AccountCardData } from "../types/dashboard";

type AccountCardProps = {
  card: AccountCardData;
  className?: string;
};

export function AccountCard({ card, className }: AccountCardProps) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground shadow-xs",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -top-10 -right-8 size-40 rounded-full bg-primary-foreground/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 left-10 size-48 rounded-full bg-primary-foreground/10"
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between">
        <p className="text-sm font-medium text-primary-foreground/80">My Card</p>
        <span className="text-xs font-semibold tracking-[0.2em] text-primary-foreground">
          {card.brand.toUpperCase()}
        </span>
      </div>
      <p className="relative mt-8 text-lg font-semibold">{card.holderName}</p>
      <p className="relative mt-3 font-mono text-sm tracking-widest">
        {card.maskedNumber}
      </p>
      <p className="relative mt-4 text-xs text-primary-foreground/80">
        Exp {card.expiryLabel}
      </p>
    </article>
  );
}
