"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  max?: number;
}

export default function TiltCard({ children, className, max = 7 }: TiltCardProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = inner.current;
    const parent = wrap.current;
    if (!el || !parent) return;

    const setX = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
    const setY = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setY(px * max);
      setX(-py * max);
    };
    const onLeave = () => {
      setX(0);
      setY(0);
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [max]);

  return (
    <div ref={wrap} style={{ perspective: 1000 }} className={className}>
      <div
        ref={inner}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        className="h-full"
      >
        {children}
      </div>
    </div>
  );
}
