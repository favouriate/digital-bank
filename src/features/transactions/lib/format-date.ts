import { format, parseISO } from "date-fns";

function toUtcParts(date: Date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
}

export function formatTransactionDateParts(isoDate: string) {
  const date = parseISO(isoDate);

  if (!Number.isFinite(date.getTime())) {
    return { date: isoDate, time: "" };
  }

  const utc = toUtcParts(date);

  return {
    date: format(utc, "MMM d, yyyy"),
    time: format(utc, "h:mm a"),
  };
}

export function formatTransactionDateTime(isoDate: string) {
  const parts = formatTransactionDateParts(isoDate);

  if (!parts.time) {
    return parts.date;
  }

  return `${parts.date} • ${parts.time}`;
}

export function formatDateRangeLabel(
  startDate: string | null,
  endDate: string | null,
) {
  if (!startDate || !endDate) {
    return "Select dates";
  }

  const start = formatTransactionDateParts(`${startDate}T00:00:00.000Z`).date;
  const end = formatTransactionDateParts(`${endDate}T00:00:00.000Z`).date;

  if (startDate === endDate) {
    return start;
  }

  return `${start} - ${end}`;
}
