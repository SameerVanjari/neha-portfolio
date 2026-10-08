"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  DELIVERABLES,
  DEVICES,
  FACTS,
  HERO,
  MORE_PROJECTS,
  OVERVIEW,
  PROCESS,
  SPACES,
  SYSTEM,
} from "@/data/atrium";
import { EASE_OUT, Reveal, useStagger, useMotionPref } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";
import { ProjectRuler } from "@/components/ProjectRuler";

/* ---------------------------------- tokens ---------------------------------
   Sampled directly from the Figma frame (node 418:217). This case study has
   its own palette — teal and abyss on a cool blue-white paper — so it does
   not use the shared case-theme tokens. */

const PAPER = "#f2f5f6";
const INK = "#0b141b";
const TEAL = "#1f8a87";
const ABYSS = "#070c12";
const HERO_SLOT = "#17242e";
const CARD_DARK = "#0f1820";
const CARD_HUB = "#12333a";
const CARD_EDGE = "#2a4650";
const CHIP_LINE = "#dce4e7";

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

function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async"
      src={`/case/atrium/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${className ?? ""}`}
    />
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
      className={`${CONTENT} ${GUTTER} flex items-center justify-between py-[14px]`}
    >
      <Link href="/" className="shrink-0 text-[16px] font-semibold leading-[1.5] text-[#0b141b]" style={BODY}>
        Neha Mayacharya
      </Link>
      {/* Desktop row + a mobile-only contact pill: the links row is over 300px
          wide by itself, so at phone widths it must not render at all. */}
      <div className="hidden items-center gap-[30px] md:flex">
        <Link
          href="/projects"
          aria-current="page"
          className="border-b-[1.5px] border-[#0b141b] pb-[3px] text-[14px] font-normal leading-[1.5] text-[#0b141b]"
          style={BODY}
        >
          Work
        </Link>
        <Link href="/about" className="case-link text-[14px] leading-[1.5] text-[#0b141b]" style={BODY}>
          About
        </Link>
        <a href="/resume.pdf" className="case-link text-[14px] leading-[1.5] text-[#0b141b]" style={BODY}>
          Résumé (PDF)
        </a>
        <a
          href="#contact"
          className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#0b141b] px-5 text-[14px] font-semibold leading-[1.5] text-white"
          style={BODY}
        >
          Contact
        </a>
      </div>
      <a
        href="#contact"
        className="case-cta flex h-10 items-center justify-center rounded-[999px] bg-[#0b141b] px-5 text-[14px] font-semibold leading-[1.5] text-white md:hidden"
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
    <section className="relative h-[560px] overflow-hidden bg-[#070c12] lg:h-[760px]">
      {/* Hero image — the approved Atrium cover (neon-teal room and portal).
          The flat slot tone stays behind it as the base while the bitmap
          loads. */}
      <div className="absolute inset-0" style={{ background: HERO_SLOT }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="eager" fetchPriority="high"
        src={`/case/atrium/${HERO.figure}`}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Readability gradient: transparent through 35%, near-solid by 90%. */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(7,12,18,0) 35%, rgba(7,12,18,0.95) 90%)",
        }}
      />

      {/* NDA pill — anchored to the design's top-right gutter. */}
      <div
        className="absolute right-6 top-12 flex items-center gap-2 rounded-[999px] px-[18px] py-[9px] md:right-10 lg:right-[202px]"
        style={{ border: "1.2px solid #7fd8d3" }}
      >
        <Icon name="a-lock-pill" size={14} />
        <p className="text-[12px] font-semibold leading-[1.2] tracking-[1.68px] text-[#eaf6f8]" style={BODY}>
          {HERO.ndaPill}
        </p>
      </div>

      <motion.div
        variants={group}
        initial="hidden"
        // The hero is above the fold, so it animates on load rather than on
        // scroll. It stays hidden until the preloader releases, otherwise it
        // would play out unseen behind the gate.
        animate={stage === "loading" ? "hidden" : "visible"}
        className={`${CONTENT} ${GUTTER} relative flex flex-col items-start pb-16 pt-24 lg:pb-0 lg:pt-[423px]`}
      >
        <div className="flex w-full max-w-[760px] flex-col gap-[14px]">
          <motion.p
            variants={item}
            className="text-[13px] font-semibold leading-[1.5] tracking-[2.34px] text-[#5fd3cf]"
            style={BODY}
          >
            {HERO.eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            className="whitespace-nowrap text-[72px] font-bold leading-none tracking-[-3.12px] text-[#eaf6f8] md:text-[104px]"
            style={DISPLAY}
          >
            {HERO.title}
          </motion.h1>
          <motion.p variants={item} className="text-[20px] font-medium leading-[1.5] text-[#d7e7eb] md:text-[26px]" style={BODY}>
            {HERO.subtitle}
          </motion.p>
          <motion.div variants={item} className="flex flex-col gap-[2px] border-l-[3px] border-[#5fd3cf] pl-4 pt-[14px]">
            <p className="text-[15px] font-semibold leading-[1.5] text-[#eaf6f8]" style={BODY}>
              {HERO.role}
            </p>
            <p className="text-[14px] leading-[1.5] text-[#a3b6bd]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------- facts ---------------------------------- */

function Facts() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });
  return (
    <section className="w-full bg-[#050a0f]">
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
            className={`flex flex-1 items-start gap-3 pb-6 pt-[22px] md:px-5 ${i > 0 ? "border-t border-[#16232d] md:border-l md:border-t-0" : "pr-5"}`}
          >
            <Icon name={f.icon} size={20} />
            <div className="flex flex-col gap-[2px]">
              <p className="text-[11px] tracking-[0.44px] text-[#7f959e]" style={BODY}>
                {f.label.toUpperCase()}
              </p>
              <p className="w-[207px] text-[15px] font-semibold leading-[1.5] text-[#eaf6f8]" style={BODY}>
                {f.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- overview --------------------------------- */

function Overview() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#1f8a87]" style={BODY}>
          {OVERVIEW.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[760px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#0b141b] md:text-[38px]" style={DISPLAY}>
          {OVERVIEW.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-4 lg:flex-row">
        <motion.div variants={item} className="flex w-full flex-col gap-[14px] rounded-[20px] bg-white px-[30px] pb-[30px] pt-[28px] lg:w-[620px]">
          <p className="text-[17px] font-medium leading-[1.5] text-[#0b141b] md:text-[19px]" style={BODY}>
            {OVERVIEW.summaryLead}
          </p>
          <p className="text-[15px] leading-[1.6] text-[#56656e]" style={BODY}>
            {OVERVIEW.summaryBody}
          </p>
        </motion.div>
        <motion.div variants={item} className="flex w-full flex-col gap-3 rounded-[20px] bg-[#070c12] px-[28px] pb-[30px] pt-[28px] lg:w-[400px]">
          <div className="flex items-center gap-[10px]">
            <Icon name="a-lock-note" size={18} />
            <p className="text-[11px] font-bold leading-[1.5] tracking-[1.32px] text-[#5fd3cf]" style={BODY}>
              {OVERVIEW.ndaLabel}
            </p>
          </div>
          <p className="text-[18px] font-medium leading-[1.4] text-[#eaf6f8] md:text-[20px]" style={BODY}>
            {OVERVIEW.ndaLead}
          </p>
          <p className="text-[15px] leading-[1.5] text-[#a3b6bd]" style={BODY}>
            {OVERVIEW.ndaBody}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* --------------------------------- process ---------------------------------- */

function Process() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.06 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#1f8a87]" style={BODY}>
          {PROCESS.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[820px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#0b141b] md:text-[38px]" style={DISPLAY}>
          {PROCESS.heading}
        </h2>
      </Reveal>

      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0"
      >
        {/* The connector between dot centres — behind the dots. */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-[28px] hidden h-px bg-[#7fd8d3] lg:block"
          style={{ left: "8.33%", right: "8.33%" }}
        />
        {PROCESS.steps.map((step) => (
          <motion.div variants={item} key={step.num} className="flex min-w-0 flex-col items-center gap-1 px-[6px] text-center">
            <div className="pb-[10px]">
              <div
                className="flex size-[56px] items-center justify-center rounded-[999px]"
                style={{ background: step.dark ? ABYSS : TEAL }}
              >
                <Icon name={step.icon} size={20} />
              </div>
            </div>
            <p className="text-[10px] font-bold leading-[1.5] tracking-[1px] text-[#1f8a87]" style={BODY}>
              {step.num}
            </p>
            <p className="text-[15px] font-semibold leading-[1.5] text-[#0b141b]" style={DISPLAY}>
              {step.title}
            </p>
            <p className="text-[13px] leading-[1.4] text-[#56656e]" style={BODY}>
              {step.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* --------------------------------- spaces ----------------------------------- */

function Spaces() {
  const { item } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="flex flex-wrap items-end justify-between gap-6 pb-9">
        <div className="max-w-[560px]">
          <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#1f8a87]" style={BODY}>
            {SPACES.eyebrow}
          </p>
          <h2 className="mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#0b141b] md:text-[38px]" style={DISPLAY}>
            {SPACES.heading}
          </h2>
        </div>
        <p className="max-w-[340px] text-right text-[14px] leading-[1.5] text-[#56656e]" style={BODY}>
          {SPACES.note}
        </p>
      </Reveal>

      <Reveal distance={22}>
        {/* Desktop reproduces the design's diagram positions — the hub top
            centre, the three rooms along the bottom, flow lines between.
            Below `lg` the four cards stack with the hub first. */}
        <div className="relative w-full overflow-hidden rounded-[22px] bg-[#070c12] lg:h-[470px]">
          {/* Flow lines, drawn under the cards. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src="/case/atrium/a-flow-lines.svg"
            alt=""
            aria-hidden
            draggable={false}
            className="hidden bg-[#070c12] lg:absolute lg:left-[173px] lg:top-[190px] lg:block lg:h-[110px] lg:w-[690px]"
          />

          {/* Hub — top centre on desktop, first card on mobile. */}
          <div
            className="flex flex-col gap-2 rounded-[16px] px-[22px] pb-[22px] pt-5 mb-4 lg:mb-0 lg:absolute lg:left-[368px] lg:top-[40px] lg:m-0 lg:h-[150px] lg:w-[300px]"
            style={{ background: CARD_HUB, border: "1.5px solid #5fd3cf" }}
          >
            <div className="flex items-center gap-[10px]">
              <Icon name={SPACES.hub.icon} size={20} />
              <p className="text-[18px] font-semibold leading-[1.5] text-[#eaf6f8]" style={DISPLAY}>
                {SPACES.hub.title}
              </p>
            </div>
            <p className="text-[13px] leading-[1.5] text-[#a3b6bd]" style={BODY}>
              {SPACES.hub.body}
            </p>
          </div>

          {/* The three rooms, bottom row on desktop. Design offsets: 48, 393, 738. */}
          <div className="grid gap-4 sm:grid-cols-3">
            {SPACES.rooms.map((room, i) => (
              <motion.div
                variants={item}
                key={room.title}
                className="flex flex-col gap-2 rounded-[16px] px-[22px] pb-[22px] pt-5 lg:absolute lg:h-[130px] lg:w-[250px]"
                style={{ background: CARD_DARK, border: `1px solid ${CARD_EDGE}`, left: i === 0 ? 48 : i === 1 ? 393 : 738, top: 300 }}
              >
                <div className="flex items-center gap-[10px]">
                  <Icon name={room.icon} size={20} />
                  <p className="text-[18px] font-semibold leading-[1.5] text-[#eaf6f8]" style={DISPLAY}>
                    {room.title}
                  </p>
                </div>
                <p className="text-[13px] leading-[1.5] text-[#a3b6bd]" style={BODY}>
                  {room.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------- devices dark band -------------------------- */

function DeviceRow({ label }: { label: string }) {
  return (
    <div className="flex w-full items-center gap-3 border-t border-[#24404a] pt-3">
      <Icon name="a-icon-check" size={18} />
      <p className="text-[17px] font-medium leading-[1.5] text-[#eaf6f8]" style={BODY}>
        {label}
      </p>
    </div>
  );
}

function Devices() {
  const { group, item, viewport } = useStagger({ distance: 20, step: 0.09 });
  return (
    <section className="w-full pt-24">
      <div className="w-full bg-[#070c12]">
        <div className={`${CONTENT} ${GUTTER} py-24`}>
          <div className="flex flex-wrap items-end justify-between gap-6 pb-9">
            <div className="max-w-[620px]">
              <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#5fd3cf]" style={BODY}>
                {DEVICES.eyebrow}
              </p>
              <h2 className="mt-[14px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#eaf6f8] md:text-[38px]" style={DISPLAY}>
                {DEVICES.heading}
              </h2>
            </div>
            <p className="max-w-[340px] text-right text-[14px] leading-[1.5] text-[#a3b6bd]" style={BODY}>
              {DEVICES.note}
            </p>
          </div>

          <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 lg:grid-cols-2">
            <motion.div variants={item} className="flex flex-col gap-[14px] rounded-[20px] bg-[#0f1820] px-[30px] pb-[30px] pt-[28px]">
              <div className="flex items-center gap-[14px]">
                <div className="flex size-[46px] items-center justify-center rounded-[12px] bg-[#16232d]">
                  <Icon name={DEVICES.mobile.icon} size={20} />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[22px] font-semibold leading-[1.5] text-[#eaf6f8]" style={DISPLAY}>
                    {DEVICES.mobile.title}
                  </p>
                  <p className="text-[14px] leading-[1.5] text-[#a3b6bd]" style={BODY}>
                    {DEVICES.mobile.sub}
                  </p>
                </div>
              </div>
              {DEVICES.mobile.items.map((label) => (
                <DeviceRow key={label} label={label} />
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-col gap-[14px] rounded-[20px] bg-[#12333a] px-[30px] pb-[30px] pt-[28px]"
              style={{ border: "1px solid rgba(95,211,207,0.6)" }}
            >
              <div className="flex items-center gap-[14px]">
                <div className="flex size-[46px] items-center justify-center rounded-[12px] bg-[#16232d]">
                  <Icon name={DEVICES.vr.icon} size={20} />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[22px] font-semibold leading-[1.5] text-[#eaf6f8]" style={DISPLAY}>
                    {DEVICES.vr.title}
                  </p>
                  <p className="text-[14px] leading-[1.5] text-[#a3b6bd]" style={BODY}>
                    {DEVICES.vr.sub}
                  </p>
                </div>
              </div>
              {DEVICES.vr.items.map((label) => (
                <DeviceRow key={label} label={label} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- interaction system --------------------------- */

function System() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#1f8a87]" style={BODY}>
          {SYSTEM.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[820px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#0b141b] md:text-[38px]" style={DISPLAY}>
          {SYSTEM.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 lg:grid-cols-2">
        {SYSTEM.cards.map((card) => (
          <motion.div variants={item} key={card.title} className="flex items-start gap-[18px] rounded-[18px] bg-white px-6 pb-6 pt-[22px]">
            <div className="flex size-[46px] shrink-0 items-center justify-center rounded-[12px] bg-[#e2f1f0]">
              <Icon name={card.icon} size={20} />
            </div>
            <div className="flex flex-col gap-[6px]">
              <p className="text-[19px] font-semibold leading-[1.5] text-[#0b141b]" style={DISPLAY}>
                {card.title}
              </p>
              <p className="text-[14px] leading-[1.5] text-[#56656e]" style={BODY}>
                {card.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ------------------------------- deliverables ------------------------------- */

function Deliverables() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.035 });
  return (
    <section className={`${CONTENT} ${GUTTER} pt-24`}>
      <Reveal distance={16} className="pb-9">
        <p className="text-[11px] font-bold uppercase leading-[1.5] tracking-[1.32px] text-[#1f8a87]" style={BODY}>
          {DELIVERABLES.eyebrow}
        </p>
        <h2 className="mt-[14px] max-w-[760px] text-[26px] font-semibold leading-[1.15] tracking-[-0.38px] text-[#0b141b] md:text-[38px]" style={DISPLAY}>
          {DELIVERABLES.heading}
        </h2>
      </Reveal>

      <motion.div variants={group} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-wrap content-start gap-x-2 gap-y-[10px] lg:w-[1036px]">
        {DELIVERABLES.chips.map((chip) => (
          <motion.div
            variants={item}
            key={chip.label}
            className="flex items-center rounded-[999px] border px-4 py-[10px]"
            style={
              chip.lead
                ? { background: ABYSS, borderColor: ABYSS, color: "#eaf6f8" }
                : { background: "#ffffff", borderColor: CHIP_LINE, color: INK }
            }
          >
            <p className="whitespace-nowrap text-[14px] font-medium leading-[1.5]" style={BODY}>
              {chip.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <Reveal distance={18} className="pt-[28px]">
        <div className="flex w-full flex-col items-start gap-5 rounded-[20px] bg-[#1f8a87] px-8 py-[26px] md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-col gap-1">
            <p className="text-[24px] font-semibold leading-[1.5] text-white" style={DISPLAY}>
              {DELIVERABLES.ctaTitle}
            </p>
            <p className="max-w-[640px] text-[15px] leading-[1.5] text-[#d8f1ef]" style={BODY}>
              {DELIVERABLES.ctaBody}
            </p>
          </div>
          <a
            href="#contact"
            className="case-cta flex h-[46px] shrink-0 items-center justify-center rounded-[999px] bg-white px-[22px] text-[15px] font-semibold leading-[1.5] text-[#0b141b]"
            style={BODY}
          >
            {DELIVERABLES.ctaButton}
          </a>
        </div>
      </Reveal>

      <Reveal distance={0} className="pt-[22px]">
        <p className="w-full max-w-[1036px] text-[12px] leading-[1.5] text-[#56656e]" style={BODY}>
          {DELIVERABLES.note}
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------ more projects ------------------------------- */

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });
  return (
    <section data-index="More projects" data-tone="light" className={`${CONTENT} ${GUTTER} flex flex-col gap-[18px] pb-[90px] pt-[110px]`}>
      <div className="flex w-full items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#56656e]" style={BODY}>
          {MORE_PROJECTS.label}
        </p>
        <Link
          href="/projects"
          className="case-link border-b-[1.5px] border-[#0b141b] pb-[2px] text-[14px] font-semibold leading-[1.5] text-[#0b141b]"
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
                className="relative flex h-[110px] w-[150px] shrink-0 items-end overflow-hidden rounded-[12px] pl-2 pb-2"
                style={{ background: c.thumbBg }}
              >
                {caseStudyThumb(c.href) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={caseStudyThumb(c.href)}
                    alt={c.title}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  // The Figma's placeholder frame: label on the tint.
                  <span aria-hidden className="text-[11px] leading-[1.5]" style={{ ...BODY, color: c.thumbLabel }}>
                    [Thumbnail]
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[12px] leading-[1.5] text-[#56656e]" style={BODY}>
                  {c.kicker}
                </p>
                <p className="text-[22px] font-semibold leading-[1.2] text-[#0b141b]" style={DISPLAY}>
                  {c.title}
                </p>
                <p className="max-w-[300px] text-[14px] leading-[1.5] text-[#56656e]" style={BODY}>
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
    <footer data-index="Contact" data-tone="dark" id="contact" className="w-full bg-[#070c12]">
      <div className={`${CONTENT} ${GUTTER} flex flex-col gap-8 pb-16 pt-14 md:flex-row md:items-center md:justify-between`}>
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-semibold leading-[1.15] text-[#eaf6f8]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="case-link border-b border-[#24404a] pb-[2px] text-[16px] leading-[1.5] text-[#b9c9cf]"
            style={BODY}
          >
            nmayacharya@gmail.com
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-[26px] text-[14px] leading-[1.5] text-[#eaf6f8]" style={BODY}>
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

export default function AtriumCase() {
  return (
    <main style={{ background: PAPER }}>
      <ProjectRuler />
      <Nav />
      <Hero />
      <Facts />
      <Overview />
      <Process />
      <Spaces />
      <Devices />
      <System />
      <Deliverables />
      <MoreProjects />
      <Footer />
    </main>
  );
}
