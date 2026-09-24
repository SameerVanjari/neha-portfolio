"use client";

import Link from "next/link";
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

/* ---------------------------------- tokens --------------------------------- */

const DARK = "#1E1814";
const RUST = "#C8502A";
const PEACH = "#F2A27E";
const PAPER = "#F7F2EE";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

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
  return (
    <div className="flex flex-wrap items-start justify-between gap-6 pb-9">
      <div className="max-w-[620px]">
        <p className={`text-[11px] font-bold uppercase tracking-[1.32px] ${onDark ? "text-[#F2A27E]" : "text-[#C8502A]"}`} style={BODY}>
          {eyebrow}
        </p>
        <h2
          className={`mt-[14px] text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.38px] ${onDark ? "text-[#F7EFEA]" : "text-[#221A16]"}`}
          style={DISPLAY}
        >
          {heading}
        </h2>
      </div>
      {note && (
        <p className={`max-w-[340px] pt-[24px] text-[14px] leading-[1.5] ${onDark ? "text-[#C4B2A8]" : "text-[#6B5E57]"}`} style={BODY}>
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
        <Link href="/" className="text-[16px] font-semibold text-[#221A16]" style={DISPLAY}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#221A16] pb-[3px] text-[14px] text-[#221A16]">
            Work
          </Link>
          <Link href="/about" className="text-[14px] text-[#221A16] transition-opacity hover:opacity-70">
            About
          </Link>
          <a href="/resume.pdf" className="text-[14px] text-[#221A16] transition-opacity hover:opacity-70">
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] bg-[#221A16] px-[20px] text-[14px] font-semibold text-white"
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] bg-[#221A16] px-[20px] text-[14px] font-semibold text-white md:hidden"
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
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="flex max-w-[560px] flex-col">
            <div className="flex flex-col items-start gap-[18px]">
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
            </div>
            <div className="mt-[36px] border-l-2 pl-[19px]" style={{ borderColor: PEACH }}>
              <p className="text-[16px] text-[#D8C8BF]" style={BODY}>
                {HERO.role}
              </p>
              <p className="mt-[2px] text-[14px] text-[#A89488]" style={BODY}>
                {HERO.roleNote}
              </p>
            </div>
            <a
              href={HERO.cta.href}
              className="mt-[36px] inline-flex h-[46px] w-fit items-center rounded-[999px] px-[22px] text-[15px] font-semibold text-[#221A16] transition-opacity hover:opacity-90"
              style={{ ...BODY, background: PAPER }}
            >
              {HERO.cta.label}
            </a>
          </div>

          {/* Hero media, exactly as designed: handheld proof over AR pantry */}
          <div aria-hidden className="relative hidden shrink-0 lg:block" style={{ width: 440, minHeight: 540 }}>
            <div className="absolute left-0 top-0 h-[540px] w-[270px] overflow-hidden rounded-[32px]" style={{ border: "6px solid #0E0B09" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.media.pantry.src} alt={HERO.media.pantry.alt} className="h-full w-full object-cover" draggable={false} />
            </div>
            <div className="absolute right-0 top-[40px] h-[500px] w-[250px] overflow-hidden rounded-[30px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.media.handheld.src} alt={HERO.media.handheld.alt} className="h-full w-full object-cover" draggable={false} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Facts() {
  return (
    <section aria-label="At a glance" style={{ background: "#15110E" }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 lg:px-0">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <li
              key={fact.label}
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Brief() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={BRIEF.eyebrow} heading={BRIEF.heading} note={BRIEF.note} />
      <div className="grid gap-4 md:grid-cols-3">
        {BRIEF.cards.map((card) => (
          <article key={card.title} className="rounded-[18px] bg-white p-6">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-[#F8E3D8]">
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5] text-[#221A16]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.5] text-[#6B5E57]" style={BODY}>
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
      <div className="relative">
        <div aria-hidden className="absolute left-[86px] right-[86px] top-[28px] hidden h-px bg-[#F2A27E] lg:block" />
        <ol className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {WHAT_I_DID.steps.map((step) => (
            <li key={step.title} className="flex flex-col items-center gap-2 text-center">
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
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-[46px] grid gap-4 md:grid-cols-3">
        {WHAT_I_DID.tiles.map((tile) => (
          <div
            key={tile.num}
            className="rounded-[18px] p-[22px] pb-6"
            style={{ background: tile.tone === "rust" ? RUST : DARK }}
          >
            <p className="text-[30px] font-semibold leading-none text-[#F7EFEA]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-[12px] text-[14px] leading-[1.5] text-[#EAD9CF]" style={BODY}>
              {tile.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function KeyDecisions() {
  return (
    <section className="mt-[90px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-24 lg:px-0">
        <SectionHead onDark eyebrow={KEY_DECISIONS.eyebrow} heading={KEY_DECISIONS.heading} />
        <div className="grid gap-4 lg:grid-cols-3">
          {KEY_DECISIONS.items.map((item) => (
            <article key={item.title} className="rounded-[20px] bg-[#2A221D] p-[26px]">
              <span className="flex h-[80px] w-[80px] items-center justify-center rounded-[16px] bg-[#3A2F28]">
                <Icon name={item.icon} size={34} />
              </span>
              <p className="mt-[18px] text-[11px] font-bold tracking-[1.1px]" style={{ ...BODY, color: PEACH }}>
                {item.label.toUpperCase()}
              </p>
              <h3 className="mt-[6px] text-[20px] font-semibold leading-[1.5] text-[#F7EFEA]" style={DISPLAY}>
                {item.title}
              </h3>
              <p className="mt-[5px] text-[14px] leading-[1.5] text-[#C4B2A8]" style={BODY}>
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Storyboard() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={STORYBOARD.eyebrow} heading={STORYBOARD.heading} note={STORYBOARD.note} />
      <div className="h-[350px] overflow-hidden rounded-[16px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={STORYBOARD.image.src} alt={STORYBOARD.image.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STORYBOARD.beats.map((beat, i) => (
          <div key={beat} className="flex items-center gap-[12px] rounded-[14px] bg-white px-4 py-[14px]">
            <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[999px] text-[13px] font-bold text-white" style={{ ...BODY, background: RUST }}>
              {i + 1}
            </span>
            <p className="text-[14px] font-medium leading-[1.5] text-[#221A16]" style={BODY}>
              {beat}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Environment() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={ENVIRONMENT.eyebrow} heading={ENVIRONMENT.heading} />
      <div className="grid gap-6 lg:grid-cols-[620px_1fr]">
        <div className="h-[450px] overflow-hidden rounded-[16px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ENVIRONMENT.image.src} alt={ENVIRONMENT.image.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
        </div>
        <div className="flex flex-col gap-4">
          {ENVIRONMENT.cards.map((card) => (
            <article
              key={card.title}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testing() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={TESTING.eyebrow} heading={TESTING.heading} note={TESTING.note} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TESTING.captures.map((cap) => (
          <div key={cap.src} className="h-[320px] overflow-hidden rounded-[16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cap.src} alt={cap.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

function InAction() {
  return (
    <section id="action" className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={IN_ACTION.eyebrow} heading={IN_ACTION.heading} note={IN_ACTION.note} />
      <div className="grid gap-4 lg:grid-cols-[610px_1fr]">
        {IN_ACTION.captures.map((cap) => (
          <div key={cap.src} className="h-[344px] overflow-hidden rounded-[16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cap.src} alt={cap.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Results() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[90px] lg:px-0">
      <SectionHead eyebrow={RESULTS.eyebrow} heading={RESULTS.heading} note={RESULTS.note} />
      <div className="grid gap-4 md:grid-cols-3">
        {RESULTS.impact.map((item) => (
          <div key={item.title} className="rounded-[18px] p-6" style={{ background: item.tone === "rust" ? RUST : DARK }}>
            <p className="text-[36px] font-semibold leading-none text-[#F7EFEA]" style={DISPLAY}>
              {item.title}
            </p>
            <p className="mt-[12px] text-[14px] text-[#EAD9CF]" style={BODY}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
      <figure className="mt-4 flex gap-6 rounded-[20px] bg-[#F0E4DB] p-10">
        <span aria-hidden className="text-[54px] font-bold leading-[0.8]" style={{ ...DISPLAY, color: RUST }}>
          “
        </span>
        <figure>
          <blockquote className="max-w-[880px] text-[20px] font-medium leading-[1.4] text-[#221A16] md:text-[21px]" style={DISPLAY}>
            {RESULTS.quote.lead}
          </blockquote>
          <figcaption className="mt-[10px] text-[13px] text-[#6B5E57]" style={BODY}>
            {RESULTS.quote.follow}
          </figcaption>
        </figure>
      </figure>
      <p className="mt-6 text-[12px] leading-[1.5] text-[#6B5E57]" style={BODY}>
        {RESULTS.credit}
      </p>
    </section>
  );
}

function MoreProjects() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[90px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#6B5E57]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#221A16] pb-[2px] text-[14px] font-semibold text-[#221A16]" style={BODY}>
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
          <p className="text-[32px] font-semibold text-[#F7EFEA]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#4A3E36] pb-[2px] text-[16px] text-[#D8C8BF] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#F7EFEA] transition-opacity hover:opacity-80"
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
