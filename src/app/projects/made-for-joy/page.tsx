import type { Metadata } from "next";
import JoyCase from "@/components/case/JoyCase";

export const metadata: Metadata = {
  title: "Made for Joy — A mindfulness world where the world is the interface",
  description:
    "Interaction design for an immersive VR mindfulness app, with visuals and guides approved by national wellness experts.",
};

export default function MadeForJoyPage() {
  return <JoyCase />;
}
