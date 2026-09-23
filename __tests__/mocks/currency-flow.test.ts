import { createElement } from "react";
import { act, fireEvent, render, cleanup } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SendMoneyView } from "@/features/transfers/components/send-money-view";
import { resetTransferDraft, setTransferDraft, useTransferDraftStore } from "@/features/transfers/store/transfer-draft-store";
import { resetTransferMocks } from "@/features/transfers/mocks/mock-transfer-service";
import { mockTransactions } from "@/mocks/transactions";
import { getAvailableBalanceMinor } from "@/features/dashboard/mocks/mock-account";

afterEach(() => { cleanup(); resetTransferDraft(); resetTransferMocks(); jest.useRealTimers(); });

it("preserves NGN through Amount, Review, PIN, Processing, Result and transaction creation", async () => {
  jest.useFakeTimers();
  resetTransferMocks();
  resetTransferDraft();
  setTransferDraft({ resolvedRecipient: {
    id: "flow-ngn", name: "Test Recipient", initials: "TR", avatarUrl: null,
    bankId: "test-bank", bankName: "Test Bank", countryCode: "NG", currencyCode: "NGN", accountNumberMasked: "**** 1234",
  } });
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const view = render(createElement(QueryClientProvider, { client }, createElement(SendMoneyView)));
  try {
    await act(async () => { await jest.advanceTimersByTimeAsync(500); });
    fireEvent.change(view.getByRole("textbox", { name: "Amount" }), { target: { value: "50000" } });
    fireEvent.click(view.getByRole("button", { name: /^Continue$/ }));
    await act(async () => { await jest.advanceTimersByTimeAsync(500); });
    expect(view.getByText(/Confirm ₦50,000.00 to/)).toBeInTheDocument();
    expect(useTransferDraftStore.getState()).toMatchObject({ amount: 50000, destinationCurrencyCode: "NGN" });
    fireEvent.click(view.getByRole("button", { name: "Continue to PIN" }));
    expect(view.getByText(/Authorize ₦50,000.00 to/)).toBeInTheDocument();
    fireEvent.change(view.getByLabelText("4-digit PIN"), { target: { value: "1234" } });
    fireEvent.click(view.getByRole("button", { name: "Confirm transfer" }));
    await act(async () => { await jest.advanceTimersByTimeAsync(460); });
    expect(view.getByText(/Sending ₦50,000.00 to/)).toBeInTheDocument();
    await act(async () => { await jest.advanceTimersByTimeAsync(1000); });
    expect(view.getByText(/₦50,000.00 is on its way/)).toBeInTheDocument();
    expect(mockTransactions[0]).toMatchObject({ amount: -50000, currency: "NGN" });
    expect(getAvailableBalanceMinor()).toBe(1064774);
  } finally { client.clear(); }
});
