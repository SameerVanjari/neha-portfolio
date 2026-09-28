import type { Metadata } from "next";
import FtcCase from "@/components/case/FtcCase";

export const metadata: Metadata = {
  title: "Feed the Children — Empty cabinets, full impact",
  description:
    "A browser-based WebAR experience that makes childhood food insecurity visible and drives donations. No app, no headset, just a phone. Client work for Feed the Children, delivered at CXR Agency (Kinemeric).",
};

export default function FtcPage() {
  return <FtcCase />;
}
