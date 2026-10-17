"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WRITING } from "@/data/writing";
import { useStagger } from "@/components/motion/reveal";

/**
 * Homepage teaser for the Writing index.
 *
 * The /blog page is a grid of cover-led cards; on the homepage the same pieces
 * are a single-column list of full-width rows — quieter, so they read as a
 * footnote to the work rather than a second portfolio. Each row is one link to
 * the published piece.
 */

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

/** How many of the newest pieces surface on the homepage. */
const LIMIT = 3;

export default function LatestWriting() {
  const posts = WRITING.slice(0, LIMIT);
  const { group, item, viewport } = useStagger({ step: 0.07, distance: 16 });

  if (!posts.length) return null;

  return (
    <section id="writing" aria-label="Latest writing" className="bg-[#FBF9F5]">
      <motion.div
        variants={group}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-[28px] px-6 pb-[88px] pt-[64px] md:gap-[36px] md:pb-[130px] md:pt-[120px] lg:px-0"
      >
        <motion.div
          variants={item}
          className="flex w-full flex-wrap items-end justify-between gap-4"
        >
          <div className="flex flex-col items-start gap-[10px]">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-black/10" />
              <span
                className="text-[13px] font-medium uppercase tracking-[1.82px] text-[#5C5750]"
                style={BODY}
              >
                Writing
              </span>
            </div>
            <h2
              className="text-[30px] font-semibold tracking-[-1px] text-[#17161B] sm:text-[36px] sm:tracking-[-1.2px] md:text-[48px]"
              style={DISPLAY}
            >
              Latest writing
            </h2>
            <p className="max-w-[520px] text-[16px] text-[#5C5750] md:text-[17px]" style={BODY}>
              Notes on AI, XR, and product design — each opens at its original publication.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-[15px] font-semibold text-[#17161B] underline underline-offset-4"
            style={BODY}
          >
            All writing
          </Link>
        </motion.div>

        <ul className="w-full divide-y divide-[#DAD3C8] border-y border-[#DAD3C8]">
          {posts.map((post) => (
            <motion.li key={post.id} variants={item}>
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${post.title} — read on ${post.source} (opens in a new tab)`}
                className="group grid grid-cols-1 items-start gap-4 py-5 sm:grid-cols-[200px_minmax(0,1fr)_auto] sm:items-center sm:gap-6 md:py-6"
              >
                <div className="aspect-[16/9] w-full overflow-hidden rounded-[12px] bg-[#EFE9DF] sm:w-[200px]">
                  {post.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover}
                      alt={post.coverAlt ?? post.title}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  ) : null}
                </div>

                <div className="flex min-w-0 flex-col gap-[6px]">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5C5750]"
                    style={BODY}
                  >
                    {[post.source, post.date].filter(Boolean).join(" · ")}
                  </span>
                  <h3
                    className="font-display text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#17161B] md:text-[21px]"
                    style={DISPLAY}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="line-clamp-2 max-w-[62ch] text-[14px] leading-[1.55] text-[#5C5750]"
                    style={BODY}
                  >
                    {post.excerpt}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="hidden text-[16px] text-[#5C5750] transition-transform duration-200 group-hover:translate-x-0.5 sm:block"
                >
                  ↗
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
