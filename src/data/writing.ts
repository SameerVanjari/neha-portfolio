/**
 * Writing — the outbound blog index.
 *
 * There is no CMS and no database behind this: each entry points at a piece
 * Neha already published somewhere else (Medium, Substack, a conference page,
 * a PDF…). The /blog page renders these as cards and sends the reader to the
 * original, so the portfolio never holds a second copy of the article.
 *
 * To add a post, append to `WRITING` below. `url` is required and is always
 * opened in a new tab; everything else is optional and simply hides when
 * omitted.
 */
export interface WritingPost {
  /** Stable slug — used as the React key and (later) for deep links. */
  id: string;
  title: string;
  /** One or two sentences, shown on the card. */
  excerpt: string;
  /** Where the piece lives, e.g. "Medium" or "Substack". */
  source: string;
  /** Human date — "2025", "Mar 2025", anything readable. */
  date?: string;
  /** e.g. "6 min read". */
  readingTime?: string;
  tags?: string[];
  /** The published article. Opens in a new tab. */
  url: string;
  /** Optional cover image (any URL or /public path). */
  cover?: string;
  coverAlt?: string;
}

/**
 * "WHO & HOW: AI Edition" — a 365-day series Neha publishes on LinkedIn, one
 * AI company or tool per day, each explained through a single everyday analogy.
 * Titles, dates, covers and excerpts are taken from the published articles;
 * cover art is mirrored into /public/writing so the cards don't depend on
 * LinkedIn's signed CDN URLs. Newest first.
 */
export const WRITING: WritingPost[] = [
  {
    id: "day-10-gemini-omni",
    title: "WHO & HOW: AI Edition — Day 10: Gemini Omni",
    excerpt:
      "Dreams have their own physics. How Gemini's natively multimodal model creates and edits video from any mix of text, image, audio and video.",
    source: "LinkedIn",
    date: "Jun 2, 2026",
    tags: ["WHO & HOW", "AI Edition"],
    url: "https://www.linkedin.com/pulse/who-how-ai-edition-day-10-neha-mayacharya-i3q0e/",
    cover: "/writing/day-10.jpg",
    coverAlt: "Cover art for WHO & HOW: AI Edition, Day 10 — Gemini Omni",
  },
  {
    id: "day-9-omma",
    title: "WHO & HOW: AI Edition — Day 9: Omma",
    excerpt:
      "An AI creative studio that builds interactive 3D scenes, games and visual experiences through natural-language conversation.",
    source: "LinkedIn",
    date: "Jun 2, 2026",
    tags: ["WHO & HOW", "AI Edition"],
    url: "https://www.linkedin.com/pulse/who-how-ai-edition-day-9-neha-mayacharya-yvsfe/",
    cover: "/writing/day-9.jpg",
    coverAlt: "Cover art for WHO & HOW: AI Edition, Day 9 — Omma",
  },
  {
    id: "day-8-lovable",
    title: "WHO & HOW: AI Edition — Day 8: Lovable",
    excerpt:
      "Describe your app in plain English; Lovable builds the frontend, backend, database and auth — then deploys it live.",
    source: "LinkedIn",
    date: "May 27, 2026",
    tags: ["WHO & HOW", "AI Edition"],
    url: "https://www.linkedin.com/pulse/who-how-ai-edition-day-8-neha-mayacharya-tngxe/",
    cover: "/writing/day-8.jpg",
    coverAlt: "Cover art for WHO & HOW: AI Edition, Day 8 — Lovable",
  },
  {
    id: "day-7-cursor",
    title: "WHO & HOW: AI Edition — Day 7: Cursor",
    excerpt:
      "From autocomplete to agent — how Cursor reads your whole codebase and works it the way a trained kitchen team runs a service.",
    source: "LinkedIn",
    date: "May 22, 2026",
    tags: ["WHO & HOW", "AI Edition"],
    url: "https://www.linkedin.com/pulse/who-how-ai-edition-day-7-neha-mayacharya-6buae/",
    cover: "/writing/day-7.jpg",
    coverAlt: "Cover art for WHO & HOW: AI Edition, Day 7 — Cursor",
  },
  {
    id: "day-6-uizard",
    title: "WHO & HOW: AI Edition — Day 6: Uizard",
    excerpt:
      "The design sprint that doesn't need a designer to start: a sentence, a screenshot, or a napkin sketch becomes an editable, clickable UI.",
    source: "LinkedIn",
    date: "May 20, 2026",
    tags: ["WHO & HOW", "AI Edition"],
    url: "https://www.linkedin.com/pulse/who-how-ai-edition-day-6-neha-mayacharya-itlve/",
    cover: "/writing/day-6.jpg",
    coverAlt: "Cover art for WHO & HOW: AI Edition, Day 6 — Uizard",
  },
  {
    id: "day-5-adobe-firefly",
    title: "WHO & HOW: AI Edition — Day 5: Adobe Firefly",
    excerpt:
      "Generative AI for images, video, audio and vectors, built into Adobe's creative suite and available as a standalone app.",
    source: "LinkedIn",
    date: "May 18, 2026",
    tags: ["WHO & HOW", "AI Edition"],
    url: "https://www.linkedin.com/pulse/who-how-ai-edition-day-5-neha-mayacharya-d3oge/",
    cover: "/writing/day-5.jpg",
    coverAlt: "Cover art for WHO & HOW: AI Edition, Day 5 — Adobe Firefly",
  },
  {
    id: "day-4-vectary",
    title: "WHO & HOW: AI Edition — Day 4: Vectary",
    excerpt:
      "Sketch, prototype, configure, ship — all four in a single browser tab, with no 3D specialist on the team.",
    source: "LinkedIn",
    date: "May 18, 2026",
    tags: ["WHO & HOW", "AI Edition"],
    url: "https://www.linkedin.com/pulse/who-how-ai-edition-day-4-neha-mayacharya-alaxe/",
    cover: "/writing/day-4.jpg",
    coverAlt: "Cover art for WHO & HOW: AI Edition, Day 4 — Vectary",
  },
  {
    id: "day-3-spline",
    title: "WHO & HOW: AI Edition — Day 3: Spline 3D",
    excerpt:
      "Think of it as Canva, but for 3D: type a sentence and get a rotatable, editable object — no Blender, no code, no GPU.",
    source: "LinkedIn",
    date: "May 13, 2026",
    tags: ["WHO & HOW", "AI Edition"],
    url: "https://www.linkedin.com/pulse/who-how-ai-edition-day-3-365-neha-mayacharya-x8xwe/",
    cover: "/writing/day-3.jpg",
    coverAlt: "Cover art for WHO & HOW: AI Edition, Day 3 — Spline 3D",
  },
  {
    id: "day-2-midjourney",
    title: "WHO & HOW: AI Edition — Day 2: Midjourney",
    excerpt:
      "Two engines, one darkroom. How Midjourney turns seven words into a painting in four seconds — and the copyright suits still unresolved underneath.",
    source: "LinkedIn",
    date: "May 10, 2026",
    tags: ["WHO & HOW", "AI Edition"],
    url: "https://www.linkedin.com/pulse/who-how-ai-edition-neha-mayacharya-mypfe/",
    cover: "/writing/day-2.jpg",
    coverAlt: "Cover art for WHO & HOW: AI Edition, Day 2 — Midjourney",
  },
  {
    id: "day-1-instagram",
    title: "WHO & HOW: AI Edition — Day 1: Instagram",
    excerpt:
      "Instagram doesn't have one algorithm. It runs an entire airport — four ranking systems deciding what three billion people see every day.",
    source: "LinkedIn",
    date: "May 8, 2026",
    tags: ["WHO & HOW", "AI Edition"],
    url: "https://www.linkedin.com/pulse/who-how-ai-edition-neha-mayacharya-oe8be/",
    cover: "/writing/day-1.jpg",
    coverAlt: "Cover art for WHO & HOW: AI Edition, Day 1 — Instagram",
  },
];
