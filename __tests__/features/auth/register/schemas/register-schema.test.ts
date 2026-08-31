import { registerSchema } from "@/features/auth/register/schemas/register-schema";

describe("registerSchema", () => {
  const valid = {
    email: "ada@openpay.test",
    password: "password1",
    acceptedTerms: true,
  };

  it("accepts a valid register form", () => {
    expect(registerSchema.parse(valid)).toEqual(valid);
  });

  it("rejects when terms are not accepted", () => {
    const result = registerSchema.safeParse({ ...valid, acceptedTerms: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Accept the Terms of Service to continue",
      );
    }
  });

  it("rejects an empty password", () => {
    const result = registerSchema.safeParse({ ...valid, password: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter your password");
    }
  });
});
