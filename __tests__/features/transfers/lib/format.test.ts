import { recipientInitials } from "@/features/transfers/lib/format";

describe("recipientInitials", () => {
  it("uses the first letters of two names", () => {
    expect(recipientInitials("Astrid Hayes")).toBe("AH");
  });

  it("uses two letters from a single name", () => {
    expect(recipientInitials("Michael")).toBe("MI");
  });
});
