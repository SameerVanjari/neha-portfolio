"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ASSESSMENT,
  BRIEF,
  BUILD,
  FACTS,
  HERO,
  JOURNEY,
  MODES,
  MORE_PROJECTS,
  PROCESS,
  RESEARCH,
  STORYBOARD,
  TECH,
} from "@/data/inspirit-dna";
import { EASE_OUT, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

/* ---------------------------------- tokens ---------------------------------
   Sampled directly from the Figma frame (node 430:217). This case study has
   its own palette — an indigo-to-violet hero and curriculum purple on a cool
   paper — so it does not use the shared case-theme tokens. */

const PAPER = "#f4f5f4";
const INK = "#1b1a33";
const MUTED = "#5c5b70";
const PURPLE = "#4f3fa0";
const GOLD = "#fbb424";
const NIGHT = "#17163a";
const DUSK = "#1f1e4a";
const DARK_SLOT = "#36357a";
const DARK_SLOT_TEXT = "#a79bf2";
const LIGHT_SLOT = "#e3e3ea";
const ON_DARK_2 = "#b5b3d2";
const STAGE_PURPLE = "#622c8c";
const GOAL_BG = "#fdf0d2";
const GOAL_TEXT = "#8a5a00";
const TILE = "#fde9c4";
const TABLE_LINE = "#dfdfe6";

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
      group: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      },
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

/* ------------------------------ shared pieces ------------------------------ */

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/case/inspirit-dna/${name}.svg`}
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
 * The design's drop-frame, reproduced exactly. The hint text sits behind the
 * export, so a missing asset shows the labelled frame and a real one covers
 * it; a broken request hides itself rather than showing a browser icon.
 * Exports live at /case/inspirit-dna/<file>.
 */
function FigSlot({
  file,
  height,
  tone = "light",
  video = false,
  className,
  variants,
}: {
  file: string;
  height: string;
  tone?: "light" | "dark";
  video?: boolean;
  className?: string;
  variants?: Variants;
}) {
  const dark = tone === "dark";
  const hintColor = dark ? DARK_SLOT_TEXT : MUTED;

  const frame = (
    <div
      className={`relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden px-2 ${height} ${className ?? ""}`}
      style={{ background: dark ? DARK_SLOT : LIGHT_SLOT, borderRadius: dark ? 16 : 14 }}
    >
      {video ? <Icon name="idn-icon-play" size={30} /> : null}
      <span aria-hidden className={`px-2 text-center text-[10px] leading-[1.4] ${hintColor}`} style={BODY}>
        {video ? "Drop video" : "Drop image"}
        <br />
        {file}
      </span>
      {!video ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/case/inspirit-dna/${file}`}
          alt={file}
          loading="lazy"
          draggable={false}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
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

/** The design's section eyebrow: a 4px gold bar then a purple label. */
function EyebrowRow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="h-[16px] w-[4px] shrink-0" style={{ background: GOLD }} />
      <p
        className={`text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] ${onDark ? "text-[#a79bf2]" : ""}`}
        style={{ ...BODY, color: onDark ? undefined : PURPLE }}
      >
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
        <EyebrowRow onDark={onDark}>{eyebrow}</EyebrowRow>
        <h2
          className={`mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] md:text-[38px] ${onDark ? "text-[#f1f0fa]" : ""}`}
          style={{ ...DISPLAY, color: onDark ? undefined : INK }}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className={`max-w-[340px] text-right text-[14px] leading-[1.5] ${onDark ? "text-[#b5b3d2]" : ""}`}
          style={{ ...BODY, color: onDark ? undefined : MUTED }}
        >
          {note}
        </motion.p>
      )}
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
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(to right, #2a3590, #4e2a7a)" }}
    >
      <motion.div
        variants={group}
        initial="hidden"
        // The hero is above the fold, so it animates on load rather than on
        // scroll. It stays hidden until the preloader releases, otherwise it
        // would play out unseen behind the gate.
        animate={stage === "loading" ? "hidden" : "visible"}
        className={`${CONTENT} ${GUTTER} relative flex flex-col items-start gap-12 pb-[72px] pt-[72px] lg:h-[731px] lg:pb-0`}
      >
        {/* Hero copy */}
        <div className="flex w-full max-w-[520px] flex-col gap-[34px] lg:pt-[104px]">
          <motion.div variants={item} className="flex flex-col gap-[18px]">
            <p className="text-[13px] font-semibold leading-[1.5] text-[#fbb424]" style={BODY}>
              <span className="text-white">{HERO.eyebrowLead}</span>
              {HERO.eyebrowRest}
            </p>
            <h1
              className="text-[34px] font-semibold leading-[1.06] tracking-[-1.08px] text-[#f1f0fa] md:text-[54px]"
              style={DISPLAY}
            >
              {HERO.headline}
            </h1>
            <p className="w-full max-w-[500px] text-[18px] leading-[1.5] text-[#c7c5e2]" style={BODY}>
              {HERO.support}
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-[2px] border-l-[3px] border-[#fbb424] pl-4">
            <p className="text-[16px] leading-[1.5] text-[#c7c5e2]" style={BODY}>
              <span className="font-semibold text-[#f1f0fa]">{HERO.role}</span>
              {HERO.roleRest}
            </p>
            <p className="max-w-[500px] text-[14px] leading-[1.5] text-[#9896ba]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>

          <motion.a
            variants={item}
            href="#journey"
            className="case-cta flex h-[46px] w-fit items-center justify-center rounded-[999px] bg-[#fbb424] px-[22px] text-[15px] font-semibold leading-[1.5] text-[#1b1a33]"
            style={BODY}
          >
            {HERO.cta}
          </motion.a>
        </div>

        {/* Cover slot — the design's hero figure, right-bleeding past the
            content edge on desktop; it stacks under the copy below `lg`. */}
        <motion.figure
          variants={item}
          className="w-full max-w-[600px] lg:absolute lg:left-[760px] lg:top-[140px] lg:w-[600px] lg:max-w-none"
        >
          <FigSlot file={HERO.coverFigure} height="h-[300px] lg:h-[450px]" tone="dark" />
        </motion.figure>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- facts ---------------------------------- */

function Facts() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className="w-full" style={{ background: NIGHT }}>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className={`${CONTENT} ${GUTTER} flex flex-col md:flex-row`}
      >
        {FACTS.map((f, i) => (
          <motion.div
            variants={item}
            key={f.label}
            className={`flex flex-1 items-start gap-3 pb-6 pt-[22px] md:px-5 ${i > 0 ? "border-t border-[#2c2b5c] md:border-l md:border-t-0" : "pr-5"}`}
          >
            <Icon name={f.icon} size={20} />
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] tracking-[0.44px] text-[#9896ba]" style={BODY}>
                {f.label.toUpperCase()}
              </p>
              <p className="max-w-[207px] text-[15px] font-semibold leading-[1.5] text-[#f1f0fa]" style={BODY}>
                {f.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------------------------- brief ----------------------------------- */

function Brief() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-4 lg:flex-row">
        <motion.div
          variants={item}
          className="flex w-full flex-col gap-[14px] rounded-[20px] px-[30px] pb-[30px] pt-[28px] lg:w-[560px] lg:h-[345px]"
          style={{ background: DUSK }}
        >
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#fbb424]" style={BODY}>
            {BRIEF.cardLabel}
          </p>
          <p className="max-w-[500px] text-[19px] font-medium leading-[1.5] text-[#f1f0fa]" style={BODY}>
            {BRIEF.cardLead}
          </p>
          <p className="max-w-[500px] text-[15px] leading-[1.5] text-[#b5b3d2]" style={BODY}>
            {BRIEF.cardBody}
          </p>
        </motion.div>

        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[460px]">
          <FigSlot file={BRIEF.figure} height="h-[240px] lg:h-[345px]" />
          <FigCaption>{BRIEF.figureCaption}</FigCaption>
        </motion.figure>
      </motion.div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-5 grid gap-4 lg:grid-cols-2">
        {BRIEF.slides.map((s) => (
          <motion.figure variants={item} key={s.file} className="flex w-full flex-col gap-2">
            <FigSlot file={s.file} height="h-[240px] lg:h-[383px]" />
            <FigCaption>{s.caption}</FigCaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- process ---------------------------------- */

function Process() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={PROCESS.eyebrow} heading={PROCESS.heading} headingWidth="max-w-[760px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid grid-cols-2 gap-[10px] sm:grid-cols-3 lg:grid-cols-6">
        {PROCESS.stages.map((s) => (
          <motion.div
            variants={item}
            key={s.n}
            className="flex flex-col items-center gap-[10px] rounded-[16px] bg-white px-[10px] pb-5 pt-[18px] text-center"
          >
            <div
              className="flex size-[48px] shrink-0 items-center justify-center rounded-[999px]"
              style={{ background: STAGE_PURPLE, border: `2px solid ${STAGE_PURPLE}` }}
            >
              <p className="text-[18px] font-bold leading-none text-white" style={BODY}>
                {s.n}
              </p>
            </div>
            <p className="text-[16px] font-semibold leading-[1.5] text-[#1b1a33]" style={BODY}>
              {s.title}
            </p>
            <p className="text-[12px] leading-[1.4] text-[#5c5b70]" style={BODY}>
              {s.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={12} className="mt-5 flex flex-wrap items-center gap-[10px]">
        <p className="text-[11px] font-bold leading-[1.5] tracking-[1.1px] text-[#5c5b70]" style={BODY}>
          {PROCESS.goalsLabel}
        </p>
        {PROCESS.goals.map((g) => (
          <span
            key={g}
            className="rounded-[999px] px-[14px] py-2 text-[14px] font-semibold leading-[1.5]"
            style={{ ...BODY, background: GOAL_BG, color: GOAL_TEXT }}
          >
            {g}
          </span>
        ))}
      </Reveal>
    </section>
  );
}

/* --------------------------------- research --------------------------------- */

function Research() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead
        eyebrow={RESEARCH.eyebrow}
        heading={RESEARCH.heading}
        note={RESEARCH.note}
        headingWidth="max-w-[600px]"
      />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {RESEARCH.facts.map((f) => (
          <motion.div
            variants={item}
            key={f.title}
            className="flex flex-col gap-2 rounded-[16px] bg-white px-5 pb-[22px] pt-5"
            style={{ borderTop: `4px solid ${f.accent}` }}
          >
            <p className="text-[20px] font-bold leading-[1.5] text-[#1b1a33]" style={BODY}>
              {f.title}
            </p>
            <p className="max-w-[210px] text-[13px] leading-[1.5] text-[#5c5b70]" style={BODY}>
              {f.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-5 grid gap-4 sm:grid-cols-3">
        {RESEARCH.slides.map((s) => (
          <motion.figure variants={item} key={s.file} className="flex w-full flex-col gap-2">
            <FigSlot file={s.file} height="h-[240px] lg:h-[251px]" />
            <FigCaption>{s.caption}</FigCaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

/* ----------------------------------- tech ----------------------------------- */

function Tech() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={TECH.eyebrow} heading={TECH.heading} note={TECH.note} headingWidth="max-w-[600px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 lg:grid-cols-3">
        {TECH.cards.map((c) => (
          <motion.div variants={item} key={c.title} className="flex items-start gap-4 rounded-[18px] bg-white px-6 pb-6 pt-[22px]">
            <div className="flex size-[46px] shrink-0 items-center justify-center rounded-[12px]" style={{ background: TILE }}>
              <Icon name={c.icon} size={22} />
            </div>
            <div className="flex flex-col gap-[6px]">
              <p className="text-[18px] font-semibold leading-[1.5] text-[#1b1a33]" style={BODY}>
                {c.title}
              </p>
              <p className="max-w-[226px] text-[13px] leading-[1.5] text-[#5c5b70]" style={BODY}>
                {c.body}
              </p>
            </div>
          </motion.div>
        ))}
        <motion.div variants={item} className="flex flex-col gap-[10px] rounded-[18px] px-6 pb-6 pt-[22px]" style={{ background: DUSK }}>
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#fbb424]" style={BODY}>
            {TECH.software.label}
          </p>
          {TECH.software.rows.map((r) => (
            <p key={r} className="text-[15px] font-medium leading-[1.5] text-[#f1f0fa]" style={BODY}>
              {r}
            </p>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-5 flex flex-col gap-4 lg:flex-row">
        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[620px]">
          <FigSlot file={TECH.slides[0].file} height="h-[300px] lg:h-[465px]" />
          <FigCaption>{TECH.slides[0].caption}</FigCaption>
        </motion.figure>
        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[400px]">
          <FigSlot file={TECH.slides[1].file} height="h-[240px] lg:h-[300px]" />
          <FigCaption>{TECH.slides[1].caption}</FigCaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}

/* -------------------------------- storyboard --------------------------------- */

function Storyboard() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  const colWidths = ["w-[330px]", "w-[220px]", "w-[200px]", "w-[246px]"];
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead
        eyebrow={STORYBOARD.eyebrow}
        heading={STORYBOARD.heading}
        note={STORYBOARD.note}
        headingWidth="max-w-[600px]"
      />

      <Reveal distance={20}>
        <div className="overflow-x-auto rounded-[18px] bg-white px-5 py-[10px]">
          <div className="min-w-[996px]">
            <div className="flex items-start border-b" style={{ borderColor: TABLE_LINE }}>
              {STORYBOARD.columns.map((c, i) => (
                <div key={c} className={`shrink-0 px-3 py-[14px] ${colWidths[i]}`}>
                  <p className="text-[15px] font-bold leading-[1.45] text-[#4f3fa0]" style={BODY}>
                    {c}
                  </p>
                </div>
              ))}
            </div>
            {STORYBOARD.rows.map((row, ri) => (
              <div
                key={ri}
                className={`flex items-start ${ri < STORYBOARD.rows.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: TABLE_LINE }}
              >
                {row.cells.map((cell, ci) => (
                  <div key={ci} className={`shrink-0 px-3 py-[14px] ${colWidths[ci]}`}>
                    <p className="text-[13px] leading-[1.45] text-[#1b1a33]" style={BODY}>
                      {cell || "\u200b"}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-5 flex flex-col gap-4 lg:flex-row">
        {STORYBOARD.screens.map((s) => (
          <motion.figure variants={item} key={s.file} className="flex w-full flex-col gap-2 lg:w-[510px]">
            <FigSlot file={s.file} height={s.tall ? "h-[300px] lg:h-[383px]" : "h-[300px] lg:h-[318px]"} />
            <FigCaption>{s.caption}</FigCaption>
          </motion.figure>
        ))}
      </motion.div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-5 grid gap-4 sm:grid-cols-3">
        {STORYBOARD.pages.map((p) => (
          <motion.figure variants={item} key={p.file} className="flex w-full flex-col gap-2">
            <FigSlot file={p.file} height="h-[240px] lg:h-[251px]" />
            <FigCaption>{p.caption}</FigCaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------------------------------- modes ----------------------------------- */

function Modes() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={MODES.eyebrow} heading={MODES.heading} headingWidth="max-w-[760px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 lg:grid-cols-2">
        <motion.div variants={item} className="flex items-start gap-[18px] rounded-[20px] bg-white px-[26px] pb-[26px] pt-6">
          <div className="flex size-[56px] shrink-0 items-center justify-center rounded-[999px]" style={{ background: "#e6e3f7" }}>
            <Icon name={MODES.explore.icon} size={24} />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[24px] font-semibold leading-[1.5] text-[#1b1a33]" style={BODY}>
              {MODES.explore.title}
            </p>
            <p className="max-w-[380px] text-[15px] leading-[1.55] text-[#5c5b70]" style={BODY}>
              {MODES.explore.body}
            </p>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex items-start gap-[18px] rounded-[20px] px-[26px] pb-[26px] pt-6" style={{ background: DUSK }}>
          <div className="flex size-[56px] shrink-0 items-center justify-center rounded-[999px]" style={{ background: DARK_SLOT }}>
            <Icon name={MODES.construct.icon} size={24} />
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="text-[24px] font-semibold leading-[1.5] text-[#f1f0fa]" style={BODY}>
              {MODES.construct.title}
            </p>
            <p className="max-w-[380px] text-[15px] leading-[1.55] text-[#b5b3d2]" style={BODY}>
              {MODES.construct.body}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <Reveal distance={20} className="mt-5">
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={MODES.scenes.file} height="h-[380px] lg:h-[777px]" />
          <FigCaption>{MODES.scenes.caption}</FigCaption>
        </figure>
      </Reveal>

      <Reveal distance={12} className="mt-7">
        <EyebrowRow>{MODES.microLabel}</EyebrowRow>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="mt-3 flex flex-col gap-4 lg:flex-row">
        {MODES.micro.map((m) => (
          <motion.figure variants={item} key={m.file} className="flex w-full flex-col gap-2 lg:w-[510px]">
            <FigSlot file={m.file} height="h-[300px] lg:h-[383px]" />
            <FigCaption>{m.caption}</FigCaption>
          </motion.figure>
        ))}
      </motion.div>

      <Reveal distance={20} className="mt-5">
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={MODES.script.file} height="h-[380px] lg:h-[777px]" />
          <FigCaption>{MODES.script.caption}</FigCaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* ----------------------------------- build ---------------------------------- */

function Build() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  return (
    <section className="w-full pt-24">
      <div className="w-full" style={{ background: DUSK }}>
        <div className={`${CONTENT} ${GUTTER} py-24`}>
          <SectionHead
            eyebrow={BUILD.eyebrow}
            heading={BUILD.heading}
            note={BUILD.note}
            onDark
            headingWidth="max-w-[600px]"
          />

          <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-4 lg:flex-row">
            {BUILD.row.map((f) => (
              <motion.figure variants={item} key={f.file} className="flex w-full flex-col gap-2 lg:w-[510px]">
                <FigSlot file={f.file} height="h-[300px] lg:h-[383px]" tone="dark" />
                <FigCaption onDark>{f.caption}</FigCaption>
              </motion.figure>
            ))}
          </motion.div>

          <Reveal distance={20} className="mt-5">
            <figure className="flex w-full flex-col gap-2">
              <FigSlot file={BUILD.big.file} height="h-[380px] lg:h-[777px]" tone="dark" />
              <FigCaption onDark>{BUILD.big.caption}</FigCaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- journey ---------------------------------- */

function Journey() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.06 });
  return (
    <section id="journey" className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead
        eyebrow={JOURNEY.eyebrow}
        heading={JOURNEY.heading}
        note={JOURNEY.note}
        headingWidth="max-w-[600px]"
      />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-6">
        {Array.from({ length: JOURNEY.scenes.length / 2 }, (_, rowIndex) => (
          <div key={rowIndex} className="grid gap-4 lg:grid-cols-2">
            {JOURNEY.scenes.slice(rowIndex * 2, rowIndex * 2 + 2).map((s) => (
              <motion.figure variants={item} key={s.file} className="flex w-full flex-col gap-2">
                <FigSlot file={s.file} height="h-[300px] lg:h-[383px]" />
                <FigCaption>{s.caption}</FigCaption>
              </motion.figure>
            ))}
          </div>
        ))}

        <div className="grid gap-4 sm:grid-cols-3">
          {JOURNEY.renders.map((r) => (
            <motion.figure variants={item} key={r.file} className="flex w-full flex-col gap-2">
              <FigSlot file={r.file} height="h-[240px] lg:h-[251px]" />
              <FigCaption>{r.caption}</FigCaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------- assessment -------------------------------- */

function Assessment() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section id="assessment" className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={ASSESSMENT.eyebrow} heading={ASSESSMENT.heading} headingWidth="max-w-[760px]" />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <motion.figure variants={item} className="flex w-full flex-col gap-2 lg:w-[520px]">
          <FigSlot file={ASSESSMENT.quiz.file} height="h-[240px] lg:h-[221px]" />
          <FigCaption>{ASSESSMENT.quiz.caption}</FigCaption>
        </motion.figure>

        <div className="flex flex-col gap-3 lg:w-[500px]">
          {ASSESSMENT.notes.map((n) => (
            <motion.div
              variants={item}
              key={n.title}
              className="flex flex-col gap-1 rounded-[14px] border-l-[3px] border-[#fbb424] bg-white px-[18px] pb-4 pt-[14px]"
            >
              <p className="text-[16px] font-semibold leading-[1.5] text-[#1b1a33]" style={BODY}>
                {n.title}
              </p>
              <p className="max-w-[460px] text-[13px] leading-[1.5] text-[#5c5b70]" style={BODY}>
                {n.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Reveal distance={20} className="mt-4">
        <figure className="flex w-full flex-col gap-2">
          <FigSlot file={ASSESSMENT.score.file} height="h-[300px] lg:h-[463px]" />
          <FigCaption>{ASSESSMENT.score.caption}</FigCaption>
        </figure>
      </Reveal>

      <Reveal distance={20} className="mt-6">
        <figure className="flex w-full flex-col gap-2">
          {/* The design's video slot: five-minute walkthrough, poster until play. */}
          <video
            controls
            preload="metadata"
            poster="/case/inspirit-dna/dn-video-poster.jpg"
            src="/case/inspirit-dna/dn-video-walkthrough.mp4"
            className="h-[380px] w-full rounded-[14px] bg-[#e3e3ea] object-cover lg:h-[448px]"
          />
          <FigCaption>{ASSESSMENT.video.caption}</FigCaption>
        </figure>
      </Reveal>

      <Reveal distance={14} className="mt-7 flex flex-col gap-10 sm:flex-row sm:gap-[40px]">
        {ASSESSMENT.mentors.map((m) => (
          <div key={m.label} className="flex flex-col gap-1">
            <p className="text-[11px] font-bold tracking-[1.1px] text-[#5c5b70]" style={BODY}>
              {m.label}
            </p>
            <p className="text-[15px] font-medium leading-[1.5] text-[#1b1a33]" style={BODY}>
              {m.value}
            </p>
          </div>
        ))}
      </Reveal>

      <Reveal distance={0} className="pt-[22px]">
        <p className="w-full max-w-[1036px] text-[12px] leading-[1.5] text-[#5c5b70]" style={BODY}>
          {ASSESSMENT.note}
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------ more projects ------------------------------- */

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  // Some neighbor cases have no exported cover yet; a missing bitmap falls
  // back to the labelled tile rather than a broken image.
  const [brokenThumbs, setBrokenThumbs] = useState<Set<string>>(new Set());
  return (
    <section className={`${CONTENT} ${GUTTER} flex flex-col gap-[18px] pb-[90px] pt-[110px]`}>
      <div className="flex w-full items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5c5b70]" style={BODY}>
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
                <p className="text-[12px] leading-[1.5] text-[#5c5b70]" style={BODY}>
                  {c.kicker}
                </p>
                <p className="text-[22px] font-semibold leading-[1.2] text-[#1b1a33]" style={DISPLAY}>
                  {c.title}
                </p>
                <p className="max-w-[300px] text-[14px] leading-[1.5] text-[#5c5b70]" style={BODY}>
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

/* ---------------------------------- footer ---------------------------------- */

function Footer() {
  return (
    <footer id="contact" className="w-full" style={{ background: DUSK }}>
      <div className={`${CONTENT} ${GUTTER} flex flex-col gap-8 pb-16 pt-14 md:flex-row md:items-center md:justify-between`}>
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-semibold leading-[1.15] text-[#f1f0fa]" style={DISPLAY}>
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

export default function InspiritDnaCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Brief />
      <Process />
      <Research />
      <Tech />
      <Storyboard />
      <Modes />
      <Build />
      <Journey />
      <Assessment />
      <MoreProjects />
      <Footer />
    </main>
  );
}
