import type { Metadata } from "next";
import AscensionCase from "@/components/case/AscensionCase";

export const metadata: Metadata = {
  title: "Ascension Realty — Walk through a building before it’s built",
  description:
    "A mobile AR experience that takes buyers from a city skyline down into a single room, before construction begins. Concept to demo build in a 3-week sprint. Client work delivered at CXR Agency (Kinemeric).",
};

export default function AscensionPage() {
  return <AscensionCase />;
}
