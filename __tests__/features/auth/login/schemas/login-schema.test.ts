import { loginSchema } from "@/features/auth/login/schemas/login-schema";

describe("loginSchema", () => {
  const valid = {
    email: "ada@openpay.test",
    password: "OpenPay!234",
    rememberMe: false,
  };

  it("accepts a valid login form", () => {
    expect(loginSchema.parse(valid)).toEqual(valid);
  });

  it("trims email", () => {
    expect(loginSchema.parse({ ...valid, email: "  ada@openpay.test  " }).email).toBe(
      "ada@openpay.test",
    );
  });

  it("rejects an empty email", () => {
    const result = loginSchema.safeParse({ ...valid, email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter your email");
    }
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter a valid email");
    }
  });

  it("accepts any non-empty password", () => {
    expect(loginSchema.parse({ ...valid, password: "1" }).password).toBe("1");
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({ ...valid, password: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter your password");
    }
  });
});
