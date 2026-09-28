import type { Metadata } from "next";
import CharmCase from "@/components/case/CharmCase";

export const metadata: Metadata = {
  title: "Charm City Kings — They call me…",
  description:
    "An AR face filter and social campaign that turned fans into the film’s characters, for HBO Max’s first exclusive movie.",
};

export default function CharmCityKingsPage() {
  return <CharmCase />;
}
