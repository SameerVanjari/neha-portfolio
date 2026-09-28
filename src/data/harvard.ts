/**
 * Harvard MedTech (VR for healthcare) — transcribed from Website Wireframes
 * node 196:217. Copy and layout specs are from Figma as-is.
 *
 * Media was synced from the project Drive folder. `src` points at the
 * optimised file in public/case/harvard; `note` keeps the original Drive
 * filename for provenance. The hero clip is a trimmed, re-encoded 21s cut of
 * HMT_VR.mp4 (24MB, 78s) — the full source stays in assets/harvard-medtech.
 */

const C = "/case/harvard";

/** The project cover, used by the homepage and /projects cards. */
export const THUMB = {
  src: `${C}/hb-12-world-crystal-bay.webp`,
  alt: "Crystal Bay Beach: a wooden deck over turquoise water, a boat moored among palms",
  note: "HMT-tropical-scene.webp",
};

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
  cover: {
    src: `${C}/hero-vr.mp4`,
    poster: `${C}/hero-vr-poster.webp`,
    alt: "A person in a VR headset using the experience from a lobby armchair, then the worlds it opens: a sunset forest, a log cabin, night particles and a tropical beach",
    note: "HMT_VR.mp4 (muted loop, 24s–45s)",
    video: true as const,
  },
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
    {
      src: `${C}/hb-02-moodboard.webp`,
      alt: "The Crystal Bay Environment moodboard: night photography of a lit overwater pavilion, a moonlit sea and a bioluminescent beach, with notes on lighting and sound",
      note: "hb-02-moodboard.png",
      caption: "Mood boards set the look and feel of each world",
    },
    {
      src: `${C}/hb-03-design-doc.webp`,
      alt: "A two-page storyboard: the Japanese Zen Garden environment on the left and Crystal Bay on the right, four captioned frames each, with notes on lighting, night sounds and what to animate",
      note: "hb-03-design-doc.png",
      caption: "Design documents showed the whole team how it would look and work",
    },
  ] as const,
};

export const STORYBOARDS = {
  eyebrow: "Storyboards",
  heading: "Storyboarded before it was built",
  note: "Plan views and perspectives for every world, handed to developers as the build reference.",
  rows: [
    [
      {
        src: `${C}/hb-04-sb-coastal-plan.webp`,
        alt: "Plan view of the coastal retreat: buildings, pools and terraces stepping down to the water",
        note: "hb-04-sb-coastal-plan.png",
        caption: "Coastal retreat · plan view",
      },
      {
        src: `${C}/hb-05-sb-forest-cabin.webp`,
        alt: "The forest cabin among pines on a riverbank, a canoe pulled up on the sand",
        note: "hb-05-sb-forest-cabin.png",
        caption: "Forest cabin",
      },
      {
        src: `${C}/hb-06-sb-forest-plan.webp`,
        alt: "Plan view of the forest garden: a path winding between planting beds to a deck over the water",
        note: "hb-06-sb-forest-plan.png",
        caption: "Forest cabin · plan view",
      },
    ],
    [
      {
        src: `${C}/hb-07-sb-zen-plan.webp`,
        alt: "Plan view of the zen garden: raked gravel, stepping stones and a dark meditation platform",
        note: "hb-07-sb-zen-plan.png",
        caption: "Zen garden · plan view",
      },
      {
        src: `${C}/hb-08-sb-zen-garden.webp`,
        alt: "Standing in the zen garden, raked gravel either side of a gravel path, a stilted house to the right",
        note: "hb-08-sb-zen-garden.png",
        caption: "Zen garden",
      },
      {
        src: `${C}/hb-09-sb-snow-mountains.webp`,
        alt: "Snow mountains at sunrise, with a snowcat, a snowmobile and a shovel on the ice",
        note: "hb-09-sb-snow-mountains.png",
        caption: "Snow mountains",
      },
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
    {
      src: `${C}/hb-10-ui-choose-home.mp4`,
      poster: `${C}/hb-10-ui-choose-home-poster.webp`,
      alt: "The 3D home panel floating in the scene: “Choose Your Home Environment”, with Log Cabin, Crystal Bay Beach and Zen Garden picked out by a gaze pointer",
      note: "hb-10-ui-choose-home.png",
      caption: "Choose your home world",
      wide: true as const,
      video: true as const,
    },
    {
      src: `${C}/hb-11-ui-crystal-bay.mp4`,
      poster: `${C}/hb-11-ui-crystal-bay-poster.webp`,
      alt: "The Crystal Bay Beach panel: one illustration, one line of description, and a single “Let’s go” choice under the gaze pointer",
      note: "hb-11-ui-crystal-bay.png",
      caption: "Crystal Bay Beach, one description, one choice",
      wide: false as const,
      video: true as const,
    },
  ] as const,
};

export const WORLDS = {
  eyebrow: "Final worlds",
  heading: "From storyboard to world",
  note: "In each world, users can follow a guided box-breathing meditation or simply take in the place.",
  panels: [
    {
      src: THUMB.src,
      alt: THUMB.alt,
      note: "hb-12-world-crystal-bay.png",
      caption: "Crystal Bay Beach",
      span: "wide" as const,
    },
    {
      src: `${C}/hb-13-world-log-cabin.webp`,
      alt: "The log cabin entrance: a wooden deck leading to open carved doors under a thatched roof",
      note: "hb-13-world-log-cabin.png",
      caption: "Log Cabin",
      span: "narrow" as const,
    },
    {
      src: `${C}/hb-14-world-zen-garden.webp`,
      alt: "A red torii gate at the head of mossy stone steps, with paper lanterns, cherry blossom and stepping stones",
      note: "hb-14-world-zen-garden.png",
      caption: "Zen Garden",
      span: "narrow" as const,
    },
  ] as const,
};

export const BREATH = {
  eyebrow: "Guided by breath",
  heading: "Seated, still, and guided by breath",
  image: {
    src: `${C}/hb-15-seated-breathing.mp4`,
    poster: `${C}/hb-15-seated-breathing-poster.webp`,
    alt: "Split view: the user seated and still in a VR headset, beside the night water where a glowing particle trail rises and falls with the breath",
    note: "hb-15-seated-breathing.png",
    video: true as const,
  },
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
    thumb: "/case/turtle/tb-15-finished-three-screens.webp",
    thumbAlt:
      "Three Turtle Bay screens side by side: the welcome screen, a turtle on the beach, and the invitation to visit",
    thumbBg: "#18201A",
    thumbFg: "#A9D4B3",
  },
] as const;
