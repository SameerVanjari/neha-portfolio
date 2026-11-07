import type { Metadata } from "next";
import XrRoundupCase from "@/components/case/XrRoundupCase";

export const metadata: Metadata = {
  title: "XR Roundup — Tilt your head… BOO!",
  description:
    "A no-install AR photo booth for the Halloween edition of XR Roundup. Scan a QR code, pick a filter, and walk away with a photo that carries the event with it.",
};

export default function XrRoundupPage() {
  return <XrRoundupCase />;
}
