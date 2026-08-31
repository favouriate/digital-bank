import type { Metadata } from "next";

import { AddMoneyView } from "@/features/add-money/components/add-money-view";

export const metadata: Metadata = {
  title: "Add Money",
};

export default function AddMoneyPage() {
  return <AddMoneyView />;
}
