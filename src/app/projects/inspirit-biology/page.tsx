import type { Metadata } from "next";
import InspiritBiologyCase from "@/components/case/InspiritBiologyCase";

export const metadata: Metadata = {
  title: "Inspirit VR Biology — Fly a spaceship inside the cell",
  description:
    "Four biology modules, from building a eukaryotic cell to transcription, DNA replication and translation, storyboarded and designed for HTC Vive and Oculus Quest.",
};

export default function InspiritBiologyPage() {
  return <InspiritBiologyCase />;
}
