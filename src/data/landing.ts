import type { ThemeId } from "./themes";

/**
 * Landing page content — transcribed from Website Wireframes,
 * "Landing — Desktop (1440)" (node 98:41). XR lens copy is verbatim
 * from Figma; UX / AI / Product lenses follow the same voice.
 */

export interface HeroLens {
  eyebrow: string;
  headline: string;
  support: string;
}

export const HERO_LENSES: Record<ThemeId, HeroLens> = {
  xr: {
    eyebrow: "XR · Immersive design",
    headline: "Designing for hands, space, and presence",
    support:
      "I design VR, AR, and WebAR experiences around how people naturally reach, move, and look, so the technology fades and the task takes over. As a lead immersive designer, I've shipped 20+ XR solutions across healthcare, enterprise training, and retail.",
  },
  ux: {
    eyebrow: "UX · Human-centered systems",
    headline: "Designing flows people trust",
    support:
      "I design research-driven UX for complex systems — dashboards, conversational interfaces, training tools — turning fragmented workflows into coherent experiences people trust.",
  },
  ai: {
    eyebrow: "AI · Intelligent experiences",
    headline: "Designing intelligence that explains itself",
    support:
      "I design conversational agents and adaptive interfaces that earn trust — AI that amplifies human judgment instead of replacing it.",
  },
  product: {
    eyebrow: "Product · End-to-end ownership",
    headline: "Designing products that ship and last",
    support:
      "I own the full lifecycle from insight to launch — strategy, systems, and shipping across fintech, mobile, and enterprise.",
  },
};

export type WorkLens = "all" | ThemeId;

export interface SelectedWorkCard {
  id: string;
  title: string;
  meta: string;
  year: string;
  description: string;
  role: string;
  lens: ThemeId;
  /** Card image. Absent → dashed placeholder treatment per Figma. */
  image?: string;
  imageAlt?: string;
  badge?: string;
  href: string;
}

export const SELECTED_WORK: SelectedWorkCard[] = [
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
    badge: "International VR Awards Finalist",
    href: "/projects/broken-mile",
  },
  {
    id: "pausa",
    title: "Pausa",
    meta: "AI · Conversational agent",
    year: "2026",
    description:
      "An AI check-in companion that knows its limits — a mental-wellness companion designed end to end, from a research paper on companion AI to hi-fi on mobile and web.",
    role: "Product & Conversation Designer · Independent project",
    lens: "ai",
    image: "/case/pausa/visual-webshot.png",
    imageAlt: "Pausa web dashboard: check-in, conversation, 7-day mood and a breathing card",
    href: "/projects/pausa",
  },
  {
    id: "visagenie",
    title: "VisaGenie",
    meta: "AI · Conversational assistant",
    year: "2024",
    description:
      "An AI assistant that guides applicants through the visa process, reaching 95% task conversion. Built with LangChain, GPT-4, and Flask.",
    role: "Lead AI Product Designer",
    lens: "ai",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "VisaGenie chat interface screen",
    href: "/projects/visagenie",
  },
  {
    id: "charm-city-kings",
    title: "Charm City Kings",
    meta: "AR · Social campaign for HBO Max",
    year: "2020",
    description:
      "Instagram and Facebook face filters that gave fans nicknames from the film. Shipped as an official HBO Max campaign filter.",
    role: "AR Filter Designer · CXR Agency (Kinemeric)",
    lens: "xr",
    image: "/projects/hbo-charm-city-kings/hero-filter.jpg",
    imageAlt: "A “They call me…” filter frame",
    href: "/projects/hbo-charm-city-kings",
  },
  {
    id: "clarity",
    title: "Clarity",
    meta: "Self-initiated concept · AI copilot",
    year: "2026",
    description:
      "A mortgage copilot for loan officers and borrowers, where the AI guides and analyzes and a person makes every consequential decision.",
    role: "Concept, research, and product design",
    lens: "ai",
    href: "/projects",
  },
  {
    id: "feed-the-children",
    title: "Feed the Children",
    meta: "WebAR · Nonprofit fundraising",
    year: "2022",
    description:
      "Scanning a QR code places a classroom food pantry in the donor's room, one tap from giving, with no app to install.",
    role: "Experience Designer · CXR Agency (Kinemeric)",
    lens: "xr",
    image: "/case/ftc/media/ar-pantry.jpg",
    imageAlt: "The AR pantry, cropped to the AR view only",
    href: "/projects/feed-the-children",
  },
  {
    id: "vantage-ai",
    title: "Vantage AI",
    meta: "AI · Résumé optimization tool",
    year: "2026",
    description:
      "A résumé optimization tool built on the Claude API and Streamlit.",
    role: "Designer and builder",
    lens: "ai",
    href: "/projects",
  },
];

export interface WorkStep {
  num: string;
  title: string;
  body: string;
}

export const WORK_STEPS: WorkStep[] = [
  {
    num: "01",
    title: "Discover",
    body: "I map what people do and why it matters, through interviews, observation, and market signals.",
  },
  {
    num: "02",
    title: "Define",
    body: "I turn research into intent trees, jobs-to-be-done, and clear system constraints.",
  },
  {
    num: "03",
    title: "Envision",
    body: "Flows, design tokens, and spatial maps, so the system takes shape before the pixels do.",
  },
  {
    num: "04",
    title: "Prototype",
    body: "Hand-tracked, voice-first, and AI-powered prototypes, tested in context with real users.",
  },
  {
    num: "05",
    title: "Ship & learn",
    body: "I measure, iterate, and refine. Real usage shapes the next version.",
  },
];

export const CLIENT_NOTE = "XR client work delivered at CXR Agency (Kinemeric)";

export const FEATURED_QUOTE = {
  quote:
    "We've never seen anything like it in our training modules. Realism and simplicity, exactly what we needed.",
  name: "VP of Marketing, Millennium",
  context: "on The Broken Mile, VR fiber-optic training",
};

export interface FooterLink {
  label: string;
  value: string;
  href: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  {
    label: "LinkedIn",
    value: "in/neha-mayacharya",
    href: "https://linkedin.com/in/neha-mayacharya",
  },
  {
    label: "Behance",
    value: "nehamayacharya",
    href: "https://behance.net/nehamayacharya",
  },
  { label: "Résumé", value: "PDF download", href: "/resume.pdf" },
];
