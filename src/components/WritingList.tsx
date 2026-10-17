"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import SiteFooter from "@/components/landing/SiteFooter";
import { WRITING, type WritingPost } from "@/data/writing";
import { THEMES } from "@/data/themes";
import { Reveal, useStagger } from "@/components/motion/reveal";
import { useLoadStage } from "@/components/LoadStage";

/**
 * /blog — the Writing index.
 *
 * Every card is an outbound link to a piece published elsewhere; there is no
 * on-site article. Cards are intentionally lighter than the project cards —
 * a piece of writing is a single click away, not a case study to explore — but
 * they share the site's paper, hairline and mono-eyebrow language so the page
 * reads as part of the same site.
 */

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

export default function WritingList() {
  const theme = THEMES.product;
  const { group, item } = useStagger({ step: 0.06, distance: 16 });
  // The grid is released with the preloader, so its entrance plays in front of
  // the reader instead of running out unseen behind the overlay.
  const { stage } = useLoadStage();
  const started = stage !== "loading";

  return (
    <>
      <Nav theme={theme} activeSection="writing" />
      <main className="min-h-screen bg-[#F2EEE6] pt-[92px] md:pt-[112px]">
        <section className="mx-auto max-w-[1280px] px-5 pb-14 sm:px-6 md:px-8">
          <header className="pb-10 pt-4 md:pb-12 md:pt-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10" style={{ background: theme.faint }} />
              <span
                className="font-mono text-[11px] tracking-[0.22em]"
                style={{ color: theme.muted }}
              >
                WRITING · {String(WRITING.length).padStart(2, "0")}
              </span>
            </div>
            <h1
              className="font-display text-[32px] font-semibold leading-[0.95] tracking-[-0.04em] text-zinc-900 md:text-[44px] lg:text-[52px]"
              style={DISPLAY}
            >
              Writing
              <span className="font-light text-zinc-400">.</span>
            </h1>
            <p className="mt-3 max-w-[540px] text-[15px] leading-[1.6] text-zinc-500" style={BODY}>
              Notes on AI, XR, and product design. Each piece lives where it was
              published — the cards open the original in a new tab.
            </p>
          </header>

          {WRITING.length > 0 ? (
            <motion.ul
              variants={group}
              initial="hidden"
              animate={started ? "visible" : "hidden"}
              className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:gap-6 lg:grid-cols-3"
            >
              {WRITING.map((post) => (
                <WritingCard key={post.id} post={post} variants={item} />
              ))}
            </motion.ul>
          ) : (
            <Reveal>
              <div className="rounded-[20px] border border-dashed border-[#B8AFA2] bg-[#FBF9F5] p-7 md:p-9">
                <p
                  className="font-display text-[20px] font-semibold tracking-[-0.02em] text-zinc-900 md:text-[22px]"
                  style={DISPLAY}
                >
                  Writing is on its way.
                </p>
                <p className="mt-2 max-w-[56ch] text-[15px] leading-[1.65] text-zinc-500" style={BODY}>
                  New notes on AI, XR, and product design will be collected here.
                  Until then, the case studies cover the work in depth.
                </p>
                <Link
                  href="/projects"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.12em] text-[#3B33B5] underline underline-offset-4"
                >
                  View selected work
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          )}
        </section>

        <div className="h-px w-full bg-black/5" />
      </main>
      <SiteFooter />
    </>
  );
}

function WritingCard({
  post,
  variants,
}: {
  post: WritingPost;
  variants: import("framer-motion").Variants;
}) {
  const meta = [post.date, post.readingTime].filter(Boolean).join(" · ");

  return (
    <motion.li variants={variants} className="w-full">
      <a
        href={post.url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${post.title} — read on ${post.source} (opens in a new tab)`}
        className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#DAD3C8] bg-[#FBF9F5] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_14px_40px_rgba(20,20,30,0.08)] motion-reduce:transform-none"
      >
        {/* Cover, when the piece has one; otherwise a quiet tinted band that
            carries the source mark. Either way the card keeps its shape.
            16:9 matches the published cover art exactly, so nothing is cropped. */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          ) : (
            <div
              className="flex h-full w-full items-end p-5"
              style={{
                backgroundImage:
                  "radial-gradient(120% 90% at 15% 10%, rgba(59,51,181,0.10) 0%, rgba(59,51,181,0) 60%)",
                backgroundColor: "#EFE9DF",
              }}
            >
              <span
                className="font-display text-[15px] font-semibold uppercase tracking-[0.22em] text-[#3B33B5]"
                style={DISPLAY}
              >
                {post.source}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          <div
            className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-zinc-500"
            style={BODY}
          >
            <span className="uppercase">{post.source}</span>
            {meta ? <span>{meta}</span> : null}
          </div>

          <h2
            className="font-display text-[19px] font-semibold leading-[1.18] tracking-[-0.02em] text-zinc-900 md:text-[20px]"
            style={DISPLAY}
          >
            {post.title}
          </h2>

          <p className="text-[14px] leading-[1.6] text-zinc-500" style={BODY}>
            {post.excerpt}
          </p>

          {post.tags?.length ? (
            <ul className="mt-1 flex flex-wrap gap-1.5" style={BODY}>
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[#DAD3C8] px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-zinc-500"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <span
            className="mt-auto inline-flex items-center gap-2 pt-3 font-mono text-[11px] tracking-[0.12em] text-[#3B33B5]"
            style={BODY}
          >
            Read on {post.source}
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
              ↗
            </span>
          </span>
        </div>
      </a>
    </motion.li>
  );
}
