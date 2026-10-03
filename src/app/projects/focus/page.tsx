import type { Metadata } from "next";
import FocusCase from "@/components/case/FocusCase";

export const metadata: Metadata = {
  title: "Focus — Hold the boundaries you set. Don’t guess at intentions.",
  description:
    "A distraction-to-intention app that protects what you picked up your phone to do, instead of guessing what you meant. Designer · Independent concept project for the Interaction Design Foundation.",
};

export default function FocusPage() {
  return <FocusCase />;
}
