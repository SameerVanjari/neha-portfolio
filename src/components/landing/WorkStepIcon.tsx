/**
 * Line-art illustrations for the "How I work" steps. One drawing per card,
 * keyed by the step number, in the site's editorial line language: 1.6px ink
 * strokes with a single indigo accent (the same indigo as the step numbers).
 * Decorative — the card title carries the meaning — so the SVGs are
 * aria-hidden.
 */

const INK = "#17161B";
const ACCENT = "#3B33B5";
const HAIR = "#CFC7BA";

const s = {
  fill: "none",
  stroke: INK,
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export default function WorkStepIcon({ num, className = "" }: { num: string; className?: string }) {
  const svg = { viewBox: "0 0 48 48", className, "aria-hidden": true } as const;

  switch (num) {
    // 01 · Discover — a magnifier over scattered findings.
    case "01":
      return (
        <svg {...svg}>
          <circle cx="21" cy="21" r="11" {...s} />
          <path d="M29.3 29.3 40 40" {...s} />
          <circle cx="17" cy="19" r="1.7" fill={ACCENT} />
          <circle cx="24" cy="17" r="1.7" fill={ACCENT} />
          <circle cx="20" cy="25" r="1.7" fill={ACCENT} />
        </svg>
      );

    // 02 · Define — a target, the intent the work aims at.
    case "02":
      return (
        <svg {...svg}>
          <circle cx="24" cy="24" r="14.5" {...s} />
          <circle cx="24" cy="24" r="8.2" {...s} />
          <circle cx="24" cy="24" r="2.4" fill={ACCENT} />
          <path d="M24 4.5V9.5M24 38.5V43.5M4.5 24H9.5M38.5 24H43.5" {...s} />
        </svg>
      );

    // 03 · Envision — a flow of nodes taking shape.
    case "03":
      return (
        <svg {...svg}>
          <rect x="6" y="9" width="14" height="10" rx="3" {...s} />
          <rect x="28" y="9" width="14" height="10" rx="3" fill="none" stroke={ACCENT} strokeWidth="1.6" />
          <rect x="17" y="29" width="14" height="10" rx="3" {...s} />
          <path d="M20 14H28" {...s} />
          <path d="M13 19v5.5c0 2.5 1.8 4.5 4.3 4.5" {...s} />
          <path d="M35 19v5.5c0 2.5-1.8 4.5-4.3 4.5" {...s} />
        </svg>
      );

    // 04 · Prototype — a testing window with live controls.
    case "04":
      return (
        <svg {...svg}>
          <rect x="7" y="10" width="34" height="27" rx="3.5" {...s} />
          <path d="M7 16.5H41" {...s} />
          <path d="M13 23h21" stroke={HAIR} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="27" cy="23" r="3" fill={ACCENT} />
          <path d="M13 30h15" stroke={HAIR} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="22" cy="30" r="3" {...s} />
        </svg>
      );

    // 05 · Ship & learn — measured results, trending up.
    case "05":
    default:
      return (
        <svg {...svg}>
          <path d="M9 10v28h30" {...s} />
          <path d="M14 31.5 21 24.5 27 28.5 38 16.5" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 16.5h6v6" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
