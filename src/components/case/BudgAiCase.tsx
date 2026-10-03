"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  EVOLUTION,
  FACTS,
  FIDELITY,
  FINAL,
  FLOWS,
  HERO,
  JOURNEY,
  MORE_PROJECTS,
  NEXT_STEPS,
  PERSONAS,
  PROBLEM,
  TRUST,
} from "@/data/budgai";
import { EASE_OUT, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

/* ---------------------------------- tokens ---------------------------------
   Sampled directly from the Figma frame (node 406:217). This case study has
   its own palette — deep teal and amber over a cool sage paper — so it does
   not use the shared case-theme tokens. */

const PAPER = "#f1f4f2";
const INK = "#0e2a30";
const MUTED = "#4e6166";
const TEAL = "#0f5c5a";
const AMBER = "#e3a13a";
const BAND = "#0a1f23";
const SCREEN = "#1e4a50";
const BEZEL = "#061517";
const FRAME = "#e2e9e6";
const ON_DARK = "#f1f6f4";
const ON_DARK_2 = "#c3d4d0";
const ON_DARK_3 = "#b9d3cf";
const ON_DARK_4 = "#8fa7a4";
const ON_DARK_5 = "#afc3bf";
const TINT = "#e1ece8";
const WHITE = "#ffffff";
const CREAM = "#fff4e0";

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
        // Both states restate the resting transform on purpose.
        // `useMotionPref` resolves only after mount, so an
        // early render can already have set translateY(20px). Framer interpolates
        // only declared keys, so without this the hero would stay 20px low for
        // reduced-motion visitors. Naming the key animates the stale value away.
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
      src={`/case/budgai/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className="select-none"
    />
  );
}

/** A phone bezel exactly as the design draws it: dark glass, deep-teal tile. */
function PhoneFrame({
  width,
  height,
  screen,
  className = "",
  children,
  dark = true,
}: {
  width: number;
  height: number;
  screen?: string;
  className?: string;
  children?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center overflow-hidden rounded-[34px] border-[7px] px-[6px] ${className}`}
      style={{
        background: children ? undefined : dark ? SCREEN : FRAME,
        borderColor: dark ? BEZEL : "#e6ebe8",
        height,
        width,
        boxShadow: dark ? "0 24px 50px rgba(0,0,0,0.45)" : undefined,
      }}
    >
      {children ?? (
        <span
          aria-hidden
          className={`px-2 text-center text-[10px] leading-[1.4] ${dark ? ON_DARK_3 : MUTED}`}
          style={BODY}
        >
          Drop image
          <br />
          {screen}
        </span>
      )}
    </div>
  );
}

/**
 * Drop-frame figure — the design's export slots, reproduced exactly: tone,
 * radius, caption; a real export drops in by passing `src`.
 */
function Figure({
  file,
  caption,
  height,
  radius = "rounded-[14px]",
  onDark = false,
  src,
  variants,
}: {
  file: string;
  caption?: string;
  height: string;
  radius?: string;
  onDark?: boolean;
  src?: string;
  /** Set when the figure sits inside a staggered group, so it inherits timing. */
  variants?: Variants;
}) {
  const frame = (
    <div
      className={`flex w-full flex-col items-center justify-center overflow-hidden px-2 ${radius} ${height}`}
      style={{ background: onDark ? SCREEN : FRAME }}
      data-file={file}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={caption ?? file}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          aria-hidden
          className={`px-2 text-center text-[10px] leading-[1.4] ${onDark ? ON_DARK_3 : MUTED}`}
          style={BODY}
        >
          Drop image
          <br />
          {file}
        </span>
      )}
    </div>
  );

  const label = caption ? (
    <figcaption
      className={`text-[13px] leading-[1.5] ${onDark ? ON_DARK_5 : MUTED}`}
      style={BODY}
    >
      {caption}
    </figcaption>
  ) : null;

  if (variants) {
    return (
      <motion.figure variants={variants} className="flex w-full flex-col gap-2">
        {frame}
        {label}
      </motion.figure>
    );
  }

  return (
    <Reveal distance={20}>
      <figure className="flex w-full flex-col gap-2">
        {frame}
        {label}
      </figure>
    </Reveal>
  );
}

function SectionHead({
  eyebrow,
  heading,
  note,
  onDark = false,
}: {
  eyebrow: string;
  heading: string;
  note?: string;
  onDark?: boolean;
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
      <motion.div variants={item} className="max-w-[820px]">
        <p
          className="text-[11px] font-bold uppercase tracking-[1.32px]"
          style={{ ...BODY, color: onDark ? ON_DARK_3 : TEAL }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] md:text-[38px]"
          style={{ ...DISPLAY, color: onDark ? ON_DARK : INK }}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: onDark ? ON_DARK_5 : MUTED }}
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
      style={{ background: PAPER }}
    >
      <Link href="/" className="shrink-0 text-[16px] font-semibold leading-[1.5] text-[#0e2a30]" style={BODY}>
        Neha Mayacharya
      </Link>
      {/* Desktop row + a mobile-only contact pill: the links row is 300px
          wide by itself, so at phone widths it must not render at all. */}
      <div className="hidden items-center gap-[30px] md:flex">
        <Link
          href="/projects"
          aria-current="page"
          className="border-b-[1.5px] border-[#0e2a30] pb-[3px] text-[14px] font-normal leading-[1.5] text-[#0e2a30]"
          style={BODY}
        >
          Work
        </Link>
        <Link href="/about" className="case-link text-[14px] leading-[1.5] text-[#0e2a30]" style={BODY}>
          About
        </Link>
        <a target="_blank" rel="noreferrer" href="/resume.pdf" className="case-link text-[14px] leading-[1.5] text-[#0e2a30]" style={BODY}>
          Résumé (PDF)
        </a>
        <a
          href="#contact"
          className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#0e2a30] px-5 text-[14px] font-semibold leading-[1.5] text-white"
          style={BODY}
        >
          Contact
        </a>
      </div>
      <a
        href="#contact"
        className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#0e2a30] px-5 text-[14px] font-semibold leading-[1.5] text-white md:hidden"
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
    <section className="relative overflow-hidden bg-[#0e2a30]">
      {/* Teal glow — a Figma asset, right-bleed behind the copy. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/case/budgai/teal-glow.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute -top-5 left-[51%] hidden h-[760px] w-[760px] select-none lg:block"
      />

      <motion.div
        variants={group}
        initial="hidden"
        // The hero is above the fold, so it animates on load rather than on
        // scroll. It stays hidden until the preloader releases, otherwise it
        // would play out unseen behind the gate.
        animate={stage === "loading" ? "hidden" : "visible"}
        className={`${CONTENT} ${GUTTER} relative flex flex-col items-start gap-12 pb-[72px] pt-[72px] lg:h-[731px] lg:flex-row lg:items-start lg:justify-between lg:pb-0`}
      >
        {/* Hero copy */}
        <div className="flex w-full max-w-[540px] flex-col gap-[34px] lg:pt-[104px]">
          <motion.div variants={item} className="flex flex-col gap-[18px]">
            <p className="text-[13px] font-semibold leading-[1.5] text-[#b9d3cf]" style={BODY}>
              <span className="text-white">{HERO.eyebrowLead}</span>
              {HERO.eyebrowRest}
            </p>
            <h1
              className="text-[36px] font-semibold leading-[1.04] tracking-[-1.16px] text-[#f1f6f4] md:text-[58px]"
              style={DISPLAY}
            >
              {HERO.headline}
            </h1>
            <p className="max-w-[520px] text-[18px] leading-[1.5]" style={{ ...BODY, color: ON_DARK_2 }}>
              {HERO.support}
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-col gap-[2px] border-l-[3px] border-[#e3a13a] pl-4"
          >
            <p className="text-[16px] font-semibold leading-[1.5] text-[#f1f6f4]" style={BODY}>
              {HERO.role}
              <span className="font-normal">{HERO.roleRest}</span>
            </p>
            <p className="max-w-[520px] text-[14px] leading-[1.5]" style={{ ...BODY, color: ON_DARK_4 }}>
              {HERO.roleNote}
            </p>
          </motion.div>

          <motion.a
            variants={item}
            href={NEXT_STEPS.prototypeHref}
            target="_blank"
            rel="noreferrer"
            className="case-cta flex h-[46px] items-center justify-center rounded-[999px] bg-[#e3a13a] px-[22px] text-[15px] font-semibold leading-[1.5] text-[#0e2a30]"
            style={BODY}
          >
            {HERO.cta}
          </motion.a>
        </div>

        {/* Phone pair — the design's two hero slots, filled with the real
            app screens exported from the presentation deck. */}
        <motion.div
          variants={item}
          className="relative hidden h-[640px] shrink-0 lg:block"
          style={{ width: 470, marginLeft: "auto", marginRight: -112 }}
        >
          <PhoneFrame width={260} height={563} screen="cb-hi-home.png" className="absolute left-0 top-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case/budgai/cb-hi-home.png"
              alt={HERO.phones[0].alt}
              draggable={false}
              className="h-full w-full rounded-[27px] object-cover object-top"
            />
          </PhoneFrame>
          <PhoneFrame width={230} height={498} screen="cb-hi-global.png" className="absolute right-0 top-[50px] z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case/budgai/cb-hi-global.png"
              alt={HERO.phones[1].alt}
              draggable={false}
              className="h-full w-full rounded-[27px] object-cover object-top"
            />
          </PhoneFrame>
        </motion.div>

        {/* Mobile: the same two phones, stacked side by side under the copy. */}
        <motion.div variants={item} className="flex w-full items-start justify-center gap-4 lg:hidden">
          <PhoneFrame width={230} height={498} screen="cb-hi-home.png" className="max-w-[46%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case/budgai/cb-hi-home.png"
              alt={HERO.phones[0].alt}
              draggable={false}
              className="h-full w-full rounded-[24px] object-cover object-top"
            />
          </PhoneFrame>
          <PhoneFrame width={204} height={442} screen="cb-hi-global.png" className="mt-6 max-w-[42%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/case/budgai/cb-hi-global.png"
              alt={HERO.phones[1].alt}
              draggable={false}
              className="h-full w-full rounded-[24px] object-cover object-top"
            />
          </PhoneFrame>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- facts ---------------------------------- */

function Facts() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className="w-full" style={{ background: BAND }}>
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
            className={`flex flex-1 items-start gap-3 pb-6 pt-[22px] md:px-5 ${i > 0 ? "border-t border-[#1b3a40] md:border-l md:border-t-0" : "pr-5"}`}
          >
            <Icon name={f.icon} size={20} />
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] tracking-[0.44px]" style={{ ...BODY, color: ON_DARK_4 }}>
                {f.label.toUpperCase()}
              </p>
              <p className="max-w-[210px] text-[15px] font-semibold leading-[1.5] text-[#f1f6f4]" style={BODY}>
                {f.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- problem --------------------------------- */

function Problem() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={PROBLEM.eyebrow} heading={PROBLEM.heading} />

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 lg:grid-cols-[460px_1fr]"
      >
        <motion.div
          variants={item}
          className="flex flex-col gap-3 rounded-[20px] bg-[#0e2a30] px-[30px] pb-[30px] pt-7 min-h-[207px] justify-start"
        >
          <p className="text-[11px] font-bold uppercase tracking-[1.32px] text-[#e3a13a]" style={BODY}>
            {PROBLEM.cardEyebrow}
          </p>
          <p className="max-w-[400px] text-[17px] font-medium leading-[1.45] text-[#f1f6f4] md:text-[21px]" style={BODY}>
            {PROBLEM.card}
          </p>
        </motion.div>

        <div className="flex flex-col gap-[10px]">
          <p className="text-[11px] font-bold uppercase tracking-[1.32px] text-[#0f5c5a]" style={BODY}>
            {PROBLEM.goalsEyebrow}
          </p>
          {PROBLEM.goals.map((g) => (
            <motion.div
              variants={item}
              key={g.title}
              className="flex items-center gap-[14px] rounded-[14px] bg-white px-[18px] py-[14px]"
            >
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-[10px]"
                style={{ background: TINT }}
              >
                <Icon name={g.icon} size={20} />
              </div>
              <p className="text-[14px] font-semibold leading-[1.5] text-[#0e2a30] md:text-[16px]" style={BODY}>
                {g.title}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* --------------------------------- evolution -------------------------------- */

function Evolution() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={EVOLUTION.eyebrow} heading={EVOLUTION.heading} />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {EVOLUTION.shifts.map((s) => (
          <motion.div variants={item} key={s.to} className="flex flex-col gap-2 rounded-[16px] bg-white px-5 pb-[22px] pt-5">
            <p className="text-[18px] font-semibold leading-[1.5]" style={DISPLAY}>
              <span className="text-[#4e6166]">{s.from}</span>
              <span> → </span>
              <span className="text-[#0f5c5a]">{s.to}</span>
            </p>
            <p className="max-w-[210px] text-[13px] leading-[1.5] text-[#4e6166]" style={BODY}>
              {s.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-5 grid gap-[14px] lg:grid-cols-[520px_158px_158px_158px]">
        {EVOLUTION.figures2024.map((f, i) => (
          <Figure
            key={f.file}
            file={f.file}
            src={f.src}
            height={i === 0 ? "h-[200px] lg:h-[293px]" : "h-[220px] lg:h-[281px]"}
            radius={i === 0 ? "rounded-[14px]" : "rounded-[12px]"}
            variants={item}
          />
        ))}
      </div>
      <p className="mt-2 text-[13px] leading-[1.5] text-[#4e6166]" style={BODY}>
        {EVOLUTION.figure2024Caption}
      </p>
    </section>
  );
}

/* --------------------------------- personas -------------------------------- */

function Personas() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={PERSONAS.eyebrow} heading={PERSONAS.heading} />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-3">
        {PERSONAS.people.map((p) => {
          const dark = p.tone === "dark";
          return (
            <motion.div
              variants={item}
              key={p.name}
              className={`flex flex-col gap-[10px] rounded-[18px] px-6 pb-6 pt-[22px] ${dark ? "bg-[#0e2a30]" : "bg-white"}`}
            >
              <div
                className={`flex h-[120px] w-full items-center justify-center overflow-hidden rounded-[10px] px-2 md:h-[161px] ${dark ? "" : "bg-[#e2e9e6]"}`}
                style={dark ? { background: SCREEN } : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "objectPosition" in p ? p.objectPosition : "center" }}
                />
              </div>
              <p className={`text-[20px] font-semibold leading-[1.5] ${dark ? "text-[#f1f6f4]" : "text-[#0e2a30]"}`} style={DISPLAY}>
                {p.name}
              </p>
              <p className={`text-[12px] font-semibold tracking-[0.48px] ${dark ? "text-[#e3a13a]" : "text-[#0f5c5a]"}`} style={BODY}>
                {p.meta}
              </p>
              <p className={`text-[15px] font-medium leading-[1.45] ${dark ? "text-[#f1f6f4]" : "text-[#0e2a30]"}`} style={BODY}>
                {p.quote}
              </p>
              <p className={`text-[13px] leading-[1.5] ${dark ? "text-[#afc3bf]" : "text-[#4e6166]"}`} style={BODY}>
                {p.body}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ---------------------------------- journey --------------------------------- */

function Journey() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.05 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={JOURNEY.eyebrow} heading={JOURNEY.heading} />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-[10px] sm:grid-cols-3 lg:grid-cols-6">
        {JOURNEY.stages.map((s) => (
          <motion.div variants={item} key={s.n} className="flex flex-col gap-2 rounded-[16px] bg-white px-4 py-[18px]">
            <p className="text-[22px] font-bold leading-none text-[#0f5c5a]" style={BODY}>
              {s.n}
            </p>
            <p className="text-[15px] font-semibold leading-[1.5] text-[#0e2a30]" style={BODY}>
              {s.title}
            </p>
            <p className="text-[13px] leading-[1.4] text-[#4e6166]" style={BODY}>
              {s.quote}
            </p>
            <div className="mt-auto flex flex-col gap-1 border-t border-[#dce4e0] pt-2">
              <p className="text-[9px] font-bold tracking-[0.9px] text-[#e3a13a]" style={BODY}>
                {JOURNEY.brandTag}
              </p>
              <p className="text-[13px] font-semibold leading-[1.4] text-[#0e2a30]" style={BODY}>
                {s.moment}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-5">
        <Figure file={JOURNEY.mapFigure} caption={JOURNEY.mapFigureCaption} height="h-[340px] lg:h-[583px]" src={JOURNEY.mapSrc} />
      </div>
    </section>
  );
}

/* --------------------------------- flows & IA -------------------------------- */

function FlowsIa() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={FLOWS.eyebrow} heading={FLOWS.heading} note={FLOWS.note} />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-2">
        {FLOWS.figures.map((f) => (
          <Figure key={f.file} file={f.file} caption={f.caption} height="h-[220px] lg:h-[287px]" src={f.src} variants={item} />
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- fidelity --------------------------------- */

function Fidelity() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.08 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24 pb-24`}>
      <SectionHead eyebrow={FIDELITY.eyebrow} heading={FIDELITY.heading} note={FIDELITY.note} />

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col items-center gap-6 lg:grid lg:grid-cols-[250px_70px_250px_70px_250px] lg:items-start"
      >
        {FIDELITY.stages.map((s, i) => (
          <div key={s.file} className="contents">
            <motion.div variants={item} className="flex flex-col gap-2">
              <div
                className="flex w-full flex-col items-center justify-center overflow-hidden rounded-[26px] px-2 h-[420px] lg:h-[541px] lg:w-[250px]"
                style={{ background: s.tone === "dark" ? SCREEN : FRAME }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <p className="text-[11px] font-bold tracking-[1.1px] text-[#0f5c5a]" style={BODY}>
                {s.label}
              </p>
              <p className="max-w-[250px] text-[13px] leading-[1.5] text-[#4e6166]" style={BODY}>
                {s.caption}
              </p>
            </motion.div>
            {i < FIDELITY.stages.length - 1 && (
              <div className="flex items-center justify-center lg:h-[30px] lg:items-start lg:pt-[50px]">
                <div className="rotate-90 lg:rotate-0">
                  <Icon name="icon-arrow" size={22} />
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------- final screens ------------------------------- */

function FinalScreens() {
  const { item } = useStagger({ distance: 16, step: 0.08 });
  return (
    <section className="w-full bg-[#0e2a30]">
      <div className={`${CONTENT} ${GUTTER} py-24`}>
        <SectionHead eyebrow={FINAL.eyebrow} heading={FINAL.heading} note={FINAL.note} onDark />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {FINAL.screens.map((s) => (
            <motion.figure key={`${s.file}:${s.caption}`} variants={item} className="flex w-full flex-col gap-2">
              <div
                className="flex w-full flex-col items-center justify-center overflow-hidden rounded-[24px] px-2 h-[280px] lg:h-[534px]"
                style={{ background: SCREEN }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.caption}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <figcaption className="text-[13px] leading-[1.5] text-[#afc3bf]" style={BODY}>
                {s.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- trust ----------------------------------- */

function Trust() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={TRUST.eyebrow} heading={TRUST.heading} />

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[220px_220px_220px_340px]"
      >
        {TRUST.figures.map((f) => (
          <motion.figure key={f.file} variants={item} className="flex w-full flex-col gap-2">
            <div
              className="flex w-full flex-col items-center justify-center overflow-hidden rounded-[22px] px-2 h-[300px] lg:h-[476px]"
              style={{ background: FRAME }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.src}
                alt={f.caption}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <figcaption className="text-[13px] leading-[1.5] text-[#4e6166]" style={BODY}>
              {f.caption}
            </figcaption>
          </motion.figure>
        ))}

        <motion.div variants={item} className="flex flex-col gap-[10px] sm:col-span-2 lg:col-span-1">
          <p className="text-[11px] font-bold uppercase tracking-[1.32px] text-[#0f5c5a]" style={BODY}>
            {TRUST.principlesEyebrow}
          </p>
          {TRUST.principles.map((p) => (
            <div key={p.title} className="flex items-start gap-3 rounded-[14px] bg-white px-4 py-[14px]">
              <Icon name="icon-check" size={18} />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[15px] font-semibold leading-[1.5] text-[#0e2a30]" style={BODY}>
                  {p.title}
                </p>
                <p className="max-w-[262px] text-[13px] leading-[1.5] text-[#4e6166]" style={BODY}>
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* -------------------------------- next steps --------------------------------- */

function NextSteps() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <SectionHead eyebrow={NEXT_STEPS.eyebrow} heading={NEXT_STEPS.heading} />

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {NEXT_STEPS.steps.map((s) => (
          <motion.div
            variants={item}
            key={s.n}
            className="flex flex-col gap-2 rounded-[16px] px-[22px] pb-[22px] pt-5"
            style={s.lead ? { background: TEAL } : { background: WHITE }}
          >
            <p className="text-[13px] font-bold leading-[1.5]" style={{ ...BODY, color: s.lead ? AMBER : TEAL }}>
              {s.n}
            </p>
            <p className={`text-[18px] font-semibold leading-[1.2] ${s.lead ? "text-white" : "text-[#0e2a30]"}`} style={DISPLAY}>
              {s.title}
            </p>
            <p className={`max-w-[204px] text-[13px] leading-[1.5] ${s.lead ? "text-[#d5e6e3]" : "text-[#4e6166]"}`} style={BODY}>
              {s.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={16} className="mt-4">
        <div
          className="flex flex-col gap-2 rounded-[16px] px-[26px] py-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ background: CREAM }}
        >
          <p className="text-[18px] font-semibold leading-[1.5] text-[#0e2a30]" style={DISPLAY}>
            {NEXT_STEPS.prototypeLabel}
          </p>
          <a
            href={NEXT_STEPS.prototypeHref}
            target="_blank"
            rel="noreferrer"
            className="case-link text-[14px] font-medium leading-[1.5] text-[#0f5c5a]"
            style={BODY}
          >
            {NEXT_STEPS.prototypeText}
          </a>
        </div>
      </Reveal>

      <p className="mt-[22px] max-w-[1036px] text-[12px] leading-[1.5] text-[#4e6166]" style={BODY}>
        {NEXT_STEPS.note}
      </p>
    </section>
  );
}

/* ------------------------------ more projects ------------------------------- */

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  // Some neighbor cases have no exported cover yet (e.g. Focus); a missing
  // bitmap falls back to the labelled tile rather than a broken image.
  const [brokenThumbs, setBrokenThumbs] = useState<Set<string>>(new Set());
  return (
    <section className={`${CONTENT} ${GUTTER} flex flex-col gap-[18px] pb-[90px] pt-[110px]`}>
      <div className="flex w-full items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#4e6166]" style={BODY}>
          {MORE_PROJECTS.label}
        </p>
        <Link
          href="/projects"
          className="case-link border-b-[1.5px] border-[#0e2a30] pb-[2px] text-[14px] font-semibold leading-[1.5] text-[#0e2a30]"
          style={BODY}
        >
          {MORE_PROJECTS.allWork}
        </Link>
      </div>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-[18px] md:grid-cols-2">
        {MORE_PROJECTS.cards.map((c) => (
          <motion.div variants={item} key={c.href} className="h-full">
            <Link
              href={c.href}
              className="case-card group flex h-full w-full items-center gap-5 rounded-[18px] bg-white p-[14px]"
            >
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
                    onError={() =>
                      setBrokenThumbs((prev) => new Set(prev).add(c.href))
                    }
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <span className="absolute bottom-2 left-2 font-mono text-[10px] tracking-[0.12em] text-white/40">
                    [{c.title}]
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] leading-[1.5] text-[#4e6166]" style={BODY}>
                  {c.kicker}
                </p>
                <p className="text-[22px] font-semibold leading-[1.2] text-[#0e2a30]" style={DISPLAY}>
                  {c.title}
                </p>
                <p className="max-w-[300px] text-[14px] leading-[1.5] text-[#4e6166]" style={BODY}>
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
    <footer id="contact" className="w-full bg-[#0e2a30]">
      <div className={`${CONTENT} ${GUTTER} flex flex-col gap-8 pb-16 pt-14 md:flex-row md:items-center md:justify-between`}>
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-semibold leading-[1.15] text-[#f1f6f4]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="case-link pb-[2px] text-[16px] leading-[1.5]"
            style={{ ...BODY, color: ON_DARK_2, borderBottom: `1px solid #2a4a50` }}
          >
            nmayacharya@gmail.com
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-[26px] text-[14px] leading-[1.5] text-[#f1f6f4]" style={BODY}>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="case-link">
            LinkedIn
          </a>
          <a href="https://www.behance.net" target="_blank" rel="noreferrer" className="case-link">
            Behance
          </a>
          <a target="_blank" rel="noreferrer" href="/resume.pdf" className="case-link">
            Résumé (PDF)
          </a>
        </nav>
      </div>
    </footer>
  );
}

/* ----------------------------------- page ----------------------------------- */

export default function BudgAiCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Problem />
      <Evolution />
      <Personas />
      <Journey />
      <FlowsIa />
      <Fidelity />
      <FinalScreens />
      <Trust />
      <NextSteps />
      <MoreProjects />
      <Footer />
    </main>
  );
}
