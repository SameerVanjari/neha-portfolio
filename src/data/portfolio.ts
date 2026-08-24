export interface Profile {
  name: string;
  tagline: string;
  roles: string[];
  bootLines: string[];
  bio: string;
  location: string;
  email: string;
  availability: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface Project {
  title: string;
  category: "AI" | "XR" | "UX";
  year: string;
  blurb: string;
  tags: string[];
  accent: "cyan" | "neon" | "volt" | "sigil";
}

export interface Capability {
  id: "AI" | "XR" | "UX";
  title: string;
  headline: string;
  points: string[];
}

export interface Social {
  label: string;
  handle: string;
  href: string;
}

export const profile: Profile = {
  name: "Neha",
  tagline: "Designing the interfaces of intelligent, immersive worlds.",
  roles: ["AI Designer", "XR Designer", "UX Designer"],
  bootLines: [
    "> init neha.design",
    "> loading neural core ......... OK",
    "> mounting spatial shader .... OK",
    "> calibrating human layer .... OK",
    "> entry unlocked.",
  ],
  bio: "I design where machine intelligence, spatial computing and human behaviour intersect. From conversational AI systems to hand-tracked XR flows and classic product interfaces — I prototype the future at the speed of now, and make sure people never get left behind by it.",
  location: "Bangalore, IN · Remote worldwide",
  email: "hello@neha.design",
  availability: "Open for select collaborations · Q4 2026",
};

export const stats: Stat[] = [
  { value: "07", suffix: "+", label: "Years in design" },
  { value: "40", suffix: "+", label: "Ships to production" },
  { value: "12", suffix: "", label: "XMR / spatial builds" },
  { value: "3", suffix: "", label: "Design awards" },
];

export const projects: Project[] = [
  {
    title: "Synapse Assistant",
    category: "AI",
    year: "2026",
    blurb:
      "A grounded multimodal AI copilot for enterprise workflows — intent trees, memory layers and voice-first UX.",
    tags: ["LLM UX", "Voice UI", "Design Systems"],
    accent: "cyan",
  },
  {
    title: "Aether Field",
    category: "XR",
    year: "2025",
    blurb:
      "Hand-tracked AR workspace that projects live 3D data into the room. Spatial gestures designed for 45-minute sessions.",
    tags: ["Unity", "Hand Tracking", "Spatial UI"],
    accent: "neon",
  },
  {
    title: "Pulse Bank App",
    category: "UX",
    year: "2025",
    blurb:
      "Fintech onboarding rebuild that lifted activation 31% through a friction-first audit and expressive motion system.",
    tags: ["Mobile", "Motion", "Research"],
    accent: "volt",
  },
  {
    title: "Orbit Design OS",
    category: "AI",
    year: "2024",
    blurb:
      "A token-powered design operating system that generates variant UIs from natural language briefs.",
    tags: ["GenAI", "Token Systems", "Tooling"],
    accent: "sigil",
  },
];

export const capabilities: Capability[] = [
  {
    id: "AI",
    title: "Artificial Intelligence",
    headline: "Make intelligence legible, trustworthy, and kind.",
    points: [
      "Conversational & agent UX",
      "Prompt & output design",
      "Model grounding & eval loops",
      "Human-in-the-loop systems",
    ],
  },
  {
    id: "XR",
    title: "Extended Reality",
    headline: "Spatial interfaces people can hold in their hands.",
    points: [
      "AR / VR / MR product design",
      "Hand & eye tracking ergonomics",
      "Spatial UI & environment design",
      "Prototyping in Unity & WebXR",
    ],
  },
  {
    id: "UX",
    title: "User Experience",
    headline: "Classic craft, sharpened by emergent tech.",
    points: [
      "End-to-end product strategy",
      "Design systems & tokens",
      "Usability research & testing",
      "Interaction & motion design",
    ],
  },
];

export const skills: string[] = [
  "FIGMA",
  "WEBXR",
  "THREE.JS",
  "PROMPT ENGINEERING",
  "UNITY",
  "SPATIAL UI",
  "DESIGN SYSTEMS",
  "MOTION",
  "USER RESEARCH",
  "GENERATIVE AI",
  "VOICE INTERFACES",
  "PROTOTYPING",
];

export const socials: Social[] = [
  { label: "linkedin", handle: "in/neha-design", href: "https://linkedin.com" },
  { label: "dribbble", handle: "@neha.design", href: "https://dribbble.com" },
  { label: "behance", handle: "@neha", href: "https://behance.net" },
  { label: "github", handle: "@neha-spatial", href: "https://github.com" },
  { label: "mail", handle: "hello@neha.design", href: "mailto:hello@neha.design" },
];
