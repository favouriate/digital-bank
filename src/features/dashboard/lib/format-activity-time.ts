import { formatTransactionDate } from "@/features/search/lib/format";

const DASHBOARD_TIME_ZONE = "Africa/Lagos";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: DASHBOARD_TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: DASHBOARD_TIME_ZONE,
  month: "short",
  day: "numeric",
  year: "numeric",
});

function zonedYmd(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: DASHBOARD_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";

  return `${year}-${month}-${day}`;
}

function shiftZonedDay(ymd: string, offsetDays: number) {
  const [year, month, day] = ymd.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, (month ?? 1) - 1, (day ?? 1) + offsetDays));
  return shifted.toISOString().slice(0, 10);
}

export function formatDashboardTimestamp(isoDate: string, now = Date.now()) {
  const date = new Date(isoDate);
  const current = new Date(now);

  if (!Number.isFinite(date.getTime())) {
    return formatTransactionDate(isoDate);
  }

  const currentYmd = zonedYmd(current);
  const dateYmd = zonedYmd(date);

  if (dateYmd === currentYmd) {
    return `Today, ${timeFormatter.format(date)}`;
  }

  if (dateYmd === shiftZonedDay(currentYmd, -1)) {
    return `Yesterday, ${timeFormatter.format(date)}`;
  }

  return dateFormatter.format(date);
}

export function formatActivityTime(isoDate: string, now = Date.now()) {
  const date = new Date(isoDate);
  const diffMs = now - date.getTime();

  if (!Number.isFinite(diffMs) || diffMs < 0) {
    return formatTransactionDate(isoDate);
  }

  const diffMinutes = Math.round(diffMs / 60_000);

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return formatTransactionDate(isoDate);
}
