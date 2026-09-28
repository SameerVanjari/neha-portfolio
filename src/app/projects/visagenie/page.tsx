import type { Metadata } from "next";
import VisaGenieCase from "@/components/case/VisaGenieCase";

export const metadata: Metadata = {
  title: "VisaGenie — Empowering transparent visa journeys",
  description:
    "An AI chatbot that gives free, professional-quality visa guidance, flags illegal employer charges, and explains why an application was rejected. Lead UX Researcher & Designer, 12 weeks.",
};

export default function VisaGeniePage() {
  return <VisaGenieCase />;
}
