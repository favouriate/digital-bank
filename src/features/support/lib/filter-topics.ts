import type { SupportCategoryId, SupportTopic } from "../types/support";

export function normalizeSupportQuery(value: string) {
  return value.trim().toLowerCase();
}

export function filterTopics(
  topics: SupportTopic[],
  options: {
    query?: string;
    category?: SupportCategoryId | null;
  },
) {
  const query = normalizeSupportQuery(options.query ?? "");
  const category = options.category ?? null;

  return topics.filter((topic) => {
    if (category && topic.category !== category) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      topic.question,
      topic.answer,
      ...topic.keywords,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}
