import { formatBalance, formatSignedChange } from "@/features/dashboard/lib/format-balance";

describe("formatBalance", () => {
  it("formats a visible USD balance", () => {
    expect(formatBalance(10680, true)).toBe("$10,680.00");
  });

  it("masks a hidden balance", () => {
    expect(formatBalance(10680, false)).toBe("••••••");
  });
});

describe("formatSignedChange", () => {
  it("formats a positive percent with a comma decimal", () => {
    expect(formatSignedChange(6.79)).toBe("+6,79%");
  });
});
