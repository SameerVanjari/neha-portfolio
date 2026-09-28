import type { Metadata } from "next";
import HarvardCase from "@/components/case/HarvardCase";

export const metadata: Metadata = {
  title: "Harvard MedTech — Immersive Meditation Universe",
  description:
    "A home-based VR therapy experience for people living with chronic pain and stress, designed to work on the very first try.",
};

export default function HarvardMedTechPage() {
  return <HarvardCase />;
}
