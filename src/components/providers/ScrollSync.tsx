"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { sceneState } from "@/lib/sceneState";

export default function ScrollSync() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          scrub: 0.6,
          onUpdate: (self) => {
            sceneState.progress = self.progress;
          },
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
