"use client";

import { useCallback, useEffect, useState } from "react";

import { isCurrencyCode } from "@/lib/currency";
import type { CurrencyCode } from "@/types/currency";

const STORAGE_KEY = "openpay.display-currency";

export function useDisplayCurrency(baseCurrency: CurrencyCode) {
  const [displayCurrency, setDisplayCurrencyState] =
    useState<CurrencyCode>(baseCurrency);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (isCurrencyCode(stored)) {
      setDisplayCurrencyState(stored);
    }
  }, []);

  const setDisplayCurrency = useCallback((currency: CurrencyCode) => {
    setDisplayCurrencyState(currency);
    sessionStorage.setItem(STORAGE_KEY, currency);
  }, []);

  return { displayCurrency, setDisplayCurrency };
}
