import { addMoneyAmountSchema } from "@/features/add-money/schemas/amount-schema";

describe("addMoneyAmountSchema", () => {
  it("parses a currency-formatted amount", () => {
    expect(addMoneyAmountSchema.parse("1,000.00")).toBe(1000);
  });

  it("rejects an empty amount", () => {
    expect(addMoneyAmountSchema.safeParse("").success).toBe(false);
  });

  it("rejects an amount below the minimum", () => {
    const result = addMoneyAmountSchema.safeParse("9.99");
    expect(result.success).toBe(false);
  });

  it("rejects an amount above the maximum", () => {
    const result = addMoneyAmountSchema.safeParse("10000.01");
    expect(result.success).toBe(false);
  });
});
