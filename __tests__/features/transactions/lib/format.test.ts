import {
  formatSignedAmount,
  formatAccountHint,
  formatCurrencyAmount,
  formatMoney,
} from "@/features/transactions/lib/format-amount";
import {
  formatDateRangeLabel,
  formatTransactionDateParts,
  formatTransactionDateTime,
} from "@/features/transactions/lib/format-date";

describe("formatSignedAmount", () => {
  it("formats incoming and outgoing amounts with currency and signs", () => {
    expect(formatSignedAmount(500, "USD")).toBe("+$500.00");
    expect(formatSignedAmount(-800, "USD")).toBe("-$800.00");
    expect(formatSignedAmount(0, "USD")).toBe("$0.00");
    expect(formatSignedAmount(1250.5, "USD")).toBe("+$1,250.50");
  });
});

describe("formatAccountHint", () => {
  it("combines bank name with the last four digits", () => {
    expect(formatAccountHint("GTBank", "**** 6789")).toBe("GTBank •••• 6789");
  });
});

describe("formatCurrencyAmount", () => {
  it("formats an unsigned amount with a currency code", () => {
    expect(formatMoney(500, "USD")).toBe("$500.00");
    expect(formatCurrencyAmount(500, "USD")).toBe("$500.00 USD");
    expect(formatCurrencyAmount(-800, "USD")).toBe("$800.00 USD");
    expect(formatMoney(0, "USD")).toBe("$0.00");
  });
});

describe("transaction date formatting", () => {
  it("formats UTC date and time on separate parts", () => {
    expect(formatTransactionDateParts("2026-09-01T10:42:00.000Z")).toEqual({
      date: "Sep 1, 2026",
      time: "10:42 AM",
    });
  });

  it("joins date and time for mobile", () => {
    expect(formatTransactionDateTime("2026-09-01T10:42:00.000Z")).toBe(
      "Sep 1, 2026 • 10:42 AM",
    );
  });

  it("formats a selected date range", () => {
    expect(formatDateRangeLabel("2026-05-01", "2026-05-31")).toBe(
      "May 1, 2026 - May 31, 2026",
    );
  });
});
