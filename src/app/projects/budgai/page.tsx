import type { Metadata } from "next";
import BudgAiCase from "@/components/case/BudgAiCase";

export const metadata: Metadata = {
  title: "BudgAI (Chatoor.ai) — One global money app, with answers you can check",
  description:
    "Scan to pay, send abroad at live rates, split with anyone, and ask plain questions about your spending. AI suggests; you decide.",
};

export default function BudgaiPage() {
  return <BudgAiCase />;
}
