"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Download, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/types/transaction";

import { useTransactionQuery } from "../hooks/use-transaction-query";
import { downloadTransactionReceipt } from "../lib/transaction-details";

import { TransactionDetailsError } from "./transaction-details-error";
import { TransactionDetailsHelp } from "./transaction-details-help";
import { TransactionDetailsInfo } from "./transaction-details-info";
import { TransactionDetailsLocation } from "./transaction-details-location";
import { TransactionDetailsNotFound } from "./transaction-details-not-found";
import { TransactionDetailsParty } from "./transaction-details-party";
import { TransactionDetailsSkeleton } from "./transaction-details-skeleton";
import { TransactionDetailsSummary } from "./transaction-details-summary";

type TransactionDetailsViewProps = {
  transactionId: string;
};

async function shareTransactionUrl() {
  const url = window.location.href;

  if (typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: "Transaction Details",
        url,
      });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "cancelled";
      }
    }
  }

  await navigator.clipboard.writeText(url);
  return "copied";
}

function DownloadReceiptButton({
  transaction,
  className,
  variant = "default",
}: {
  transaction: Transaction;
  className?: string;
  variant?: "default" | "outline";
}) {
  return (
    <Button
      type="button"
      variant={variant}
      className={cn("h-11 min-h-11 gap-2 rounded-lg", className)}
      onClick={() => downloadTransactionReceipt(transaction)}
    >
      <Download className="size-4" aria-hidden="true" />
      Download Receipt
    </Button>
  );
}

export function TransactionDetailsView({
  transactionId,
}: TransactionDetailsViewProps) {
  const query = useTransactionQuery(transactionId);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  async function handleShare() {
    try {
      const result = await shareTransactionUrl();

      if (result === "copied") {
        setShareStatus("Link copied");
      } else {
        setShareStatus(null);
      }
    } catch {
      setShareStatus("Unable to share");
    }
  }

  if (query.isPending) {
    return <TransactionDetailsSkeleton />;
  }

  if (query.isError) {
    return (
      <TransactionDetailsError onRetry={() => void query.refetch()} />
    );
  }

  if (!query.data) {
    return <TransactionDetailsNotFound />;
  }

  const transaction = query.data;

  return (
    <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden">
      <p className="sr-only" aria-live="polite">
        {shareStatus}
      </p>

      <div className="relative flex items-center justify-between lg:hidden">
        <Link
          href="/transactions"
          aria-label="Back to transactions"
          className="inline-flex size-11 items-center justify-center rounded-lg text-primary outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Link>
        <h1 className="pointer-events-none absolute inset-x-12 text-center text-base font-semibold text-foreground">
          Transaction Details
        </h1>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 text-primary"
          aria-label="Share transaction"
          onClick={() => void handleShare()}
        >
          <Share2 className="size-5" aria-hidden="true" />
        </Button>
      </div>

      <nav
        aria-label="Breadcrumb"
        className="hidden text-sm lg:block"
      >
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              href="/transactions"
              className="font-medium text-primary hover:underline"
            >
              Transactions
            </Link>
          </li>
          <li className="text-muted-foreground" aria-hidden="true">
            <ChevronRight className="size-3.5" />
          </li>
          <li className="text-muted-foreground">Transaction Details</li>
        </ol>
      </nav>

      <div className="hidden items-start justify-between gap-4 lg:flex">
        <div className="flex min-w-0 items-start gap-3">
          <Link
            href="/transactions"
            aria-label="Back to transactions"
            className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
              Transaction Details
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View the details of this transaction.
            </p>
          </div>
        </div>
        <DownloadReceiptButton transaction={transaction} variant="outline" />
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
        <div className="order-2 lg:order-none lg:col-span-7">
          <TransactionDetailsInfo transaction={transaction} />
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-none lg:col-span-5">
          <TransactionDetailsSummary transaction={transaction} />
          <div className="hidden flex-col gap-6 lg:flex">
            <TransactionDetailsParty transaction={transaction} />
            <TransactionDetailsLocation transaction={transaction} />
            <TransactionDetailsHelp />
          </div>
        </div>

        <div className="order-3 flex flex-col gap-6 lg:hidden">
          <TransactionDetailsParty transaction={transaction} />
          <TransactionDetailsLocation transaction={transaction} />
          <TransactionDetailsHelp />
          <DownloadReceiptButton
            transaction={transaction}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
