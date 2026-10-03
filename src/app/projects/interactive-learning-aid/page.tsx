import type { Metadata } from "next";
import InteractiveLearningAidCase from "@/components/case/InteractiveLearningAidCase";

export const metadata: Metadata = {
  title: "Interactive Learning Aid — Touch a tag, and the face lights up",
  description:
    "An Arduino learning aid that teaches young children the parts of the face. Each name tag hides an IR sensor; touch it, and the matching part lights up.",
};

export default function InteractiveLearningAidPage() {
  return <InteractiveLearningAidCase />;
}
