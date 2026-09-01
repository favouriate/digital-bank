import { mockLookupRecipient } from "../mocks/mock-recipient-lookup";
import type {
  RecipientLookupInput,
  ResolvedRecipient,
} from "../types/destination";

export async function lookupRecipient(
  input: RecipientLookupInput,
): Promise<ResolvedRecipient> {
  return mockLookupRecipient(input);
}
