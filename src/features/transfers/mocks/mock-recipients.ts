import type { Recipient } from "../types/transfer";

const INITIAL_RECIPIENTS: Recipient[] = [
  {
    id: "contact-astrid-hayes",
    name: "Astrid Hayes",
    email: "astrid.hayes@example.com",
    initials: "AH",
    avatarUrl: null,
    frequent: true,
  },
  {
    id: "contact-dakota-milk",
    name: "Dakota Milk",
    email: "dakota.milk@example.com",
    initials: "DM",
    avatarUrl: null,
    frequent: true,
  },
  {
    id: "contact-michael",
    name: "Michael",
    email: "michael@example.com",
    initials: "MI",
    avatarUrl: null,
    frequent: true,
  },
  {
    id: "contact-sarah",
    name: "Sarah",
    email: "sarah@example.com",
    initials: "SA",
    avatarUrl: null,
    frequent: false,
  },
  {
    id: "contact-antonia",
    name: "Antonia",
    email: "antonia@example.com",
    initials: "AN",
    avatarUrl: null,
    frequent: false,
  },
];

let recipients: Recipient[] = INITIAL_RECIPIENTS.map((recipient) => ({
  ...recipient,
}));

export function getMockRecipients() {
  return recipients;
}

export function addMockRecipient(recipient: Recipient) {
  recipients = [recipient, ...recipients];
  return recipient;
}

export function resetTransferRecipientMocks() {
  recipients = INITIAL_RECIPIENTS.map((recipient) => ({ ...recipient }));
}
