"use client";

import { useRef } from "react";
import { PROJECT_MEDIA } from "@/data/projects-media";
import type { Project } from "@/types/portfolio";

/**
 * Project card media — shows the project's poster/thumbnail, and plays the
 * hero video (muted, looping) on hover when one is available.
 */
export default function ProjectCardMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const media = project.media ?? PROJECT_MEDIA[project.id];
  const poster = media?.heroVideoPoster || media?.images?.[0]?.src || project.image;
  const video = media?.heroVideo || null;

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
        src={poster}
        alt={project.imageAlt}
        loading="lazy"
        draggable={false}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/placeholder.svg";
        }}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={poster}
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
