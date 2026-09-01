import type { Metadata } from "next";

import { SendMoneyView } from "@/features/transfers/components/send-money-view";

export const metadata: Metadata = {
  title: "Send Money",
};

export default function TransfersPage() {
  return <SendMoneyView />;
}
