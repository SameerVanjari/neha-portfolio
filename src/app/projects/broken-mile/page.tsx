import type { Metadata } from "next";
import Nav from "@/components/Nav";
import BrokenMileCase from "@/components/case/BrokenMileCase";

export const metadata: Metadata = {
  title: "The Broken Mile — Immersive VR Training for Fiber Optic Technicians",
  description:
    "VR fiber-optic training on Meta Quest 2, published on the Meta Quest Store. A scalable 3D design system and ShapesXR storyboarding cut development cycles by 30%. 7th International VR Awards Finalist.",
};

export default function BrokenMilePage() {
  return (
    <>
      <Nav />
      <BrokenMileCase />
    </>
  );
}
