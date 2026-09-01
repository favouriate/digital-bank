import { formatMoney, isCurrencyCode } from "@/lib/currency";

describe("isCurrencyCode", () => {
  it("accepts supported codes", () => {
    expect(isCurrencyCode("USD")).toBe(true);
    expect(isCurrencyCode("NGN")).toBe(true);
    expect(isCurrencyCode("GBP")).toBe(true);
    expect(isCurrencyCode("CAD")).toBe(true);
    expect(isCurrencyCode("GHS")).toBe(true);
    expect(isCurrencyCode("ZAR")).toBe(true);
  });

  it("rejects unknown codes", () => {
    expect(isCurrencyCode("EUR")).toBe(false);
    expect(isCurrencyCode("")).toBe(false);
  });
});

describe("formatMoney", () => {
  it("formats USD with grouping and two decimals", () => {
    expect(formatMoney(10680, "USD")).toBe("$10,680.00");
  });

  it("formats NGN with grouping and two decimals", () => {
    expect(formatMoney(16_554_000, "NGN")).toBe(
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(16_554_000),
    );
  });

  it("formats GBP with the pound symbol", () => {
    expect(formatMoney(8223.6, "GBP")).toBe(
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(8223.6),
    );
  });
});
