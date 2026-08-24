"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "down" | "left" | "right";
  stagger?: boolean;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const dirs = { up: 44, down: -44, left: 44, right: -44 };
      const y = from === "up" || from === "down" ? dirs[from] : 0;
      const x = from === "left" || from === "right" ? dirs[from] : 0;

      const targets = stagger ? el.children : el;
      gsap.fromTo(
        targets,
        { opacity: 0, y, x },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay,
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [delay, from, stagger] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
