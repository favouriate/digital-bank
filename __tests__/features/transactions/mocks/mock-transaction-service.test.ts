import { MOCK_TRANSACTION_COUNT, mockTransactions } from "@/mocks/transactions";
import { filterMockTransactions } from "@/features/transactions/mocks/mock-transaction-service";
import { listTransactions, getTransactionById } from "@/features/transactions/services/transaction-service";
import { TRANSACTION_PAGE_SIZE } from "@/features/transactions/types/transaction-list";

const defaultParams = {
  page: 1,
  pageSize: TRANSACTION_PAGE_SIZE,
  search: "",
  status: "all" as const,
  type: "all" as const,
  startDate: null,
  endDate: null,
};

describe("mock transaction list", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("seeds a deterministic catalog of 134 transactions", () => {
    expect(mockTransactions).toHaveLength(MOCK_TRANSACTION_COUNT);
    expect(mockTransactions[0]?.counterparty).toBe("David Morris");
    expect(mockTransactions[0]?.note).toBe("Payment for lunch");
    expect(mockTransactions[0]?.counterpartyEmail).toBe(
      "david.morris@email.com",
    );
    expect(mockTransactions[1]?.counterparty).toBe("Astrid Hayes");
  });

  it("returns the first page with Figma-sized pagination", async () => {
    const promise = listTransactions(defaultParams);
    await jest.advanceTimersByTimeAsync(450);
    const result = await promise;

    expect(result.totalItems).toBe(MOCK_TRANSACTION_COUNT);
    expect(result.totalPages).toBe(20);
    expect(result.items).toHaveLength(TRANSACTION_PAGE_SIZE);
    expect(result.items[0]?.id).toBe("txn-david-500");
    expect(result.page).toBe(1);
  });

  it("filters by status", () => {
    const pending = filterMockTransactions({
      search: "",
      status: "pending",
      startDate: null,
      endDate: null,
    });
    const failed = filterMockTransactions({
      search: "",
      status: "failed",
      startDate: null,
      endDate: null,
    });

    expect(pending.length).toBeGreaterThan(0);
    expect(pending.every((item) => item.status === "pending")).toBe(true);
    expect(failed.every((item) => item.status === "failed")).toBe(true);
  });

  it("filters to money received", () => {
    const received = filterMockTransactions({
      search: "",
      status: "all",
      type: "receive",
      startDate: null,
      endDate: null,
    });

    expect(received.length).toBeGreaterThan(0);
    expect(received.every((item) => item.type === "receive")).toBe(true);
    expect(received.some((item) => item.id === "txn-david-500")).toBe(true);
  });

  it("matches search case-insensitively across description, bank, and reference", () => {
    const byName = filterMockTransactions({
      search: "  david morris ",
      status: "all",
      startDate: null,
      endDate: null,
    });
    const byBank = filterMockTransactions({
      search: "gtbank",
      status: "all",
      startDate: null,
      endDate: null,
    });
    const byReference = filterMockTransactions({
      search: "op-104821",
      status: "all",
      startDate: null,
      endDate: null,
    });

    expect(byName.map((item) => item.id)).toEqual(["txn-david-500"]);
    expect(byBank.some((item) => item.id === "txn-david-500")).toBe(true);
    expect(byReference.map((item) => item.id)).toEqual(["txn-david-500"]);
  });

  it("filters by inclusive UTC date range", () => {
    const ranged = filterMockTransactions({
      search: "",
      status: "all",
      startDate: "2026-08-31",
      endDate: "2026-09-01",
    });

    expect(ranged.map((item) => item.id)).toEqual([
      "txn-david-500",
      "txn-astrid-800",
      "txn-electricity-120",
    ]);
  });

  it("throws when the demo load-error query is used", async () => {
    const promise = listTransactions({
      ...defaultParams,
      search: "fail-load",
    });
    const assertion = expect(promise).rejects.toThrow(
      "Unable to load transactions.",
    );

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });
});

describe("getTransactionById", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns the matching transaction", async () => {
    const promise = getTransactionById("txn-david-500");
    await jest.advanceTimersByTimeAsync(450);
    const result = await promise;

    expect(result?.id).toBe("txn-david-500");
    expect(result?.counterparty).toBe("David Morris");
    expect(result?.note).toBe("Payment for lunch");
  });

  it("returns null when the id is missing", async () => {
    const promise = getTransactionById("not-a-real-id");
    await jest.advanceTimersByTimeAsync(450);
    await expect(promise).resolves.toBeNull();
  });

  it("throws when the demo load-error id is used", async () => {
    const promise = getTransactionById("fail-load");
    const assertion = expect(promise).rejects.toThrow(
      "Unable to load transaction.",
    );

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });
});
