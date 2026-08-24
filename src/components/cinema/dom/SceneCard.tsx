"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface SceneCardProps {
  index: number;
  heightClass: string;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
  id?: string;
}

export default function SceneCard({
  index,
  heightClass,
  align = "left",
  children,
  id,
}: SceneCardProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const targets = el.querySelectorAll("[data-fade]");
      if (targets.length === 0) return;

      // One timeline scrubbed across the whole section:
      // fade in early, hold while visible, fade out late.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          end: "top -40%",
          scrub: true,
        },
        defaults: { ease: "power1.inOut" },
      });
      tl.fromTo(
        targets,
        { opacity: 0, y: 44, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2, stagger: 0.08 },
        0
      ).to(targets, { opacity: 0, y: -30, filter: "blur(4px)", duration: 0.2, stagger: 0.06 }, 0.8);
    },
    { scope: ref }
  );

  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left";

  return (
    <section
      ref={ref}
      data-scene={index}
      id={id}
      className={`relative ${heightClass}`}
    >
      <div className={`absolute inset-0 flex justify-center px-6 md:px-12 ${alignClass}`}>
        <div className="w-full max-w-6xl">{children}</div>
      </div>
    </section>
  );
}
