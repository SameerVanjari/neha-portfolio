"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/data/case-studies";

/**
 * Case-study card media: the cover still, plus the project's hero clip played
 * muted and looping on hover where one exists. Cases with no cover art yet
 * fall back to a labelled placeholder, matching the homepage card.
 */
export default function CaseStudyCardMedia({ study }: { study: CaseStudy }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!study.image) {
    return (
      <div className="absolute inset-0 flex flex-col items-start justify-end bg-zinc-100 p-4">
        <span className="font-mono text-[10px] tracking-[0.12em] text-zinc-400">
          [{study.imageAlt ?? study.title}]
        </span>
      </div>
    );
  }

  return (
    <div
      className="group absolute inset-0 overflow-hidden"
      onMouseEnter={() => {
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        const v = videoRef.current;
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={study.image}
        alt={study.imageAlt ?? ""}
        loading="lazy"
        draggable={false}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/placeholder.svg";
        }}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      {study.video ? (
        <video
          ref={videoRef}
          src={study.video}
          poster={study.image}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : null}
    </div>
  );
}
