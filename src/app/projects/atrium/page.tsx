import type { Metadata } from "next";
import AtriumCase from "@/components/case/AtriumCase";

export const metadata: Metadata = {
  title: "Atrium — Social VR workspace for distributed teams (NDA)",
  description:
    "End-to-end interaction design for a multi-user VR collaboration platform on PICO 4 with a companion mobile app, for a large public-sector organization. Lead Immersive Experience Designer · CXR Agency (Kinemeric). Under NDA.",
};

export default function AtriumPage() {
  return <AtriumCase />;
}
