"use client";

/**
 * VisaGenie chat preview — a real, rendered slice of the product's UI, used
 * where the design's "Drop image vg-28-final-screen.png (chatbot UI)" slot
 * has no exported asset behind it (the Figma file, Drive and the prototype
 * hold no bitmap of the chat UI, so the sanctioned preview is the actual
 * component, built from the case's own palette and copy).
 *
 * Every dimension is in cqw so the preview composes correctly at any frame
 * size — it must read as a designed crop in both the hero browser window
 * (660×469) and card thumbnails (3:2). Static by design: it sits inside media
 * that carries its own entrance choreography, and it must not fight it.
 *
 * Copy comes from the case's own flow — guest-first welcome, country
 * selection, a cited answer, and the fraud alert that context-aware routing
 * surfaces (Decision 03), using Sarah's F-1 scenario.
 */

const NAVY = "#1d2a38";
const INK = "#1c2230";
const MUTED = "#5b6272";
const LAVENDER = "#6e5a92";
const LAVENDER_TINT = "#ece7f5";
const PAPER = "#f5f4f8";
const GREEN = "#a9dfbf";
const GREEN_INK = "#1f4d33";
const FRAME = "#e6e3ee";
const WHITE = "#ffffff";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

export default function VisaGenieChatPreview() {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden"
      style={{ background: PAPER, containerType: "size" }}
    >
      {/* address bar */}
      <div
        className="flex items-center justify-between px-[3cqw] py-[1.6cqw]"
        style={{ background: FRAME }}
      >
        <span className="font-semibold tracking-[0.08em]" style={{ ...BODY, color: MUTED, fontSize: "1.25cqw" }}>
          visagenie.app
        </span>
        <span
          className="rounded-[999px] px-[1.4cqw] py-[0.5cqw] font-semibold"
          style={{ ...BODY, background: GREEN, color: GREEN_INK, fontSize: "1.1cqw" }}
        >
          Guest mode
        </span>
      </div>

      {/* conversation — fills the frame, reading order top to bottom */}
      <div className="flex flex-1 flex-col justify-center gap-[2.6cqw] px-[3.6cqw]">
        {/* genie greeting */}
        <div className="flex items-start gap-[1.6cqw]">
          <span
            className="flex shrink-0 items-center justify-center rounded-[26%] font-bold text-white"
            style={{ background: LAVENDER, width: "4cqw", height: "4cqw", fontSize: "2cqw", ...DISPLAY }}
            aria-hidden
          >
            V
          </span>
          <div
            className="rounded-[1.4cqw] rounded-tl-[0.5cqw] px-[2.2cqw] py-[1.7cqw] leading-[1.45]"
            style={{ background: WHITE, color: INK, fontSize: "2.1cqw", ...BODY }}
          >
            Hi, I&apos;m VisaGenie. Which country are you applying to?
          </div>
        </div>

        {/* user reply */}
        <div className="flex justify-end">
          <div
            className="rounded-[1.4cqw] rounded-tr-[0.5cqw] px-[2.2cqw] py-[1.7cqw] leading-[1.45]"
            style={{ background: NAVY, color: "#f2f4f8", fontSize: "2.1cqw", ...BODY }}
          >
            The US — an F-1 student visa.
          </div>
        </div>

        {/* cited answer */}
        <div className="flex items-start gap-[1.6cqw]">
          <span
            className="flex shrink-0 items-center justify-center rounded-[26%] font-bold text-white"
            style={{ background: LAVENDER, width: "4cqw", height: "4cqw", fontSize: "2cqw", ...DISPLAY }}
            aria-hidden
          >
            V
          </span>
          <div
            className="rounded-[1.4cqw] rounded-tl-[0.5cqw] px-[2.2cqw] py-[1.7cqw] leading-[1.45]"
            style={{ background: WHITE, color: INK, fontSize: "2.1cqw", ...BODY }}
          >
            Three steps first: pay the SEVIS fee, book your visa interview,
            then gather your financial documents.
            <span className="mt-[1.2cqw] flex flex-wrap gap-[0.9cqw]">
              {["travel.state.gov", "SEVP FAQ"].map((src) => (
                <span
                  key={src}
                  className="rounded-[999px] px-[1.3cqw] py-[0.45cqw] font-semibold"
                  style={{ background: LAVENDER_TINT, color: LAVENDER, fontSize: "1.35cqw" }}
                >
                  {src}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* fraud alert — context-aware routing */}
        <div
          className="flex items-start gap-[1.6cqw] rounded-[1.4cqw] px-[2.2cqw] py-[1.7cqw]"
          style={{ background: GREEN }}
        >
          <span className="shrink-0" style={{ width: "2.4cqw", height: "2.4cqw" }} aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
              <path d="M12 3 22 20H2L12 3Z" fill={GREEN_INK} />
              <path d="M12 9.5v5" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="17" r="1" fill={GREEN} />
            </svg>
          </span>
          <p className="font-semibold leading-[1.4]" style={{ ...BODY, color: GREEN_INK, fontSize: "1.85cqw" }}>
            Heads up: employers can&apos;t legally charge most visa fees. If yours
            is asking for money upfront, open the fraud guide.
          </p>
        </div>
      </div>

      {/* input */}
      <div className="flex items-center gap-[1.6cqw] px-[3.6cqw] pb-[3.2cqw]">
        <div
          className="flex flex-1 items-center rounded-[999px] px-[2.6cqw]"
          style={{ background: WHITE, color: MUTED, border: `1px solid ${FRAME}`, height: "5.4cqw", fontSize: "1.85cqw" }}
        >
          Ask about your visa…
        </div>
        <span
          className="flex items-center justify-center rounded-[999px]"
          style={{ background: LAVENDER, width: "5.4cqw", height: "5.4cqw" }}
          aria-hidden
        >
          <svg style={{ width: "2.2cqw", height: "2.2cqw" }} viewBox="0 0 13 13" fill="none">
            <path d="M6.5 11V2M6.5 2L2.5 6M6.5 2l4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
