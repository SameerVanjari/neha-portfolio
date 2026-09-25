/**
 * TD Bank One Vanderbilt (AR Experience) — transcribed from Website
 * Wireframes node 159:217. Copy and layout specs are from Figma as-is.
 */

const C = "/case/td";

export const HERO = {
  eyebrowLead: "TD Bank",
  eyebrowRest: " · One Vanderbilt · WebAR",
  title: "A cardboard skyscraper that comes alive in AR",
  subtitle:
    "People build One Vanderbilt with their own hands, point a phone at it, and watch the tower celebrate in TD green.",
  role: "XR Designer",
  roleAgency: " · CXR Agency (Kinemeric)",
  roleNote: "The only XR designer, with a Creative Director and 2–3 developers",
  cta: "Play Video",
  phone: {
    src: `${C}/hero-crown-light.webp`,
    alt: "Phone view of the cardboard tower lit with the green TD crown light",
    note: "01-hero-crown-light.png",
  },
};

export const FACTS = [
  { icon: "icon-fact-role", label: "ROLE", value: "XR designer" },
  { icon: "icon-fact-team", label: "TEAM", value: "Creative Director + 2–3 developers" },
  { icon: "icon-fact-phone", label: "PLATFORM", value: "WebAR on 8th Wall, in the phone’s browser" },
  { icon: "icon-fact-box", label: "PHYSICAL PIECE", value: "Fold-it-yourself cardboard One Vanderbilt" },
] as const;

export const IDEA = {
  eyebrow: "The idea",
  heading: "A tower you build, then bring to life",
  note: "The client’s idea: a cardboard One Vanderbilt that people fold together. Once it stands, a phone camera turns it into the stage for a TD Bank celebration.",
  beats: [
    {
      icon: "icon-fold",
      num: "01",
      title: "Fold",
      body: "Assemble the printed cardboard net into the tower.",
      tone: "light" as const,
    },
    {
      icon: "icon-scan",
      num: "02",
      title: "Scan",
      body: "Point a phone at the black geometric patterns.",
      tone: "light" as const,
    },
    {
      icon: "icon-sparkle-white",
      num: "03",
      title: "Celebrate",
      body: "A blimp, a taxi, fireworks and a green crown light appear.",
      tone: "green" as const,
    },
  ] as const,
  prototype: {
    src: `${C}/cardboard-prototype.webp`,
    alt: "Client prototype of the cardboard One Vanderbilt tower",
    note: "02-cardboard-prototype.png",
    caption:
      "Client prototype. The patterns on the crown activate the experience and anchor the green TD light on top.",
  },
};

export const ROLE = {
  eyebrow: "What I did",
  heading: "Everything that made the paper tower feel like TD Bank",
  note: "As the only XR designer, I owned the branded layer and worked with the developers until it ran right on the cardboard.",
  steps: [
    { icon: "icon-step-blimp", title: "Branded 3D assets", body: "The TD blimp, the NYC taxi and other branded pieces" },
    { icon: "icon-step-light", title: "Crown light", body: "Used the top patterns to place the green TD light" },
    { icon: "icon-step-sparkle", title: "Firework celebration", body: "Animated in After Effects, exported as a spritesheet" },
    { icon: "icon-step-sync", title: "Developer sync", body: "Worked with the devs until tracking and effects ran as intended" },
  ] as const,
  tiles: [
    { num: "0 apps", body: "It opens from a web link, in the phone’s browser", tone: "green" as const },
    { num: "3 beats", body: "Fold, scan, celebrate: one physical-to-digital story", tone: "dark" as const },
    { num: "1 handoff", body: "Effects delivered ready to code, as a spritesheet", tone: "dark" as const },
  ] as const,
};

export const ACTIVATION = {
  eyebrow: "Activation",
  heading: "Patterns that start the show",
  note: "The black geometric patterns printed on the model are the image target and plane tracker, so the AR locks onto the tower itself.",
  phones: [
    {
      src: `${C}/prompt-point.webp`,
      alt: "Phone prompt asking people to point at the marker",
      note: "03-prompt-point-at-marker.png",
      caption: "1 · A prompt asks people to point at the marker",
    },
    {
      src: `${C}/tracking-lock.webp`,
      alt: "Tracking locked with the tower base lit in TD green",
      note: "04-tracking-lock.png",
      caption: "2 · Tracking locks and the base lights up",
    },
  ] as const,
  notes: [
    {
      num: "1",
      title: "Guided start",
      body: "A prompt asks people to point their phone at the marker.",
    },
    {
      num: "2",
      title: "Tracking lock",
      body: "Once found, TD green appears on the base of the tower.",
    },
    {
      num: "3",
      title: "Crown light",
      body: "I used the top patterns to place the green light plane, recreating the TD Bank light on the crown.",
    },
  ] as const,
};

export const BRANDED = {
  eyebrow: "Branded assets",
  heading: "Turning a paper model into a TD Bank scene in New York",
  cards: [
    {
      icon: "icon-sparkle-green",
      title: "TD blimp",
      body: "Floats alongside the tower, carrying the TD logo at eye level with the crown.",
    },
    {
      icon: "icon-box-green",
      title: "NYC taxi",
      body: "Drives along the street-map base, grounding the model in the city.",
    },
  ] as const,
  phones: [
    {
      src: `${C}/td-blimp.webp`,
      alt: "The TD blimp floating beside the cardboard tower",
      note: "05-td-blimp.png",
      caption: "The TD blimp beside the tower",
    },
    {
      src: `${C}/nyc-taxi.webp`,
      alt: "The NYC taxi on the street-map base",
      note: "06-nyc-taxi.png",
      caption: "The taxi on the street-map base",
    },
  ] as const,
};

export const CELEBRATION = {
  eyebrow: "The payoff",
  heading: "A celebration, built with the developers",
  note: "The fireworks burst over the tower once the scene is complete. I made them and handed them over ready to code.",
  pipeline: [
    { icon: "icon-pipe-sparkle", title: "Animate", body: "Firework bursts built in After Effects" },
    { icon: "icon-arrow", title: "", body: "", arrow: true as const },
    { icon: "icon-pipe-film", title: "Export", body: "Rendered out as a spritesheet" },
    { icon: "icon-arrow", title: "", body: "", arrow: true as const },
    { icon: "icon-pipe-code", title: "Hand off", body: "Delivered to developers to code in" },
    { icon: "icon-arrow", title: "", body: "", arrow: true as const },
    { icon: "icon-pipe-play", title: "Play", body: "Bursts fill the sky above the tower", last: true as const },
  ] as const,
  shots: [
    {
      src: `${C}/fireworks.webp`,
      alt: "Fireworks bursting over the blimp and tower",
      note: "07-fireworks.png",
      caption: "Fireworks over the blimp and tower",
    },
    {
      src: `${C}/fireworks-settle.webp`,
      alt: "Firework bursts fading as the scene settles",
      note: "08-fireworks-settle.png",
      caption: "Bursts fading as the scene settles",
    },
  ] as const,
  notes: [
    {
      num: "1",
      title: "Developer sync",
      body: "I worked with the developers to get the tracking, branded assets and celebration effects running right on the cardboard tower.",
    },
    {
      num: "2",
      title: "No app to install",
      body: "The finished experience opens from a web link in the phone’s browser.",
    },
  ] as const,
};

export const TAKEAWAYS = {
  eyebrow: "What this project shows",
  heading: "Designing where the physical and digital meet",
  cards: [
    {
      icon: "icon-take-box",
      title: "Physical-to-digital design",
      body: "A printed object became the trigger, the anchor and the stage for AR.",
      tone: "green" as const,
    },
    {
      icon: "icon-take-grid",
      title: "Brand in 3D space",
      body: "TD green, the blimp and the taxi turned a paper model into a TD Bank scene.",
      tone: "dark" as const,
    },
    {
      icon: "icon-take-light",
      title: "Production-ready handoff",
      body: "Effects delivered as spritesheets, then tuned with developers on the real build.",
      tone: "dark" as const,
    },
  ] as const,
  credit:
    "Client work for TD Bank, delivered at CXR Agency (Kinemeric). I was the only XR designer, working alongside a Creative Director and 2–3 developers. This page shows my role and contributions.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · AR · Social campaign",
    title: "Charm City Kings",
    highlight: "They call me…",
    href: "/projects/hbo-charm-city-kings",
    thumbBg: "#17101A",
    thumbFg: "#FF8FB8",
  },
  {
    direction: "Next · Mobile web · Game",
    title: "Modelo × Seattle Kraken",
    highlight: "The Skate Challenge",
    href: "/projects",
    thumbBg: "#18201B",
    thumbFg: "#7FDB8F",
  },
] as const;
