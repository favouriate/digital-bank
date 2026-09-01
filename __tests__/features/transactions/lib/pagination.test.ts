import { getPaginationItems } from "@/features/transactions/lib/pagination";

describe("getPaginationItems", () => {
  it("shows the first window plus the last page", () => {
    expect(getPaginationItems(1, 20)).toEqual([
      1,
      2,
      3,
      4,
      5,
      "ellipsis",
      20,
    ]);
  });

  it("shows a middle window with ellipses", () => {
    expect(getPaginationItems(10, 20)).toEqual([
      1,
      "ellipsis",
      9,
      10,
      11,
      "ellipsis",
      20,
    ]);
  });
});
