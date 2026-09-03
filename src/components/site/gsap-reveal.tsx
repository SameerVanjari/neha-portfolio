"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "@/hooks/use-gsap";

export function GsapReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 92%",
            once: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [delay] }
  );

  return <div ref={ref}>{children}</div>;
}
