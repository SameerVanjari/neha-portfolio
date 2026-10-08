"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
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
import { EASE_OUT, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { ProjectRuler } from "@/components/ProjectRuler";

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

/* ---------------------------------- motion --------------------------------- */

/**
 * Above the fold, the hero plays on load rather than on scroll, so it can't
 * use the shared `useStagger` (viewport-triggered, never fires above the
 * fold). Same easing and 500ms-class timing as the other case studies.
 * Opacity lives on the items, never the container, so no branch can trap the
 * hero at zero; reduced motion keeps the fade and drops all movement.
 */
function heroMotion(mode: "pending" | boolean): { group: Variants; item: Variants } {
  if (mode === "pending") {
    return {
      group: { hidden: {}, visible: {} },
      item: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    };
  }
  if (mode) {
    return {
      group: { hidden: {}, visible: { transition: { duration: 0.3 } } },
      item: {
        hidden: { opacity: 0, transform: "translateY(0px)" },
        visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.3 } },
      },
    };
  }
  return {
    group: {
      hidden: {},
      visible: { transition: { delayChildren: 0.05, staggerChildren: 0.09 } },
    },
    item: {
      hidden: { opacity: 0, transform: "translateY(20px)" },
      visible: {
        opacity: 1,
        transform: "translateY(0px)",
        transition: { duration: 0.55, ease: EASE_OUT },
      },
    },
  };
}

/**
 * The media query is unavailable during SSR, so the preference is read only
 * after mount. Server markup and the first client frame therefore match, and
 * the reduced-motion variant applies as a normal update.
 */
function useMotionReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return ready;
}

/* ------------------------------ shared pieces ------------------------------ */

function Icon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async"
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
  // Every section announces itself identically: heading block lands, note
  // follows a beat behind. Uniform arrival lets a long scroll read as one
  // document rather than a dozen separate screens.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="flex flex-wrap items-start justify-between gap-6 pb-9"
    >
      <motion.div variants={item} className="max-w-[800px]">
        <p className={`text-[11px] font-bold uppercase tracking-[1.32px] ${onDark ? "text-[#F2B872]" : "text-[#1D4F5C]"}`} style={BODY}>
          {eyebrow}
        </p>
        <h2
          className={`mt-[14px] ${size === "lg" ? "text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.38px]" : "text-[26px] md:text-[30px] leading-[1.18] tracking-[-0.3px]"} ${onDark ? "text-[#EEF2F2]" : "text-[#1B2A30]"}`}
          style={DISPLAY}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className={`max-w-[340px] pt-[24px] text-[14px] leading-[1.5] ${onDark ? "text-[#B3C0C3]" : "text-[#5E6A6E]"}`}
          style={BODY}
        >
          {note}
        </motion.p>
      )}
    </motion.div>
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

/*
 * A filled screen when the data has real media, otherwise the Figma drop-zone.
 * `fillClassName` lets a slot keep its note-positioning classes for the fallback
 * while the image gets frame-filling ones.
 */
function Shot({
  src,
  alt,
  screen,
  note,
  className = "",
  fillClassName,
  style,
  noteClass = "text-[#5E6A6E]",
  noteStyle,
  loading = "lazy",
}: {
  src?: string;
  alt?: string;
  /** Key into SCREENS, for slots whose artwork was never drawn. */
  screen?: string;
  note: string;
  className?: string;
  fillClassName?: string;
  style?: React.CSSProperties;
  noteClass?: string;
  noteStyle?: React.CSSProperties;
  /** Above-the-fold media opts out of lazy loading so it can be the LCP. */
  loading?: "eager" | "lazy";
}) {
  if (screen && SCREENS[screen]) {
    return (
      <div className={`overflow-hidden ${fillClassName ?? className}`}>
        <div className="h-full w-full" role="img" aria-label={alt ?? note}>
          {SCREENS[screen]}
        </div>
      </div>
    );
  }
  if (!src) {
    return <DropZone note={note} className={className} style={style} noteClass={noteClass} noteStyle={noteStyle} />;
  }
  return (
    <div className={`overflow-hidden ${fillClassName ?? className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ""}
        loading={loading}
        draggable={false}
        onError={(e) => {
          e.currentTarget.src = "/placeholder.svg";
        }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/* --------------------- reconstructed concept screens --------------------- */
/*
 * The project's Drive export shipped with most screen frames empty, so the
 * screens below are concept reconstructions, built as live components in the
 * same design language as the three real screens recovered from Cover.html and
 * Wireframes.html (IBM Plex Sans body, Newsreader display, teal #1D4F5C primary,
 * amber #B45309 flag accent, #F5F3EE canvas). `tone` switches a screen between
 * the grayscale wireframe stages and full colour.
 */

const CANVAS = "#F5F3EE";
const CARD = "#FFFFFF";
const LINE = "#E4E0D8";
const TINT = "#E4EEF0";
const MINT = "#F3F8F8";
const AMBER_D = "#B45309";
const WIRE_BG = "#EDEBE6";
const WIRE_CARD = "#F7F6F2";
const WIRE_BAR = "#D9D5CD";
const WIRE_TEXT = "#9A978F";

function Desk({ children, tone = "hi" }: { children: React.ReactNode; tone?: ScreenTone }) {
  const wire = tone !== "hi";
  const items = ["Pipeline", "Customers", "Risk", "Documents"];
  return (
    <div className="flex h-full w-full overflow-hidden" style={{ background: wire ? WIRE_BG : CANVAS }}>
      <div
        className="flex w-[68px] shrink-0 flex-col gap-[7px] p-[9px]"
        style={{ background: wire ? "#E2DFD8" : DARK }}
      >
        <p className="text-[9px] font-semibold" style={{ ...DISPLAY, color: wire ? INK : "#F2F6F5" }}>
          Clarity
        </p>
        {items.map((label, i) => (
          <div
            key={label}
            className="rounded-[3px] px-[5px] py-[3px] text-[7px]"
            style={{
              background: !wire && i === 2 ? "rgba(242,184,114,0.16)" : wire ? WIRE_CARD : "rgba(255,255,255,0.06)",
              color: wire ? WIRE_TEXT : i === 2 ? AMBER : "rgba(242,246,245,0.55)",
            }}
          >
            {wire ? "••••" : label}
          </div>
        ))}
        <div className="mt-auto space-y-[5px]">
          <div className="h-[14px] w-[26px] rounded-[3px]" style={{ background: wire ? WIRE_BAR : "rgba(255,255,255,0.08)" }} />
          <div className="h-[14px] w-[26px] rounded-[3px]" style={{ background: wire ? WIRE_BAR : "rgba(255,255,255,0.08)" }} />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function DeskTabs({ tone = "hi" }: { tone?: ScreenTone }) {
  const wire = tone !== "hi";
  return (
    <div className="flex items-center gap-[10px] border-b px-[11px] py-[7px]" style={{ borderColor: LINE, background: wire ? WIRE_CARD : CARD }}>
      {["Laura Bennett #48213", "Daniel Ortiz #51190"].map((t, i) => (
        <span key={t} className="flex items-center gap-[4px] text-[8px]" style={{ color: wire ? WIRE_TEXT : INK }}>
          <span className="size-[5px] rounded-full" style={{ background: wire ? WIRE_BAR : AMBER_D }} />
          {wire ? `Customer ${i + 1}` : t}
        </span>
      ))}
    </div>
  );
}

function Phone({ children, tone = "hi" }: { children: React.ReactNode; tone?: ScreenTone }) {
  const wire = tone !== "hi";
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ background: wire ? WIRE_BG : CANVAS }}>
      <div className="px-[11px] pt-[13px]" style={{ ...DISPLAY, color: wire ? WIRE_TEXT : TEAL }}>
        Clarity
      </div>
      {children}
    </div>
  );
}

function Tracker({ stage = 2, wire = false }: { stage?: number; wire?: boolean }) {
  return (
    <div className="relative mx-[11px] mt-[9px] h-[12px]">
      <div className="absolute left-[6px] right-[6px] top-[5px] h-[2px]" style={{ background: wire ? WIRE_BAR : LINE }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="absolute top-[1px] size-[10px] rounded-full border-2"
          style={{
            left: `${i * 25}%`,
            marginLeft: "-5px",
            background: i <= stage ? (wire ? "#BFBBB2" : i === stage ? CANVAS : TEAL) : wire ? WIRE_BG : CARD,
            borderColor: i <= stage ? (wire ? "#BFBBB2" : TEAL) : wire ? WIRE_BAR : LINE,
          }}
        />
      ))}
    </div>
  );
}

function Bar({ w = "100%", h = 6, wire = false }: { w?: string; h?: number; wire?: boolean }) {
  return <div className="rounded-full" style={{ width: w, height: h, background: wire ? WIRE_BAR : "#E9E5DD" }} />;
}

/** The same four-tab bar documented in the component section, grounding the phone screens. */
function PhoneTabs({ active = 0, wire = false }: { active?: number; wire?: boolean }) {
  const items = ["Home", "Docs", "Status", "Messages"];
  return (
    <div className="mt-auto flex shrink-0 border-t px-[6px] pt-[6px] pb-[8px]" style={{ borderColor: wire ? WIRE_BAR : LINE, background: wire ? WIRE_CARD : CARD }}>
      {items.map((t, i) => (
        <span key={t} className="flex flex-1 flex-col items-center gap-[3px]">
          <span
            className="h-[9px] w-[9px] rounded-[2px]"
            style={{ background: wire ? WIRE_BAR : i === active ? TEAL : "#D9D5CD" }}
          />
          <span className="text-[5.5px]" style={{ color: wire ? WIRE_TEXT : i === active ? TEAL : MUTED }}>
            {t}
          </span>
        </span>
      ))}
    </div>
  );
}

/* --- wireframe stages (grayscale) --- */

function WfAdamLoFi() {
  return (
    <Desk tone="lo">
      <DeskTabs tone="lo" />
      <div className="flex-1 space-y-[7px] p-[11px]">
        {[100, 92, 96].map((w, i) => (
          <div key={i} className="space-y-[5px] rounded-[4px] p-[7px]" style={{ background: WIRE_CARD }}>
            <Bar w={`${w}%`} wire />
            <Bar w="58%" h={5} wire />
          </div>
        ))}
      </div>
    </Desk>
  );
}

function WfAdamMidFi() {
  return (
    <Desk tone="mid">
      <DeskTabs tone="mid" />
      <div className="flex flex-1 gap-[8px] p-[10px]">
        <div className="flex-[2] space-y-[6px]">
          {["Income calculation", "Asset verification", "Debt load"].map((t) => (
            <div key={t} className="rounded-[4px] p-[6px]" style={{ background: WIRE_CARD, border: `1px solid ${WIRE_BAR}` }}>
              <p className="text-[7px] font-semibold" style={{ color: WIRE_TEXT }}>{t}</p>
              <div className="mt-[4px] space-y-[3px]">
                <Bar w="92%" h={4} wire />
                <Bar w="64%" h={4} wire />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-[6px]">
          <div className="rounded-[4px] p-[6px]" style={{ background: WIRE_CARD, border: `1px solid ${WIRE_BAR}` }}>
            <p className="text-[7px] font-semibold" style={{ color: WIRE_TEXT }}>Your decision</p>
            <div className="mt-[5px] space-y-[4px]">
              {[100, 88, 70].map((w) => <div key={w} className="h-[9px] rounded-[3px]" style={{ width: `${w}%`, background: WIRE_BAR }} />)}
            </div>
          </div>
        </div>
      </div>
    </Desk>
  );
}

function WfLauraMidFi() {
  return (
    <Phone tone="mid">
      <div className="mt-[2px] px-[11px] text-[7px]" style={{ color: WIRE_TEXT }}>Good morning, Laura</div>
      <div className="px-[11px] text-[12px] font-semibold leading-tight" style={{ ...DISPLAY, color: WIRE_TEXT }}>You&apos;re in underwriting.</div>
      <Tracker stage={2} wire />
      <div className="mx-[11px] mt-[11px] space-y-[3px] rounded-[5px] p-[7px]" style={{ background: WIRE_CARD }}>
        <p className="text-[6px] font-bold tracking-[0.4px]" style={{ color: WIRE_TEXT }}>PLAIN-LANGUAGE STATUS</p>
        <Bar w="94%" h={4} wire /><Bar w="72%" h={4} wire /><Bar w="84%" h={4} wire />
      </div>
      <div className="mt-[9px] grid grid-cols-3 gap-[5px] px-[11px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-[3px] rounded-[4px] p-[5px]" style={{ background: WIRE_CARD }}>
            <Bar w="70%" h={4} wire /><Bar w="46%" h={3} wire />
          </div>
        ))}
      </div>
      <PhoneTabs active={0} wire />
    </Phone>
  );
}

/* --- hi-fi, Laura --- */

function HiLauraHome() {
  return (
    <Phone>
      <div className="px-[11px] text-[7px]" style={{ color: MUTED }}>Good morning, Laura</div>
      <div className="px-[11px] text-[15px] font-semibold leading-tight" style={{ ...DISPLAY, color: INK }}>Nothing to do today.</div>
      <Tracker stage={1} />
      <div className="mx-[11px] mt-[11px] rounded-[6px] p-[8px]" style={{ background: CARD, border: `1px solid ${LINE}` }}>
        <p className="text-[6px] font-bold tracking-[0.4px]" style={{ color: TEAL }}>NEXT UP</p>
        <p className="mt-[3px] text-[8px] leading-[1.35]" style={{ color: INK }}>
          Two pages are still needed. Adam Webb will send a specific request — no guessing.
        </p>
        <div className="mt-[6px] rounded-[4px] py-[5px] text-center text-[7px] font-semibold text-white" style={{ background: TEAL }}>
          See what&apos;s outstanding
        </div>
      </div>
      <div className="mt-[9px] grid grid-cols-3 gap-[5px] px-[11px]">
        {[["7 of 9", "Documents"], ["2–4 d", "Typical"], ["Oct 30", "Closing"]].map(([n, l]) => (
          <div key={l} className="rounded-[5px] p-[6px]" style={{ background: CARD, border: `1px solid ${LINE}` }}>
            <p className="text-[10px] font-semibold leading-none" style={{ ...DISPLAY, color: INK }}>{n}</p>
            <p className="mt-[3px] text-[6px]" style={{ color: MUTED }}>{l}</p>
          </div>
        ))}
      </div>
      <PhoneTabs active={0} />
    </Phone>
  );
}

function HiLauraRejection() {
  return (
    <Phone>
      <div className="px-[11px] text-[7px]" style={{ color: MUTED }}>Documents</div>
      <div className="px-[11px] text-[14px] font-semibold leading-tight" style={{ ...DISPLAY, color: INK }}>One document needs replacing</div>
      <div className="mx-[11px] mt-[11px] rounded-[6px] p-[8px]" style={{ background: "#FDF4E8", border: `1px solid #E8C89A` }}>
        <p className="text-[6px] font-bold tracking-[0.4px]" style={{ color: AMBER_D }}>WHY IT WAS SENT BACK</p>
        <p className="mt-[3px] text-[8px] leading-[1.35]" style={{ color: INK }}>
          Page 2 of the 2024 W-2 is missing. The first scan was cut off at the bottom edge.
        </p>
      </div>
      <div className="mx-[11px] mt-[8px] rounded-[6px] p-[8px]" style={{ background: CARD, border: `1px solid ${LINE}` }}>
        <p className="text-[6px] font-bold tracking-[0.4px]" style={{ color: TEAL }}>WHAT TO DO</p>
        <p className="mt-[3px] text-[8px] leading-[1.35]" style={{ color: INK }}>
          Photograph or scan page 2 in good light. Nothing else is missing.
        </p>
        <div className="mt-[6px] rounded-[4px] py-[5px] text-center text-[7px] font-semibold text-white" style={{ background: TEAL }}>
          Upload page 2
        </div>
      </div>
      <p className="mx-[11px] mt-[9px] text-[6.5px] leading-[1.4]" style={{ color: MUTED }}>
        Asked for by Adam Webb · reviewed 2:14 PM
      </p>
      <PhoneTabs active={1} />
    </Phone>
  );
}

function HiLauraClosing() {
  return (
    <Phone>
      <div className="px-[11px] text-[7px]" style={{ color: MUTED }}>Closing</div>
      <div className="px-[11px] text-[14px] font-semibold leading-tight" style={{ ...DISPLAY, color: INK }}>A change was flagged early</div>
      <div className="mx-[11px] mt-[11px] rounded-[6px] p-[8px]" style={{ background: "#FDF4E8", border: `1px solid #E8C89A` }}>
        <div className="flex items-baseline justify-between">
          <p className="text-[7px] font-semibold" style={{ color: AMBER_D }}>Title fee</p>
          <p className="text-[11px] font-semibold" style={{ ...DISPLAY, color: AMBER_D }}>+$1,200</p>
        </div>
        <p className="mt-[3px] text-[8px] leading-[1.35]" style={{ color: INK }}>
          The title company amended the fee 11 days before signing. Here is the change, in writing.
        </p>
      </div>
      <div className="mt-[9px] space-y-[3px] rounded-[6px] p-[8px]" style={{ background: CARD, border: `1px solid ${LINE}` }}>
        {[["Cash to close", "$8,940"], ["Title fee", "$1,200"], ["Recorded 12 Oct", "—"]].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-[7.5px]">
            <span style={{ color: MUTED }}>{k}</span>
            <span style={{ color: INK }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="mx-[11px] mt-[9px] rounded-[4px] py-[5px] text-center text-[7px] font-semibold" style={{ background: MINT, color: TEAL }}>
        Verified by Adam Webb
      </div>
      <PhoneTabs active={2} />
    </Phone>
  );
}

/* --- hi-fi, Adam --- */

function HiAdamPipeline() {
  const rows = [
    ["Ortiz, D", "Income", "High", AMBER_D],
    ["Bennett, L", "Income", "High", AMBER_D],
    ["Pham, T", "Assets", "Med", "#A8581F"],
    ["Cole, R", "Clear", "Low", "#5E7D5A"],
  ] as const;
  return (
    <Desk>
      <DeskTabs />
      <div className="flex flex-1">
        <div className="flex-1 border-r p-[10px]" style={{ borderColor: LINE }}>
          <p className="text-[7px] font-bold tracking-[0.5px]" style={{ color: MUTED }}>TRIAGE ORDER · RISK FIRST</p>
          <div className="mt-[7px] space-y-[5px]">
            {rows.map(([n, t, risk, tone]) => (
              <div key={n} className="flex items-center gap-[6px] rounded-[4px] px-[7px] py-[6px]" style={{ background: CARD, border: `1px solid ${LINE}` }}>
                <span className="size-[5px] shrink-0 rounded-full" style={{ background: tone }} />
                <span className="text-[8px] font-semibold" style={{ color: INK }}>{n}</span>
                <span className="text-[7px]" style={{ color: MUTED }}>{t}</span>
                <span className="ml-auto text-[6.5px] font-bold" style={{ color: tone }}>{risk.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[42%] p-[10px]">
          <div className="rounded-[5px] p-[8px]" style={{ background: TINT }}>
            <p className="text-[6.5px] font-bold tracking-[0.4px]" style={{ color: TEAL }}>CLARITY SUGGESTS</p>
            <p className="mt-[4px] text-[8px] leading-[1.35]" style={{ color: INK }}>
              Two files can be cleared on income evidence alone. Two cannot, and one of those is a fair-lending flag.
            </p>
          </div>
          <div className="mt-[7px] space-y-[4px]">
            {["Clear 2 on evidence", "Review 1 flagged", "1 needs a human call"].map((t) => (
              <div key={t} className="flex items-center gap-[5px] text-[7.5px]" style={{ color: MUTED }}>
                <span className="h-[9px] w-[9px] rounded-[2px]" style={{ border: `1px solid ${LINE}` }} />{t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Desk>
  );
}

function HiAdamDocRequest() {
  return (
    <Desk>
      <DeskTabs />
      <div className="flex flex-1 gap-[10px] p-[10px]">
        <div className="flex-1 space-y-[5px]">
          <div className="rounded-[4px] p-[7px]" style={{ background: CARD, border: `1px solid ${LINE}` }}>
            <Bar w="86%" h={5} /><div className="mt-[4px]"><Bar w="94%" h={4} /></div><div className="mt-[3px]"><Bar w="78%" h={4} /></div>
          </div>
          <div className="rounded-[4px] p-[7px]" style={{ background: MINT, border: `1px solid #CFE3E3` }}>
            <p className="text-[6.5px] font-bold tracking-[0.4px]" style={{ color: TEAL }}>UPLOADED 2 MIN AGO</p>
            <p className="mt-[3px] text-[8px] font-semibold" style={{ color: INK }}>W-2_2024_p2.pdf</p>
          </div>
        </div>
        <div className="w-[46%] rounded-[5px] p-[9px]" style={{ background: CARD, border: `1px solid ${LINE}` }}>
          <p className="text-[6.5px] font-bold tracking-[0.4px]" style={{ color: AMBER_D }}>DRAFTED BY CLARITY · UNSENT</p>
          <p className="mt-[5px] text-[8px] leading-[1.4]" style={{ color: INK }}>
            Hi Laura — page 2 of your 2024 W-2 came through cut off at the bottom. Could you resend just that
            page? Nothing else is outstanding.
          </p>
          <div className="mt-[8px] flex gap-[5px]">
            <div className="flex-1 rounded-[4px] py-[5px] text-center text-[7px] font-semibold text-white" style={{ background: TEAL }}>Edit &amp; send</div>
            <div className="flex-1 rounded-[4px] py-[5px] text-center text-[7px]" style={{ border: `1px solid ${LINE}`, color: MUTED }}>Discard</div>
          </div>
          <p className="mt-[6px] text-[6.5px]" style={{ color: MUTED }}>Nothing reaches Laura without you.</p>
        </div>
      </div>
    </Desk>
  );
}

function HiAdamClosing() {
  return (
    <Desk>
      <DeskTabs />
      <div className="flex flex-1 gap-[10px] p-[10px]">
        <div className="flex-[3]">
          <div className="rounded-[4px]" style={{ border: `1px solid ${LINE}`, background: CARD }}>
            <div className="flex items-center justify-between border-b px-[8px] py-[6px]" style={{ borderColor: LINE }}>
              <p className="text-[7px] font-bold tracking-[0.4px]" style={{ color: MUTED }}>CLOSING DISCLOSURE · VERSION 3</p>
              <span className="rounded-full px-[6px] py-[2px] text-[6px] font-bold" style={{ background: TINT, color: TEAL }}>AMENDED</span>
            </div>
            {[["Title fee", "$1,000", "$1,200", "+$200"], ["Recording", "$120", "$120", "—"], ["Cash to close", "$8,740", "$8,940", "+$200"]].map(([k, a, b, d]) => (
              <div key={k} className="grid grid-cols-[1fr_60px_60px_52px] items-center gap-[6px] border-b px-[8px] py-[6px] text-[7.5px] last:border-0" style={{ borderColor: LINE, color: INK }}>
                <span>{k}</span><span style={{ color: MUTED }}>{a}</span><span>{b}</span>
                <span className="font-semibold" style={{ color: d === "—" ? MUTED : AMBER_D }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-[6px]">
          <div className="rounded-[4px] p-[8px]" style={{ background: "#FDF4E8", border: "1px solid #E8C89A" }}>
            <p className="text-[6.5px] font-bold tracking-[0.4px]" style={{ color: AMBER_D }}>CLARITY FLAGGED</p>
            <p className="mt-[3px] text-[7.5px] leading-[1.35]" style={{ color: INK }}>
              Title fee moved $200 on 29 Oct, 11 days before signing.
            </p>
          </div>
          <div className="rounded-[4px] py-[6px] text-center text-[7.5px] font-semibold text-white" style={{ background: TEAL }}>Approve explanation</div>
          <p className="text-[6.5px] leading-[1.35]" style={{ color: MUTED }}>Logged under your name for fair-lending review.</p>
        </div>
      </div>
    </Desk>
  );
}

/* --- wide single-slot pieces --- */

function FlowUnderwritingFlag() {
  const steps = [
    ["Borrower uploads", "Income and assets land in the shared record", "Laura · 2 min", "uploads"],
    ["Clarity cross-checks", "Finds the 9.9% gap between stated income and pay stubs, and cites the rule behind it", "Machine · always", "flags"],
    ["Adam decides", "Recalculate on base income, request the bonus history, or clear the flag — with a rationale logged under his name", "Adam · 4 min", "decisions"],
    ["Laura is told", "Only what Adam approved reaches her, in plain words, with a named owner and an expected window", "Laura · then nothing", "approved updates"],
  ] as const;
  return (
    <div className="flex h-full w-full flex-col p-[16px]" style={{ background: "#EDF1F1" }}>
      <div className="grid flex-1 grid-cols-4 gap-[10px]">
        {steps.map(([t, b, who, verb], i) => (
          <div
            key={t}
            className="relative flex flex-col rounded-[6px] p-[11px]"
            style={{ background: i === 2 ? DARK : CARD, border: `1px solid ${i === 2 ? DARK : LINE}` }}
          >
            <div className="flex items-center gap-[6px]">
              <span
                className="flex size-[17px] items-center justify-center rounded-full text-[8px] font-bold"
                style={{ background: i === 2 ? AMBER : TINT, color: i === 2 ? DARK : TEAL }}
              >
                {i + 1}
              </span>
              <span className="text-[7px] font-bold tracking-[0.5px]" style={{ color: i === 2 ? AMBER : TEAL }}>
                {verb.toUpperCase()}
              </span>
            </div>
            <p className="mt-[9px] text-[10px] font-semibold leading-tight" style={{ color: i === 2 ? "#F2F6F5" : INK }}>
              {t}
            </p>
            <p className="mt-[6px] text-[8.5px] leading-[1.45]" style={{ color: i === 2 ? "#AFC3C2" : MUTED }}>
              {b}
            </p>
            <div
              className="mt-auto flex items-center gap-[5px] rounded-[4px] px-[7px] py-[5px]"
              style={{ background: i === 2 ? "rgba(255,255,255,0.07)" : "#F7F6F2" }}
            >
              <span className="size-[4px] rounded-full" style={{ background: i === 2 ? AMBER : TEAL }} />
              <span className="text-[7.5px]" style={{ color: i === 2 ? "#C9D6D4" : MUTED }}>
                {who}
              </span>
            </div>
            {i < 3 && <span className="absolute -right-[10px] top-1/2 z-10 -translate-y-1/2 text-[11px]" style={{ color: TEAL }}>→</span>}
          </div>
        ))}
      </div>
      <div className="mt-[12px] flex items-center gap-[8px] rounded-[6px] px-[11px] py-[8px]" style={{ background: CARD, border: `1px solid ${LINE}` }}>
        <span className="shrink-0 text-[8px] font-bold tracking-[0.5px]" style={{ color: AMBER_D }}>NO MATTER HOW SURE THE AI IS</span>
        <span className="text-[8.5px]" style={{ color: INK }}>
          every file still gets a flag-or-clear moment, reviewed by a named person. The left column never moves right.
        </span>
      </div>
    </div>
  );
}

function TabBarComponent() {
  const states = [
    ["Default", "#FFFFFF", LINE, MUTED],
    ["Hover", "#F1F4F4", LINE, TEAL],
    ["Flagged", "#FDF4E8", "#E8C89A", AMBER_D],
    ["Active + flagged", TINT, TEAL, TEAL],
  ] as const;
  return (
    <div className="flex h-full w-full items-stretch gap-[8px] p-[10px]" style={{ background: "#EDF1F1" }}>
      {states.map(([label, bg, bd, fg]) => (
        <div key={label} className="flex flex-1 flex-col justify-center gap-[10px] rounded-[6px] p-[8px]" style={{ background: bg, border: `1px solid ${bd}` }}>
          <span className="text-[7px] font-bold tracking-[0.4px]" style={{ color: MUTED }}>{label.toUpperCase()}</span>
          <div className="flex items-center gap-[6px]">
            <span className="relative flex size-[14px] items-center justify-center rounded-[4px]" style={{ background: fg }}>
              <span className="size-[5px] rounded-full bg-white" />
              {label !== "Default" && <span className="absolute -right-[2px] -top-[2px] size-[5px] rounded-full" style={{ background: AMBER_D, border: "1px solid white" }} />}
            </span>
            <span className="text-[8.5px] font-semibold" style={{ color: fg }}>Ortiz, D</span>
            <span className="ml-auto text-[7px]" style={{ color: MUTED }}>2 flags</span>
          </div>
        </div>
      ))}
    </div>
  );
}

type ScreenTone = "lo" | "mid" | "hi";

const SCREENS: Record<string, React.ReactNode> = {
  "wf-adam-lofi": <WfAdamLoFi />,
  "wf-adam-midfi": <WfAdamMidFi />,
  "wf-laura-midfi": <WfLauraMidFi />,
  "flow-underwriting-flag": <FlowUnderwritingFlag />,
  "hi-laura-home": <HiLauraHome />,
  "hi-laura-rejection": <HiLauraRejection />,
  "hi-laura-closing": <HiLauraClosing />,
  "hi-adam-pipeline": <HiAdamPipeline />,
  "hi-adam-docreq": <HiAdamDocRequest />,
  "hi-adam-closing": <HiAdamClosing />,
  "component-tabbar": <TabBarComponent />,
};

/* ---------------------------------- chrome ---------------------------------- */

function Nav() {
  const reduce = useMotionPref();
  // Same load choreography as the site header: the bar drops in last, once the
  // hero copy has landed, so the two never arrive on top of each other.
  const { stage } = useLoadStage();

  return (
    <motion.header
      initial={{ transform: "translateY(-100%)" }}
      animate={{ transform: stage === "nav" ? "translateY(0%)" : "translateY(-100%)" }}
      transition={{ duration: reduce ? 0.2 : 0.65, ease: EASE_OUT }}
      style={{ background: PAPER }}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1036px] items-center justify-between px-6 lg:px-0">
        <Link href="/" className="text-[16px] font-semibold text-[#1B2A30]" style={DISPLAY}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#1B2A30] pb-[3px] text-[14px] text-[#1B2A30]">
            Work
          </Link>
          <Link href="/about" className="text-[14px] text-[#1B2A30] transition-opacity duration-200 hover:opacity-70">
            About
          </Link>
          <a target="_blank" rel="noreferrer" href="/resume.pdf" className="text-[14px] text-[#1B2A30] transition-opacity duration-200 hover:opacity-70">
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] bg-[#1B2A30] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98]"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] bg-[#1B2A30] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] md:hidden"
          style={BODY}
        >
          Contact
        </Link>
      </div>
    </motion.header>
  );
}

function Hero() {
  const reduce = useMotionPref();
  const ready = useMotionReady();
  // The hero is above the fold, so it animates on load rather than on scroll.
  // It stays hidden until the preloader releases, otherwise it would play out
  // unseen behind the gate.
  const { stage } = useLoadStage();
  const { group, item } = heroMotion(!ready ? "pending" : !!reduce);

  return (
    <header className="relative overflow-hidden" style={{ background: DARK }}>
      <div
        aria-hidden
        className="pointer-events-none absolute hidden rounded-full border lg:block"
        style={{ width: 900, height: 900, right: -220, top: -260, borderColor: "rgba(255,255,255,0.06)" }}
      />
      <div className="relative mx-auto w-full max-w-[1036px] px-6 pb-[70px] pt-[60px] lg:h-[731px] lg:px-0 lg:pb-16 lg:pt-[96px]">
        <motion.div
          variants={group}
          initial="hidden"
          animate={stage === "loading" ? "hidden" : "visible"}
          className="flex flex-col gap-10 lg:block"
        >
          <div className="flex max-w-[540px] flex-col items-start gap-9 lg:w-[540px] lg:max-w-none lg:shrink-0">
            <motion.div variants={item} className="flex flex-col items-start gap-[18px]">
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
            </motion.div>
            <motion.div variants={item} className="border-l-2 pl-4" style={{ borderColor: AMBER }}>
              <p className="text-[16px] text-[#C3CDCF]" style={BODY}>
                {HERO.role}
              </p>
              <p className="mt-[2px] text-[14px] text-[#93A3A7]" style={BODY}>
                {HERO.roleNote}
              </p>
            </motion.div>
            <motion.a
              variants={item}
              href={HERO.cta.href}
              className="inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold text-[#1B2A30] transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] motion-safe:hover:opacity-90"
              style={{ ...BODY, background: PAPER }}
            >
              {HERO.cta.label}
            </motion.a>
          </div>

          {/* Drop-zones, exactly as designed: pinned to the content column
              (design x minus the 202px gutter), so the copilot window bleeds
              past the column's right edge while the copy keeps its 540 width. */}
          <motion.div
            variants={item}
            aria-hidden
            className="absolute inset-0 hidden lg:block"
          >
            <div className="absolute left-[588px] top-[54px] h-[360px] w-[576px] rounded-[12px] p-[10px]" style={{ background: "#2A424B" }}>
              <Shot
                src={HERO.copilot.src}
                alt={HERO.copilot.alt}
                note={"Drop image\n01-hero-adam-risk-review.png"}
                className="pl-1 pt-[150px]"
                fillClassName="h-full w-full"
                noteClass="text-[#F2B872]"
                loading="eager"
              />
            </div>
            <div
              className="absolute left-[498px] top-[250px] h-[433px] w-[200px] rounded-[28px] p-[10px]"
              style={{ background: DARK2, border: "6px solid #0E1A1F" }}
            >
              <Shot
                src={HERO.borrower.src}
                alt={HERO.borrower.alt}
                note={"Drop image\n02-hero-laura-home.png"}
                className="pl-1 pt-[185px]"
                fillClassName="h-full w-full"
                noteClass="text-[#F2B872]"
                loading="eager"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

function Facts() {
  // A tight band of metadata: the four facts assemble in one beat rather than
  // each getting its own moment.
  const { group, item, viewport } = useStagger({ distance: 12, step: 0.05 });

  return (
    <section data-index="At a glance" data-tone="dark" aria-label="At a glance" style={{ background: "#0F1C21" }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 lg:px-0">
        <motion.ul
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {FACTS.map((fact, i) => (
            <motion.li
              key={fact.label}
              variants={item}
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
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Problem() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={PROBLEM.label} heading={PROBLEM.heading} note={PROBLEM.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-[18px] lg:grid-cols-2"
      >
        {PROBLEM.personas.map((p) => (
          <motion.article
            key={p.name}
            variants={item}
            className="flex flex-col gap-[18px] rounded-[20px] bg-white px-[30px] py-7"
          >
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
          </motion.article>
        ))}
      </motion.div>
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
  // The stage pills are the column's signposts, so they land in order. The
  // table cells and confidence chart stay static: they are data to read, not
  // decoration to perform.
  const { group, item, viewport } = useStagger({ distance: 12, step: 0.05 });
  const patterns = useStagger({ distance: 14, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={JOURNEY.label} heading={JOURNEY.heading} note={JOURNEY.note} />
      <div className="min-w-0 overflow-x-auto">
        <div className="min-w-[880px]">
          <motion.div
            variants={group}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex gap-2 pb-2"
          >
            <div className="w-[110px] shrink-0" />
            {JOURNEY.stages.map((stage) => (
              <motion.div key={stage} variants={item} className="min-w-0 flex-1">
                <span className="flex h-[41px] items-center rounded-[8px] px-[14px] text-[14px] font-semibold text-white" style={{ ...BODY, background: DARK }}>
                  {stage}
                </span>
              </motion.div>
            ))}
          </motion.div>
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
      <motion.div
        variants={patterns.group}
        initial="hidden"
        whileInView="visible"
        viewport={patterns.viewport}
        className="mt-7 grid gap-6 md:grid-cols-3"
      >
        {JOURNEY.patterns.map((pat) => (
          <motion.div key={pat.label} variants={patterns.item} className="flex flex-col gap-[6px] border-t border-[#1B2A30] pt-3">
            <p className="text-[11px] font-bold tracking-[1.1px]" style={{ ...BODY, color: TEAL }}>
              {pat.label.toUpperCase()}
            </p>
            <p className="text-[16px] font-semibold leading-[1.5] text-[#1B2A30]" style={DISPLAY}>
              {pat.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function HowMightWe() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <Reveal distance={22}>
        <div className="flex flex-col gap-[18px] rounded-[22px] bg-[#16262D] p-8 md:p-11">
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: AMBER }}>
          How might we
        </p>
        <p className="max-w-[948px] text-[24px] font-medium leading-[1.35] text-[#EEF2F2] md:text-[28px]" style={DISPLAY}>
          How might we design a connected AI experience, spanning borrower and loan officer, that reduces fragmentation and
          cognitive load through guidance and analysis, while keeping the human as the sole decision-maker at every
          consequential step?
        </p>
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-[14px] pt-[10px] md:grid-cols-3"
        >
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
            <motion.div
              key={c.label}
              variants={item}
              className="flex flex-col gap-[10px] rounded-[14px] p-5"
              style={{ background: DARK2 }}
            >
              <p className="text-[10px] font-bold tracking-[1px] text-[#93A3A7]" style={BODY}>
                {c.label}
              </p>
              <p className="text-[15px] leading-[1.45] text-[#EEF2F2]" style={BODY}>
                {c.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <p className="pt-[12px] text-[14px] text-[#C3CDCF]" style={BODY}>
          Success looks like: fewer systems in Adam’s day · no silent stretches for Laura · every decision traceable to a named
          human
        </p>
        </div>
      </Reveal>
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
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={IDEATION.label} heading={IDEATION.heading} note={IDEATION.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 lg:grid-cols-3"
      >
        {IDEATION.directions.map((dir) => (
          <motion.article
            key={dir.tag}
            variants={item}
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
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

/* ----------------------------- design principle ----------------------------- */

function Principle() {
  // Only the header pills move: they are signposts, while the rule rows are
  // data to read and the RULE line is a compliance statement that stays put.
  const { group, item, viewport } = useStagger({ distance: 12, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={PRINCIPLE.eyebrow} heading={PRINCIPLE.heading} note={PRINCIPLE.note} size="md" />
      {/* header pills */}
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="hidden gap-2 pb-2 lg:flex"
      >
        <div className="w-[130px] shrink-0" />
        <motion.div variants={item} className="flex-1">
          <span className="flex h-[41px] items-center rounded-[8px] px-[14px] text-[14px] font-bold text-[#1D4F5C]" style={{ ...BODY, background: "#E4EEF0" }}>
            {PRINCIPLE.columns[0]}
          </span>
        </motion.div>
        <motion.div variants={item} className="flex-1">
          <span className="flex h-[41px] items-center rounded-[8px] px-[14px] text-[14px] font-bold text-white" style={{ ...BODY, background: DARK }}>
            {PRINCIPLE.columns[1]}
          </span>
        </motion.div>
        <motion.div variants={item} className="flex-1">
          <span className="flex h-[41px] items-center rounded-[8px] px-[14px] text-[14px] font-bold text-[#2E6B45]" style={{ ...BODY, background: "#E6F1EA" }}>
            {PRINCIPLE.columns[2]}
          </span>
        </motion.div>
      </motion.div>
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
      <Shot
        screen={UX_FLOW.flow.screen}
        alt={UX_FLOW.flow.alt}
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
  // Lo-fi → mid-fi → hi-fi is a transformation, so each group's stages arrive
  // in order with the arrow between them. The whole stage column (frame plus
  // tag) moves as one unit.
  const stages = useStagger({ distance: 18, step: 0.09 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={WIREFRAMES.label} heading={WIREFRAMES.heading} note={WIREFRAMES.note} />
      {WIREFRAMES.groups.map((group) => (
        <div key={group.title} className="pb-10">
          <p className="text-[15px] font-semibold" style={{ ...BODY, color: TEAL }}>
            {group.title}
          </p>
          {/* The desktop row is 1086px — 50px wider than the 1036 content
              column, exactly as the design draws it. On desktop it must show
              all three stages on one line (the row bleeds ~25px past the
              column on each side; the page clips overflow-x, so it never
              scrolls). Only on narrower screens does it scroll inline. */}
          <div className={group.size === "desktop" ? "overflow-x-auto lg:overflow-visible" : undefined}>
          <motion.div
            variants={stages.group}
            initial="hidden"
            whileInView="visible"
            viewport={stages.viewport}
            className={`mt-[10px] flex flex-nowrap items-start gap-[18px] ${
              group.size === "desktop" ? "w-[1086px] max-w-none" : "flex-wrap"
            }`}
          >
            {group.stages.map((stage, i) => (
              <div key={stage.tag} className="contents">
                {i > 0 && (
                  <Reveal
                    distance={12}
                    className="hidden h-[36px] w-[36px] shrink-0 items-center justify-center self-center rounded-[999px] md:flex"
                    style={{ background: TEAL }}
                  >
                    <Icon name="icon-arrow" size={18} />
                  </Reveal>
                )}
                <motion.div variants={stages.item} className="flex flex-col gap-[10px]">
                  <Shot
                    src={"src" in stage ? stage.src : undefined}
                    screen={"screen" in stage ? stage.screen : undefined}
                    alt={"alt" in stage ? stage.alt : undefined}
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
                </motion.div>
              </div>
            ))}
          </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ------------------------------ key decisions -------------------------------- */

function KeyDecisions() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });

  return (
    <section className="mt-[90px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-24 lg:px-0">
        <SectionHead onDark eyebrow={KEY_DECISIONS.eyebrow} heading={KEY_DECISIONS.heading} />
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 lg:grid-cols-2"
        >
          {KEY_DECISIONS.items.map((decision) => (
            <motion.article
              key={decision.title}
              variants={item}
              className="flex items-start gap-[24px] rounded-[20px] bg-[#1F333B] p-[26px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src={decision.art}
                width={104}
                height={104}
                alt=""
                aria-hidden
                draggable={false}
                className="shrink-0 select-none rounded-[16px]"
              />
              <div>
                <h3 className="text-[18px] font-semibold leading-[1.5] text-[#EEF2F2]" style={DISPLAY}>
                  {decision.title}
                </h3>
                <p className="mt-[5px] max-w-[330px] text-[14px] leading-[1.5] text-[#B3C0C3]" style={BODY}>
                  {decision.body}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------- hi-fi ------------------------------------ */

function HifiSection() {
  // Each screen-plus-caption arrives as one unit, so the frame and its label
  // never separate mid-entrance.
  const laura = useStagger({ distance: 20, step: 0.07 });
  const adam = useStagger({ distance: 20, step: 0.08 });

  return (
    <section id="hifi" className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={HIFI.eyebrow} heading={HIFI.heading} note={HIFI.note} />
      <p className="text-[15px] font-semibold" style={{ ...BODY, color: TEAL }}>
        {HIFI.laura.title}
      </p>
      <motion.div
        variants={laura.group}
        initial="hidden"
        whileInView="visible"
        viewport={laura.viewport}
        className="mt-[14px] grid gap-[30px] pb-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {HIFI.laura.screens.map((s) => (
          <motion.figure key={s.caption} variants={laura.item}>
            <Shot
              src={"src" in s ? s.src : undefined}
              screen={"screen" in s ? s.screen : undefined}
              alt={"alt" in s ? s.alt : undefined}
              note={"Drop image\n" + s.placeholder.split(" ")[2]}
              className="h-[511px] rounded-[26px] border p-2"
              style={{ background: "#ECE9E2", borderColor: HAIR }}
            />
            <figcaption className="mt-[10px] text-[13px] text-[#5E6A6E]" style={BODY}>
              {s.caption}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
      <p className="text-[15px] font-semibold" style={{ ...BODY, color: TEAL }}>
        {HIFI.adam.title}
      </p>
      <motion.div
        variants={adam.group}
        initial="hidden"
        whileInView="visible"
        viewport={adam.viewport}
        className="mt-[14px] grid gap-x-[18px] gap-y-6 pb-10 lg:grid-cols-2"
      >
        {HIFI.adam.screens.map((s) => (
          <motion.figure key={s.caption} variants={adam.item}>
            <Shot
              src={"src" in s ? s.src : undefined}
              screen={"screen" in s ? s.screen : undefined}
              alt={"alt" in s ? s.alt : undefined}
              note={"Drop image\n" + s.placeholder.split(" ")[2]}
              className="h-[318px] rounded-[12px] p-2"
              style={{ background: DARK2 }}
              noteClass="text-[#F2B872]"
            />
            <figcaption className="mt-[10px] text-[13px] text-[#5E6A6E]" style={BODY}>
              {s.caption}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
      <Reveal distance={20}>
        <div className="flex flex-col gap-6 rounded-[18px] bg-white p-6 lg:flex-row lg:items-center">
        <Shot
          screen={HIFI.component.screen}
          alt={HIFI.component.alt}
          note={"Drop image\n" + HIFI.component.placeholder.split(" ")[2]}
          className="h-[150px] w-full max-w-[604px] shrink-0 rounded-[10px] p-2"
          style={{ background: "#EDF1F1" }}
          noteStyle={{ color: TEAL }}
        />
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
      </Reveal>
    </section>
  );
}

/* --------------------------------- outcome ----------------------------------- */

function Outcome() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  const capabilities = useStagger({ distance: 14, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={OUTCOME.eyebrow} heading={OUTCOME.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-[14px] md:grid-cols-3"
      >
        {OUTCOME.stats.map((stat) => (
          <motion.div
            key={stat.num}
            variants={item}
            className="rounded-[18px] p-6"
            style={{ background: stat.tone === "amber" ? AMBER : DARK }}
          >
            <p className="text-[40px] font-semibold leading-none" style={{ ...DISPLAY, color: stat.tone === "amber" ? DARK : "#EEF2F2" }}>
              {stat.num}
            </p>
            <p className="mt-[12px] text-[14px] leading-[1.5]" style={{ ...BODY, color: stat.tone === "amber" ? DARK : "#C6D2D4" }}>
              {stat.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-[10px] text-[12px] text-[#5E6A6E]" style={BODY}>
        {OUTCOME.caption}
      </p>
      <p className="mt-[36px] text-[11px] font-bold tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
        {OUTCOME.showsLabel.toUpperCase()}
      </p>
      <motion.div
        variants={capabilities.group}
        initial="hidden"
        whileInView="visible"
        viewport={capabilities.viewport}
        className="mt-[14px] grid gap-[14px] pb-2 sm:grid-cols-2 lg:grid-cols-4"
      >
        {OUTCOME.capabilities.map((cap) => (
          <motion.div key={cap.title} variants={capabilities.item} className="rounded-[16px] bg-white p-5 pb-[22px]">
            <p className="text-[16px] font-semibold leading-[1.5] text-[#1B2A30]" style={DISPLAY}>
              {cap.title}
            </p>
            <p className="mt-[6px] text-[13px] leading-[1.5] text-[#5E6A6E]" style={BODY}>
              {cap.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-6 max-w-[900px] text-[12px] leading-[1.5] text-[#5E6A6E]" style={BODY}>
        {OUTCOME.disclaimer}
      </p>
    </section>
  );
}

/* ------------------------------- more projects -------------------------------- */

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });

  return (
    <section data-index="More projects" data-tone="light" className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[90px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5E6A6E]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#1B2A30] pb-[2px] text-[14px] font-semibold text-[#1B2A30] transition-opacity duration-200 hover:opacity-70" style={BODY}>
          All work
        </Link>
      </div>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-[28px] grid gap-4 md:grid-cols-2"
      >
        {NEIGHBORS.map((n) => (
          /* The motion wrapper only carries the entrance, so the CSS hover
             lift on the card never fights it for `transform`. */
          <motion.div key={n.title} variants={item}>
            <Link
              href={n.href}
              className="group flex items-center gap-[20px] rounded-[18px] bg-white p-[14px] transition-transform duration-200 motion-safe:group-hover:-translate-y-[2px] motion-safe:active:scale-[0.99] motion-reduce:transition-none motion-reduce:transform-none"
            >
              <span
                className="relative h-[110px] w-[150px] shrink-0 overflow-hidden rounded-[12px]"
                style={{ background: n.thumbDark ? "#231B1D" : "#E6DFD3" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={n.thumb}
                  alt={n.title}
                  className="absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-[6px] object-cover transition-transform duration-200 motion-safe:group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:transform-none"
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
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer data-index="Contact" data-tone="dark" style={{ background: DARK }}>
      {/* One quiet rise for the whole row — a footer is a sign-off, not a
          section, and per-link entrances would overplay it. */}
      <Reveal distance={16}>
        <div className="mx-auto flex w-full max-w-[1036px] flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-0">
          <div>
            <p className="text-[32px] font-semibold text-[#EEF2F2]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="mt-[10px] inline-block border-b border-[#56606B] pb-[2px] text-[16px] text-[#C3CDCF] transition-opacity duration-200 hover:opacity-80"
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
                className="text-[14px] text-[#EEF2F2] transition-opacity duration-200 hover:opacity-80"
                style={BODY}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Reveal>
    </footer>
  );
}

/* ---------------------------------- page ----------------------------------- */

export default function ClarityCase() {
  return (
    <main style={{ background: PAPER }}>
      <ProjectRuler />
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
