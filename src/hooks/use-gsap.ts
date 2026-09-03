"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { useGSAP, gsap, ScrollTrigger };
