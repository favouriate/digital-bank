import { mockTransactions } from "@/mocks/transactions";
import {
  buildReceiptText,
  fictionalIpFromId,
  partyCardTitle,
  partyKind,
  partyRowLabel,
  statusSentence,
  summaryTitle,
  TRANSACTION_CHANNEL,
} from "@/features/transactions/lib/transaction-details";

const david = mockTransactions.find((item) => item.id === "txn-david-500");
const astrid = mockTransactions.find((item) => item.id === "txn-astrid-800");
const bill = mockTransactions.find((item) => item.id === "txn-electricity-120");
const pending = mockTransactions.find((item) => item.id === "txn-michael-250");
const failed = mockTransactions.find((item) => item.id === "txn-firstbank-300");

describe("transaction details helpers", () => {
  it("derives a stable fictional IP from the transaction id", () => {
    expect(fictionalIpFromId("txn-david-500")).toMatch(/^197\.210\.\d{1,3}\.\d{1,3}$/);
    expect(fictionalIpFromId("txn-david-500")).toBe(
      fictionalIpFromId("txn-david-500"),
    );
    expect(fictionalIpFromId("txn-david-500")).not.toBe(
      fictionalIpFromId("txn-astrid-800"),
    );
  });

  it("labels incoming, outgoing, and bill parties", () => {
    expect(david).toBeDefined();
    expect(astrid).toBeDefined();
    expect(bill).toBeDefined();

    expect(partyKind(david!)).toBe("sender");
    expect(partyCardTitle("sender")).toBe("Sender Details");
    expect(partyRowLabel("sender")).toBe("Sender");
    expect(summaryTitle(david!)).toBe("Money received");
    expect(statusSentence(david!)).toBe(
      "The money has been credited to your account.",
    );

    expect(partyKind(astrid!)).toBe("recipient");
    expect(summaryTitle(astrid!)).toBe("Money sent");
    expect(statusSentence(astrid!)).toBe("The money has been sent.");

    expect(partyKind(bill!)).toBe("provider");
    expect(summaryTitle(bill!)).toBe("Bill payment");
    expect(statusSentence(bill!)).toBe("The bill payment has been completed.");
  });

  it("uses calm copy for pending and failed statuses", () => {
    expect(statusSentence(pending!)).toBe(
      "This transaction is still processing.",
    );
    expect(statusSentence(failed!)).toBe(
      "This transaction could not be completed.",
    );
  });

  it("builds a text receipt with the visible details fields", () => {
    const receipt = buildReceiptText(david!);

    expect(receipt).toContain("OpenPay Transaction Receipt");
    expect(receipt).toContain("txn-david-500");
    expect(receipt).toContain("David Morris");
    expect(receipt).toContain("Payment for lunch");
    expect(receipt).toContain(TRANSACTION_CHANNEL);
    expect(receipt).toContain("david.morris@email.com");
    expect(receipt).not.toContain("TXN-83920183");
  });
});
