import { recipientInitials } from "../lib/format";
import { maskAccountNumber } from "../lib/mask-account";
import type {
  RecipientLookupInput,
  ResolvedRecipient,
} from "../types/destination";
import { RecipientLookupError } from "../types/destination";

import { MOCK_RECIPIENT_NAMES } from "./mock-recipient-names";
import { getMockBank, getMockDestination } from "./mock-destinations";

export function stableIndex(value: string, modulo: number) {
  let hash = 5381;

  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) + hash + value.charCodeAt(index)) >>> 0;
  }

  return modulo === 0 ? 0 : hash % modulo;
}

function dicebearAvatarUrl(seed: string) {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
}

export function generateMockRecipient(
  input: RecipientLookupInput,
): ResolvedRecipient {
  const accountNumber = input.accountNumber.trim();
  const bank = getMockBank(input.bankId);
  const destination = getMockDestination(input.countryCode);

  if (!bank || bank.countryCode !== input.countryCode || !destination) {
    throw new RecipientLookupError();
  }

  const names = MOCK_RECIPIENT_NAMES[input.countryCode];
  const name =
    names[
      stableIndex(
        `${input.countryCode}:${input.bankId}:${accountNumber}`,
        names.length,
      )
    ];

  if (!name) {
    throw new RecipientLookupError();
  }

  const id = `mock-recipient-${input.countryCode}-${input.bankId}-${accountNumber}`;

  return {
    id,
    name,
    initials: recipientInitials(name),
    avatarUrl: dicebearAvatarUrl(id),
    bankId: bank.id,
    bankName: bank.name,
    countryCode: destination.countryCode,
    currencyCode: destination.currencyCode,
    accountNumberMasked: maskAccountNumber(accountNumber),
  };
}
