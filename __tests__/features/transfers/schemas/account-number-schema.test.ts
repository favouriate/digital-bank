import {
  createAccountNumberSchema,
  isValidAccountNumber,
} from "@/features/transfers/schemas/account-number-schema";

describe("createAccountNumberSchema", () => {
  it("accepts a 10-digit Nigerian account number", () => {
    expect(createAccountNumberSchema("NG").parse("0123456789")).toBe(
      "0123456789",
    );
  });

  it("rejects a Nigerian account number that is not 10 digits", () => {
    expect(createAccountNumberSchema("NG").safeParse("012345678").success).toBe(
      false,
    );
    expect(
      createAccountNumberSchema("NG").safeParse("01234567890").success,
    ).toBe(false);
  });

  it("accepts an 8-digit UK account number", () => {
    expect(createAccountNumberSchema("GB").parse("12345678")).toBe("12345678");
  });

  it("accepts a US account number between 6 and 17 digits", () => {
    expect(createAccountNumberSchema("US").parse("123456")).toBe("123456");
    expect(createAccountNumberSchema("US").parse("12345678901234567")).toBe(
      "12345678901234567",
    );
  });

  it("accepts Canadian, Ghanaian, and South African account numbers", () => {
    expect(createAccountNumberSchema("CA").parse("1234567")).toBe("1234567");
    expect(createAccountNumberSchema("GH").parse("1234567890123")).toBe(
      "1234567890123",
    );
    expect(createAccountNumberSchema("ZA").parse("123456789")).toBe("123456789");
  });
});

describe("isValidAccountNumber", () => {
  it("returns true only for country-specific formats", () => {
    expect(isValidAccountNumber("NG", "0123456789")).toBe(true);
    expect(isValidAccountNumber("NG", "12345")).toBe(false);
    expect(isValidAccountNumber("GB", "12345678")).toBe(true);
    expect(isValidAccountNumber("US", "1234567")).toBe(true);
  });
});
