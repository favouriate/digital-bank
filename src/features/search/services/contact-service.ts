import { mockGetContacts } from "../mocks/mock-contact-service";
import type { Contact } from "@/types/contact";

export async function getContacts(): Promise<Contact[]> {
  return mockGetContacts();
}
