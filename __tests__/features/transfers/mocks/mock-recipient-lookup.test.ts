import {
  KNOWN_ACCOUNT_ASTRID,
  LOOKUP_NOT_FOUND_MESSAGE,
  UNKNOWN_ACCOUNT_NG,
  mockLookupRecipient,
  getMockRecentRecipients,
} from "@/features/transfers/mocks/mock-recipient-lookup";
import { RecipientLookupError } from "@/features/transfers/types/destination";

describe("mockLookupRecipient", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("resolves a known GTBank account to Astrid Hayes", async () => {
    const promise = mockLookupRecipient({
      countryCode: "NG",
      bankId: "gtbank",
      accountNumber: KNOWN_ACCOUNT_ASTRID,
    });

    await jest.advanceTimersByTimeAsync(450);

    await expect(promise).resolves.toMatchObject({
      id: "contact-astrid-hayes",
      name: "Astrid Hayes",
      initials: "AH",
      bankId: "gtbank",
      bankName: "GTBank",
      countryCode: "NG",
      currencyCode: "NGN",
      accountNumberMasked: "•••• 6789",
    });
  });

  it("rejects an unknown account without matching the bank", async () => {
    const promise = mockLookupRecipient({
      countryCode: "NG",
      bankId: "gtbank",
      accountNumber: UNKNOWN_ACCOUNT_NG,
    });
    const assertion = expect(promise).rejects.toBeInstanceOf(
      RecipientLookupError,
    );

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });

  it("rejects a known number at the wrong bank", async () => {
    const promise = mockLookupRecipient({
      countryCode: "NG",
      bankId: "access",
      accountNumber: KNOWN_ACCOUNT_ASTRID,
    });
    const assertion = expect(promise).rejects.toMatchObject({
      message: LOOKUP_NOT_FOUND_MESSAGE,
    });

    await jest.advanceTimersByTimeAsync(450);
    await assertion;
  });
});

describe("getMockRecentRecipients", () => {
  it("returns Astrid Hayes, David Morris, and Carla Rose", () => {
    expect(getMockRecentRecipients().map((recipient) => recipient.name)).toEqual(
      ["Astrid Hayes", "David Morris", "Carla Rose"],
    );
  });
});
