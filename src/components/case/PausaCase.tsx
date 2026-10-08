"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  CONVERSATION,
  FACTS,
  HIFI,
  HERO,
  KEY_DECISIONS,
  NEIGHBORS,
  NEXT_STEPS,
  PROBLEM,
  RESEARCH,
  UX_HIFI,
  VISUAL_VOICE,
  WHAT_I_DID,
} from "@/data/pausa";
import { FOOTER_LINKS } from "@/data/landing";
import { EASE_OUT, LineByLine, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";
import { ProjectRuler } from "@/components/ProjectRuler";

/* ---------------------------------- tokens --------------------------------- */

const BLUE = "#2F6F98";
const INK = "#1B1F24";
const DARK = "#141A21";
const PAPER = "#F4EFE7";
const CARD = "#FBF9F4";
const HAIR = "#E3DCD0";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/* ------------------------------ shared pieces ------------------------------ */

/**
 * Above the fold, this is the one place the page spends real motion. The row
 * itself doesn't move — each block lands in reading order, which reads as one
 * gesture rather than four. Same shape as the homepage hero, so the load
 * choreography is identical wherever a visitor arrives.
 *
 * `item` carries its own `delayChildren`, so the blocks inside the copy column
 * follow the column in turn instead of arriving with it.
 */
function heroMotion(reduce: boolean): { group: Variants; item: Variants } {
  if (reduce) {
    return {
      group: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      },
      item: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
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
        transition: {
          duration: 0.55,
          ease: EASE_OUT,
          delayChildren: 0.08,
          staggerChildren: 0.07,
        },
      },
    },
  };
}

function Icon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async"
      src={`/case/pausa/${name}.svg`}
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
  label,
  heading,
  note,
  onDark = false,
  size = "lg",
}: {
  label: string;
  heading: string;
  note?: string;
  onDark?: boolean;
  size?: "lg" | "md";
}) {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    /* Every section announces itself the same way: the heading block lands, the
       supporting note follows a beat behind. Uniform arrival is what lets a
       long scroll read as one document instead of nine separate screens. */
    <motion.div
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="flex flex-wrap items-end justify-between gap-6"
    >
      <motion.div variants={item} className="max-w-[700px]">
        <p
          className="text-[11px] font-bold uppercase tracking-[1.32px]"
          style={{ ...BODY, color: onDark ? "#A3C2DA" : BLUE }}
        >
          {label}
        </p>
        <h2
          className={`mt-[13px] ${size === "lg" ? "text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.38px]" : "text-[24px] md:text-[28px] leading-[1.15] tracking-[-0.28px]"} ${onDark ? "text-[#EEF1F4]" : "text-[#1B1F24]"}`}
          style={DISPLAY}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className={`max-w-[320px] pb-1 text-[14px] leading-[1.55] ${onDark ? "text-[#B9C1CA]" : "text-[#5F6670]"}`}
          style={BODY}
        >
          {note}
        </motion.p>
      )}
    </motion.div>
  );
}

/* --------------------------------- sections -------------------------------- */

function Nav() {
  const reduce = useMotionPref();
  // Same load choreography as the site header: the bar drops in last, once the
  // hero copy has landed.
  const { stage } = useLoadStage();

  return (
    <motion.header
      initial={{ transform: "translateY(-100%)" }}
      animate={{ transform: stage === "nav" ? "translateY(0%)" : "translateY(-100%)" }}
      transition={{ duration: reduce ? 0.2 : 0.65, ease: EASE_OUT }}
      className="bg-[#F4EFE7]"
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1100px] items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="text-[16px] font-semibold text-[#1B1F24]"
          style={DISPLAY}
        >
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#1B1F24] pb-[2px] text-[14px] text-[#1B1F24]">
            Work
          </Link>
          <Link href="/about" className="text-[14px] text-[#1B1F24] transition-opacity hover:opacity-70">
            About
          </Link>
          <a target="_blank" rel="noreferrer" href="/resume.pdf" className="text-[14px] text-[#1B1F24] transition-opacity hover:opacity-70">
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] bg-[#1B1F24] px-[20px] text-[14px] font-semibold text-white"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] bg-[#1B1F24] px-[20px] text-[14px] font-semibold text-white md:hidden"
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
  // Held back until the preloader has cleared, so the entrance plays in front
  // of the viewer instead of running out unseen behind the overlay.
  const { stage } = useLoadStage();
  const { group, item } = heroMotion(!!reduce);

  return (
    <header className="bg-[#141A21]">
      <div className="mx-auto w-full max-w-[1100px] px-6 pb-[70px] pt-[60px] lg:px-8">
        <motion.div
          variants={group}
          initial="hidden"
          animate={stage === "loading" ? "hidden" : "visible"}
          className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between"
        >
          <motion.div variants={item} className="max-w-[556px]">
            <p className="text-[13px] font-bold text-[#A3C2DA]" style={BODY}>
              {HERO.eyebrow}
            </p>
            <h1
              className="mt-[26px] max-w-[451px] text-[clamp(40px,4.4vw,62px)] font-semibold leading-[1.04] tracking-[-1.24px] text-[#EEF1F4]"
              style={DISPLAY}
            >
              {HERO.title}
            </h1>
            <p className="mt-[24px] text-[19px] leading-[1.55] text-[#C6CDD5]" style={BODY}>
              {HERO.subtitle}
            </p>
            <motion.div
              variants={item}
              className="mt-[40px] border-l-2 pl-[19px]"
              style={{ borderColor: "#A3C2DA" }}
            >
              <p className="text-[16px] font-semibold text-[#EEF1F4]" style={BODY}>
                {HERO.role}
              </p>
              <p className="mt-[4px] text-[14px] text-[#9AA4AF]" style={BODY}>
                {HERO.roleNote}
              </p>
            </motion.div>
            <motion.a
              variants={item}
              href={HERO.cta.href}
              className="mt-[48px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold text-[#1B1F24] transition-opacity hover:opacity-90"
              style={{ ...BODY, background: PAPER }}
            >
              {HERO.cta.label}
            </motion.a>
          </motion.div>
          <motion.div variants={item} className="mx-auto w-full max-w-[455px] shrink-0 lg:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="eager" fetchPriority="high"
              src={HERO.fan}
              alt="Pausa mobile screens fanned out"
              width={911}
              height={940}
              className="w-full select-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

function Facts() {
  // A tight band of metadata, so the four facts assemble in a beat rather than
  // each getting its own moment.
  const { group, item, viewport } = useStagger({ distance: 12, step: 0.05 });

  return (
    <section data-index="At a glance" data-tone="dark" aria-label="At a glance" className="bg-[#10151B]">
      <div className="mx-auto w-full max-w-[1100px] px-6 lg:px-8">
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
              className="flex items-start gap-[12px] py-[22px] lg:px-4"
              style={{ borderLeft: i > 0 ? "1px solid #26303A" : undefined }}
            >
              <Icon name={`icon-${fact.icon}`} size={20} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.44px] text-[#9AA4AF]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[4px] text-[15px] font-semibold leading-[1.55] text-[#EEF1F4]" style={BODY}>
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
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={PROBLEM.label} heading={PROBLEM.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-[36px] grid gap-4 md:grid-cols-3"
      >
        {PROBLEM.cards.map((card) => (
          <motion.article key={card.title} variants={item} className="rounded-[18px] bg-[#FBF9F4] p-[26px]">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-[#DCE9F1]">
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[15px] text-[18px] font-semibold leading-[1.55] text-[#1B1F24]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-[#5F6670]" style={BODY}>
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
  const stats = useStagger({ distance: 14, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={WHAT_I_DID.label} heading={WHAT_I_DID.heading} note={WHAT_I_DID.note} />
      <div className="relative mt-[54px]">
        {/* The connector draws itself in, so the row reads as one linked
            process rather than six separate badges. Sits outside the stagger
            group: it has its own trigger, and a motion child declaring its own
            animation would break variant inheritance for what follows. */}
        <motion.div
          aria-hidden
          className="absolute left-0 right-0 top-[27px] hidden h-px bg-[#A3C2DA] lg:block"
          style={{ transformOrigin: "left" }}
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
            <motion.li key={step.title} variants={item} className="flex flex-col items-center gap-[12px] text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: BLUE }}>
                <Icon name={step.icon} size={20} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-[#1B1F24]" style={DISPLAY}>
                  {step.title}
                </p>
                <p className="mx-auto mt-[4px] max-w-[160px] text-[13px] leading-[1.4] text-[#5F6670]" style={BODY}>
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
      <motion.div
        variants={stats.group}
        initial="hidden"
        whileInView="visible"
        viewport={stats.viewport}
        className="mt-[46px] grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {WHAT_I_DID.stats.map((stat) => (
          <motion.div key={stat.label} variants={stats.item} className="rounded-[16px] bg-[#141A21] p-[22px] pb-[24px]">
            <p className="text-[30px] font-semibold leading-none text-[#EEF1F4]" style={DISPLAY}>
              {stat.num}
            </p>
            <p className="mt-[8px] text-[14px] leading-[1.55] text-[#B9C1CA]" style={BODY}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Research() {
  // Each row is one finding and the design response it forced, so the rows
  // arrive in citation order — the logic of the section is the sequence.
  const { group, item, viewport } = useStagger({ distance: 12, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={RESEARCH.label} heading={RESEARCH.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-[36px] rounded-[22px] bg-[#FBF9F4] px-7 py-2"
      >
        {RESEARCH.rows.map((row, i) => (
          <motion.div
            key={row.citation}
            variants={item}
            className="grid gap-4 py-[26px] lg:grid-cols-[511px_40px_1fr] lg:items-center lg:gap-[16px]"
            style={{ borderTop: i > 0 ? `1px solid ${HAIR}` : undefined }}
          >
            <div>
              <p className="text-[16px] leading-[1.55] text-[#1B1F24]" style={BODY}>
                {row.finding}
              </p>
              <p className="mt-[6px] text-[13px] text-[#5F6670]" style={BODY}>
                {row.citation}
              </p>
            </div>
            <span aria-hidden className="hidden text-[20px] leading-none lg:block" style={{ ...BODY, color: BLUE }}>
              →
            </span>
            <p className="text-[16px] font-semibold leading-[1.55] lg:pl-[32px]" style={{ ...BODY, color: BLUE }}>
              {row.response}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Conversation() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={CONVERSATION.label} heading={CONVERSATION.heading} note={CONVERSATION.note} />
      {/* The flow diagram is the argument of the section, so it gets one
          unhurried arrival of its own before the three paths below it. */}
      <Reveal distance={28}>
        <div className="mt-[36px] overflow-hidden rounded-[22px] bg-[#FBF9F4] p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CONVERSATION.flowImage}
            alt="Pausa conversation flow: welcome, sign up, check in, talk, breathe, try something, closure, and the escalation path to Support"
            className="w-full select-none rounded-[14px]"
            loading="lazy"
            draggable={false}
          />
        </div>
      </Reveal>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-4 grid gap-4 md:grid-cols-3"
      >
        {CONVERSATION.thumbs.map((thumb) => {
          const warm = thumb.tone === "warm";
          return (
            <motion.div
              key={thumb.num}
              variants={item}
              className="flex flex-col justify-between gap-[38px] rounded-[18px] p-[22px]"
              style={{ background: warm ? "#F3E4DA" : DARK }}
            >
              <p className="text-[14px] leading-[1.55]" style={{ ...BODY, color: warm ? "#5B4136" : "#B9C1CA" }}>
                {thumb.body}
              </p>
              <div className="flex items-center gap-[10px]">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[11px] text-[12px] font-semibold text-white" style={{ ...BODY, background: BLUE }}>
                  {thumb.num}
                </span>
                <p className="text-[14px] font-semibold" style={{ ...BODY, color: warm ? INK : "#EEF1F4" }}>
                  {thumb.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function UxHifi() {
  const cards = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={UX_HIFI.label} heading={UX_HIFI.heading} />
      {/* Wireframe, then the arrow, then hi-fi: the section's whole point is the
          transformation, so the three parts are staged rather than stacked. */}
      <div className="mt-[36px] flex flex-col items-stretch gap-6 lg:flex-row lg:items-center">
        {UX_HIFI.panels.map((panel, i) => {
          const light = panel.kind === "wireframe";
          return (
            <div key={panel.tag} className="contents lg:flex lg:flex-1 lg:flex-col lg:gap-[12px]">
              {i === 1 && (
                <Reveal
                  delay={0.1}
                  distance={16}
                  className="mx-auto hidden h-[44px] w-[44px] items-center justify-center rounded-[999px] lg:flex"
                  style={{ background: BLUE }}
                >
                  <Icon name="icon-arrow" size={20} />
                </Reveal>
              )}
              <div className="lg:flex lg:flex-1 lg:flex-col lg:gap-[12px]">
                <Reveal delay={i * 0.18} distance={26}>
                  <div
                    className="relative flex h-auto items-center justify-center rounded-[20px] p-[26px]"
                    style={{ background: light ? CARD : DARK, border: light ? `1px solid ${HAIR}` : undefined }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={panel.image}
                      alt={`${panel.tag} Pausa mood check-in`}
                      className="w-[230px] select-none rounded-[24px]"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </Reveal>
                <p className="text-[11px] tracking-[0.66px] text-[#5F6670]" style={BODY}>
                  {panel.tag.toUpperCase()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <motion.div
        variants={cards.group}
        initial="hidden"
        whileInView="visible"
        viewport={cards.viewport}
        className="mt-6 grid gap-4 md:grid-cols-3"
      >
        {UX_HIFI.cards.map((card) => (
          <motion.article key={card.title} variants={cards.item} className="rounded-[18px] bg-[#FBF9F4] p-[26px]">
            <h3 className="text-[18px] font-semibold leading-[1.55] text-[#1B1F24]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-[#5F6670]" style={BODY}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function KeyDecisions() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mt-[90px] bg-[#141A21]">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-[90px] lg:px-8">
        <SectionHead onDark label={KEY_DECISIONS.label} heading={KEY_DECISIONS.heading} />
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-[44px] grid gap-4 lg:grid-cols-2"
        >
          {KEY_DECISIONS.items.map((decision) => (
            <motion.article
              key={decision.title}
              variants={item}
              className="flex items-start gap-[24px] rounded-[20px] bg-[#1E2630] p-[26px]"
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
                <h3 className="text-[18px] font-semibold leading-[1.55] text-[#EEF1F4]" style={DISPLAY}>
                  {decision.title}
                </h3>
                <p className="mt-[5px] text-[14px] leading-[1.55] text-[#B9C1CA]" style={BODY}>
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

function VisualVoice() {
  // The five voice rows are a ramp from warmest to most reserved, so they land
  // in order — the sequence is the point of the column.
  const voice = useStagger({ distance: 12, step: 0.05 });

  return (
    <section className="mx-auto grid w-full max-w-[1100px] gap-10 px-6 pt-[90px] lg:grid-cols-2 lg:px-8">
      <Reveal distance={22}>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: BLUE }}>
          {VISUAL_VOICE.visual.label}
        </p>
        <h2 className="mt-[12px] text-[28px] font-semibold leading-[1.15] tracking-[-0.28px] text-[#1B1F24]" style={DISPLAY}>
          {VISUAL_VOICE.visual.heading}
        </h2>
        <div className="mt-[26px] rounded-[18px] bg-[#141A21] p-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={VISUAL_VOICE.visual.webshot}
            alt="Pausa web dashboard: check-in, conversation, 7-day mood and a breathing card"
            className="w-full select-none rounded-[10px]"
            loading="lazy"
            draggable={false}
          />
        </div>
        <div className="mt-[16px] flex flex-wrap gap-[8px]">
          {VISUAL_VOICE.visual.chips.map((chip) => (
            <span key={chip} className="rounded-[999px] bg-[#DCE9F1] px-[12px] py-[6px] text-[12px] font-semibold text-[#2F6F98]" style={BODY}>
              {chip}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.08} distance={22}>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: BLUE }}>
            {VISUAL_VOICE.voice.label}
          </p>
          <h2 className="mt-[12px] text-[28px] font-semibold leading-[1.15] tracking-[-0.28px] text-[#1B1F24]" style={DISPLAY}>
            {VISUAL_VOICE.voice.heading}
          </h2>
          <motion.div
            variants={voice.group}
            initial="hidden"
            whileInView="visible"
            viewport={voice.viewport}
            className="mt-[26px] flex flex-col gap-[8px]"
          >
            {VISUAL_VOICE.voice.rows.map((row) => {
              const styles = {
                deep: { bg: "#1F4E6C", fg: "#FFFFFF" },
                blue: { bg: BLUE, fg: "#FFFFFF" },
                mid: { bg: "#7FA6C2", fg: "#10202C" },
                light: { bg: "#C9DCE8", fg: INK },
                outline: { bg: CARD, fg: INK },
              }[row.tone];
              return (
                <motion.div
                  key={row.label}
                  variants={voice.item}
                  className="flex min-h-[48px] items-center justify-between gap-4 rounded-[10px] px-4 py-3"
                  style={{ background: styles.bg, color: styles.fg, ...(row.tone === "outline" ? { border: `1px solid ${HAIR}` } : {}) }}
                >
                  <p className="text-[14px] font-semibold" style={BODY}>
                    {row.label}
                  </p>
                  <p className="text-right text-[14px]" style={BODY}>
                    {row.quote}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
      </Reveal>
    </section>
  );
}

function Hifi() {
  return (
    <section id="hifi" className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={HIFI.label} heading={HIFI.heading} note={HIFI.note} />
      {/* Nine screens on one scroller, so the strip arrives as a single object.
          Staggering nine phones here would read as a slot machine. */}
      <Reveal distance={20}>
        <div className="mt-[36px] flex gap-[12px] overflow-x-auto pb-4">
          {HIFI.screens.map((screen) => (
            <figure key={screen.caption} className="w-[104px] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screen.image}
                alt={`Pausa ${screen.caption} screen`}
                width={104}
                height={224}
                loading="lazy"
                draggable={false}
                className="w-[104px] select-none rounded-[14px] border"
                style={{ borderColor: HAIR }}
              />
              <figcaption className="mt-[8px] text-[12px] text-[#5F6670]" style={BODY}>
                {screen.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function NextSteps() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={NEXT_STEPS.label} heading={NEXT_STEPS.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-[36px] grid gap-4 md:grid-cols-3"
      >
        {NEXT_STEPS.stats.map((stat) => {
          const blue = stat.tone === "blue";
          return (
            <motion.div key={stat.label} variants={item} className="rounded-[18px] p-[24px]" style={{ background: blue ? BLUE : DARK }}>
              <p className="text-[40px] font-semibold leading-none text-[#EEF1F4]" style={DISPLAY}>
                {stat.num}
              </p>
              <p className="mt-[14px] text-[13px]" style={{ ...BODY, color: blue ? "#C6D4DF" : "#C6D4DF" }}>
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
      {/* The last thing read before the footer, and the reason the project
          exists — so it gets the same line-by-line arrival as the homepage
          pull-quote rather than arriving as one block. */}
      <Reveal className="mt-8" distance={18}>
        <figure className="flex gap-[24px] rounded-[20px] bg-[#EAE3D8] p-[40px]">
          <span aria-hidden className="text-[54px] font-bold leading-[0.8]" style={{ ...DISPLAY, color: BLUE }}>
            “
          </span>
          <figure>
            {/* LineByLine renders spans, so the blockquote stays as the
                semantic wrapper around it. */}
            <blockquote className="max-w-[492px]">
              <LineByLine
                text={NEXT_STEPS.quote.text}
                delay={0.12}
                className="text-[20px] font-medium leading-[1.4] text-[#1B1F24] md:text-[22px]"
                style={DISPLAY}
              />
            </blockquote>
            <figcaption className="mt-[16px] text-[13px] text-[#5F6670]" style={BODY}>
              {NEXT_STEPS.quote.source}
            </figcaption>
          </figure>
        </figure>
      </Reveal>
      <Reveal className="mt-6" distance={12}>
        <p className="max-w-[900px] text-[12px] leading-[1.55] text-[#5F6670]" style={BODY}>
          {NEXT_STEPS.disclaimer}
        </p>
      </Reveal>
    </section>
  );
}

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section data-index="More projects" data-tone="light" className="mx-auto w-full max-w-[1100px] px-6 pb-[90px] pt-[90px] lg:px-8">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5F6670]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#1B1F24] pb-[2px] text-[14px] font-semibold text-[#1B1F24]" style={BODY}>
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
          /* The card keeps its CSS hover lift; the motion wrapper only carries
             the entrance, so the two never fight over `transform`. */
          <motion.div key={n.title} variants={item}>
            <Link
              href={n.href}
              className="case-card group flex items-center gap-[20px] rounded-[18px] bg-[#FBF9F4] p-[14px]"
            >
              <span
                className="relative h-[110px] w-[150px] shrink-0 overflow-hidden rounded-[12px]"
                style={{ background: n.thumbDark ? "#231B1D" : "#E6DFD3" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={caseStudyThumb(n.href)}
                  alt={n.title}
                  className="absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-[6px] object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] text-[#5F6670]" style={BODY}>
                  {n.direction}
                </span>
                <span className="mt-[6px] block text-[22px] font-semibold leading-[1.55] text-[#1B1F24]" style={DISPLAY}>
                  {n.title}
                </span>
                <span className="block text-[14px] text-[#5F6670]" style={BODY}>
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
    <footer data-index="Contact" data-tone="dark" className="bg-[#141A21]">
      {/* One quiet rise for the whole row — a footer is a sign-off, not a
          section, and per-link entrances would overplay it. */}
      <Reveal distance={16}>
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-6 px-6 py-[56px] lg:px-8">
          <div>
            <p className="text-[32px] font-semibold tracking-[-0.32px] text-[#EEF1F4]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="case-link mt-[10px] inline-block border-b border-[#56606B] pb-[2px] text-[16px] text-[#C6CDD5]"
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
                className="case-link text-[14px] text-[#EEF1F4]"
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

export default function PausaCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <ProjectRuler />
      <Hero />
      <Facts />
      <Problem />
      <WhatIDid />
      <Research />
      <Conversation />
      <UxHifi />
      <KeyDecisions />
      <VisualVoice />
      <Hifi />
      <NextSteps />
      <MoreProjects />
      <Footer />
    </main>
  );
}
