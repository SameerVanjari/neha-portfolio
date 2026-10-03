"use client";

/**
 * Client wordmark marquee.
 *
 * The strip is typographic: each client is set as a wordmark in a style that
 * suits the name, rather than a logo file. (Logo files can be dropped back in
 * under /public/clients later without touching the loop.)
 *
 * Loop correctness has two independent requirements, and missing either one
 * shows up as a break in the strip:
 *
 *   1. The halves must be equal. Each set owns its gap *and* a trailing pad of
 *      the same size. A flat track of duplicated children can't do this — 2N
 *      marks share 2N-1 gaps, so a -50% shift overshoots by half a gap and the
 *      strip jumps at the wrap.
 *   2. The track must be long enough to still cover the viewport at full
 *      shift. With only two sets the track ends before the container does, so
 *      the marks run out and a blank gap opens up before the loop restarts.
 *      Hence SETS: the track is SETS copies long and the shift is exactly one
 *      set (`-100% / SETS`), which is seamless at any viewport width.
 *
 * Runs on CSS keyframes, so it can't be left stalled by a failed hydration, and
 * it pauses on hover. Under reduced motion the animation is dropped and every
 * set but the first is hidden, leaving the real list once rather than a
 * half-clipped duplicate.
 */

type MarkStyle = "caps" | "serif" | "mono" | "italic";

type ClientMark = { name: string; style: MarkStyle };

const CLIENTS: ClientMark[] = [
  { name: "TD Bank", style: "caps" },
  { name: "Harvard MedTech", style: "serif" },
  { name: "IFSG", style: "caps" },
  { name: "Chatoor.ai", style: "mono" },
  { name: "Inspirit VR", style: "caps" },
  { name: "Modelo", style: "italic" },
  { name: "Seattle Kraken", style: "caps" },
];

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

/** Copies of the set. 6 keeps the strip covering viewports up to ~4400px. */
const SETS = 6;

export default function ClientLogoLoop() {
  if (CLIENTS.length === 0) return null;

  return (
    <div
      className="client-loop w-full overflow-hidden"
      style={
        {
          "--loop-sets": SETS,
          // A little more air than the logo strip: wordmarks need room to read.
          "--loop-gap": "72px",
          // Feather both edges so marks dissolve at the marquee boundaries
          // instead of being sliced off.
          maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        } as React.CSSProperties
      }
    >
      <div className="client-loop-track">
        {Array.from({ length: SETS }, (_, set) => (
          <ul key={set} className="client-loop-set" aria-hidden={set > 0 || undefined}>
            {CLIENTS.map((client) => (
              <li key={client.name} className="flex shrink-0 items-center justify-center">
                <span
                  className="whitespace-nowrap text-[#5C5750] opacity-60 transition-[opacity,color] duration-200 ease-out hover:text-[#17161B] hover:opacity-100 motion-reduce:opacity-80 motion-reduce:transition-none"
                  style={wordmarkCss(client.style)}
                >
                  {client.name}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
