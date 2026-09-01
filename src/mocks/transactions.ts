import type {
  Transaction,
  TransactionDirection,
  TransactionStatus,
  TransactionType,
} from "@/types/transaction";

export const MOCK_TRANSACTION_COUNT = 134;

function contactFields(name: string, seed: number) {
  return {
    counterpartyEmail: counterpartyEmail(name),
    counterpartyPhone: counterpartyPhone(seed),
  };
}

const FEATURED_TRANSACTIONS: Transaction[] = [
  {
    id: "txn-david-500",
    description: "Received from David Morris",
    counterparty: "David Morris",
    reference: "OP-104821",
    accountMask: "**** 6789",
    amount: 500,
    currency: "USD",
    status: "completed",
    occurredAt: "2026-09-01T10:42:00.000Z",
    type: "receive",
    direction: "incoming",
    bankName: "GTBank",
    category: "transfer",
    note: "Payment for lunch",
    counterpartyEmail: "david.morris@email.com",
    counterpartyPhone: "+234 812 345 6789",
  },
  {
    id: "txn-astrid-800",
    description: "Sent to Astrid Hayes",
    counterparty: "Astrid Hayes",
    reference: "OP-104822",
    accountMask: "**** 4321",
    amount: -800,
    currency: "USD",
    status: "completed",
    occurredAt: "2026-08-31T14:15:00.000Z",
    type: "transfer",
    direction: "outgoing",
    bankName: "Access Bank",
    category: "transfer",
    ...contactFields("Astrid Hayes", 800),
  },
  {
    id: "txn-electricity-120",
    description: "Paid electricity bill",
    counterparty: "Ikeja Electric",
    reference: "OP-104823",
    accountMask: "**** 3627",
    amount: -120,
    currency: "USD",
    status: "completed",
    occurredAt: "2026-08-31T11:08:00.000Z",
    type: "bill-payment",
    direction: "outgoing",
    bankName: "Ikeja Electric",
    category: "bills",
    ...contactFields("Ikeja Electric", 120),
  },
  {
    id: "txn-michael-250",
    description: "Transfer to Michael Johnson",
    counterparty: "Michael Johnson",
    reference: "OP-104824",
    accountMask: "**** 2468",
    amount: -250,
    currency: "USD",
    status: "pending",
    occurredAt: "2026-08-29T16:30:00.000Z",
    type: "transfer",
    direction: "outgoing",
    bankName: "Zenith Bank",
    category: "transfer",
    ...contactFields("Michael Johnson", 250),
  },
  {
    id: "txn-firstbank-300",
    description: "Transfer failed",
    counterparty: "First Bank",
    reference: "OP-104825",
    accountMask: "**** 1111",
    amount: -300,
    currency: "USD",
    status: "failed",
    occurredAt: "2026-08-28T09:12:00.000Z",
    type: "transfer",
    direction: "outgoing",
    bankName: "First Bank",
    category: "transfer",
    ...contactFields("First Bank", 300),
  },
  {
    id: "txn-carla-750",
    description: "Received from Carla Rose",
    counterparty: "Carla Rose",
    reference: "OP-104826",
    accountMask: "**** 5678",
    amount: 750,
    currency: "USD",
    status: "completed",
    occurredAt: "2026-08-27T12:05:00.000Z",
    type: "receive",
    direction: "incoming",
    bankName: "Barclays",
    category: "transfer",
    ...contactFields("Carla Rose", 750),
  },
  {
    id: "txn-sarah-150",
    description: "Sent to Sarah Wilson",
    counterparty: "Sarah Wilson",
    reference: "OP-104827",
    accountMask: "**** 9876",
    amount: -150,
    currency: "USD",
    status: "completed",
    occurredAt: "2026-08-26T15:44:00.000Z",
    type: "transfer",
    direction: "outgoing",
    bankName: "UBA",
    category: "transfer",
    ...contactFields("Sarah Wilson", 150),
  },
];

const COUNTERPARTIES = [
  "James Okonkwo",
  "Priya Sharma",
  "Noah Bennett",
  "Amara Diallo",
  "Lucas Meyer",
  "Sofia Alvarez",
  "Kenji Watanabe",
  "Elena Popov",
  "Omar Haddad",
  "Maya Chen",
] as const;

const BANKS = [
  "GTBank",
  "Access Bank",
  "Zenith Bank",
  "First Bank",
  "UBA",
  "Barclays",
  "Kuda",
  "Stanbic IBTC",
] as const;

const BILL_PROVIDERS = [
  "Ikeja Electric",
  "DSTV",
  "MTN Airtime",
  "Lagos Water",
] as const;

const TYPES: TransactionType[] = [
  "receive",
  "transfer",
  "bill-payment",
  "deposit",
];

function slugContact(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "");
}

function counterpartyPhone(seed: number) {
  const block = String(100 + (seed % 900)).padStart(3, "0");
  const last = String(1000 + (seed % 9000)).padStart(4, "0");
  return `+234 812 ${block} ${last}`;
}

function counterpartyEmail(name: string) {
  return `${slugContact(name)}@email.test`;
}

function padAccount(last4: number) {
  return `**** ${String(last4).padStart(4, "0")}`;
}

function buildGeneratedTransaction(index: number): Transaction {
  const type = TYPES[index % TYPES.length] ?? "transfer";
  const isIncoming = type === "receive" || type === "deposit";
  const direction: TransactionDirection = isIncoming ? "incoming" : "outgoing";

  let status: TransactionStatus = "completed";
  if (index % 11 === 0) {
    status = "failed";
  } else if (index % 7 === 0) {
    status = "pending";
  }

  const amountMagnitude = 25 + ((index * 17) % 900);
  const amount = isIncoming ? amountMagnitude : -amountMagnitude;

  const dayOffset = index + 1;
  const occurred = new Date(Date.UTC(2026, 7, 25, 15, 30, 0));
  occurred.setUTCDate(occurred.getUTCDate() - dayOffset);
  occurred.setUTCHours(8 + (index % 10), (index * 13) % 60, 0, 0);

  if (type === "bill-payment") {
    const provider =
      BILL_PROVIDERS[index % BILL_PROVIDERS.length] ?? "Ikeja Electric";
    return {
      id: `txn-gen-${String(index).padStart(3, "0")}`,
      description: `Paid ${provider.toLowerCase()} bill`,
      counterparty: provider,
      reference: `OP-2${String(10000 + index)}`,
      accountMask: padAccount(1000 + (index % 9000)),
      amount,
      currency: "USD",
      status,
      occurredAt: occurred.toISOString(),
      type,
      direction,
      bankName: provider,
      category: "bills",
      ...contactFields(provider, index),
    };
  }

  const name = COUNTERPARTIES[index % COUNTERPARTIES.length] ?? "James Okonkwo";
  const bank = BANKS[index % BANKS.length] ?? "GTBank";
  const verb =
    type === "receive"
      ? "Received from"
      : type === "deposit"
        ? "Deposit from"
        : status === "failed"
          ? "Transfer failed to"
          : "Sent to";

  return {
    id: `txn-gen-${String(index).padStart(3, "0")}`,
    description: `${verb} ${name}`,
    counterparty: name,
    reference: `OP-2${String(10000 + index)}`,
    accountMask: padAccount(2000 + (index % 8000)),
    amount,
    currency: "USD",
    status,
    occurredAt: occurred.toISOString(),
    type,
    direction,
    bankName: bank,
    category: type === "deposit" ? "deposit" : "transfer",
    ...contactFields(name, index),
  };
}

function buildMockTransactions(): Transaction[] {
  const generatedCount = MOCK_TRANSACTION_COUNT - FEATURED_TRANSACTIONS.length;
  const generated = Array.from({ length: generatedCount }, (_, index) =>
    buildGeneratedTransaction(index),
  );

  return [...FEATURED_TRANSACTIONS, ...generated];
}

export const mockTransactions: Transaction[] = buildMockTransactions();
