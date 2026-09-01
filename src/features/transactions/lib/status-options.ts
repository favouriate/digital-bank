import type { TransactionStatusFilter } from "../types/transaction-list";

export const STATUS_FILTER_OPTIONS: {
  value: TransactionStatusFilter;
  label: string;
  tabClassName: string;
}[] = [
  {
    value: "all",
    label: "All",
    tabClassName: "text-foreground data-active:text-primary after:bg-primary",
  },
  {
    value: "completed",
    label: "Successful",
    tabClassName: "text-success data-active:text-success after:bg-success",
  },
  {
    value: "pending",
    label: "Pending",
    tabClassName: "text-warning data-active:text-warning after:bg-warning",
  },
  {
    value: "failed",
    label: "Failed",
    tabClassName:
      "text-destructive data-active:text-destructive after:bg-destructive",
  },
];

export const STATUS_DROPDOWN_LABEL: Record<TransactionStatusFilter, string> = {
  all: "All Status",
  completed: "Successful",
  pending: "Pending",
  failed: "Failed",
};

export function isStatusFilter(
  value: unknown,
): value is TransactionStatusFilter {
  return (
    value === "all" ||
    value === "completed" ||
    value === "pending" ||
    value === "failed"
  );
}
