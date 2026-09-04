"use client";

import type { ThemeId } from "@/data/themes";
import { THEMES } from "@/data/themes";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

type Props = {
  activeId: ThemeId;
  profile: { name: string; tagline: string; roles: string[]; bio: string; location: string; email: string; availability: string };
};

export default function AboutSection({ activeId, profile }: Props) {
  const theme = THEMES[activeId];

  // 5 images provided by user — replace background only, keep text
  const process = [
    {
      title: "01 — Discover",
      description: "Research, interviews, market signals. We map what people do and why it matters.",
      image: "/process/discover.png",
      alt: "Research wall covered with wireframes, photos and diagrams — team synthesizing discoveries",
      className: "md:col-span-1",
    },
    {
      title: "02 — Define",
      description: "Synthesis into intent trees, jobs-to-be-done and system constraints.",
      image: "/process/define.png",
      alt: "Blackboard with Key Insights, Jobs To Be Done and Intent Tree — defining the system",
      className: "md:col-span-1",
    },
    {
      title: "03 — Envision",
      description: "Flows, tokens, spatial maps. The system takes shape before pixels.",
      image: "/process/envision.jpg",
      alt: "Enchanted forest with glowing orbs and luminous trails envisioning flows",
      className: "md:col-span-1",
    },
    {
      title: "04 — Prototype",
      description: "Hand-tracked, voice-first, token-powered prototypes tested in context.",
      image: "/process/prototype.jpg",
      alt: "Person wearing VR headset holding controllers — hand-tracked prototype",
      className: "md:col-span-2",
    },
    {
      title: "05 — Ship & learn",
      description: "Measure, iterate, harden. Real usage shapes the next loop.",
      image: "/process/ship.jpg",
      alt: "Desk with model ship, code on monitor and hand writing — shipping the prototype",
      className: "md:col-span-1",
    },
  ];

  const multiTint = `linear-gradient(135deg, ${THEMES.xr.wash}10 0%, ${THEMES.ai.wash}10 50%, ${THEMES.product.wash}10 100%)`;
  return (
    <section id="about" className="relative bg-[#fafaf9]">
      <style>{`
        .process-card{ --ease-out: cubic-bezier(0.23,1,0.32,1); transition: transform 180ms var(--ease-out); will-change: transform; }
        .process-card__media{ transition: transform 220ms var(--ease-out); will-change: transform; }
        .process-card__content{ transition: transform 180ms var(--ease-out); will-change: transform; }
        .process-card__overlay{ transition: opacity 180ms ease; }
        @media (hover:hover) and (pointer:fine){
          .process-card:hover{ transform: translateY(-4px); }
          .process-card:hover .process-card__media{ transform: scale(1.04); }
          .process-card:hover .process-card__content{ transform: translateY(-2px); }
          .process-card:hover .process-card__overlay{ opacity: 1; }
        }
        @media (prefers-reduced-motion:reduce){
          .process-card, .process-card__media, .process-card__content{ transition: opacity 150ms ease !important; transform: none !important; }
          .process-card:hover{ transform: none !important; }
          .process-card__overlay{ opacity: 1 !important; }
        }
      `}</style>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: multiTint, opacity: 0.6 }} />
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <div className="py-14 md:py-18 lg:py-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              className="font-display text-[22px] font-semibold tracking-[-0.03em] md:text-[26px]"
              style={{ fontFamily: "var(--font-display)", color: "#111827" }}
            >
              Process
            </h2>
            <HoverBorderGradient as="a" href="/about" className="text-[11px]">
              About →
            </HoverBorderGradient>
          </div>

          <div className="mt-8 md:mt-10">
            <div className="grid gap-4 md:grid-cols-3 md:auto-rows-[400px]">
              {process.map((item) => (
                <div
                  key={item.title}
                  className={cn(
                    "process-card group relative isolate flex h-[340px] flex-col justify-end overflow-hidden rounded-[20px] md:h-full md:min-h-[400px]",
                    item.className
                  )}
                  style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}
                >
                  {/* image — fits card perfectly (cover, centered, clipped to rounded) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="process-card__media absolute inset-0 h-full w-full object-cover object-center"
                    loading="lazy"
                    draggable={false}
                  />
                  {/* overlay — blur + gradient just behind text, clear at top */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[56%] bg-gradient-to-t from-black/78 via-black/38 to-transparent backdrop-blur-[6px]"
                    style={{
                      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.0) 8%, rgba(0,0,0,1) 38%, rgba(0,0,0,1) 100%)",
                      maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.0) 8%, rgba(0,0,0,1) 38%, rgba(0,0,0,1) 100%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[56%] opacity-[0.16] mix-blend-overlay"
                    style={{
                      background: `linear-gradient(110deg, transparent 30%, ${theme.accent}20 100%)`,
                      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 100%)",
                      maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,1) 100%)",
                    }}
                  />

                  <div className="process-card__content relative p-6 md:p-7">
                    <div
                      className="font-display text-[15px] font-semibold tracking-[-0.02em] text-white md:text-[17px]"
                      style={{ fontFamily: "var(--font-display)", textShadow: "0 1px 14px rgba(0,0,0,0.45)" }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="mt-1.5 max-w-[32ch] text-[13px] leading-[1.6] text-gray-300 md:text-[13.5px]"
                      style={{ fontFamily: "var(--font-body)", textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
