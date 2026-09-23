import {
  LOOKUP_DELAY_MS,
  LOOKUP_NOT_FOUND_MESSAGE,
  LOOKUP_NOT_FOUND_SUFFIX,
  LOOKUP_UNAVAILABLE_MESSAGE,
  LOOKUP_UNAVAILABLE_SUFFIX,
  mockLookupRecipient,
  getMockRecentRecipients,
} from "@/features/transfers/mocks/mock-recipient-lookup";
import { RecipientLookupError } from "@/features/transfers/types/destination";

async function flushLookup() {
  await jest.advanceTimersByTimeAsync(LOOKUP_DELAY_MS);
}

describe("mockLookupRecipient", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("resolves a valid GTBank account with a stable generated name", async () => {
    const input = {
      countryCode: "NG" as const,
      bankId: "gtbank",
      accountNumber: "0123456789",
    };

    const firstPromise = mockLookupRecipient(input);
    await flushLookup();
    const first = await firstPromise;

    expect(first).toMatchObject({
      id: "mock-recipient-NG-gtbank-0123456789",
      bankId: "gtbank",
      bankName: "GTBank",
      countryCode: "NG",
      currencyCode: "NGN",
      accountNumberMasked: "•••• 6789",
    });
    expect(first.name.length).toBeGreaterThan(0);
    expect(first.initials.length).toBeGreaterThan(0);

    const secondPromise = mockLookupRecipient(input);
    await flushLookup();
    const second = await secondPromise;

    expect(second.id).toBe(first.id);
    expect(second.name).toBe(first.name);
  });

  it("resolves a different valid NG number without throwing not-found", async () => {
    const promise = mockLookupRecipient({
      countryCode: "NG",
      bankId: "gtbank",
      accountNumber: "1111111111",
    });

    await flushLookup();

    await expect(promise).resolves.toMatchObject({
      id: "mock-recipient-NG-gtbank-1111111111",
      bankId: "gtbank",
      countryCode: "NG",
      accountNumberMasked: "•••• 1111",
    });
  });

  it("rejects accounts ending in 0000 as not found", async () => {
    const promise = mockLookupRecipient({
      countryCode: "NG",
      bankId: "gtbank",
      accountNumber: `012345${LOOKUP_NOT_FOUND_SUFFIX}`,
    });
    const assertion = expect(promise).rejects.toMatchObject({
      message: LOOKUP_NOT_FOUND_MESSAGE,
    });

    await flushLookup();
    await assertion;
  });

  it("rejects accounts ending in 9999 as unavailable", async () => {
    const promise = mockLookupRecipient({
      countryCode: "NG",
      bankId: "gtbank",
      accountNumber: `012345${LOOKUP_UNAVAILABLE_SUFFIX}`,
    });
    const assertion = expect(promise).rejects.toMatchObject({
      message: LOOKUP_UNAVAILABLE_MESSAGE,
    });

    await flushLookup();
    await assertion;
  });

  it("rejects an unknown bank as not found", async () => {
    const promise = mockLookupRecipient({
      countryCode: "NG",
      bankId: "not-a-bank",
      accountNumber: "0123456789",
    });
    const assertion = expect(promise).rejects.toBeInstanceOf(
      RecipientLookupError,
    );

    await flushLookup();
    await assertion;
  });

  it.each([
    {
      countryCode: "US" as const,
      bankId: "bank-of-america",
      accountNumber: "12345678901234567",
      bankName: "Bank of America",
      currencyCode: "USD",
      masked: "•••• 4567",
    },
    {
      countryCode: "GB" as const,
      bankId: "barclays",
      accountNumber: "12345678",
      bankName: "Barclays",
      currencyCode: "GBP",
      masked: "•••• 5678",
    },
    {
      countryCode: "CA" as const,
      bankId: "rbc",
      accountNumber: "123456789012",
      bankName: "RBC",
      currencyCode: "CAD",
      masked: "•••• 9012",
    },
    {
      countryCode: "GH" as const,
      bankId: "gcb",
      accountNumber: "1234567890123",
      bankName: "GCB",
      currencyCode: "GHS",
      masked: "•••• 0123",
    },
    {
      countryCode: "ZA" as const,
      bankId: "standard-bank",
      accountNumber: "12345678901",
      bankName: "Standard Bank",
      currencyCode: "ZAR",
      masked: "•••• 8901",
    },
  ])(
    "resolves a valid $countryCode account",
    async ({
      countryCode,
      bankId,
      accountNumber,
      bankName,
      currencyCode,
      masked,
    }) => {
      const promise = mockLookupRecipient({
        countryCode,
        bankId,
        accountNumber,
      });

      await flushLookup();

      await expect(promise).resolves.toMatchObject({
        id: `mock-recipient-${countryCode}-${bankId}-${accountNumber}`,
        bankId,
        bankName,
        countryCode,
        currencyCode,
        accountNumberMasked: masked,
      });
    },
  );
});

describe("getMockRecentRecipients", () => {
  it("returns Astrid Hayes, David Morris, and Carla Rose", () => {
    expect(getMockRecentRecipients().map((recipient) => recipient.name)).toEqual(
      ["Astrid Hayes", "David Morris", "Carla Rose"],
    );
  });
});
