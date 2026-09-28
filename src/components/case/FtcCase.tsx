"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  BRIEF,
  ENVIRONMENT,
  FACTS,
  HERO,
  IN_ACTION,
  KEY_DECISIONS,
  NEIGHBORS,
  RESULTS,
  STORYBOARD,
  TESTING,
  WHAT_I_DID,
} from "@/data/ftc";
import { FOOTER_LINKS } from "@/data/landing";
import { EASE_OUT, LineByLine, Reveal, useMotionPref, useStagger } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

/* ---------------------------------- tokens --------------------------------- */

const DARK = "#1E1814";
const RUST = "#C8502A";
const PEACH = "#F2A27E";
const PAPER = "#F7F2EE";

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
    <img
      src={`/case/ftc/${name}.svg`}
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
      <motion.div variants={item} className="max-w-[620px]">
        <p className={`text-[11px] font-bold uppercase tracking-[1.32px] ${onDark ? "text-[#F2A27E]" : "text-[#C8502A]"}`} style={BODY}>
          {eyebrow}
        </p>
        <h2
          className={`mt-[14px] text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.38px] ${onDark ? "text-[#F7EFEA]" : "text-[#221A16]"}`}
          style={DISPLAY}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className={`max-w-[340px] pt-[24px] text-[14px] leading-[1.5] ${onDark ? "text-[#C4B2A8]" : "text-[#6B5E57]"}`}
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
        <Link href="/" className="text-[16px] font-semibold text-[#221A16]" style={DISPLAY}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#221A16] pb-[3px] text-[14px] text-[#221A16]">
            Work
          </Link>
          <Link href="/about" className="text-[14px] text-[#221A16] transition-opacity duration-200 hover:opacity-70">
            About
          </Link>
          <a href="/resume.pdf" className="text-[14px] text-[#221A16] transition-opacity duration-200 hover:opacity-70">
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] bg-[#221A16] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98]"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] bg-[#221A16] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] md:hidden"
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
      {/* Warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 620,
          height: 620,
          right: 20,
          top: 2,
          background: "radial-gradient(circle, rgba(242,162,126,0.16) 0%, rgba(242,162,126,0) 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1036px] px-6 pb-[70px] pt-[60px] lg:px-0 lg:pb-16 lg:pt-[42px]">
        <motion.div
          variants={group}
          initial="hidden"
          animate={stage === "loading" ? "hidden" : "visible"}
          className="flex flex-col gap-10 lg:flex-row lg:justify-between"
        >
          <div className="flex max-w-[560px] flex-col">
            <motion.div variants={item} className="flex flex-col items-start gap-[18px]">
              <p className="text-[13px] font-semibold" style={{ ...BODY, color: PEACH }}>
                {HERO.eyebrow}
              </p>
              <h1
                className="text-[clamp(42px,4.6vw,64px)] font-semibold leading-[1.04] tracking-[-1.28px] text-[#F7EFEA]"
                style={DISPLAY}
              >
                {HERO.title}
              </h1>
              <p className="max-w-[540px] text-[19px] leading-[1.5] text-[#D8C8BF]" style={BODY}>
                {HERO.subtitle}
              </p>
            </motion.div>
            <motion.div variants={item} className="mt-[36px] border-l-2 pl-[19px]" style={{ borderColor: PEACH }}>
              <p className="text-[16px] text-[#D8C8BF]" style={BODY}>
                {HERO.role}
              </p>
              <p className="mt-[2px] text-[14px] text-[#A89488]" style={BODY}>
                {HERO.roleNote}
              </p>
            </motion.div>
            <motion.a
              variants={item}
              href={HERO.cta.href}
              className="mt-[36px] inline-flex h-[46px] w-fit items-center rounded-[999px] px-[22px] text-[15px] font-semibold text-[#221A16] transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] motion-safe:hover:opacity-90"
              style={{ ...BODY, background: PAPER }}
            >
              {HERO.cta.label}
            </motion.a>
          </div>

          {/* Hero media, exactly as designed: handheld proof over AR pantry */}
          <motion.div
            variants={item}
            aria-hidden
            className="relative hidden shrink-0 lg:block"
            style={{ width: 440, minHeight: 540 }}
          >
            <div className="absolute left-0 top-0 h-[540px] w-[270px] overflow-hidden rounded-[32px]" style={{ border: "6px solid #0E0B09" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.media.pantry.src} alt={HERO.media.pantry.alt} className="h-full w-full object-cover" draggable={false} />
            </div>
            <div className="absolute right-0 top-[40px] h-[500px] w-[250px] overflow-hidden rounded-[30px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.media.handheld.src} alt={HERO.media.handheld.alt} className="h-full w-full object-cover" draggable={false} />
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
    <section aria-label="At a glance" style={{ background: "#15110E" }}>
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
              style={{ borderLeft: i > 0 ? "1px solid #2E2520" : undefined }}
            >
              <Icon name={fact.icon} size={20} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[11px] tracking-[0.44px] text-[#A89488]" style={BODY}>
                  {fact.label.toUpperCase()}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#F7EFEA]" style={BODY}>
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

function Brief() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} note={BRIEF.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-3"
      >
        {BRIEF.cards.map((card) => (
          <motion.article
            key={card.title}
            variants={item}
            className="rounded-[18px] bg-white p-6"
          >
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-[#F8E3D8]">
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5] text-[#221A16]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.5] text-[#6B5E57]" style={BODY}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function WhatIDid() {
  // The six steps are a sequence, so they arrive in order — the argument is
  // chronological and the motion says so before the copy does.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  const tiles = useStagger({ distance: 14, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={WHAT_I_DID.eyebrow} heading={WHAT_I_DID.heading} note={WHAT_I_DID.note} />
      <div className="relative">
        {/* The connector draws itself in, so the row reads as one linked
            process rather than six separate badges. */}
        <motion.div
          aria-hidden
          className="absolute left-[86px] right-[86px] top-[28px] hidden h-px lg:block"
          style={{ background: "#F2A27E", transformOrigin: "left" }}
          initial={{ transform: "scaleX(0)" }}
          whileInView={{ transform: "scaleX(1)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        />
        <motion.ol
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
        >
          {WHAT_I_DID.steps.map((step) => (
            <motion.li key={step.title} variants={item} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: RUST }}>
                <Icon name={step.icon} size={20} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-[#221A16]" style={DISPLAY}>
                  {step.title}
                </p>
                <p className="mx-auto mt-[2px] max-w-[160px] text-[13px] leading-[1.4] text-[#6B5E57]" style={BODY}>
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
      <motion.div
        variants={tiles.group}
        initial="hidden"
        whileInView="visible"
        viewport={tiles.viewport}
        className="mt-[46px] grid gap-4 md:grid-cols-3"
      >
        {WHAT_I_DID.tiles.map((tile) => (
          <motion.div
            key={tile.num}
            variants={tiles.item}
            className="rounded-[18px] p-[22px] pb-6"
            style={{ background: tile.tone === "rust" ? RUST : DARK }}
          >
            <p className="text-[30px] font-semibold leading-none text-[#F7EFEA]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-[12px] text-[14px] leading-[1.5] text-[#EAD9CF]" style={BODY}>
              {tile.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

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
          className="grid gap-4 lg:grid-cols-3"
        >
          {KEY_DECISIONS.items.map((decision) => (
            <motion.article
              key={decision.title}
              variants={item}
              className="rounded-[20px] bg-[#2A221D] p-[26px]"
            >
              <span className="flex h-[80px] w-[80px] items-center justify-center rounded-[16px] bg-[#3A2F28]">
                <Icon name={decision.icon} size={34} />
              </span>
              <p className="mt-[18px] text-[11px] font-bold tracking-[1.1px]" style={{ ...BODY, color: PEACH }}>
                {decision.label.toUpperCase()}
              </p>
              <h3 className="mt-[6px] text-[20px] font-semibold leading-[1.5] text-[#F7EFEA]" style={DISPLAY}>
                {decision.title}
              </h3>
              <p className="mt-[5px] text-[14px] leading-[1.5] text-[#C4B2A8]" style={BODY}>
                {decision.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Storyboard() {
  // The wide board arrives on its own, then the four beats follow in order.
  const beats = useStagger({ distance: 14, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={STORYBOARD.eyebrow} heading={STORYBOARD.heading} note={STORYBOARD.note} />
      <Reveal distance={24}>
        <div className="h-[350px] overflow-hidden rounded-[16px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={STORYBOARD.image.src} alt={STORYBOARD.image.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
        </div>
      </Reveal>
      <motion.div
        variants={beats.group}
        initial="hidden"
        whileInView="visible"
        viewport={beats.viewport}
        className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STORYBOARD.beats.map((beat, i) => (
          <motion.div
            key={beat}
            variants={beats.item}
            className="flex items-center gap-[12px] rounded-[14px] bg-white px-4 py-[14px]"
          >
            <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[999px] text-[13px] font-bold text-white" style={{ ...BODY, background: RUST }}>
              {i + 1}
            </span>
            <p className="text-[14px] font-medium leading-[1.5] text-[#221A16]" style={BODY}>
              {beat}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Environment() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={ENVIRONMENT.eyebrow} heading={ENVIRONMENT.heading} />
      <div className="grid gap-6 lg:grid-cols-[620px_1fr]">
        <Reveal distance={24}>
          <div className="h-[450px] overflow-hidden rounded-[16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ENVIRONMENT.image.src} alt={ENVIRONMENT.image.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </div>
        </Reveal>
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-4"
        >
          {ENVIRONMENT.cards.map((card) => (
            <motion.article
              key={card.title}
              variants={item}
              className="rounded-[18px] p-6"
              style={{ background: card.dark ? RUST : "#FFFFFF" }}
            >
              {card.icon && (
                <Icon name={card.icon} size={26} />
              )}
              <h3 className={`mt-[8px] text-[18px] font-semibold leading-[1.5] ${card.dark ? "text-white" : "text-[#221A16]"}`} style={DISPLAY}>
                {card.title}
              </h3>
              <p className={`text-[14px] leading-[1.5] ${card.dark ? "text-[#FFE6DA]" : "text-[#6B5E57]"}`} style={BODY}>
                {card.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Testing() {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={TESTING.eyebrow} heading={TESTING.heading} note={TESTING.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {TESTING.captures.map((cap) => (
          <motion.div key={cap.src} variants={item} className="h-[320px] overflow-hidden rounded-[16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cap.src} alt={cap.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function InAction() {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.09 });

  return (
    <section id="action" className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={IN_ACTION.eyebrow} heading={IN_ACTION.heading} note={IN_ACTION.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 lg:grid-cols-[610px_1fr]"
      >
        {IN_ACTION.captures.map((cap) => (
          <motion.div key={cap.src} variants={item} className="h-[344px] overflow-hidden rounded-[16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cap.src} alt={cap.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Results() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={RESULTS.eyebrow} heading={RESULTS.heading} note={RESULTS.note} />
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
            style={{ background: stat.tone === "rust" ? RUST : DARK }}
          >
            <p className="text-[36px] font-semibold leading-none text-[#F7EFEA]" style={DISPLAY}>
              {stat.title}
            </p>
            <p className="mt-[12px] text-[14px] text-[#EAD9CF]" style={BODY}>
              {stat.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
      {/* The verdict on the work, and the last thing read before the footer —
          so it arrives line by line rather than as one block. */}
      <Reveal className="mt-4" distance={18}>
        <figure className="flex gap-6 rounded-[20px] bg-[#F0E4DB] p-10">
          <span aria-hidden className="text-[54px] font-bold leading-[0.8]" style={{ ...DISPLAY, color: RUST }}>
            “
          </span>
          <figure>
            {/* LineByLine renders spans, so the blockquote stays as the
                semantic wrapper around it. */}
            <blockquote className="max-w-[880px] text-[20px] font-medium leading-[1.4] text-[#221A16] md:text-[21px]" style={DISPLAY}>
              <LineByLine text={`“${RESULTS.quote.lead}”`} delay={0.12} />
            </blockquote>
            <figcaption className="mt-[10px] text-[13px] text-[#6B5E57]" style={BODY}>
              {RESULTS.quote.follow}
            </figcaption>
          </figure>
        </figure>
      </Reveal>
      <p className="mt-6 text-[12px] leading-[1.5] text-[#6B5E57]" style={BODY}>
        {RESULTS.credit}
      </p>
    </section>
  );
}

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[90px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#6B5E57]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#221A16] pb-[2px] text-[14px] font-semibold text-[#221A16] transition-opacity duration-200 hover:opacity-70" style={BODY}>
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
              <span className="block text-[12px] text-[#6B5E57]" style={BODY}>
                {n.direction}
              </span>
              <span className="mt-[6px] block text-[22px] font-semibold leading-[1.2] text-[#221A16]" style={DISPLAY}>
                {n.title}
              </span>
              <span className="mt-[6px] block truncate text-[14px] text-[#6B5E57]" style={BODY}>
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
    <footer style={{ background: DARK }}>
      {/* One quiet rise for the whole row — a footer is a sign-off, not a
          section, and per-link entrances would overplay it. */}
      <Reveal distance={16}>
        <div className="mx-auto flex w-full max-w-[1036px] flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-0">
          <div>
            <p className="text-[32px] font-semibold text-[#F7EFEA]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="mt-[10px] inline-block border-b border-[#4A3E36] pb-[2px] text-[16px] text-[#D8C8BF] transition-opacity duration-200 hover:opacity-80"
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
                className="text-[14px] text-[#F7EFEA] transition-opacity duration-200 hover:opacity-80"
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

export default function FtcCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Brief />
      <WhatIDid />
      <KeyDecisions />
      <Storyboard />
      <Environment />
      <Testing />
      <InAction />
      <Results />
      <MoreProjects />
      <Footer />
    </main>
  );
}
