"use client";

import { useRef } from "react";
import type { ProjectMedia } from "@/data/projects-media";
import { CASE_COLORS as C } from "@/data/case-theme";
import type { Project } from "@/types/portfolio";
import { gsap, useGSAP } from "@/hooks/use-gsap";

/**
 * Renders the hero media — a muted autoplay video when available,
 * otherwise the project's hero image.
 */
export function HeroMedia({ project }: { project: Project }) {
  const m = project.media;
  if (m?.heroVideo) {
    return (
      <div
        className="overflow-hidden rounded-[16px] border"
        style={{ borderColor: "rgba(255,255,255,0.10)", background: C.deep, boxShadow: "0 16px 40px rgba(0,0,0,0.45)" }}
      >
        <video
          className="aspect-[16/9] w-full object-cover"
          src={m.heroVideo}
          poster={m.heroVideoPoster || undefined}
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      </div>
    );
  }
  return (
    <div
      className="overflow-hidden rounded-[16px] border"
      style={{ borderColor: "rgba(255,255,255,0.10)", background: C.deep, boxShadow: "0 16px 40px rgba(0,0,0,0.45)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={project.imageAlt}
        className="aspect-[16/9] w-full object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/placeholder.svg";
        }}
      />
    </div>
  );
}

/**
 * Renders the media gallery — still images and additional videos.
 */
export function MediaGallery({ media }: { media: ProjectMedia }) {
  const images = media.images ?? [];
  const videos = media.videos ?? [];
  if (!images.length && !videos.length) return null;

  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {images.map((img) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="aspect-[16/10] w-full rounded-[16px] object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      ))}
      {videos.map((v) => (
        <video
          key={v.src}
          className="aspect-[16/10] w-full rounded-[16px] object-cover bg-black"
          src={v.src}
          poster={v.poster}
          controls
          preload="none"
        />
      ))}
    </div>
  );
}

/* ---------- Story-layout primitives (image-anchored case pages) ---------- */

export type CaseFrame = {
  src: string;
  alt: string;
  caption?: React.ReactNode;
};

function caseImg(src: string, alt: string, className: string) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/placeholder.svg";
      }}
    />
  );
}

/** Single framed image with an optional caption. Entrance-revealed. */
export function CaseFigure({ src, alt, caption }: CaseFrame) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <figure ref={ref}>
      <div
        className="overflow-hidden rounded-[16px] border"
        style={{ borderColor: "rgba(255,255,255,0.10)", background: C.deep, boxShadow: "0 16px 40px rgba(0,0,0,0.45)" }}
      >
        {caseImg(src, alt, "aspect-[16/10] w-full object-cover")}
      </div>
      {caption ? (
        <figcaption className="mt-3 border-l-2 pl-4 text-[13px] leading-[1.7]" style={{ borderColor: C.accent, color: C.muted }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Full-bleed image break that escapes the article column, with a slow parallax drift. */
export function CaseFullBleed({ src, alt, caption }: CaseFrame) {
  const ref = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || !img.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          img.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} aria-label={alt} role="img" className="my-10 md:my-14" style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}>
      <div className="relative h-[46vw] max-h-[560px] min-h-[260px] overflow-hidden md:h-[38vw]" style={{ background: C.deep }}>
        <div ref={img} className="absolute inset-y-[-16%] inset-x-0">
          {caseImg(src, alt, "h-full w-full object-cover")}
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(21,21,22,0.55) 0%, rgba(21,21,22,0) 30%, rgba(21,21,22,0) 70%, rgba(21,21,22,0.55) 100%)" }}
        />
      </div>
      {caption ? (
        <p className="mx-auto mt-4 max-w-[1280px] border-l-2 px-6 pl-4 text-[13px] leading-[1.7] md:px-8" style={{ borderColor: C.accent, color: C.muted }}>
          {caption}
        </p>
      ) : null}
    </div>
  );
}

/** Editorial image + text block; flips sides on alternate rows. */
export function CaseImageText({
  src,
  alt,
  caption,
  heading,
  reverse = false,
  children,
}: CaseFrame & { heading?: string; reverse?: boolean; children: React.ReactNode }) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
      <div className={reverse ? "md:order-2" : ""}>
        <CaseFigure src={src} alt={alt} caption={caption} />
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        {heading ? <h3 className="font-display text-[18px] font-semibold tracking-[-0.02em] md:text-[22px]" style={{ fontFamily: "var(--font-display)", color: C.text }}>{heading}</h3> : null}
        {children}
      </div>
    </div>
  );
}

/** Pinned horizontal-scroll storyboard gallery. Falls back to a plain scroll strip with reduced motion. */
export function CaseStickyGallery({ frames, eyebrow }: { frames: CaseFrame[]; eyebrow?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current || !track.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.current!.scrollWidth - root.current!.clientWidth + 48;
        root.current!.style.overflowX = "hidden";
        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        root.current!.style.overflowX = "auto";
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="-mx-6 md:-mx-8">
      <div className="flex h-screen items-center overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <div ref={track} className="flex w-max items-center gap-5 px-6 pb-24 pt-16 md:gap-8 md:px-8">
          {frames.map((f, i) => (
            <figure key={f.src} className="w-[82vw] shrink-0 md:w-[58vw] lg:w-[48vw]">
              <div className="relative">
                <span
                  className="absolute -top-8 left-0 font-mono text-[11px] font-semibold tracking-[0.14em]"
                  style={{ color: C.accent }}
                >
                  {`${String(i + 1).padStart(2, "0")}${eyebrow ? ` / ${eyebrow}` : ""}`}
                </span>
                <div
                  className="overflow-hidden rounded-[16px] border"
                  style={{ borderColor: "rgba(255,255,255,0.10)", background: C.deep, boxShadow: "0 16px 40px rgba(0,0,0,0.45)" }}
                >
                  {caseImg(f.src, f.alt, "aspect-[16/10] w-full object-cover")}
                </div>
              </div>
              {f.caption ? (
                <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: C.muted }}>
                  {f.caption}
                </p>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
