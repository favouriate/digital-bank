import { createElement } from "react";
import { fireEvent, render } from "@testing-library/react";

import { AmountEntry } from "@/features/transfers/components/amount-entry";
import { formatTransferAmount } from "@/features/transfers/lib/format";
import { getQuickAmounts } from "@/features/transfers/lib/quick-amounts";

function renderEntry(value = "") {
  const onChange = jest.fn();
  const view = render(
    createElement(AmountEntry, {
      value,
      error: null,
      currencyCode: "ZAR",
      countryCode: "ZA",
      destAvailableBalance: 127_464.25,
      usdAvailableBalance: 7_003.53,
      onChange,
    }),
  );
  return { ...view, onChange };
}

it("renders accessible quick amounts in normal flow and disables browser autocomplete", () => {
  const view = renderEntry();
  const input = view.getByRole("textbox", { name: "Amount" });
  expect(input).toHaveAttribute("autocomplete", "off");
  expect(view.getByLabelText("Quick amounts")).toHaveClass("overflow-x-auto");

  for (const amount of getQuickAmounts("ZAR")) {
    const label = formatTransferAmount(amount, "ZAR");
    expect(view.getByRole("button", { name: `Set amount to ${label}` })).toBeInTheDocument();
  }
});

it("sets the input value from a chip and marks the matching chip selected", () => {
  const amount = getQuickAmounts("ZAR")[2];
  const label = formatTransferAmount(amount, "ZAR");
  const view = renderEntry("5,000.00");
  const chip = view.getByRole("button", { name: `Set amount to ${label}` });
  expect(chip).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(chip);
  expect(view.onChange).toHaveBeenCalledWith("5,000.00");
});
