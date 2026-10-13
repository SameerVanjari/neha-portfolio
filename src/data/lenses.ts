/**
 * Homepage lens system — transcribed from the new Figma design
 * "Website Wireframes" (node 525:100, Product lens).
 *
 * The homepage is lens-driven: picking a lens in the hero timeline swaps the
 * hero copy, the highlighted journey node, the work row and the toolkit's
 * featured tool. Layout, proof, statement, about, quote and footer stay fixed.
 */

export type HomeLensId = "product" | "ux" | "xr" | "ai";

export interface HomeProject {
  title: string;
  meta: string;
  /** Card thumbnail — real project imagery from /public. */
  image: string;
  imageAlt: string;
  href: string;
}

export interface HomeLens {
  id: HomeLensId;
  /** Timeline node label. */
  node: string;
  /** Node year shown under the eye mark. */
  year: string;
  /** Accent used for the active node, headline tail and CTA glow. */
  accent: string;
  headlineLead: string;
  headlineAccent: string;
  subline: string;
  /** Hero render + its particle field + lens badge. */
  eye: string;
  particles: string;
  badge: string;
  /** Large/small timeline eye marks. */
  nodeEye: string;
  nodeEyeSmall: string;
  ring: string;
  workTitle: string;
  projects: HomeProject[];
  /** Tool revealed in the toolkit's featured slot. */
  featuredTool: string;
}

export const LENS_ORDER: HomeLensId[] = ["product", "ux", "xr", "ai"];

export const LENSES: Record<HomeLensId, HomeLens> = {
  product: {
    id: "product",
    node: "Product Design",
    year: "2014",
    accent: "#d9a066",
    headlineLead: "Designing for ",
    headlineAccent: "touch, use, and longevity.",
    subline: "Physical objects, mobile apps, and end-to-end launches.",
    eye: "/figma/hero/eye-product.png",
    particles: "/figma/hero/particles-product.png",
    badge: "/figma/hero/badge-product.png",
    nodeEye: "/figma/timeline/product-lg.png",
    nodeEyeSmall: "/figma/timeline/product-sm.png",
    ring: "/figma/timeline/ring-product.svg",
    workTitle: "Product work",
    projects: [
      {
        title: "Emergency delivery aid",
        meta: "Maternal-care aid · award winner",
        image: "/case/maternal-care/hc-01-cover.jpg",
        imageAlt: "Field research portraits from Nashik district for the maternal-care delivery aid",
        href: "/projects/maternal-care",
      },
      {
        title: "Greenware",
        meta: "Bagasse tableware, CNC to production",
        image: "/case/greenware/thumbnail.jpg",
        imageAlt: "Greenware bagasse tableware range, prototyped from CNC to production",
        href: "/projects",
      },
      {
        title: "Indian Railways redesign",
        meta: "Research at IIT Bombay IDC",
        image: "/case/research/thumbnail.webp",
        imageAlt: "A fanned deck of research papers with highlighted lines and citation tabs",
        href: "/projects/research-recommender",
      },
    ],
    featuredTool: "rhino",
  },
  ux: {
    id: "ux",
    node: "User Experience",
    year: "2014",
    accent: "#c9d3e6",
    headlineLead: "Designing for ",
    headlineAccent: "clarity, flow, and ease.",
    subline: "Dashboards, user journeys, and usability research.",
    eye: "/figma/hero/eye-ux.png",
    particles: "/figma/hero/particles-ux.png",
    badge: "/figma/hero/badge-ux.png",
    nodeEye: "/figma/timeline/ux-lg.png",
    nodeEyeSmall: "/figma/timeline/ux-sm.png",
    ring: "/figma/timeline/ring-ux.svg",
    workTitle: "UX work",
    projects: [
      {
        title: "BudgAI",
        meta: "Finance dashboard · Chatoor.ai",
        image: "/case/budgai/thumbnail.webp",
        imageAlt: "BudgAI global finance app with world currencies and QR token",
        href: "/projects/budgai",
      },
      {
        title: "Focus",
        meta: "Distraction-to-intention app",
        image: "/case/focus/thumbnail.webp",
        imageAlt: "Focus app: a phone behind a clear boundary with a single amber focus point",
        href: "/projects/focus",
      },
      {
        title: "Dialysis care research",
        meta: "Clinical UX research",
        image: "/case/research/frame-home.webp",
        imageAlt: "Clinical UX research interface and journey mapping",
        href: "/projects",
      },
    ],
    featuredTool: "figma",
  },
  xr: {
    id: "xr",
    node: "Spatial / XR",
    year: "2018",
    accent: "#7fb2ff",
    headlineLead: "Designing for ",
    headlineAccent: "hands, space, and presence.",
    subline: "VR, AR, and MR experiences shaped by gesture, gaze, and voice.",
    eye: "/figma/hero/eye-xr.png",
    particles: "/figma/hero/particles-xr.png",
    badge: "/figma/hero/badge-xr.png",
    nodeEye: "/figma/timeline/xr-lg.png",
    nodeEyeSmall: "/figma/timeline/xr-sm.png",
    ring: "/figma/timeline/ring-xr.svg",
    workTitle: "XR work",
    projects: [
      {
        title: "The Broken Mile",
        meta: "VR field training",
        image: "/images/millennium/hook-squirrel-chew.jpg",
        imageAlt: "In-headset frame from The Broken Mile VR fiber-optic training",
        href: "/projects/broken-mile",
      },
      {
        title: "Harvard MedTech",
        meta: "VR pain-relief therapy",
        image: "/case/harvard/hb-12-world-crystal-bay.webp",
        imageAlt: "Crystal Bay Beach scene from the Harvard MedTech VR pain-relief world",
        href: "/projects/harvard-medtech",
      },
      {
        title: "Atrium",
        meta: "Social VR workspace (NDA)",
        image: "/case/atrium/atrium-hero.jpg",
        imageAlt: "The Atrium virtual room: a neon-teal grid hall opening into a glowing portal",
        href: "/projects/atrium",
      },
    ],
    featuredTool: "shapesxr",
  },
  ai: {
    id: "ai",
    node: "Artificial Intelligence",
    year: "2024",
    accent: "#b49cff",
    headlineLead: "Designing for ",
    headlineAccent: "judgment, context, and care.",
    subline: "Conversational agents, copilots, and adaptive interfaces.",
    eye: "/figma/hero/eye-ai.png",
    particles: "/figma/hero/particles-ai.png",
    badge: "/figma/hero/badge-ai.png",
    nodeEye: "/figma/timeline/ai-lg.png",
    nodeEyeSmall: "/figma/timeline/ai-sm.png",
    ring: "/figma/timeline/ring-ai.svg",
    workTitle: "AI work",
    projects: [
      {
        title: "Clarity",
        meta: "AI mortgage copilot",
        image: "/case/clarity/thumbnail.webp",
        imageAlt: "Clarity: a folded-paper house, mortgage document and magnifying glass",
        href: "/projects/clarity",
      },
      {
        title: "Pausa",
        meta: "AI wellness check-in",
        image: "/case/pausa/thumbnail.webp",
        imageAlt: "Pausa wellness app with a phone and five tactile mood tokens",
        href: "/projects/pausa",
      },
      {
        title: "VisaGenie",
        meta: "AI visa assistant",
        image: "/case/visagenie/thumbnail.webp",
        imageAlt: "VisaGenie: a passport, globe and curling route ribbon",
        href: "/projects/visagenie",
      },
    ],
    featuredTool: "claude",
  },
};

/** Constant hero eyebrow across every lens. */
export const HERO_EYEBROW = "Product & Experience Designer";

export interface ToolGroup {
  id: string;
  label: string;
  color: string;
  /** Group dot asset. */
  dot: string;
  /** Underline geometry in the 1176px-wide toolkit grid. */
  left: number;
  width: number;
}

export const TOOL_GROUPS: ToolGroup[] = [
  { id: "make", label: "Make", color: "#d9a066", dot: "/figma/tools/dot-make.svg", left: 0, width: 138.25 },
  { id: "design", label: "Design & test", color: "#c9d3e6", dot: "/figma/tools/dot-design.svg", left: 148.25, width: 286.5 },
  { id: "worlds", label: "Build worlds", color: "#7fb2ff", dot: "/figma/tools/dot-worlds.svg", left: 444.75, width: 434.75 },
  { id: "intel", label: "Build intelligence", color: "#b49cff", dot: "/figma/tools/dot-intel.svg", left: 889.5, width: 286.5 },
];

export interface Tool {
  id: string;
  symbol: string;
  name: string;
  group: string;
  col: number;
  row: number;
}

/** 8-column periodic grid. Featured tools overlay columns 2–6, rows 0–1. */
export const TOOLS: Tool[] = [
  { id: "rhino", symbol: "Rh", name: "Rhino", group: "make", col: 0, row: 0 },
  { id: "zbrush", symbol: "Zb", name: "ZBrush", group: "make", col: 0, row: 1 },
  { id: "gravity", symbol: "Gs", name: "Gravity Sketch", group: "make", col: 0, row: 2 },
  { id: "arduino", symbol: "Ar", name: "Arduino", group: "make", col: 0, row: 3 },
  { id: "figma", symbol: "Fi", name: "Figma", group: "design", col: 1, row: 1 },
  { id: "framer", symbol: "Fr", name: "Framer", group: "design", col: 1, row: 2 },
  { id: "principle", symbol: "Pr", name: "Principle", group: "design", col: 1, row: 3 },
  { id: "maze", symbol: "Mz", name: "Maze", group: "design", col: 2, row: 2 },
  { id: "miro", symbol: "Mi", name: "Miro", group: "design", col: 2, row: 3 },
  { id: "unity", symbol: "Un", name: "Unity", group: "worlds", col: 3, row: 2 },
  { id: "unreal", symbol: "Ue", name: "Unreal Engine", group: "worlds", col: 3, row: 3 },
  { id: "shapesxr", symbol: "Sx", name: "ShapesXR", group: "worlds", col: 4, row: 2 },
  { id: "8thwall", symbol: "8w", name: "8th Wall", group: "worlds", col: 4, row: 3 },
  { id: "blender", symbol: "Bl", name: "Blender", group: "worlds", col: 5, row: 2 },
  { id: "spline", symbol: "Sp", name: "Spline", group: "worlds", col: 5, row: 3 },
  { id: "cursor", symbol: "Cu", name: "Cursor", group: "intel", col: 6, row: 2 },
  { id: "lovable", symbol: "Lv", name: "Lovable", group: "intel", col: 6, row: 3 },
  { id: "claude", symbol: "Cl", name: "Claude API", group: "intel", col: 7, row: 0 },
  { id: "langchain", symbol: "Lc", name: "LangChain", group: "intel", col: 7, row: 1 },
  { id: "python", symbol: "Py", name: "Python", group: "intel", col: 7, row: 2 },
  { id: "azure", symbol: "Az", name: "Azure AI", group: "intel", col: 7, row: 3 },
];

/** "Used in …" line shown inside the featured tool detail panel. */
export const TOOL_USED_IN: Record<string, string> = {
  shapesxr: "Used in The Broken Mile",
  claude: "Used in Vantage AI",
};

export const TOOL_USED_IN_FALLBACK = "[Add a project you used it in]";

/* ---- Fixed homepage content (same across lenses) ---- */

export const CLIENTS = [
  "MODELO",
  "SEATTLE KRAKEN",
  "TD BANK",
  "HARVARD MEDTECH",
  "ISFG",
  "CHATOOR.AI",
  "INSPIRIT VR",
];

export const RECOGNITION = [
  "VR Awards finalist",
  "Live on Meta Quest Store",
  "Best Graduation Project",
  "MS in AI · 4.0",
  "Visiting faculty, IIT Bombay IDC",
];

export const ABOUT_ROWS = [
  { label: "Writing", value: "WHO & HOW: AI Edition" },
  { label: "Off the clock", value: "Camera, canvas, clay, and dance" },
];

export const QUOTE = {
  text: "We've never seen anything like it in our training modules. Realism and simplicity, exactly what we needed.",
  attribution: "VP of Marketing, Millennium · LinkedIn",
};

export const CONTACT = {
  email: "nmayacharya@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/neha-mayacharya" },
    { label: "Behance", href: "https://behance.net/nehamayacharya" },
  ],
};
