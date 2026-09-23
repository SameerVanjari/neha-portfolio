"use client";

import { Tooltip } from "@/components/ui/tooltip-card";
import type { BioAnnotation } from "@/data/bio-annotations";

/**
 * BioLens — hover pop-ups on phrases in the About-page bio.
 * Popups use the Aceternity Tooltip Card (src/components/ui/tooltip-card.tsx):
 * the card follows the pointer, springs open via Motion, and — unlike the
 * stock component — keeps links inside clickable (pointer-events + link
 * passthrough are handled there).
 */
export type LensPopup = Pick<BioAnnotation, "title" | "rows" | "items" | "note"> & {
  link?: { href: string; label: string };
};

export function BioLens({
  children,
  popup,
}: {
  children: React.ReactNode;
  popup: LensPopup;
}) {
  const content = (
    <span className="block w-full text-left">
      <span className="block font-display text-[13px] font-semibold tracking-[-0.01em] text-zinc-900" style={{ fontFamily: "var(--font-display)" }}>
        {popup.title}
      </span>
      {popup.rows?.length ? (
        <span className="mt-2.5 block space-y-1.5">
          {popup.rows.map((r) => (
            <span key={r.label} className="grid grid-cols-[92px_1fr] gap-2">
              <span className="font-mono text-[9.5px] leading-[1.5] tracking-[0.1em] text-zinc-400">{r.label}</span>
              <span className="text-[11.5px] leading-[1.55] text-zinc-600">{r.value}</span>
            </span>
          ))}
        </span>
      ) : null}
      {popup.items?.length ? (
        <span className="mt-2.5 block space-y-1">
          {popup.items.map((it) => (
            <span key={it} className="flex items-start gap-1.5">
              <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-zinc-800" aria-hidden />
              <span className="text-[11.5px] leading-[1.55] text-zinc-600">{it}</span>
            </span>
          ))}
        </span>
      ) : null}
      {popup.note ? (
        <span className="mt-2.5 block border-l-2 pl-2.5 text-[11px] leading-[1.55] text-zinc-500" style={{ borderColor: "rgba(53,51,158,0.4)" }}>
          {popup.note}
        </span>
      ) : null}
      {popup.link ? (
        <>
          <span className="mt-3 block h-px w-full bg-black/5" aria-hidden />
          <a
            href={popup.link.href}
            className="mt-2.5 inline-block font-mono text-[10px] tracking-[0.1em] transition-colors hover:opacity-70"
            style={{ color: "#35339E" }}
          >
            {popup.link.label}
          </a>
        </>
      ) : null}
    </span>
  );

  return (
    <Tooltip content={content} containerClassName="inline">
      <span className="bio-lens relative cursor-help whitespace-normal text-left align-baseline">
        {children}
      </span>
    </Tooltip>
  );
}

/** Splits the bio into annotated + plain segments (first occurrence of each phrase), rendered as one paragraph. */
export function AnnotatedBio({
  bio,
  annotations,
  popupFor,
}: {
  bio: string;
  annotations: BioAnnotation[];
  popupFor: (a: BioAnnotation) => LensPopup;
}) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  const hits = annotations
    .map((a) => ({ a, idx: bio.indexOf(a.phrase) }))
    .filter((h) => h.idx !== -1)
    .sort((x, y) => x.idx - y.idx);

  hits.forEach(({ a, idx }, i) => {
    if (idx < cursor) return;
    if (idx > cursor) parts.push(<span key={`t${i}`}>{bio.slice(cursor, idx)}</span>);
    parts.push(
      <BioLens key={a.phrase} popup={popupFor(a)}>
        <span className="bio-lens-phrase">{a.phrase}</span>
      </BioLens>
    );
    cursor = idx + a.phrase.length;
  });
  if (cursor < bio.length) parts.push(<span key="rest">{bio.slice(cursor)}</span>);

  return <>{parts}</>;
}
