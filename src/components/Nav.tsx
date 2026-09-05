"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Theme } from "@/data/themes";
import { lenisScrollToId } from "@/lib/lenis";
import { WordStagger } from "./ui/word-stagger";
import data from "@/data/portfolio.json";

const NAV_ITEMS = [
  { id: "projects", label: "Projects", num: "01", href: "/projects" },
  { id: "about", label: "About", num: "02", href: "/about" },
  { id: "contact", label: "Contact", num: "03", href: "/#contact" },
] as const;

function scrollToId(id: string) {
  lenisScrollToId(id);
}

export default function Nav({ theme, activeSection }: { theme: Theme; activeSection?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);

  const isActive = (id: string) => {
    if (pathname.startsWith("/projects") && id === "projects") return true;
    if (pathname === "/about" && id === "about") return true;
    if (pathname === "/" && activeSection === id) return true;
    return false;
  };

  return (
    <>
      <style>{`
        .site-nav__veil{
          pointer-events:none;
          position:absolute;
          inset-inline:0;
          top:0;
          height:112px;
          background:linear-gradient(
            to bottom,
            rgb(255 255 255 / .55) 0%,
            rgb(255 255 255 / .22) 42%,
            transparent 100%
          );
          backdrop-filter:blur(6px);
          -webkit-backdrop-filter:blur(6px);
          -webkit-mask-image:linear-gradient(to bottom, #000 0%, #000 28%, rgba(0,0,0,.35) 58%, transparent 100%);
          mask-image:linear-gradient(to bottom, #000 0%, #000 28%, rgba(0,0,0,.35) 58%, transparent 100%);
        }
        @media (prefers-reduced-transparency: reduce){
          .site-nav__veil{
            backdrop-filter:none;
            -webkit-backdrop-filter:none;
            background:linear-gradient(
              to bottom,
              rgb(250 250 249 / .96) 0%,
              rgb(250 250 249 / .7) 48%,
              transparent 100%
            );
          }
        }
        .nav-link{ --ease-out: cubic-bezier(0.23,1,0.32,1); }
        .nav-link__label{ transition: transform 150ms var(--ease-out); will-change: transform; }
        .nav-link__line{ transform: scaleX(0); transition: transform 180ms var(--ease-out); transform-origin: center; will-change: transform; }
        .nav-link[aria-current="page"] .nav-link__line{ transform: scaleX(1); }
        @media (hover:hover) and (pointer:fine){
          .nav-link:hover .nav-link__line{ transform: scaleX(1); }
          .nav-link:hover .nav-link__label{ transform: translateY(-1px); }
          .nav-link:active .nav-link__label{ transform: translateY(0); }
        }
        @media (prefers-reduced-motion:reduce){
          .nav-link__label, .nav-link__line{ transition: opacity 150ms ease, color 150ms ease !important; transform: none !important; }
          .nav-link__line{ opacity: 0; }
          .nav-link[aria-current="page"] .nav-link__line{ opacity: 1; transform: none !important; }
          .nav-link:hover .nav-link__line{ opacity: 1; transform: none !important; }
          .nav-link:hover .nav-link__label{ transform: none !important; }
        }
      `}</style>
      <header className="site-nav pointer-events-none fixed inset-x-0 top-0 z-40">
        <div aria-hidden className="site-nav__veil" />
        <div className="pointer-events-auto relative mx-auto flex h-[64px] max-w-[1280px] items-center justify-between gap-4 px-6 md:px-8">
          <Link href="/" className="flex items-baseline gap-2 shrink-0">
            <span className="font-display text-[18px] font-bold tracking-[-0.025em]" style={{ color: theme.text, letterSpacing: "-0.03em", fontFamily: "var(--font-display)" }}>
              NEHA
            </span>
          </Link>

          {/* Desktop — nav items back in navbar: proper font (Sora) + simple hover micro animation */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.id);
              const isContactAnchor = item.id === "contact" && pathname === "/";
              const commonCls =
                "nav-link group relative inline-flex items-center py-2 text-[12.5px] font-medium tracking-[0.08em] transition-colors duration-150";
              const style = {
                fontFamily: "var(--font-body)",
                color: active ? theme.text : "rgba(17,24,39,0.68)",
              } as React.CSSProperties;

              const inner = (
                <>
                  <span className="nav-link__label relative inline-block">{item.label}</span>
                  <span aria-hidden className="nav-link__line pointer-events-none absolute left-0 right-0 bottom-[2px] h-px bg-current" />
                </>
              );

              if (isContactAnchor) {
                return (
                  <a
                    key={item.id}
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("contact");
                    }}
                    className={commonCls}
                    style={style}
                    aria-current={active ? "page" : undefined}
                  >
                    {inner}
                  </a>
                );
              }

              return (
                <Link key={item.id} href={item.href} className={commonCls} style={style} aria-current={active ? "page" : undefined}>
                  {inner}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`mailto:${data.profile.email}`}
              className="group hidden md:inline-flex items-center justify-center rounded-full border px-4 py-[7px] font-mono text-[11px] font-medium tracking-[0.14em] backdrop-blur"
              style={{ borderColor: theme.border, background: theme.surface, color: theme.text, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
            >
              <WordStagger text="Contact" />
            </a>

            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white"
              style={{ borderColor: theme.border, color: theme.text }}
            >
              <span aria-hidden className="relative block h-3.5 w-4">
                <span className="absolute left-0 h-px w-4 bg-current transition-all" style={{ top: open ? "6px" : "2px", transform: open ? "rotate(45deg)" : "none" }} />
                <span className="absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity" style={{ opacity: open ? 0 : 1 }} />
                <span className="absolute left-0 h-px w-4 bg-current transition-all" style={{ top: open ? "6px" : "10px", transform: open ? "rotate(-45deg)" : "none" }} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-white md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-[64px] items-center justify-between px-6">
              <span className="font-display text-[18px] font-bold" style={{ color: theme.text }}>NEHA</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white" style={{ borderColor: theme.border, color: theme.text }}>
                <span aria-hidden className="text-[18px] leading-none">×</span>
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center px-6 pb-16">
              <nav aria-label="Mobile primary" className="space-y-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div key={item.id} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : 0.05 * i, duration: 0.32, ease: [0.23, 1, 0.32, 1] as const }}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between border-b py-5"
                      style={{ borderColor: "rgba(0,0,0,0.08)" }}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[12px] tracking-[0.18em] text-zinc-400">{item.num}</span>
                        <span className="font-display text-[32px] font-semibold tracking-[-0.03em] text-zinc-900">{item.label}</span>
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.16em] text-zinc-400">→</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-10 flex flex-wrap gap-3">
                  <a href={`mailto:${data.profile.email}`} className="rounded-full bg-zinc-900 px-6 py-3 font-mono text-[12px] tracking-[0.14em] text-white">{data.profile.email}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
