"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  BRIEF,
  CLOSING,
  CONCEPT,
  DESIGN_BRIEF,
  EXISTING,
  FACTS,
  FIELD,
  FINAL,
  HERO,
  INSIGHT,
  KEY_USERS,
  LABOUR,
  MORE_PROJECTS,
  OBSERVING,
  PROBLEM,
  PROTOTYPING,
  REQUIREMENTS,
  SYSTEM,
  VALIDATION,
  VISUAL,
  WHY,
} from "@/data/maternal-care";
import { EASE_OUT, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

/* ---------------------------------- tokens ---------------------------------
   Sampled directly from the Figma frame (node 445:232). This case study has
   its own palette — clinical deep greens and a mint accent on cool paper — so
   it does not use the shared case-theme tokens. */

const PAPER = "#f2f5f4";
const INK = "#1b1a33";
const MUTED = "#5c5b70";
const ACCENT = "#3fb59a";
const EYEBROW = "#12785f";
const HERO_BG = "#0f2a26";
const FACTS_BG = "#0a1f1c";
const BAND = "#12302b";
const DARK_CARD = "#1b3f39";
const DARK_SLOT = "#1e4a43";
const ON_DARK = "#f1f5f3";
const ON_DARK_2 = "#9fbdb5";
const ON_DARK_3 = "#c3d6d0";
const ON_DARK_4 = "#8fb0a7";
const CHIP_BG = "#dcefe8";
const LIGHT_SLOT = "#e3e3ea";
const TABLE_LINE = "#e3e6e4";
const GATE_BG = "rgba(11,26,24,0.62)";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/** 1440 frame with 202px gutters → a 1036px content column. */
const GUTTER = "px-6 md:px-10 lg:px-[202px]";
const CONTENT = "mx-auto w-full max-w-[1440px]";

/* --------------------------------- motion ---------------------------------- */

/**
 * The hero plays on load rather than on scroll, so it can't use the shared
 * `useStagger` (that one is viewport-triggered and would never fire above the
 * fold). Same easing and the same 500ms-class timing, so the two dialects are
 * indistinguishable on screen. Reduced motion keeps the opacity fade and drops
 * every bit of movement.
 */
function heroMotion(reduce: boolean): { group: Variants; item: Variants } {
  if (reduce) {
    return {
      group: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } },
      item: {
        hidden: { opacity: 0, transform: "translateY(0px)" },
        visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.3 } },
      },
    };
  }
  return {
    group: { hidden: {}, visible: { transition: { delayChildren: 0.05, staggerChildren: 0.09 } } },
    item: {
      hidden: { opacity: 0, transform: "translateY(20px)" },
      visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.55, ease: EASE_OUT } },
    },
  };
}

/* ------------------------------ shared pieces ------------------------------ */

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/case/maternal-care/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className="select-none"
    />
  );
}

/**
 * The design's drop-frame with its sensitive-content gate. The hint text sits
 * behind the export; a real image lands per /case/maternal-care/<file>. When a
 * frame is marked sensitive it stays blurred at blur(32px) behind the gate
 * until "View anyway" is clicked (revealed per image, for the session only).
 */
function FigSlot({
  file,
  height,
  tone = "light",
  sensitive = false,
  className,
  variants,
}: {
  file: string;
  height: string;
  tone?: "light" | "dark";
  sensitive?: boolean;
  className?: string;
  variants?: Variants;
}) {
  const dark = tone === "dark";
  const [revealed, setRevealed] = useState(false);
  const hidden = sensitive && !revealed;

  const frame = (
    <div
      className={`relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden px-2 ${height} ${className ?? ""}`}
      style={{ background: dark ? DARK_SLOT : LIGHT_SLOT, borderRadius: 14 }}
    >
      {/* Exports resolve by convention at /case/maternal-care/<file>; the hint
          shows through only if a file is ever missing. */}
      <span
        aria-hidden
        className={`px-2 text-center text-[10px] leading-[1.5] ${dark ? "text-[#8fcdbb]" : MUTED}`}
        style={BODY}
      >
        Drop image
        <br />
        {file}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/case/maternal-care/${file}`}
        alt={file}
        loading="lazy"
        draggable={false}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: hidden ? "blur(32px)" : undefined }}
      />
      {hidden ? (
        /* Hidden state — Instagram-style gate from Figma (node 445:229): the
           image stays blurred and a scrim covers it until the viewer opts in. */
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-[10px] overflow-hidden px-10 text-center"
          style={{ background: GATE_BG, borderRadius: 14 }}
        >
          <Icon name="mc-icon-eye-off" size={30} />
          <p className="text-[18px] font-semibold leading-[1.5] text-white" style={BODY}>
            Sensitive content
          </p>
          <p className="w-full max-w-[360px] text-[13px] leading-[1.5] text-white/80" style={BODY}>
            This image may include live childbirth documentation or medical visuals that some people may find disturbing.
          </p>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-1.5 cursor-pointer rounded-[999px] border border-white/70 px-5 py-[9px] text-[14px] font-semibold leading-[1.5] text-white transition-colors hover:bg-white/10"
            style={BODY}
          >
            View anyway
          </button>
        </div>
      ) : sensitive ? (
        /* Revealed state — a small "Hide" chip in the top-right so the viewer
           can re-cover the image. */
        <button
          type="button"
          aria-label="Hide sensitive image"
          onClick={() => setRevealed(false)}
          className="absolute right-3 top-3 cursor-pointer rounded-[999px] px-3 py-[5px] text-[12px] font-semibold leading-[1.5] text-white transition-colors hover:brightness-125"
          style={{ ...BODY, background: "rgba(11,26,24,0.6)" }}
        >
          Hide
        </button>
      ) : null}
    </div>
  );

  if (variants) return <motion.figure variants={variants}>{frame}</motion.figure>;
  return <Reveal distance={20}>{frame}</Reveal>;
}

function FigCaption({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <figcaption
      className={`text-[13px] leading-[1.5] ${onDark ? ON_DARK_2 : MUTED} ${className ?? ""}`}
      style={BODY}
    >
      {children}
    </figcaption>
  );
}

function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="h-[16px] w-[4px] shrink-0" style={{ background: ACCENT }} />
      <p className="text-[11px] font-bold leading-[1.5]" style={{ ...BODY, color: onDark ? ACCENT : EYEBROW }}>
        {children}
      </p>
    </div>
  );
}

function SectionHead({
  eyebrow,
  heading,
  note,
  onDark = false,
  headingWidth = "max-w-[820px]",
}: {
  eyebrow: string;
  heading: string;
  note?: string;
  onDark?: boolean;
  headingWidth?: string;
}) {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.08 });
  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="flex flex-wrap items-end justify-between gap-6 pb-9"
    >
      <motion.div variants={item} className={headingWidth}>
        <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
        <h2
          className="mt-[14px] text-[26px] font-semibold leading-[1.16] md:text-[38px]"
          style={{ ...DISPLAY, color: onDark ? ON_DARK : INK }}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className="max-w-[400px] text-[14px] leading-[1.5]"
          style={{ ...BODY, color: onDark ? ON_DARK_2 : MUTED }}
        >
          {note}
        </motion.p>
      )}
    </motion.div>
  );
}

/** A small section-level label, e.g. POSTURE STUDY, on the given tone. */
function MiniLabel({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p className="text-[11px] font-bold leading-[1.5]" style={{ ...BODY, color: onDark ? ACCENT : EYEBROW }}>
      {children}
    </p>
  );
}

/** White info card used throughout the light sections. */
function InfoCard({
  title,
  body,
  lead = false,
  width,
}: {
  title: string;
  body: string;
  lead?: boolean;
  width?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-[6px] rounded-[14px] px-5 pb-5 pt-[18px] ${width ?? "w-full"}`}
      style={{ background: lead ? CHIP_BG : "#ffffff" }}
    >
      <p className="text-[16px] font-semibold leading-[1.5]" style={{ ...BODY, color: INK }}>
        {title}
      </p>
      <p className="text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {body}
      </p>
    </div>
  );
}

/** Stat card: big green figure, title, source note. */
function StatCard({ value, title, note }: { value: string; title: string; note: string }) {
  return (
    <div className="flex flex-col gap-[6px] rounded-[14px] bg-white px-5 pb-5 pt-[18px]">
      <p className="text-[32px] font-semibold leading-[1.16] md:text-[40px]" style={{ ...DISPLAY, color: EYEBROW }}>
        {value}
      </p>
      <p className="text-[16px] font-semibold leading-[1.5]" style={{ ...BODY, color: INK }}>
        {title}
      </p>
      <p className="text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {note}
      </p>
    </div>
  );
}

/** Dark numbered requirement card (dark bands). */
function DarkCard({
  kicker,
  title,
  body,
  outline = false,
}: {
  kicker?: string;
  title: string;
  body: string;
  outline?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-2 rounded-[14px] px-[22px] pb-6 pt-[22px]"
      style={
        outline
          ? { border: "1px solid rgba(63,181,154,0.5)" }
          : { background: DARK_CARD }
      }
    >
      {kicker && (
        <p className="text-[13px] font-bold leading-[1.5]" style={{ ...BODY, color: ACCENT }}>
          {kicker}
        </p>
      )}
      <p className="text-[18px] font-semibold leading-[1.5]" style={{ ...BODY, color: ON_DARK }}>
        {title}
      </p>
      <p className="text-[14px] leading-[1.5]" style={{ ...BODY, color: ON_DARK_2 }}>
        {body}
      </p>
    </div>
  );
}

/** A two-up row of image figures with captions. */
function SlideRow({
  items,
  tone = "light",
}: {
  items: readonly { file: string; caption: string; sensitive?: boolean }[];
  tone?: "light" | "dark";
}) {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.09 });
  return (
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="grid gap-4 lg:grid-cols-2"
    >
      {items.map((s) => (
        <motion.figure variants={item} key={s.file} className="flex w-full flex-col gap-2">
          <FigSlot file={s.file} height="h-[240px] lg:h-[360px]" tone={tone} sensitive={s.sensitive} />
          <FigCaption onDark={tone === "dark"}>{s.caption}</FigCaption>
        </motion.figure>
      ))}
    </motion.div>
  );
}

/* ---------------------------------- chrome ---------------------------------- */

function Nav() {
  const reduce = useMotionPref();
  const { stage } = useLoadStage();
  return (
    <motion.header
      initial={{ transform: "translateY(-100%)" }}
      animate={{ transform: stage === "nav" ? "translateY(0%)" : "translateY(-100%)" }}
      transition={{ duration: reduce ? 0.2 : 0.65, ease: EASE_OUT }}
      className={`${CONTENT} ${GUTTER} flex items-center justify-between py-[14px]`}
    >
      <Link href="/" className="shrink-0 text-[16px] font-semibold leading-[1.5] text-[#1b1a33]" style={BODY}>
        Neha Mayacharya
      </Link>
      <div className="hidden items-center gap-[30px] md:flex">
        <Link
          href="/projects"
          aria-current="page"
          className="border-b-[1.5px] border-[#1b1a33] pb-[3px] text-[14px] font-normal leading-[1.5] text-[#1b1a33]"
          style={BODY}
        >
          Work
        </Link>
        <Link href="/about" className="case-link text-[14px] leading-[1.5] text-[#1b1a33]" style={BODY}>
          About
        </Link>
        <a href="/resume.pdf" className="case-link text-[14px] leading-[1.5] text-[#1b1a33]" style={BODY}>
          Résumé (PDF)
        </a>
        <a
          href="#contact"
          className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#1b1a33] px-5 text-[14px] font-semibold leading-[1.5] text-white"
          style={BODY}
        >
          Contact
        </a>
      </div>
      <a
        href="#contact"
        className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#1b1a33] px-5 text-[14px] font-semibold leading-[1.5] text-white md:hidden"
        style={BODY}
      >
        Contact
      </a>
    </motion.header>
  );
}

/* ---------------------------------- hero ----------------------------------- */

function Hero() {
  const reduce = useMotionPref();
  const { stage } = useLoadStage();
  const { group, item } = heroMotion(!!reduce);

  return (
    <section className="relative overflow-hidden" style={{ background: HERO_BG }}>
      <motion.div
        variants={group}
        initial="hidden"
        animate={stage === "loading" ? "hidden" : "visible"}
        className={`${CONTENT} ${GUTTER} relative flex flex-col items-start gap-[30px] pb-[72px] pt-[72px] lg:h-[934px] lg:pb-0 lg:pt-24`}
      >
        <div className="flex w-full max-w-[520px] flex-col gap-[30px]">
          <motion.div
            variants={item}
            className="flex w-fit items-center gap-2 rounded-[999px] border px-[12px] py-[7px] pr-[14px]"
            style={{ borderColor: "rgba(255,255,255,0.35)" }}
          >
            <Icon name="mc-icon-alert" size={16} />
            <p className="text-[12px] font-medium leading-[1.5]" style={{ ...BODY, color: "#e6f2ee" }}>
              {HERO.contentNote}
            </p>
          </motion.div>

          <div className="flex flex-col gap-[18px]">
            <motion.p variants={item} className="text-[13px] font-semibold leading-[1.5]" style={{ ...BODY, color: ACCENT }}>
              {HERO.eyebrow}
            </motion.p>
            <motion.h1
              variants={item}
              className="w-full max-w-[520px] text-[34px] font-semibold leading-[1.16] tracking-[-1.08px] md:text-[54px]"
              style={{ ...DISPLAY, color: ON_DARK }}
            >
              {HERO.headline}
            </motion.h1>
            <motion.p variants={item} className="w-full max-w-[500px] text-[18px] leading-[1.5]" style={{ ...BODY, color: ON_DARK_3 }}>
              {HERO.support}
            </motion.p>
          </div>

          <motion.div variants={item} className="relative flex w-full max-w-[520px] flex-col gap-[2px] pl-4">
            <div className="absolute left-0 top-0 h-[60px] w-[3px]" style={{ background: ACCENT }} />
            <p className="text-[16px] font-semibold leading-[1.5]" style={{ ...BODY, color: ON_DARK }}>
              {HERO.role}
            </p>
            <p className="w-full max-w-[500px] text-[14px] leading-[1.5]" style={{ ...BODY, color: ON_DARK_4 }}>
              {HERO.roleNote}
            </p>
          </motion.div>

          <motion.div variants={item} className="flex w-fit items-center gap-2.5 rounded-[12px] px-[14px] py-2.5 pr-[18px]" style={{ background: DARK_CARD }}>
            <Icon name="mc-icon-award" size={22} />
            <div className="flex flex-col">
              <p className="text-[15px] font-semibold leading-[1.3]" style={{ ...BODY, color: ON_DARK }}>
                {HERO.awardTitle}
              </p>
              <p className="text-[12px] leading-[1.3]" style={{ ...BODY, color: ON_DARK_4 }}>
                {HERO.awardNote}
              </p>
            </div>
          </motion.div>

          <motion.a
            variants={item}
            href="#the-problem"
            className="case-cta flex h-auto w-fit items-center justify-center rounded-[999px] px-[22px] py-3 text-[15px] font-semibold leading-[1.5]"
            style={{ ...BODY, background: ACCENT, color: HERO_BG }}
          >
            {HERO.cta}
          </motion.a>
        </div>

        <motion.figure variants={item} className="w-full max-w-[600px] lg:absolute lg:left-[760px] lg:top-[255px] lg:w-[600px] lg:max-w-none">
          <FigSlot file={HERO.coverFigure} height="h-[300px] lg:h-[424px]" tone="dark" className="lg:rounded-[20px]" />
        </motion.figure>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- facts ---------------------------------- */

function Facts() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className="w-full" style={{ background: FACTS_BG }}>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className={`${CONTENT} ${GUTTER} grid gap-6 py-[26px] sm:grid-cols-2 lg:grid-cols-4`}
      >
        {FACTS.map((f) => (
          <motion.div variants={item} key={f.label} className="flex items-start gap-3">
            <Icon name={f.icon} size={20} />
            <div className="flex flex-col gap-[3px]">
              <p className="text-[11px] font-bold leading-[1.5]" style={{ ...BODY, color: ACCENT }}>
                {f.label.toUpperCase()}
              </p>
              <p className="text-[15px] font-semibold leading-[1.5]" style={{ ...BODY, color: ON_DARK }}>
                {f.value}
              </p>
              <p className="text-[13px] leading-[1.5]" style={{ ...BODY, color: ON_DARK_4 }}>
                {f.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------------------------- brief ---------------------------------- */

function Brief() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-4 lg:flex-row">
        <motion.div variants={item} className="flex w-full flex-col gap-[14px] rounded-[20px] px-[30px] pb-[30px] pt-[28px] lg:w-[560px]" style={{ background: BAND }}>
          <p className="text-[11px] font-bold leading-[1.5]" style={{ ...BODY, color: ACCENT }}>
            {BRIEF.cardLabel}
          </p>
          <p className="w-full max-w-[500px] text-[19px] font-medium leading-[1.5]" style={{ ...BODY, color: ON_DARK }}>
            {BRIEF.cardLead}
          </p>
          <p className="w-full max-w-[500px] text-[15px] leading-[1.5]" style={{ ...BODY, color: "#b5ccc5" }}>
            {BRIEF.cardBody}
          </p>
        </motion.div>
        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[460px]">
          <FigSlot file={BRIEF.figure} height="h-[240px] lg:h-[326px]" />
          <FigCaption>{BRIEF.figureCaption}</FigCaption>
        </motion.figure>
      </motion.div>

      <Reveal distance={12} className="mt-6 flex flex-wrap items-center gap-x-[10px] gap-y-2">
        <p className="text-[11px] font-bold leading-[1.5]" style={{ ...BODY, color: MUTED }}>
          {BRIEF.chipsLabel}
        </p>
        {BRIEF.chips.map((c) => (
          <span
            key={c}
            className="rounded-[999px] px-4 py-[9px] text-[13px] font-semibold leading-[1.5]"
            style={{ ...BODY, background: CHIP_BG, color: EYEBROW }}
          >
            {c}
          </span>
        ))}
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-5 grid gap-4 md:grid-cols-3">
        {BRIEF.cards.map((c) => (
          <motion.div variants={item} key={c.title}>
            <InfoCard title={c.title} body={c.body} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- problem --------------------------------- */

function Problem() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section id="the-problem" className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={PROBLEM.eyebrow} heading={PROBLEM.heading} note={PROBLEM.note} headingWidth="max-w-[600px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEM.stats.map((s) => (
          <motion.div variants={item} key={s.value}>
            <StatCard value={s.value} title={s.title} note={s.note} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6">
        <SlideRow items={PROBLEM.slides} />
      </div>
      <div className="mt-4">
        <SlideRow items={PROBLEM.scenario} />
      </div>
    </section>
  );
}

/* ---------------------------------- system --------------------------------- */

function System() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={SYSTEM.eyebrow} heading={SYSTEM.heading} note={SYSTEM.note} headingWidth="max-w-[600px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-3">
        {SYSTEM.levels.map((l) => (
          <motion.div variants={item} key={l.title}>
            <InfoCard title={l.title} body={l.body} lead={l.lead} />
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={20} className="mt-4">
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={SYSTEM.figure} height="h-[360px] lg:h-[733px]" />
          <FigCaption>{SYSTEM.figureCaption}</FigCaption>
        </figure>
      </Reveal>

      <div className="mt-4">
        <SlideRow items={SYSTEM.focus} />
      </div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-4 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {SYSTEM.roles.map((r) => (
          <motion.div variants={item} key={r.title}>
            <InfoCard title={r.title} body={r.body} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* -------------------------------- key users -------------------------------- */

function KeyUsers() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={KEY_USERS.eyebrow} heading={KEY_USERS.heading} />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-3">
        {KEY_USERS.users.map((u) => (
          <motion.div variants={item} key={u.title}>
            <InfoCard title={u.title} body={u.body} lead={u.lead} />
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={20} className="mt-4">
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={KEY_USERS.figure} height="h-[360px] lg:h-[733px]" />
          <FigCaption>{KEY_USERS.figureCaption}</FigCaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- field ---------------------------------- */

function Field() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={FIELD.eyebrow} heading={FIELD.heading} note={FIELD.note} headingWidth="max-w-[600px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-5">
        {FIELD.findings.map((f) => (
          <motion.div variants={item} key={f.value}>
            <StatCard value={f.value} title={f.title} note={f.note} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4">
        <SlideRow items={FIELD.slides} />
      </div>
    </section>
  );
}

/* ------------------------------- observing birth --------------------------- */

function Observing() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={OBSERVING.eyebrow} heading={OBSERVING.heading} note={OBSERVING.note} headingWidth="max-w-[600px]" />

      <Reveal distance={14}>
        <div className="flex items-center gap-[14px] rounded-[14px] px-5 py-4" style={{ background: HERO_BG }}>
          <Icon name="mc-icon-eye-off-2" size={22} />
          <div className="flex flex-col gap-[2px]">
            <p className="text-[15px] font-semibold leading-[1.5]" style={{ ...BODY, color: ON_DARK }}>
              {OBSERVING.warning.title}
            </p>
            <p className="w-full max-w-[950px] text-[13px] leading-[1.5]" style={{ ...BODY, color: ON_DARK_2 }}>
              {OBSERVING.warning.body}
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal distance={12} className="mt-8">
        <MiniLabel>{OBSERVING.squattingLabel}</MiniLabel>
      </Reveal>
      <div className="mt-3">
        <SlideRow items={OBSERVING.squatting} />
      </div>
      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-4 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {OBSERVING.squattingFindings.map((f) => (
          <motion.div variants={item} key={f.title}>
            <InfoCard title={f.title} body={f.body} />
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={12} className="mt-8">
        <MiniLabel>{OBSERVING.lithotomyLabel}</MiniLabel>
      </Reveal>
      <div className="mt-3">
        <SlideRow items={OBSERVING.lithotomy} />
      </div>
      <Reveal distance={12} className="mt-8">
        <MiniLabel>{OBSERVING.fieldLabel}</MiniLabel>
      </Reveal>
      <Reveal distance={20} className="mt-3">
        <figure className="flex w-full flex-col gap-2">
          <FigSlot
            file={OBSERVING.fieldFigure.file}
            height="h-[360px] lg:h-[733px]"
            sensitive={OBSERVING.fieldFigure.sensitive}
          />
          <FigCaption>{OBSERVING.fieldFigure.caption}</FigCaption>
        </figure>
      </Reveal>
      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-4 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {OBSERVING.hospitalFindings.map((f) => (
          <motion.div variants={item} key={f.title}>
            <InfoCard title={f.title} body={f.body} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- insight --------------------------------- */

function Insight() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={INSIGHT.eyebrow} heading={INSIGHT.heading} />
      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-4 lg:flex-row">
        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[560px]">
          <FigSlot file={INSIGHT.figure} height="h-[300px] lg:h-[396px]" />
          <FigCaption>{INSIGHT.figureCaption}</FigCaption>
        </motion.figure>
        <motion.div variants={item} className="flex flex-col gap-[10px] lg:w-[460px]">
          {INSIGHT.observations.map((o) => (
            <InfoCard key={o.title} title={o.title} body={o.body} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------------------- validation -------------------------------- */

function Validation() {
  const cellW = ["w-[110px] sm:w-[160px]", "flex-1 min-w-0", "flex-1 min-w-0"];
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={VALIDATION.eyebrow} heading={VALIDATION.heading} note={VALIDATION.note} headingWidth="max-w-[600px]" />

      <Reveal distance={20}>
        <div className="overflow-x-auto rounded-[14px] bg-white px-5 py-2">
          <div className="min-w-[720px]">
            <div className="flex gap-5 border-b py-[14px]" style={{ borderColor: TABLE_LINE }}>
              {VALIDATION.table.columns.map((c, i) => (
                <p
                  key={i}
                  className="text-[11px] font-bold leading-[1.5]"
                  style={{ ...BODY, color: i === 1 ? EYEBROW : MUTED }}
                  // first column is narrow label, second and third are the two positions
                >
                  <span className={cellW[i]} style={{ display: "inline-block" }}>{c || "\u200b"}</span>
                </p>
              ))}
            </div>
            {VALIDATION.table.rows.map((r, ri) => (
              <div
                key={r.label}
                className={`flex gap-5 py-[14px] ${ri < VALIDATION.table.rows.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: TABLE_LINE }}
              >
                <p className={`shrink-0 text-[15px] font-semibold leading-[1.5] ${cellW[0]}`} style={{ ...BODY, color: INK }}>
                  {r.label}
                </p>
                <p className={`text-[14px] leading-[1.5] ${cellW[1]}`} style={{ ...BODY, color: MUTED }}>
                  {r.left}
                </p>
                <p className={`text-[14px] leading-[1.5] ${cellW[2]}`} style={{ ...BODY, color: MUTED }}>
                  {r.right}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-6">
        <SlideRow items={VALIDATION.slides} />
      </div>

      <Reveal distance={14} className="mt-4">
        <div className="flex flex-col gap-[10px] rounded-[14px] bg-white px-[22px] pb-[22px] pt-5">
          <p className="text-[11px] font-bold leading-[1.5]" style={{ ...BODY, color: MUTED }}>
            {VALIDATION.clinicians.label}
          </p>
          <p className="text-[15px] font-medium leading-[1.5]" style={{ ...BODY, color: INK }}>
            {VALIDATION.clinicians.list}
          </p>
          <p className="text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
            {VALIDATION.clinicians.opportunities}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- labour --------------------------------- */

function Labour() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={LABOUR.eyebrow} heading={LABOUR.heading} note={LABOUR.note} headingWidth="max-w-[600px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-3">
        {LABOUR.stages.map((s) => (
          <motion.div
            key={s.title}
            variants={item}
            className="flex flex-col gap-[6px] rounded-[14px] px-5 pb-5 pt-[18px]"
            style={{ background: s.lead ? CHIP_BG : "#ffffff" }}
          >
            <p className="text-[28px] font-semibold leading-[1.16] md:text-[32px]" style={{ ...DISPLAY, color: EYEBROW }}>
              {s.value}
            </p>
            <p className="text-[16px] font-semibold leading-[1.5]" style={{ ...BODY, color: INK }}>
              {s.title}
            </p>
            <p className="text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {s.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={20} className="mt-4">
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={LABOUR.figure.file} height="h-[360px] lg:h-[733px]" sensitive={LABOUR.figure.sensitive} />
          <FigCaption>{LABOUR.figure.caption}</FigCaption>
        </figure>
      </Reveal>

      <div className="mt-4">
        <SlideRow items={LABOUR.bodySlides} />
      </div>
      <div className="mt-4">
        <SlideRow items={LABOUR.deliverySlides} />
      </div>
    </section>
  );
}

/* ------------------------------ why squatting ------------------------------ */

function Why() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={WHY.eyebrow} heading={WHY.heading} note={WHY.note} headingWidth="max-w-[600px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-3">
        {WHY.facts.map((f) => (
          <motion.div
            key={f.value}
            variants={item}
            className="flex flex-col gap-[6px] rounded-[14px] bg-white px-5 pb-5 pt-[18px]"
          >
            <p
              className={`font-semibold leading-[1.16] ${f.big ? "text-[28px] md:text-[40px]" : "text-[28px] md:text-[32px]"}`}
              style={{ ...DISPLAY, color: EYEBROW }}
            >
              {f.value}
            </p>
            <p className="text-[16px] font-semibold leading-[1.5]" style={{ ...BODY, color: INK }}>
              {f.title}
            </p>
            <p className="text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {f.note}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6">
        <SlideRow items={WHY.slides} />
      </div>
    </section>
  );
}

/* ------------------------------ existing products --------------------------- */

function Existing() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={EXISTING.eyebrow} heading={EXISTING.heading} note={EXISTING.note} headingWidth="max-w-[600px]" />

      <Reveal distance={20}>
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={EXISTING.figure} height="h-[360px] lg:h-[733px]" />
          <FigCaption>{EXISTING.figureCaption}</FigCaption>
        </figure>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-4 flex flex-col gap-4 lg:flex-row">
        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[560px]">
          <FigSlot file={EXISTING.analysisFigure} height="h-[300px] lg:h-[396px]" />
          <FigCaption>{EXISTING.analysisFigureCaption}</FigCaption>
        </motion.figure>
        <motion.div variants={item} className="flex flex-col gap-[10px] lg:w-[460px]">
          {EXISTING.findings.map((f) => (
            <InfoCard key={f.title} title={f.title} body={f.body} lead={f.lead} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------ requirements band --------------------------- */

function Requirements() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  return (
    <section className="w-full pt-24">
      <div className="w-full" style={{ background: BAND }}>
        <div className={`${CONTENT} ${GUTTER} py-24`}>
          <SectionHead
            eyebrow={REQUIREMENTS.eyebrow}
            heading={REQUIREMENTS.heading}
            note={REQUIREMENTS.note}
            onDark
            headingWidth="max-w-[600px]"
          />
          <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REQUIREMENTS.items.map((r) => (
              <motion.div variants={item} key={r.n}>
                <DarkCard kicker={r.n} title={r.title} body={r.body} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ design brief band --------------------------- */

function DesignBrief() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  const essential = DESIGN_BRIEF.essential.filter((e) => !e.wide);
  const wide = DESIGN_BRIEF.essential.filter((e) => e.wide);
  return (
    <section className="w-full pt-24">
      <div className="w-full" style={{ background: BAND }}>
        <div className={`${CONTENT} ${GUTTER} py-24`}>
          <SectionHead
            eyebrow={DESIGN_BRIEF.eyebrow}
            heading={DESIGN_BRIEF.heading}
            note={DESIGN_BRIEF.note}
            onDark
            headingWidth="max-w-[600px]"
          />

          <Reveal distance={12}>
            <MiniLabel onDark>{DESIGN_BRIEF.essentialLabel}</MiniLabel>
          </Reveal>
          <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-3 grid gap-4 md:grid-cols-3">
            {essential.map((e) => (
              <motion.div variants={item} key={e.n}>
                <DarkCard kicker={e.n} title={e.title} body={e.body} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-4 grid gap-4 lg:grid-cols-2">
            {wide.map((e) => (
              <motion.div variants={item} key={e.n}>
                <DarkCard kicker={e.n} title={e.title} body={e.body} />
              </motion.div>
            ))}
          </motion.div>

          <Reveal distance={12} className="mt-7">
            <MiniLabel onDark>{DESIGN_BRIEF.desiredLabel}</MiniLabel>
          </Reveal>
          <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-3 grid gap-4 lg:grid-cols-2">
            {DESIGN_BRIEF.desired.map((d) => (
              <motion.div variants={item} key={d.title}>
                <DarkCard title={d.title} body={d.body} outline />
              </motion.div>
            ))}
          </motion.div>

          <Reveal distance={20} className="mt-7">
            <figure className="flex w-full flex-col gap-2">
              <FigSlot
                file={DESIGN_BRIEF.figure.file}
                height="h-[360px] lg:h-[733px]"
                tone="dark"
                sensitive={DESIGN_BRIEF.figure.sensitive}
              />
              <FigCaption onDark>{DESIGN_BRIEF.figure.caption}</FigCaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ visual research ----------------------------- */

function Visual() {
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={VISUAL.eyebrow} heading={VISUAL.heading} note={VISUAL.note} headingWidth="max-w-[600px]" />
      <SlideRow items={VISUAL.boards} />
    </section>
  );
}

/* --------------------------------- concept ---------------------------------- */

function Concept() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={CONCEPT.eyebrow} heading={CONCEPT.heading} note={CONCEPT.note} headingWidth="max-w-[600px]" />

      <Reveal distance={12}>
        <MiniLabel>{CONCEPT.postureLabel}</MiniLabel>
      </Reveal>
      <Reveal distance={20} className="mt-3">
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={CONCEPT.postureFigure} height="h-[360px] lg:h-[733px]" />
          <FigCaption>{CONCEPT.postureFigureCaption}</FigCaption>
        </figure>
      </Reveal>
      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-4 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {CONCEPT.postureFindings.map((f) => (
          <motion.div variants={item} key={f.title}>
            <InfoCard title={f.title} body={f.body} />
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={12} className="mt-8">
        <MiniLabel>{CONCEPT.supportLabel}</MiniLabel>
      </Reveal>
      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-3 flex flex-col gap-4 lg:flex-row">
        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[620px]">
          <FigSlot file={CONCEPT.supportFigure} height="h-[300px] lg:h-[438px]" />
          <FigCaption>{CONCEPT.supportFigureCaption}</FigCaption>
        </motion.figure>
        <motion.div variants={item} className="flex w-full flex-col gap-2 rounded-[14px] px-5 pb-5 pt-[18px] lg:w-[400px]" style={{ background: CHIP_BG }}>
          <p className="text-[11px] font-bold leading-[1.5]" style={{ ...BODY, color: EYEBROW }}>
            {CONCEPT.supportCard.label}
          </p>
          {CONCEPT.supportCard.items.map((t, i) => (
            <p key={t} className="text-[14px] leading-[1.5]" style={{ ...BODY, color: INK }}>
              {i + 1}.&nbsp;&nbsp;{t}
            </p>
          ))}
        </motion.div>
      </motion.div>

      <Reveal distance={12} className="mt-8">
        <MiniLabel>{CONCEPT.brainstormLabel}</MiniLabel>
      </Reveal>
      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-3 grid gap-4 lg:grid-cols-3">
        {CONCEPT.brainstormCards.map((c) => (
          <motion.div
            key={c.label}
            variants={item}
            className="flex flex-col gap-2 rounded-[14px] bg-white px-5 pb-5 pt-[18px]"
          >
            <p className="text-[11px] font-bold leading-[1.5]" style={{ ...BODY, color: EYEBROW }}>
              {c.label}
            </p>
            {c.items.map((t, i) => (
              <p key={t} className="text-[14px] leading-[1.5]" style={{ ...BODY, color: INK }}>
                {i + 1}.&nbsp;&nbsp;{t}
              </p>
            ))}
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-4">
        <SlideRow items={CONCEPT.brainstormSlides} />
      </div>

      {CONCEPT.directions.map((d) => (
        <div key={d.label} className="mt-12">
          <Reveal distance={12} className="flex flex-col gap-[6px]">
            <MiniLabel>{d.label}</MiniLabel>
            <h3 className="text-[24px] font-semibold leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
              {d.title}
            </h3>
            <p className="w-full max-w-[760px] text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {d.body}
            </p>
          </Reveal>
          <div className="mt-4 flex flex-col gap-4">
            {d.sketches.map((s) => (
              <Reveal key={s.file} distance={20}>
                <figure className="flex w-full flex-col gap-2">
                  <FigSlot file={s.file} height={"wide" in s && s.wide ? "h-[360px] lg:h-[733px]" : "h-[240px] lg:h-[360px]"} />
                  <FigCaption>{s.caption}</FigCaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12">
        <Reveal distance={12} className="flex flex-col gap-[6px]">
          <MiniLabel>{CONCEPT.studyModelsLabel}</MiniLabel>
          <h3 className="text-[24px] font-semibold leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
            {CONCEPT.studyModelsTitle}
          </h3>
          <p className="w-full max-w-[760px] text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
            {CONCEPT.studyModelsNote}
          </p>
        </Reveal>
        <div className="mt-4">
          <SlideRow items={CONCEPT.studyModels} />
        </div>
        <Reveal distance={20} className="mt-4">
          <figure className="flex w-full flex-col gap-2">
            <FigSlot file={CONCEPT.studyModelsBig.file} height="h-[360px] lg:h-[733px]" />
            <FigCaption>{CONCEPT.studyModelsBig.caption}</FigCaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- final concept ----------------------------- */

function Final() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={FINAL.eyebrow} heading={FINAL.heading} note={FINAL.note} headingWidth="max-w-[600px]" />

      <Reveal distance={20}>
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={FINAL.figure} height="h-[360px] lg:h-[733px]" />
          <FigCaption>{FINAL.figureCaption}</FigCaption>
        </figure>
      </Reveal>

      <div className="mt-4">
        <SlideRow items={FINAL.renders} />
      </div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-4 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {FINAL.features.map((f) => (
          <motion.div variants={item} key={f.title}>
            <InfoCard title={f.title} body={f.body} />
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={12} className="mt-12">
        <MiniLabel>{FINAL.materialLabel}</MiniLabel>
      </Reveal>
      <div className="mt-3">
        <SlideRow items={FINAL.materials} />
      </div>
      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-4 grid gap-4 md:grid-cols-3">
        {FINAL.materialCards.map((c) => (
          <motion.div variants={item} key={c.title}>
            <InfoCard title={`${c.kicker} · ${c.title}`} body={c.body} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- prototyping ------------------------------ */

function Prototyping() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className="w-full pt-24">
      <div className="w-full" style={{ background: BAND }}>
        <div className={`${CONTENT} ${GUTTER} py-24`}>
          <SectionHead
            eyebrow={PROTOTYPING.eyebrow}
            heading={PROTOTYPING.heading}
            note={PROTOTYPING.note}
            onDark
            headingWidth="max-w-[600px]"
          />
          <Reveal distance={20}>
            <figure className="flex w-full flex-col gap-2">
              <FigSlot file={PROTOTYPING.figure} height="h-[360px] lg:h-[733px]" tone="dark" />
              <FigCaption onDark>{PROTOTYPING.figureCaption}</FigCaption>
            </figure>
          </Reveal>
          <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-4 grid gap-4 md:grid-cols-3">
            {PROTOTYPING.build.map((b) => (
              <motion.div variants={item} key={b.title}>
                <DarkCard kicker={b.label} title={b.title} body={b.body} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ more projects ------------------------------- */

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  const [brokenThumbs, setBrokenThumbs] = useState<Set<string>>(new Set());
  return (
    <section className={`${CONTENT} ${GUTTER} flex flex-col gap-[18px] pb-[90px] pt-[110px]`}>
      <div className="flex w-full items-center justify-between">
        <p className="text-[12px] tracking-[1.2px]" style={{ ...BODY, color: MUTED }}>
          {MORE_PROJECTS.label}
        </p>
        <Link
          href="/projects"
          className="case-link border-b-[1.5px] border-[#1b1a33] pb-[2px] text-[14px] font-semibold leading-[1.5] text-[#1b1a33]"
          style={BODY}
        >
          {MORE_PROJECTS.allWork}
        </Link>
      </div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-[18px] md:grid-cols-2">
        {MORE_PROJECTS.cards.map((c) => (
          <motion.div variants={item} key={c.title} className="h-full">
            <Link href={c.href} className="case-card group flex h-full w-full items-center gap-5 rounded-[18px] bg-white p-[14px]">
              <div
                className="relative h-[110px] w-[150px] shrink-0 overflow-hidden rounded-[12px]"
                style={{ background: c.thumbBg }}
              >
                {caseStudyThumb(c.href) && !brokenThumbs.has(c.href) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={caseStudyThumb(c.href)}
                    alt={c.title}
                    loading="lazy"
                    draggable={false}
                    onError={() => setBrokenThumbs((prev) => new Set(prev).add(c.href))}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute bottom-2 left-2 text-[11px] leading-[1.5]"
                    style={{ ...BODY, color: c.thumbLabel }}
                  >
                    [Thumbnail]
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                  {c.kicker}
                </p>
                <p className="text-[22px] font-semibold leading-[1.2]" style={{ ...DISPLAY, color: INK }}>
                  {c.title}
                </p>
                <p className="max-w-[300px] text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                  {c.body}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- closing ---------------------------------- */

function Closing() {
  return (
    <section className={`${CONTENT} ${GUTTER}`}>
      <Reveal distance={0} className="pt-[28px]">
        <p className="w-full max-w-[1036px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
          {CLOSING.note}
        </p>
      </Reveal>
    </section>
  );
}

/* ---------------------------------- footer ---------------------------------- */

function Footer() {
  return (
    <footer id="contact" className="w-full" style={{ background: HERO_BG }}>
      <div className={`${CONTENT} ${GUTTER} flex flex-col gap-8 pb-16 pt-14 md:flex-row md:items-center md:justify-between`}>
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-semibold leading-[1.15]" style={{ ...DISPLAY, color: "#f1f0fa" }}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="case-link border-b border-[#3a3970] pb-[2px] text-[16px] leading-[1.5] text-[#c7c5e2]"
            style={BODY}
          >
            nmayacharya@gmail.com
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-[26px] text-[14px] leading-[1.5] text-[#f1f0fa]" style={BODY}>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="case-link">
            LinkedIn
          </a>
          <a href="https://www.behance.net" target="_blank" rel="noreferrer" className="case-link">
            Behance
          </a>
          <a href="/resume.pdf" className="case-link">
            Résumé (PDF)
          </a>
        </nav>
      </div>
    </footer>
  );
}

/* ----------------------------------- page ----------------------------------- */

export default function MaternalCareCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Brief />
      <Problem />
      <System />
      <KeyUsers />
      <Field />
      <Observing />
      <Insight />
      <Validation />
      <Labour />
      <Why />
      <Existing />
      <Requirements />
      <DesignBrief />
      <Visual />
      <Concept />
      <Final />
      <Prototyping />
      <Closing />
      <MoreProjects />
      <Footer />
    </main>
  );
}
