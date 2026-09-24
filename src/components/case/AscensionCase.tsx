"use client";

import Link from "next/link";
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

/* ---------------------------------- tokens --------------------------------- */

const DARK = "#15131F";
const VIOLET = "#5B47C8";
const LAV = "#B7A8F5";
const PAPER = "#F4F3F8";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/* ------------------------------ shared pieces ------------------------------ */

function Icon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
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
  return (
    <div className="flex flex-wrap items-start justify-between gap-6 pb-9">
      <div className="max-w-[760px]">
        <p className={`text-[11px] font-bold uppercase tracking-[1.32px] ${onDark ? "text-[#B7A8F5]" : "text-[#5B47C8]"}`} style={BODY}>
          {eyebrow}
        </p>
        <h2
          className={`mt-[14px] text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.38px] ${onDark ? "text-[#F1EFF8]" : "text-[#1A1826]"}`}
          style={DISPLAY}
        >
          {heading}
        </h2>
      </div>
      {note && (
        <p className={`max-w-[340px] pt-[24px] text-[14px] leading-[1.5] ${onDark ? "text-[#B8B2CB]" : "text-[#625E72]"}`} style={BODY}>
          {note}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------- chrome ---------------------------------- */

function Nav() {
  return (
    <header style={{ background: PAPER }}>
      <div className="mx-auto flex h-[68px] w-full max-w-[1036px] items-center justify-between px-6 lg:px-0">
        <Link href="/" className="text-[16px] font-semibold text-[#1A1826]" style={DISPLAY}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#1A1826] pb-[3px] text-[14px] text-[#1A1826]">
            Work
          </Link>
          <Link href="/about" className="text-[14px] text-[#1A1826] transition-opacity hover:opacity-70">
            About
          </Link>
          <a href="/resume.pdf" className="text-[14px] text-[#1A1826] transition-opacity hover:opacity-70">
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] bg-[#1A1826] px-[20px] text-[14px] font-semibold text-white"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] bg-[#1A1826] px-[20px] text-[14px] font-semibold text-white md:hidden"
          style={BODY}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

function Hero() {
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
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="flex max-w-[540px] flex-col">
            <div className="flex flex-col items-start gap-[18px]">
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
            </div>
            <div className="mt-[36px] border-l-2 pl-[19px]" style={{ borderColor: LAV }}>
              <p className="text-[16px] text-[#CBC6DC]" style={BODY}>
                {HERO.role}
              </p>
              <p className="mt-[2px] text-[14px] text-[#9A94B0]" style={BODY}>
                {HERO.roleNote}
              </p>
            </div>
            <a
              href={HERO.cta.href}
              className="mt-[36px] inline-flex h-[46px] w-fit items-center rounded-[999px] px-[22px] text-[15px] font-semibold text-[#1A1826] transition-opacity hover:opacity-90"
              style={{ ...BODY, background: PAPER }}
            >
              {HERO.cta.label}
            </a>
          </div>

          {/* Hero media, exactly as designed: phone over the title still */}
          <div aria-hidden className="relative hidden shrink-0 lg:block" style={{ width: 540, minHeight: 560 }}>
            <div className="absolute left-0 top-[20px] h-[340px] w-[560px] overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.media.still.src} alt={HERO.media.still.alt} className="h-full w-full object-cover" draggable={false} />
            </div>
            <div
              className="absolute right-0 top-[120px] h-[440px] w-[210px] overflow-hidden rounded-[30px]"
              style={{ border: "6px solid #0B0A12" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO.media.phone.src}
                alt={HERO.media.phone.alt}
                className="h-full w-full object-cover"
                style={{ objectPosition: "85% center" }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Facts() {
  return (
    <section aria-label="At a glance" style={{ background: "#0F0D18" }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 lg:px-0">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <li
              key={fact.label}
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Scope() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={SCOPE.eyebrow} heading={SCOPE.heading} note={SCOPE.note} />
      <div className="grid gap-4 md:grid-cols-3">
        {SCOPE.cards.map((card) => (
          <article key={card.title} className="rounded-[18px] bg-white p-6">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-[#E7E3F8]">
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[16px] text-[17px] font-semibold leading-[1.5] text-[#1A1826]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.5] text-[#625E72]" style={BODY}>
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhatIDid() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={WHAT_I_DID.eyebrow} heading={WHAT_I_DID.heading} note={WHAT_I_DID.note} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WHAT_I_DID.cards.map((card) => (
          <article key={card.title} className="rounded-[18px] bg-white p-[22px] pb-6">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-[#E7E3F8]">
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[16px] text-[17px] font-semibold leading-[1.5] text-[#1A1826]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.5] text-[#625E72]" style={BODY}>
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Goals() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={GOALS.eyebrow} heading={GOALS.heading} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GOALS.items.map((goal) => (
          <article key={goal.num} className="rounded-[18px] bg-white p-[22px] pb-6">
            <p className="text-[22px] font-semibold leading-none" style={{ ...DISPLAY, color: VIOLET }}>
              {goal.num}
            </p>
            <h3 className="mt-[8px] text-[17px] font-semibold leading-[1.5] text-[#1A1826]" style={DISPLAY}>
              {goal.title}
            </h3>
            <p className="mt-[6px] text-[14px] leading-[1.5] text-[#625E72]" style={BODY}>
              {goal.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Storyboard() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={STORYBOARD.eyebrow} heading={STORYBOARD.heading} note={STORYBOARD.note} />
      <div className="grid grid-cols-2 gap-x-[12px] gap-y-[18px] sm:grid-cols-3 lg:grid-cols-6">
        {STORYBOARD.panels.map((panel) => (
          <figure key={panel.num}>
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
          </figure>
        ))}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {STORYBOARD.insights.map((ins) => (
          <div key={ins.title} className="rounded-[16px] bg-[#E7E3F8] p-5">
            <p className="text-[16px] font-semibold text-[#1A1826]" style={DISPLAY}>
              {ins.title}
            </p>
            <p className="mt-[6px] text-[14px] leading-[1.45] text-[#1A1826]" style={BODY}>
              {ins.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function UxFlow() {
  return (
    <section id="flow" className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={UX_FLOW.eyebrow} heading={UX_FLOW.heading} note={UX_FLOW.note} />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {UX_FLOW.stages.map((stage, i) => (
          <div key={stage.num} className="contents lg:flex lg:flex-1 lg:items-center">
            <div className="min-w-0 flex-1 rounded-[14px] bg-white p-[14px]">
              <p className="text-[22px] font-bold leading-none" style={{ ...DISPLAY, color: VIOLET }}>
                {stage.num}
              </p>
              <p className="mt-[10px] text-[15px] font-semibold text-[#1A1826]" style={BODY}>
                {stage.title}
              </p>
              <p className="mt-[4px] text-[12px] leading-[1.5] text-[#625E72]" style={BODY}>
                {stage.body}
              </p>
            </div>
            {i < UX_FLOW.stages.length - 1 && (
              <span className="hidden h-[24px] w-[24px] shrink-0 items-center justify-center lg:flex">
                <Icon name="icon-arrow" size={18} />
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-8 text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: VIOLET }}>
        {UX_FLOW.triggersLabel}
      </p>
      <div className="mt-[14px] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {UX_FLOW.triggers.map((trig) => (
          <div key={trig.title} className="flex items-start gap-3 rounded-[14px] bg-white p-4">
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
          </div>
        ))}
      </div>
    </section>
  );
}

function Challenges() {
  return (
    <section className="mt-[90px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-24 lg:px-0">
        <SectionHead onDark eyebrow={CHALLENGES.eyebrow} heading={CHALLENGES.heading} />
        <div className="grid gap-4 lg:grid-cols-3">
          {CHALLENGES.items.map((item) => (
            <article key={item.title} className="flex flex-col rounded-[20px] bg-[#211E30] p-[26px]">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-[16px] bg-[#2F2B44]">
                <Icon name={item.icon} size={32} />
              </span>
              <h3 className="mt-[16px] text-[20px] font-semibold leading-[1.5] text-[#F1EFF8]" style={DISPLAY}>
                {item.title}
              </h3>
              <p className="mt-[4px] text-[14px] leading-[1.5] text-[#B8B2CB]" style={BODY}>
                {item.body}
              </p>
              <div className="mt-auto flex flex-col gap-2 rounded-[14px] border p-4 pt-4" style={{ borderColor: "#3A3552" }}>
                <p className="text-[10px] font-bold tracking-[1px]" style={{ ...BODY, color: LAV }}>
                  HOW I SOLVED IT
                </p>
                <p className="text-[14px] leading-[1.5] text-[#F1EFF8]" style={BODY}>
                  {item.solved}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={FEATURES.eyebrow} heading={FEATURES.heading} note={FEATURES.note} />
      <div className="grid gap-6 lg:grid-cols-3">
        {FEATURES.items.map((f) => (
          <figure key={f.num}>
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
          </figure>
        ))}
      </div>
    </section>
  );
}

function Mockups() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={MOCKUPS.eyebrow} heading={MOCKUPS.heading} note={MOCKUPS.note} />
      <div className="grid gap-x-[16px] gap-y-6 md:grid-cols-2">
        {MOCKUPS.items.map((item) => (
          <figure key={item.caption}>
            <div className="h-[300px] overflow-hidden rounded-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.ph} alt={item.caption} className="h-full w-full object-cover" loading="lazy" draggable={false} />
            </div>
            <figcaption className="mt-[8px] text-[13px] text-[#625E72]" style={BODY}>
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Results() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={RESULTS.eyebrow} heading={RESULTS.heading} />
      <div className="grid gap-4 md:grid-cols-3">
        {RESULTS.impact.map((item) => (
          <div key={item.title} className="rounded-[18px] p-6" style={{ background: item.tone === "violet" ? VIOLET : DARK }}>
            <p className="text-[30px] font-semibold leading-none text-[#F1EFF8]" style={DISPLAY}>
              {item.title}
            </p>
            <p className="mt-[12px] text-[14px] leading-[1.5] text-[#C6C1D9]" style={BODY}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
      <figure className="mt-4 flex gap-6 rounded-[20px] bg-[#E9E6F3] p-10">
        <span aria-hidden className="text-[54px] font-bold leading-[0.8]" style={{ ...DISPLAY, color: VIOLET }}>
          “
        </span>
        <blockquote className="max-w-[880px] text-[20px] font-medium leading-[1.4] text-[#1A1826] md:text-[21px]" style={DISPLAY}>
          {RESULTS.quote}
        </blockquote>
      </figure>
      <p className="mt-6 text-[12px] leading-[1.5] text-[#625E72]" style={BODY}>
        {RESULTS.credit}
      </p>
    </section>
  );
}

function MoreProjects() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[90px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#625E72]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#1A1826] pb-[2px] text-[14px] font-semibold text-[#1A1826]" style={BODY}>
          All work
        </Link>
      </div>
      <div className="mt-[28px] grid gap-4 md:grid-cols-2">
        {NEIGHBORS.map((n) => (
          <Link
            key={n.title}
            href={n.href}
            className="group flex items-center gap-[20px] rounded-[18px] bg-white p-[14px] transition-transform motion-safe:group-hover:-translate-y-[2px]"
          >
            <span
              className="flex h-[110px] w-[150px] shrink-0 items-end rounded-[12px] p-[8px]"
              style={{ background: n.thumbBg }}
            >
              <span className="text-[11px]" style={{ ...BODY, color: n.thumbFg }}>
                [Thumbnail]
              </span>
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
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: DARK }}>
      <div className="mx-auto flex w-full max-w-[1036px] flex-wrap items-center justify-between gap-6 px-6 py-14 lg:px-0">
        <div>
          <p className="text-[32px] font-semibold text-[#F1EFF8]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#3A3552] pb-[2px] text-[16px] text-[#CBC6DC] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#F1EFF8] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* ---------------------------------- page ----------------------------------- */

export default function AscensionCase() {
  return (
    <main style={{ background: PAPER }}>
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
