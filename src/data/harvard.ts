/**
 * Harvard MedTech (VR for healthcare) — transcribed from Website Wireframes
 * node 196:217. Copy and layout specs are from Figma as-is. Image slots are
 * drop-zones: the Figma file holds placeholder frames, no image fills.
 */

export const HERO = {
  eyebrowLead: "Harvard MedTech",
  eyebrowRest: " · VR for healthcare",
  title: "Immersive Meditation Universe",
  subtitle:
    "A home-based VR therapy experience for people living with chronic pain and stress, designed to work on the very first try.",
  role: "Lead Immersive Experience Designer",
  roleAgency: " · CXR Agency (Kinemeric)",
  roleNote: "Ideation to tested build · 2022",
  cta: "Step inside",
  coverNote: "hb-01-cover-tropical.png (right side, full height)",
};

export const FACTS = [
  { icon: "icon-fact-role", label: "ROLE", value: "Lead Immersive Experience Designer" },
  { icon: "icon-fact-client", label: "CLIENT", value: "Harvard MedTech" },
  { icon: "icon-fact-headset", label: "PLATFORM", value: "VR headset · Unity" },
  { icon: "icon-fact-team", label: "TEAM", value: "CD, 5 3D artists, 4–5 devs, PM, QA, UI/UX" },
] as const;

export const BRIEF = {
  eyebrow: "The brief",
  heading: "A scalable, home-based VR program for chronic pain and stress",
  context:
    "Harvard MedTech had a strong concept: a meditative experience that could walk even complete novices into a calmer state, and eventually sit alongside medicine in a treatment plan. Our job was to turn it into a full experience, deployable to a headset in a patient’s home.",
  roleLabel: "MY ROLE",
  roleBody:
    "I led the experience design end to end, and kept the 3D, development, product and QA teams building the same vision.",
};

export const CHALLENGE = {
  eyebrow: "The challenge",
  heading: "Designing for someone who has never worn a headset",
  cards: [
    {
      icon: "icon-access",
      num: "01",
      title: "Accessibility first",
      body: "Likely new to VR and possibly physically limited. A shallow learning curve, and it had to work seated.",
    },
    {
      icon: "icon-eye",
      num: "02",
      title: "An interface you barely notice",
      body: "Controls had to be simple yet move people between worlds, with controllers minimal or gone.",
    },
    {
      icon: "icon-shuffle",
      num: "03",
      title: "A concept still taking shape",
      body: "The client refined details mid-build, so every stage had to stay flexible enough to change scope.",
    },
  ] as const,
  questionLabel: "The design question",
  questionLead: "How might we guide a first-time user into deep calm, ",
  questionAccent: "with nothing to learn",
};

export const TEAMWORK = {
  eyebrow: "How I worked",
  heading: "One vision, carried across every team",
  note: "I was the connecting point between the Creative Director and six groups building the experience.",
  rows: [
    [
      {
        icon: "icon-star",
        title: "Creative Director",
        body: "Built the vision together. I brought the ideation and design documents for his approval.",
      },
      {
        icon: "icon-cube",
        title: "3D artists · 5",
        body: "Presented what we were building, supplied every reference, and synced on asset quality.",
      },
      {
        icon: "icon-code",
        title: "Developers · 4–5",
        body: "Handed over storyboards, tested each build, fed back fixes, and tuned spatial sound together.",
      },
    ],
    [
      {
        icon: "icon-clip",
        title: "Product manager",
        body: "Shared regular updates, and together we found the voice artist for the meditation guide.",
      },
      {
        icon: "icon-check",
        title: "QA",
        body: "Shared issues and fixes so each build moved forward cleanly.",
      },
      {
        icon: "icon-layout",
        title: "UI/UX team",
        body: "Shaped the UX together. I designed the iconography, 3D icons and 3D UI myself in Vectary.",
      },
    ],
  ] as const,
};

export const STAGES = {
  eyebrow: "My contribution",
  heading: "From first idea to tested build",
  steps: [
    { icon: "icon-step-sparkle", stage: "STAGE 1", title: "Vision & scope", body: "Ideation, mood boards, spatial design, client calls" },
    { icon: "icon-step-grid", stage: "STAGE 2", title: "Storyboards & docs", body: "Detailed storyboards and design documents for the team" },
    { icon: "icon-step-layout", stage: "STAGE 3", title: "UX & 3D UI", body: "3D UI prototypes and icons for three worlds" },
    { icon: "icon-step-wind", stage: "STAGE 4", title: "Worlds & breath", body: "Asset quality with the 3D team; the breathing particle system" },
    { icon: "icon-step-sound", stage: "STAGE 5", title: "Sound & testing", body: "Spatial sound with developers; testing at every stage" },
  ] as const,
  tiles: [
    { num: "25%", body: "increase in therapy module adoption", tone: "sage" as const },
    { num: "3 home worlds", body: "Log Cabin, Crystal Bay Beach and Zen Garden", tone: "dark" as const },
    { num: "0 controllers", body: "to learn: gaze and breath do the work", tone: "dark" as const },
  ] as const,
};

export const DOCS = {
  eyebrow: "Research & documentation",
  heading: "From mood board to design document",
  panels: [
    { note: "hb-02-moodboard.png", caption: "Mood boards set the look and feel of each world" },
    { note: "hb-03-design-doc.png", caption: "Design documents showed the whole team how it would look and work" },
  ] as const,
};

export const STORYBOARDS = {
  eyebrow: "Storyboards",
  heading: "Storyboarded before it was built",
  note: "Plan views and perspectives for every world, handed to developers as the build reference.",
  rows: [
    [
      { note: "hb-04-sb-coastal-plan.png", caption: "Coastal retreat · plan view" },
      { note: "hb-05-sb-forest-cabin.png", caption: "Forest cabin" },
      { note: "hb-06-sb-forest-plan.png", caption: "Forest cabin · plan view" },
    ],
    [
      { note: "hb-07-sb-zen-plan.png", caption: "Zen garden · plan view" },
      { note: "hb-08-sb-zen-garden.png", caption: "Zen garden" },
      { note: "hb-09-sb-snow-mountains.png", caption: "Snow mountains" },
    ],
  ] as const,
};

export const SOLUTION = {
  eyebrow: "The solution",
  heading: "Three design moves that remove the learning curve",
  moves: [
    {
      icon: "icon-move-eye",
      title: "Gaze control",
      body: "You steer by looking at an area of the scene. No controllers to learn, and almost no physical movement.",
    },
    {
      icon: "icon-move-wind",
      title: "Breath-synced visuals",
      body: "Particles move through inhale, hold and exhale with a guided box-breathing meditation, so first-timers see how to breathe.",
    },
    {
      icon: "icon-move-home",
      title: "A world to call home",
      body: "Patients choose a home world, Log Cabin, Crystal Bay Beach or Zen Garden, to suit their mood that day.",
    },
  ] as const,
};

export const UI3D = {
  eyebrow: "3D interface",
  heading: "A 3D interface that asks almost nothing",
  note: "I prototyped the 3D UI and designed the 3D icons for all three home worlds in Vectary. Each panel floats in the scene with one short description and a single choice.",
  panels: [
    { note: "hb-10-ui-choose-home.png", caption: "Choose your home world", wide: true as const },
    { note: "hb-11-ui-crystal-bay.png", caption: "Crystal Bay Beach, one description, one choice", wide: false as const },
  ] as const,
};

export const WORLDS = {
  eyebrow: "Final worlds",
  heading: "From storyboard to world",
  note: "In each world, users can follow a guided box-breathing meditation or simply take in the place.",
  panels: [
    { note: "hb-12-world-crystal-bay.png", caption: "Crystal Bay Beach", span: "wide" as const },
    { note: "hb-13-world-log-cabin.png", caption: "Log Cabin", span: "narrow" as const },
    { note: "hb-14-world-zen-garden.png", caption: "Zen Garden", span: "narrow" as const },
  ] as const,
};

export const BREATH = {
  eyebrow: "Guided by breath",
  heading: "Seated, still, and guided by breath",
  imageNote: "hb-15-seated-breathing.png",
  notes: [
    {
      icon: "icon-wind",
      title: "Breathing particles",
      body: "Particles follow the breath through inhale, hold and exhale.",
    },
    {
      icon: "icon-sound",
      title: "Voice and spatial sound",
      body: "A recorded voice guide leads the meditation, with spatial sound tuned with the developers.",
    },
  ] as const,
};

export const OUTCOME = {
  eyebrow: "Outcome",
  heading: "Built for the first try, ready for the treatment plan",
  impact: [
    { num: "25%", body: "increase in therapy module adoption", tone: "sage" as const },
    { num: "First try", body: "Headset-ready and hands-free, used seated at home", tone: "dark" as const },
    { num: "Continued", body: "Development went on beyond the first release", tone: "dark" as const },
  ] as const,
  lessonsLabel: "What I carry forward",
  lessons: [
    "Accessibility is the brief, not a feature added at the end.",
    "The best interface asks nothing. Gaze and breath replaced menus and buttons.",
    "Design for a moving target. Flexible stages let the concept grow without starting over.",
  ] as const,
  credit:
    "Client work for Harvard MedTech, delivered at CXR Agency (Kinemeric) with a Creative Director, five 3D artists, 4–5 developers, a product manager, QA and a UI/UX team. This page shows my role and contributions.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · Mobile web · Game",
    title: "Modelo × Seattle Kraken",
    highlight: "The Skate Challenge",
    href: "/projects/modelo-seattle-kraken",
    thumbBg: "#0D1B2A",
    thumbFg: "#99D9D9",
  },
  {
    direction: "Next · WebAR · Hospitality",
    title: "Turtle Bay Resort",
    highlight: "A door onto the beach at Turtle Bay",
    href: "/projects/turtle-bay-resort",
    thumbBg: "#18201A",
    thumbFg: "#A9D4B3",
  },
] as const;
