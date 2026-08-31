export function normalizeQuery(value: string) {
  return value.trim().toLowerCase();
}

export function matchesQuery(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query);
}
