"use client";

import Link from "next/link";
import {
  COMPARATIVE,
  FACTS,
  HIFI,
  HERO,
  IDEATION,
  JOURNEY,
  KEY_DECISIONS,
  NEIGHBORS,
  OUTCOME,
  PRINCIPLE,
  PROBLEM,
  UX_FLOW,
  WIREFRAMES,
} from "@/data/clarity";
import { FOOTER_LINKS } from "@/data/landing";

/* ---------------------------------- tokens --------------------------------- */

const INK = "#1B2A30";
const DARK = "#16262D";
const DARK2 = "#1F333B";
const TEAL = "#1D4F5C";
const AMBER = "#F2B872";
const ORANGE = "#A8581F";
const PAPER = "#F5F3EE";
const HAIR = "#E2DED4";
const MUTED = "#5E6A6E";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/* ------------------------------ shared pieces ------------------------------ */

function Icon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/case/clarity/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}

function SectionHead({
  eyebrow,
  heading,
  note,
  onDark = false,
  size = "lg",
}: {
  eyebrow: string;
  heading: string;
  note?: string;
  onDark?: boolean;
  size?: "lg" | "md";
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-6 pb-9">
      <div className="max-w-[800px]">
        <p className={`text-[11px] font-bold uppercase tracking-[1.32px] ${onDark ? "text-[#F2B872]" : "text-[#1D4F5C]"}`} style={BODY}>
          {eyebrow}
        </p>
        <h2
          className={`mt-[14px] ${size === "lg" ? "text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.38px]" : "text-[26px] md:text-[30px] leading-[1.18] tracking-[-0.3px]"} ${onDark ? "text-[#EEF2F2]" : "text-[#1B2A30]"}`}
          style={DISPLAY}
        >
          {heading}
        </h2>
      </div>
      {note && (
        <p className={`max-w-[340px] pt-[24px] text-[14px] leading-[1.5] ${onDark ? "text-[#B3C0C3]" : "text-[#5E6A6E]"}`} style={BODY}>
          {note}
        </p>
      )}
    </div>
  );
}

/* Drop-zone placeholder panel, exactly per the Figma drop-frame specs */
function DropZone({
  note,
  className = "",
  style,
  noteClass = "text-[#5E6A6E]",
  noteStyle,
}: {
  note: string;
  className?: string;
  style?: React.CSSProperties;
  noteClass?: string;
  noteStyle?: React.CSSProperties;
}) {
  const [first, second] = note.split("\n");
  return (
    <div aria-hidden className={className} style={style}>
      <span className={`block text-[10px] leading-[1.4] ${noteClass}`} style={{ ...BODY, ...noteStyle }}>
        {first}
        {second ? (
          <>
            <br />
            {second}
          </>
        ) : null}
      </span>
    </div>
  );
}

/* ---------------------------------- chrome ---------------------------------- */

function Nav() {
  return (
    <header style={{ background: PAPER }}>
      <div className="mx-auto flex h-[68px] w-full max-w-[1036px] items-center justify-between px-6 lg:px-0">
        <Link href="/" className="text-[16px] font-semibold text-[#1B2A30]" style={DISPLAY}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#1B2A30] pb-[3px] text-[14px] text-[#1B2A30]">
            Work
          </Link>
          <Link href="/about" className="text-[14px] text-[#1B2A30] transition-opacity hover:opacity-70">
            About
          </Link>
          <a href="/resume.pdf" className="text-[14px] text-[#1B2A30] transition-opacity hover:opacity-70">
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] bg-[#1B2A30] px-[20px] text-[14px] font-semibold text-white"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] bg-[#1B2A30] px-[20px] text-[14px] font-semibold text-white md:hidden"
          style={BODY}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <header className="relative overflow-hidden" style={{ background: DARK }}>
      <div
        aria-hidden
        className="pointer-events-none absolute hidden rounded-full border lg:block"
        style={{ width: 900, height: 900, right: -220, top: -260, borderColor: "rgba(255,255,255,0.06)" }}
      />
      <div className="relative mx-auto w-full max-w-[1036px] px-6 pb-[70px] pt-[60px] lg:px-0 lg:pb-16 lg:pt-[70px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="flex max-w-[540px] flex-col items-start gap-9">
            <div className="flex flex-col items-start gap-[18px]">
              <p className="text-[13px] font-semibold" style={{ ...BODY, color: AMBER }}>
                {HERO.eyebrow}
              </p>
              <h1
                className="max-w-[520px] text-[clamp(40px,4.4vw,62px)] font-semibold leading-[1.04] tracking-[-1.24px] text-[#EEF2F2]"
                style={DISPLAY}
              >
                {HERO.title}
              </h1>
              <p className="text-[19px] leading-[1.5] text-[#C3CDCF]" style={BODY}>
                {HERO.subtitle}
              </p>
              <p className="text-[22px] font-semibold text-white" style={DISPLAY}>
                {HERO.principle}
              </p>
            </div>
            <div className="border-l-2 pl-4" style={{ borderColor: AMBER }}>
              <p className="text-[16px] text-[#C3CDCF]" style={BODY}>
                {HERO.role}
              </p>
              <p className="mt-[2px] text-[14px] text-[#93A3A7]" style={BODY}>
                {HERO.roleNote}
              </p>
            </div>
            <a
              href={HERO.cta.href}
              className="inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold text-[#1B2A30] transition-opacity hover:opacity-90"
              style={{ ...BODY, background: PAPER }}
            >
              {HERO.cta.label}
            </a>
          </div>

          {/* Drop-zones, exactly as designed */}
          <div aria-hidden className="relative hidden shrink-0 lg:block" style={{ width: 700, minHeight: 493 }}>
            <div className="absolute left-[90px] top-[54px] h-[360px] w-[576px] rounded-[12px] p-[10px]" style={{ background: "#2A424B" }}>
              <DropZone note={"Drop image\n01-hero-adam-risk-review.png"} className="pl-1 pt-[150px]" noteClass="text-[#F2B872]" />
            </div>
            <div
              className="absolute left-0 top-[154px] h-[433px] w-[200px] rounded-[28px] p-[10px]"
              style={{ background: DARK2, border: "6px solid #0E1A1F" }}
            >
              <DropZone note={"Drop image\n02-hero-laura-home.png"} className="pl-1 pt-[185px]" noteClass="text-[#F2B872]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Facts() {
  return (
    <section aria-label="At a glance" style={{ background: "#0F1C21" }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 lg:px-0">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <li
              key={fact.label}
              className="flex items-start gap-3 py-[22px] lg:px-5 lg:first:pl-0"
              style={{ borderLeft: i > 0 ? "1px solid #28393F" : undefined }}
            >
              <Icon name={fact.icon} size={20} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[11px] tracking-[0.44px] text-[#93A3A7]" style={BODY}>
                  {fact.label.toUpperCase()}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#EEF2F2]" style={BODY}>
                  {fact.value}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={PROBLEM.label} heading={PROBLEM.heading} note={PROBLEM.note} />
      <div className="grid gap-[18px] lg:grid-cols-2">
        {PROBLEM.personas.map((p) => (
          <article key={p.name} className="flex flex-col gap-[18px] rounded-[20px] bg-white px-[30px] py-7">
            <div className="flex items-start gap-[14px]">
              <span
                className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[999px] text-[14px] font-bold"
                style={{ ...BODY, background: p.avatarDark ? DARK : "#E4EEF0", color: p.avatarDark ? "#FFFFFF" : TEAL }}
              >
                {p.initials}
              </span>
              <div>
                <p className="text-[17px] font-semibold leading-[1.5] text-[#1B2A30]" style={DISPLAY}>
                  {p.name}
                </p>
                <p className="text-[13px] text-[#5E6A6E]" style={BODY}>
                  {p.role}
                </p>
              </div>
            </div>
            <p className="max-w-[449px] text-[21px] font-medium leading-[1.3] text-[#1B2A30]" style={DISPLAY}>
              {p.quote}
            </p>
            <ul className="flex flex-col gap-2">
              {p.pains.map((pain) => (
                <li key={pain} className="flex gap-[10px]">
                  <span aria-hidden className="shrink-0 text-[14px] leading-[1.5]" style={{ ...BODY, color: ORANGE }}>
                    —
                  </span>
                  <p className="text-[14px] leading-[1.5] text-[#1B2A30]" style={BODY}>
                    {pain}
                  </p>
                </li>
              ))}
            </ul>
            <span className="mt-2 inline-flex w-fit items-center rounded-[999px] bg-[#E4EEF0] px-3 py-[6px] text-[12px] font-semibold text-[#1D4F5C]" style={BODY}>
              {p.chip}
            </span>
          </article>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2 rounded-[14px] px-[26px] py-5 sm:flex-row sm:items-center sm:gap-6" style={{ background: DARK }}>
        <p className="shrink-0 text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: AMBER }}>
          {PROBLEM.constraint.label.toUpperCase()}
        </p>
        <p className="text-[15px] leading-[1.5] text-[#EEF2F2]" style={BODY}>
          {PROBLEM.constraint.body}
        </p>
      </div>
    </section>
  );
}

function ConfidenceChart() {
  const pts = JOURNEY.confidence.points;
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
  return (
    <div className="h-[110px] w-full rounded-[10px] bg-white">
      <svg viewBox="0 0 918 110" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
        <line x1="10" y1="55" x2="908" y2="55" stroke={HAIR} strokeWidth="1" />
        <path d={d} fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinejoin="round" />
        {pts.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="6" fill={pt.low ? "#D9772E" : TEAL} />
        ))}
      </svg>
    </div>
  );
}

function Journey() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={JOURNEY.label} heading={JOURNEY.heading} note={JOURNEY.note} />
      <div className="min-w-0 overflow-x-auto">
        <div className="min-w-[880px]">
          <div className="flex gap-2 pb-2">
            <div className="w-[110px] shrink-0" />
            {JOURNEY.stages.map((stage) => (
              <div key={stage} className="min-w-0 flex-1">
                <span className="flex h-[41px] items-center rounded-[8px] px-[14px] text-[14px] font-semibold text-white" style={{ ...BODY, background: DARK }}>
                  {stage}
                </span>
              </div>
            ))}
          </div>
          {JOURNEY.rows.map((row) => (
            <div key={row.who} className="flex gap-2 pb-2">
              <div className="w-[110px] shrink-0 pt-[10px]">
                <p className="text-[14px] font-semibold text-[#1B2A30]" style={BODY}>
                  {row.who}
                </p>
                <p className="text-[12px] text-[#5E6A6E]" style={BODY}>
                  {row.sub}
                </p>
              </div>
              {row.cells.map((cell, i) => (
                <div
                  key={i}
                  className="min-w-0 flex-1 rounded-[8px] border p-[14px] py-3"
                  style={{
                    background: row.flagged[i] ? "#F5E8CE" : "#FFFFFF",
                    borderColor: row.flagged[i] ? "#EBC98F" : "transparent",
                  }}
                >
                  <p className="text-[13px] leading-[1.4] text-[#1B2A30]" style={BODY}>
                    {cell}
                  </p>
                </div>
              ))}
            </div>
          ))}
          <div className="flex gap-2">
            <div className="w-[110px] shrink-0 pt-[10px]">
              <p className="text-[14px] font-semibold text-[#1B2A30]" style={BODY}>
                {JOURNEY.confidence.who}
              </p>
              <p className="text-[12px] text-[#5E6A6E]" style={BODY}>
                {JOURNEY.confidence.sub}
              </p>
            </div>
            <div className="min-w-0 flex-1">
              <ConfidenceChart />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-7 grid gap-6 md:grid-cols-3">
        {JOURNEY.patterns.map((pat) => (
          <div key={pat.label} className="flex flex-col gap-[6px] border-t border-[#1B2A30] pt-3">
            <p className="text-[11px] font-bold tracking-[1.1px]" style={{ ...BODY, color: TEAL }}>
              {pat.label.toUpperCase()}
            </p>
            <p className="text-[16px] font-semibold leading-[1.5] text-[#1B2A30]" style={DISPLAY}>
              {pat.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowMightWe() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <div className="flex flex-col gap-[18px] rounded-[22px] bg-[#16262D] p-8 md:p-11">
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: AMBER }}>
          How might we
        </p>
        <p className="max-w-[948px] text-[24px] font-medium leading-[1.35] text-[#EEF2F2] md:text-[28px]" style={DISPLAY}>
          How might we design a connected AI experience, spanning borrower and loan officer, that reduces fragmentation and
          cognitive load through guidance and analysis, while keeping the human as the sole decision-maker at every
          consequential step?
        </p>
        <div className="grid gap-[14px] pt-[10px] md:grid-cols-3">
          {[
            {
              label: "FROM PATTERN 1 · RECONCILIATION",
              text: "…let AI do the cross-checking, so Adam starts from the discrepancy instead of the raw data?",
            },
            {
              label: "FROM PATTERN 2 · OPACITY",
              text: "…replace silence with continuous, honest visibility at Laura’s most anxious moments?",
            },
            {
              label: "FROM PATTERN 3 · COMMUNICATION",
              text: "…give both sides one shared source of truth, where nothing reaches Laura without Adam’s review?",
            },
          ].map((c) => (
            <div key={c.label} className="flex flex-col gap-[10px] rounded-[14px] p-5" style={{ background: DARK2 }}>
              <p className="text-[10px] font-bold tracking-[1px] text-[#93A3A7]" style={BODY}>
                {c.label}
              </p>
              <p className="text-[15px] leading-[1.45] text-[#EEF2F2]" style={BODY}>
                {c.text}
              </p>
            </div>
          ))}
        </div>
        <p className="pt-[12px] text-[14px] text-[#C3CDCF]" style={BODY}>
          Success looks like: fewer systems in Adam’s day · no silent stretches for Laura · every decision traceable to a named
          human
        </p>
      </div>
    </section>
  );
}

/* ----------------------------- comparative ---------------------------------- */

const PILL_STYLES: Record<string, { bg: string; fg: string }> = {
  none: { bg: "#EDEBE6", fg: "#5E6A6E" },
  partial: { bg: "#E4EEF0", fg: TEAL },
  wrong: { bg: "#F5E8CE", fg: ORANGE },
  clarity: { bg: AMBER, fg: DARK },
};

function PositioningMap() {
  const map = COMPARATIVE.map;
  return (
    <div className="rounded-[18px] bg-white p-[22px]">
      <p className="text-[10px] font-bold tracking-[1px] text-[#5E6A6E]" style={BODY}>
        {map.label.toUpperCase()}
      </p>
      <div className="relative mt-[12px]">
        <svg viewBox="0 0 328 300" className="block h-auto w-full" aria-hidden>
          {/* axes */}
          <line x1="30" y1="12" x2="30" y2="270" stroke={MUTED} strokeWidth="1.2" />
          <line x1="30" y1="264" x2="322" y2="264" stroke={MUTED} strokeWidth="1.2" />
          <text
            x="14"
            y="150"
            fontSize="11"
            fill={MUTED}
            fontFamily="Hanken Grotesk, sans-serif"
            transform="rotate(-90 14 150)"
            textAnchor="middle"
          >
            {map.yLabel}
          </text>
          <text x="196" y="284" fontSize="11" fill={MUTED} fontFamily="Hanken Grotesk, sans-serif" textAnchor="middle">
            {map.xLabel}
          </text>
          {/* dots + labels */}
          {map.dots.map((dot) => (
            <g key={dot.name}>
              <circle
                cx={dot.x}
                cy={dot.y}
                r={dot.r}
                fill={dot.tone === "clarity" ? AMBER : dot.tone === "orange" ? ORANGE : dot.tone === "teal" ? TEAL : MUTED}
                stroke={dot.tone === "clarity" ? DARK : "none"}
                strokeWidth={dot.tone === "clarity" ? 2 : 0}
              />
              <text
                x={dot.x + 13}
                y={dot.y - 8}
                fontSize={dot.tone === "clarity" ? 12 : 11}
                fontWeight={dot.tone === "clarity" ? 700 : 500}
                fill={dot.tone === "clarity" ? INK : MUTED}
                fontFamily="Hanken Grotesk, sans-serif"
              >
                {dot.name}
              </text>
            </g>
          ))}
          <text x={map.noteAt.x} y={map.noteAt.y} fontSize="11" fill={ORANGE} fontFamily="Hanken Grotesk, sans-serif">
            {map.note}
          </text>
        </svg>
      </div>
    </div>
  );
}

function Comparative() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={COMPARATIVE.label} heading={COMPARATIVE.heading} />
      <div className="grid gap-6 lg:grid-cols-[640px_1fr]">
        {/* table */}
        <div className="rounded-[18px] bg-white px-[22px] py-[10px]">
          <div className="flex gap-3 border-b py-3" style={{ borderColor: HAIR }}>
            <p className="w-[150px] shrink-0 text-[10px] font-bold tracking-[1px] text-[#5E6A6E]" style={BODY}>
              PRODUCT
            </p>
            <p className="min-w-0 flex-1 text-[10px] font-bold tracking-[1px] text-[#5E6A6E]" style={BODY}>
              WHAT IT SOLVES
            </p>
            <p className="w-[128px] shrink-0 text-[10px] font-bold tracking-[1px] text-[#5E6A6E]" style={BODY}>
              AI IN THE DECISION
            </p>
          </div>
          {COMPARATIVE.table.map((row, i) => {
            const isClarity = row.tone === "clarity";
            const pill = PILL_STYLES[isClarity ? "clarity" : row.tone];
            return (
              <div
                key={row.product}
                className={`flex gap-3 py-[14px] ${i > 0 && !isClarity ? "border-t" : ""} ${isClarity ? "-mx-[10px] my-[10px] rounded-[12px] px-[10px]" : ""}`}
                style={{ borderColor: isClarity ? undefined : HAIR, background: isClarity ? DARK : undefined }}
              >
                <div className="w-[150px] shrink-0">
                  <p className={`text-[14px] font-semibold leading-[1.5] ${isClarity ? "text-white" : "text-[#1B2A30]"}`} style={DISPLAY}>
                    {row.product}
                  </p>
                  {row.productSub && (
                    <p className="text-[12px] text-[#5E6A6E]" style={BODY}>
                      {row.productSub}
                    </p>
                  )}
                </div>
                <p className={`min-w-0 flex-1 text-[13px] leading-[1.4] ${isClarity ? "text-[#EEF2F2]" : "text-[#1B2A30]"}`} style={BODY}>
                  {row.solves}
                </p>
                <div className="w-[128px] shrink-0">
                  <span
                    className="inline-flex items-center rounded-[999px] px-[10px] py-[4px] text-[12px] font-semibold"
                    style={{ ...BODY, background: pill.bg, color: pill.fg }}
                  >
                    {row.pill}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* map */}
        <PositioningMap />
      </div>
    </section>
  );
}

/* -------------------------------- ideation ---------------------------------- */

function DirectionDiagram({ kind, dark }: { kind: string; dark: boolean }) {
  const chip = (label: string) => (
    <span
      className="inline-flex h-[40px] shrink-0 items-center justify-center rounded-[8px] px-3 text-[12px]"
      style={{
        ...BODY,
        background: dark ? "#E4EEF0" : "#FFFFFF",
        color: dark ? INK : INK,
        border: `1px solid ${dark ? "rgba(238,242,242,0.9)" : INK}`,
      }}
    >
      {label}
    </span>
  );
  if (kind === "two-boxes") {
    return (
      <div className="flex items-center gap-2">
        {chip("Tracker")}
        <span className="flex-1 border-t border-dashed" style={{ borderColor: ORANGE }} />
        <span className="text-[13px]" style={{ ...BODY, color: ORANGE }}>
          ?
        </span>
        <span className="border-t border-transparent" />
        {chip("LO tool")}
      </div>
    );
  }
  if (kind === "ai-human") {
    return (
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-[40px] shrink-0 items-center justify-center rounded-[8px] px-3 text-[12px] text-white"
          style={{ ...BODY, background: "#6E7C80" }}
        >
          AI underwrites
        </span>
        <span className="w-[30px] shrink-0 border-t" style={{ borderColor: INK }} />
        <span
          className="inline-flex h-[36px] flex-1 items-center justify-center rounded-[8px] text-[11px] text-[#1B2A30]"
          style={{ ...BODY, background: "#FFFFFF", border: `1.2px solid ${INK}` }}
        >
          human if flagged
        </span>
      </div>
    );
  }
  // copilot (dark card)
  return (
    <div className="flex items-center gap-3">
      <span
        className="inline-flex h-[36px] shrink-0 items-center justify-center rounded-[8px] px-3 text-[12px]"
        style={{ ...BODY, border: "1.4px solid #EEF2F2", color: "#EEF2F2" }}
      >
        Laura
      </span>
      <span className="h-px w-[38px] shrink-0 bg-[#EEF2F2]" />
      <span
        className="inline-flex h-[44px] shrink-0 items-center justify-center rounded-[8px] px-3 text-[12px]"
        style={{ ...BODY, background: "#E4EEF0", color: INK }}
      >
        Record
      </span>
      <span className="h-px w-[38px] shrink-0 bg-[#EEF2F2]" />
      <span
        className="inline-flex h-[36px] shrink-0 items-center justify-center rounded-[8px] px-3 text-[12px]"
        style={{ ...BODY, border: "1.4px solid #EEF2F2", color: "#EEF2F2" }}
      >
        Adam
      </span>
      <span className="relative flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[9px] font-bold" style={{ ...BODY, background: AMBER, color: DARK }}>
        AI
      </span>
    </div>
  );
}

function Ideation() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={IDEATION.label} heading={IDEATION.heading} note={IDEATION.note} />
      <div className="grid gap-4 lg:grid-cols-3">
        {IDEATION.directions.map((dir) => (
          <article
            key={dir.tag}
            className="flex flex-col gap-4 rounded-[18px] p-6"
            style={{ background: dir.dark ? DARK : "#FFFFFF" }}
          >
            <p className="text-[10px] font-bold tracking-[1px]" style={{ ...BODY, color: dir.dark ? AMBER : MUTED }}>
              {dir.tag.toUpperCase()}
            </p>
            <h3 className={`text-[22px] font-semibold leading-[1.2] ${dir.dark ? "text-white" : "text-[#1B2A30]"}`} style={DISPLAY}>
              {dir.title}
            </h3>
            <div className="pt-2" style={{ color: dir.dark ? "rgba(238,242,242,1)" : undefined }}>
              <DirectionDiagram kind={dir.diagram} dark={dir.dark} />
            </div>
            <p className={`text-[14px] leading-[1.45] ${dir.dark ? "text-[#C3CDCF]" : "text-[#1B2A30]"}`} style={BODY}>
              {dir.body}
            </p>
            <div
              className={`mt-auto flex flex-col gap-[6px] pt-[14px] ${dir.dark ? "border-t border-[#33474F]" : "border-t"}`}
              style={{ borderColor: dir.dark ? "#33474F" : HAIR }}
            >
              <p className="text-[10px] font-bold tracking-[1px]" style={{ ...BODY, color: dir.dark ? AMBER : ORANGE }}>
                {dir.asideLabel.toUpperCase()}
              </p>
              <p className={`text-[13px] leading-[1.45] ${dir.dark ? "text-[#EEF2F2]" : "text-[#1B2A30]"}`} style={BODY}>
                {dir.aside}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- design principle ----------------------------- */

function Principle() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={PRINCIPLE.eyebrow} heading={PRINCIPLE.heading} note={PRINCIPLE.note} size="md" />
      {/* header pills */}
      <div className="hidden gap-2 pb-2 lg:flex">
        <div className="w-[130px] shrink-0" />
        <div className="flex-1">
          <span className="flex h-[41px] items-center rounded-[8px] px-[14px] text-[14px] font-bold text-[#1D4F5C]" style={{ ...BODY, background: "#E4EEF0" }}>
            {PRINCIPLE.columns[0]}
          </span>
        </div>
        <div className="flex-1">
          <span className="flex h-[41px] items-center rounded-[8px] px-[14px] text-[14px] font-bold text-white" style={{ ...BODY, background: DARK }}>
            {PRINCIPLE.columns[1]}
          </span>
        </div>
        <div className="flex-1">
          <span className="flex h-[41px] items-center rounded-[8px] px-[14px] text-[14px] font-bold text-[#2E6B45]" style={{ ...BODY, background: "#E6F1EA" }}>
            {PRINCIPLE.columns[2]}
          </span>
        </div>
      </div>
      {/* rows */}
      {PRINCIPLE.rows.map((row) => (
        <div key={row.stage} className="flex flex-col gap-2 pb-2 lg:flex-row">
          <div className="w-[130px] shrink-0 pt-[12px]">
            <p className="text-[14px] font-semibold text-[#1B2A30]" style={BODY}>
              {row.stage}
            </p>
          </div>
          {[row.ai, row.adam, row.laura].map((cell, i) => (
            <div key={i} className="min-w-0 flex-1 rounded-[8px] border border-transparent bg-white p-[14px] py-3">
              <p className="text-[13px] leading-[1.4] text-[#1B2A30]" style={BODY}>
                {cell}
              </p>
            </div>
          ))}
        </div>
      ))}
      <div className="mt-[10px] flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <span className="inline-flex w-fit items-center rounded-[999px] px-[10px] py-[4px] text-[12px] font-semibold" style={{ ...BODY, background: AMBER, color: DARK }}>
          RULE
        </span>
        <p className="text-[16px] font-semibold text-[#1B2A30]" style={DISPLAY}>
          {PRINCIPLE.rule}
        </p>
      </div>
    </section>
  );
}

/* --------------------------- UX flow / architecture -------------------------- */

function ConnectorLabel({ children, style }: { children: string; style?: React.CSSProperties }) {
  return (
    <span className="absolute whitespace-nowrap text-[11px] text-[#5E6A6E]" style={{ ...BODY, ...style }}>
      {children}
    </span>
  );
}

function Architecture() {
  return (
    <div className="min-w-0 overflow-x-auto">
      <div className="relative mx-auto hidden lg:block" style={{ width: 1036, height: 576 }}>
        {/* connectors */}
        <svg aria-hidden className="absolute inset-0" width={1036} height={576} viewBox="0 0 1036 576" fill="none">
          {/* no direct channel — dashed arc across the top */}
          <path d="M142 128 Q518 88 894 128" stroke={ORANGE} strokeWidth="1.4" fill="none" strokeDasharray="4 4" />
          <circle cx="894" cy="128" r="4" fill={ORANGE} />
          {/* source systems -> record */}
          <line x1="518" y1="96" x2="518" y2="140" stroke={MUTED} strokeWidth="1.4" />
          <circle cx="514" cy="134" r="4" fill={MUTED} />
          {/* uploads / decisions (y=210) */}
          <line x1="260" y1="210" x2="392" y2="210" stroke={MUTED} strokeWidth="1.4" />
          <circle cx="390" cy="210" r="4" fill={MUTED} />
          <line x1="644" y1="210" x2="776" y2="210" stroke={MUTED} strokeWidth="1.4" />
          <circle cx="646" cy="210" r="4" fill={MUTED} />
          {/* approved updates / flags drafts (y=272) */}
          <line x1="266" y1="272" x2="398" y2="272" stroke={MUTED} strokeWidth="1.4" />
          <circle cx="268" cy="272" r="4" fill={MUTED} />
          <line x1="638" y1="272" x2="764" y2="272" stroke={MUTED} strokeWidth="1.4" />
          <circle cx="762" cy="272" r="4" fill={MUTED} />
          {/* AI -> copilot (orange, arrowhead up) */}
          <line x1="894" y1="414" x2="894" y2="368" stroke="#C8702A" strokeWidth="1.6" />
          <path d="M890 370 L894 362 L898 370 Z" fill="#C8702A" />
        </svg>
        {/* connector labels */}
        <ConnectorLabel style={{ left: 365, top: 117 }}>synced in, reconciled once</ConnectorLabel>
        <ConnectorLabel style={{ left: 306, top: 191 }}>uploads</ConnectorLabel>
        <ConnectorLabel style={{ left: 687, top: 191 }}>decisions</ConnectorLabel>
        <ConnectorLabel style={{ left: 287, top: 279 }}>approved updates</ConnectorLabel>
        <ConnectorLabel style={{ left: 677, top: 279 }}>flags, drafts</ConnectorLabel>
        <ConnectorLabel style={{ left: 200, top: 101, color: ORANGE, fontWeight: 700 }}>no direct channel</ConnectorLabel>
        {/* source systems */}
        <div className="absolute rounded-[12px] border p-4 pt-4" style={{ left: 338, top: 24, width: 360, height: 72, background: "#FFFFFF", borderColor: HAIR }}>
          <p className="text-center text-[10px] font-bold tracking-[1px]" style={{ ...BODY, color: TEAL }}>
            SOURCE SYSTEMS
          </p>
          <p className="mt-1 text-center text-[12px] text-[#1B2A30]" style={BODY}>
            Origination · Pricing · Compliance · Credit · Title
          </p>
        </div>
        {/* shared case record */}
        <div className="absolute flex flex-col gap-[7px] rounded-[14px] p-4 pt-4" style={{ left: 398, top: 140, width: 240, background: DARK }}>
          <p className="text-[18px] font-semibold text-white" style={DISPLAY}>
            {UX_FLOW.sharedRecord.title}
          </p>
          <p className="text-[11px] text-[#93A3A7]" style={BODY}>
            {UX_FLOW.sharedRecord.sub}
          </p>
          {UX_FLOW.sharedRecord.items.map((item) => (
            <p key={item} className="text-[13px] leading-[1.5] text-[#EEF2F2]" style={BODY}>
              {item}
            </p>
          ))}
        </div>
        {/* borrower app */}
        <div className="absolute flex flex-col gap-[6px] rounded-[14px] border p-4 pt-4" style={{ left: 24, top: 150, width: 236, background: "#FFFFFF", borderColor: TEAL }}>
          <p className="text-[18px] font-semibold text-[#1B2A30]" style={DISPLAY}>
            {UX_FLOW.borrowerApp.title}
          </p>
          <p className="text-[11px] text-[#5E6A6E]" style={BODY}>
            {UX_FLOW.borrowerApp.sub}
          </p>
          {UX_FLOW.borrowerApp.items.map((item) => (
            <p key={item} className="text-[13px] leading-[1.5] text-[#1D4F5C]" style={BODY}>
              {item}
            </p>
          ))}
        </div>
        {/* copilot */}
        <div className="absolute flex flex-col gap-[6px] rounded-[14px] border p-4 pt-4" style={{ left: 776, top: 150, width: 236, background: "#FFFFFF", borderColor: TEAL }}>
          <p className="text-[18px] font-semibold text-[#1B2A30]" style={DISPLAY}>
            {UX_FLOW.copilot.title}
          </p>
          <p className="text-[11px] text-[#5E6A6E]" style={BODY}>
            {UX_FLOW.copilot.sub}
          </p>
          {UX_FLOW.copilot.items.map((item) => (
            <p key={item} className="text-[13px] leading-[1.5] text-[#1D4F5C]" style={BODY}>
              {item}
            </p>
          ))}
        </div>
        {/* AI layer */}
        <div className="absolute flex flex-col gap-1 rounded-[14px] p-4 pt-4" style={{ left: 776, top: 414, width: 236, background: "#E4EEF0" }}>
          <p className="text-[17px] font-semibold text-[#1B2A30]" style={DISPLAY}>
            {UX_FLOW.aiLayer.title}
          </p>
          <p className="text-[12px] leading-[1.5] text-[#1D4F5C]" style={BODY}>
            {UX_FLOW.aiLayer.body}
          </p>
          <p className="mt-[6px] text-[12px] font-bold leading-[1.5] text-[#1B2A30]" style={BODY}>
            {UX_FLOW.aiLayer.strong}
          </p>
        </div>
        {/* why this shape */}
        <div className="absolute flex flex-col gap-[6px] rounded-[14px] border p-4 pt-4" style={{ left: 24, top: 414, width: 700, background: "#FFFFFF", borderColor: HAIR }}>
          <p className="text-[10px] font-bold tracking-[1px] text-[#5E6A6E]" style={BODY}>
            {UX_FLOW.why.label.toUpperCase()}
          </p>
          <p className="max-w-[660px] text-[14px] leading-[1.5] text-[#1B2A30]" style={BODY}>
            {UX_FLOW.why.body}
          </p>
        </div>
      </div>

      {/* mobile fallback: stacked cards, same content */}
      <div className="flex flex-col gap-4 lg:hidden">
        <div className="rounded-[14px] border p-4" style={{ background: "#FFFFFF", borderColor: HAIR }}>
          <p className="text-[10px] font-bold tracking-[1px] text-[#1D4F5C]" style={BODY}>
            SOURCE SYSTEMS
          </p>
          <p className="mt-1 text-[12px] text-[#1B2A30]" style={BODY}>
            {UX_FLOW.sourceSystems.body}
          </p>
        </div>
        <div className="flex flex-col gap-[7px] rounded-[14px] p-4" style={{ background: DARK }}>
          <p className="text-[18px] font-semibold text-white" style={DISPLAY}>
            {UX_FLOW.sharedRecord.title}
          </p>
          <p className="text-[11px] text-[#93A3A7]" style={BODY}>
            {UX_FLOW.sharedRecord.sub}
          </p>
          {UX_FLOW.sharedRecord.items.map((item) => (
            <p key={item} className="text-[13px] text-[#EEF2F2]" style={BODY}>
              {item}
            </p>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[UX_FLOW.borrowerApp, UX_FLOW.copilot].map((box) => (
            <div key={box.title} className="flex flex-col gap-[6px] rounded-[14px] border p-4" style={{ background: "#FFFFFF", borderColor: TEAL }}>
              <p className="text-[18px] font-semibold text-[#1B2A30]" style={DISPLAY}>
                {box.title}
              </p>
              <p className="text-[11px] text-[#5E6A6E]" style={BODY}>
                {box.sub}
              </p>
              {box.items.map((item) => (
                <p key={item} className="text-[13px] text-[#1D4F5C]" style={BODY}>
                  {item}
                </p>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-1 rounded-[14px] p-4" style={{ background: "#E4EEF0" }}>
            <p className="text-[17px] font-semibold text-[#1B2A30]" style={DISPLAY}>
              {UX_FLOW.aiLayer.title}
            </p>
            <p className="text-[12px] text-[#1D4F5C]" style={BODY}>
              {UX_FLOW.aiLayer.body}
            </p>
            <p className="text-[12px] font-bold text-[#1B2A30]" style={BODY}>
              {UX_FLOW.aiLayer.strong}
            </p>
          </div>
          <div className="flex flex-col gap-[6px] rounded-[14px] border p-4" style={{ background: "#FFFFFF", borderColor: HAIR }}>
            <p className="text-[10px] font-bold tracking-[1px] text-[#5E6A6E]" style={BODY}>
              {UX_FLOW.why.label.toUpperCase()}
            </p>
            <p className="text-[14px] text-[#1B2A30]" style={BODY}>
              {UX_FLOW.why.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UxFlow() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={UX_FLOW.label} heading={UX_FLOW.heading} note={UX_FLOW.note} />
      <div className="rounded-[22px] bg-white">
        <Architecture />
      </div>
      <SectionHead eyebrow={UX_FLOW.flow.eyebrow} heading={UX_FLOW.flow.heading} note={UX_FLOW.flow.note} size="md" />
      <DropZone
        note={UX_FLOW.flow.placeholder.replace("Drop image ", "Drop image\n")}
        className="h-[506px] rounded-[12px] p-2"
        style={{ background: "#EDF1F1" }}
        noteClass="text-[#1D4F5C]"
        noteStyle={{ color: TEAL }}
      />
    </section>
  );
}

/* --------------------------- wireframes to hi-fi ----------------------------- */

function Wireframes() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={WIREFRAMES.label} heading={WIREFRAMES.heading} note={WIREFRAMES.note} />
      {WIREFRAMES.groups.map((group) => (
        <div key={group.title} className="pb-10">
          <p className="text-[15px] font-semibold" style={{ ...BODY, color: TEAL }}>
            {group.title}
          </p>
          <div className="mt-[10px] flex flex-wrap items-start gap-[18px]">
            {group.stages.map((stage, i) => (
              <div key={stage.tag} className="contents">
                {i > 0 && (
                  <span className="hidden h-[36px] w-[36px] shrink-0 items-center justify-center self-center rounded-[999px] md:flex" style={{ background: TEAL }}>
                    <Icon name="icon-arrow" size={18} />
                  </span>
                )}
                <div className="flex flex-col gap-[10px]">
                  <DropZone
                    note={stage.placeholder.replace("Drop image ", "Drop image\n")}
                    className={
                      group.size === "desktop"
                        ? "h-[196px] w-[314px] rounded-[10px] border p-2"
                        : "h-[368px] w-[170px] rounded-[22px] border p-2"
                    }
                    style={{
                      background: stage.tag === "HI-FI" ? DARK2 : "#ECE9E2",
                      borderColor: HAIR,
                    }}
                    noteClass={stage.tag === "HI-FI" ? "text-[#F2B872]" : "text-[#5E6A6E]"}
                  />
                  <p className="text-[11px] font-bold tracking-[0.88px] text-[#5E6A6E]" style={BODY}>
                    {stage.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ------------------------------ key decisions -------------------------------- */

function KeyDecisions() {
  return (
    <section className="mt-[90px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-24 lg:px-0">
        <SectionHead onDark eyebrow={KEY_DECISIONS.eyebrow} heading={KEY_DECISIONS.heading} />
        <div className="grid gap-4 lg:grid-cols-2">
          {KEY_DECISIONS.items.map((item) => (
            <article key={item.title} className="flex items-start gap-[24px] rounded-[20px] bg-[#1F333B] p-[26px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.art}
                width={104}
                height={104}
                alt=""
                aria-hidden
                draggable={false}
                className="shrink-0 select-none rounded-[16px]"
              />
              <div>
                <h3 className="text-[18px] font-semibold leading-[1.5] text-[#EEF2F2]" style={DISPLAY}>
                  {item.title}
                </h3>
                <p className="mt-[5px] max-w-[330px] text-[14px] leading-[1.5] text-[#B3C0C3]" style={BODY}>
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- hi-fi ------------------------------------ */

function HifiSection() {
  return (
    <section id="hifi" className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={HIFI.eyebrow} heading={HIFI.heading} note={HIFI.note} />
      <p className="text-[15px] font-semibold" style={{ ...BODY, color: TEAL }}>
        {HIFI.laura.title}
      </p>
      <div className="mt-[14px] grid gap-[30px] pb-12 sm:grid-cols-2 lg:grid-cols-4">
        {HIFI.laura.screens.map((s) => (
          <figure key={s.caption}>
            <DropZone note={"Drop image\n" + s.placeholder.split(" ")[2]} className="h-[511px] rounded-[26px] border p-2" style={{ background: "#ECE9E2", borderColor: HAIR }} />
            <figcaption className="mt-[10px] text-[13px] text-[#5E6A6E]" style={BODY}>
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="text-[15px] font-semibold" style={{ ...BODY, color: TEAL }}>
        {HIFI.adam.title}
      </p>
      <div className="mt-[14px] grid gap-x-[18px] gap-y-6 pb-10 lg:grid-cols-2">
        {HIFI.adam.screens.map((s) => (
          <figure key={s.caption}>
            <DropZone note={"Drop image\n" + s.placeholder.split(" ")[2]} className="h-[318px] rounded-[12px] p-2" style={{ background: DARK2 }} noteClass="text-[#F2B872]" />
            <figcaption className="mt-[10px] text-[13px] text-[#5E6A6E]" style={BODY}>
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="flex flex-col gap-6 rounded-[18px] bg-white p-6 lg:flex-row lg:items-center">
        <DropZone note={"Drop image\n" + HIFI.component.placeholder.split(" ")[2]} className="h-[150px] w-full max-w-[604px] shrink-0 rounded-[10px] p-2" style={{ background: "#EDF1F1" }} noteStyle={{ color: TEAL }} />
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-[1px] text-[#1D4F5C]" style={BODY}>
            {HIFI.component.label.toUpperCase()}
          </p>
          <h3 className="mt-[6px] text-[20px] font-semibold leading-[1.5] text-[#1B2A30]" style={DISPLAY}>
            {HIFI.component.title}
          </h3>
          <p className="mt-[6px] max-w-[330px] text-[14px] leading-[1.5] text-[#5E6A6E]" style={BODY}>
            {HIFI.component.body}
          </p>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- outcome ----------------------------------- */

function Outcome() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={OUTCOME.eyebrow} heading={OUTCOME.heading} />
      <div className="grid gap-[14px] md:grid-cols-3">
        {OUTCOME.stats.map((stat) => (
          <div
            key={stat.num}
            className="rounded-[18px] p-6"
            style={{ background: stat.tone === "amber" ? AMBER : DARK }}
          >
            <p className="text-[40px] font-semibold leading-none" style={{ ...DISPLAY, color: stat.tone === "amber" ? DARK : "#EEF2F2" }}>
              {stat.num}
            </p>
            <p className="mt-[12px] text-[14px] leading-[1.5]" style={{ ...BODY, color: stat.tone === "amber" ? DARK : "#C6D2D4" }}>
              {stat.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-[10px] text-[12px] text-[#5E6A6E]" style={BODY}>
        {OUTCOME.caption}
      </p>
      <p className="mt-[36px] text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
        {OUTCOME.showsLabel.toUpperCase()}
      </p>
      <div className="mt-[14px] grid gap-[14px] pb-2 sm:grid-cols-2 lg:grid-cols-4">
        {OUTCOME.capabilities.map((cap) => (
          <div key={cap.title} className="rounded-[16px] bg-white p-5 pb-[22px]">
            <p className="text-[16px] font-semibold leading-[1.5] text-[#1B2A30]" style={DISPLAY}>
              {cap.title}
            </p>
            <p className="mt-[6px] text-[13px] leading-[1.5] text-[#5E6A6E]" style={BODY}>
              {cap.body}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-[900px] text-[12px] leading-[1.5] text-[#5E6A6E]" style={BODY}>
        {OUTCOME.disclaimer}
      </p>
    </section>
  );
}

/* ------------------------------- more projects -------------------------------- */

function MoreProjects() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[90px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5E6A6E]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#1B2A30] pb-[2px] text-[14px] font-semibold text-[#1B2A30]" style={BODY}>
          All work
        </Link>
      </div>
      <div className="mt-[28px] grid gap-4 md:grid-cols-2">
        {NEIGHBORS.map((n) => (
          <Link
            key={n.title}
            href={n.href}
            className="group flex items-center gap-[20px] rounded-[18px] bg-white p-[14px] transition-transform motion-safe:group-hover:-translate-y-[2px]"
          >
            <span
              className="relative h-[110px] w-[150px] shrink-0 overflow-hidden rounded-[12px]"
              style={{ background: n.thumbDark ? "#231B1D" : "#E6DFD3" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={n.thumb}
                alt={n.title}
                className="absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-[6px] object-cover"
                loading="lazy"
                draggable={false}
              />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] text-[#5E6A6E]" style={BODY}>
                {n.direction}
              </span>
              <span className="mt-[6px] block text-[22px] font-semibold leading-[1.2] text-[#1B2A30]" style={DISPLAY}>
                {n.title}
              </span>
              <span className="mt-[6px] block truncate text-[14px] text-[#5E6A6E]" style={BODY}>
                {n.highlight}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: DARK }}>
      <div className="mx-auto flex w-full max-w-[1036px] flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-0">
        <div>
          <p className="text-[32px] font-semibold text-[#EEF2F2]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#56606B] pb-[2px] text-[16px] text-[#C3CDCF] transition-opacity hover:opacity-80"
            style={BODY}
          >
            nmayacharya@gmail.com
          </a>
        </div>
        <nav aria-label="Footer links" className="flex items-center gap-8" style={BODY}>
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="text-[14px] text-[#EEF2F2] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* ---------------------------------- page ----------------------------------- */

export default function ClarityCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Problem />
      <Journey />
      <HowMightWe />
      <Comparative />
      <Ideation />
      <Principle />
      <UxFlow />
      <Wireframes />
      <KeyDecisions />
      <HifiSection />
      <Outcome />
      <MoreProjects />
      <Footer />
    </main>
  );
}
