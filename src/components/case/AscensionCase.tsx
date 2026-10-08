"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  CHALLENGES,
  FACTS,
  FEATURES,
  GOALS,
  HERO,
  MOCKUPS,
  NEIGHBORS,
  RESULTS,
  SCOPE,
  STORYBOARD,
  UX_FLOW,
  WHAT_I_DID,
} from "@/data/ascension";
import { FOOTER_LINKS } from "@/data/landing";
import { EASE_OUT, LineByLine, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";
import { ProjectRuler } from "@/components/ProjectRuler";

/* ---------------------------------- tokens --------------------------------- */

const DARK = "#15131F";
const VIOLET = "#5B47C8";
const LAV = "#B7A8F5";
const PAPER = "#F4F3F8";

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
      src={`/case/ascension/${name}.svg`}
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
}: {
  eyebrow: string;
  heading: string;
  note?: string;
  onDark?: boolean;
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
      <motion.div variants={item} className="max-w-[760px]">
        <p className={`text-[11px] font-bold uppercase tracking-[1.32px] ${onDark ? "text-[#B7A8F5]" : "text-[#5B47C8]"}`} style={BODY}>
          {eyebrow}
        </p>
        <h2
          className={`mt-[14px] text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.38px] ${onDark ? "text-[#F1EFF8]" : "text-[#1A1826]"}`}
          style={DISPLAY}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className={`max-w-[340px] pt-[24px] text-[14px] leading-[1.5] ${onDark ? "text-[#B8B2CB]" : "text-[#625E72]"}`}
          style={BODY}
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
        <Link href="/" className="text-[16px] font-semibold text-[#1A1826]" style={DISPLAY}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#1A1826] pb-[3px] text-[14px] text-[#1A1826]">
            Work
          </Link>
          <Link href="/about" className="text-[14px] text-[#1A1826] transition-opacity duration-200 hover:opacity-70">
            About
          </Link>
          <a target="_blank" rel="noreferrer" href="/resume.pdf" className="text-[14px] text-[#1A1826] transition-opacity duration-200 hover:opacity-70">
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] bg-[#1A1826] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98]"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] bg-[#1A1826] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] md:hidden"
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
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          right: 0,
          top: -28,
          background: "radial-gradient(circle, rgba(183,168,245,0.16) 0%, rgba(183,168,245,0) 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1036px] px-6 pb-[70px] pt-[60px] lg:px-0 lg:pb-16 lg:pt-[42px]">
        <motion.div
          variants={group}
          initial="hidden"
          animate={stage === "loading" ? "hidden" : "visible"}
          className="flex flex-col gap-10 lg:flex-row lg:justify-between"
        >
          <div className="flex max-w-[540px] flex-col">
            <motion.div variants={item} className="flex flex-col items-start gap-[18px]">
              <p className="text-[13px] font-semibold" style={{ ...BODY, color: LAV }}>
                {HERO.eyebrow}
              </p>
              <h1
                className="text-[clamp(40px,4.4vw,62px)] font-semibold leading-[1.04] tracking-[-1.24px] text-[#F1EFF8]"
                style={DISPLAY}
              >
                {HERO.title}
              </h1>
              <p className="max-w-[520px] text-[19px] leading-[1.5] text-[#CBC6DC]" style={BODY}>
                {HERO.subtitle}
              </p>
            </motion.div>
            <motion.div variants={item} className="mt-[36px] border-l-2 pl-[19px]" style={{ borderColor: LAV }}>
              <p className="text-[16px] text-[#CBC6DC]" style={BODY}>
                {HERO.role}
              </p>
              <p className="mt-[2px] text-[14px] text-[#9A94B0]" style={BODY}>
                {HERO.roleNote}
              </p>
            </motion.div>
            <motion.a
              variants={item}
              href={HERO.cta.href}
              className="mt-[36px] inline-flex h-[46px] w-fit items-center rounded-[999px] px-[22px] text-[15px] font-semibold text-[#1A1826] transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] motion-safe:hover:opacity-90"
              style={{ ...BODY, background: PAPER }}
            >
              {HERO.cta.label}
            </motion.a>
          </div>

          {/* Hero media, exactly as designed: phone over the title still */}
          <motion.div
            variants={item}
            aria-hidden
            className="relative hidden shrink-0 lg:block"
            style={{ width: 540, minHeight: 560 }}
          >
            <div className="absolute left-0 top-[20px] h-[340px] w-[560px] overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="eager" fetchPriority="high" src={HERO.media.still.src} alt={HERO.media.still.alt} className="h-full w-full object-cover" draggable={false} />
            </div>
            <div
              className="absolute right-0 top-[120px] h-[440px] w-[210px] overflow-hidden rounded-[30px]"
              style={{ border: "6px solid #0B0A12" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="eager" fetchPriority="high"
                src={HERO.media.phone.src}
                alt={HERO.media.phone.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: "85% center" }}
                draggable={false}
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
    <section data-index="At a glance" data-tone="dark" aria-label="At a glance" style={{ background: "#0F0D18" }}>
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
              style={{ borderLeft: i > 0 ? "1px solid #27233A" : undefined }}
            >
              <Icon name={fact.icon} size={20} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[11px] tracking-[0.44px] text-[#9A94B0]" style={BODY}>
                  {fact.label.toUpperCase()}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#F1EFF8]" style={BODY}>
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

function Scope() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={SCOPE.eyebrow} heading={SCOPE.heading} note={SCOPE.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-3"
      >
        {SCOPE.cards.map((card) => (
          <motion.article
            key={card.title}
            variants={item}
            className="rounded-[18px] bg-white p-6"
          >
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-[#E7E3F8]">
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[16px] text-[17px] font-semibold leading-[1.5] text-[#1A1826]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.5] text-[#625E72]" style={BODY}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function WhatIDid() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={WHAT_I_DID.eyebrow} heading={WHAT_I_DID.heading} note={WHAT_I_DID.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {WHAT_I_DID.cards.map((card) => (
          <motion.article
            key={card.title}
            variants={item}
            className="rounded-[18px] bg-white p-[22px] pb-6"
          >
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-[#E7E3F8]">
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[16px] text-[17px] font-semibold leading-[1.5] text-[#1A1826]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.5] text-[#625E72]" style={BODY}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Goals() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={GOALS.eyebrow} heading={GOALS.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {GOALS.items.map((goal) => (
          <motion.article
            key={goal.num}
            variants={item}
            className="rounded-[18px] bg-white p-[22px] pb-6"
          >
            <p className="text-[22px] font-semibold leading-none" style={{ ...DISPLAY, color: VIOLET }}>
              {goal.num}
            </p>
            <h3 className="mt-[8px] text-[17px] font-semibold leading-[1.5] text-[#1A1826]" style={DISPLAY}>
              {goal.title}
            </h3>
            <p className="mt-[6px] text-[14px] leading-[1.5] text-[#625E72]" style={BODY}>
              {goal.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Storyboard() {
  // Each panel-plus-caption arrives as one unit, so frame and label never
  // separate mid-entrance.
  const panels = useStagger({ distance: 18, step: 0.05 });
  const insights = useStagger({ distance: 14, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={STORYBOARD.eyebrow} heading={STORYBOARD.heading} note={STORYBOARD.note} />
      <motion.div
        variants={panels.group}
        initial="hidden"
        whileInView="visible"
        viewport={panels.viewport}
        className="grid grid-cols-2 gap-x-[12px] gap-y-[18px] sm:grid-cols-3 lg:grid-cols-6"
      >
        {STORYBOARD.panels.map((panel) => (
          <motion.figure key={panel.num} variants={panels.item}>
            <div className="h-[112px] overflow-hidden rounded-[10px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={panel.src} alt={panel.title} className="h-full w-full object-cover" loading="lazy" draggable={false} />
            </div>
            <figcaption className="mt-[6px] flex items-center gap-[6px]">
              <span className="text-[11px] font-bold" style={{ ...BODY, color: VIOLET }}>
                {panel.num}
              </span>
              <span className="truncate text-[12px] font-medium text-[#1A1826]" style={BODY}>
                {panel.title}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
      <motion.div
        variants={insights.group}
        initial="hidden"
        whileInView="visible"
        viewport={insights.viewport}
        className="mt-5 grid gap-4 md:grid-cols-3"
      >
        {STORYBOARD.insights.map((ins) => (
          <motion.div
            key={ins.title}
            variants={insights.item}
            className="rounded-[16px] bg-[#E7E3F8] p-5"
          >
            <p className="text-[16px] font-semibold text-[#1A1826]" style={DISPLAY}>
              {ins.title}
            </p>
            <p className="mt-[6px] text-[14px] leading-[1.45] text-[#1A1826]" style={BODY}>
              {ins.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function UxFlow() {
  // The flow reads left to right, so the stages arrive in order with the
  // arrows between them. Each stage card moves as one unit.
  const stages = useStagger({ distance: 18, step: 0.08 });
  const triggers = useStagger({ distance: 14, step: 0.06 });

  return (
    <section id="flow" className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={UX_FLOW.eyebrow} heading={UX_FLOW.heading} note={UX_FLOW.note} />
      <motion.div
        variants={stages.group}
        initial="hidden"
        whileInView="visible"
        viewport={stages.viewport}
        className="flex flex-col gap-3 lg:flex-row lg:items-stretch"
      >
        {UX_FLOW.stages.map((stage, i) => (
          <div key={stage.num} className="contents lg:flex lg:flex-1 lg:items-center">
            <motion.div variants={stages.item} className="min-w-0 flex-1 rounded-[14px] bg-white p-[14px]">
              <p className="text-[22px] font-bold leading-none" style={{ ...DISPLAY, color: VIOLET }}>
                {stage.num}
              </p>
              <p className="mt-[10px] text-[15px] font-semibold text-[#1A1826]" style={BODY}>
                {stage.title}
              </p>
              <p className="mt-[4px] text-[12px] leading-[1.5] text-[#625E72]" style={BODY}>
                {stage.body}
              </p>
            </motion.div>
            {i < UX_FLOW.stages.length - 1 && (
              <Reveal
                distance={12}
                className="hidden h-[24px] w-[24px] shrink-0 items-center justify-center lg:flex"
              >
                <Icon name="icon-arrow" size={18} />
              </Reveal>
            )}
          </div>
        ))}
      </motion.div>
      <p className="mt-8 text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: VIOLET }}>
        {UX_FLOW.triggersLabel}
      </p>
      <motion.div
        variants={triggers.group}
        initial="hidden"
        whileInView="visible"
        viewport={triggers.viewport}
        className="mt-[14px] grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {UX_FLOW.triggers.map((trig) => (
          <motion.div
            key={trig.title}
            variants={triggers.item}
            className="flex items-start gap-3 rounded-[14px] bg-white p-4"
          >
            <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] bg-[#E7E3F8]">
              <Icon name={trig.icon} size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-[#1A1826]" style={BODY}>
                {trig.title}
              </p>
              <p className="mt-[2px] text-[12px] leading-[1.5] text-[#625E72]" style={BODY}>
                {trig.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Challenges() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });

  return (
    <section className="mt-[90px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-24 lg:px-0">
        <SectionHead onDark eyebrow={CHALLENGES.eyebrow} heading={CHALLENGES.heading} />
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 lg:grid-cols-3"
        >
          {CHALLENGES.items.map((challenge) => (
            <motion.article
              key={challenge.title}
              variants={item}
              className="flex flex-col rounded-[20px] bg-[#211E30] p-[26px]"
            >
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-[16px] bg-[#2F2B44]">
                <Icon name={challenge.icon} size={32} />
              </span>
              <h3 className="mt-[16px] text-[20px] font-semibold leading-[1.5] text-[#F1EFF8]" style={DISPLAY}>
                {challenge.title}
              </h3>
              <p className="mt-[4px] text-[14px] leading-[1.5] text-[#B8B2CB]" style={BODY}>
                {challenge.body}
              </p>
              <div className="mt-auto flex flex-col gap-2 rounded-[14px] border p-4 pt-4" style={{ borderColor: "#3A3552" }}>
                <p className="text-[10px] font-bold tracking-[1px]" style={{ ...BODY, color: LAV }}>
                  HOW I SOLVED IT
                </p>
                <p className="text-[14px] leading-[1.5] text-[#F1EFF8]" style={BODY}>
                  {challenge.solved}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  // Each feature-plus-caption arrives as one unit, so frame and label never
  // separate mid-entrance.
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={FEATURES.eyebrow} heading={FEATURES.heading} note={FEATURES.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-6 lg:grid-cols-3"
      >
        {FEATURES.items.map((f) => (
          <motion.figure key={f.num} variants={item}>
            <div className="h-[250px] overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.title} className="h-full w-full object-cover" loading="lazy" draggable={false} />
            </div>
            <figcaption className="mt-[10px]">
              <p className="text-[13px] font-bold" style={{ ...BODY, color: VIOLET }}>
                {f.num}
              </p>
              <h3 className="mt-[6px] text-[18px] font-semibold leading-[1.5] text-[#1A1826]" style={DISPLAY}>
                {f.title}
              </h3>
              <p className="mt-[2px] max-w-[334px] text-[14px] leading-[1.5] text-[#625E72]" style={BODY}>
                {f.body}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

function Mockups() {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={MOCKUPS.eyebrow} heading={MOCKUPS.heading} note={MOCKUPS.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-x-[16px] gap-y-6 md:grid-cols-2"
      >
        {MOCKUPS.items.map((mock) => (
          <motion.figure key={mock.caption} variants={item}>
            <div className="h-[300px] overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mock.ph} alt={mock.caption} className="h-full w-full object-cover" loading="lazy" draggable={false} />
            </div>
            <figcaption className="mt-[8px] text-[13px] text-[#625E72]" style={BODY}>
              {mock.caption}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

function Results() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={RESULTS.eyebrow} heading={RESULTS.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-3"
      >
        {RESULTS.impact.map((stat) => (
          <motion.div
            key={stat.title}
            variants={item}
            className="rounded-[18px] p-6"
            style={{ background: stat.tone === "violet" ? VIOLET : DARK }}
          >
            <p className="text-[30px] font-semibold leading-none text-[#F1EFF8]" style={DISPLAY}>
              {stat.title}
            </p>
            <p className="mt-[12px] text-[14px] leading-[1.5] text-[#C6C1D9]" style={BODY}>
              {stat.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
      {/* The verdict on the work, and the last thing read before the footer —
          so it arrives line by line rather than as one block. */}
      <Reveal className="mt-4" distance={18}>
        <figure className="flex gap-6 rounded-[20px] bg-[#E9E6F3] p-10">
          <span aria-hidden className="text-[54px] font-bold leading-[0.8]" style={{ ...DISPLAY, color: VIOLET }}>
            “
          </span>
          {/* LineByLine renders spans, so the blockquote stays as the
              semantic wrapper around it. */}
          <blockquote className="max-w-[880px] text-[20px] font-medium leading-[1.4] text-[#1A1826] md:text-[21px]" style={DISPLAY}>
            <LineByLine text={`“${RESULTS.quote}”`} delay={0.12} />
          </blockquote>
        </figure>
      </Reveal>
      <p className="mt-6 text-[12px] leading-[1.5] text-[#625E72]" style={BODY}>
        {RESULTS.credit}
      </p>
    </section>
  );
}

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });

  return (
    <section data-index="More projects" data-tone="light" className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[90px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#625E72]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#1A1826] pb-[2px] text-[14px] font-semibold text-[#1A1826] transition-opacity duration-200 hover:opacity-70" style={BODY}>
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
                  style={{ background: n.thumbBg }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={caseStudyThumb(n.href)}
                    alt={n.title}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover motion-safe:group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:transform-none"
                  />
                </span>
            <span className="min-w-0">
              <span className="block text-[12px] text-[#625E72]" style={BODY}>
                {n.direction}
              </span>
              <span className="mt-[6px] block text-[22px] font-semibold leading-[1.2] text-[#1A1826]" style={DISPLAY}>
                {n.title}
              </span>
              <span className="mt-[6px] block truncate text-[14px] text-[#625E72]" style={BODY}>
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
            <p className="text-[32px] font-semibold text-[#F1EFF8]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="mt-[10px] inline-block border-b border-[#3A3552] pb-[2px] text-[16px] text-[#CBC6DC] transition-opacity duration-200 hover:opacity-80"
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
                className="text-[14px] text-[#F1EFF8] transition-opacity duration-200 hover:opacity-80"
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

export default function AscensionCase() {
  return (
    <main style={{ background: PAPER }}>
      <ProjectRuler />
      <Nav />
      <Hero />
      <Facts />
      <Scope />
      <WhatIDid />
      <Goals />
      <Storyboard />
      <UxFlow />
      <Challenges />
      <Features />
      <Mockups />
      <Results />
      <MoreProjects />
      <Footer />
    </main>
  );
}
