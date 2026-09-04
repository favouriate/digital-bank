import type {
  RecipientLookupInput,
  ResolvedRecipient,
} from "../types/destination";
import { RecipientLookupError } from "../types/destination";
import { maskAccountNumber } from "../lib/mask-account";
import { getMockBank, getMockDestination } from "./mock-destinations";
import { generateMockRecipient } from "./generate-mock-recipient";

type RecentAccount = {
  countryCode: RecipientLookupInput["countryCode"];
  bankId: string;
  accountNumber: string;
  id: string;
  name: string;
  initials: string;
  avatarUrl: string | null;
};

export const LOOKUP_DELAY_MS = 650;

export const LOOKUP_NOT_FOUND_SUFFIX = "0000";

export const LOOKUP_UNAVAILABLE_SUFFIX = "9999";

export const LOOKUP_NOT_FOUND_MESSAGE =
  "We couldn't find this account. Check the account number and try again.";

export const LOOKUP_UNAVAILABLE_MESSAGE =
  "Account lookup is temporarily unavailable. Please try again.";

const AVATAR_ASTRID =
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Astrid";
const AVATAR_DAVID =
  "https://api.dicebear.com/9.x/avataaars/svg?seed=David";
const AVATAR_CARLA =
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Carla";

const RECENT_ACCOUNTS: RecentAccount[] = [
  {
    countryCode: "NG",
    bankId: "gtbank",
    accountNumber: "0123456789",
    id: "contact-astrid-hayes",
    name: "Astrid Hayes",
    initials: "AH",
    avatarUrl: AVATAR_ASTRID,
  },
  {
    countryCode: "NG",
    bankId: "access",
    accountNumber: "2233445566",
    id: "contact-dakota-milk",
    name: "David Morris",
    initials: "DM",
    avatarUrl: AVATAR_DAVID,
  },
  {
    countryCode: "GB",
    bankId: "barclays",
    accountNumber: "66778899",
    id: "contact-carla-rose",
    name: "Carla Rose",
    initials: "CR",
    avatarUrl: AVATAR_CARLA,
  },
];

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function toResolvedRecipient(account: RecentAccount): ResolvedRecipient {
  const bank = getMockBank(account.bankId);
  const destination = getMockDestination(account.countryCode);

  if (!bank || !destination) {
    throw new RecipientLookupError(LOOKUP_NOT_FOUND_MESSAGE);
  }

  return {
    id: account.id,
    name: account.name,
    initials: account.initials,
    avatarUrl: account.avatarUrl,
    bankId: bank.id,
    bankName: bank.name,
    countryCode: destination.countryCode,
    currencyCode: destination.currencyCode,
    accountNumberMasked: maskAccountNumber(account.accountNumber),
  };
}

export function getMockRecentRecipients(): ResolvedRecipient[] {
  return RECENT_ACCOUNTS.map((account) => toResolvedRecipient(account));
}

export function getKnownAccountNumber(recipientId: string) {
  return (
    RECENT_ACCOUNTS.find((account) => account.id === recipientId)
      ?.accountNumber ?? null
  );
}

export async function mockLookupRecipient(
  input: RecipientLookupInput,
): Promise<ResolvedRecipient> {
  await wait(LOOKUP_DELAY_MS);

  const accountNumber = input.accountNumber.trim();

  if (accountNumber.endsWith(LOOKUP_NOT_FOUND_SUFFIX)) {
    throw new RecipientLookupError(LOOKUP_NOT_FOUND_MESSAGE);
  }

  if (accountNumber.endsWith(LOOKUP_UNAVAILABLE_SUFFIX)) {
    throw new RecipientLookupError(LOOKUP_UNAVAILABLE_MESSAGE);
  }

  return generateMockRecipient({
    countryCode: input.countryCode,
    bankId: input.bankId,
    accountNumber,
  });
}
