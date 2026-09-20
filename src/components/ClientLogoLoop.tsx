"use client";

import { useEffect, useState } from "react";

/**
 * Loop-style client logo marquee for the homepage.
 * If a real logo file exists at /clients/<slug>.png|svg|webp it renders as an
 * image; the typographic wordmark is the fallback — so dropping logo files
 * into public/clients/ later upgrades each entry with zero code changes.
 */

type MarkStyle = "caps" | "serif" | "mono" | "italic";

type ClientMark = { name: string; slug: string; style: MarkStyle };

const CLIENTS: ClientMark[] = [
  { name: "TD Bank", slug: "td-bank", style: "caps" },
  { name: "Harvard MedTech", slug: "harvard-medtech", style: "serif" },
  { name: "IFSG", slug: "ifsg", style: "caps" },
  { name: "Chatoor.ai", slug: "chatoor", style: "mono" },
  { name: "Inspirit VR", slug: "inspirit-vr", style: "caps" },
  { name: "Modelo", slug: "modelo", style: "italic" },
  { name: "Seattle Kraken", slug: "seattle-kraken", style: "caps" },
];

const FILE_EXTS = ["png", "svg", "webp"] as const;

function probe(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > 1) {
        img.src = "";
        img.removeAttribute("src");
      }
      resolve(img.naturalWidth > 0 && img.naturalHeight > 0);
    };
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

function wordmarkCss(style: MarkStyle): React.CSSProperties {
  switch (style) {
    case "serif":
      return { fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "20px", letterSpacing: "-0.01em" };
    case "italic":
      return { fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: "22px", fontStyle: "italic" };
    case "mono":
      return { fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "15px", letterSpacing: "0.16em", textTransform: "lowercase" };
    case "caps":
    default:
      return { fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "13px", letterSpacing: "0.24em", textTransform: "uppercase" };
  }
}

function ClientMarkItem({ mark }: { mark: ClientMark }) {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      for (const ext of FILE_EXTS) {
        const candidate = `/clients/${mark.slug}.${ext}`;
        const ok = await probe(candidate);
        if (ok) {
          if (alive) setLogoSrc(candidate);
          return;
        }
      }
      if (alive) setLogoSrc(null);
    })();
    return () => {
      alive = false;
    };
  }, [mark.slug]);

  const isFile = Boolean(logoSrc);
  return (
    <div className="group flex shrink-0 items-center justify-center px-9">
      {isFile ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoSrc as string}
          alt={mark.name}
          className="h-9 w-auto max-w-[170px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <span
          className="whitespace-nowrap text-zinc-600 transition-colors duration-300 group-hover:text-zinc-900"
          style={wordmarkCss(mark.style)}
        >
          {mark.name}
        </span>
      )}
    </div>
  );
}

export default function ClientLogoLoop({
  clientNames,
  bare = false,
}: {
  clientNames?: string[];
  bare?: boolean;
}) {
  const marks: ClientMark[] =
    clientNames && clientNames.length > 0
      ? clientNames.map((name) => ({
          name,
          slug: name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
          style: "caps" as MarkStyle,
        }))
      : CLIENTS;

  const marquee = (
    <div
      className="relative"
      style={{
        maskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
      } as React.CSSProperties}
    >
      <div className="client-loop-track flex w-max items-center group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 || undefined}>
            {marks.map((mark) => (
              <ClientMarkItem key={`${copy}-${mark.slug}`} mark={mark} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  if (bare) {
    return (
      <section aria-label="Companies Neha has worked with" className="relative overflow-hidden">
        {marquee}
      </section>
    );
  }

  return (
    <section aria-label="Companies Neha has worked with" className="relative overflow-hidden bg-[#F2EEE6] py-12 md:py-14">
      <p
        className="mb-7 text-center text-[10px] tracking-[0.28em] text-zinc-400"
        style={{ fontFamily: "var(--font-body)", textTransform: "uppercase" }}
      >
        Trusted by
      </p>
      {marquee}
    </section>
  );
}
