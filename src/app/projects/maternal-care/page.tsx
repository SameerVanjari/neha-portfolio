import type { Metadata } from "next";
import MaternalCareCase from "@/components/case/MaternalCareCase";

export const metadata: Metadata = {
  title: "Emergency Delivery Aid — An aid for the smallest clinic in rural India",
  description:
    "Field research across Nashik district led to an emergency delivery aid for Sub Centres that supports the squatting posture rural women already live in. Best Graduation Project award, B.Des Product Design, 2017.",
};

export default function MaternalCarePage() {
  return <MaternalCareCase />;
}
