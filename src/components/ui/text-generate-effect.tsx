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

  // Scroll-reveal via IntersectionObserver, with a safety timeout so the
  // text always appears even if the observer never fires (e.g. after a
  // client-side navigation).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let fallback: ReturnType<typeof setTimeout> | null = null;
    let io: IntersectionObserver | null = null;

    const reveal = () => {
      setVisible(true);
      io?.disconnect();
      if (fallback) clearTimeout(fallback);
    };

    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);

    // Safety net.
    fallback = setTimeout(reveal, 4000);

    return () => {
      io?.disconnect();
      if (fallback) clearTimeout(fallback);
    };
  }, []);

  const isVisible = visible || !!reduce;

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
        className={cn("tge", isVisible && "tge--visible", reduce && "tge--reduce", className)}
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
