import { filterTopics } from "@/features/support/lib/filter-topics";
import { MOCK_SUPPORT_TOPICS } from "@/features/support/mocks/mock-support-topics";

describe("filterTopics", () => {
  it("matches questions case-insensitively after trim", () => {
    const results = filterTopics(MOCK_SUPPORT_TOPICS, {
      query: "  PASSWORD  ",
    });

    expect(results.some((topic) => topic.id === "faq-change-password")).toBe(
      true,
    );
    expect(
      results.every(
        (topic) =>
          `${topic.question} ${topic.answer} ${topic.keywords.join(" ")}`
            .toLowerCase()
            .includes("password"),
      ),
    ).toBe(true);
  });

  it("finds transfer help from a transfer query", () => {
    const results = filterTopics(MOCK_SUPPORT_TOPICS, { query: "transfer" });

    expect(results.some((topic) => topic.id === "faq-transfer-pending")).toBe(
      true,
    );
  });

  it("finds notification help from a notification query", () => {
    const results = filterTopics(MOCK_SUPPORT_TOPICS, {
      query: "notification",
    });

    expect(
      results.some((topic) => topic.id === "faq-notification-preferences"),
    ).toBe(true);
  });

  it("limits results to a selected category", () => {
    const results = filterTopics(MOCK_SUPPORT_TOPICS, {
      category: "security",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((topic) => topic.category === "security")).toBe(true);
  });

  it("returns an empty list when nothing matches", () => {
    expect(
      filterTopics(MOCK_SUPPORT_TOPICS, { query: "xyz-no-such-topic" }),
    ).toEqual([]);
  });
});
