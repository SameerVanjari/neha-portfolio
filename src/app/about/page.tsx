"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Nav from "@/components/Nav";
import { THEMES } from "@/data/themes";
import data from "@/data/portfolio.json";
import SiteFooter from "@/components/landing/SiteFooter";
import { AceternityCTA } from "@/components/ui/hover-border-gradient";
import { AnnotatedBio } from "@/components/BioLens";
import { Reveal, EASE_OUT, useMotionPref } from "@/components/motion/reveal";
import { BIO_ANNOTATIONS, annotationLinkTarget } from "@/data/bio-annotations";
import { LEGACY_PROJECTS } from "@/data/legacy-projects";
import { CASE_STUDIES } from "@/data/case-studies";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import SkillsGravity from "@/components/about/SkillsGravity";
import { useLoadStage } from "@/components/LoadStage";
import type { ReactNode } from "react";

/* Home design tokens — paper / ink / muted / hairline / accent */
const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/**
 * Hero entry: each block rises into place, stepped by `index`, once the
 * preloader has cleared (`started`). The whole hero reads as one gesture —
 * eyebrow → title lines → bio → tagline → roles → stats → photos — and the
 * fixed nav drops in last via LoadStage. Reduced motion keeps the fade and
 * drops the movement.
 */
function enter(started: boolean, reduce: boolean, index: number) {
  const from = reduce ? "translateY(0px)" : "translateY(22px)";
  return {
    initial: { opacity: 0, transform: from },
    animate: started
      ? { opacity: 1, transform: "translateY(0px)" }
      : { opacity: 0, transform: from },
    transition: { duration: reduce ? 0.3 : 0.6, ease: EASE_OUT, delay: reduce ? 0 : 0.04 + index * 0.042 },
  };
}

/**
 * Profile gallery. Each entry carries a tiny (16px) blurred JPEG — a real
 * low-quality image placeholder, ~310 bytes, inlined as a data URI. It paints
 * instantly with no request, so the frame is never an empty box, and the full
 * photo then resolves from blur to sharp as it decodes.
 */
const PHOTOS = [
  {
    src: "/profile/headshot.png",
    alt: "Neha Mayacharya, portrait",
    caption: "Portrait",
    ratio: "aspect-[4/5]",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAwX/xAAbEAADAQEAAwAAAAAAAAAAAAABAhEAAxITIv/EABUBAQEAAAAAAAAAAAAAAAAAAAAD/8QAGREAAwADAAAAAAAAAAAAAAAAAAECISJh/9oADAMBAAIRAxEAPwCCvP7VLLlbhKpNmLqw96EmDMWA7HxagjUd7B5np//Z",
  },
  {
    src: "/profile/neha-vr-headset.jpeg",
    alt: "Neha wearing a VR headset",
    caption: "In the headset",
    ratio: "aspect-[4/3]",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQAA4DASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMF/8QAHhAAAgICAgMAAAAAAAAAAAAAAQIDEQAEBRITISL/xAAVAQEBAAAAAAAAAAAAAAAAAAABA//EABYRAQEBAAAAAAAAAAAAAAAAAAEAEv/aAAwDAQACEQMRAD8ANt8jMs/ZRUYyurzKyWJBVZn7jKWMan5GBik8bH1d4ZEqN//Z",
  },
  {
    src: "/profile/neha-smile.webp",
    alt: "Neha Mayacharya smiling outdoors",
    caption: "Off duty",
    ratio: "aspect-[3/5]",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAQAAkDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAgMEBv/EACAQAAEDAwUBAAAAAAAAAAAAAAMAAQIEBRESFBUhUVL/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFREBAQAAAAAAAAAAAAAAAAAAADH/2gAMAwEAAhEDEQA/AKy3mEKp462wyZyw/plmq23FGbEe0OyP46MKv//Z",
  },
  {
    src: "/profile/portrait-alt.png",
    alt: "Neha Mayacharya, three-quarter portrait",
    caption: "Studio",
    ratio: "aspect-[4/3]",
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAMF/8QAHRAAAgICAwEAAAAAAAAAAAAAAQIAEQMxBBJRE//EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAMiERL/2gAMAwEAAhEDEQA/AMIhFZFbRlfmnVhqtQZJOXHfsZyjTCvJXqwspen/2Q==",
  },
] as const;

const EXPERTISE: { title: string; items: string[] }[] = [
  { title: "Product & Systems", items: ["Design systems & tokens", "Product strategy", "Interaction & motion"] },
  { title: "AI Experience", items: ["Conversational & agent UX", "Prompt & output design", "Human-in-the-loop"] },
  { title: "Spatial & XR", items: ["AR / VR / MR product design", "Hand & eye tracking", "Spatial prototyping (Unity, WebXR)"] },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-black/10" />
      <span className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#5C5750]" style={BODY}>
        {children}
      </span>
    </div>
  );
}

function Photo({ photo }: { photo: (typeof PHOTOS)[number] }) {
  return (
    <figure className="group flex w-full flex-col items-start gap-[12px]">
      {/* The aspect ratio lives on the frame, so `next/image` can `fill` it and
          serve an optimised, correctly-sized file (the sources are multi-MB).
          `placeholder="blur"` paints the inlined LQIP first and crossfades to
          the sharp photo as it decodes — lazy, but never an empty box. */}
      <div className={`relative w-full overflow-hidden rounded-[14px] ${photo.ratio}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          draggable={false}
          className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>
      <figcaption
        className="flex w-full items-start justify-between text-[13px] font-normal tracking-[0.52px] text-[#5C5750]"
        style={BODY}
      >
        <p>{photo.caption}</p>
      </figcaption>
    </figure>
  );
}

export default function AboutPage() {
  const theme = THEMES.product; // neutral anchor — theme carries softly
  const reduce = useMotionPref();
  const { stage } = useLoadStage();
  // Nothing lands until the preloader is out of the way; then the hero runs
  // its stagger in order while the nav drops in last.
  const started = stage !== "loading";

  const journeyParent: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, transform: "translateY(24px)" },
        visible: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: { duration: 0.5, ease: EASE_OUT, delayChildren: 0.1, staggerChildren: 0.07 },
        },
      };
  const journeyColumn: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, transform: "translateY(16px)" },
        visible: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.45, ease: EASE_OUT } },
      };

  return (
    <>
      <Nav theme={theme} activeSection="about" />
      <main className="bg-[#F2EEE7] pt-[128px] md:pt-[152px]">
        {/* hero with photo gallery */}
        <section className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-0">
          <div className="grid gap-10 pb-10 md:pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[44px] lg:pb-[80px]">
            <div className="space-y-6">
              <motion.div {...enter(started, reduce, 0)}>
                <Eyebrow>About Neha</Eyebrow>
              </motion.div>

              <h1
                className="text-[32px] font-semibold leading-[0.95] tracking-[-0.04em] text-[#17161B] md:text-[44px] lg:text-[48px]"
                style={DISPLAY}
              >
                <motion.span className="block" {...enter(started, reduce, 1)}>
                  Perception,
                </motion.span>
                <motion.span className="block" {...enter(started, reduce, 2)}>
                  built for people.
                </motion.span>
              </h1>

              <motion.p
                className="max-w-[560px] text-[16px] leading-[1.7] text-[#2B2926] md:text-[17px]"
                style={BODY}
                {...enter(started, reduce, 3)}
              >
                <AnnotatedBio
                  bio={data.profile.bio}
                  annotations={BIO_ANNOTATIONS}
                  popupFor={(a) => ({
                    ...a,
                    link: annotationLinkTarget(a.linkTo, [...CASE_STUDIES, ...LEGACY_PROJECTS]) ?? undefined,
                  })}
                />
              </motion.p>

              <motion.p
                className="max-w-[540px] text-[14px] leading-[1.6] text-[#5C5750]"
                style={BODY}
                {...enter(started, reduce, 4)}
              >
                {data.profile.tagline}
              </motion.p>

              <motion.div className="flex flex-wrap gap-1.5 pt-2" {...enter(started, reduce, 5)}>
                {data.profile.roles.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-[#CFC7BA] bg-[#FBF9F5] px-3 py-1 text-[10px] tracking-[0.12em] text-[#3A3833]"
                    style={BODY}
                  >
                    {r}
                  </span>
                ))}
              </motion.div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                {(data as unknown as { stats: { value: string; label: string }[] }).stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="rounded-[14px] border border-[#DAD3C8] bg-[#FBF9F5] px-4 py-3"
                    {...enter(started, reduce, 6 + i)}
                  >
                    <div className="text-[20px] font-semibold tracking-[-0.03em] text-[#17161B]" style={DISPLAY}>
                      {s.value}
                    </div>
                    <div className="mt-1 text-[10px] tracking-[0.12em] text-[#5C5750]" style={BODY}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* photo gallery — each photo rises into place, after the copy */}
            <div className="grid content-start gap-[18px] sm:grid-cols-2 lg:pl-6">
              <motion.div className="sm:row-span-2" {...enter(started, reduce, 10)}>
                <Photo photo={PHOTOS[0]} />
              </motion.div>
              <motion.div {...enter(started, reduce, 11)}>
                <Photo photo={PHOTOS[1]} />
              </motion.div>
              <motion.div {...enter(started, reduce, 12)}>
                <Photo photo={PHOTOS[2]} />
              </motion.div>
              <motion.div {...enter(started, reduce, 13)}>
                <div className="-translate-y-4">
                  <Photo photo={PHOTOS[3]} />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="h-px w-full bg-[#DAD3C8]" />
        </section>

        {/* expertise */}
        <section className="mx-auto max-w-[1200px] px-6 py-10 md:px-8 md:py-12 lg:px-0">
          <Reveal>
            <Eyebrow>Expertise</Eyebrow>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {EXPERTISE.map((col, i) => (
              <Reveal key={col.title} delay={i * 0.07}>
                <div className="rounded-[14px] border border-[#DAD3C8] bg-[#FBF9F5] p-5">
                  <div className="text-[13px] font-semibold tracking-[-0.02em] text-[#17161B]" style={DISPLAY}>
                    {col.title}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {col.items.map((it) => (
                      <li key={it} className="text-[11px] leading-[1.6] tracking-[0.02em] text-[#5C5750]" style={BODY}>
                        · {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* experience */}
        <section className="mx-auto max-w-[1200px] px-6 pb-10 md:px-8 lg:px-0">
          <Eyebrow>Experience</Eyebrow>
          <ExperienceTimeline items={data.about.experience} accent={theme.accent} />
        </section>

        {/* education */}
        <section className="mx-auto max-w-[1200px] px-6 pb-10 md:px-8 lg:px-0">
          <Reveal>
            <Eyebrow>Education</Eyebrow>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {data.about.education.map((ed, i) => (
              <Reveal key={ed.degree} delay={0.08 + i * 0.07}>
                <div className="rounded-[14px] border border-[#DAD3C8] bg-[#FBF9F5] p-5">
                  <div className="text-[10px] tracking-[0.14em] text-[#5C5750]" style={BODY}>
                    {ed.period}
                  </div>
                  <div className="mt-2 text-[14px] font-semibold tracking-[-0.02em] text-[#17161B]" style={DISPLAY}>
                    {ed.degree}
                  </div>
                  <div className="mt-1 text-[13px] text-[#2B2926]" style={BODY}>
                    {ed.school}
                  </div>
                  <div className="mt-2 text-[10px] tracking-[0.12em] text-[#5C5750]" style={BODY}>
                    {ed.detail}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* skills */}
        <section className="mx-auto max-w-[1200px] px-6 pb-10 md:px-8 lg:px-0">
          <Reveal>
            <Eyebrow>Skills & Toolkit</Eyebrow>
          </Reveal>
          <div className="mt-6">
            <SkillsGravity />
          </div>
          <Reveal delay={0.16} className="mt-8">
            <AceternityCTA href="/projects" variant="dark">
              View projects
            </AceternityCTA>
          </Reveal>
        </section>

        {/* journey */}
        <section className="mx-auto max-w-[1200px] px-6 pb-[80px] md:px-8 md:pb-[120px] lg:px-0">
          <motion.div
            className="rounded-[14px] bg-[#17161B] p-6 text-white md:p-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={journeyParent}
          >
            <div className="text-[10px] tracking-[0.16em] text-white/40" style={BODY}>
              Journey
            </div>
            <div className="mt-4 grid gap-6 md:grid-cols-4">
              {(data as unknown as { milestones: { year: string; title: string; description: string }[] }).milestones.map((m) => (
                <motion.div
                  key={m.year}
                  variants={journeyColumn}
                  className="border-t border-white/10 pt-4 first:border-0 first:pt-0 md:border-0 md:border-l md:pl-4 md:pt-0"
                >
                  <div className="text-[11px] tracking-[0.14em] text-white/50" style={BODY}>
                    {m.year}
                  </div>
                  <div className="mt-1 text-[13px] font-semibold text-white" style={DISPLAY}>
                    {m.title}
                  </div>
                  <div className="mt-1 text-[12px] leading-[1.5] text-white/60" style={BODY}>
                    {m.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
