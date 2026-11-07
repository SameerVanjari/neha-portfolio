import Link from "next/link";
import Nav from "@/components/Nav";
import { ProjectRuler } from "@/components/ProjectRuler";
import { Reveal } from "@/components/motion/reveal";

/**
 * XR Roundup AR Filters — Figma "Website Wireframes" node 670:1033.
 * Uses the shared case-study nav and the same 1440 / 202px column as the
 * other project pages. Palette is this frame's own: night navy and warm paper.
 */

const NAVY = "#0b1630";
const INK = "#081024";
const PAPER = "#f6f1ec";
const ORANGE = "#c2410c";
const EYEBROW = "#ff9a4d";

const DISPLAY = { fontFamily: "var(--font-display)" } as const;
const BODY = { fontFamily: "var(--font-body)" } as const;

const GUTTER = "px-6 md:px-10 lg:px-[202px]";
const CONTENT = "mx-auto w-full max-w-[1440px]";

const FACTS = [
  {
    icon: "/case/xr-roundup/icon-role.svg",
    label: "Role",
    value: "Experience & Interaction Designer",
  },
  {
    icon: "/case/xr-roundup/icon-event.svg",
    label: "Event",
    value: "XR Roundup · NC XR × AWE Nite",
  },
  {
    icon: "/case/xr-roundup/icon-layers.svg",
    label: "Deliverables",
    value: "4 WebAR filters, photo frame, recap reel",
  },
  {
    icon: "/case/xr-roundup/icon-tools.svg",
    label: "Tools",
    value: "68-pt face tracking · HTML Canvas · Claude",
  },
] as const;

const CONSTRAINTS = [
  {
    title: "One thumb, one drink",
    body: "People are holding drinks and talking. One large shutter low on the screen, and filters that switch with a single tap.",
  },
  {
    title: "Dim brewery light",
    body: "Warm, low light makes tracking harder. Every prop scales from the eye distance and holds steady when the face is far away.",
  },
  {
    title: "Every kind of phone",
    body: "Some guests use Snapchat, some avoid social apps entirely. Anything that needs an install leaves people out.",
  },
] as const;

const BRANCHES = [
  {
    n: "01",
    title: "Where it runs",
    ideas: ["Snapchat Lens", "TikTok Effect", "Instagram (Spark AR gone)", "Phone browser", "QR code on the table"],
    decision: "WebAR via QR, zero installs",
  },
  {
    n: "02",
    title: "What people play with",
    ideas: ["Worn on the face", "Change the face", "Change the world", "Triggered by an expression", "Blink trigger"],
    decision: "4 filters, 4 kinds of AR",
  },
  {
    n: "03",
    title: "What mood fits",
    ideas: ["Full horror", "Moody & cinematic", "Playful & cute", "Costume-friendly"],
    decision: "Cute over creepy",
  },
  {
    n: "04",
    title: "What the room is like",
    ideas: ["Drinks in hand", "Dim, warm light", "Mixed crowd", "Every kind of phone"],
    decision: "One thumb, big shutter, robust tracking",
  },
] as const;

const PLATFORMS = [
  {
    option: "Snapchat Lens",
    asks: "Have Snapchat installed and signed in",
    verdict: "Strong tracking, but locks out non-users",
    chosen: false,
  },
  {
    option: "TikTok Effect",
    asks: "Have TikTok installed and signed in",
    verdict: "Same install barrier",
    chosen: false,
  },
  {
    option: "Instagram",
    asks: "Not possible: Meta Spark AR shut down in January 2025",
    verdict: "Off the table",
    chosen: false,
  },
  {
    option: "WebAR via QR code",
    asks: "Scan a code; it opens in the phone browser",
    verdict: "Chosen: zero install, works for everyone",
    chosen: true,
  },
] as const;

const FILTERS = [
  {
    src: "/case/xr-roundup/filter-witch.png",
    alt: "Witch Hat filter live at the event: a floppy purple hat, rosy cheeks, and orbiting stars",
    title: "Witch Hat",
    body: "A floppy hat, rosy cheeks and stars that orbit behind the head.",
  },
  {
    src: "/case/xr-roundup/filter-skelly.png",
    alt: "Skelly filter live at the event: cute skeleton paint with button eyes and a stitched grin",
    title: "Skelly",
    body: "Cute skeleton paint with button eyes, a heart nose and a stitched grin.",
  },
  {
    src: "/case/xr-roundup/filter-haunted.png",
    alt: "Haunted filter live at the event: ghosts, fog, a moon, and glowing jack-o’-lanterns",
    title: "Haunted",
    body: "The world changes: ghosts, fog, a moon and glowing jack-o’-lanterns.",
  },
  {
    src: "/case/xr-roundup/filter-bat.png",
    alt: "Bat Blast filter: a guest opens wide and bats burst across the frame",
    title: "Bat Blast",
    body: "Open wide for a bat burst. Tilt your head and a ghost shouts BOO.",
  },
] as const;

const MECHANICS = [
  {
    title: "Open wide → bats",
    body: "Bat Blast measures the gap between the lips against the eye distance. Past a threshold, bats spawn from the mouth, flap and fade.",
  },
  {
    title: "Tilt → BOO",
    body: "Tilt past about 16 degrees and hold for a beat, and a ghost swoops in from that side. A short cooldown keeps it from firing again and again.",
  },
  {
    title: "Cut the blink",
    body: "Blinking was my first trigger. The tracker’s eye points jitter too much to read a blink reliably, so I swapped it for a big, deliberate head tilt that also makes a better photo.",
  },
] as const;

const FALLBACKS = [
  {
    title: "Camera blocked",
    body: "“The live camera isn’t available in this view. Take a selfie or choose a photo and the filters still work.”",
  },
  {
    title: "No face in the photo",
    body: "“No face found. Try a closer, well-lit photo.”",
  },
  {
    title: "Face lost while live",
    body: "“Looking for a face…” The face props pause, but the haunted scene keeps playing.",
  },
] as const;

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      className="text-[11px] font-bold uppercase tracking-[0.08em]"
      style={{ ...BODY, color: light ? EYEBROW : ORANGE }}
    >
      {children}
    </p>
  );
}

export default function XrRoundupCase() {
  return (
    <main style={{ background: PAPER, color: "#1e1419" }}>
      <ProjectRuler />
      <Nav sticky />

      <section className="relative overflow-hidden" style={{ background: NAVY }}>
        <img
          src="/case/xr-roundup/glow.svg"
          alt=""
          aria-hidden
          width={620}
          height={620}
          className="pointer-events-none absolute right-[-80px] top-[40px] hidden lg:block"
        />
        <div className={`${CONTENT} ${GUTTER} grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,560px)_1fr] lg:py-[110px]`}>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-[18px]">
              <p className="text-[13px] font-semibold leading-[1.5]" style={{ ...BODY, color: EYEBROW }}>
                XR Roundup · NC XR × AWE Nite · WebAR photo booth
              </p>
              <h1
                className="text-[clamp(52px,6vw,84px)] font-bold leading-none tracking-[-0.03em] text-[#f4f7fc]"
                style={DISPLAY}
              >
                Tilt your head…
                <br />
                BOO!
              </h1>
              <p className="max-w-[540px] text-[19px] leading-[1.5] text-[#c9d6ea]" style={BODY}>
                A no-install AR photo booth for the Halloween edition of XR Roundup. Scan a QR code, pick a filter, and walk away with a photo that carries the event with it.
              </p>
            </div>
            <div className="border-l-[3px] border-[#ff7a1a] pl-4">
              <p className="text-[16px] font-semibold leading-[1.5] text-[#f4f7fc]" style={BODY}>
                Experience & Interaction Designer · Concept to build
              </p>
              <p className="text-[14px] leading-[1.5] text-[#9db3d3]" style={BODY}>
                NC XR community × AWE Nite · Protagonist Brewery, Charlotte · Oct 2026
              </p>
            </div>
            <a
              href="https://ncxr-halloween.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[46px] w-fit items-center rounded-full bg-[#f6f2f0] px-[22px] text-[15px] font-semibold text-[#1e1419]"
              style={BODY}
            >
              Try the app
            </a>
          </div>
          <img
            src="/case/xr-roundup/hero.png"
            alt="Two phones showing the Halloween Lab loading screen and the live Bat Blast filter"
            className="w-full max-w-[780px] justify-self-end object-contain"
          />
        </div>
      </section>

      <section data-index="At a glance" style={{ background: INK }}>
        <div className={`${CONTENT} ${GUTTER} grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4`}>
          {FACTS.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex items-start gap-3 ${i > 0 ? "lg:border-l lg:border-[#2c1f2f] lg:pl-5" : ""}`}
            >
              <img src={fact.icon} alt="" className="mt-0.5 size-5" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.44px] text-[#a8929f]" style={BODY}>
                  {fact.label}
                </p>
                <p className="mt-0.5 text-[15px] font-semibold leading-[1.5] text-[#f6eef2]" style={BODY}>
                  {fact.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-index="Overview" className={`${CONTENT} ${GUTTER} flex flex-col gap-10 py-24`}>
        <Reveal>
          <Eyebrow>Overview</Eyebrow>
          <h2 className="mt-3 max-w-[640px] text-[clamp(32px,4vw,38px)] font-semibold leading-[1.15]" style={DISPLAY}>
            An open meetup needed a shared moment, not another app.
          </h2>
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-[330px_1fr]">
          <div className="rounded-[18px] bg-[#c2410c] p-[26px]">
            <p className="text-[56px] font-bold leading-none text-white" style={DISPLAY}>
              0 installs
            </p>
            <p className="mt-2.5 max-w-[278px] text-[15px] leading-[1.35] text-[#ffe6d5]" style={BODY}>
              Scan a QR code and the booth opens straight in the phone browser
            </p>
          </div>
          <div className="rounded-[18px] bg-white px-7 py-[26px]">
            <p className="max-w-[634px] text-[16px] leading-[1.5]" style={BODY}>
              XR Roundup is an open meetup with no speakers or panels. People bring demos, network, and for the Halloween edition, show up in costume. I wanted something everyone in the room could try in under a minute, whether they build XR for a living or have never opened a lens editor. The photo is the souvenir: if every selfie carries the event name, date and venue, every share quietly promotes the community.
            </p>
          </div>
        </div>
        <div data-index="Three constraints from the room">
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {CONSTRAINTS.map((item) => (
              <article key={item.title} className="rounded-[18px] bg-white px-6 pb-[26px] pt-6">
                <h3 className="text-[18px] font-semibold" style={DISPLAY}>
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.45] text-[#6a5a62]" style={BODY}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-index="01 · Ideation" className={`${CONTENT} ${GUTTER} pb-24`}>
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <Eyebrow>01 · Ideation</Eyebrow>
            <h2 className="mt-3 max-w-[640px] text-[clamp(32px,4vw,42px)] font-semibold leading-[1.1]" style={DISPLAY}>
              Start with the room, not the tool.
            </h2>
          </div>
          <p className="text-[16px] leading-[1.5] text-[#6a5a62]" style={BODY}>
            I mapped where it runs, what people play with, what mood fits, and what the room is like. The room decided most of it.
          </p>
        </div>

        <div className="mt-10 rounded-[24px] bg-white p-6 md:p-8">
          <p className="mx-auto max-w-[298px] text-center text-[22px] font-semibold leading-[1.25]" style={DISPLAY}>
            How can everyone at the meetup try AR in under a minute?
          </p>
          <p className="mt-1 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-[#c2410c]" style={BODY}>
            The question everything hangs off
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {BRANCHES.map((branch) => (
              <article key={branch.n} className="rounded-[16px] bg-[#f6f1ec] p-4">
                <p className="text-[13px] font-semibold" style={BODY}>
                  <span className="mr-2 text-[#c2410c]">{branch.n}</span>
                  {branch.title}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {branch.ideas.map((idea) => (
                    <li key={idea} className="rounded-full bg-white px-3 py-1 text-[13px] text-[#1e1419]" style={BODY}>
                      {idea}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[14px] font-semibold text-[#c2410c]" style={BODY}>
                  → {branch.decision}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div data-index="Choosing the platform" className="mt-12">
          <Eyebrow>Choosing the platform</Eyebrow>
          <div className="mt-4 overflow-hidden rounded-[18px] bg-white">
            <div className="hidden grid-cols-[1.1fr_1.6fr_1.3fr] gap-4 px-6 py-4 text-[11px] font-bold tracking-[0.08em] text-[#a8929f] md:grid" style={BODY}>
              <span>Option</span>
              <span>What it asks of the guest</span>
              <span>Verdict</span>
            </div>
            {PLATFORMS.map((row) => (
              <div
                key={row.option}
                className={`grid gap-1 border-t border-[#f0e6df] px-6 py-4 md:grid-cols-[1.1fr_1.6fr_1.3fr] md:gap-4 ${
                  row.chosen ? "bg-[#fff1e8]" : ""
                }`}
              >
                <p className="text-[15px] font-semibold" style={BODY}>
                  {row.option}
                </p>
                <p className="text-[14px] text-[#6a5a62]" style={BODY}>
                  {row.asks}
                </p>
                <p className={`text-[14px] ${row.chosen ? "font-semibold text-[#c2410c]" : "text-[#6a5a62]"}`} style={BODY}>
                  {row.verdict}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-index="02 · The filters" className="py-24" style={{ background: NAVY }}>
        <div className={`${CONTENT} ${GUTTER}`}>
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_340px]">
            <div>
              <Eyebrow light>02 · The filters</Eyebrow>
              <h2 className="mt-3 max-w-[640px] text-[clamp(32px,4vw,42px)] font-semibold leading-[1.1] text-[#f4f7fc]" style={DISPLAY}>
                Four filters, four ways to play.
              </h2>
            </div>
            <p className="text-[16px] leading-[1.5] text-[#b7c6de]" style={BODY}>
              Something worn on the face, a change to the face itself, a change to the world around you, and a trick you trigger with your own expression. Cute over creepy, so the whole room joins in.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {FILTERS.map((filter) => (
              <figure key={filter.title}>
                <img src={filter.src} alt={filter.alt} className="aspect-[241/321] w-full rounded-[12px] object-cover" />
                <figcaption className="mt-2.5">
                  <p className="text-[20px] font-semibold text-[#f4f7fc]" style={DISPLAY}>
                    {filter.title}
                  </p>
                  <p className="mt-1 text-[14px] leading-[1.35] text-[#b7c6de]" style={BODY}>
                    {filter.body}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section data-index="03 · Interaction" className={`${CONTENT} ${GUTTER} py-24`}>
        <Eyebrow>03 · Interaction</Eyebrow>
        <div className="mt-3 grid items-end gap-6 lg:grid-cols-[1fr_340px]">
          <h2 className="max-w-[640px] text-[clamp(32px,4vw,42px)] font-semibold leading-[1.1]" style={DISPLAY}>
            Interactions you discover with your face.
          </h2>
          <p className="text-[16px] leading-[1.5] text-[#6a5a62]" style={BODY}>
            A hint chip names both gestures, so nobody has to guess.
          </p>
        </div>
        <div className="mt-10 grid items-start gap-4 lg:grid-cols-[300px_300px_1fr]">
          <figure>
            <img src="/case/xr-roundup/interact-tilt.png" alt="A guest tilts their head and a ghost shouts BOO" className="aspect-[3/4] w-full rounded-[16px] object-cover" />
            <figcaption className="mt-2">
              <p className="text-[18px] font-semibold" style={DISPLAY}>Tilt your head → BOO</p>
              <p className="mt-1 text-[14px] leading-[1.4] text-[#6a5a62]" style={BODY}>At the event: a guest tilts and the ghost swoops in.</p>
            </figcaption>
          </figure>
          <figure>
            <img src="/case/xr-roundup/interact-bats.png" alt="Bats burst from a guest’s open mouth in the Bat Blast filter" className="aspect-[3/4] w-full rounded-[16px] object-cover" />
            <figcaption className="mt-2">
              <p className="text-[18px] font-semibold" style={DISPLAY}>Open wide → bats</p>
              <p className="mt-1 text-[14px] leading-[1.4] text-[#6a5a62]" style={BODY}>Test run: bats burst from the mouth and scatter.</p>
            </figcaption>
          </figure>
          <div className="flex flex-col gap-3">
            {MECHANICS.map((item) => (
              <article key={item.title} className="rounded-[18px] bg-white px-6 py-6">
                <h3 className="text-[18px] font-semibold" style={DISPLAY}>{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.45] text-[#6a5a62]" style={BODY}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-index="04 · The exception" className={`${CONTENT} ${GUTTER} pb-24`}>
        <Eyebrow>04 · The exception</Eyebrow>
        <h2 className="mt-3 max-w-[640px] text-[clamp(32px,4vw,42px)] font-semibold leading-[1.1]" style={DISPLAY}>
          When the camera says no, nobody hits a dead end.
        </h2>
        <p className="mt-6 max-w-[760px] text-[16px] leading-[1.55]" style={BODY}>
          The live camera is blocked in some places a QR scan or shared link can land: in-app browsers, embedded previews, or a permission someone tapped away. Instead of an error screen, the booth falls back to a still photo. Guests take a selfie or pick one from their gallery, and the same four filters, frame and save flow apply.
        </p>
        <ol className="mt-8 grid gap-3 md:grid-cols-4">
          {[
            ["Scan the QR code", "ncxr-halloween.netlify.app"],
            ["Start", "Camera or selfie"],
            ["Live camera", "Pick a filter, snap"],
            ["Save & share", "Framed photo"],
          ].map(([title, note], i) => (
            <li key={title} className="rounded-[16px] bg-white px-5 py-4">
              <p className="text-[11px] font-bold text-[#c2410c]" style={BODY}>0{i + 1}</p>
              <p className="mt-1 text-[16px] font-semibold" style={DISPLAY}>{title}</p>
              <p className="mt-1 text-[13px] text-[#6a5a62]" style={BODY}>{note}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-[640px] text-[14px] leading-[1.45] text-[#6a5a62]" style={BODY}>
          If the camera is blocked, Start routes to a selfie or a photo from the gallery instead of an error, then rejoins the same four filters, event frame, and Save & share screen.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {FALLBACKS.map((item) => (
            <article key={item.title} className="rounded-[18px] bg-white px-6 py-6">
              <h3 className="text-[15px] font-semibold" style={DISPLAY}>{item.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.45] text-[#6a5a62]" style={BODY}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-index="05 · Sketch to screen" className={`${CONTENT} ${GUTTER} pb-24`}>
        <Eyebrow>05 · Sketch to screen</Eyebrow>
        <h2 className="mt-3 max-w-[640px] text-[clamp(32px,4vw,42px)] font-semibold leading-[1.1]" style={DISPLAY}>
          The NCXR logo became the interface.
        </h2>
        <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.08em] text-[#c2410c]" style={BODY}>
          Built screens
        </p>
        <div className="mt-4 grid items-center gap-10 lg:grid-cols-[500px_1fr]">
          <div className="flex flex-wrap gap-5">
            <img
              src="/case/xr-roundup/screen-live.png"
              alt="The live camera screen with the Witch Hat filter and the four-tile picker"
              className="w-[240px] rounded-[24px] border-[6px] border-[#1e1419] object-cover"
            />
            <img
              src="/case/xr-roundup/screen-saved.png"
              alt="The saved photo screen, framed and ready to share"
              className="w-[240px] rounded-[24px] border-[6px] border-[#1e1419] object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-[24px] font-semibold" style={DISPLAY}>A picker built from the logo tiles</h3>
              <p className="mt-3 max-w-[500px] text-[16px] leading-[1.5]" style={BODY}>
                The NCXR mark is a two-by-two grid of light and dark blue tiles. I turned that grid into the filter picker, so the brand is something you touch. The shutter sits low and large for one-thumb use, and the stage shows exactly what gets saved.
              </p>
            </div>
            <div>
              <h3 className="text-[24px] font-semibold" style={DISPLAY}>A frame borrowed from the flyer</h3>
              <p className="mt-3 max-w-[500px] text-[16px] leading-[1.5]" style={BODY}>
                The event flyer set the palette: an orange-to-purple title on a night-blue ground. The photo frame carries that title, the NCXR tiles, the date and the venue, and is on by default. Guests can switch it off for a clean shot.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section data-index="Results" className={`${CONTENT} ${GUTTER} pb-24`}>
        <Eyebrow>Results</Eyebrow>
        <h2 className="mt-3 max-w-[640px] text-[clamp(32px,4vw,42px)] font-semibold leading-[1.1]" style={DISPLAY}>
          Live at XR Roundup, Oct 28. Everyone had fun.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["4 filters", "All four used on the live camera on the night"],
            ["1 QR code", "Scan and play in the phone browser, no install"],
            ["Head-tilt BOO", "The one trigger I couldn’t test before the event fired for real in the room"],
          ].map(([stat, note]) => (
            <article key={stat} className="rounded-[18px] bg-white px-6 py-6">
              <p className="text-[32px] font-bold leading-none" style={DISPLAY}>{stat}</p>
              <p className="mt-3 text-[15px] leading-[1.4] text-[#6a5a62]" style={BODY}>{note}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid items-start gap-4 md:grid-cols-3">
          <figure>
            <video
              id="recap"
              src="/case/xr-roundup/recap-reel.mp4"
              poster="/case/xr-roundup/proof-reel.png"
              controls
              playsInline
              preload="metadata"
              className="aspect-[9/16] w-full rounded-[16px] bg-[#1e1419] object-cover"
            >
              Your browser does not support the video tag.
            </video>
            <figcaption className="mt-2.5">
              <p className="text-[20px] font-semibold" style={DISPLAY}>Recap reel</p>
              <p className="mt-1 text-[14px] leading-[1.4] text-[#6a5a62]" style={BODY}>Vertical cut for Instagram Reels and Stories: live footage plus saved photos.</p>
            </figcaption>
          </figure>
          <figure>
            <img src="/case/xr-roundup/proof-boo.png" alt="A guest’s saved photo with the head-tilt BOO ghost" className="w-full rounded-[16px] object-cover" />
            <figcaption className="mt-2.5">
              <p className="text-[20px] font-semibold" style={DISPLAY}>Tilt, and BOO</p>
              <p className="mt-1 text-[14px] leading-[1.4] text-[#6a5a62]" style={BODY}>Bat Blast’s head-tilt ghost, caught in a guest’s saved photo.</p>
            </figcaption>
          </figure>
          <figure>
            <img src="/case/xr-roundup/proof-costume.png" alt="The Witch Hat filter on a guest already in Halloween makeup" className="w-full rounded-[16px] object-cover" />
            <figcaption className="mt-2.5">
              <p className="text-[20px] font-semibold" style={DISPLAY}>Costume, meet filter</p>
              <p className="mt-1 text-[14px] leading-[1.4] text-[#6a5a62]" style={BODY}>The Witch Hat on top of real Halloween makeup, frame on, ready to share.</p>
            </figcaption>
          </figure>
        </div>
        <div className="mt-8 rounded-[18px] bg-white px-10 py-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#c2410c]" style={BODY}>Made to be shared</p>
          <p className="mt-2 max-w-[956px] text-[18px] leading-[1.45]" style={BODY}>
            Every saved photo carries the event name, date and venue, framed 3:4 so it posts straight to the Instagram feed. Built for one night only; the filters weren’t released publicly.
          </p>
        </div>
        <p className="mt-6 text-[14px] leading-[1.5] text-[#6a5a62]" style={BODY}>
          Personal project for the NC XR community’s Halloween XR Roundup, co-hosted with AWE Nite at Protagonist Brewery, Charlotte. Photos and video from the night.
        </p>
      </section>

      <section data-index="More projects" className={`${CONTENT} ${GUTTER} border-t border-[#eadfd6] py-16`}>
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#a8929f]" style={BODY}>More projects</p>
          <Link href="/projects" className="text-[15px] font-semibold" style={BODY}>All work</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link href="/projects/made-for-joy" className="flex gap-4 rounded-[18px] bg-white p-3.5">
            <img src="/case/joy/thumbnail.webp" alt="" className="h-[110px] w-[150px] shrink-0 rounded-[12px] object-cover" />
            <span className="flex flex-col justify-center">
              <span className="text-[12px] text-[#a8929f]" style={BODY}>Previous · VR · Mindfulness</span>
              <span className="mt-1 text-[20px] font-semibold" style={DISPLAY}>Made for Joy</span>
              <span className="mt-1 text-[14px] text-[#6a5a62]" style={BODY}>A world where the world is the interface</span>
            </span>
          </Link>
          <Link href="/projects/td-bank-one-vanderbilt" className="flex gap-4 rounded-[18px] bg-white p-3.5">
            <img src="/case/td/thumbnail.webp" alt="" className="h-[110px] w-[150px] shrink-0 rounded-[12px] object-cover" />
            <span className="flex flex-col justify-center">
              <span className="text-[12px] text-[#a8929f]" style={BODY}>Next · WebAR · Brand activation</span>
              <span className="mt-1 text-[20px] font-semibold" style={DISPLAY}>TD Bank One Vanderbilt</span>
              <span className="mt-1 text-[14px] text-[#6a5a62]" style={BODY}>A cardboard skyscraper that comes alive in AR</span>
            </span>
          </Link>
        </div>
      </section>

      <footer id="contact" data-index="Contact" style={{ background: INK }}>
        <div className={`${CONTENT} ${GUTTER} flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between`}>
          <div>
            <p className="text-[32px] font-semibold text-[#f4f7fc]" style={DISPLAY}>Let’s talk.</p>
            <a href="mailto:nmayacharya@gmail.com" className="mt-2 inline-block text-[16px] text-[#c9d6ea]" style={BODY}>
              nmayacharya@gmail.com
            </a>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-6 text-[14px] text-[#f4f7fc]" style={BODY}>
            <a href="https://linkedin.com/in/neha-mayacharya" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://behance.net/nehamayacharya" target="_blank" rel="noreferrer">Behance</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé (PDF)</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
