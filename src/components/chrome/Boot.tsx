"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

const BOOT_KEY = "neha-booted";

export default function Boot() {
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(BOOT_KEY) === "1") return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    profile.bootLines.forEach((line, i) => {
      timers.push(setTimeout(() => setLines((prev) => [...prev, line]), 240 * i));
    });
    timers.push(
      setTimeout(
        () => {
          gsap.to(boxRef.current, {
            opacity: 0,
            duration: 0.6,
            delay: 0.3,
            onComplete: () => {
              sessionStorage.setItem(BOOT_KEY, "1");
              setVisible(false);
            },
          });
        },
        240 * profile.bootLines.length + 600
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={boxRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-void"
    >
      <div className="hud-panel corner-frames w-[min(92vw,560px)] p-8">
        <div className="relative z-10 font-mono text-[13px] leading-7 text-ghost">
          <p className="mb-3 text-cyber text-glow-cyan">NEHA.DESIGN v3.0 — SECURE LINK</p>
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <span className="caret" />
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(BOOT_KEY, "1");
            gsap.to(boxRef.current, {
              opacity: 0,
              duration: 0.4,
              onComplete: () => setVisible(false),
            });
          }}
          className="absolute right-4 top-4 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-faint transition-colors hover:text-cyber"
        >
          skip
        </button>
      </div>
    </div>
  );
}
