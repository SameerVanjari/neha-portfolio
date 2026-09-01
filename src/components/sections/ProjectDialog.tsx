"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type Project, PROJECT_COLORS } from "@/data/portfolio";

const DIM_LABEL: Record<string, string> = {
  PRODUCT: "Product",
  UX: "UX",
  XR: "XR",
  AI: "AI",
};

interface ProjectDialogProps {
  project: Project;
  sourceRect: DOMRect;
  onClose: () => void;
}

export default function ProjectDialog({ project, sourceRect, onClose }: ProjectDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"expanding" | "expanded" | "closing">("expanding");
  const phaseRef = useRef(phase);
  const accentColor = PROJECT_COLORS[project.accent];

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setPhase("expanded");
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleClose = useCallback(() => {
    if (phaseRef.current === "closing") return;
    setPhase("closing");
    setTimeout(() => onClose(), 320);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  const isExpanded = phase === "expanded";
  const isClosing = phase === "closing";

  const dialogStyle = isExpanded
    ? {
        top: "2rem",
        left: "2rem",
        width: "calc(100vw - 4rem)",
        height: "calc(100vh - 4rem)",
        borderRadius: "16px",
      }
    : isClosing
      ? {
          top: `${sourceRect.top}px`,
          left: `${sourceRect.left}px`,
          width: `${sourceRect.width}px`,
          height: `${sourceRect.height}px`,
          borderRadius: "16px",
        }
      : {
          top: `${sourceRect.top}px`,
          left: `${sourceRect.left}px`,
          width: `${sourceRect.width}px`,
          height: `${sourceRect.height}px`,
          borderRadius: "16px",
        };

  const overlayOpacity = isExpanded ? 0.6 : 0;

  return (
    <div
      ref={overlayRef}
      className={`project-dialog-overlay ${isClosing ? "is-closing" : ""}`}
      style={{ background: `rgba(4, 6, 12, ${overlayOpacity})` }}
      onClick={handleClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className={`project-dialog ${isExpanded ? "is-expanded" : ""}`}
        style={{
          ...dialogStyle,
          ["--accent" as string]: accentColor,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-dialog-header">
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.3em]"
              style={{ color: accentColor }}
            >
              {DIM_LABEL[project.dimension]}
            </span>
            <span className="font-mono text-[11px] text-faint">{project.year}</span>
          </div>
          <h2 className="mt-4 font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-tight text-paper">
            {project.title}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-ghost">{project.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ghost"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="project-dialog-body">
          <div className="project-dialog-detail">
            <h3
              className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em]"
              style={{ color: accentColor }}
            >
              Challenge
            </h3>
            <p className="text-sm leading-7 text-ghost">{project.details.challenge}</p>
          </div>

          <div className="project-dialog-detail">
            <h3
              className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em]"
              style={{ color: accentColor }}
            >
              Approach
            </h3>
            <p className="text-sm leading-7 text-ghost">{project.details.approach}</p>
          </div>

          <div className="project-dialog-detail">
            <h3
              className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em]"
              style={{ color: accentColor }}
            >
              Result
            </h3>
            <p className="text-sm leading-7 text-ghost">{project.details.result}</p>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="project-dialog-close"
          aria-label="Close project details"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
