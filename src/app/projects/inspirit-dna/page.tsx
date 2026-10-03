import type { Metadata } from "next";
import InspiritDnaCase from "@/components/case/InspiritDnaCase";

export const metadata: Metadata = {
  title: "Inspirit VR DNA — Molecular structure of DNA, explored and built by hand",
  description:
    "A spaceship carries students into a eukaryotic cell and into the chromatin, where they explore DNA’s structure and then construct it themselves. VR Design Intern · Inspirit VR graduation internship project, 4 weeks.",
};

export default function InspiritDnaPage() {
  return <InspiritDnaCase />;
}
