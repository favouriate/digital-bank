import { transferAmountSchema } from "@/features/transfers/schemas/amount-schema";
import { createTransferAmountSchema } from "@/features/transfers/schemas/amount-schema";
import {
  addRecipientSchema,
  transferPinSchema,
} from "@/features/transfers/schemas/transfer-schema";

describe("transferAmountSchema", () => {
  it("parses a currency-formatted amount", () => {
    expect(transferAmountSchema.parse("1,250.00")).toBe(1250);
  });

  it("rejects an empty amount", () => {
    expect(transferAmountSchema.safeParse("").success).toBe(false);
  });

  it("rejects an amount below the minimum", () => {
    expect(transferAmountSchema.safeParse("0.50").success).toBe(false);
  });

  it("rejects an amount above the maximum", () => {
    expect(transferAmountSchema.safeParse("10000.01").success).toBe(false);
  });

  it("rejects an amount above the available balance", () => {
    const schema = createTransferAmountSchema(100);
    expect(schema.safeParse("101").success).toBe(false);
    expect(schema.safeParse("100").success).toBe(true);
  });
});

describe("transferPinSchema", () => {
  it("accepts a 4-digit PIN", () => {
    expect(transferPinSchema.safeParse("1234").success).toBe(true);
  });

  it("rejects an incomplete PIN", () => {
    expect(transferPinSchema.safeParse("12").success).toBe(false);
  });
});

describe("addRecipientSchema", () => {
  it("requires a name and email", () => {
    expect(
      addRecipientSchema.safeParse({
        name: "Alex Rivera",
        email: "alex@example.com",
      }).success,
    ).toBe(true);
    expect(
      addRecipientSchema.safeParse({ name: "", email: "alex@example.com" })
        .success,
    ).toBe(false);
  });
});
