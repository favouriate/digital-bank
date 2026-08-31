import { forgotPasswordSchema } from "@/features/auth/forgot-password/schemas/forgot-password-schema";

describe("forgotPasswordSchema", () => {
  it("accepts a valid email", () => {
    expect(forgotPasswordSchema.parse({ email: "ada@openpay.test" })).toEqual({
      email: "ada@openpay.test",
    });
  });

  it("trims email", () => {
    expect(
      forgotPasswordSchema.parse({ email: "  ada@openpay.test  " }).email,
    ).toBe("ada@openpay.test");
  });

  it("rejects an empty email", () => {
    const result = forgotPasswordSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter your email");
    }
  });

  it("rejects an invalid email", () => {
    const result = forgotPasswordSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter a valid email");
    }
  });
});
