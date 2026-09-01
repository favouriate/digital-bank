import { maskAccountNumber } from "../lib/mask-account";
import type {
  RecipientLookupInput,
  ResolvedRecipient,
} from "../types/destination";
import { RecipientLookupError } from "../types/destination";
import { getMockBank, getMockDestination } from "./mock-destinations";

type KnownAccount = {
  countryCode: RecipientLookupInput["countryCode"];
  bankId: string;
  accountNumber: string;
  id: string;
  name: string;
  initials: string;
  avatarUrl: string | null;
};

export const LOOKUP_NOT_FOUND_MESSAGE =
  "We couldn't find this account. Check the account number and try again.";

export const KNOWN_ACCOUNT_ASTRID = "0123456789";
export const KNOWN_ACCOUNT_DAKOTA = "2233445566";
export const KNOWN_ACCOUNT_MICHAEL = "3344556677";
export const KNOWN_ACCOUNT_SARAH = "4455667788";
export const KNOWN_ACCOUNT_ANTONIA = "5566778899";
export const KNOWN_ACCOUNT_CARLA = "6677889900";
export const UNKNOWN_ACCOUNT_NG = "0000000000";

const AVATAR_ASTRID =
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Astrid";
const AVATAR_DAVID =
  "https://api.dicebear.com/9.x/avataaars/svg?seed=David";
const AVATAR_CARLA =
  "https://api.dicebear.com/9.x/avataaars/svg?seed=Carla";

const KNOWN_ACCOUNTS: KnownAccount[] = [
  {
    countryCode: "NG",
    bankId: "gtbank",
    accountNumber: KNOWN_ACCOUNT_ASTRID,
    id: "contact-astrid-hayes",
    name: "Astrid Hayes",
    initials: "AH",
    avatarUrl: AVATAR_ASTRID,
  },
  {
    countryCode: "NG",
    bankId: "access",
    accountNumber: KNOWN_ACCOUNT_DAKOTA,
    id: "contact-dakota-milk",
    name: "David Morris",
    initials: "DM",
    avatarUrl: AVATAR_DAVID,
  },
  {
    countryCode: "NG",
    bankId: "first-bank",
    accountNumber: KNOWN_ACCOUNT_MICHAEL,
    id: "contact-michael",
    name: "Michael",
    initials: "MI",
    avatarUrl: null,
  },
  {
    countryCode: "NG",
    bankId: "uba",
    accountNumber: KNOWN_ACCOUNT_SARAH,
    id: "contact-sarah",
    name: "Sarah",
    initials: "SA",
    avatarUrl: null,
  },
  {
    countryCode: "NG",
    bankId: "zenith",
    accountNumber: KNOWN_ACCOUNT_ANTONIA,
    id: "contact-antonia",
    name: "Antonia",
    initials: "AN",
    avatarUrl: null,
  },
  {
    countryCode: "GB",
    bankId: "barclays",
    accountNumber: KNOWN_ACCOUNT_CARLA,
    id: "contact-carla-rose",
    name: "Carla Rose",
    initials: "CR",
    avatarUrl: AVATAR_CARLA,
  },
];

const RECENT_RECIPIENT_IDS = [
  "contact-astrid-hayes",
  "contact-dakota-milk",
  "contact-carla-rose",
] as const;

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function toResolvedRecipient(account: KnownAccount): ResolvedRecipient {
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
  return RECENT_RECIPIENT_IDS.map((id) => {
    const account = KNOWN_ACCOUNTS.find((item) => item.id === id);

    if (!account) {
      throw new RecipientLookupError(LOOKUP_NOT_FOUND_MESSAGE);
    }

    return toResolvedRecipient(account);
  });
}

export function getKnownAccountNumber(recipientId: string) {
  return (
    KNOWN_ACCOUNTS.find((account) => account.id === recipientId)
      ?.accountNumber ?? null
  );
}

export async function mockLookupRecipient(
  input: RecipientLookupInput,
): Promise<ResolvedRecipient> {
  await wait(450);

  const match = KNOWN_ACCOUNTS.find(
    (account) =>
      account.countryCode === input.countryCode &&
      account.bankId === input.bankId &&
      account.accountNumber === input.accountNumber.trim(),
  );

  if (!match) {
    throw new RecipientLookupError(LOOKUP_NOT_FOUND_MESSAGE);
  }

  return toResolvedRecipient(match);
}
