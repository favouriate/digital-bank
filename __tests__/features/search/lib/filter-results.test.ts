import { filterContacts, filterSearchPages, filterTransactions } from "@/features/search/lib/filter-results";
import type { SearchPage } from "@/features/search/lib/search-pages";
import type { Contact } from "@/types/contact";
import type { Transaction } from "@/types/transaction";

const icon = (() => null) as unknown as SearchPage["icon"];

const pages: SearchPage[] = [
  { id: "dashboard", label: "Dashboard", href: "/", icon },
  { id: "transfers", label: "Transfer", href: "/transfers", icon },
  { id: "support", label: "Help", href: "/support", icon },
];

const contacts: Contact[] = [
  {
    id: "c1",
    name: "Ada Lovelace",
    initials: "AL",
    avatarUrl: null,
    provider: "OpenPay",
  },
  {
    id: "c2",
    name: "Grace Hopper",
    initials: "GH",
    avatarUrl: null,
    provider: "Bank of Demo",
  },
];

const transactions: Transaction[] = [
  {
    id: "t1",
    description: "Coffee shop",
    counterparty: "Blue Bottle",
    reference: "TX-100",
    accountMask: "**** 100",
    amount: -12.5,
    currency: "USD",
    status: "completed",
    occurredAt: "2026-08-01T10:00:00.000Z",
    type: "transfer",
    direction: "outgoing",
    bankName: "Blue Bottle",
  },
  {
    id: "t2",
    description: "Salary",
    counterparty: "Acme Corp",
    reference: "TX-200",
    accountMask: "**** 200",
    amount: 2400,
    currency: "USD",
    status: "completed",
    occurredAt: "2026-08-02T10:00:00.000Z",
    type: "deposit",
    direction: "incoming",
    bankName: "Acme Corp",
  },
];

describe("filterSearchPages", () => {
  it("returns every page when the query is empty", () => {
    expect(filterSearchPages(pages, "   ")).toEqual(pages);
  });

  it("filters pages by label", () => {
    expect(filterSearchPages(pages, "help")).toEqual([pages[2]]);
  });
});

describe("filterContacts", () => {
  it("matches contact name or provider", () => {
    expect(filterContacts(contacts, "ada")).toEqual([contacts[0]]);
    expect(filterContacts(contacts, "bank")).toEqual([contacts[1]]);
  });
});

describe("filterTransactions", () => {
  it("matches description, counterparty, reference, or amount", () => {
    expect(filterTransactions(transactions, "coffee")).toEqual([transactions[0]]);
    expect(filterTransactions(transactions, "acme")).toEqual([transactions[1]]);
    expect(filterTransactions(transactions, "tx-100")).toEqual([transactions[0]]);
    expect(filterTransactions(transactions, "2400")).toEqual([transactions[1]]);
  });

  it("matches the absolute amount of a debit", () => {
    expect(filterTransactions(transactions, "12.5")).toEqual([transactions[0]]);
  });
});
