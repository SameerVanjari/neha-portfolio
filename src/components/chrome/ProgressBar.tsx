"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-[3px]">
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-cyber via-sigil to-neon shadow-[0_0_12px_rgba(0,240,255,0.6)]"
      />
    </div>
  );
}
