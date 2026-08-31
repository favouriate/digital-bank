import type { Contact } from "@/types/contact";
import type { Transaction } from "@/types/transaction";

import { matchesQuery, normalizeQuery } from "./match";
import type { SearchPage } from "./search-pages";

export function filterSearchPages(pages: SearchPage[], query: string) {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return pages;
  }

  return pages.filter((page) => matchesQuery(page.label, normalized));
}

export function filterContacts(contacts: Contact[], query: string) {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return contacts;
  }

  return contacts.filter(
    (contact) =>
      matchesQuery(contact.name, normalized) ||
      matchesQuery(contact.provider, normalized),
  );
}

export function filterTransactions(transactions: Transaction[], query: string) {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return transactions;
  }

  return transactions.filter((transaction) => {
    const absoluteAmount = String(Math.abs(transaction.amount));

    return (
      matchesQuery(transaction.description, normalized) ||
      matchesQuery(transaction.counterparty, normalized) ||
      matchesQuery(transaction.reference, normalized) ||
      matchesQuery(absoluteAmount, normalized)
    );
  });
}
