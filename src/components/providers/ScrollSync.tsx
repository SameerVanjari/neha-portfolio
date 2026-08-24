"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sceneState, SCENE_COUNT } from "@/lib/sceneState";

export default function ScrollSync() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master scrub — drives global progress.
      gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          scrub: 0.6,
          onUpdate: (self) => {
            sceneState.progress = self.progress;
            for (let i = 0; i < SCENE_COUNT; i++) {
              const b = sceneState.bounds[i];
              if (!b) continue;
              sceneState.scenes[i] = Math.min(
                1,
                Math.max(0, (sceneState.progress - b[0]) / (b[1] - b[0]))
              );
            }
          },
        },
      });

      // Compute per-scene bounds from actual layout.
      const compute = () => {
        const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
        if (els.length < SCENE_COUNT) return;
        const scrollable = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const bounds: [number, number][] = els.map((el) => {
          const top = (el.getBoundingClientRect().top + window.scrollY) / scrollable;
          const bottom = (el.getBoundingClientRect().bottom + window.scrollY) / scrollable;
          return [
            Math.min(1, Math.max(0, top)),
            Math.min(1, Math.max(0, bottom)),
          ];
        });
        sceneState.bounds = bounds;
        ScrollTrigger.refresh();
      };

      compute();
      const t1 = setTimeout(compute, 900);
      const t2 = setTimeout(compute, 2600);
      window.addEventListener("resize", compute);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener("resize", compute);
      };
    });
    return () => ctx.revert();
  }, []);

  return null;
}
