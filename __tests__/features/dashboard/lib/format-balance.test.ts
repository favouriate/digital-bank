import { formatBalance, formatSignedChange } from "@/features/dashboard/lib/format-balance";

describe("formatBalance", () => {
  it("formats a visible USD balance", () => {
    expect(formatBalance(10680, true)).toBe("$10,680.00");
  });

  it("formats a visible NGN balance", () => {
    expect(formatBalance(16_554_000, true, "NGN")).toBe(
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(16_554_000),
    );
  });

  it("masks a hidden balance in any currency", () => {
    expect(formatBalance(10680, false)).toBe("••••••");
    expect(formatBalance(16_554_000, false, "NGN")).toBe("••••••");
  });
});

describe("formatSignedChange", () => {
  it("formats a positive percent with a comma decimal", () => {
    expect(formatSignedChange(6.79)).toBe("+6,79%");
  });
});
