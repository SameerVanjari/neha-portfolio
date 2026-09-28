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
