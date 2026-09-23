"use client";

import Link from "next/link";
import { ArrowDownToLine, ArrowLeftRight, Plus, Send } from "lucide-react";

import { useStartTransfer } from "../hooks/use-start-transfer";

const tileClassName =
  "flex h-24 w-full min-w-0 flex-col items-center justify-center gap-2 rounded-xl bg-balance-foreground/15 px-1 text-balance-foreground transition-colors hover:bg-balance-foreground/25 focus-visible:ring-balance-foreground/80 focus-visible:ring-offset-0 sm:h-20 lg:h-16";

const labelClassName =
  "block max-w-full text-center text-[0.65rem] leading-tight font-medium break-words sm:text-xs";

export function QuickActions() {
  const startTransfer = useStartTransfer();

  return (
    <nav aria-label="Quick actions">
      <ul className="grid grid-cols-4 gap-2 sm:gap-3">
        <li className="min-w-0">
          <button
            type="button"
            className={tileClassName}
            onClick={() => startTransfer({ resolvedRecipient: null })}
          >
            <Send className="size-6 shrink-0" aria-hidden="true" />
            <span className={labelClassName}>
              Send Money
            </span>
          </button>
        </li>
        <li className="min-w-0">
          <Link href="/transactions?type=receive" className={tileClassName}>
            <ArrowDownToLine className="size-6 shrink-0" aria-hidden="true" />
            <span className={labelClassName}>
              Receive
            </span>
          </Link>
        </li>
        <li className="min-w-0">
          <Link href="/add-money" className={tileClassName}>
            <Plus className="size-6 shrink-0" aria-hidden="true" />
            <span className={labelClassName}>
              Add Money
            </span>
          </Link>
        </li>
        <li className="min-w-0">
          <Link href="/transactions" className={tileClassName}>
            <ArrowLeftRight className="size-6 shrink-0" aria-hidden="true" />
            <span className={labelClassName}>
              Transactions
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
