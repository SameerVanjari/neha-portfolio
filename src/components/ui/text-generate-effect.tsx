"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextGenerateEffect({
  words,
  className,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const wordsArray = words.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .tge-word{
          display: inline-block;
          opacity: 0;
          transform: translateY(8px);
        }
        .tge--visible .tge-word{
          animation: tge-in 300ms var(--ease-out) forwards;
          animation-delay: calc(var(--i) * 50ms);
        }
        .tge--reduce .tge-word{
          opacity: 1;
          transform: none;
          animation: none;
        }
        .tge--reduce.tge--visible .tge-word{
          animation: tge-in 150ms var(--ease-out) forwards;
          animation-delay: 0ms;
        }
        @keyframes tge-in{
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce){
          .tge-word{
            opacity: 1;
            transform: none;
          }
          .tge--visible .tge-word{
            animation: tge-in 150ms var(--ease-out) forwards;
            animation-delay: 0ms;
          }
        }
      `}</style>
      <span
        ref={ref}
        className={cn("tge", visible && "tge--visible", reduce && "tge--reduce", className)}
      >
        {wordsArray.map((word, idx) => (
          <span key={`${word}-${idx}`} className="tge-word" style={{ ["--i" as string]: idx }}>
            {word}&nbsp;
          </span>
        ))}
      </span>
    </>
  );
}
