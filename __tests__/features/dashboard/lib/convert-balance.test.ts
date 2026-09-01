import { convertFromBase } from "@/features/dashboard/lib/convert-balance";
import { getMockRate, mockUsdRates } from "@/features/dashboard/mocks/mock-exchange-rates";

const BASE = 10680;

describe("convertFromBase", () => {
  it("converts the canonical USD balance to NGN without chaining", () => {
    expect(convertFromBase(BASE, mockUsdRates.NGN)).toBe(16_554_000);
  });

  it("returns the original amount when the rate is 1", () => {
    expect(convertFromBase(BASE, 1)).toBe(BASE);
  });
});

describe("getMockRate", () => {
  it("returns 1 when base and quote are the same", () => {
    expect(getMockRate("USD", "USD")).toBe(1);
    expect(getMockRate("NGN", "NGN")).toBe(1);
  });

  it("quotes NGN from USD", () => {
    expect(getMockRate("USD", "NGN")).toBe(1550);
  });

  it("does not drift when switching USD → NGN → GBP → USD", () => {
    const ngn = convertFromBase(BASE, getMockRate("USD", "NGN"));
    const gbp = convertFromBase(BASE, getMockRate("USD", "GBP"));
    const backToUsd = convertFromBase(BASE, getMockRate("USD", "USD"));

    expect(ngn).toBe(16_554_000);
    expect(gbp).toBe(BASE * 0.77);
    expect(backToUsd).toBe(BASE);
  });
});
