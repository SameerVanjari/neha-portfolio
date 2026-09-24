/**
 * Feed the Children (AR Experience) case study.
 * Transcribed from Website Wireframes "Feed the Children (AR Experience)"
 * (node 153:217). All copy and visual specs are taken from the Figma design
 * only; image slots are reproduced exactly as the design's drop-zones.
 */

export const HERO = {
  eyebrow: "Feed the Children · WebAR · Nonprofit campaign",
  title: "Empty cabinets, full impact",
  subtitle:
    "A browser-based WebAR experience that makes childhood food insecurity visible, and drives donations. No app, no headset, just a phone.",
  role: "XR Designer · CXR Agency (Kinemeric)",
  roleNote: "Concept through final QA · 2022",
  cta: { label: "See it in action", href: "#action" },
  media: {
    pantry: {
      src: "/case/ftc/media/ar-pantry.jpg",
      alt: "WebAR food pantry cabinet placed in a room, stocked with canned food, seen through a phone",
    },
    handheld: {
      src: "/case/ftc/media/handheld-proof.webp",
      alt: "Three phones showing the donation page, the AR pantry and the campaign page in the mobile browser",
    },
  },
};

export const FACTS = [
  { icon: "icon-role", label: "Role", value: "XR Designer, concept to QA" },
  { icon: "icon-phone", label: "Platform", value: "WebAR · 8th Wall" },
  { icon: "icon-team", label: "Team", value: "Me, Asst. Creative Director, PM, 2 developers" },
  { icon: "icon-cube", label: "Craft", value: "3D in Vectary · Sound · Storyboarding" },
] as const;

export const BRIEF = {
  eyebrow: "The brief",
  heading: "A well-known cause, looking for a new way to be told",
  note: "Feed the Children wanted to bring AR into their next call for donations. Curious about XR but new to it, they partnered with our team to explore it.",
  cards: [
    {
      icon: "icon-heart",
      title: "Established client",
      body: "A recognized nonprofit, new to XR. It had to feel trustworthy, not gimmicky.",
    },
    {
      icon: "icon-qr",
      title: "No app required",
      body: "Works from a link or QR code, so any donor can open it instantly.",
    },
    {
      icon: "icon-bolt",
      title: "Beyond the mailer",
      body: "Replace the wait-and-see of direct mail with something donors interact with right away.",
    },
  ] as const,
};

export const WHAT_I_DID = {
  eyebrow: "What I did",
  heading: "I owned the experience, concept through final QA",
  note: "Working alongside an Assistant Creative Director, I made sure what shipped matched the idea.",
  steps: [
    { icon: "icon-sparkle", title: "Concept", body: "Co-developed the food-cabinet metaphor" },
    { icon: "icon-grid", title: "Storyboard", body: "Narrative beats and AR triggers, scene by scene" },
    { icon: "icon-sound", title: "Sound plan", body: "Ambient sound and voiceover cues" },
    { icon: "icon-cube-w", title: "3D assets", body: "Modeled and prepared in Vectary" },
    { icon: "icon-film", title: "Living photos", body: "Kids’ photos filmed to play like short videos" },
    { icon: "icon-check", title: "Test & QA", body: "Repeated rounds, notes fed back to devs" },
  ] as const,
  tiles: [
    { num: "5", label: "person team: me, an Asst. CD, a PM, and 2 developers", tone: "rust" },
    { num: "0", label: "apps to install: it runs in the phone’s browser", tone: "dark" },
    { num: "1", label: "QR scan or link to start giving", tone: "dark" },
  ] as const,
};

export const KEY_DECISIONS = {
  eyebrow: "Key decisions",
  heading: "Three calls that shaped the experience",
  items: [
    {
      icon: "icon-target",
      label: "Approach",
      title: "App-less WebAR with video inset",
      body: "Weighed several XR directions and chose WebAR over full 3D interactivity, to move fast without losing impact.",
    },
    {
      icon: "icon-cabinet",
      label: "Visual messaging",
      title: "Food cabinets, not a fridge",
      body: "Clear, on-brand and emotionally direct, without being exploitative.",
    },
    {
      icon: "icon-focus",
      label: "Staying focused",
      title: "No brand partnerships",
      body: "Set aside potential food-brand tie-ins to keep production fast and the message uncluttered.",
    },
  ] as const,
};

export const STORYBOARD = {
  eyebrow: "Concept & storyboarding",
  heading: "Scan to donate, scene by scene",
  note: "The full sequence was storyboarded before any 3D asset was built.",
  image: {
    src: "/case/ftc/media/storyboard-polished.webp",
    alt: "Eight-scene storyboard: scan the QR, photos appear on the cabinet, shelves open full then close empty, donation goal progress",
  },
  beats: [
    "Scan the QR code or open the link",
    "A surface fills with kids’ photos",
    "Shelves open full, then close empty",
    "Donation progress toward the goal",
  ] as const,
};

export const ENVIRONMENT = {
  eyebrow: "3D environment & assets",
  heading: "A kitchen that feels lived-in",
  image: {
    src: "/case/ftc/media/ar-kiosk.jpg",
    alt: "The closed 3D cupboard on its countertop, standing level in the donor's room with the donate sign",
  },
  cards: [
    {
      title: "Built from scratch",
      body: "Cupboard exteriors and interiors, a whiteboard and a countertop, with food cans animated in and out in step with the voiceover.",
      dark: false,
      icon: null,
    },
    {
      title: "Photos that come to life",
      body: "Each kid’s photo on the cabinet is a short video, so the child plays in place. A small touch that makes the space feel real.",
      dark: true,
      icon: "icon-film-lg",
    },
  ] as const,
};

export const TESTING = {
  eyebrow: "Interaction & testing",
  heading: "From full to empty, every beat had to land at once",
  note: "Voiceover, visuals and the food disappearing and reappearing were tested on the working build until the timing felt right.",
  captures: [
    {
      src: "/case/ftc/media/img-2140.webp",
      alt: "Test capture: the cabinet fully stocked, seen through the phone",
    },
    {
      src: "/case/ftc/media/img-2141.webp",
      alt: "Test capture: the closed cabinet with the tap-and-drag-to-move hint",
    },
    {
      src: "/case/ftc/media/img-2142.webp",
      alt: "Test capture: the cabinet shelves full from the front",
    },
    {
      src: "/case/ftc/media/img-2143.webp",
      alt: "Test capture: the cabinet left completely empty after the food disappears",
    },
  ] as const,
};

export const IN_ACTION = {
  eyebrow: "Seen in action",
  heading: "No app. No headset. Just a phone.",
  note: "Captured live on secure.feedthechildren.org, running in a mobile browser.",
  captures: [
    {
      src: "/case/ftc/media/donation-page.webp",
      alt: "The secure feedthechildren.org donation page reached from the AR experience, in the phone browser",
    },
    {
      src: "/case/ftc/media/handheld-proof.webp",
      alt: "The AR pantry and donation flow captured handheld in the mobile browser",
    },
  ] as const,
};

export const RESULTS = {
  eyebrow: "Results",
  heading: "Beyond wait-and-see",
  note: "Where a direct mailer meant waiting to see results, this campaign drove action almost immediately.",
  impact: [
    { title: "Hundreds", body: "of clickthroughs, almost immediately", tone: "rust" },
    { title: "Uptick", body: "A measurable rise in donations", tone: "dark" },
    { title: "New channel", body: "Running alongside direct mail", tone: "dark" },
  ] as const,
  quote: {
    lead: "Leaving an empty cabinet over a full one left users with a lasting reminder that food insecurity is a pressing issue that still plagues society.",
    follow:
      "Feed the Children was thrilled with how the experience told their story with a new level of realism.",
  },
  credit: "Client work for Feed the Children, delivered at CXR Agency (Kinemeric) with an Assistant Creative Director, a project manager and two developers. This page shows my role and contributions.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · AI · Mortgage lending",
    title: "Clarity",
    highlight: "AI guides. Humans decide.",
    href: "/projects/clarity",
    thumbBg: "#16262D",
    thumbFg: "#F2B872",
  },
  {
    direction: "Next · AR · Real estate",
    title: "Ascension Realty",
    highlight: "Walk through a building before it’s built",
    href: "/projects/ascension",
    thumbBg: "#15131F",
    thumbFg: "#B7A8F5",
  },
] as const;
