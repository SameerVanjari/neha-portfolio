import type { Metadata } from "next";
import InspiritPhysicsCase from "@/components/case/InspiritPhysicsCase";

export const metadata: Metadata = {
  title: "Inspirit VR Physics — A sci-fi carnival where physics is something you do",
  description:
    "A VR physics lab built on the NGSS curriculum: launch a cannon, throw objects and walk under their parabolas. VR Design Intern · Inspirit VR, founded by Stanford researchers.",
};

export default function InspiritPhysicsPage() {
  return <InspiritPhysicsCase />;
}
