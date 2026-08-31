import { matchesQuery, normalizeQuery } from "@/features/search/lib/match";

describe("normalizeQuery", () => {
  it("trims and lowercases the value", () => {
    expect(normalizeQuery("  Transfer  ")).toBe("transfer");
  });

  it("returns an empty string for whitespace-only input", () => {
    expect(normalizeQuery("   ")).toBe("");
  });
});

describe("matchesQuery", () => {
  it("matches a case-insensitive substring", () => {
    expect(matchesQuery("Dashboard", "dash")).toBe(true);
  });

  it("returns false when the query is not in the haystack", () => {
    expect(matchesQuery("Settings", "help")).toBe(false);
  });
});
