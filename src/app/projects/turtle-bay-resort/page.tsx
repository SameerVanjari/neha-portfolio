import type { Metadata } from "next";
import TurtleCase from "@/components/case/TurtleCase";

export const metadata: Metadata = {
  title: "Turtle Bay Resort — A door onto the beach at Turtle Bay",
  description:
    "Place a door in any room, step through, and you’re on the resort’s private beach at sunrise. WebAR portal, no app to install.",
};

export default function TurtleBayResortPage() {
  return <TurtleCase />;
}
