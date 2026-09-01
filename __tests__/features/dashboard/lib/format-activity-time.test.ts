import {
  formatActivityTime,
  formatDashboardTimestamp,
} from "@/features/dashboard/lib/format-activity-time";

describe("formatActivityTime", () => {
  const now = Date.parse("2026-09-01T12:00:00.000Z");

  it("returns a relative time for recent activity", () => {
    expect(formatActivityTime("2026-09-01T11:20:00.000Z", now)).toBe("40m ago");
    expect(formatActivityTime("2026-08-30T12:00:00.000Z", now)).toBe("2d ago");
  });

  it("returns an absolute date for older activity", () => {
    expect(formatActivityTime("2020-01-16T09:12:00.000Z", now)).toBe(
      "Jan 16, 2020",
    );
  });
});

describe("formatDashboardTimestamp", () => {
  const now = Date.parse("2026-09-01T11:00:00.000Z");

  it("labels the current Lagos day as Today", () => {
    expect(formatDashboardTimestamp("2026-09-01T09:42:00.000Z", now)).toBe(
      "Today, 10:42 AM",
    );
  });

  it("labels the previous Lagos day as Yesterday", () => {
    expect(formatDashboardTimestamp("2026-08-31T15:21:00.000Z", now)).toBe(
      "Yesterday, 4:21 PM",
    );
  });

  it("returns a calendar date for older activity", () => {
    expect(formatDashboardTimestamp("2025-05-12T12:00:00.000Z", now)).toBe(
      "May 12, 2025",
    );
  });
});
