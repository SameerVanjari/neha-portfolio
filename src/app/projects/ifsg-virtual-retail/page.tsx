import type { Metadata } from "next";
import IfsgCase from "@/components/case/IfsgCase";

export const metadata: Metadata = {
  title: "IFSG — A luxury shopping metaverse you can reach into",
  description:
    "A futuristic virtual store where shoppers explore curated brands in an interactive 3D world, in VR, with an AR prototype for phones.",
};

export default function IfsgVirtualRetailPage() {
  return <IfsgCase />;
}
