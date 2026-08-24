"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

const LINKS = [
  { label: "about", href: "#about" },
  { label: "work", href: "#work" },
  { label: "stack", href: "#capabilities" },
  { label: "contact", href: "#contact" },
];

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      start: 80,
      end: 160,
      toggleClass: { targets: el, className: "nav-scrolled" },
    });
    return () => st.kill();
  }, []);

  return (
    <header
      ref={barRef}
      className="fixed inset-x-0 top-0 z-[80] border-b border-cyber/10 bg-void/30 backdrop-blur-sm transition-colors duration-500"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="group flex items-baseline gap-1 font-mono text-sm tracking-widest">
          <span className="text-xl font-bold text-paper">NEHA</span>
          <span className="text-cyber text-glow-cyan transition-transform duration-300 group-hover:translate-x-1">{"//_"}</span>
        </a>

        <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.28em] text-ghost md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover-line text-paper/80 transition-colors hover:text-cyber">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ghost">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber" />
          </span>
          <span className="hidden sm:inline">{profile.availability.split("·")[0]}</span>
          <span className="sm:hidden">online</span>
        </div>
      </div>
    </header>
  );
}
