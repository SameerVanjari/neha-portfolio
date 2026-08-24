"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

function RoleRotator() {
  const roles = profile.roles;
  const [i, setI] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
    );
    return () => {
      tween.kill();
    };
  }, [i]);

  useEffect(() => {
    const id = setInterval(() => {
      const el = spanRef.current;
      if (!el) return;
      gsap.to(el, {
        opacity: 0,
        y: -14,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setI((v) => (v + 1) % roles.length),
      });
    }, 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span ref={spanRef} className="text-glow-cyan text-paper">
      {roles[i]}
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const booted =
        typeof window !== "undefined" && sessionStorage.getItem("neha-booted") === "1";
      const delay = booted ? 0.2 : 2.9;
      gsap.to(".hero-line", {
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.1,
        delay,
        ease: "power3.out",
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div className="absolute left-6 top-24 hidden font-mono text-[10px] uppercase leading-5 tracking-[0.3em] text-faint md:left-10 md:block">
        <p>LAT 12.97° N</p>
        <p>LON 77.59° E</p>
      </div>
      <div className="absolute right-6 top-24 hidden text-right font-mono text-[10px] uppercase leading-5 tracking-[0.3em] text-faint md:right-10 md:block">
        <p>EST. 2019</p>
        <p>SYS. ONLINE</p>
      </div>

      <div className="corner-frames" aria-hidden />

      <p
        className="hero-line mb-6 font-mono text-[11px] uppercase tracking-[0.5em] text-cyber text-glow-cyan"
        style={{ opacity: 0 }}
      >
        specializing in AI · XR · UX
      </p>

      <h1
        className="hero-line glitch font-display text-[clamp(4.5rem,19vw,14rem)] font-bold leading-[0.85] tracking-tight text-paper"
        data-glitch={profile.name}
        style={{ opacity: 0 }}
      >
        {profile.name}
      </h1>

      <div
        className="hero-line mt-6 font-mono text-lg tracking-[0.2em] text-ghost md:text-2xl"
        style={{ opacity: 0 }}
      >
        <RoleRotator />
        <span className="caret" />
      </div>

      <p
        className="hero-line mt-8 max-w-xl text-sm leading-7 text-ghost md:text-base"
        style={{ opacity: 0 }}
      >
        {profile.tagline}
      </p>

      <div
        className="hero-line mt-10 flex flex-col items-center gap-4 sm:flex-row"
        style={{ opacity: 0 }}
      >
        <a
          href="#work"
          className="group flex items-center gap-2 border border-cyber/60 px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-cyber transition-all duration-300 hover:bg-cyber/10 hover:shadow-[0_0_24px_rgba(0,240,255,0.35)]"
        >
          view work
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
        <a
          href="#contact"
          className="flex items-center gap-2 border border-paper/15 px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-paper/70 transition-all duration-300 hover:border-neon/60 hover:text-neon"
        >
          get in touch
        </a>
      </div>

      <div className="hero-line absolute bottom-8 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-faint">scroll</span>
        <span className="block h-10 w-px overflow-hidden bg-cyber/20">
          <span className="block h-1/2 w-full animate-scrolldrop bg-cyber" />
        </span>
      </div>
    </section>
  );
}
