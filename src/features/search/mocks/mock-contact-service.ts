import { mockContacts } from "@/mocks/contacts";
import type { Contact } from "@/types/contact";

export async function mockGetContacts(): Promise<Contact[]> {
  return mockContacts;
}
