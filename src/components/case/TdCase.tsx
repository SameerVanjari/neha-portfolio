"use client";

import Link from "next/link";
import {
  ACTIVATION,
  BRANDED,
  CELEBRATION,
  FACTS,
  HERO,
  IDEA,
  NEIGHBORS,
  ROLE,
  TAKEAWAYS,
} from "@/data/td";
import { FOOTER_LINKS } from "@/data/landing";

const DARK = "#101A14";
const FAINT_DARK = "#0B130E";
const GREEN = "#1F8A3B";
const LIGHT = "#7FDB8F";
const TILE = "#E2F3E5";
const PAPER = "#F4F6F4";
const INK = "#18201B";
const MUTED = "#5B6A60";
const PANEL = "#25392B";
const PHONE_EDGE = "#0A110C";
const HAIR = "#1F3025";
const PIPE_CARD = "#1A2A1F";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

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
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 pb-9">
      <div className="max-w-[620px]">
        <p
          className="text-[11px] font-bold uppercase tracking-[1.32px]"
          style={{ ...BODY, color: dark ? LIGHT : GREEN }}
        >
          {eyebrow}
        </p>
        <h2
          className="mt-[14px] text-[30px] leading-[1.15] tracking-[-0.38px] md:text-[38px]"
          style={{ ...DISPLAY, color: dark ? "#EEF5EF" : INK }}
        >
          {heading}
        </h2>
      </div>
      {note && (
        <p
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#B2C3B6" : MUTED }}
        >
          {note}
        </p>
      )}
    </div>
  );
}

function Icon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/case/td/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden
      draggable={false}
      className={`select-none ${className}`}
    />
  );
}

function Phone({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ background: PANEL, border: `6px solid ${PHONE_EDGE}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
    </div>
  );
}

function Nav() {
  return (
    <header style={{ background: PAPER }}>
      <div className="mx-auto flex h-[68px] w-full max-w-[1036px] items-center justify-between px-6 lg:px-0">
        <Link href="/" className="text-[16px] font-semibold" style={{ ...DISPLAY, color: INK }}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#18201B] pb-[3px] text-[14px]" style={{ color: INK }}>
            Work
          </Link>
          <Link href="/about" className="text-[14px] transition-opacity hover:opacity-70" style={{ color: INK }}>
            About
          </Link>
          <a href="/resume.pdf" className="text-[14px] transition-opacity hover:opacity-70" style={{ color: INK }}>
            Résumé (PDF)
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-[40px] items-center rounded-[999px] px-[20px] text-[14px] font-semibold text-white"
            style={{ background: INK }}
          >
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex h-[40px] items-center rounded-[999px] px-[20px] text-[14px] font-semibold text-white md:hidden"
          style={{ ...BODY, background: INK }}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: DARK }}>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-40px] top-[10px] size-[660px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(31,138,59,0.55) 0%, rgba(31,138,59,0.18) 38%, rgba(16,26,20,0) 70%)",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-[1036px] items-center gap-10 px-6 py-[70px] lg:grid-cols-[1fr_262px] lg:justify-between lg:px-0 lg:py-[90px]">
        <div className="max-w-[560px]">
          <p className="text-[13px] font-semibold" style={{ ...BODY, color: LIGHT }}>
            <span className="text-white">{HERO.eyebrowLead}</span>
            {HERO.eyebrowRest}
          </p>
          <h1
            className="mt-[18px] max-w-[560px] text-[clamp(36px,4.4vw,60px)] font-semibold leading-[1.04] tracking-[-1.2px] text-[#EEF5EF]"
            style={DISPLAY}
          >
            {HERO.title}
          </h1>
          <p className="mt-[18px] max-w-[520px] text-[19px] leading-[1.5] text-[#C5D4C8]" style={BODY}>
            {HERO.subtitle}
          </p>
          <div className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: LIGHT }}>
            <p className="text-[16px] text-[#C5D4C8]" style={BODY}>
              <span className="font-semibold text-[#EEF5EF]">{HERO.role}</span>
              {HERO.roleAgency}
            </p>
            <p className="mt-[2px] text-[14px] text-[#93A698]" style={BODY}>
              {HERO.roleNote}
            </p>
          </div>
          <a
            href="#celebration"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold"
            style={{ ...BODY, background: PAPER, color: INK }}
          >
            {HERO.cta}
          </a>
        </div>
        <Phone src={HERO.phone.src} alt={HERO.phone.alt} className="mx-auto h-[470px] w-[262px] rounded-[32px] shadow-[0px_24px_50px_0px_rgba(0,0,0,0.45)]" />
      </div>
    </section>
  );
}

function Facts() {
  return (
    <section aria-label="At a glance" style={{ background: FAINT_DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 lg:px-0">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <li
              key={fact.label}
              className="flex items-start gap-3 py-[22px] lg:px-5 lg:first:pl-0"
              style={{ borderLeft: i > 0 ? `1px solid ${HAIR}` : undefined }}
            >
              <Icon name={fact.icon} size={20} className="mt-[2px] shrink-0" />
              <div>
                <p className="text-[11px] tracking-[0.44px] text-[#93A698]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#EEF5EF]" style={BODY}>
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

function Idea() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={IDEA.eyebrow} heading={IDEA.heading} note={IDEA.note} />
      <div className="grid items-start gap-6 lg:grid-cols-[380px_1fr]">
        <div className="flex flex-col gap-3">
          {IDEA.beats.map((beat) => {
            const green = beat.tone === "green";
            return (
              <article
                key={beat.title}
                className="flex items-center gap-4 rounded-[16px] px-5 py-[18px]"
                style={{ background: green ? GREEN : "#FFFFFF" }}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px]"
                  style={{ background: green ? "rgba(255,255,255,0.18)" : TILE }}
                >
                  <Icon name={beat.icon} size={22} />
                </span>
                <div>
                  <p className="text-[18px] font-semibold" style={{ ...BODY, color: green ? "#FFFFFF" : INK }}>
                    {beat.num} {beat.title}
                  </p>
                  <p className="mt-[2px] text-[14px] leading-[1.5]" style={{ ...BODY, color: green ? "#DDF3E1" : MUTED }}>
                    {beat.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <div>
          <div className="h-[354px] overflow-hidden rounded-[16px]" style={{ background: PANEL }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IDEA.prototype.src} alt={IDEA.prototype.alt} className="h-full w-full object-cover" loading="lazy" draggable={false} />
          </div>
          <p className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
            {IDEA.prototype.caption}
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatIDid() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={ROLE.eyebrow} heading={ROLE.heading} note={ROLE.note} />
      <div className="relative">
        <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[28px] hidden h-px lg:block" style={{ background: LIGHT }} />
        <ol className="relative grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {ROLE.steps.map((step) => (
            <li key={step.title} className="flex flex-col items-center gap-1 text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: GREEN }}>
                <Icon name={step.icon} size={20} />
              </span>
              <p className="mt-[10px] text-[15px] font-semibold" style={{ ...DISPLAY, color: INK }}>
                {step.title}
              </p>
              <p className="max-w-[247px] text-[13px] leading-[1.4]" style={{ ...BODY, color: MUTED }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-7 grid gap-[14px] md:grid-cols-3">
        {ROLE.tiles.map((tile) => (
          <div
            key={tile.num}
            className="rounded-[18px] px-[22px] pb-6 pt-[22px]"
            style={{ background: tile.tone === "green" ? GREEN : DARK }}
          >
            <p className="text-[30px] font-semibold leading-[1.1] text-[#EEF5EF]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#D6E7DA]" style={BODY}>
              {tile.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Activation() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={ACTIVATION.eyebrow} heading={ACTIVATION.heading} note={ACTIVATION.note} />
      <div className="grid items-center gap-6 lg:grid-cols-[230px_230px_1fr]">
        {ACTIVATION.phones.map((phone) => (
          <figure key={phone.note}>
            <Phone src={phone.src} alt={phone.alt} className="h-[406px] w-full rounded-[28px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {phone.caption}
            </figcaption>
          </figure>
        ))}
        <div className="flex flex-col gap-[14px]">
          {ACTIVATION.notes.map((item) => (
            <article key={item.title} className="flex items-start gap-[14px] rounded-[14px] bg-white px-[18px] py-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ ...BODY, background: GREEN }}>
                {item.num}
              </span>
              <div>
                <p className="text-[16px] font-semibold" style={{ ...BODY, color: INK }}>
                  {item.title}
                </p>
                <p className="mt-[2px] text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
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

function Branded() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BRANDED.eyebrow} heading={BRANDED.heading} />
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_230px_230px]">
        <div className="flex flex-col gap-[14px]">
          {BRANDED.cards.map((card) => (
            <article key={card.title} className="rounded-[18px] bg-white px-6 pb-6 pt-[22px]">
              <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: TILE }}>
                <Icon name={card.icon} size={20} />
              </span>
              <h3 className="mt-[10px] text-[18px] font-semibold leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
                {card.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                {card.body}
              </p>
            </article>
          ))}
        </div>
        {BRANDED.phones.map((phone) => (
          <figure key={phone.note}>
            <Phone src={phone.src} alt={phone.alt} className="h-[406px] w-full rounded-[28px]" />
            <figcaption className="mt-[10px] text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {phone.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Celebration() {
  return (
    <section id="celebration" className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={CELEBRATION.eyebrow} heading={CELEBRATION.heading} note={CELEBRATION.note} dark />
        <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
          {CELEBRATION.pipeline.map((item, i) =>
            "arrow" in item ? (
              <span key={`arrow-${i}`} className="hidden h-6 w-6 shrink-0 items-center justify-center lg:flex">
                <Icon name={item.icon} size={18} />
              </span>
            ) : (
              <article
                key={item.title}
                className="min-w-0 rounded-[16px] px-5 pb-[22px] pt-5 lg:flex-1"
                style={{ background: "last" in item ? GREEN : PIPE_CARD }}
              >
                <Icon name={item.icon} size={24} />
                <p className="mt-3 text-[17px] font-semibold text-[#EEF5EF]" style={BODY}>
                  {item.title}
                </p>
                <p
                  className="mt-2 text-[13px] leading-[1.5]"
                  style={{ ...BODY, color: "last" in item ? "#DDF3E1" : "#B2C3B6" }}
                >
                  {item.body}
                </p>
              </article>
            ),
          )}
        </div>
        <div className="mt-8 grid items-center gap-6 lg:grid-cols-[230px_230px_1fr]">
          {CELEBRATION.shots.map((shot) => (
            <figure key={shot.note}>
              <Phone src={shot.src} alt={shot.alt} className="h-[406px] w-full rounded-[28px]" />
              <figcaption className="mt-[10px] text-[13px] leading-[1.5] text-[#B2C3B6]" style={BODY}>
                {shot.caption}
              </figcaption>
            </figure>
          ))}
          <div className="flex flex-col gap-[14px]">
            {CELEBRATION.notes.map((item) => (
              <article key={item.title} className="flex items-start gap-[14px] rounded-[14px] px-[18px] py-4" style={{ background: PIPE_CARD }}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ ...BODY, background: GREEN }}>
                  {item.num}
                </span>
                <div>
                  <p className="text-[16px] font-semibold text-[#EEF5EF]" style={BODY}>
                    {item.title}
                  </p>
                  <p className="mt-[2px] text-[14px] leading-[1.5] text-[#B2C3B6]" style={BODY}>
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Takeaways() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={TAKEAWAYS.eyebrow} heading={TAKEAWAYS.heading} />
      <div className="grid gap-[14px] md:grid-cols-3">
        {TAKEAWAYS.cards.map((card) => (
          <article
            key={card.title}
            className="rounded-[18px] px-6 pb-[26px] pt-6"
            style={{ background: card.tone === "green" ? GREEN : DARK }}
          >
            <Icon name={card.icon} size={26} />
            <h3 className="mt-[10px] text-[22px] font-semibold leading-[1.2] text-[#EEF5EF]" style={DISPLAY}>
              {card.title}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#D6E7DA]" style={BODY}>
              {card.body}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {TAKEAWAYS.credit}
      </p>
    </section>
  );
}

function MoreProjects() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pb-[90px] pt-[110px] lg:px-0">
      <div className="flex items-center justify-between">
        <p className="text-[12px] tracking-[1.2px]" style={{ ...BODY, color: MUTED }}>
          MORE PROJECTS
        </p>
        <Link href="/projects" className="border-b pb-[2px] text-[14px] font-semibold" style={{ ...BODY, color: INK, borderColor: INK }}>
          All work
        </Link>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {NEIGHBORS.map((n) => (
          <Link
            key={n.title}
            href={n.href}
            className="group flex items-center gap-5 rounded-[18px] bg-white p-[14px] transition-transform motion-safe:hover:-translate-y-[2px]"
          >
            <span
              className="flex h-[110px] w-[150px] shrink-0 items-end rounded-[12px] p-2"
              style={{ background: n.thumbBg }}
            >
              <span className="text-[11px]" style={{ ...BODY, color: n.thumbFg }}>
                [Thumbnail]
              </span>
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
          <p className="text-[32px] font-semibold text-[#EEF5EF]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#C5D4C8] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#EEF5EF] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function TdCase() {
  return (
    <main style={{ background: PAPER }}>
      <Nav />
      <Hero />
      <Facts />
      <Idea />
      <WhatIDid />
      <Activation />
      <Branded />
      <Celebration />
      <Takeaways />
      <MoreProjects />
      <Footer />
    </main>
  );
}
