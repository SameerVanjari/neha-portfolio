import type { Metadata } from "next";
import PausaCase from "@/components/case/PausaCase";

export const metadata: Metadata = {
  title: "Pausa — An AI check-in companion that knows its limits",
  description:
    "Pausa is a conversational AI check-in companion for mental wellness on mobile and web. Research, conversation design, UX and visual design, end to end — from a research paper to hi-fi.",
};

export default function PausaPage() {
  return <PausaCase />;
}
