import type { Metadata } from "next";
import VantageCase from "@/components/case/VantageCase";

export const metadata: Metadata = {
  title: "Vantage AI — One resume. Every role. Told your way.",
  description:
    "An AI career co-pilot that turns one resume into a role-specific story: tailored to each job, styled to who you are, and approved by you line by line.",
};

export default function VantageAiPage() {
  return <VantageCase />;
}
