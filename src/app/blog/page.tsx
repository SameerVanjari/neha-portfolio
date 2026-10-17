import type { Metadata } from "next";
import WritingList from "@/components/WritingList";

export const metadata: Metadata = {
  title: "Writing — NEHA",
  description:
    "Notes and articles by Neha Mayacharya on AI experience, XR, and product design — each opening at its original publication.",
};

export default function BlogPage() {
  return <WritingList />;
}
