"use client";

import Link from "next/link";
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

function Icon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
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
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-[700px]">
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
      </div>
      {note && (
        <p className={`max-w-[320px] pb-1 text-[14px] leading-[1.55] ${onDark ? "text-[#B9C1CA]" : "text-[#5F6670]"}`} style={BODY}>
          {note}
        </p>
      )}
    </div>
  );
}

/* --------------------------------- sections -------------------------------- */

function Nav() {
  return (
    <header className="bg-[#F4EFE7]">
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
          <a href="/resume.pdf" className="text-[14px] text-[#1B1F24] transition-opacity hover:opacity-70">
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
    </header>
  );
}

function Hero() {
  return (
    <header className="bg-[#141A21]">
      <div className="mx-auto w-full max-w-[1100px] px-6 pb-[70px] pt-[60px] lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[556px]">
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
            <div className="mt-[40px] border-l-2 pl-[19px]" style={{ borderColor: "#A3C2DA" }}>
              <p className="text-[16px] font-semibold text-[#EEF1F4]" style={BODY}>
                {HERO.role}
              </p>
              <p className="mt-[4px] text-[14px] text-[#9AA4AF]" style={BODY}>
                {HERO.roleNote}
              </p>
            </div>
            <a
              href={HERO.cta.href}
              className="mt-[48px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold text-[#1B1F24] transition-opacity hover:opacity-90"
              style={{ ...BODY, background: PAPER }}
            >
              {HERO.cta.label}
            </a>
          </div>
          <div className="mx-auto w-full max-w-[455px] shrink-0 lg:mx-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO.fan}
              alt="Pausa mobile screens fanned out"
              width={911}
              height={940}
              className="w-full select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function Facts() {
  return (
    <section aria-label="At a glance" className="bg-[#10151B]">
      <div className="mx-auto w-full max-w-[1100px] px-6 lg:px-8">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <li
              key={fact.label}
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={PROBLEM.label} heading={PROBLEM.heading} />
      <div className="mt-[36px] grid gap-4 md:grid-cols-3">
        {PROBLEM.cards.map((card) => (
          <article key={card.title} className="rounded-[18px] bg-[#FBF9F4] p-[26px]">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px] bg-[#DCE9F1]">
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[15px] text-[18px] font-semibold leading-[1.55] text-[#1B1F24]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-[#5F6670]" style={BODY}>
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
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={WHAT_I_DID.label} heading={WHAT_I_DID.heading} note={WHAT_I_DID.note} />
      <div className="relative mt-[54px]">
        <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-[#A3C2DA] lg:block" />
        <ol className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {WHAT_I_DID.steps.map((step) => (
            <li key={step.title} className="flex flex-col items-center gap-[12px] text-center">
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
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-[46px] grid grid-cols-2 gap-4 lg:grid-cols-4">
        {WHAT_I_DID.stats.map((stat) => (
          <div key={stat.label} className="rounded-[16px] bg-[#141A21] p-[22px] pb-[24px]">
            <p className="text-[30px] font-semibold leading-none text-[#EEF1F4]" style={DISPLAY}>
              {stat.num}
            </p>
            <p className="mt-[8px] text-[14px] leading-[1.55] text-[#B9C1CA]" style={BODY}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Research() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={RESEARCH.label} heading={RESEARCH.heading} />
      <div className="mt-[36px] rounded-[22px] bg-[#FBF9F4] px-7 py-2">
        {RESEARCH.rows.map((row, i) => (
          <div
            key={row.citation}
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
          </div>
        ))}
      </div>
    </section>
  );
}

function Conversation() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={CONVERSATION.label} heading={CONVERSATION.heading} note={CONVERSATION.note} />
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
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {CONVERSATION.thumbs.map((thumb) => {
          const warm = thumb.tone === "warm";
          return (
            <div key={thumb.num} className="flex flex-col justify-between gap-[38px] rounded-[18px] p-[22px]" style={{ background: warm ? "#F3E4DA" : DARK }}>
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
            </div>
          );
        })}
      </div>
    </section>
  );
}

function UxHifi() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={UX_HIFI.label} heading={UX_HIFI.heading} />
      <div className="mt-[36px] flex flex-col items-stretch gap-6 lg:flex-row lg:items-center">
        {UX_HIFI.panels.map((panel, i) => {
          const light = panel.kind === "wireframe";
          return (
            <div key={panel.tag} className="contents lg:flex lg:flex-1 lg:flex-col lg:gap-[12px]">
              {i === 1 && (
                <span className="mx-auto hidden h-[44px] w-[44px] items-center justify-center rounded-[999px] lg:flex" style={{ background: BLUE }}>
                  <Icon name="icon-arrow" size={20} />
                </span>
              )}
              <div className="lg:flex lg:flex-1 lg:flex-col lg:gap-[12px]">
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
                <p className="text-[11px] tracking-[0.66px] text-[#5F6670]" style={BODY}>
                  {panel.tag.toUpperCase()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {UX_HIFI.cards.map((card) => (
          <article key={card.title} className="rounded-[18px] bg-[#FBF9F4] p-[26px]">
            <h3 className="text-[18px] font-semibold leading-[1.55] text-[#1B1F24]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-[#5F6670]" style={BODY}>
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function KeyDecisions() {
  return (
    <section className="mt-[90px] bg-[#141A21]">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-[90px] lg:px-8">
        <SectionHead onDark label={KEY_DECISIONS.label} heading={KEY_DECISIONS.heading} />
        <div className="mt-[44px] grid gap-4 lg:grid-cols-2">
          {KEY_DECISIONS.items.map((item) => (
            <article key={item.title} className="flex items-start gap-[24px] rounded-[20px] bg-[#1E2630] p-[26px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.art}
                width={104}
                height={104}
                alt=""
                aria-hidden
                draggable={false}
                className="shrink-0 select-none rounded-[16px]"
              />
              <div>
                <h3 className="text-[18px] font-semibold leading-[1.55] text-[#EEF1F4]" style={DISPLAY}>
                  {item.title}
                </h3>
                <p className="mt-[5px] text-[14px] leading-[1.55] text-[#B9C1CA]" style={BODY}>
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisualVoice() {
  return (
    <section className="mx-auto grid w-full max-w-[1100px] gap-10 px-6 pt-[90px] lg:grid-cols-2 lg:px-8">
      <div>
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
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: BLUE }}>
          {VISUAL_VOICE.voice.label}
        </p>
        <h2 className="mt-[12px] text-[28px] font-semibold leading-[1.15] tracking-[-0.28px] text-[#1B1F24]" style={DISPLAY}>
          {VISUAL_VOICE.voice.heading}
        </h2>
        <div className="mt-[26px] flex flex-col gap-[8px]">
          {VISUAL_VOICE.voice.rows.map((row) => {
            const styles = {
              deep: { bg: "#1F4E6C", fg: "#FFFFFF" },
              blue: { bg: BLUE, fg: "#FFFFFF" },
              mid: { bg: "#7FA6C2", fg: "#10202C" },
              light: { bg: "#C9DCE8", fg: INK },
              outline: { bg: CARD, fg: INK },
            }[row.tone];
            return (
              <div
                key={row.label}
                className="flex min-h-[48px] items-center justify-between gap-4 rounded-[10px] px-4 py-3"
                style={{ background: styles.bg, color: styles.fg, ...(row.tone === "outline" ? { border: `1px solid ${HAIR}` } : {}) }}
              >
                <p className="text-[14px] font-semibold" style={BODY}>
                  {row.label}
                </p>
                <p className="text-right text-[14px]" style={BODY}>
                  {row.quote}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Hifi() {
  return (
    <section id="hifi" className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={HIFI.label} heading={HIFI.heading} note={HIFI.note} />
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
    </section>
  );
}

function NextSteps() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pt-[90px] lg:px-8">
      <SectionHead label={NEXT_STEPS.label} heading={NEXT_STEPS.heading} />
      <div className="mt-[36px] grid gap-4 md:grid-cols-3">
        {NEXT_STEPS.stats.map((stat) => {
          const blue = stat.tone === "blue";
          return (
            <div key={stat.label} className="rounded-[18px] p-[24px]" style={{ background: blue ? BLUE : DARK }}>
              <p className="text-[40px] font-semibold leading-none text-[#EEF1F4]" style={DISPLAY}>
                {stat.num}
              </p>
              <p className="mt-[14px] text-[13px]" style={{ ...BODY, color: blue ? "#C6D4DF" : "#C6D4DF" }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
      <figure className="mt-8 flex gap-[24px] rounded-[20px] bg-[#EAE3D8] p-[40px]">
        <span aria-hidden className="text-[54px] font-bold leading-[0.8]" style={{ ...DISPLAY, color: BLUE }}>
          “
        </span>
        <figure>
          <blockquote className="max-w-[492px] text-[20px] font-medium leading-[1.4] text-[#1B1F24] md:text-[22px]" style={DISPLAY}>
            {NEXT_STEPS.quote.text}
          </blockquote>
          <figcaption className="mt-[16px] text-[13px] text-[#5F6670]" style={BODY}>
            {NEXT_STEPS.quote.source}
          </figcaption>
        </figure>
      </figure>
      <p className="mt-6 max-w-[900px] text-[12px] leading-[1.55] text-[#5F6670]" style={BODY}>
        {NEXT_STEPS.disclaimer}
      </p>
    </section>
  );
}

function MoreProjects() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-6 pb-[90px] pt-[90px] lg:px-8">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px] text-[#5F6670]" style={BODY}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b border-[#1B1F24] pb-[2px] text-[14px] font-semibold text-[#1B1F24]" style={BODY}>
          All work
        </Link>
      </div>
      <div className="mt-[28px] grid gap-4 md:grid-cols-2">
        {NEIGHBORS.map((n) => (
          <Link
            key={n.title}
            href={n.href}
            className="group flex items-center gap-[20px] rounded-[18px] bg-[#FBF9F4] p-[14px] transition-transform motion-safe:group-hover:-translate-y-[2px]"
          >
            <span
              className="relative h-[110px] w-[150px] shrink-0 overflow-hidden rounded-[12px]"
              style={{ background: n.thumbDark ? "#231B1D" : "#E6DFD3" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={n.thumb}
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
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#141A21]">
      <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-6 px-6 py-[56px] lg:px-8">
        <div>
          <p className="text-[32px] font-semibold tracking-[-0.32px] text-[#EEF1F4]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#56606B] pb-[2px] text-[16px] text-[#C6CDD5] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#EEF1F4] transition-opacity hover:opacity-80"
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

export default function PausaCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
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
