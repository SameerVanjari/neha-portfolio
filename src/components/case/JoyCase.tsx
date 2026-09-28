"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import {
  APPROACH,
  BRIEF,
  COMMUNITY_ISLAND,
  CONTENT_ISLAND,
  FACTS,
  HERO,
  ISLANDS_HEAD,
  NEIGHBORS,
  OUTCOME,
  PERSONAL_ISLAND,
  PHILOSOPHY,
  ROLE,
  STARTING_ISLAND,
} from "@/data/joy";
import { FOOTER_LINKS } from "@/data/landing";
import { EASE_OUT, Reveal, useMotionPref, useStagger } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";

/* ---------------------------------- tokens --------------------------------- */

const DARK = "#0F2422";
const FAINT_DARK = "#0A1B19";
const TEAL = "#0E8C7E";
const MINT = "#7FD6C8";
const TILE_MINT = "#DDF1EC";
const PAPER = "#F3F6F5";
const HAIR_LIGHT = "#1F3835";
const DIVIDER = "#DFE6E3";

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

function SectionHead({ eyebrow, heading, note }: { eyebrow: string; heading: string; note?: string }) {
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
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.38px] text-[#172422]"
          style={DISPLAY}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className="max-w-[340px] pt-[24px] text-[14px] leading-[1.5] text-[#5A6866]"
          style={BODY}
        >
          {note}
        </motion.p>
      )}
    </motion.div>
  );
}

function Icon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/case/joy/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}

function Check({ size = 16 }: { size?: number }) {
  return <Icon name="icon-check" size={size} className="shrink-0" />;
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
        <Link href="/" className="text-[16px] font-semibold text-[#172422]" style={DISPLAY}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#172422] pb-[3px] text-[14px] text-[#172422]">
            Work
          </Link>
          <Link href="/about" className="text-[14px] text-[#172422] transition-opacity duration-200 hover:opacity-70">
            About
          </Link>
          <a href="/resume.pdf" className="text-[14px] text-[#172422] transition-opacity duration-200 hover:opacity-70">
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] bg-[#172422] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98]"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] bg-[#172422] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] md:hidden"
          style={BODY}
        >
          Contact
        </Link>
      </div>
    </motion.header>
  );
}

/* --------------------------------- sections --------------------------------- */

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useMotionPref();
  const ready = useMotionReady();
  // The hero is above the fold, so it animates on load rather than on scroll.
  // It stays hidden until the preloader releases, otherwise it would play out
  // unseen behind the gate.
  const { stage } = useLoadStage();
  const { group, item } = heroMotion(!ready ? "pending" : !!reduce);
  // The world reel is decorative and loops for the whole session, so it pauses
  // once the hero leaves the viewport — and never starts for reduced-motion
  // visitors, who keep the first frame.
  const reducedMotion = ready && !!reduce;
  const heroInView = useInView(heroRef, { margin: "100px" });
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
      return;
    }
    if (heroInView) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [heroInView, reducedMotion]);

  return (
    <section ref={heroRef} className="relative overflow-hidden" style={{ background: DARK }}>
      {/* Background video: the Made for Joy world reel */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/made-for-joy.mp4"
        muted
        loop
        playsInline
        autoPlay={false}
        preload="metadata"
        aria-hidden
      />
      {/* Readability scrim (design geometry, no image) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(15,36,34,0.92) 0%, rgba(15,36,34,0.55) 45%, rgba(15,36,34,0.05) 75%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1036px] px-6 py-[70px] md:py-[110px] lg:px-0">
        <motion.div
          variants={group}
          initial="hidden"
          animate={stage === "loading" ? "hidden" : "visible"}
          className="max-w-[600px]"
        >
          <motion.div variants={item}>
          <p className="text-[13px] font-semibold" style={{ ...BODY, color: MINT }}>
            {HERO.eyebrow}
          </p>
          <h1
            className="mt-[18px] text-[clamp(40px,4.4vw,60px)] font-semibold leading-[1.04] tracking-[-1.2px] text-[#EEF4F3]"
            style={DISPLAY}
          >
            {HERO.title}
          </h1>
          <p className="mt-[24px] max-w-[560px] text-[19px] leading-[1.5] text-[#BFD0CD]" style={BODY}>
            {HERO.subtitle}
          </p>
          </motion.div>
          <motion.div variants={item} className="mt-[36px] border-l-2 pl-4" style={{ borderColor: MINT }}>
            <p className="text-[16px] text-[#BFD0CD]" style={BODY}>
              {HERO.role}
            </p>
            <p className="mt-[2px] text-[14px] text-[#8FA6A2]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>
          {/* The CTA is a static badge, not a link — so it joins the entrance
              but carries no hover or press feedback. */}
          <motion.span
            variants={item}
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold text-[#172422]"
            style={{ ...BODY, background: PAPER }}
          >
            {HERO.cta}
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

function Facts() {
  // A tight band of metadata: the four facts assemble in one beat rather than
  // each getting its own moment.
  const { group, item, viewport } = useStagger({ distance: 12, step: 0.05 });

  return (
    <section aria-label="At a glance" style={{ background: FAINT_DARK }}>
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
              style={{ borderLeft: i > 0 ? `1px solid ${HAIR_LIGHT}` : undefined }}
            >
              <Icon name={fact.icon} size={20} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[11px] tracking-[0.44px] text-[#8FA6A2]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#EEF4F3]" style={BODY}>
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

function BriefChallenge() {
  const { group, item, viewport } = useStagger({ distance: 14, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} note={BRIEF.note} />
      <div className="grid gap-[18px] lg:grid-cols-[400px_1fr]">
        <Reveal distance={20}>
          <article className="rounded-[18px] p-[30px]" style={{ background: DARK }}>
          <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: MINT }}>
            {BRIEF.briefCard.eyebrow}
          </p>
          <p className="mt-[14px] max-w-[340px] text-[26px] font-medium leading-[1.3] text-[#EEF4F3]" style={DISPLAY}>
            {BRIEF.briefCard.statement}
          </p>
            <p className="mt-[14px] text-[13px] text-[#AFC2BF]" style={BODY}>
              {BRIEF.briefCard.collaborators}
            </p>
          </article>
        </Reveal>
        <motion.ol
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-[10px]"
        >
          {BRIEF.challenges.map((text, i) => (
            <motion.li
              key={text}
              variants={item}
              className="flex flex-1 items-center gap-[22px] rounded-[14px] bg-white px-[22px] py-[18px]"
            >
              <span className="text-[22px] font-semibold leading-none" style={{ ...DISPLAY, color: TEAL }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[16px] font-medium leading-[1.5] text-[#172422]" style={BODY}>
                {text}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function MyRole() {
  // The four steps are a sequence, so they arrive in order — the argument is
  // chronological and the motion says so before the copy does.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  const tiles = useStagger({ distance: 14, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={ROLE.eyebrow} heading={ROLE.heading} note={ROLE.note} />
      <div className="relative">
        {/* The connector draws itself in, so the row reads as one linked
            process rather than four separate badges. */}
        <motion.div
          aria-hidden
          className="absolute left-[86px] right-[86px] top-[28px] hidden h-px bg-[#7FD6C8] lg:block"
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
          className="relative grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
        >
          {ROLE.steps.map((step) => (
            <motion.li key={step.title} variants={item} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: TEAL }}>
                <Icon name={step.icon} size={20} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-[#172422]" style={DISPLAY}>
                  {step.title}
                </p>
                <p className="mx-auto mt-[2px] max-w-[247px] text-[13px] leading-[1.4] text-[#5A6866]" style={BODY}>
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
        {ROLE.tiles.map((tile) => (
          <motion.div
            key={tile.num}
            variants={tiles.item}
            className="rounded-[18px] p-[24px]"
            style={{ background: tile.tone === "teal" ? TEAL : DARK }}
          >
            <p className="text-[30px] font-semibold leading-none text-[#EEF4F3]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-[12px] text-[14px] leading-[1.5] text-[#CFE0DD]" style={BODY}>
              {tile.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function DesignApproach() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  const boards = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={APPROACH.eyebrow} heading={APPROACH.heading} note={APPROACH.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-3"
      >
        {APPROACH.cards.map((card) => (
          <motion.article
            key={card.title}
            variants={item}
            className="rounded-[18px] bg-white p-6"
          >
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: TILE_MINT }}>
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5] text-[#172422]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.5] text-[#5A6866]" style={BODY}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
      <p className="mt-[28px] text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
        {APPROACH.storyboardEyebrow}
      </p>
      <motion.div
        variants={boards.group}
        initial="hidden"
        whileInView="visible"
        viewport={boards.viewport}
        className="mt-[14px] grid gap-4 md:grid-cols-3"
      >
        {APPROACH.boards.map((board) => (
          <motion.div key={board.src} variants={boards.item} className="aspect-[112/100] w-full overflow-hidden rounded-[14px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={board.src} alt={board.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Philosophy() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={PHILOSOPHY.eyebrow} heading={PHILOSOPHY.heading} />
      <Reveal distance={22}>
        <div className="rounded-[18px] px-6 py-[28px] text-center md:py-[32px]" style={{ background: TEAL }}>
          <p className="mx-auto max-w-[454px] text-[26px] font-medium leading-[1.5] text-white md:text-[30px]" style={DISPLAY}>
            {PHILOSOPHY.principle}
          </p>
        </div>
      </Reveal>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-[16px] grid gap-4 md:grid-cols-3"
      >
        {PHILOSOPHY.values.map((value) => (
          <motion.article
            key={value.title}
            variants={item}
            className="rounded-[18px] bg-white p-6"
          >
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: value.tile }}>
              <Icon name={value.icon} size={20} />
            </span>
            <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5] text-[#172422]" style={DISPLAY}>
              {value.title}
            </h3>
            <p className="text-[14px] leading-[1.5] text-[#5A6866]" style={BODY}>
              {value.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
      <p className="mt-[28px] text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
        {PHILOSOPHY.treeEyebrow}
      </p>
      <Reveal distance={24} className="mt-[14px] aspect-[1036/253] w-full overflow-hidden rounded-[16px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={PHILOSOPHY.treeImage.src} alt={PHILOSOPHY.treeImage.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
      </Reveal>
    </section>
  );
}

function IslandBlock({
  eyebrow,
  title,
  desc,
  features,
  boards,
  bordered,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  features: readonly string[];
  boards: readonly { src: string; alt: string }[];
  bordered?: boolean;
}) {
  // Each island's checklist and boards arrive in order — the features explain
  // the island, so they land before its imagery.
  const featuresMotion = useStagger({ distance: 12, step: 0.05 });
  const boardsMotion = useStagger({ distance: 18, step: 0.07 });

  return (
    <article
      className="grid gap-6 py-8 lg:grid-cols-[300px_1fr] lg:gap-[28px] lg:py-10"
      style={bordered ? { borderTop: `1px solid ${DIVIDER}` } : undefined}
    >
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
          {eyebrow}
        </p>
        <h3 className="mt-[10px] text-[22px] font-semibold leading-[1.2] text-[#172422]" style={DISPLAY}>
          {title}
        </h3>
        <p className="mt-[10px] text-[14px] leading-[1.5] text-[#5A6866]" style={BODY}>
          {desc}
        </p>
        <motion.ul
          variants={featuresMotion.group}
          initial="hidden"
          whileInView="visible"
          viewport={featuresMotion.viewport}
          className="mt-[26px] flex flex-col gap-[14px]"
        >
          {features.map((f) => (
            <motion.li key={f} variants={featuresMotion.item} className="flex items-start gap-[8px]">
              <Check />
              <p className="text-[13px] leading-[1.5] text-[#172422]" style={BODY}>
                {f}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      {boards.length === 1 ? (
        <Reveal distance={20} className="aspect-[708/250] w-full overflow-hidden rounded-[12px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={boards[0].src} alt={boards[0].alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
        </Reveal>
      ) : (
        <motion.div
          variants={boardsMotion.group}
          initial="hidden"
          whileInView="visible"
          viewport={boardsMotion.viewport}
          className={`grid gap-4 ${boards.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
        >
          {boards.map((board) => (
            <motion.div key={board.src} variants={boardsMotion.item} className="aspect-[228/200] w-full overflow-hidden rounded-[12px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={board.src} alt={board.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </article>
  );
}

function Islands() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={ISLANDS_HEAD.eyebrow} heading={ISLANDS_HEAD.heading} note={ISLANDS_HEAD.note} />
      <IslandBlock
        eyebrow={STARTING_ISLAND.eyebrow}
        title={STARTING_ISLAND.title}
        desc={STARTING_ISLAND.desc}
        features={STARTING_ISLAND.features}
        boards={STARTING_ISLAND.boards}
      />
      <IslandBlock
        eyebrow={CONTENT_ISLAND.eyebrow}
        title={CONTENT_ISLAND.title}
        desc={CONTENT_ISLAND.desc}
        features={CONTENT_ISLAND.features}
        boards={CONTENT_ISLAND.boards}
        bordered
      />
      <IslandBlock
        eyebrow={PERSONAL_ISLAND.eyebrow}
        title={PERSONAL_ISLAND.title}
        desc={PERSONAL_ISLAND.desc}
        features={PERSONAL_ISLAND.features}
        boards={PERSONAL_ISLAND.boards}
        bordered
      />
      <IslandBlock
        eyebrow={COMMUNITY_ISLAND.eyebrow}
        title={COMMUNITY_ISLAND.title}
        desc={COMMUNITY_ISLAND.desc}
        features={COMMUNITY_ISLAND.features}
        boards={COMMUNITY_ISLAND.boards}
        bordered
      />
    </section>
  );
}

function Outcome() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  const engine = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={OUTCOME.eyebrow} heading={OUTCOME.heading} />
      <Reveal distance={20}>
        <div className="rounded-[18px] px-6 py-[30px] md:px-9" style={{ background: TEAL }}>
          <p className="mx-auto max-w-[964px] text-[19px] font-medium leading-[1.5] text-white" style={DISPLAY}>
            {OUTCOME.statement}
          </p>
        </div>
      </Reveal>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-4 grid gap-4 md:grid-cols-3"
      >
        {OUTCOME.tiles.map((tile) => (
          <motion.div
            key={tile.num}
            variants={item}
            className="rounded-[18px] p-6"
            style={{ background: DARK }}
          >
            <p className="text-[28px] font-semibold leading-none text-[#EEF4F3]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-[12px] text-[14px] leading-[1.5] text-[#CFE0DD]" style={BODY}>
              {tile.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-[28px] text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: TEAL }}>
        {OUTCOME.inEngineEyebrow}
      </p>
      <motion.div
        variants={engine.group}
        initial="hidden"
        whileInView="visible"
        viewport={engine.viewport}
        className="mt-[14px] grid gap-4 md:grid-cols-2"
      >
        {OUTCOME.inEngineBoards.map((board) => (
          <motion.div key={board.src} variants={engine.item} className="aspect-[510/208] w-full overflow-hidden rounded-[14px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={board.src} alt={board.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-6 max-w-[900px] text-[12px] leading-[1.5] text-[#5A6866]" style={BODY}>
        {OUTCOME.credit}
      </p>
    </section>
  );
}

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[90px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5A6866]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#172422] pb-[2px] text-[14px] font-semibold text-[#172422] transition-opacity duration-200 hover:opacity-70" style={BODY}>
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
              <span className="block text-[12px] text-[#5A6866]" style={BODY}>
                {n.direction}
              </span>
              <span className="mt-[6px] block text-[22px] font-semibold leading-[1.2] text-[#172422]" style={DISPLAY}>
                {n.title}
              </span>
              <span className="mt-[6px] block truncate text-[14px] text-[#5A6866]" style={BODY}>
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
            <p className="text-[32px] font-semibold text-[#EEF4F3]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#BFD0CD] transition-opacity duration-200 hover:opacity-80"
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
                className="text-[14px] text-[#EEF4F3] transition-opacity duration-200 hover:opacity-80"
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

export default function JoyCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <BriefChallenge />
      <MyRole />
      <DesignApproach />
      <Philosophy />
      <Islands />
      <Outcome />
      <MoreProjects />
      <Footer />
    </main>
  );
}
