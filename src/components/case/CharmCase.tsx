"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  BTS,
  CAMPAIGN,
  FACTS,
  HERO,
  MECHANIC,
  NEIGHBORS,
  OVERVIEW,
  RESULTS,
  ROLE,
  SYSTEM,
} from "@/data/charm";
import { FOOTER_LINKS } from "@/data/landing";
import { EASE_OUT, LineByLine, Reveal, useMotionPref, useStagger } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";
import { ProjectRuler } from "@/components/ProjectRuler";

const DARK = "#17101A";
const FAINT_DARK = "#110B13";
const MAGENTA = "#D92A6E";
const PINK = "#FF8FB8";
const TILE = "#FBE2EC";
const PAPER = "#F6F2F0";
const INK = "#1E1419";
const MUTED = "#6A5A62";
const PANEL = "#33223A";
const HAIR = "#2C1F2F";

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

function SectionHead({
  eyebrow,
  heading,
  note,
  dark,
}: {
  eyebrow: string;
  heading: string;
  note?: string;
  dark?: boolean;
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
      className="flex flex-wrap items-end justify-between gap-6 pb-9"
    >
      <motion.div variants={item} className="max-w-[620px]">
        <p
          className="text-[11px] font-bold uppercase tracking-[1.32px]"
          style={{ ...BODY, color: dark ? PINK : MAGENTA }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[30px] leading-[1.15] tracking-[-0.38px] md:text-[38px]"
          style={{ ...DISPLAY, color: dark ? "#F6EEF2" : INK }}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#C3B0BB" : MUTED }}
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
    <img loading="lazy" decoding="async"
      src={`/case/charm/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}

function Still({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
    </div>
  );
}

type MediaItem = {
  src?: string;
  poster?: string;
  alt?: string;
  note?: string;
  className?: string;
  /** Render a <video> instead of an <img>. */
  video?: boolean;
  /** Native controls — used for the long behind-the-scenes cut. */
  controls?: boolean;
};

/**
 * Renders a still or a clip. Every clip here is silent, so the short ones autoplay
 * muted on a loop; the one long cut takes native controls and loads on demand.
 *
 * Chrome defers autoplay for offscreen media, so looping clips are additionally
 * driven by an IntersectionObserver: they start when scrolled into view and pause
 * when they leave, which also keeps off-screen clips from burning decode.
 */
function Media({ src, poster, alt, note, video, controls, className = "" }: MediaItem) {
  const ref = useRef<HTMLVideoElement>(null);
  // Looping clips collapse to their poster under reduced motion: a silent
  // 15-second loop is perpetual movement, not information.
  const reduce = useMotionPref();
  const loop = Boolean(video) && !controls;

  useEffect(() => {
    const el = ref.current;
    if (!el || !loop) return;
    if (reduce) {
      el.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loop, src, reduce]);

  if (!src) {
    return (
      <div
        aria-label={`Media placeholder: ${note}`}
        className={`relative flex w-full flex-col items-center justify-center overflow-hidden ${className}`}
        style={{ background: PANEL }}
      >
        <Icon name="icon-play" size={28} />
        <span className="mt-2 px-2 text-center text-[10px] leading-[1.4]" style={{ ...BODY, color: PINK }}>
          Drop image or video
          <br />
          {note}
        </span>
      </div>
    );
  }
  if (video) {
    return (
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={alt ?? note ?? ""}
        muted={!controls}
        loop={!controls}
        autoPlay={!controls && !reduce}
        playsInline
        controls={controls}
        preload={controls ? "none" : "metadata"}
        style={{ background: PANEL }}
        className={`block h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      loading="lazy"
      draggable={false}
      onError={(e) => {
        e.currentTarget.src = "/placeholder.svg";
      }}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}

function Polaroid({
  name,
  src,
  alt,
  note,
  className = "",
  frameClass = "aspect-[223/250]",
}: {
  name: string;
  src?: string;
  alt?: string;
  note: string;
  className?: string;
  frameClass?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-[10px] bg-white px-3 pb-4 pt-3 ${className}`}
    >
      {src ? (
        <Still src={src} alt={alt ?? name} className={`w-full rounded-[2px] ${frameClass}`} />
      ) : (
        <Media note={note} className={`w-full rounded-[2px] ${frameClass}`} />
      )}
      <p className="text-[10px] font-bold tracking-[0.8px]" style={{ ...DISPLAY, color: MAGENTA }}>
        THEY CALL ME…
      </p>
      <p className="text-[22px] font-bold leading-[1.5]" style={{ ...DISPLAY, color: MAGENTA }}>
        {name}
      </p>
    </div>
  );
}

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
        <Link href="/" className="text-[16px] font-semibold" style={{ ...DISPLAY, color: INK }}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#1E1419] pb-[3px] text-[14px]" style={{ color: INK }}>
            Work
          </Link>
          <Link href="/about" className="text-[14px] transition-opacity duration-200 hover:opacity-70" style={{ color: INK }}>
            About
          </Link>
          <a target="_blank" rel="noreferrer" href="/resume.pdf" className="text-[14px] transition-opacity duration-200 hover:opacity-70" style={{ color: INK }}>
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98]"
            style={{ background: INK }}
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] px-[20px] text-[14px] font-semibold text-white transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] md:hidden"
          style={{ ...BODY, background: INK }}
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
  const [mouse, blax, holy] = HERO.polaroids;
  return (
    <section className="relative overflow-hidden" style={{ background: DARK }}>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-40px] top-[20px] size-[620px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(217,42,110,0.55) 0%, rgba(217,42,110,0.18) 38%, rgba(23,16,26,0) 70%)",
        }}
      />
      <motion.div
        variants={group}
        initial="hidden"
        animate={stage === "loading" ? "hidden" : "visible"}
        className="relative mx-auto grid w-full max-w-[1036px] items-center gap-10 px-6 py-[70px] lg:grid-cols-[1fr_520px] lg:px-0 lg:py-[90px]"
      >
        <div className="max-w-[560px]">
          <motion.div variants={item}>
          <p className="text-[13px] font-semibold" style={{ ...BODY, color: PINK }}>
            <span className="text-white">{HERO.eyebrowLead}</span>
            {HERO.eyebrowRest}
          </p>
          <h1
            className="mt-[18px] text-[clamp(44px,7vw,84px)] font-bold leading-none tracking-[-0.03em] text-[#F6EEF2]"
            style={DISPLAY}
          >
            {HERO.titleLead}
            <span style={{ color: PINK }}>{HERO.titleAccent}</span>
          </h1>
          <p className="mt-[18px] max-w-[540px] text-[19px] leading-[1.5] text-[#D7C6CF]" style={BODY}>
            {HERO.subtitle}
          </p>
          </motion.div>
          <motion.div variants={item} className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: PINK }}>
            <p className="text-[16px] text-[#D7C6CF]" style={BODY}>
              <span className="font-semibold text-[#F6EEF2]">{HERO.role}</span>
              {HERO.roleAgency}
            </p>
            <p className="mt-[2px] text-[14px] text-[#A8929F]" style={BODY}>
              {HERO.roleNote}
            </p>
          </motion.div>
          <motion.a
            variants={item}
            href="#campaign"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold transition-[transform,opacity] duration-150 motion-safe:hover:-translate-y-[1px] motion-safe:active:scale-[0.98] motion-safe:hover:opacity-90"
            style={{ ...BODY, background: PAPER, color: INK }}
          >
            {HERO.cta}
          </motion.a>
        </div>
        <motion.div
          variants={item}
          className="relative mx-auto hidden h-[560px] w-full max-w-[520px] lg:block"
        >
          <div className="absolute left-[-22px] top-[76px] w-[230px] -rotate-8">
            <Polaroid
              name={mouse.name}
              src={mouse.src}
              alt={mouse.alt}
              note={mouse.note}
              className="rounded-[4px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.4)]"
              frameClass="h-[222px]"
            />
          </div>
          <div className="absolute right-[-10px] top-[76px] w-[230px] rotate-8">
            <Polaroid
              name={blax.name}
              src={blax.src}
              alt={blax.alt}
              note={blax.note}
              className="rounded-[4px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.4)]"
              frameClass="h-[222px]"
            />
          </div>
          <div className="absolute left-[130px] top-[20px] w-[260px]">
            <Polaroid
              name={holy.name}
              src={holy.src}
              alt={holy.alt}
              note={holy.note}
              className="rounded-[4px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.4)]"
              frameClass="h-[255px]"
            />
          </div>
        </motion.div>
        <motion.div variants={item} className="mx-auto w-[260px] lg:hidden">
          <Polaroid
            name={holy.name}
            src={holy.src}
            alt={holy.alt}
            note={holy.note}
            className="rounded-[4px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.4)]"
            frameClass="h-[255px]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Facts() {
  // A tight band of metadata: the four facts assemble in one beat rather than
  // each getting its own moment.
  const { group, item, viewport } = useStagger({ distance: 12, step: 0.05 });

  return (
    <section data-index="At a glance" data-tone="dark" aria-label="At a glance" style={{ background: FAINT_DARK }}>
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
              style={{ borderLeft: i > 0 ? `1px solid ${HAIR}` : undefined }}
            >
              <Icon name={fact.icon} size={20} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[11px] tracking-[0.44px] text-[#A8929F]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#F6EEF2]" style={BODY}>
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

function Overview() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });
  const constraints = useStagger({ distance: 16, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={OVERVIEW.eyebrow} heading={OVERVIEW.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 lg:grid-cols-[330px_1fr]"
      >
        <motion.article variants={item} className="rounded-[18px] p-[26px]" style={{ background: MAGENTA }}>
          <p className="text-[56px] font-bold leading-none text-white" style={DISPLAY}>
            {OVERVIEW.stat}
          </p>
          <p className="mt-[10px] text-[15px] leading-[1.5] text-[#FFE3EE]" style={BODY}>
            {OVERVIEW.statBody}
          </p>
        </motion.article>
        <motion.article variants={item} className="rounded-[18px] bg-white px-7 py-[26px]">
          <p className="text-[16px] leading-[1.6]" style={{ ...BODY, color: INK }}>
            {OVERVIEW.context}
          </p>
        </motion.article>
      </motion.div>
      <p className="mt-10 text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: MAGENTA }}>
        {OVERVIEW.constraintsEyebrow}
      </p>
      <motion.div
        variants={constraints.group}
        initial="hidden"
        whileInView="visible"
        viewport={constraints.viewport}
        className="mt-4 grid gap-4 md:grid-cols-3"
      >
        {OVERVIEW.constraints.map((card) => (
          <motion.article
            key={card.title}
            variants={constraints.item}
            className="rounded-[18px] bg-white px-6 pb-[26px] pt-6"
          >
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: TILE }}>
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
              {card.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function WhatIDid() {
  // The five steps are a sequence, so they arrive in order — the argument is
  // chronological and the motion says so before the copy does.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  const tiles = useStagger({ distance: 14, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={ROLE.eyebrow} heading={ROLE.heading} note={ROLE.note} />
      <div className="relative">
        {/* The connector draws itself in, so the row reads as one linked
            process rather than five separate badges. Under MotionConfig a
            reduced-motion visitor gets the drawn state instantly: scaleX is a
            transform, and MotionConfig disables transform motion. */}
        <motion.div
          aria-hidden
          className="absolute left-[10%] right-[10%] top-[28px] hidden h-px lg:block"
          style={{ background: PINK, transformOrigin: "left" }}
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
          className="relative grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-5"
        >
          {ROLE.steps.map((step) => (
            <motion.li key={step.title} variants={item} className="flex flex-col items-center gap-1 text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: MAGENTA }}>
                <Icon name={step.icon} size={20} />
              </span>
              <p className="mt-[10px] text-[15px] font-semibold" style={{ ...DISPLAY, color: INK }}>
                {step.title}
              </p>
              <p className="max-w-[196px] text-[13px] leading-[1.4]" style={{ ...BODY, color: MUTED }}>
                {step.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
      <motion.div
        variants={tiles.group}
        initial="hidden"
        whileInView="visible"
        viewport={tiles.viewport}
        className="mt-7 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4"
      >
        {ROLE.tiles.map((tile) => (
          <motion.div
            key={tile.num}
            variants={tiles.item}
            className="rounded-[18px] px-[22px] pb-6 pt-[22px]"
            style={{ background: tile.tone === "magenta" ? MAGENTA : DARK }}
          >
            <p className="text-[30px] font-semibold leading-[1.1] text-[#F6EEF2]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#E3D3DB]" style={BODY}>
              {tile.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function VisualSystem() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });
  const anatomy = useStagger({ distance: 14, step: 0.06 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={SYSTEM.eyebrow} heading={SYSTEM.heading} note={SYSTEM.note} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {SYSTEM.cards.map((card) => (
          <motion.div key={card.name} variants={item}>
            <Polaroid
              name={card.name}
              src={card.src}
              alt={card.alt}
              note={card.note}
              className="rounded-[6px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]"
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        variants={anatomy.group}
        initial="hidden"
        whileInView="visible"
        viewport={anatomy.viewport}
        className="mt-6 grid gap-[14px] md:grid-cols-3"
      >
        {SYSTEM.anatomy.map((item) => (
          <motion.div
            key={item.title}
            variants={anatomy.item}
            className="flex items-center gap-[14px] rounded-[14px] px-[18px] py-4"
            style={{ background: TILE }}
          >
            <Icon name={item.icon} size={22} className="shrink-0" />
            <div>
              <p className="text-[15px] font-semibold" style={{ ...BODY, color: INK }}>
                {item.title}
              </p>
              <p className="text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Campaign() {
  // The sizzle reel is the section's artefact, so it gets one unhurried
  // arrival before the spotlights and cuts below it.
  const spotlights = useStagger({ distance: 20, step: 0.08 });
  const cuts = useStagger({ distance: 20, step: 0.09 });

  return (
    <section id="campaign" className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={CAMPAIGN.eyebrow} heading={CAMPAIGN.heading} note={CAMPAIGN.note} dark />
        <Reveal distance={28}>
          <Media {...CAMPAIGN.sizzle} className="h-[520px] rounded-[16px]" />
        </Reveal>
        <motion.div
          variants={spotlights.group}
          initial="hidden"
          whileInView="visible"
          viewport={spotlights.viewport}
          className="mt-4 grid gap-4 md:grid-cols-3"
        >
          {CAMPAIGN.spotlights.map((spot) => (
            <motion.figure key={spot.label} variants={spotlights.item}>
              <div className="h-[420px] overflow-hidden rounded-[14px]" style={{ background: PANEL }}>
                <Media {...spot} />
              </div>
              <figcaption className="mt-[10px] text-[13px] text-[#C3B0BB]" style={BODY}>
                {spot.label}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
        <motion.div
          variants={cuts.group}
          initial="hidden"
          whileInView="visible"
          viewport={cuts.viewport}
          className="mt-4 grid gap-4 md:grid-cols-2"
        >
          {CAMPAIGN.cuts.map((cut) => (
            <motion.figure key={cut.label} variants={cuts.item}>
              <div className="h-[300px] overflow-hidden rounded-[14px]" style={{ background: PANEL }}>
                <Media {...cut} />
              </div>
              <figcaption className="mt-[10px] text-[13px] text-[#C3B0BB]" style={BODY}>
                {cut.label}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Mechanic() {
  const phones = useStagger({ distance: 20, step: 0.09 });
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  const recordings = useStagger({ distance: 20, step: 0.09 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={MECHANIC.eyebrow} heading={MECHANIC.heading} note={MECHANIC.note} />
      <motion.div
        variants={phones.group}
        initial="hidden"
        whileInView="visible"
        viewport={phones.viewport}
        className="grid items-center gap-6 lg:grid-cols-[250px_250px_1fr]"
      >
        {MECHANIC.phones.map((phone) => (
          <motion.div key={phone.note} variants={phones.item}>
            <Media {...phone} className="h-[500px] rounded-[30px]" />
          </motion.div>
        ))}
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-[14px]"
        >
          {MECHANIC.steps.map((step) => (
            <motion.article
              key={step.title}
              variants={item}
              className="flex items-start gap-4 rounded-[16px] bg-white px-5 py-[18px]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]" style={{ background: TILE }}>
                <Icon name={step.icon} size={20} />
              </span>
              <div>
                <p className="text-[17px] font-semibold" style={{ ...BODY, color: INK }}>
                  {step.title}
                </p>
                <p className="mt-1 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                  {step.body}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
      <p className="mt-7 text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: MAGENTA }}>
        {MECHANIC.recordingsEyebrow}
      </p>
      {/* Screen recordings are landscape desktop captures (2.06), so these sit
          two-up at a matching ratio rather than four-up in a tall portrait box. */}
      <motion.div
        variants={recordings.group}
        initial="hidden"
        whileInView="visible"
        viewport={recordings.viewport}
        className="mt-[14px] grid gap-4 sm:grid-cols-2"
      >
        {MECHANIC.recordings.map((rec) => (
          <motion.div key={rec.note} variants={recordings.item}>
            <Media {...rec} className="h-[250px] rounded-[22px]" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function BehindTheScenes() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BTS.eyebrow} heading={BTS.heading} />
      <div className="grid items-center gap-6 lg:grid-cols-[640px_1fr]">
        <Reveal distance={24}>
          <Media {...BTS.video} className="h-[360px] rounded-[16px]" />
        </Reveal>
        <Reveal delay={0.08} distance={20}>
          <div>
          <p className="text-[16px] leading-[1.6]" style={{ ...BODY, color: INK }}>
            {BTS.body}
          </p>
          <div className="mt-[12px] flex flex-wrap gap-2">
            {BTS.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex h-7 items-center rounded-full px-3 text-[12px] font-medium"
                style={{ ...BODY, background: TILE, color: INK }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

function Results() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={RESULTS.eyebrow} heading={RESULTS.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-4 md:grid-cols-3"
      >
        {RESULTS.impact.map((card) => (
          <motion.article
            key={card.title}
            variants={item}
            className="rounded-[18px] bg-white p-6"
          >
            <p className="text-[22px] font-semibold leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
              {card.title}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
      {/* The verdict on the work, and the last thing read before the footer —
          so it arrives line by line rather than as one block. */}
      <Reveal className="mt-4" distance={18}>
        <blockquote className="flex gap-4 rounded-[18px] bg-white px-10 py-[34px]">
          <span className="text-[48px] font-bold leading-none" style={{ ...DISPLAY, color: MAGENTA }} aria-hidden>
            “
          </span>
          <div>
            {/* LineByLine renders spans, so the blockquote stays as the
                semantic wrapper around it. */}
            <div className="text-[19px] font-medium leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
              <LineByLine text={`“${RESULTS.quote}”`} delay={0.12} />
            </div>
            <p className="mt-3 text-[13px]" style={{ ...BODY, color: MUTED }}>
              {RESULTS.source}
            </p>
          </div>
        </blockquote>
      </Reveal>
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {RESULTS.credit}
      </p>
    </section>
  );
}

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.08 });

  return (
    <section data-index="More projects" data-tone="light" className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[110px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px]" style={{ ...BODY, color: MUTED }}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b pb-[2px] text-[14px] font-semibold transition-opacity duration-200 hover:opacity-70" style={{ ...BODY, color: INK, borderColor: INK }}>
          All work
        </Link>
      </div>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-7 grid gap-4 md:grid-cols-2"
      >
        {NEIGHBORS.map((n) => (
          /* The motion wrapper only carries the entrance, so the CSS hover
             lift on the card never fights it for `transform`. */
          <motion.div key={n.title} variants={item}>
            <Link
              href={n.href}
              className="group flex items-center gap-5 rounded-[18px] bg-white p-[14px] transition-transform duration-200 motion-safe:hover:-translate-y-[2px] motion-safe:active:scale-[0.99] motion-reduce:transition-none motion-reduce:transform-none"
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
              <span className="block text-[12px]" style={{ ...BODY, color: MUTED }}>
                {n.direction}
              </span>
              <span className="mt-[6px] block text-[22px] font-semibold leading-[1.2]" style={{ ...DISPLAY, color: INK }}>
                {n.title}
              </span>
              <span className="mt-[6px] block truncate text-[14px]" style={{ ...BODY, color: MUTED }}>
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
            <p className="text-[32px] font-semibold text-[#F6EEF2]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#D7C6CF] transition-opacity duration-200 hover:opacity-80"
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
                className="text-[14px] text-[#F6EEF2] transition-opacity duration-200 hover:opacity-80"
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

export default function CharmCase() {
  return (
    <main style={{ background: PAPER }}>
      <ProjectRuler />
      <Nav />
      <Hero />
      <Facts />
      <Overview />
      <WhatIDid />
      <VisualSystem />
      <Campaign />
      <Mechanic />
      <BehindTheScenes />
      <Results />
      <MoreProjects />
      <Footer />
    </main>
  );
}
