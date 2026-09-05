"use client";

import { cn } from "@/lib/utils";

type WordStaggerProps = {
  text: string;
  className?: string;
  /** per-letter stagger in ms, 18-40 (letters need tighter stagger than words) */
  stagger?: number;
};

/**
 * Letter stagger up on hover — feedback for CTAs
 * Gate: tens/day (hover) → near-imperceptible, fast & subtle
 * Tool: CSS transition (cheapest), transform + opacity only
 */
export function WordStagger({ text, className, stagger = 30 }: WordStaggerProps) {
  const words = text.trim().split(/\s+/);
  let gi = 0;
  const renderLetters = (keyPrefix: string) =>
    words.map((word, wi) => (
      <span key={`${keyPrefix}-w-${wi}`} className="inline-flex">
        {word.split("").map((ch, ci) => {
          const delay = gi++ * stagger;
          return (
            <span
              key={`${keyPrefix}-${wi}-${ci}`}
              className="word-stagger__char inline-block will-change-transform"
              style={{ transitionDelay: `${delay}ms` } as React.CSSProperties}
            >
              {ch}
            </span>
          );
        })}
        {wi < words.length - 1 && (
          <span className="inline-block" style={{ width: "0.32em" }} aria-hidden>
            &nbsp;
          </span>
        )}
      </span>
    ));
  // need to reset gi for second layer — use same delays, so clone with fresh counter
  const renderLettersHover = () => {
    let gj = 0;
    return words.map((word, wi) => (
      <span key={`h-w-${wi}`} className="inline-flex">
        {word.split("").map((ch, ci) => {
          const delay = gj++ * stagger;
          return (
            <span
              key={`h-${wi}-${ci}`}
              className="word-stagger__char inline-block will-change-transform"
              style={{ transitionDelay: `${delay}ms` } as React.CSSProperties}
            >
              {ch}
            </span>
          );
        })}
        {wi < words.length - 1 && (
          <span className="inline-block" style={{ width: "0.32em" }} aria-hidden>
            &nbsp;
          </span>
        )}
      </span>
    ));
  };

  return (
    <span className={cn("word-stagger relative inline-flex overflow-hidden align-baseline", className)} aria-label={text}>
      {/* default layer */}
      <span aria-hidden className="word-stagger__layer word-stagger__layer--default inline-flex flex-wrap gap-[0.02em]">
        {renderLetters("d")}
      </span>
      {/* hover layer — duplicate, starts below */}
      <span aria-hidden className="word-stagger__layer word-stagger__layer--hover absolute inset-0 inline-flex flex-wrap gap-[0.02em]">
        {renderLettersHover()}
      </span>

      <style>{`
        .word-stagger{ --ease-out: cubic-bezier(0.23,1,0.32,1); }
        .word-stagger__char, .word-stagger__word{
          transition-property: transform, opacity;
          transition-duration: 300ms;
          transition-timing-function: var(--ease-out);
        }
        .word-stagger__layer--hover .word-stagger__char,
        .word-stagger__layer--hover .word-stagger__word{
          transform: translateY(105%);
          opacity: 0;
        }
        @media (hover:hover) and (pointer:fine){
          .word-stagger:hover .word-stagger__layer--default .word-stagger__char,
          .word-stagger:hover .word-stagger__layer--default .word-stagger__word,
          .group:hover .word-stagger .word-stagger__layer--default .word-stagger__char,
          .group:hover .word-stagger .word-stagger__layer--default .word-stagger__word{
            transform: translateY(-105%);
            opacity: 0;
          }
          .word-stagger:hover .word-stagger__layer--hover .word-stagger__char,
          .word-stagger:hover .word-stagger__layer--hover .word-stagger__word,
          .group:hover .word-stagger .word-stagger__layer--hover .word-stagger__char,
          .group:hover .word-stagger .word-stagger__layer--hover .word-stagger__word{
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion:reduce){
          .word-stagger__char, .word-stagger__word{ transition: none !important; transform: none !important; opacity: 1 !important; }
          .word-stagger__layer--hover{ display: none !important; }
        }
      `}</style>
    </span>
  );
}
