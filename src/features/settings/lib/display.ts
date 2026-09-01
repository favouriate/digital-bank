import { format } from "date-fns";

export const MISSING_FIELD = "Not provided";

export function displayValue(value: string | null | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return MISSING_FIELD;
  }

  return trimmed;
}

export function formatDateOfBirth(isoDate: string) {
  const trimmed = isoDate.trim();

  if (!trimmed) {
    return MISSING_FIELD;
  }

  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);

  if (!parts) {
    return trimmed;
  }

  const year = Number(parts[1]);
  const month = Number(parts[2]) - 1;
  const day = Number(parts[3]);
  const date = new Date(year, month, day);

  if (!Number.isFinite(date.getTime())) {
    return trimmed;
  }

  return format(date, "d MMM yyyy");
}

export function maskSecret(length: number) {
  return "•".repeat(length);
}
