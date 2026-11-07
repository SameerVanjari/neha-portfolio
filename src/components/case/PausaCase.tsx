"use client";

import Nav from "@/components/Nav";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  CALLOUTS,
  CONVERSATION,
  EMPATHY,
  FACTS,
  GLANCE,
  HIFI,
  HIFI_WEB,
  HERO,
  KEY_DECISIONS,
  NEIGHBORS,
  NEXT_STEPS,
  PROBLEM,
  RECORD,
  RESEARCH,
  UX_HIFI,
  VISUAL_VOICE,
  WHAT_I_DID,
} from "@/data/pausa";
import { recordDisplay, recordSans, recordSerif } from "@/components/case/pausa-fonts";
import { FOOTER_LINKS } from "@/data/landing";
import { EASE_OUT, LineByLine, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";
import { ProjectRuler } from "@/components/ProjectRuler";

/* ---------------------------------- tokens --------------------------------- */

const BLUE = "#2453A6";
const INK = "#1B2A4E";
const DARK = "#141B34";
const PAPER = "#F4F5FC";
const CARD = "#FFFFFF";
const HAIR = "#E3E7F6";

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
          style={{ ...BODY, color: onDark ? "#A9BDF4" : BLUE }}
        >
          {label}
        </p>
        <h2
          className={`mt-[13px] ${size === "lg" ? "text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.38px]" : "text-[24px] md:text-[28px] leading-[1.15] tracking-[-0.28px]"} ${onDark ? "text-[#EEF0FB]" : "text-[#1B2A4E]"}`}
          style={DISPLAY}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className={`max-w-[320px] pb-1 text-[14px] leading-[1.55] ${onDark ? "text-[#C3C9E6]" : "text-[#5E6781]"}`}
          style={BODY}
        >
          {note}
        </motion.p>
      )}
    </motion.div>
  );
}

/* --------------------------------- sections -------------------------------- */


function Hero() {
  const reduce = useMotionPref();
  // Held back until the preloader has cleared, so the entrance plays in front
  // of the viewer instead of running out unseen behind the overlay.
  const { stage } = useLoadStage();
  const { group, item } = heroMotion(!!reduce);

  return (
    <header className="bg-[#141B34]">
      <div className="mx-auto w-full max-w-[1100px] px-6 pb-[70px] pt-[60px] lg:px-8">
        <motion.div
          variants={group}
          initial="hidden"
          animate={stage === "loading" ? "hidden" : "visible"}
          className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between"
        >
          <motion.div variants={item} className="max-w-[556px]">
            <p className="text-[13px] font-bold text-[#A9BDF4]" style={BODY}>
              {HERO.eyebrow}
            </p>
            <h1
              className="mt-[26px] max-w-[451px] text-[clamp(40px,4.4vw,62px)] font-semibold leading-[1.04] tracking-[-1.24px] text-[#EEF0FB]"
              style={DISPLAY}
            >
              {HERO.title}
            </h1>
            <p className="mt-[24px] text-[19px] leading-[1.55] text-[#C3C9E6]" style={BODY}>
              {HERO.subtitle}
            </p>
            <motion.div
              variants={item}
              className="mt-[40px] border-l-[3px] pl-4"
              style={{ borderColor: "#A9BDF4" }}
            >
              <p className="text-[16px] text-[#EEF0FB]" style={BODY}>
                <span className="font-semibold">{HERO.role}</span>{" "}
                <span className="font-normal text-[#C3C9E6]">{HERO.roleTail}</span>
              </p>
              <p className="mt-[4px] text-[14px] text-[#9CA5CC]" style={BODY}>
                {HERO.roleNote}
              </p>
            </motion.div>
            <motion.a
              variants={item}
              href={HERO.cta.href}
              className="mt-[48px] inline-flex h-[46px] items-center rounded-[999px] bg-[#F5F6FC] px-[22px] text-[15px] font-semibold text-[#1B2A4E] transition-opacity hover:opacity-90"
              style={BODY}
            >
              {HERO.cta.label}
            </motion.a>
          </motion.div>
          <motion.div variants={item} className="relative mx-auto w-full max-w-[640px] shrink-0 lg:mx-0">
            <div className="relative w-full" style={{ aspectRatio: "640 / 455.758" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.devices.glow} alt="" aria-hidden className="pointer-events-none absolute select-none" style={{ left: 0, top: "6.58%", width: "100%", height: "96.54%" }} draggable={false} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.devices.floor} alt="" aria-hidden className="pointer-events-none absolute select-none" style={{ left: "5.39%", top: "71.82%", width: "89.22%", height: "10.97%" }} draggable={false} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.devices.laptopScreen} alt="" className="absolute rounded-[3px] object-cover" style={{ left: "10.91%", top: "4.68%", width: "75.15%", height: "65.96%" }} draggable={false} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.devices.laptopFrame} alt="Pausa web dashboard on a laptop, with the breathing loop on a phone" className="absolute inset-0 h-full w-full select-none" draggable={false} />
              <div className="absolute overflow-hidden" style={{ left: "72.12%", top: "31.06%", width: "20.91%", height: "63.62%", borderRadius: "14.5%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={HERO.devices.phoneScreen} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={HERO.devices.phoneGif} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.devices.phoneFrame} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full select-none" draggable={false} />
            </div>
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
    <section aria-label="At a glance" className="bg-[#0F1530]">
      <div className="mx-auto w-full max-w-[1100px] px-6 lg:px-8">
        <motion.ul
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {FACTS.map((fact) => (
            <motion.li
              key={fact.label}
              variants={item}
              className="even:border-l [&:nth-child(n+3)]:border-t lg:border-t-0 lg:[&:not(:first-child)]:border-l flex items-start gap-[12px] py-[22px] lg:px-4"
              style={{ borderColor: "#2A3358" }}
            >
              <Icon name={`icon-${fact.icon}`} size={20} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.44px] text-[#9CA5CC]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[4px] text-[15px] font-semibold leading-[1.55] text-[#EEF0FB]" style={BODY}>
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
          <motion.article key={card.title} variants={item} className="rounded-[18px] bg-[#FFFFFF] p-[26px]">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-[#E4E9FB]">
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[15px] text-[18px] font-semibold leading-[1.55] text-[#1B2A4E]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-[#5E6781]" style={BODY}>
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
          className="absolute left-0 right-0 top-[27px] hidden h-px bg-[#A9BDF4] lg:block"
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
          className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-7"
        >
          {WHAT_I_DID.steps.map((step) => (
            <motion.li key={step.title} variants={item} className="flex flex-col items-center gap-[12px] text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: BLUE }}>
                <Icon name={step.icon} size={20} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-[#1B2A4E]" style={DISPLAY}>
                  {step.title}
                </p>
                <p className="mx-auto mt-[4px] max-w-[160px] text-[13px] leading-[1.4] text-[#5E6781]" style={BODY}>
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
          <motion.div key={stat.label} variants={stats.item} className="rounded-[16px] bg-[#141B34] p-[22px] pb-[24px]">
            <p className="text-[30px] font-semibold leading-none text-[#EEF0FB]" style={DISPLAY}>
              {stat.num}
            </p>
            <p className="mt-[8px] text-[14px] leading-[1.55] text-[#C3C9E6]" style={BODY}>
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
        className="mt-[36px] rounded-[22px] bg-[#FFFFFF] px-7 py-2"
      >
        {RESEARCH.rows.map((row, i) => (
          <motion.div
            key={row.citation}
            variants={item}
            className="grid gap-4 py-[26px] lg:grid-cols-[511px_40px_1fr] lg:items-center lg:gap-[16px]"
            style={{ borderTop: i > 0 ? `1px solid ${HAIR}` : undefined }}
          >
            <div>
              <p className="text-[16px] leading-[1.55] text-[#1B2A4E]" style={BODY}>
                {row.finding}
              </p>
              <p className="mt-[6px] text-[13px] text-[#5E6781]" style={BODY}>
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
        <div className="mt-[36px] overflow-hidden rounded-[22px] bg-[#FFFFFF] p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CONVERSATION.flowImage}
            alt="Pausa conversation flow: welcome, sign up, check in, talk, breathe, try something, closure, and the escalation path to Support"
            className="w-full select-none"
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
              <p className="text-[14px] leading-[1.55]" style={{ ...BODY, color: warm ? "#5B4136" : "#C3C9E6" }}>
                {thumb.body}
              </p>
              <div className="flex items-center gap-[10px]">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[11px] text-[12px] font-semibold text-white" style={{ ...BODY, background: BLUE }}>
                  {thumb.num}
                </span>
                <p className="text-[14px] font-semibold" style={{ ...BODY, color: warm ? INK : "#EEF0FB" }}>
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
                    className="relative flex h-auto items-center justify-center rounded-[18px] p-[26px]"
                    style={{ background: light ? CARD : DARK, border: light ? `1px solid ${HAIR}` : undefined }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={panel.image}
                      alt={`${panel.tag} Pausa mood check-in`}
                      className="w-[230px] select-none"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </Reveal>
                <p className="text-[11px] tracking-[0.66px] text-[#5E6781]" style={BODY}>
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
          <motion.article key={card.title} variants={cards.item} className="rounded-[18px] bg-[#FFFFFF] p-[26px]">
            <h3 className="text-[18px] font-semibold leading-[1.55] text-[#1B2A4E]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-[#5E6781]" style={BODY}>
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
    <section className="mt-[90px] bg-[#141B34]">
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
              className="flex items-start gap-[24px] rounded-[20px] bg-[#1C2744] p-[26px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src={decision.art}
                width={104}
                height={104}
                alt=""
                aria-hidden
                draggable={false}
                className="shrink-0 select-none"
              />
              <div>
                <h3 className="text-[18px] font-semibold leading-[1.55] text-[#EEF0FB]" style={DISPLAY}>
                  {decision.title}
                </h3>
                <p className="mt-[5px] text-[14px] leading-[1.55] text-[#C3C9E6]" style={BODY}>
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
      <div data-index="Visual system">
      <Reveal distance={22}>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: BLUE }}>
          {VISUAL_VOICE.visual.label}
        </p>
        <h2 className="mt-[12px] text-[28px] font-semibold leading-[1.15] tracking-[-0.28px] text-[#1B2A4E]" style={DISPLAY}>
          {VISUAL_VOICE.visual.heading}
        </h2>
        <div className="mt-[26px] rounded-[18px] bg-[#141B34] p-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={VISUAL_VOICE.visual.webshot}
            alt="Pausa web dashboard: check-in, conversation, 7-day mood and a breathing card"
            className="w-full select-none"
            loading="lazy"
            draggable={false}
          />
        </div>
        <div className="mt-[16px] flex flex-wrap gap-[8px]">
          {VISUAL_VOICE.visual.chips.map((chip) => (
            <span key={chip} className="rounded-[999px] bg-[#E4E9FB] px-[12px] py-[6px] text-[12px] font-semibold text-[#2453A6]" style={BODY}>
              {chip}
            </span>
          ))}
        </div>
      </Reveal>
      </div>
      <div data-index="Voice">
      <Reveal delay={0.08} distance={22}>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: BLUE }}>
          {VISUAL_VOICE.voice.label}
        </p>
        <h2 className="mt-[12px] text-[28px] font-semibold leading-[1.15] tracking-[-0.28px] text-[#1B2A4E]" style={DISPLAY}>
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
      </div>
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
        <div className="mt-[36px] flex flex-wrap justify-center gap-x-6 gap-y-8">
          {HIFI.screens.map((screen) => (
            <figure key={screen.caption} className="w-[148px] sm:w-[188px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screen.image}
                alt={`Pausa ${screen.caption} screen`}
                width={188}
                height={407}
                loading="lazy"
                draggable={false}
                className="h-auto w-full select-none rounded-[22px] border border-[#E3E7F6] shadow-[0_10px_24px_rgba(61,79,161,0.14)]"
              />
              <figcaption className="mt-[8px] text-[12px] text-[#5E6781]" style={BODY}>
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
              <p className="text-[40px] font-semibold leading-none text-[#EEF0FB]" style={DISPLAY}>
                {stat.num}
              </p>
              <p className="mt-[14px] text-[13px]" style={{ ...BODY, color: blue ? "#C5CDEC" : "#C5CDEC" }}>
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
        <figure className="flex gap-[24px] rounded-[20px] bg-[#E7EAF6] p-[40px]">
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
                className="text-[20px] font-medium leading-[1.4] text-[#1B2A4E] md:text-[22px]"
                style={DISPLAY}
              />
            </blockquote>
            <figcaption className="mt-[16px] text-[13px] text-[#5E6781]" style={BODY}>
              {NEXT_STEPS.quote.source}
            </figcaption>
          </figure>
        </figure>
      </Reveal>
      <Reveal className="mt-6" distance={12}>
        <p className="max-w-[900px] text-[12px] leading-[1.55] text-[#5E6781]" style={BODY}>
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
        <p className="text-[12px] tracking-[1.2px] text-[#5E6781]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#1B2A4E] pb-[2px] text-[14px] font-semibold text-[#1B2A4E]" style={BODY}>
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
              className="case-card group flex items-center gap-[20px] rounded-[18px] bg-[#FFFFFF] p-[14px]"
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
                <span className="block text-[12px] text-[#5E6781]" style={BODY}>
                  {n.direction}
                </span>
                <span className="mt-[6px] block text-[22px] font-semibold leading-[1.55] text-[#1B2A4E]" style={DISPLAY}>
                  {n.title}
                </span>
                <span className="block text-[14px] text-[#5E6781]" style={BODY}>
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
    <footer data-index="Contact" data-tone="dark" className="bg-[#141B34]">
      {/* One quiet rise for the whole row — a footer is a sign-off, not a
          section, and per-link entrances would overplay it. */}
      <Reveal distance={16}>
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-6 px-6 py-[56px] lg:px-8">
          <div>
            <p className="text-[32px] font-semibold tracking-[-0.32px] text-[#EEF0FB]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="case-link mt-[10px] inline-block border-b border-[#56606B] pb-[2px] text-[16px] text-[#C3C9E6]"
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
                className="case-link text-[14px] text-[#EEF0FB]"
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

function Glance() {
  return (
    <section data-index="At a glance" className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <Reveal distance={24}>
        <div
          className="relative aspect-[1036/649] overflow-hidden rounded-[32px]"
          style={{ backgroundImage: "linear-gradient(140deg, #F2F2FC 0%, #E0E5FA 39%, #D1D6F7 71%)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GLANCE.glowA} alt="" aria-hidden className="pointer-events-none absolute select-none" style={{ left: "51.16%", top: "-32.36%", width: "67.57%", height: "92.45%" }} draggable={false} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GLANCE.glowB} alt="" aria-hidden className="pointer-events-none absolute select-none" style={{ left: "-24.13%", top: "44.68%", width: "67.57%", height: "89.37%" }} draggable={false} />
          <p
            className="absolute whitespace-pre-line text-[clamp(18px,3.3vw,34px)] font-semibold leading-[1.18] tracking-[-0.4px] text-[#1C4593]"
            style={{ ...DISPLAY, left: "4.63%", top: "6.78%" }}
          >
            {GLANCE.title}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GLANCE.web}
            alt="Pausa web dashboard"
            className="absolute rounded-[18px] object-cover shadow-[0_24px_50px_rgba(31,51,128,0.18)]"
            style={{ left: "4.25%", top: "23.11%", width: "56.95%", height: "56.86%" }}
            draggable={false}
          />
          <div className="absolute flex items-center justify-center" style={{ left: "56.47%", top: "16.02%", width: "25.5%", height: "79.02%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={GLANCE.checkin} alt="Pausa check-in on a phone" className="h-[97%] w-[87%] -rotate-4 rounded-[30px] object-cover shadow-[0_24px_48px_rgba(31,51,128,0.24)]" draggable={false} />
          </div>
          <div className="absolute flex items-center justify-center" style={{ left: "71.62%", top: "12.02%", width: "24.69%", height: "78.48%" }}>
            <div className="relative h-[97%] w-[90%] rotate-3 overflow-hidden rounded-[30px] shadow-[0_24px_48px_rgba(31,51,128,0.24)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={GLANCE.breathe} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={GLANCE.breatheGif} alt="Pausa box-breathing loop" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
            </div>
          </div>
          <div className="absolute flex flex-wrap gap-2" style={{ left: "4.25%", top: "83.36%", width: "50.7%" }}>
            {GLANCE.chips.map((chip) => (
              <span key={chip.label} className="inline-flex items-center gap-2 rounded-full bg-white/85 py-2 pl-3 pr-[13px] text-[13.5px] font-semibold text-[#1B2A4E] shadow-[0_4px_12px_rgba(31,51,128,0.08)]" style={BODY}>
                <span className="size-[9px] rounded-full" style={{ background: chip.dot }} />
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function TheRecord() {
  const display = { fontFamily: recordDisplay.style.fontFamily } as const;
  const sans = { fontFamily: recordSans.style.fontFamily } as const;
  const serif = { fontFamily: recordSerif.style.fontFamily } as const;
  const ink = "#1B2A4E";

  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <Reveal distance={22}>
        <article className="bg-[#F6F6FB] px-5 py-8 shadow-[0_18px_40px_rgba(41,31,10,0.12)] sm:px-10 sm:pt-[34px] sm:pb-[30px]">
          <header className="flex items-end justify-between gap-4 border-b border-[#1B2A4E] pb-1.5">
            <p className="max-w-[200px] text-[11px] font-medium leading-[16.5px] text-[#5E6781]" style={sans}>
              {RECORD.kickerLeft[0]}
              <br />
              {RECORD.kickerLeft[1]}
              <span className="italic">{RECORD.kickerLeft[2]}</span>
            </p>
            <h2 className="text-center text-[clamp(40px,6vw,64px)] font-black leading-none tracking-[-0.6px] text-[#1B2A4E]" style={display}>
              {RECORD.title}
            </h2>
            <p className="max-w-[200px] text-right text-[11px] font-medium leading-[16.5px] text-[#5E6781]" style={sans}>
              {RECORD.kickerRight[0]}
              <br />
              {RECORD.kickerRight[1]}
            </p>
          </header>
          <p className="flex justify-between gap-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.9px] text-[#1B2A4E]" style={sans}>
            {RECORD.dateline.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
          <div className="mb-4 flex flex-col gap-0.5" aria-hidden>
            <span className="h-px bg-[#1B2A4E]" />
            <span className="h-px bg-[#1B2A4E]" />
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.55fr_375px]">
            <div className="lg:border-r lg:border-[#1B2A4E] lg:pr-6">
              <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#2453A6]" style={sans}>{RECORD.leadKicker}</p>
              <h3 className="mt-2.5 text-[clamp(32px,4vw,44px)] font-black leading-[1.05] tracking-[-0.4px] text-[#1B2A4E]" style={display}>{RECORD.leadTitle}</h3>
              <p className="mt-2.5 text-[19px] font-bold italic leading-[1.35] text-[#33405F]" style={display}>{RECORD.leadDeck}</p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 sm:gap-[22px]">
                {RECORD.leadColumns.map((column, i) => (
                  <p key={column.slice(0, 12)} className="text-[14.5px] leading-[22.5px] text-[#1B2A4E] sm:border-l sm:border-[#D5DAEC] sm:pl-[22px] sm:first:border-0 sm:first:pl-0" style={serif}>
                    {i === 0 ? <span className="font-black" style={display}>The</span> : null}
                    {i === 0 ? column.slice(3) : column}
                  </p>
                ))}
              </div>
              <p className="mt-3 text-[10.5px] font-medium tracking-[0.4px] text-[#5E6781]" style={sans}>{RECORD.leadCite}</p>
            </div>
            <aside>
              <div className="border-2 border-[#1B2A4E] bg-white/35 px-4 pb-4 pt-3.5">
                <span className="inline-block border border-[#1B2A4E] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[1px]" style={sans}>{RECORD.lawTag}</span>
                <h3 className="mt-2 text-[27px] font-black leading-[30px] text-[#1B2A4E]" style={display}>{RECORD.lawTitle}</h3>
                <p className="mt-2 text-[14px] leading-[21px]" style={{ ...serif, color: ink }}>{RECORD.lawBody}</p>
                <div className="mt-2.5 grid grid-cols-3 gap-3.5 border-t border-[#D5DAEC] pt-2.5">
                  {RECORD.lawStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[30px] font-bold leading-8 text-[#1B2A4E]" style={display}>{stat.num}</p>
                      <p className="text-[10.5px] font-medium uppercase tracking-[0.6px] text-[#5E6781]" style={sans}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="my-3.5 flex flex-col gap-0.5" aria-hidden>
                <span className="h-px bg-[#1B2A4E]" />
                <span className="h-px bg-[#1B2A4E]" />
              </div>
              <p className="text-[20px] font-bold italic leading-[26px] text-[#1B2A4E]" style={display}>{RECORD.pull}</p>
              <p className="mt-3 text-[10.5px] font-medium uppercase tracking-[0.6px] text-[#5E6781]" style={sans}>{RECORD.pullCite}</p>
            </aside>
          </div>
          <div className="mt-[18px] grid border-t border-[#1B2A4E] md:grid-cols-3">
            {RECORD.stories.map((story, i) => (
              <div key={story.tag} className={`py-3.5 ${i < 2 ? "md:border-r md:border-[#1B2A4E] md:pr-[18px]" : ""} ${i > 0 ? "md:pl-[18px]" : ""}`}>
                <span className="inline-block border border-[#1B2A4E] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[1px]" style={sans}>{story.tag}</span>
                <h3 className="mt-2 text-[22px] font-bold leading-[25.3px] text-[#1B2A4E]" style={display}>{story.title}</h3>
                <p className="mt-2 text-[13.8px] leading-[20.7px]" style={{ ...serif, color: ink }}>{story.body}</p>
                <p className="mt-2 text-[10.5px] font-medium tracking-[0.4px] text-[#5E6781]" style={sans}>{story.cite}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-5 bg-[#1B2A4E] px-[22px] py-[18px] text-[#F6F6FB] sm:grid-cols-[190px_1fr_1fr_1fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#A9BDF4]" style={sans}>So, in Pausa</p>
              <p className="mt-1 text-[24px] font-black leading-[26.4px]" style={display}>{RECORD.soTitle}</p>
            </div>
            {RECORD.so.map((item) => (
              <div key={item.label}>
                <p className="text-[10.5px] font-bold uppercase tracking-[1px] text-[#A9BDF4]" style={sans}>{item.label}</p>
                <p className="mt-1 text-[15px] leading-[21px]" style={serif}>{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] font-medium text-[#5E6781]" style={sans}>{RECORD.footer}</p>
        </article>
      </Reveal>
    </section>
  );
}

function EmpathyMaps() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={EMPATHY.label} heading={EMPATHY.heading} />
      <div className="mt-8 flex flex-col gap-8">
        {EMPATHY.people.map((person) => (
          <Reveal key={person.name} distance={20}>
            <div>
              <div className="mb-3 flex flex-wrap items-baseline gap-3">
                <h3 className="text-[20px] font-semibold text-[#1B2A4E]" style={DISPLAY}>{person.name}</h3>
                <p className="text-[17px] font-semibold text-[#2453A6]" style={BODY}>{person.quote}</p>
              </div>
              <div className="overflow-x-auto">
                <div className="relative h-[620px] w-[1036px] rounded-[22px] bg-white">
                  <span className="absolute left-[517.2px] top-5 h-[580px] w-[1.6px] bg-[rgba(27,42,78,0.75)]" />
                  <span className="absolute left-10 top-[309.2px] h-[1.6px] w-[956px] bg-[rgba(27,42,78,0.75)]" />
                  {person.quadrants.map((quadrant) => (
                    <div key={quadrant.key}>
                      <p className="absolute text-[18px] font-bold text-[#1B2A4E]" style={{ ...DISPLAY, left: quadrant.labelLeft, top: quadrant.labelTop }}>
                        {quadrant.label}
                      </p>
                      {quadrant.notes.map((note) => (
                        <div
                          key={note.text}
                          className="absolute flex items-center justify-center"
                          style={{ left: note.left, top: note.top, width: note.size, height: note.size }}
                        >
                          <p
                            className="flex size-[112px] items-center justify-center px-2.5 text-center text-[13.5px] font-semibold leading-[18px] text-[#1B2A4E] shadow-[0_5px_10px_rgba(26,31,51,0.14)]"
                            style={{ ...BODY, background: quadrant.color, borderRadius: 4, transform: `rotate(${note.rotate}deg)` }}
                          >
                            {note.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                  <img src={person.photo} alt="" width={150} height={150} className="absolute left-[443px] top-[235px] size-[150px] rounded-full object-cover shadow-[0_14px_34px_rgba(26,31,51,0.18)] ring-[8px] ring-white" draggable={false} />
                  <p className="absolute top-[376px] inline-flex items-center gap-1.5 rounded-full bg-[#2453A6] px-3.5 py-[7px] text-white" style={{ left: person.badgeLeft }}>
                    <span className="text-[14px] font-semibold" style={BODY}>{person.badge}</span>
                    <span className="text-[12.5px] text-[#DDE4FB]" style={BODY}>{person.meta}</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal distance={16} className="mt-5">
        <div className="rounded-[22px] bg-white px-7 pb-2 pt-[22px]">
          <p className="text-[11px] font-bold uppercase tracking-[1.32px] text-[#2453A6]" style={BODY}>{EMPATHY.changesLabel}</p>
          {EMPATHY.changes.map((row, i) => (
            <div key={row.from} className={`grid items-center gap-3 py-4 lg:grid-cols-[400px_23px_1fr] lg:gap-5 ${i < EMPATHY.changes.length - 1 ? "border-b border-[#E3E7F6]" : ""}`}>
              <p className="text-[16px] leading-6 text-[#1B2A4E]" style={BODY}>{row.from}</p>
              <span aria-hidden className="text-[20px] leading-none text-[#2453A6]">→</span>
              <p className="text-[16px] font-semibold leading-6 text-[#2453A6]" style={BODY}>{row.to}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function FeatureCallouts() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={CALLOUTS.label} heading={CALLOUTS.heading} note={CALLOUTS.note} />
      <div className="mt-9 overflow-x-auto">
        <div className="relative h-[1270px] w-[1036px]">
          {CALLOUTS.screens.map((screen) => {
            const left = screen.side === "left";
            const row = screen.caption === "Breathe" || screen.caption === "Support" ? 695 : 30;
            const screenLeft = left ? 244 : 542;
            return (
              <div key={screen.caption}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screen.image}
                  alt={`Pausa ${screen.caption} screen`}
                  width={250}
                  height={541}
                  className="absolute w-[250px] rounded-[26px] shadow-[0_14px_34px_rgba(61,79,161,0.16)]"
                  style={{ left: screenLeft, top: row }}
                  draggable={false}
                />
                <p className="absolute w-[250px] text-center text-[14px] text-[#5E6781]" style={{ ...BODY, left: screenLeft, top: row + 553 }}>
                  {screen.caption}
                </p>
                {screen.notes.map((note) => (
                  <div key={note.title} className="absolute w-[200px]" style={{ left: left ? 0 : 836, top: note.top }}>
                    <p className="text-[15px] font-semibold leading-[21px] text-[#1B2A4E]" style={BODY}>{note.title}</p>
                    <p className="mt-[3px] text-[13px] leading-[19px] text-[#5E6781]" style={BODY}>{note.body}</p>
                    <span aria-hidden className="absolute top-[7px] size-1.5 rounded-full bg-[#2453A6]" style={left ? { right: -11 } : { left: -11 }} />
                    <span aria-hidden className="absolute top-[9px] h-px bg-[#2453A6]" style={left ? { left: "100%", width: 56 } : { right: "100%", width: 56 }} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HifiWeb() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={HIFI_WEB.label} heading={HIFI_WEB.heading} note={HIFI_WEB.note} />
      <Reveal distance={20}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HIFI_WEB.image}
          alt="Pausa web today view: check-in, conversation, last 7 days and a breathing card"
          width={1036}
          height={648}
          className="mt-[14px] w-full rounded-[24px] shadow-[0_18px_44px_rgba(61,79,161,0.16)]"
          draggable={false}
        />
      </Reveal>
    </section>
  );
}

/* ---------------------------------- page ----------------------------------- */

export default function PausaCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav sticky />
      <ProjectRuler />
      <Hero />
      <Facts />
      <Glance />
      <Problem />
      <WhatIDid />
      <TheRecord />
      <Research />
      <EmpathyMaps />
      <Conversation />
      <UxHifi />
      <KeyDecisions />
      <VisualVoice />
      <Hifi />
      <FeatureCallouts />
      <HifiWeb />
      <NextSteps />
      <MoreProjects />
      <Footer />
    </main>
  );
}
