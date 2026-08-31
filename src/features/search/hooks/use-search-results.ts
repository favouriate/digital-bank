"use client";

import { useMemo } from "react";

import {
  filterContacts,
  filterSearchPages,
  filterTransactions,
} from "../lib/filter-results";
import { searchPages } from "../lib/search-pages";
import { useContactsQuery } from "./use-contacts-query";
import { useTransactionsQuery } from "./use-transactions-query";

export function useSearchResults(query: string) {
  const contactsQuery = useContactsQuery();
  const transactionsQuery = useTransactionsQuery();

  const pages = useMemo(
    () => filterSearchPages(searchPages, query),
    [query],
  );

  const contacts = useMemo(
    () => filterContacts(contactsQuery.data ?? [], query),
    [contactsQuery.data, query],
  );

  const transactions = useMemo(
    () => filterTransactions(transactionsQuery.data ?? [], query),
    [transactionsQuery.data, query],
  );

  const isContactsPending = contactsQuery.isPending;
  const isTransactionsPending = transactionsQuery.isPending;

  const showEmpty =
    pages.length === 0 &&
    contacts.length === 0 &&
    transactions.length === 0 &&
    !isContactsPending &&
    !isTransactionsPending &&
    !contactsQuery.isError &&
    !transactionsQuery.isError;

  return {
    pages,
    contacts,
    transactions,
    isContactsPending,
    isTransactionsPending,
    contactsError: contactsQuery.isError,
    transactionsError: transactionsQuery.isError,
    showEmpty,
  };
}
