"use client";

import Link from "next/link";
import { ArrowDownToLine, ArrowLeftRight, Send } from "lucide-react";

import { useStartTransfer } from "../hooks/use-start-transfer";

const tileClassName =
  "flex min-h-11 w-full flex-col items-center justify-center gap-1.5 rounded-xl bg-balance-foreground/15 px-1 py-3 text-balance-foreground transition-colors hover:bg-balance-foreground/25 focus-visible:ring-balance-foreground/80 focus-visible:ring-offset-0";

export function QuickActions() {
  const startTransfer = useStartTransfer();

  return (
    <nav aria-label="Quick actions">
      <ul className="grid grid-cols-3 gap-2 sm:gap-3">
        <li>
          <button
            type="button"
            className={tileClassName}
            onClick={() => startTransfer({ resolvedRecipient: null })}
          >
            <Send className="size-5" aria-hidden="true" />
            <span className="text-center text-[0.7rem] leading-tight font-medium sm:text-xs">
              Send Money
            </span>
          </button>
        </li>
        <li>
          <Link href="/transactions?type=receive" className={tileClassName}>
            <ArrowDownToLine className="size-5" aria-hidden="true" />
            <span className="text-center text-[0.7rem] leading-tight font-medium sm:text-xs">
              Receive
            </span>
          </Link>
        </li>
        <li>
          <Link href="/transactions" className={tileClassName}>
            <ArrowLeftRight className="size-5" aria-hidden="true" />
            <span className="text-center text-[0.7rem] leading-tight font-medium sm:text-xs">
              Transactions
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
