import {
  mockCreateSupportRequest,
  mockGetSupportTopics,
  resetSupportMocks,
} from "@/features/support/mocks/mock-support-service";
import { contactSupportSchema } from "@/features/support/schemas/contact-schema";
import { SupportLoadError } from "@/features/support/types/support";

describe("contactSupportSchema", () => {
  const valid = {
    category: "account" as const,
    subject: "Cannot update my email",
    message: "I tried to change my email in Settings but the save failed.",
  };

  it("accepts a valid request", () => {
    expect(contactSupportSchema.parse(valid).subject).toBe(
      "Cannot update my email",
    );
  });

  it("rejects an empty message", () => {
    const result = contactSupportSchema.safeParse({
      ...valid,
      message: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactSupportSchema.safeParse({
      ...valid,
      message: "Too short",
    });

    expect(result.success).toBe(false);
  });
});

describe("mock support service", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    resetSupportMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    resetSupportMocks();
  });

  it("returns four categories of help topics", async () => {
    const promise = mockGetSupportTopics();
    await jest.advanceTimersByTimeAsync(450);
    const topics = await promise;

    const categories = new Set(topics.map((topic) => topic.category));

    expect(categories).toEqual(
      new Set(["account", "payments", "security", "notifications"]),
    );
    expect(topics.some((topic) => topic.question.toLowerCase().includes("astrid"))).toBe(
      false,
    );
  });

  it("throws for the demo load-error flag", async () => {
    const promise = mockGetSupportTopics({ failLoad: true });
    const assertion = expect(promise).rejects.toBeInstanceOf(SupportLoadError);

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });

  it("returns an incrementing SUP reference and does not persist the message", async () => {
    const first = mockCreateSupportRequest({
      category: "payments",
      subject: "Pending transfer",
      message: "My transfer has been pending for longer than expected.",
      transactionReference: "TXN-1001",
    });
    await jest.advanceTimersByTimeAsync(450);
    await expect(first).resolves.toEqual({ reference: "SUP-2026-001" });

    const second = mockCreateSupportRequest({
      category: "account",
      subject: "Profile update",
      message: "I need help updating the phone number on my profile.",
    });
    await jest.advanceTimersByTimeAsync(450);
    await expect(second).resolves.toEqual({ reference: "SUP-2026-002" });

    expect(window.localStorage.getItem("openpay.support-requests")).toBeNull();
  });
});
