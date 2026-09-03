"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Theme } from "@/data/themes";

const NAV_ITEMS = [
  { id: "projects", label: "Projects", num: "01", href: "/projects" },
  { id: "about", label: "About", num: "02", href: "/about" },
  { id: "contact", label: "Contact", num: "03", href: "/#contact" },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Nav({ theme, activeSection }: { theme: Theme; activeSection?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    if (pathname === "/projects" && id === "projects") return true;
    if (pathname === "/about" && id === "about") return true;
    if (pathname === "/" && activeSection === id) return true;
    return false;
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "none",
          borderColor: scrolled ? "rgba(0,0,0,0.06)" : "transparent",
        }}
      >
        <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between gap-4 px-6 md:px-8">
          <Link href="/" className="flex items-baseline gap-2 shrink-0">
            <span className="font-display text-[18px] font-bold tracking-[-0.025em]" style={{ color: theme.text, letterSpacing: "-0.03em" }}>
              NEHA
            </span>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="mailto:hello@neha.design"
              className="hidden md:inline-flex rounded-full border px-4 py-[7px] font-mono text-[11px] font-medium tracking-[0.14em] backdrop-blur transition-colors hover:opacity-90"
              style={{ borderColor: theme.border, background: theme.surface, color: theme.text, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
            >
              Contact
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
                <motion.div initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : 0.15, duration: 0.32, ease: [0.23, 1, 0.32, 1] as const }}>
                  <Link href="/" onClick={() => setOpen(false)} className="flex items-baseline justify-between border-b py-5" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[12px] tracking-[0.18em] text-zinc-400">00</span>
                      <span className="font-display text-[32px] font-semibold tracking-[-0.03em] text-zinc-900">Home</span>
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.16em] text-zinc-400">→</span>
                  </Link>
                </motion.div>
              </nav>

              <div className="mt-10 flex flex-wrap gap-3">
                <a href="mailto:hello@neha.design" className="rounded-full bg-zinc-900 px-6 py-3 font-mono text-[12px] tracking-[0.14em] text-white">hello@neha.design</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
