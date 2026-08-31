import {
  mockAddMoney,
  mockGetAddMoneyPage,
} from "../mocks/mock-add-money-service";
import type {
  AddMoneyPageData,
  AddMoneyRequest,
  AddMoneyResult,
} from "../types/add-money";

export async function getAddMoneyPage(): Promise<AddMoneyPageData> {
  return mockGetAddMoneyPage();
}

export async function addMoney(
  request: AddMoneyRequest,
): Promise<AddMoneyResult> {
  return mockAddMoney(request);
}
