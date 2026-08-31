import { amountSchema } from "@/features/dashboard/schemas/amount-schema";

describe("amountSchema", () => {
  it("parses a currency-formatted amount", () => {
    expect(amountSchema.parse("$ 800.00")).toBe(800);
  });

  it("rejects an empty amount", () => {
    const result = amountSchema.safeParse("");
    expect(result.success).toBe(false);
  });

  it("rejects zero", () => {
    const result = amountSchema.safeParse("0");
    expect(result.success).toBe(false);
  });
});
