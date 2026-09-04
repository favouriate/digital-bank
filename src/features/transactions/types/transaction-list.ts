import type {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/types/transaction";

export const TRANSACTION_PAGE_SIZE = 7;

export const TRANSACTION_LOAD_ERROR_QUERY = "fail-load";

export const TRANSACTION_DETAIL_LOAD_ERROR_ID = "fail-load";

export type TransactionStatusFilter = "all" | TransactionStatus;

export type TransactionTypeFilter = "all" | TransactionType;

export type TransactionListParams = {
  page: number;
  pageSize: number;
  search: string;
  status: TransactionStatusFilter;
  type: TransactionTypeFilter;
  startDate: string | null;
  endDate: string | null;
};

export function parseTransactionTypeFilter(
  value: string | null,
): TransactionTypeFilter {
  return value === "receive" ? "receive" : "all";
}

export type TransactionListResult = {
  items: Transaction[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
