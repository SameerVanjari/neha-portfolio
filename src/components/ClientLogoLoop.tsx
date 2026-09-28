"use client";

import { CLIENT_LOGO_FILES } from "@/data/client-logo-map";

/**
 * Client logo marquee.
 *
 * Loop correctness has two independent requirements, and missing either one
 * shows up as a break in the strip:
 *
 *   1. The halves must be equal. Each set owns its gap *and* a trailing pad of
 *      the same size. A flat track of duplicated children can't do this — 2N
 *      logos share 2N-1 gaps, so a -50% shift overshoots by half a gap and the
 *      strip jumps at the wrap.
 *   2. The track must be long enough to still cover the viewport at full
 *      shift. With only two sets the track ends before the container does, so
 *      the logos run out and a blank gap opens up before the loop restarts.
 *      Hence SETS: the track is SETS copies long and the shift is exactly one
 *      set (`-100% / SETS`), which is seamless at any viewport width.
 *
 * Only clients with a real logo file in /public/clients appear. The full client
 * list is longer; drop the remaining files in and add them to
 * CLIENT_LOGO_FILES to widen a set.
 *
 * Runs on CSS keyframes, so it can't be left stalled by a failed hydration, and
 * it pauses on hover so a logo can actually be looked at. Under reduced motion
 * the animation is dropped and every set but the first is hidden, leaving the
 * real client list once rather than a half-clipped duplicate.
 */

const LOGOS: { name: string; src: string }[] = [
  { name: "TD Bank", src: CLIENT_LOGO_FILES["td-bank"] },
  { name: "Harvard MedTech", src: CLIENT_LOGO_FILES["harvard-medtech"] },
  { name: "Seattle Kraken", src: CLIENT_LOGO_FILES["seattle-kraken"] },
  { name: "Chatoor.ai", src: CLIENT_LOGO_FILES["chatoor"] },
  { name: "Modelo", src: CLIENT_LOGO_FILES["modelo"] },
];

/** Copies of the set. 6 keeps a ~880px set covering viewports up to ~4400px. */
const SETS = 6;

export default function ClientLogoLoop() {
  if (LOGOS.length === 0) return null;

  return (
    <div
      className="client-loop w-full overflow-hidden"
      style={
        {
          "--loop-sets": SETS,
          // Feather both edges so logos dissolve at the marquee boundaries
          // instead of being sliced off.
          maskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)",
        } as React.CSSProperties
      }
    >
      <div className="client-loop-track">
        {Array.from({ length: SETS }, (_, set) => (
          <ul key={set} className="client-loop-set" aria-hidden={set > 0 || undefined}>
            {LOGOS.map((logo) => (
              <li key={logo.name} className="flex shrink-0 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={set === 0 ? `${logo.name} logo` : ""}
                  /* Deliberately not lazy: these are five small files repeated
                     across every set. A deferred decode leaves a zero-width
                     image, so a set can measure narrower than its twin and the
                     strip shows an empty slot mid-loop. All copies share the
                     same cached URLs, so eager costs nothing. */
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="h-8 w-auto max-w-[120px] object-contain opacity-50 transition-opacity duration-300 ease-out hover:opacity-100 focus-visible:opacity-100 motion-reduce:opacity-80 motion-reduce:transition-none md:h-9 md:max-w-[132px]"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
