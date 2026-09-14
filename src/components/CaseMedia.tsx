"use client";

import type { ProjectMedia } from "@/data/projects-media";
import { CASE_COLORS as C } from "@/data/case-theme";
import type { Project } from "@/types/portfolio";

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
