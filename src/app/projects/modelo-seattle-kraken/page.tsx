import type { Metadata } from "next";
import ModeloCase from "@/components/case/ModeloCase";

export const metadata: Metadata = {
  title: "Modelo × Seattle Kraken — The Skate Challenge",
  description:
    "A modern-day retro hockey game, played in the phone’s browser, that turned a brand partnership into sweepstakes entries.",
};

export default function ModeloSeattleKrakenPage() {
  return <ModeloCase />;
}
