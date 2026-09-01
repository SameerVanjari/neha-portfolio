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
  dimension: "PRODUCT" | "UX" | "XR" | "AI";
  year: string;
  blurb: string;
  details: {
    challenge: string;
    approach: string;
    result: string;
  };
  tags: string[];
  accent: "cyan" | "sky" | "neon" | "volt" | "sigil";
}

export const PROJECT_COLORS: Record<Project["accent"], string> = {
  cyan: "#00e5ff",
  sky: "#38bdf8",
  neon: "#ff2bd6",
  volt: "#ffc94d",
  sigil: "#8b5cff",
};

export interface Dimension {
  id: "PRODUCT" | "UX" | "XR" | "AI";
  color: string;
  glow: string;
  text: string;
  ring: string;
  headline: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
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
  name: "NEHA",
  tagline:
    "I design the interfaces where intelligent systems and human needs meet — across every reality.",
  roles: ["AI Experience Designer", "XR Designer", "UX Designer", "Product Designer"],
  bootLines: [
    "> entering perception space ........",
    "> syncing neural core .............. OK",
    "> a bird will guide you ............",
    "> journey begins.",
  ],
  bio: "Neha is an AI, XR and UX designer who believes intelligence should feel less like a machine and more like a kind companion. She crafts spatial worlds, conversational minds and product surfaces where technology disappears and understanding arrives.",
  location: "Bangalore, IN · Remote worldwide",
  email: "hello@neha.design",
  availability: "Open for select collaborations",
};

export const openingStatement = {
  pre: "Designing the",
  italic: "intelligent",
  post: "interface.",
  kicker: "AI EXPERIENCE DESIGNER",
  meta: "XR · AI · UX · PRODUCT DESIGN",
  description:
    "An interactive journey through the mind of a designer who builds where intelligent systems meet human needs — across screens, spaces and realities.",
};

export const identityStatement = {
  label: "WHO I AM",
  line: "Every interface I build begins with a question: what does it feel like to be understood by a machine?",
  name: "NEHA",
};

export const perceptionStatement = {
  label: "ENTER PERCEPTION",
  line: "Follow how I see the world.",
  detail: "From product pixels to spatial worlds to thinking machines — the same curiosity runs through all of it.",
};

export const arrivalStatement = {
  label: "ARRIVAL",
  line: "Welcome to the place where the work lives.",
  detail: "This platform is my portfolio — a calm clearing after the journey through perception.",
};

export const milestones: Milestone[] = [
  {
    year: "2017",
    title: "Product Design",
    description: "Learned that good design is invisible — first shipped products, first user interviews.",
  },
  {
    year: "2020",
    title: "Immersive Design",
    description: "Moved into AR/VR — discovered that depth changes the meaning of every pixel.",
  },
  {
    year: "2023",
    title: "AI Exploration",
    description: "Started designing with — not just for — intelligent systems. Prototyped early LLM products.",
  },
  {
    year: "NOW",
    title: "Sentient Design",
    description: "Blending all three: product craft, spatial intuition and machine intelligence.",
  },
];

export const dimensions: Dimension[] = [
  {
    id: "PRODUCT",
    color: "#00e5ff",
    glow: "rgba(0,229,255,0.5)",
    text: "text-cyber",
    ring: "from-cyber/60 to-cyber/5",
    headline: "Products people trust",
    description: "End-to-end product design — strategy, systems, shipping.",
  },
  {
    id: "UX",
    color: "#ffc94d",
    glow: "rgba(255,201,77,0.5)",
    text: "text-volt",
    ring: "from-volt/60 to-volt/5",
    headline: "Experiences that flow",
    description: "Research-driven interfaces that vanish into the task.",
  },
  {
    id: "XR",
    color: "#ff2bd6",
    glow: "rgba(255,43,214,0.5)",
    text: "text-neon",
    ring: "from-neon/60 to-neon/5",
    headline: "Worlds you can enter",
    description: "Spatial interfaces, hand-tracked flows, immersive environments.",
  },
  {
    id: "AI",
    color: "#8b5cff",
    glow: "rgba(139,92,255,0.55)",
    text: "text-sigil",
    ring: "from-sigil/60 to-sigil/5",
    headline: "Intelligence made kind",
    description: "Conversational agents, generative systems, trust-first AI UX.",
  },
];

export const eyeStatement = {
  label: "THE SENTIENT EYE",
  line: "Perception becomes intelligence.",
  detail: "Eye → perception → intelligence → design.",
};

export const logoStatement = {
  label: "IDENTITY",
  line: "Designing",
  line2: "intelligent experiences",
  line3: "across realities.",
  kicker: "AI EXPERIENCE DESIGNER",
  meta: "XR · AI · UX · PRODUCT DESIGN",
  cta: "Explore the work",
};

export const stats: Stat[] = [
  { value: "07", suffix: "+", label: "Years in design" },
  { value: "40", suffix: "+", label: "Ships to production" },
  { value: "12", suffix: "", label: "Immersive builds" },
  { value: "03", suffix: "", label: "Design awards" },
];

export const projects: Project[] = [
  {
    title: "Synapse Assistant",
    dimension: "AI",
    year: "2026",
    blurb:
      "A grounded multimodal AI copilot for enterprise workflows — intent trees, memory layers and voice-first UX.",
    details: {
      challenge:
        "Enterprise teams juggle fragmented tools and lose context across tasks. Existing AI copilots hallucinate, lack memory, and fail at multi-step workflows.",
      approach:
        "Designed a grounded multimodal copilot with intent trees for branching logic, persistent memory layers, and voice-first interaction. Every response is anchored to verified data sources.",
      result:
        "Reduced task-switching friction by 40% in pilot testing. Teams reported higher trust in AI-generated outputs and faster completion of complex multi-step workflows.",
    },
    tags: ["LLM UX", "Voice UI", "Design Systems"],
    accent: "sigil",
  },
  {
    title: "Aether Field",
    dimension: "XR",
    year: "2025",
    blurb:
      "Hand-tracked AR workspace that projects live 3D data into the room. Spatial gestures designed for 45-minute sessions.",
    details: {
      challenge:
        "Data analysts lose insight when working with flat dashboards. Spatial data has depth, relationships, and patterns that screens compress into 2D.",
      approach:
        "Built a hand-tracked AR workspace where live data projects into the room. Designed spatial gestures calibrated for sustained 45-minute sessions without fatigue. Data points sit in physical space, letting analysts walk around datasets.",
      result:
        "User testing showed 28% faster pattern recognition compared to screen-based dashboards. Analysts described it as 'walking through the data' — a fundamentally different way to understand information.",
    },
    tags: ["Unity", "Hand Tracking", "Spatial UI"],
    accent: "neon",
  },
  {
    title: "Pulse Bank",
    dimension: "UX",
    year: "2025",
    blurb:
      "Fintech onboarding rebuild that lifted activation 31% through a friction-first audit and expressive motion system.",
    details: {
      challenge:
        "Pulse Bank's onboarding had a 68% drop-off rate. Users felt lost, overwhelmed, and distrustful during the identity verification and account setup flow.",
      approach:
        "Conducted a friction-first audit to map every decision point. Rebuilt the flow with progressive disclosure, expressive motion feedback for progress, and micro-interactions that rewarded completion.",
      result:
        "Activation rate jumped from 32% to 63%. Time-to-first-transaction dropped by half. The motion system became a case study in how animation builds trust in fintech.",
    },
    tags: ["Mobile", "Motion", "Research"],
    accent: "volt",
  },
  {
    title: "Orbit OS",
    dimension: "PRODUCT",
    year: "2024",
    blurb:
      "A token-powered design operating system that generates variant UIs from natural language briefs.",
    details: {
      challenge:
        "Design teams spend weeks producing UI variants for A/B testing and localization. Each variant requires manual adaptation of layout, spacing, and component composition.",
      approach:
        "Created a token-powered design OS where natural language briefs generate variant UIs. Design tokens act as the control layer — describing intent while the system handles spatial composition and component adaptation.",
      result:
        "Cut variant production from weeks to hours. Teams shipped 3x more variants in the same timeframe, enabling rapid experimentation across markets and user segments.",
    },
    tags: ["GenAI", "Token Systems", "Tooling"],
    accent: "cyan",
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
