import type { Metadata } from "next";
import TdCase from "@/components/case/TdCase";

export const metadata: Metadata = {
  title: "TD Bank One Vanderbilt — A cardboard skyscraper that comes alive in AR",
  description:
    "People build One Vanderbilt with their own hands, point a phone at it, and watch the tower celebrate in TD green.",
};

export default function TdBankOneVanderbiltPage() {
  return <TdCase />;
}
