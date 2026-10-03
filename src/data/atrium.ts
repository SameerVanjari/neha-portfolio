/**
 * Atrium (NDA) case study — content transcribed from Figma
 * "Website Wireframes" → "Atrium (NDA) — Case study (1440)" (node 418:217).
 *
 * The Figma frame is a 1440px desktop layout with 202px gutters, so the
 * content column is 1036px wide. This is an NDA case: the hero image slot,
 * facts "VISUALS" and the NDA note card carry the confidentiality framing
 * exactly as designed. When the hero export arrives it drops into the hero
 * slot; nothing else has to move.
 *
 * Palette sampled off the same frame: cool paper #f2f5f6, abyss ink #070c12,
 * ink #0b141b, muted #56656e, and the teal family #1f8a87 / #5fd3cf / #7fd8d3.
 */

export const HERO = {
  eyebrow: "XR · INTERACTION DESIGN",
  title: "Atrium",
  subtitle: "Social VR workspace for distributed teams",
  role: "Lead Immersive Experience Designer · CXR Agency (Kinemeric)",
  roleNote: "Multi-user VR collaboration platform for a large public-sector organization",
  ndaPill: "NDA · CONFIDENTIAL",
  /** Image slot: hero export drops in as `/case/atrium/hero.jpg`. */
  figure: "atrium-hero.jpg",
} as const;

export const FACTS = [
  { label: "Role", value: "Lead Immersive Experience Designer", icon: "a-icon-role" },
  { label: "Client", value: "Large public-sector organization (NDA)", icon: "a-icon-client" },
  { label: "Platform", value: "PICO 4 VR, plus a companion mobile app", icon: "a-icon-headset" },
  { label: "Visuals", value: "Withheld for client confidentiality", icon: "a-lock-facts" },
] as const;

export const OVERVIEW = {
  eyebrow: "Overview",
  heading: "One platform, four kinds of space, two devices",
  summaryLead:
    "I designed the end-to-end interaction experience for a multi-user VR collaboration platform, delivered on PICO 4 with a companion mobile app.",
  summaryBody:
    "My work covered the whole experience: who it was for, how people move between spaces, how they use their hands, what they hear, and which jobs belong in the headset versus on the phone. I authored the full interaction design specification that guided the design and development teams.",
  ndaLabel: "UNDER NDA",
  ndaLead: "Visuals are not shown due to client confidentiality.",
  ndaBody: "Happy to walk through my process, decisions and artifacts in conversation.",
} as const;

export const PROCESS = {
  eyebrow: "What I did",
  heading: "From people to a specification the whole team built from",
  steps: [
    {
      num: "STEP 1",
      title: "Personas",
      body: "Who uses it, and in which roles",
      icon: "a-icon-users",
      dark: false,
    },
    {
      num: "STEP 2",
      title: "Experience maps",
      body: "A working day, before and inside VR",
      icon: "a-icon-map",
      dark: false,
    },
    {
      num: "STEP 3",
      title: "User flows",
      body: "Moving between every space",
      icon: "a-icon-flow",
      dark: false,
    },
    {
      num: "STEP 4",
      title: "Interaction system",
      body: "Hand gestures and controllers",
      icon: "a-icon-hand",
      dark: false,
    },
    {
      num: "STEP 5",
      title: "Prototype",
      body: "Key spaces built in ShapesXR",
      icon: "a-icon-cube",
      dark: false,
    },
    {
      num: "STEP 6",
      title: "Specification",
      body: "The full interaction design spec",
      icon: "a-icon-doc",
      dark: true,
    },
  ],
} as const;

export const SPACES = {
  eyebrow: "Spatial structure",
  heading: "A shared hub, with rooms for every kind of work",
  note: "I mapped user flows across four kinds of space, so people always know where they are and how to get back.",
  hub: {
    title: "Shared common space",
    body: "Where everyone arrives. Find colleagues, see what’s happening, and head to a room.",
    icon: "a-icon-users-teal",
  },
  rooms: [
    {
      title: "Themed meeting rooms",
      body: "Live meetings, whiteboarding and screen sharing.",
      icon: "a-icon-chat",
    },
    {
      title: "Private offices",
      body: "Personal space for focused or one-to-one work.",
      icon: "a-icon-headset",
    },
    {
      title: "The lab",
      body: "Hands-on space for exploring and building together.",
      icon: "a-icon-cube-teal",
    },
  ],
} as const;

export const DEVICES = {
  eyebrow: "Two devices, one experience",
  heading: "What belongs in the headset, and what belongs on the phone",
  note: "I decided which jobs each device should own, so neither tried to do everything.",
  mobile: {
    title: "Companion mobile app",
    sub: "Before and after the meeting",
    icon: "a-icon-phone",
    items: ["Scheduling", "Profiles", "Recordings"],
  },
  vr: {
    title: "PICO 4 VR",
    sub: "Being there, together",
    icon: "a-icon-headset",
    items: ["Live meetings", "Whiteboarding", "Screen sharing"],
  },
} as const;

export const SYSTEM = {
  eyebrow: "Interaction system",
  heading: "Hands, controllers, interface and sound, designed as one system",
  cards: [
    {
      title: "Hand-gesture interactions",
      body: "A gesture set people can use without controllers, for natural, low-effort collaboration.",
      icon: "a-icon-hand-outline",
    },
    {
      title: "Controller interactions",
      body: "A matching controller mapping, so every action works whichever input someone prefers.",
      icon: "a-icon-ctrl",
    },
    {
      title: "Interaction library & UI guidelines",
      body: "Reusable patterns and rules for spatial UI, keeping every space consistent.",
      icon: "a-icon-grid",
    },
    {
      title: "Sound design",
      body: "Audio that signals presence, feedback and movement between spaces.",
      icon: "a-icon-sound",
    },
  ],
} as const;

export const DELIVERABLES = {
  eyebrow: "Deliverables",
  heading: "The documents and prototypes behind the build",
  chips: [
    { label: "User personas", lead: false },
    { label: "Experience maps", lead: false },
    { label: "User flows across all spaces", lead: false },
    { label: "Hand-gesture system", lead: false },
    { label: "Controller mapping", lead: false },
    { label: "Interaction library", lead: false },
    { label: "UI guidelines", lead: false },
    { label: "Sound design", lead: false },
    { label: "Mobile vs VR feature split", lead: false },
    { label: "ShapesXR prototypes", lead: false },
    { label: "Interaction design specification", lead: true },
  ],
  ctaTitle: "Want the full story?",
  ctaBody: "I’m happy to walk through my process, decisions and artifacts in conversation.",
  ctaButton: "Get in touch",
  note: "Client work for a large public-sector organization, delivered at CXR Agency (Kinemeric) under NDA. Client name and visuals are withheld. This page shows my role and contributions.",
} as const;

export const MORE_PROJECTS = {
  label: "MORE PROJECTS",
  allWork: "All work",
  cards: [
    {
      href: "/projects/focus",
      kicker: "Previous · UX · Attention & wellbeing",
      title: "Focus",
      body: "Hold the boundaries you set",
      thumbBg: "#15201a",
      thumbLabel: "#d9a441",
    },
    {
      href: "/projects/inspirit-physics",
      kicker: "Next · VR · Education",
      title: "Inspirit VR Physics",
      body: "A sci-fi carnival where physics is something you do",
      thumbBg: "#232325",
      thumbLabel: "#f5b21b",
    },
  ],
} as const;
