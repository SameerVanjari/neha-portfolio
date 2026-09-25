"use client";

import Link from "next/link";
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
      </div>
      {note && (
        <p
          className="max-w-[340px] text-right text-[14px] leading-[1.5]"
          style={{ ...BODY, color: dark ? "#C3B0BB" : MUTED }}
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

function DropZone({
  note,
  className = "",
  play,
}: {
  note: string;
  className?: string;
  play?: boolean;
}) {
  return (
    <div
      aria-label={`Media placeholder: ${note}`}
      className={`relative flex w-full flex-col items-center justify-center overflow-hidden ${className}`}
      style={{ background: PANEL }}
    >
      {play && <Icon name="icon-play" size={28} />}
      <span
        className="mt-2 px-2 text-center text-[10px] leading-[1.4]"
        style={{ ...BODY, color: PINK }}
      >
        Drop image or video
        <br />
        {note}
      </span>
    </div>
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

function Clip({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
}) {
  return (
    <video
      className={`h-full w-full object-cover ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label={label}
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
        <DropZone note={note} className={`w-full rounded-[2px] ${frameClass}`} />
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
  return (
    <header style={{ background: PAPER }}>
      <div className="mx-auto flex h-[68px] w-full max-w-[1036px] items-center justify-between px-6 lg:px-0">
        <Link href="/" className="text-[16px] font-semibold" style={{ ...DISPLAY, color: INK }}>
          Neha Mayacharya
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-[30px] md:flex" style={BODY}>
          <Link href="/projects" className="border-b border-[#1E1419] pb-[3px] text-[14px]" style={{ color: INK }}>
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
      <div className="relative mx-auto grid w-full max-w-[1036px] items-center gap-10 px-6 py-[70px] lg:grid-cols-[1fr_520px] lg:px-0 lg:py-[90px]">
        <div className="max-w-[560px]">
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
          <div className="mt-[36px] border-l-[3px] pl-4" style={{ borderColor: PINK }}>
            <p className="text-[16px] text-[#D7C6CF]" style={BODY}>
              <span className="font-semibold text-[#F6EEF2]">{HERO.role}</span>
              {HERO.roleAgency}
            </p>
            <p className="mt-[2px] text-[14px] text-[#A8929F]" style={BODY}>
              {HERO.roleNote}
            </p>
          </div>
          <a
            href="#campaign"
            className="mt-[36px] inline-flex h-[46px] items-center rounded-[999px] px-[22px] text-[15px] font-semibold"
            style={{ ...BODY, background: PAPER, color: INK }}
          >
            {HERO.cta}
          </a>
        </div>
        <div className="relative mx-auto hidden h-[560px] w-full max-w-[520px] lg:block">
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
        </div>
        <div className="mx-auto w-[260px] lg:hidden">
          <Polaroid
            name={holy.name}
            src={holy.src}
            alt={holy.alt}
            note={holy.note}
            className="rounded-[4px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.4)]"
            frameClass="h-[255px]"
          />
        </div>
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
                <p className="text-[11px] tracking-[0.44px] text-[#A8929F]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-[2px] text-[15px] font-semibold leading-[1.5] text-[#F6EEF2]" style={BODY}>
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

function Overview() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={OVERVIEW.eyebrow} heading={OVERVIEW.heading} />
      <div className="grid gap-4 lg:grid-cols-[330px_1fr]">
        <article className="rounded-[18px] p-[26px]" style={{ background: MAGENTA }}>
          <p className="text-[56px] font-bold leading-none text-white" style={DISPLAY}>
            {OVERVIEW.stat}
          </p>
          <p className="mt-[10px] text-[15px] leading-[1.5] text-[#FFE3EE]" style={BODY}>
            {OVERVIEW.statBody}
          </p>
        </article>
        <article className="rounded-[18px] bg-white px-7 py-[26px]">
          <p className="text-[16px] leading-[1.6]" style={{ ...BODY, color: INK }}>
            {OVERVIEW.context}
          </p>
        </article>
      </div>
      <p className="mt-10 text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: MAGENTA }}>
        {OVERVIEW.constraintsEyebrow}
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {OVERVIEW.constraints.map((card) => (
          <article key={card.title} className="rounded-[18px] bg-white px-6 pb-[26px] pt-6">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[12px]" style={{ background: TILE }}>
              <Icon name={card.icon} size={20} />
            </span>
            <h3 className="mt-[18px] text-[18px] font-semibold leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
              {card.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
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
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={ROLE.eyebrow} heading={ROLE.heading} note={ROLE.note} />
      <div className="relative">
        <div aria-hidden className="absolute left-[10%] right-[10%] top-[28px] hidden h-px lg:block" style={{ background: PINK }} />
        <ol className="relative grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-5">
          {ROLE.steps.map((step) => (
            <li key={step.title} className="flex flex-col items-center gap-1 text-center">
              <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[999px]" style={{ background: MAGENTA }}>
                <Icon name={step.icon} size={20} />
              </span>
              <p className="mt-[10px] text-[15px] font-semibold" style={{ ...DISPLAY, color: INK }}>
                {step.title}
              </p>
              <p className="max-w-[196px] text-[13px] leading-[1.4]" style={{ ...BODY, color: MUTED }}>
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-7 grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {ROLE.tiles.map((tile) => (
          <div
            key={tile.num}
            className="rounded-[18px] px-[22px] pb-6 pt-[22px]"
            style={{ background: tile.tone === "magenta" ? MAGENTA : DARK }}
          >
            <p className="text-[30px] font-semibold leading-[1.1] text-[#F6EEF2]" style={DISPLAY}>
              {tile.num}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#E3D3DB]" style={BODY}>
              {tile.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function VisualSystem() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={SYSTEM.eyebrow} heading={SYSTEM.heading} note={SYSTEM.note} />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {SYSTEM.cards.map((card) => (
          <Polaroid
            key={card.name}
            name={card.name}
            src={card.src}
            alt={card.alt}
            note={card.note}
            className="rounded-[6px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]"
          />
        ))}
      </div>
      <div className="mt-6 grid gap-[14px] md:grid-cols-3">
        {SYSTEM.anatomy.map((item) => (
          <div key={item.title} className="flex items-center gap-[14px] rounded-[14px] px-[18px] py-4" style={{ background: TILE }}>
            <Icon name={item.icon} size={22} className="shrink-0" />
            <div>
              <p className="text-[15px] font-semibold" style={{ ...BODY, color: INK }}>
                {item.title}
              </p>
              <p className="text-[13px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Campaign() {
  return (
    <section id="campaign" className="mt-[96px]" style={{ background: DARK }}>
      <div className="mx-auto w-full max-w-[1036px] px-6 py-[96px] lg:px-0">
        <SectionHead eyebrow={CAMPAIGN.eyebrow} heading={CAMPAIGN.heading} note={CAMPAIGN.note} dark />
        <DropZone note={CAMPAIGN.sizzle.note} play className="h-[520px] rounded-[16px]" />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {CAMPAIGN.spotlights.map((spot) => (
            <figure key={spot.label}>
              <div className="h-[420px] overflow-hidden rounded-[14px]" style={{ background: PANEL }}>
                <Clip src={spot.src} poster={spot.poster} label={spot.label} />
              </div>
              <figcaption className="mt-[10px] text-[13px] text-[#C3B0BB]" style={BODY}>
                {spot.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {CAMPAIGN.cuts.map((cut) => (
            <figure key={cut.label}>
              <div className="h-[300px] overflow-hidden rounded-[14px]" style={{ background: PANEL }}>
                {cut.src ? (
                  <Clip src={cut.src} poster={cut.poster} label={cut.label} />
                ) : (
                  <DropZone note={cut.note} play className="h-full" />
                )}
              </div>
              <figcaption className="mt-[10px] text-[13px] text-[#C3B0BB]" style={BODY}>
                {cut.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mechanic() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={MECHANIC.eyebrow} heading={MECHANIC.heading} note={MECHANIC.note} />
      <div className="grid items-center gap-6 lg:grid-cols-[250px_250px_1fr]">
        {MECHANIC.phones.map((phone) => (
          <DropZone key={phone.note} note={phone.note} play className="h-[500px] rounded-[30px]" />
        ))}
        <div className="flex flex-col gap-[14px]">
          {MECHANIC.steps.map((step) => (
            <article key={step.title} className="flex items-start gap-4 rounded-[16px] bg-white px-5 py-[18px]">
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
            </article>
          ))}
        </div>
      </div>
      <p className="mt-7 text-[11px] font-bold uppercase tracking-[1.32px]" style={{ ...BODY, color: MAGENTA }}>
        {MECHANIC.recordingsEyebrow}
      </p>
      <div className="mt-[14px] grid grid-cols-2 gap-4 lg:grid-cols-4">
        {MECHANIC.recordings.map((rec) => (
          <DropZone key={rec.note} note={rec.note} play className="h-[440px] rounded-[22px]" />
        ))}
      </div>
    </section>
  );
}

function BehindTheScenes() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={BTS.eyebrow} heading={BTS.heading} />
      <div className="grid items-center gap-6 lg:grid-cols-[640px_1fr]">
        <DropZone note={BTS.note} play className="h-[360px] rounded-[16px]" />
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
      </div>
    </section>
  );
}

function Results() {
  return (
    <section className="mx-auto w-full max-w-[1036px] px-6 pt-[96px] lg:px-0">
      <SectionHead eyebrow={RESULTS.eyebrow} heading={RESULTS.heading} />
      <div className="grid gap-4 md:grid-cols-3">
        {RESULTS.impact.map((card) => (
          <article key={card.title} className="rounded-[18px] bg-white p-6">
            <p className="text-[22px] font-semibold leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
              {card.title}
            </p>
            <p className="mt-3 text-[14px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
              {card.body}
            </p>
          </article>
        ))}
      </div>
      <blockquote className="mt-4 flex gap-4 rounded-[18px] bg-white px-10 py-[34px]">
        <span className="text-[48px] font-bold leading-none" style={{ ...DISPLAY, color: MAGENTA }} aria-hidden>
          “
        </span>
        <div>
          <p className="text-[19px] font-medium leading-[1.5]" style={{ ...DISPLAY, color: INK }}>
            {RESULTS.quote}
          </p>
          <p className="mt-3 text-[13px]" style={{ ...BODY, color: MUTED }}>
            {RESULTS.source}
          </p>
        </div>
      </blockquote>
      <p className="mt-[22px] text-[12px] leading-[1.5]" style={{ ...BODY, color: MUTED }}>
        {RESULTS.credit}
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
          <p className="text-[32px] font-semibold text-[#F6EEF2]" style={DISPLAY}>
            Let&apos;s talk.
          </p>
          <a
            href="mailto:nmayacharya@gmail.com"
            className="mt-[10px] inline-block border-b border-[#3A5552] pb-[2px] text-[16px] text-[#D7C6CF] transition-opacity hover:opacity-80"
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
              className="text-[14px] text-[#F6EEF2] transition-opacity hover:opacity-80"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function CharmCase() {
  return (
    <main style={{ background: PAPER }}>
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
