"use client";

import { motion, type Variants } from "framer-motion";
import Nav from "@/components/Nav";
import { THEMES } from "@/data/themes";
import data from "@/data/portfolio.json";
import SiteFooter from "@/components/landing/SiteFooter";
import { AceternityCTA } from "@/components/ui/hover-border-gradient";
import { AnnotatedBio } from "@/components/BioLens";
import { Reveal, TextRow, LineReveal, EASE_OUT, useMotionPref } from "@/components/motion/reveal";
import { BIO_ANNOTATIONS, annotationLinkTarget } from "@/data/bio-annotations";
import { LEGACY_PROJECTS } from "@/data/legacy-projects";
import { CASE_STUDIES } from "@/data/case-studies";
import type { ReactNode } from "react";

/* Home design tokens — paper / ink / muted / hairline / accent */
const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

const PHOTOS = [
  {
    src: "/profile/headshot.png",
    alt: "Neha Mayacharya, portrait",
    caption: "Portrait",
    ratio: "aspect-[4/5]",
  },
  {
    src: "/profile/neha-vr-headset.jpeg",
    alt: "Neha wearing a VR headset",
    caption: "In the headset",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/profile/neha-smile.webp",
    alt: "Neha Mayacharya smiling outdoors",
    caption: "Off duty",
    ratio: "aspect-[3/5]",
  },
  {
    src: "/profile/portrait-alt.png",
    alt: "Neha Mayacharya, three-quarter portrait",
    caption: "Studio",
    ratio: "aspect-[4/3]",
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
      <div className="relative w-full overflow-hidden rounded-[14px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          draggable={false}
          className={`${photo.ratio} w-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none`}
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
              <Reveal delay={0}>
                <Eyebrow>About Neha</Eyebrow>
              </Reveal>

              <h1
                className="text-[32px] font-semibold leading-[0.95] tracking-[-0.04em] text-[#17161B] md:text-[44px] lg:text-[48px]"
                style={DISPLAY}
              >
                <TextRow delay={0.06}>Perception,</TextRow>
                <TextRow delay={0.12}>built for people.</TextRow>
              </h1>

              <p className="max-w-[560px] text-[16px] leading-[1.7] text-[#2B2926] md:text-[17px]" style={BODY}>
                <LineReveal delay={0.18}>
                  <AnnotatedBio
                    bio={data.profile.bio}
                    annotations={BIO_ANNOTATIONS}
                    popupFor={(a) => ({
                      ...a,
                      link: annotationLinkTarget(a.linkTo, [...CASE_STUDIES, ...LEGACY_PROJECTS]) ?? undefined,
                    })}
                  />
                </LineReveal>
              </p>

              <p className="max-w-[540px] text-[14px] leading-[1.6] text-[#5C5750]" style={BODY}>
                <TextRow delay={0.34}>{data.profile.tagline}</TextRow>
              </p>

              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {data.profile.roles.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-[#CFC7BA] bg-[#FBF9F5] px-3 py-1 text-[10px] tracking-[0.12em] text-[#3A3833]"
                      style={BODY}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </Reveal>

              <div className="grid grid-cols-2 gap-3 pt-4">
                {(data as unknown as { stats: { value: string; label: string }[] }).stats.map((s, i) => (
                  <Reveal key={s.label} delay={0.46 + i * 0.05}>
                    <div className="rounded-[14px] border border-[#DAD3C8] bg-[#FBF9F5] px-4 py-3">
                      <div className="text-[20px] font-semibold tracking-[-0.03em] text-[#17161B]" style={DISPLAY}>
                        {s.value}
                      </div>
                      <div className="mt-1 text-[10px] tracking-[0.12em] text-[#5C5750]" style={BODY}>
                        {s.label}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* photo gallery — each photo rises from below its own frame */}
            <div className="grid content-start gap-[18px] sm:grid-cols-2 lg:pl-6">
              <Reveal className="sm:row-span-2" delay={0.1} distance={34}>
                <Photo photo={PHOTOS[0]} />
              </Reveal>
              <Reveal delay={0.18} distance={34}>
                <Photo photo={PHOTOS[1]} />
              </Reveal>
              <Reveal delay={0.26} distance={34}>
                <Photo photo={PHOTOS[2]} />
              </Reveal>
              <Reveal delay={0.34} distance={34}>
                <div className="-translate-y-4">
                  <Photo photo={PHOTOS[3]} />
                </div>
              </Reveal>
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
          <div className="mt-6 divide-y divide-[#DAD3C8]">
            {data.about.experience.map((job) => (
              <div key={`${job.where}-${job.when}`} className="grid gap-2 py-4 md:grid-cols-[180px_1fr] md:gap-8">
                <div className="text-[11px] tracking-[0.08em] text-[#5C5750]" style={BODY}>
                  {job.when}
                </div>
                <div>
                  <div className="text-[15px] font-semibold tracking-[-0.02em] text-[#17161B]" style={DISPLAY}>
                    {job.what}
                  </div>
                  <div className="text-[11px] tracking-[0.08em] text-[#5C5750]" style={BODY}>
                    {job.where}
                  </div>
                  <p className="mt-2 max-w-[62ch] text-[13px] leading-[1.6] text-[#2B2926]" style={BODY}>
                    {job.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
          <Reveal delay={0.08} className="mt-6">
            <div className="flex flex-wrap gap-2">
              {(data as unknown as { skills: string[] }).skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[#CFC7BA] bg-[#FBF9F5] px-3 py-1.5 text-[11px] tracking-[0.08em] text-[#3A3833] transition-opacity hover:opacity-70"
                  style={BODY}
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
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
