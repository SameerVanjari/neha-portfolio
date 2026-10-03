import type { ThemeId } from "@/data/themes";

/**
 * The project lineup — the single source of truth for every project's card
 * data, used by both the homepage "Selected work" section and /projects.
 *
 * One entry per case study that has a real page under /projects/<id>. The
 * order below is the intended public sequence: most current and most
 * representative first, mixing lenses so the opening row doesn't read as one
 * discipline. Per-lens views preserve this order, filtered.
 *
 * Provenance: titles, roles, years and discipline lines are taken from each
 * case's own data module and route metadata, not invented here. `year` is
 * optional because four cases have no verifiable year in their source data.
 */

export type CaseLens = ThemeId;

export interface CaseStudy {
  id: string;
  title: string;
  /** Discipline line — e.g. "VR · Enterprise training". */
  meta: string;
  year?: string;
  description: string;
  role: string;
  lens: CaseLens;
  image?: string;
  imageAlt?: string;
  /** Muted, looping hero clip. Plays on card hover where one exists. */
  video?: string;
  badge?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "pausa",
    title: "Pausa",
    meta: "AI · Conversational agent",
    year: "2026",
    description:
      "An AI check-in companion that knows its limits. A mental-wellness companion designed end to end, from a research paper on companion AI to hi-fi on mobile and web.",
    role: "Product & Conversation Designer · Independent project",
    lens: "ai",
    image: "/case/pausa/visual-webshot.png",
    imageAlt: "Pausa web dashboard: check-in, conversation, 7-day mood and a breathing card",
  },
  {
    id: "visagenie",
    title: "VisaGenie",
    meta: "AI · Conversational assistant",
    year: "2025",
    description:
      "An AI assistant that guides applicants through the visa process, reaching 95% task conversion. Built with LangChain, GPT-4, and Flask.",
    role: "Lead AI Product Designer",
    lens: "ai",
    // No bitmap of the chat UI exists in the Figma file, Drive or the
    // prototype — the thumbnail is a real render of VisaGenieChatPreview,
    // the component built from this case's own palette and flow copy.
    image: "/case/visagenie/card.png",
    imageAlt: "The VisaGenie chat: guest mode, a guided F-1 answer with source citations, and the employer-fee fraud alert",
  },
  {
    id: "budgai",
    title: "BudgAI",
    meta: "Personal finance · AI + UX",
    year: "2024 · 2026",
    description:
      "Scan to pay, send abroad at live rates, split with anyone, and ask plain questions about your spending. AI suggests; you decide.",
    role: "Product Design Consultant · Chatoor.ai",
    lens: "ai",
    // Cover render from the Chatoor-AI-UX presentation deck (slide 1).
    image: "/case/budgai/card.png",
    imageAlt: "BudgAI on a phone: one global money app",
  },
  {
    id: "focus",
    title: "Focus",
    meta: "Attention & wellbeing · Concept",
    year: "2026",
    description:
      "A distraction-to-intention app that protects what you picked up your phone to do, instead of guessing what you meant.",
    role: "Designer · Independent concept project",
    lens: "product",
    // Cover export from the Focus case-study Figma file (fc-01-cover.png).
    image: "/case/focus/fc-01-cover.png",
    imageAlt: "Focus: hold the boundaries you set, don’t guess at intentions",
  },
  {
    id: "atrium",
    title: "Atrium",
    meta: "XR · Social VR workspace (NDA)",
    year: "2024",
    description:
      "End-to-end interaction design for a multi-user VR collaboration platform on PICO 4 with a companion mobile app, for a large public-sector organization.",
    role: "Lead Immersive Experience Designer · CXR Agency (Kinemeric)",
    lens: "xr",
    // NDA case: the approved cover render is shown; the rest is withheld.
    image: "/case/atrium/atrium-hero.jpg",
    imageAlt: "The Atrium virtual room: a neon-teal grid hall opening into a glowing portal",
  },
  {
    id: "inspirit-physics",
    title: "Inspirit VR Physics",
    meta: "VR · Education",
    description:
      "A sci-fi carnival where physics is something you do: launch a cannon, throw objects and walk under their parabolas. Built on the NGSS curriculum, tested in real classrooms.",
    role: "VR Design Intern · Inspirit VR",
    lens: "xr",
    // Cover: the Sci-Fi Carnival theme art from the case's own asset set.
    image: "/case/inspirit/iv-03-scifi-carnival-theme.jpg",
    imageAlt: "Sci-Fi Carnival theme: dome experiment stations across the VR world",
  },
  {
    id: "inspirit-biology",
    title: "Inspirit VR Biology",
    meta: "VR · NGSS biology",
    description:
      "Fly a spaceship inside the cell to learn how life copies itself. Four biology modules storyboarded and designed for HTC Vive and Oculus Quest.",
    role: "VR Design Intern · Inspirit VR",
    lens: "xr",
    // Cover from the project's Figma export set (bv-01-cover.jpg).
    image: "/case/inspirit-biology/bv-01-cover.jpg",
    imageAlt: "Education in Virtual Reality: Project 2, Inspirit VR Biology",
  },
  {
    id: "inspirit-dna",
    title: "Inspirit VR DNA",
    meta: "VR · NGSS biology",
    description:
      "A spaceship carries students into a eukaryotic cell and into the chromatin, where they explore DNA’s structure and then construct it themselves. Graduation internship project on Google Cardboard.",
    role: "VR Design Intern · Inspirit VR",
    lens: "xr",
    // Cover: dn-01-cover.jpg from the case's own asset set.
    image: "/case/inspirit-dna/dn-01-cover.jpg",
    imageAlt: "Education in Virtual Reality: a modelled DNA helix over the Inspirit spaceship",
  },
  {
    id: "maternal-care",
    title: "Emergency Delivery Aid",
    meta: "Product Design · Healthcare",
    year: "2017",
    description:
      "Field research across Nashik district led to an emergency delivery aid for Sub Centres that supports the squatting posture rural women already live in. Best Graduation Project award.",
    role: "Product Designer · Independent graduation project",
    lens: "product",
    // Cover: hc-01-cover.jpg (non-sensitive deck cover art).
    image: "/case/maternal-care/hc-01-cover.jpg",
    imageAlt: "Field research portraits from Nashik district under the project title",
  },
  {
    id: "interactive-learning-aid",
    title: "Interactive Learning Aid",
    meta: "Physical computing · Arduino",
    description:
      "An interactive learning aid that teaches young children the parts of the face: each name tag hides an IR sensor, and touching it lights the matching eye, nose, lip or ear.",
    role: "Concept, interaction design and prototyping",
    lens: "product",
    // Cover export from the project's Drive folder (ila-01-cover.jpg).
    image: "/case/interactive-learning-aid/ila-01-cover.jpg",
    imageAlt: "Interactive Learning Aid: a green circuit-board head and the project cover",
  },
  {
    id: "broken-mile",
    title: "The Broken Mile",
    meta: "VR · Enterprise training",
    year: "2023",
    description:
      "VR fiber-optic training on Meta Quest 2, published on the Meta Quest Store. A scalable 3D design system and ShapesXR storyboarding cut development cycles by 30%.",
    role: "Lead Immersive Experience Designer · CXR Agency (Kinemeric)",
    lens: "xr",
    image: "/images/millennium/hook-squirrel-chew.jpg",
    imageAlt: "Frame from The Broken Mile, in-headset view",
    video: "/videos/vr-training-fiber.mp4",
    badge: "International VR Awards Finalist",
  },
  {
    id: "clarity",
    title: "Clarity",
    meta: "Self-initiated concept · AI copilot",
    year: "2026",
    description:
      "A mortgage copilot for loan officers and borrowers, where the AI guides and analyzes and a person makes every consequential decision.",
    role: "Product & AI Experience Designer · Self-initiated concept",
    lens: "ai",
    image: "/case/clarity/kd-guide.png",
    imageAlt: "Clarity guiding a borrower through the loan journey",
  },
  {
    id: "hbo-charm-city-kings",
    title: "Charm City Kings",
    meta: "AR · Social campaign for HBO Max",
    year: "2020",
    description:
      "Instagram and Facebook face filters that gave fans nicknames from the film. Shipped as an official HBO Max campaign filter.",
    role: "AR Filter Designer · CXR Agency (Kinemeric)",
    lens: "xr",
    image: "/projects/hbo-charm-city-kings/hero-filter.jpg",
    imageAlt: "A “They call me…” filter frame",
    video: "/videos/charm-city-kings/they-call-me-nicki.mp4",
  },
  {
    id: "ascension",
    title: "Ascension Realty",
    meta: "Mobile AR · Real estate",
    year: "2021",
    description:
      "A mobile AR experience that takes buyers from a city skyline down into a single room, before construction begins. Concept to demo build in a 3-week sprint.",
    role: "XR Designer · CXR Agency (Kinemeric)",
    lens: "xr",
    image: "/case/ascension/media/city-phone.webp",
    imageAlt: "The city skyline inside the Ascension Realty AR view",
    video: "/videos/ascension-realty.mp4",
  },
  {
    id: "vantage-ai",
    title: "Vantage AI",
    meta: "AI · Career co-pilot",
    year: "2026",
    description:
      "An AI career co-pilot that turns one resume into a role-specific story: tailored to each job, styled to who you are, and approved by you line by line.",
    role: "Sole product designer and builder",
    lens: "ai",
    image: "/case/vantage/thumbnail.png",
    imageAlt: "Vantage AI portal: start your profile",
  },
  {
    id: "research-recommender",
    title: "Research Recommender",
    meta: "AI + UX · Research tooling",
    year: "2025",
    description:
      "A research paper recommender with smart note-taking and automatic APA, MLA and Chicago citations. Designed and coded end to end.",
    role: "Designer & Developer · Self-initiated project",
    lens: "ai",
    image: "/case/research/frame-home.webp",
    imageAlt: "The Research Recommender home screen",
  },
  {
    id: "made-for-joy",
    title: "Made for Joy",
    meta: "VR · Mindfulness app",
    description:
      "Interaction design for an immersive VR mindfulness app, with visuals and guides approved by national wellness experts.",
    role: "Concept & Interaction Designer · CXR Agency (Kinemeric)",
    lens: "product",
    image: "/case/joy/community.webp",
    imageAlt: "A Made for Joy mindfulness scene",
    video: "/videos/made-for-joy.mp4",
  },
  {
    id: "modelo-seattle-kraken",
    title: "Modelo × Seattle Kraken",
    meta: "Mobile web game · Brand campaign",
    year: "2021",
    description:
      "A modern-day retro hockey game, played in the phone’s browser, that turned a brand partnership into sweepstakes entries.",
    role: "XR Designer · CXR Agency (Kinemeric)",
    lens: "product",
    image: "/case/modelo/countdown.webp",
    imageAlt: "The Skate Challenge countdown",
  },
  {
    id: "harvard-medtech",
    title: "Harvard MedTech",
    meta: "VR · Healthcare therapy",
    year: "2022",
    description:
      "A home-based VR therapy experience for people living with chronic pain and stress, designed to work on the very first try.",
    role: "Lead Immersive Experience Designer · CXR Agency (Kinemeric)",
    lens: "ux",
    image: "/case/harvard/hb-12-world-crystal-bay.webp",
    imageAlt: "Crystal Bay Beach: a wooden deck over turquoise water, a boat moored among palms",
  },
  {
    id: "feed-the-children",
    title: "Feed the Children",
    meta: "WebAR · Nonprofit fundraising",
    year: "2022",
    description:
      "Scanning a QR code places a classroom food pantry in the donor’s room, one tap from giving, with no app to install.",
    role: "Experience Designer · CXR Agency (Kinemeric)",
    lens: "ux",
    image: "/case/ftc/media/ar-pantry.jpg",
    imageAlt: "The AR pantry, cropped to the AR view only",
  },
  {
    id: "td-bank-one-vanderbilt",
    title: "TD Bank One Vanderbilt",
    meta: "WebAR · Brand activation",
    description:
      "People build One Vanderbilt with their own hands, point a phone at it, and watch the tower celebrate in TD green.",
    role: "XR Designer · CXR Agency (Kinemeric)",
    lens: "xr",
    image: "/case/td/hero-crown-light.webp",
    imageAlt: "One Vanderbilt lit up in TD green",
  },
  {
    id: "turtle-bay-resort",
    title: "Turtle Bay Resort",
    meta: "WebAR · Hospitality portal",
    description:
      "Place a door in any room, step through, and you’re on the resort’s private beach at sunrise. WebAR portal, no app to install.",
    role: "XR Designer · CXR Agency (Kinemeric)",
    lens: "xr",
    image: "/case/turtle/tb-15-finished-three-screens.webp",
    imageAlt:
      "Three Turtle Bay screens side by side: the welcome screen, a turtle on the beach, and the invitation to visit",
  },
  {
    id: "ifsg-virtual-retail",
    title: "IFSG Virtual Retail",
    meta: "VR/AR · Luxury virtual retail",
    description:
      "A futuristic virtual store where shoppers explore curated brands in an interactive 3D world, in VR, with an AR prototype for phones.",
    role: "Experience & Interaction Designer",
    lens: "xr",
    image: "/case/ifsg/sb-welcome-1.webp",
    imageAlt: "The IFSG store welcome space",
    video: "/videos/ifsg/hero.mp4",
  },
];

/** Projects for a lens, in public order. "all" returns the full lineup. */
export function caseStudiesForLens(lens: CaseLens | "all"): CaseStudy[] {
  return lens === "all" ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.lens === lens);
}

/** Homepage grid shape: two rows of three unfiltered, a single row when filtered. */
export const HOME_ALL_LIMIT = 6;
export const HOME_LENS_LIMIT = 3;

/**
 * The card image for a `/projects/<id>` href. Neighbor cards on every case
 * page read their thumbnails from here, so a project's thumbnail lives in
 * exactly one place — a card can never go placeholder just because the case
 * data next door didn't name an asset.
 */
export function caseStudyThumb(href: string): string | undefined {
  const id = href.replace(/^\/projects\//, "").split(/[?#]/)[0];
  return CASE_STUDIES.find((c) => c.id === id)?.image;
}
