"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionPref } from "@/components/motion/reveal";
import type { Theme } from "@/data/themes";
import { lenisScrollToId } from "@/lib/lenis";
import { useLoadStage } from "@/components/LoadStage";
import data from "@/data/portfolio.json";
import { WordStagger } from "@/components/ui/word-stagger";

const NAV_ITEMS = [
  { id: "work", label: "Work", href: "/projects" },
  { id: "about", label: "About", href: "/about" },
  /* The résumé is a document, not a page: it opens in a new tab so the site
     keeps its place, and so Barba's click handler lets it through untouched. */
  { id: "resume", label: "Résumé (PDF)", href: "/resume.pdf", target: "_blank", rel: "noreferrer" },
] as const;

function scrollToId(id: string) {
  lenisScrollToId(id);
}

export default function Nav({ theme }: { theme?: Theme; activeSection?: string; revealDelay?: number }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useMotionPref();
  // Last thing to arrive: the header drops in once the hero copy has landed.
  const { stage } = useLoadStage();
  const shown = stage === "nav";
  void theme;

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open ]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ transform: "translateY(-100%)" }}
        animate={{ transform: shown ? "translateY(0%)" : "translateY(-100%)" }}
        transition={{ duration: reduce ? 0.2 : 0.65, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-x-0 top-0 z-40 border-b border-[#DAD3C8] bg-[#F2EEE7]"
      >
        <div className="mx-auto flex h-[85px] w-full max-w-[1200px] items-center justify-between px-6 lg:px-0">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-[10px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile/logo.png"
              alt=""
              aria-hidden
              draggable={false}
              className="h-[34px] w-[34px] rounded-[10px] object-cover transition-transform duration-200 ease-out group-hover:scale-[1.06]"
            />
            <span
              className="text-[17px] font-semibold tracking-[0.34px] text-[#17161B]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Neha Mayacharya
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                target={"target" in item ? item.target : undefined}
                rel={"rel" in item ? item.rel : undefined}
                className="text-[15px] font-normal text-[#17161B] transition-opacity hover:opacity-60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </Link>
            ))}
            {pathname === "/" ? (
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
                className="inline-flex h-[44px] items-center justify-center rounded-[999px] bg-[#17161B] px-[22px] text-[14px] font-medium text-[#F2EEE7] transition-[background-color,transform] duration-150 ease-out hover:bg-[#262330] motion-safe:active:scale-[0.97]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <WordStagger text="Contact" />
              </a>
            ) : (
              <Link
                href="/#contact"
                className="inline-flex h-[44px] items-center justify-center rounded-[999px] bg-[#17161B] px-[22px] text-[14px] font-medium text-[#F2EEE7] transition-[background-color,transform] duration-150 ease-out hover:bg-[#262330] motion-safe:active:scale-[0.97]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <WordStagger text="Contact" />
              </Link>
            )}
          </nav>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DAD3C8] text-[#17161B] md:hidden"
          >
            <span aria-hidden className="relative block h-3.5 w-4">
              <span
                className="absolute left-0 h-px w-4 bg-current transition-all"
                style={{ top: open ? "6px" : "2px", transform: open ? "rotate(45deg)" : "none" }}
              />
              <span
                className="absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute left-0 h-px w-4 bg-current transition-all"
                style={{ top: open ? "6px" : "10px", transform: open ? "rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-[#F2EEE7] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-[85px] items-center justify-between border-b border-[#DAD3C8] px-6">
              <span className="flex items-center gap-[10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile/logo.png"
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="h-[34px] w-[34px] rounded-[10px] object-cover"
                />
                <span
                  className="text-[17px] font-semibold tracking-[0.34px] text-[#17161B]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Neha Mayacharya
                </span>
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#DAD3C8] text-[#17161B]"
              >
                <span aria-hidden className="text-[18px] leading-none">×</span>
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center px-6 pb-16">
              <nav aria-label="Mobile primary" className="space-y-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.05 * i, duration: 0.32, ease: [0.23, 1, 0.32, 1] as const }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      target={"target" in item ? item.target : undefined}
                      rel={"rel" in item ? item.rel : undefined}
                      className="flex items-baseline justify-between border-b border-[#DAD3C8] py-5"
                    >
                      <span
                        className="text-[28px] font-semibold tracking-[-0.02em] text-[#17161B]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.label}
                      </span>
                      <span className="text-[15px] text-[#5C5750]">→</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={`mailto:${data.profile.email}`}
                  className="rounded-[999px] bg-[#17161B] px-6 py-3 text-[14px] font-medium text-[#F2EEE7]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {data.profile.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
