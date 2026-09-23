import { createElement } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TotalBalanceCard } from "@/features/dashboard/components/total-balance-card";
import { resetTransferDraft } from "@/features/transfers/store/transfer-draft-store";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }));

afterEach(() => { cleanup(); resetTransferDraft(); sessionStorage.clear(); });

it("offers Transactions instead of More, without wallet navigation or changing other controls", () => {
  const client = new QueryClient();
  const onToggleVisibility = jest.fn();
  const view = render(createElement(QueryClientProvider, { client }, createElement(TotalBalanceCard, {
    availableBalance: 10680, currency: "USD", monthlyChangePercent: 4.8,
    balanceVisible: true, onToggleVisibility,
  })));
  try {
    expect(view.queryByRole("button", { name: "View wallets" })).not.toBeInTheDocument();
    expect(view.container.querySelector('a[href="/wallets"]')).toBeNull();
    expect(view.queryByRole("button", { name: "More" })).not.toBeInTheDocument();
    expect(view.getByRole("link", { name: "Transactions" })).toHaveAttribute("href", "/transactions");
    expect(view.getByRole("link", { name: "Receive" })).toHaveAttribute("href", "/transactions?type=receive");
    expect(view.getByText("$10,680.00")).toBeInTheDocument();
    expect(view.getByRole("button", { name: "Balance currency USD. Change display currency" })).toBeInTheDocument();
    fireEvent.click(view.getByRole("button", { name: "Hide balance" }));
    expect(onToggleVisibility).toHaveBeenCalledTimes(1);
    fireEvent.click(view.getByRole("button", { name: "Send Money" }));
    expect(mockPush).toHaveBeenCalledWith("/transfers");
  } finally { client.clear(); }
});
