"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import {
  AT_A_GLANCE,
  CONTRIBUTIONS,
  HERO,
  IMPACT,
  KEY_DECISIONS,
  NEIGHBORS,
  PROBLEM,
  SOUND,
  STORYBOARD,
  UX_WIREFRAMES,
  WORLD_3D,
} from "@/data/broken-mile";
import { FOOTER_LINKS } from "@/data/landing";
import { EASE_OUT, LineByLine, Reveal, useMotionPref, useStagger } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";
import { caseStudyThumb } from "@/data/case-studies";
import { ProjectRuler } from "@/components/ProjectRuler";

/* ---------------------------------- tokens --------------------------------- */

const RED = "#C8232C";
const RED_BRIGHT = "#FF5A63";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/* ---------------------------------- assets --------------------------------- */
/* Icons + vignettes exported from Figma "BrokenMileVisual (Components)"
   (node 115:243) and served from /case/broken-mile. */

const ASSET_BASE = "/case/broken-mile";

function Icon({ name, size = 32, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async"
      src={`${ASSET_BASE}/icon-${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${className}`}
      style={{ display: "inline-block" }}
    />
  );
}

/* ------------------------- section header (shared) ------------------------- */

/**
 * Above the fold, this is the one place the page spends real motion. The column
 * itself doesn't move — each block lands in reading order, which reads as one
 * gesture rather than three. Same shape as the homepage hero, so the load
 * choreography is identical wherever a visitor arrives.
 */
function heroMotion(mode: "pending" | boolean): { group: Variants; item: Variants } {
  if (mode === "pending") {
    // Server markup and the first client frame use this neutral hidden state.
    // It prevents either motion variant from being selected before the media
    // query is known, so neither branch can hydrate against the other. Opacity
    // lives on the items, not the container: the container has no resting
    // opacity in any branch, so it can never trap the hero at zero.
    return {
      group: { hidden: {}, visible: {} },
      item: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    };
  }
  if (mode) {
    return {
      group: {
        hidden: {},
        visible: { transition: { duration: 0.3 } },
      },
      item: {
        // Declare the resting transform even when movement is disabled.
        // `useMotionPref` resolves after first render, so an early frame may
        // already have set the entrance offset. Because only declared keys are
        // interpolated, omitting it could leave the hero permanently displaced.
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

function SectionHeader({
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
      <motion.div variants={item} className="max-w-[820px]">
        <p
          className="text-[13px] font-bold uppercase tracking-[1.56px]"
          style={{ ...BODY, color: onDark ? RED_BRIGHT : RED }}
        >
          {label}
        </p>
        <h2
          className={`mt-[14px] ${size === "lg" ? "text-[34px] md:text-[44px] leading-[1.12] tracking-[-1.1px]" : "text-[28px] md:text-[34px] leading-[1.15] tracking-[-0.68px]"} ${onDark ? "text-[#F2EEE7]" : "text-[#17161B]"}`}
          style={DISPLAY}
        >
          {heading}
        </h2>
      </motion.div>
      {note && (
        <motion.p
          variants={item}
          className={`max-w-[336px] pb-1 text-[15px] leading-[1.3] ${onDark ? "text-[#B9B2A8]" : "text-[#5C5750]"}`}
          style={BODY}
        >
          {note}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ------------------------------ media frames ------------------------------ */

function CaptionChip({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <span
      className="inline-block max-w-full rounded-[8px] px-[10px] py-[6px] text-[12px] leading-[1.3]"
      style={{
        ...BODY,
        background: dark ? "rgba(23,22,27,0.62)" : "rgba(23,22,27,0.55)",
        color: dark ? "#D8D2C8" : "#F2EEE7",
        backdropFilter: "blur(4px)",
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------- vignettes -------------------------------- */
/* Key-decision + UX vignettes exported from Figma (node 115:243). */

const VIGNETTE_FILES: Record<string, string> = {
  gaze: "kd-gaze",
  clock: "kd-clock",
  lines: "kd-lines",
  labels: "kd-labels",
  tiers: "ux-tiers",
  retry: "ux-retry",
  supervisor: "ux-supervisor",
};

function Vignette({ kind }: { kind: string }) {
  const file = VIGNETTE_FILES[kind];
  if (!file) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async"
      src={`/case/broken-mile/${file}.svg`}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${kind.startsWith("kd-") || VIGNETTE_FILES[kind].startsWith("kd-") ? "h-[150px] w-[150px] rounded-[18px]" : "h-auto w-full min-h-[70px]"}`}
    />
  );
}

/* --------------------------------- sections -------------------------------- */

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useMotionPref();
  const [motionPreferenceReady, setMotionPreferenceReady] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMotionPreferenceReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  // Match the server-rendered markup on the first client render. Applying the
  // reduced-motion variant only after mount avoids a hydration mismatch when
  // the media query differs from the SSR default.
  const reducedMotion = motionPreferenceReady && !!reduce;
  // Hold the neutral hidden variants until the preference is known. Both SSR
  // and hydration therefore render the same markup; the selector then chooses
  // the full or reduced entrance while the preloader is still covering the hero.
  const motionMode = !motionPreferenceReady ? "pending" : reducedMotion;
  // Held back until the preloader has cleared, so the entrance plays in front
  // of the viewer instead of running out unseen behind the overlay.
  const { stage } = useLoadStage();
  const { group, item } = heroMotion(motionMode);

  // A 15–20 second loop sits behind this hero for the whole session. Pause it
  // once the hero leaves the viewport: nobody is looking at it, and a playing
  // video keeps decoding frames and holding the GPU awake on mobile. Under
  // reduced motion, keep the poster still instead of starting the loop.
  const heroInView = useInView(heroRef, { margin: "100px" });
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
      return;
    }
    if (heroInView) {
      // Autoplay can still be refused; the poster is already showing, so a
      // rejected play() is not worth surfacing.
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [heroInView, reducedMotion]);

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-[#1C1518]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO.video}
        poster={HERO.poster}
        muted
        loop
        playsInline
        autoPlay={false}
        preload="metadata"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #1C1518 0%, #1C1518 30%, rgba(28,21,24,0.55) 62%, rgba(28,21,24,0.2) 100%)",
        }}
      />
      <div className="relative mx-auto flex min-h-[620px] w-full max-w-[1200px] flex-col px-6 pb-14 pt-[70px] lg:min-h-[720px] lg:px-0 lg:pt-[110px]">
        <motion.div
          variants={group}
          initial="hidden"
          animate={stage === "loading" ? "hidden" : "visible"}
          /* flex-1 keeps the column filling the hero's min-height, so the CTA
             row's mt-auto still pins it to the bottom as before. */
          className="flex flex-1 flex-col"
        >
          <motion.div variants={item}>
            <p className="text-[16px] font-semibold tracking-[0.16px]" style={{ ...BODY, color: RED_BRIGHT }}>
              {HERO.eyebrow}
            </p>
            <h1
              className="mt-[26px] max-w-[700px] text-[clamp(44px,6.2vw,72px)] font-bold leading-[1.04] tracking-[-2.16px] text-[#F2EEE7]"
              style={DISPLAY}
            >
              {HERO.title}
            </h1>
            <p className="mt-[24px] max-w-[580px] text-[18px] leading-[1.3] text-[#E4DED4] md:text-[22px]" style={BODY}>
              {HERO.subtitle}
            </p>
          </motion.div>
          <motion.div
            variants={item}
            className="mt-[52px] max-w-[760px] border-l-2 pl-[23px]"
            style={{ borderColor: RED_BRIGHT }}
          >
            <p className="text-[19px] font-semibold text-[#F2EEE7] md:text-[20px]" style={BODY}>
              {HERO.role}
            </p>
            <p className="mt-[8px] text-[17px] text-[#CFC8BD]" style={BODY}>
              {HERO.meta}
            </p>
          </motion.div>
          <motion.div variants={item} className="mt-[48px] flex items-end justify-between lg:mt-auto">
            <a
              href={HERO.cta.href}
              target="_blank"
              rel="noreferrer"
              className="case-cta inline-flex h-[48px] items-center rounded-[999px] bg-[#F2EEE7] px-[24px] text-[15px] font-semibold text-[#17161B]"
              style={BODY}
            >
              {HERO.cta.label}
            </a>
            <span
              className="hidden items-center gap-[10px] rounded-[999px] px-[16px] py-[10px] text-[13px] text-[#F2EEE7] sm:inline-flex"
              style={{ ...BODY, background: "rgba(23,22,27,0.7)" }}
            >
              <Icon name="mute" size={14} />
              {reducedMotion ? "Still frame · looping video paused" : HERO.overlayNote}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AtAGlance() {
  // A tight band of metadata, so the four facts assemble in a beat rather than
  // each getting its own moment.
  const { group, item, viewport } = useStagger({ distance: 12, step: 0.05 });

  return (
    <section data-index="At a glance" data-tone="dark" aria-label="At a glance" className="bg-[#17161B]">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-0">
        <motion.ul
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 border-t lg:grid-cols-4"
          style={{ borderColor: "rgba(242,238,231,0.14)" }}
        >
          {AT_A_GLANCE.map((fact, i) => (
            <motion.li
              key={fact.label}
              variants={item}
              className="flex items-start gap-4 px-0 py-[38px] lg:px-6"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(242,238,231,0.14)" : undefined,
                paddingLeft: i === 0 ? 0 : undefined,
              }}
            >
              <Icon name={i === 0 ? "role" : i === 1 ? "team" : i === 2 ? "platform" : "award"} size={26} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[12px] uppercase tracking-[1.44px] text-[#B9B2A8]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-1 text-[17px] font-semibold leading-[1.3] text-[#F2EEE7]" style={BODY}>
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
    <section className="mx-auto w-full max-w-[1200px] px-6 pb-10 pt-[100px] lg:px-0 lg:pt-[120px]">
      <SectionHeader label={PROBLEM.label} heading={PROBLEM.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-[40px] grid gap-5 md:grid-cols-3"
      >
        {PROBLEM.cards.map((card) => (
          <motion.article key={card.title} variants={item} className="flex flex-col gap-5 rounded-[20px] bg-[#FBF9F5] p-8">
            <span className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px] bg-[#FBE3E4]">
              <Icon name={card.icon} size={32} />
            </span>
            <h3 className="text-[22px] font-semibold leading-[1.3] text-[#17161B]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[16px] leading-[1.3] text-[#5C5750]" style={BODY}>
              {card.body}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Contributions() {
  // The six steps are a sequence, so they arrive in order — the argument is
  // chronological and the motion says so before the copy does.
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.06 });
  const stats = useStagger({ distance: 14, step: 0.05 });

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 pb-10 pt-[100px] lg:px-0 lg:pt-[140px]">
      <SectionHeader label={CONTRIBUTIONS.label} heading={CONTRIBUTIONS.heading} note={CONTRIBUTIONS.note} />
      <div className="relative mt-[72px]">
        {/* The connector draws itself in, so the row reads as one linked
            process rather than six separate badges. Sits outside the stagger
            group: it has its own trigger, and a motion child declaring its own
            animation would break variant inheritance for what follows. */}
        <motion.div
          aria-hidden
          className="absolute left-0 right-0 top-[37px] h-[2px] bg-[#E2C9CB]"
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
          {CONTRIBUTIONS.items.map((step) => (
            <motion.li key={step.title} variants={item} className="flex flex-col items-center gap-[14px] text-center">
              <span className="flex h-[76px] w-[76px] items-center justify-center rounded-[999px]" style={{ background: RED }}>
                <Icon name={step.icon} size={30} />
              </span>
              <div>
                <p className="text-[17px] font-semibold text-[#17161B]" style={DISPLAY}>
                  {step.title}
                </p>
                <p className="mx-auto mt-[6px] max-w-[190px] text-[14px] leading-[1.3] text-[#5C5750]" style={BODY}>
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
        className="mt-[56px] grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {CONTRIBUTIONS.stats.map((stat) => (
          <motion.div key={stat.label} variants={stats.item} className="rounded-[18px] bg-[#17161B] px-[26px] pb-[42px] pt-[26px]">
            <p className="text-[40px] font-bold tracking-[-0.8px] text-[#F2EEE7]" style={DISPLAY}>
              {stat.num}
            </p>
            <p className="mt-[6px] text-[15px] leading-[1.3] text-[#CFC8BD]" style={BODY}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Storyboard() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 pb-10 pt-[100px] lg:px-0 lg:pt-[140px]">
      <SectionHeader label={STORYBOARD.label} heading={STORYBOARD.heading} note={STORYBOARD.note} />
      {/* The full-bleed storyboard is the section's artefact, so it gets one
          unhurried arrival of its own before the three scenes below it. */}
      <Reveal distance={28}>
        <figure className="relative mt-[40px] h-[320px] overflow-hidden rounded-[20px] border bg-[#E4DDD1] md:h-[560px]" style={{ borderColor: "#B8AFA2" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={STORYBOARD.figure.image} alt={STORYBOARD.figure.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" draggable={false} />
          <figcaption className="absolute bottom-6 left-6 max-w-[856px] pr-4">
            <CaptionChip>{STORYBOARD.figure.caption}</CaptionChip>
          </figcaption>
        </figure>
      </Reveal>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-4 grid gap-4 md:grid-cols-3"
      >
        {STORYBOARD.scenes.map((scene) => (
          <motion.div key={scene.num} variants={item} className="flex flex-col gap-3">
            <div className="relative h-[200px] overflow-hidden rounded-[14px] border bg-[#2A2830] p-[14px]" style={{ borderColor: "#5C5866" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={scene.image} alt={scene.title} className="absolute inset-0 h-full w-full rounded-[8px] object-cover" loading="lazy" draggable={false} />
              <span className="absolute bottom-[22px] left-[22px]">
                <CaptionChip>{`[${scene.caption}]`}</CaptionChip>
              </span>
            </div>
            <div className="flex items-center gap-[10px]">
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[999px] text-[13px] font-bold text-white" style={{ ...BODY, background: RED }}>
                {scene.num}
              </span>
              <p className="text-[16px] font-semibold text-[#17161B]" style={BODY}>
                {scene.title}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function UxWireframes() {
  const cards = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 pb-10 pt-[100px] lg:px-0 lg:pt-[140px]">
      <SectionHeader label={UX_WIREFRAMES.label} heading={UX_WIREFRAMES.heading} />
      {/* Wireframe, then the arrow, then hi-fi: the section's whole point is the
          transformation, so the three parts are staged rather than stacked. */}
      <div className="mt-[40px] flex flex-col items-stretch gap-6 lg:flex-row lg:items-center">
        {UX_WIREFRAMES.panels.map((panel, i) => {
          const light = panel.kind === "wireframe";
          return (
            <div key={panel.tag} className="contents lg:flex lg:flex-1 lg:flex-col lg:gap-[10px]">
              {i === 1 && (
                <Reveal
                  delay={0.1}
                  distance={16}
                  className="mx-auto hidden h-[64px] w-[64px] items-center justify-center rounded-[999px] lg:flex"
                  style={{ background: RED }}
                >
                  <Icon name="arrow" size={26} />
                </Reveal>
              )}
              <div className="lg:flex lg:flex-1 lg:flex-col lg:gap-[10px]">
                <Reveal delay={i * 0.18} distance={26}>
                  <div
                    className="relative h-[300px] overflow-hidden rounded-[18px] border p-[20px] lg:h-[380px]"
                    style={{
                      background: light ? "#FBF9F5" : "#2A2830",
                      borderColor: light ? "#B8AFA2" : "#5C5866",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={panel.image}
                      alt={panel.caption}
                      className="absolute inset-[20px] h-[calc(100%-76px)] w-[calc(100%-40px)] rounded-[12px] object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                    <span className="absolute bottom-[26px] left-[20px] right-[20px]">
                      <CaptionChip>{`[${panel.caption}]`}</CaptionChip>
                    </span>
                  </div>
                </Reveal>
                <p className="text-[14px] font-semibold uppercase tracking-[1.12px] text-[#5C5750]" style={BODY}>
                  {panel.tag}
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
        {UX_WIREFRAMES.cards.map((card) => (
          <motion.article key={card.title} variants={cards.item} className="flex flex-col gap-4 rounded-[18px] bg-[#FBF9F5] p-[26px] pb-[46px]">
            <Vignette kind={card.vignette} />
            <h3 className="text-[18px] font-semibold text-[#17161B]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[15px] leading-[1.3] text-[#5C5750]" style={BODY}>
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
    <section className="mt-[100px] bg-[#17161B] lg:mt-[140px]">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-[90px] lg:px-0 lg:py-[140px]">
        <SectionHeader onDark label={KEY_DECISIONS.label} heading={KEY_DECISIONS.heading} />
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-[60px] grid gap-5 lg:grid-cols-2"
        >
          {KEY_DECISIONS.items.map((decision) => (
            <motion.article key={decision.title} variants={item} className="flex items-start gap-7 rounded-[20px] bg-[#221F26] p-8">
              <div className="shrink-0">
                <Vignette kind={decision.vignette} />
              </div>
              <div>
                <h3 className="text-[22px] font-semibold leading-[1.3] text-[#F2EEE7]" style={DISPLAY}>
                  {decision.title}
                </h3>
                <p className="mt-[9px] max-w-[348px] text-[16px] leading-[1.55] text-[#CFC8BD]" style={BODY}>
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

function World3D() {
  // The five sound rows are a ramp from deepest to most open, so they land in
  // order — the sequence is the point of the column.
  const sound = useStagger({ distance: 12, step: 0.05 });

  return (
    <section className="mx-auto grid w-full max-w-[1200px] gap-10 px-6 pb-10 pt-[100px] lg:grid-cols-2 lg:px-0 lg:pt-[140px]">
      <Reveal distance={22}>
        <p className="text-[13px] font-bold uppercase tracking-[1.56px]" style={{ ...BODY, color: RED }}>
          {WORLD_3D.label}
        </p>
        <h2 className="mt-[10px] text-[28px] font-semibold leading-[1.15] tracking-[-0.68px] text-[#17161B] md:text-[34px]" style={DISPLAY}>
          {WORLD_3D.heading}
        </h2>
        <div className="relative mt-[22px] h-[300px] overflow-hidden rounded-[18px] border bg-[#2A2830]" style={{ borderColor: "#5C5866" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WORLD_3D.figure.image} alt={WORLD_3D.figure.caption} className="absolute inset-[18px] h-[calc(100%-60px)] w-[calc(100%-36px)] rounded-[10px] object-cover" loading="lazy" draggable={false} />
          <span className="absolute bottom-[26px] left-[18px] right-[18px]">
            <CaptionChip>{`[${WORLD_3D.figure.caption}]`}</CaptionChip>
          </span>
        </div>
        <div className="mt-[22px] flex flex-wrap gap-[10px]">
          {WORLD_3D.tags.map((tag) => (
            <span key={tag} className="rounded-[999px] bg-[#FBE3E4] px-[14px] py-[9px] text-[14px] font-semibold text-[#9E1B23]" style={BODY}>
              {tag}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.08} distance={22}>
        <p className="text-[13px] font-bold uppercase tracking-[1.56px]" style={{ ...BODY, color: RED }}>
          {SOUND.label}
        </p>
        <h2 className="mt-[10px] text-[28px] font-semibold leading-[1.15] tracking-[-0.68px] text-[#17161B] md:text-[34px]" style={DISPLAY}>
          {SOUND.heading}
        </h2>
        <motion.div
          variants={sound.group}
          initial="hidden"
          whileInView="visible"
          viewport={sound.viewport}
          className="mt-[22px] flex flex-col gap-2"
        >
          {SOUND.rows.map((row) => {
            const styles = {
              darkest: { bg: "#9E1B23", fg: "#FFFFFF" },
              dark: { bg: RED, fg: "#FFFFFF" },
              mid: { bg: "#E88A90", fg: "#17161B" },
              light: { bg: "#F4C9CC", fg: "#17161B" },
              outline: { bg: "#FBF9F5", fg: "#17161B" },
            }[row.tone];
            return (
              <motion.div
                key={row.label}
                variants={sound.item}
                className="flex min-h-[53px] items-center justify-between gap-4 rounded-[12px] px-5 py-4"
                style={{ background: styles.bg, color: styles.fg, ...(row.tone === "outline" ? { border: "1px solid #DAD3C8" } : {}) }}
              >
                <p className="text-[16px] font-semibold" style={BODY}>
                  {row.label}
                </p>
                <p className="text-right text-[16px]" style={BODY}>
                  {row.value}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Reveal>
    </section>
  );
}

function Impact() {
  const { group, item, viewport } = useStagger({ distance: 18, step: 0.07 });

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 pb-10 pt-[100px] lg:px-0 lg:pt-[140px]">
      <SectionHeader label={IMPACT.label} heading={IMPACT.heading} />
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-[40px] grid gap-4 md:grid-cols-3"
      >
        {IMPACT.stats.map((stat) => {
          const red = stat.tone === "red";
          return (
            <motion.div key={stat.label} variants={item} className="rounded-[20px] p-[34px]" style={{ background: red ? RED : "#17161B" }}>
              <p className="text-[44px] font-bold tracking-[-1.56px] md:text-[52px] md:leading-[1.3]" style={{ ...DISPLAY, color: red ? "#FFFFFF" : "#F2EEE7" }}>
                {stat.num}
              </p>
              <p className="text-[16px]" style={{ ...BODY, color: red ? "#FFFFFF" : "#CFC8BD" }}>
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
      {/* The user's verdict on the work, and the last thing read before the
          footer — so it gets the same line-by-line arrival as the homepage
          pull-quote rather than arriving as one block. */}
      <Reveal className="mt-8" distance={18}>
        <figure className="flex flex-col gap-8 rounded-[20px] bg-[#E9E3D9] p-[36px] md:flex-row md:p-[44px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src="/case/broken-mile/quote-user.svg"
            width={48}
            height={48}
            alt=""
            aria-hidden
            draggable={false}
            className="shrink-0 select-none"
          />
          <figure className="max-w-[901px]">
            {/* LineByLine renders spans, so the blockquote stays as the
                semantic wrapper around it. */}
            <blockquote className="text-[24px] font-medium leading-[1.3] tracking-[-0.45px] text-[#17161B] md:text-[30px]" style={DISPLAY}>
              <LineByLine text={`“${IMPACT.quote.text}”`} delay={0.12} />
            </blockquote>
            <figcaption className="mt-4 text-[15px] font-semibold text-[#17161B]" style={BODY}>
              {IMPACT.quote.name}
            </figcaption>
          </figure>
        </figure>
      </Reveal>
      <Reveal className="mt-6" distance={12}>
        <p className="text-[14px] leading-[1.3] text-[#5C5750]" style={BODY}>
          {IMPACT.disclaimer}
        </p>
      </Reveal>
    </section>
  );
}

function MoreProjects() {
  const { group, item, viewport } = useStagger({ distance: 16, step: 0.07 });

  return (
    <section data-index="More projects" data-tone="light" className="mx-auto w-full max-w-[1200px] px-6 pb-[110px] pt-[100px] lg:px-0">
      <div className="flex items-center justify-between border-t border-[#DAD3C8] pt-[43px]">
        <p className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#5C5750]" style={BODY}>
          More projects
        </p>
        <Link href="/projects" className="case-link border-b border-[#17161B] pb-[4px] text-[15px] font-semibold text-[#17161B]" style={BODY}>
          All work
        </Link>
      </div>
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mt-[28px] grid gap-6 md:grid-cols-2"
      >
        {NEIGHBORS.map((n) => (
          /* The motion wrapper only carries the entrance, so the CSS hover
             lift on the card never fights it for `transform`. */
          <motion.div key={n.title} variants={item}>
            <Link
              href={n.href}
              className="case-card group flex items-center gap-[22px] rounded-[16px] bg-[#FBF9F5] p-[18px]"
            >
              <span
                className="relative h-[130px] w-[180px] shrink-0 overflow-hidden rounded-[12px] border"
                style={{
                  background: n.thumbDark ? "#2A2830" : "#E4DDD1",
                  borderColor: n.thumbDark ? "#5C5866" : "#B8AFA2",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={caseStudyThumb(n.href)}
                  alt={n.title}
                  className="case-thumb absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-[6px] object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] text-[#5C5750]" style={BODY}>
                  {n.direction}
                </span>
                <span className="mt-[6px] block text-[24px] font-semibold tracking-[-0.36px] text-[#17161B]" style={DISPLAY}>
                  {n.title}
                </span>
                <span className="mt-[6px] block text-[15px] text-[#3A3833]" style={BODY}>
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

function CaseFooter() {
  return (
    <footer data-index="Contact" data-tone="dark" className="bg-[#17161B]">
      {/* One quiet rise for the whole row — a footer is a sign-off, not a
          section, and per-link entrances would overplay it. */}
      <Reveal distance={16}>
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-6 px-6 py-[64px] lg:px-0">
          <div>
            <p className="text-[36px] font-semibold tracking-[-0.9px] text-[#F2EEE7]" style={DISPLAY}>
              Let&apos;s talk.
            </p>
            <a
              href="mailto:nmayacharya@gmail.com"
              className="case-link mt-[10px] inline-block border-b border-[rgba(242,238,231,0.4)] pb-[4px] text-[20px] text-[#F2EEE7]"
              style={BODY}
            >
              nmayacharya@gmail.com
            </a>
          </div>
          <nav aria-label="Case study links" className="flex items-center gap-8">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="case-link text-[15px] text-[#F2EEE7]"
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

export default function BrokenMileCase() {
  // The shared site header is a fixed overlay, so the page's own top padding
  // keeps the hero clear of it.
  return (
    <main className="bg-[#F2EEE7] pt-[85px]">
      <ProjectRuler />
      <Hero />
      <AtAGlance />
      <Problem />
      <Contributions />
      <Storyboard />
      <UxWireframes />
      <KeyDecisions />
      <World3D />
      <Impact />
      <MoreProjects />
      <CaseFooter />
    </main>
  );
}
