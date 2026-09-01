"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useTransactionsQuery } from "../hooks/use-transactions-query";
import { buildTransactionsCsv, downloadCsv } from "../lib/export-csv";
import { listTransactions } from "../services/transaction-service";
import {
  TRANSACTION_PAGE_SIZE,
  type TransactionStatusFilter,
} from "../types/transaction-list";

import { TransactionDateRangePicker } from "./transaction-date-range-picker";
import { TransactionHistoryEmpty } from "./transaction-history-empty";
import { TransactionHistoryError } from "./transaction-history-error";
import { TransactionHistoryFilterControls } from "./transaction-history-filters";
import { TransactionHistoryList } from "./transaction-history-list";
import { TransactionHistoryPagination } from "./transaction-history-pagination";
import { TransactionHistorySkeleton } from "./transaction-history-skeleton";
import { TransactionHistoryTable } from "./transaction-history-table";
import { TransactionHistoryTabs } from "./transaction-history-tabs";
import { TransactionStatusFilterMenu } from "./transaction-status-filter";

export function TransactionHistoryView() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TransactionStatusFilter>("all");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const params = useMemo(
    () => ({
      page,
      pageSize: TRANSACTION_PAGE_SIZE,
      search,
      status,
      startDate,
      endDate,
    }),
    [page, search, status, startDate, endDate],
  );

  const query = useTransactionsQuery(params);
  const hasFilters = Boolean(
    search.trim() || status !== "all" || startDate || endDate,
  );

  function resetPage() {
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    resetPage();
  }

  function handleStatusChange(next: TransactionStatusFilter) {
    setStatus(next);
    resetPage();
  }

  function handleDateChange(range: {
    startDate: string | null;
    endDate: string | null;
  }) {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    resetPage();
  }

  function handleReset() {
    setSearch("");
    setStatus("all");
    setStartDate(null);
    setEndDate(null);
    setPage(1);
  }

  async function handleExport() {
    setIsExporting(true);

    try {
      const result = await listTransactions({
        ...params,
        page: 1,
        pageSize: Math.max(query.data?.totalItems ?? TRANSACTION_PAGE_SIZE, 1),
      });
      downloadCsv(
        "openpay-transactions.csv",
        buildTransactionsCsv(result.items),
      );
    } finally {
      setIsExporting(false);
    }
  }

  if (query.isPending && !query.data) {
    return <TransactionHistorySkeleton />;
  }

  const toolbar = (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <Label htmlFor="transaction-search" className="sr-only">
            Search transactions
          </Label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            id="transaction-search"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search transactions..."
            className="h-11 min-h-11 rounded-lg pl-9"
          />
        </div>
        <TransactionHistoryFilterControls
          mobileOpen={filterSheetOpen}
          onMobileOpenChange={setFilterSheetOpen}
          startDate={startDate}
          endDate={endDate}
          status={status}
          onDateChange={handleDateChange}
          onStatusChange={handleStatusChange}
          onReset={handleReset}
        />
      </div>
      <div className="flex gap-2">
        <TransactionDateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          className="min-w-0 flex-1"
        />
        <TransactionStatusFilterMenu
          value={status}
          onChange={handleStatusChange}
          className="w-[9.5rem] shrink-0 sm:w-40"
        />
      </div>
    </div>
  );

  const exportButton = (
    <Button
      type="button"
      variant="outline"
      className="h-11 min-h-11 gap-2 rounded-lg"
      onClick={() => void handleExport()}
      disabled={isExporting}
      aria-label="Export transactions"
    >
      <Download className="size-4" aria-hidden="true" />
      <span className="hidden sm:inline">Export</span>
    </Button>
  );

  return (
    <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden">
      <div className="relative flex items-center justify-between lg:hidden">
        <Link
          href="/"
          aria-label="Back to dashboard"
          className="inline-flex size-11 items-center justify-center rounded-lg text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Link>
        <h1 className="pointer-events-none absolute inset-x-12 text-center text-base font-semibold text-foreground">
          Transaction History
        </h1>
        {exportButton}
      </div>

      <div className="hidden items-start justify-between gap-4 lg:flex">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
            Transaction History
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage all your transactions.
          </p>
        </div>
        {exportButton}
      </div>

      {toolbar}

      <TransactionHistoryTabs value={status} onChange={handleStatusChange} />

      {query.isError ? (
        <TransactionHistoryError onRetry={() => void query.refetch()} />
      ) : !query.data || query.data.totalItems === 0 ? (
        <TransactionHistoryEmpty
          filtered={hasFilters}
          onReset={hasFilters ? handleReset : undefined}
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-border bg-card lg:block">
            <TransactionHistoryTable transactions={query.data.items} />
          </div>
          <div className="lg:hidden">
            <TransactionHistoryList transactions={query.data.items} />
          </div>
          <TransactionHistoryPagination
            page={query.data.page}
            pageSize={query.data.pageSize}
            totalItems={query.data.totalItems}
            totalPages={query.data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
