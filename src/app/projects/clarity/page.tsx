import type { Metadata } from "next";
import ClarityCase from "@/components/case/ClarityCase";

export const metadata: Metadata = {
  title: "Clarity — An AI copilot for the mortgage lifecycle",
  description:
    "Clarity is a self-initiated concept for a borrower app and loan officer copilot in regulated fintech. AI guides, humans decide — ECOA, Reg B and TRID shape the constraint. Task analysis to hi-fi, designed end to end.",
};

export default function ClarityPage() {
  return <ClarityCase />;
}
