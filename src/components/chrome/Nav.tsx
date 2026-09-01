"use client";

import { useEffect, useRef } from "react";

const LINKS = [
  { label: "Timeline", href: "#timeline" },
  { label: "Dimensions", href: "#dimensions" },
  { label: "Work", href: "#world" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrolled = window.scrollY > 60;
      el.classList.toggle("nav-scrolled", scrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={barRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-void/60 backdrop-blur-xl transition-colors duration-500"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-baseline gap-1.5">
          <span className="font-display text-xl font-bold tracking-tight text-paper">
            NEHA
          </span>
        </a>

        <nav className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.28em] text-ghost md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors duration-300 hover:text-cyber"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-cyber opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber" />
          </span>
          <span className="hidden sm:inline">Open</span>
        </div>
      </div>
    </header>
  );
}