/**
 * Made for Joy — batch 1 (first 10 image slots).
 * Copy + specs transcribed from the Figma design as-is.
 * Images are placeholder drop-zones only; no image assets referenced.
 */

export const HERO = {
  eyebrow: "Made for Joy · Immersive mindfulness in VR",
  title: "A mindfulness world where the world is the interface",
  subtitle:
    "Interaction design for an immersive VR mindfulness app, with visuals and guides approved by national wellness experts.",
  role: "Concept & Interaction Designer · CXR Agency (Kinemeric)",
  roleNote: "Full concept and investor demo reel",
  cta: "Play Video",
};

export const FACTS = [
  { icon: "icon-fact-role", label: "ROLE", value: "Concept generation & interaction design" },
  { icon: "icon-fact-pen", label: "COLLABORATOR", value: "Google Tilt Brush concept artist" },
  { icon: "icon-fact-film", label: "DELIVERABLE", value: "Full concept + investor demo reel" },
  { icon: "icon-fact-headset", label: "TOOLS", value: "Tilt Brush · Multibrush · Open Brush" },
] as const;

export const BRIEF = {
  eyebrow: "Background & challenge",
  heading: "Mindfulness in VR, without the psychedelic visuals",
  note: "Made for Joy wanted a calming, spatially intuitive world vetted by wellness experts, for first-timers and seasoned meditators alike.",
  briefCard: {
    eyebrow: "The brief",
    statement: "Create a joyful, intuitive, and accessible VR-based mindfulness journey.",
    collaborators: "Collaborators: VR artist · Creative Director · Strategist",
  },
  challenges: [
    "Avoid typical psychedelic or abstract visuals",
    "Intuitive for first-time users, novel for seasoned meditators",
    "Embed joy, trust, and harmony in every interaction",
    "Business viability without overwhelming users",
  ] as const,
};

export const ROLE = {
  eyebrow: "My role & contributions",
  heading: "I shaped how people move, feel, and interact in the world",
  note: "Merging interaction design with the client’s core values: joy, trust, and guided self-exploration.",
  steps: [
    { icon: "icon-step-sparkle", title: "Interaction concept", body: "Gaze, gesture and object triggers across the universe" },
    { icon: "icon-step-cube", title: "Spatial design", body: "Interaction logic layered over the VR artist’s 3D worlds" },
    { icon: "icon-step-pen", title: "Tilt Brush prototyping", body: "Full flow sketched, Tree of Life to multi-island journeys" },
    { icon: "icon-step-team", title: "Client alignment", body: "Every client meeting: business goals, usability, visual coherence" },
  ] as const,
  tiles: [
    { num: "4 islands", body: "Starting, Content, Personal and Community, each with its own job", tone: "teal" },
    { num: "3 inputs", body: "Gaze, hand gestures (yoga mudras) and objects replace 2D menus", tone: "dark" },
    { num: "0 flat menus", body: "The world itself became the interface", tone: "dark" },
  ] as const,
};

export const APPROACH = {
  eyebrow: "Design approach",
  heading: "Embodied interaction: the world is the UI",
  note: "My interaction sketches in Multibrush became the foundational reference for the dev pipeline.",
  cards: [
    { icon: "icon-eye-teal", title: "Gaze-based triggers", body: "Crystals unlock content when the user’s eyes settle and hold on them." },
    { icon: "icon-hand", title: "Hand gesture recognition", body: "Yoga mudras let the user talk directly with the concierge." },
    { icon: "icon-leaf", title: "Object-based storytelling", body: "Fruit tosses reveal portals and plant seeds of intention." },
  ] as const,
  storyboardEyebrow: "Concept storyboard · gaze interaction",
  boards: [
    {
      src: "/case/joy/gaze-1.webp",
      alt: "Concept storyboard frame 1: a gaze-interaction trigger in the Made for Joy mindfulness world",
    },
    {
      src: "/case/joy/gaze-2.webp",
      alt: "Concept storyboard frame 2: a gaze-interaction trigger in the Made for Joy mindfulness world",
    },
    {
      src: "/case/joy/gaze-3.webp",
      alt: "Concept storyboard frame 3: a gaze-interaction trigger in the Made for Joy mindfulness world",
    },
  ] as const,
};

export const PHILOSOPHY = {
  eyebrow: "World philosophy",
  heading: "Three values behind every interaction",
  principle: "“Interaction is the new narrative.”",
  values: [
    {
      icon: "icon-heart-blue",
      title: "Joy",
      body: "Every interaction sparks delight, not just function: a crystal lighting up, a fruit revealing a portal.",
      tile: "rgba(74,144,226,0.14)",
    },
    {
      icon: "icon-eye-amber",
      title: "Intuition",
      body: "Gaze, gesture, and touch replace 2D menus. The interface disappears and the world becomes the UI.",
      tile: "rgba(240,160,48,0.14)",
    },
    {
      icon: "icon-sparkle-green",
      title: "Emotional engagement",
      body: "Pacing, sound, and visual rhythm guide the user’s emotional state, not just task completion.",
      tile: "rgba(47,180,110,0.14)",
    },
  ] as const,
  treeEyebrow: "The Tree of Life · entering the Made for Joy universe",
  treeImage: {
    src: "/case/joy/tree-of-life.webp",
    alt: "The Tree of Life at the center of the Made for Joy universe",
  },
};

export const ISLANDS_HEAD = {
  eyebrow: "The four islands",
  heading: "One universe, four islands, each with one job",
  note: "Each island replaces a screen you would expect in a flat app.",
};

export const STARTING_ISLAND = {
  eyebrow: "01 · STARTING ISLAND",
  title: "Onboarding & core interactions",
  desc: "A progressive tutorial that teaches the whole interaction language in one guided sequence.",
  features: [
    "Teleportation: shimmering VFX mark teleport points",
    "Grabbing: focus items glow to guide grip and stack",
    "Fruit trigger: toss a fruit to reveal the next portal",
    "Gaze focus: a held gaze fills a ring and unlocks info",
  ] as const,
  boards: [
    { src: "/case/joy/onboarding-1.webp", alt: "Starting island onboarding storyboard frame 1" },
    { src: "/case/joy/onboarding-2.webp", alt: "Starting island onboarding storyboard frame 2" },
    { src: "/case/joy/onboarding-3.webp", alt: "Starting island onboarding storyboard frame 3" },
  ] as const,
};

export const CONTENT_ISLAND = {
  eyebrow: "02 · CONTENT ISLAND",
  title: "Content discovery",
  desc: "A living, spatial catalogue replaces the flat 2D menu.",
  features: [
    "Concierge answers yoga-mudra gestures; the terminal opens the full catalogue",
    "“Seeds of Joy”: color-coded trees and fruits organize content",
  ] as const,
  boards: [
    { src: "/case/joy/content-1.webp", alt: "Content island storyboard frame 1" },
    { src: "/case/joy/content-2.webp", alt: "Content island storyboard frame 2" },
    { src: "/case/joy/content-3.webp", alt: "Content island storyboard frame 3" },
  ] as const,
};

export const PERSONAL_ISLAND = {
  eyebrow: "03 · PERSONAL ISLAND",
  title: "Your home base",
  desc: "Progress, profile, and personal growth made visible.",
  features: [
    "A large crystal projects featured content, events and profile",
    "Planting earned objects grows flowers: progress you can see",
    "A default avatar transforms live as you customize it",
  ] as const,
  boards: [
    { src: "/case/joy/personal-1.webp", alt: "Personal island storyboard frame 1" },
    { src: "/case/joy/personal-2.webp", alt: "Personal island storyboard frame 2" },
    { src: "/case/joy/personal-3.webp", alt: "Personal island storyboard frame 3" },
  ] as const,
};

export const COMMUNITY_ISLAND = {
  eyebrow: "04 · COMMUNITY ISLAND",
  title: "Community & business model",
  desc: "Connection and monetization, without overwhelming the user.",
  features: [
    "Multiplayer: start, join a private session, or enter an open one",
    "Monthly, annual and lifetime plans unlock after a free limit; a crown marks subscribers",
  ] as const,
  boards: [
    { src: "/case/joy/community.webp", alt: "Community island storyboard: multiplayer sessions in the Made for Joy world" },
  ] as const,
};

export const OUTCOME = {
  eyebrow: "Outcome",
  heading: "From concept to fundraising",
  statement:
    "With a full concept in hand, the Made for Joy team moved into fundraising while preparing for a full build. Armed with detailed concept art and an immersive demo reel, the idea was well received by investors and potential users alike.",
  tiles: [
    { num: "Full concept", body: "Delivered end to end, ready for a full build" },
    { num: "Demo reel", body: "An immersive reel for investor pitches" },
    { num: "Fundraising", body: "The client moved straight into raising for the build" },
  ] as const,
  inEngineEyebrow: "Concept realized · in-engine build",
  inEngineBoards: [
    { src: "/case/joy/in-engine-1.webp", alt: "In-engine build capture 1 from the Made for Joy world" },
    { src: "/case/joy/in-engine-2.webp", alt: "In-engine build capture 2 from the Made for Joy world" },
  ] as const,
  credit:
    "Client work for Made for Joy, delivered at CXR Agency (Kinemeric) with a Google Tilt Brush concept artist. This page shows my role and contributions.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · AR · Real estate",
    title: "Ascension Realty",
    highlight: "Walk through a building before it’s built",
    href: "/projects/ascension",
    thumbBg: "#15131F",
    thumbFg: "#B7A8F5",
  },
  {
    direction: "Next · AR · Social campaign",
    title: "Charm City Kings",
    highlight: "They call me…",
    href: "/projects/hbo-charm-city-kings",
    thumbBg: "#17101A",
    thumbFg: "#FF8FB8",
  },
] as const;
