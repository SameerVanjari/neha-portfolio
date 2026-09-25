import type { Metadata } from "next";
import ResearchCase from "@/components/case/ResearchCase";

export const metadata: Metadata = {
  title: "Research Recommender — Find papers, take notes, cite them, in one place",
  description:
    "A research paper recommender with smart note-taking and automatic APA, MLA and Chicago citations. Designed and coded end to end.",
};

export default function ResearchRecommenderPage() {
  return <ResearchCase />;
}
