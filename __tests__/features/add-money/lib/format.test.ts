import { toShortCardMask } from "@/features/add-money/lib/format";

describe("toShortCardMask", () => {
  it("keeps the existing mock PAN suffix", () => {
    expect(toShortCardMask("1200  ••••  54215")).toBe("•••• 54215");
  });
});
