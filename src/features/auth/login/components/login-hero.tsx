import Image from "next/image";

import { Shield } from "lucide-react";

type LoginHeroProps = {
  compact?: boolean;
};

export function LoginHero({ compact = false }: LoginHeroProps) {
  return (
    <div className={compact ? "flex flex-col" : "flex min-h-0 flex-1 flex-col"}>
      {!compact ? (
        <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <Shield className="size-3.5" aria-hidden="true" />
          Secure. Simple. Smart.
        </p>
      ) : null}

      {!compact ? (
        <div className="max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground xl:text-4xl">
            Modern banking{" "}
            <span className="text-primary">for your everyday</span>
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground xl:text-base">
            Send money, track spending, and stay in control of your finances
            from one secure place.
          </p>
        </div>
      ) : null}

      <div
        className={
          compact
            ? "relative mx-auto mt-6 w-full max-w-sm"
            : "relative mt-8 min-h-0 w-full max-w-lg flex-1"
        }
      >
        <Image
          src="/loginasset.png"
          alt="OpenPay card and account overview"
          width={1024}
          height={1024}
          priority
          unoptimized
          className={
            compact
              ? "h-auto w-full object-contain"
              : "h-auto max-h-[min(28rem,38vh)] w-full object-contain"
          }
        />
      </div>

      {!compact ? (
        <p className="mt-6 text-sm text-muted-foreground">
          Trusted by 220k+ customers worldwide
        </p>
      ) : null}
    </div>
  );
}
