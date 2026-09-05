"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import { THEMES, type ThemeId } from "@/data/themes";
import data from "@/data/portfolio.json";
import Link from "next/link";
import { WordStagger } from "@/components/ui/word-stagger";
import type { Project } from "@/types/portfolio";

const SORTS: (ThemeId | "all")[] = ["all", "ai", "xr", "ux", "product"];

function isThemeId(v: string | null): v is ThemeId {
  return v === "ai" || v === "xr" || v === "ux" || v === "product";
}

export default function ProjectsList() {
  const router = useRouter();
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const lens = params.get("lens");
  const sort: ThemeId | "all" = isThemeId(lens) ? lens : "all";
  const theme = THEMES[sort === "all" ? "product" : sort];
  const projects = data.projects as Project[];

  const setSort = (next: ThemeId | "all") => {
    router.replace(next === "all" ? "/projects" : `/projects?lens=${next}`, { scroll: false });
  };

  const ranked = useMemo(
    () =>
      projects.map((p, index) => ({
        p,
        index,
        order: sort === "all" ? index : p.perception === sort ? index : 1000 + index,
        isMatch: sort === "all" || p.perception === sort,
      })),
    [projects, sort]
  );

  return (
    <>
      <Nav theme={theme} activeSection="projects" />
      <main className="pt-[64px]">
        <section className="mx-auto max-w-[1280px] px-6 md:px-8">
          <div className="h-px w-full bg-black/5" />

          <div className="py-10 md:py-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-10" style={{ background: theme.faint }} />
                  <span className="font-mono text-[11px] tracking-[0.22em]" style={{ color: theme.muted }}>
                    PROJECTS · {projects.length.toString().padStart(2, "0")}
                  </span>
                </div>
                <h1 className="font-display text-[32px] font-semibold leading-[0.9] tracking-[-0.04em] text-zinc-900 md:text-[44px] lg:text-[52px]" style={{ fontFamily: "var(--font-display)" }}>
                  Selected work
                  <span className="font-light text-zinc-400">.</span>
                </h1>
                <p className="mt-3 max-w-[520px] text-[14px] leading-[1.6] text-zinc-500">
                  Sort by perception — matching work slides to the front. Everything stays in the grid.
                </p>
              </div>

              <div className="relative z-20 flex flex-wrap gap-1.5" role="group" aria-label="Sort projects by perception">
                {SORTS.map((s) => {
                  const isActive = sort === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSort(s)}
                      aria-pressed={isActive}
                      className="cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] transition-colors"
                      style={{
                        background: isActive ? "#111827" : "#fff",
                        color: isActive ? "#fff" : "#52525b",
                        borderColor: isActive ? "#111827" : "rgba(0,0,0,0.08)",
                      }}
                    >
                      {s === "all" ? "All" : s.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            <LayoutGroup id="projects-sort">
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
                {ranked.map(({ p, order, isMatch }) => {
                  const cardTheme = THEMES[p.perception];
                  return (
                    <motion.div
                      key={p.id}
                      layout
                      layoutId={`project-card-${p.id}`}
                      style={{ order }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { layout: { type: "spring", duration: 0.5, bounce: 0.12 } }
                      }
                      animate={{ opacity: isMatch ? 1 : 0.42 }}
                      className="will-change-transform"
                    >
                      <Link href={`/projects/${p.id}`} className="block">
                        <article
                          className="group overflow-hidden rounded-[20px] bg-white"
                          style={{
                            border: `1px solid ${isMatch ? cardTheme.border : "rgba(0,0,0,0.06)"}`,
                            boxShadow: isMatch ? "0 8px 32px rgba(0,0,0,0.06)" : "0 4px 16px rgba(0,0,0,0.04)",
                          }}
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.image} alt={p.imageAlt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                            <div
                              className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] backdrop-blur"
                              style={{ color: cardTheme.text, border: `1px solid ${cardTheme.border}` }}
                            >
                              {p.year} · {p.dimension}
                            </div>
                          </div>
                          <div className="px-4 py-4 md:px-5 md:py-5">
                            <h3 className="font-display text-[16px] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-900" style={{ fontFamily: "var(--font-display)" }}>
                              {p.title}
                            </h3>
                            <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-zinc-500">{p.subtitle ?? p.dimension}</p>
                            <p className="mt-3 line-clamp-2 text-[13px] leading-[1.55] text-zinc-500">{p.blurb}</p>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          <div className="h-px w-full bg-black/5" />
        </section>

        <div className="mx-auto max-w-[1280px] px-6 py-8 md:px-8">
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="group rounded-full border bg-white px-6 py-3 font-mono text-[12px] tracking-[0.12em] text-zinc-700" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <WordStagger text="← Back home" />
            </Link>
            <Link href="/about" className="group rounded-full bg-zinc-900 px-6 py-3 font-mono text-[12px] tracking-[0.12em] text-white">
              <WordStagger text="About Neha →" />
            </Link>
          </div>
        </div>

        <footer className="mx-auto max-w-[1280px] px-6 pb-10 md:px-8">
          <div className="h-px w-full bg-black/5" />
          <div className="flex justify-start pt-6 font-mono text-[10px] tracking-[0.12em] text-zinc-400">
            <span>© 2026 NEHA</span>
          </div>
        </footer>
      </main>
    </>
  );
}
