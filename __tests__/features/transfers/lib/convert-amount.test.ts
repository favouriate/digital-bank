import {
  destFromUsd,
  resolveTransferCurrency,
  usdFromDest,
} from "@/features/transfers/lib/convert-amount";

describe("convert-amount", () => {
  it("converts the USD wallet into NGN with the mock rate", () => {
    expect(destFromUsd(10680, "NGN")).toBe(16_554_000);
  });

  it("converts a destination amount back to USD", () => {
    expect(usdFromDest(1550, "NGN")).toBe(1);
  });

  it("falls back to USD when the code is missing", () => {
    expect(resolveTransferCurrency(null)).toBe("USD");
    expect(resolveTransferCurrency("NGN")).toBe("NGN");
  });
});
