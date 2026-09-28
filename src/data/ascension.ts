/**
 * Ascension Realty (AR Experience) case study.
 * Transcribed from Website Wireframes "Ascension Realty (AR Experience)"
 * (node 155:217). All copy and visual specs are taken from the Figma design
 * only; image slots are reproduced exactly as the design's drop-zones.
 */

export const HERO = {
  eyebrow: "Ascension Realty · Mobile AR · Private client",
  title: "Walk through a building before it’s built",
  subtitle:
    "A mobile AR experience that takes buyers from a city skyline down into a single room, before construction begins.",
  role: "XR Designer · CXR Agency (Kinemeric)",
  roleNote: "Concept to demo build in a 3-week sprint · 2021",
  cta: { label: "See the journey", href: "#flow" },
  media: {
    still: {
      src: "/case/ascension/media/hero-still.webp",
      alt: "The AR blockout cityscape with the development tower materializing on a real tabletop",
    },
    phone: {
      src: "/case/ascension/media/details-panel.webp",
      alt: "Apartment details panel beside the 3D interior, seen through the phone",
    },
  },
};

export const FACTS = [
  { icon: "icon-role", label: "Role", value: "XR Designer, concept to testing" },
  { icon: "icon-clock", label: "Timeline", value: "3-week sprint, concept to demo" },
  { icon: "icon-team", label: "Team", value: "Me, Creative Director, 2 3D artists, 2 developers" },
  { icon: "icon-cube", label: "Stack", value: "Unity 3D · Vuforia · Vectary · Figma" },
] as const;

export const SCOPE = {
  eyebrow: "Problem & scope",
  heading: "A promising idea with no structure yet",
  note: "A private real estate client wanted buyers and investors to experience developments in AR, from anywhere. There was no clarity or user journey yet.",
  cards: [
    {
      icon: "icon-target",
      title: "The ask",
      body: "Scan a surface and move from a city skyline into one apartment: city → tower → floor plan → room, as one journey.",
    },
    {
      icon: "icon-clock-v",
      title: "The constraint",
      body: "Three weeks, start to finish, with a five-person team and no existing app to reference.",
    },
    {
      icon: "icon-eye",
      title: "The challenge",
      body: "No onboarding, no walkthrough. It had to read clearly the first time someone picked up a phone.",
    },
  ] as const,
};

export const WHAT_I_DID = {
  eyebrow: "What I did",
  heading: "Every decision ran through me, concept to final testing",
  note: "With the Creative Director’s approval and build support from the 3D and dev teams.",
  cards: [
    { icon: "icon-grid", title: "Storyboarding", body: "Scale-by-scale journey boards, city to room" },
    { icon: "icon-box", title: "Asset curation", body: "Sourced TurboSquid models, optimized for real-time AR" },
    { icon: "icon-tap", title: "Interaction & UX", body: "Gestures, transitions and room-level navigation" },
    { icon: "icon-drop", title: "Holographic shader", body: "Art-directed the materialize effect behind the scan" },
    { icon: "icon-pen", title: "Prototyping", body: "Click-through mockups in Figma before dev handoff" },
    { icon: "icon-sound", title: "Sound design", body: "Ambient tone and interaction feedback" },
    { icon: "icon-sync", title: "Developer sync", body: "Worked directly with the two developers on every interaction" },
    { icon: "icon-check", title: "Testing & iteration", body: "Tested builds across devices, notes into the design system" },
  ] as const,
};

export const GOALS = {
  eyebrow: "Design goals",
  heading: "Four goals guided the design",
  items: [
    {
      num: "01",
      title: "Narrative journey",
      body: "An emotionally coherent story of ascension, rising from a skyline down into one home.",
    },
    { num: "02", title: "Minimal UI, maximum impact", body: "Interactions native to 3D space, not a 2D app squeezed into AR." },
    { num: "03", title: "Sensory immersion", body: "Sound, light, space and touch blend so the tour feels physical." },
    { num: "04", title: "Speculative interaction", body: "No existing app to borrow from, so the patterns were invented." },
  ] as const,
};

export const STORYBOARD = {
  eyebrow: "Storyboard",
  heading: "One journey, twelve beats",
  note: "With no existing platform to reference, the storyboard was the design contract the 3D team built to scale against.",
  panels: [
    { num: "01", title: "Splash screen", src: "/case/ascension/media/scan-surface.webp" },
    { num: "02", title: "Scan surface", src: "/case/ascension/media/scan-surface.webp" },
    { num: "03", title: "AR cityscape emerges", src: "/case/ascension/media/hero-still.webp" },
    { num: "04", title: "Buildings rise", src: "/case/ascension/media/city-scale.webp" },
    { num: "05", title: "Pinch to highlight", src: "/case/ascension/media/city-blockout.webp" },
    { num: "06", title: "City paper unfolds", src: "/case/ascension/media/city-phone.webp" },
    { num: "07", title: "3D floor plan extrudes", src: "/case/ascension/media/floor-plan.webp" },
    { num: "08", title: "Pinch-to-zoom", src: "/case/ascension/media/floor-plan-zoom.webp" },
    { num: "09", title: "Apartment saved", src: "/case/ascension/media/floor-plan-clean.webp" },
    { num: "10", title: "Moving closer", src: "/case/ascension/media/floor-plan-zoom.webp" },
    { num: "11", title: "Room clusters", src: "/case/ascension/media/details-panel-2.webp" },
    { num: "12", title: "Focused room view", src: "/case/ascension/media/details-panel.webp" },
  ],
  insights: [
    { title: "Splash to scan", body: "It opens in the real world, not a menu, before anything digital appears." },
    { title: "City to tower to floor plan", body: "Three deliberate zoom-ins carry the “ascension” story forward." },
    { title: "Pinch and proximity together", body: "Zoom is both a screen gesture and a side effect of moving closer." },
  ] as const,
};

export const UX_FLOW = {
  eyebrow: "UX flow",
  heading: "Six stages, four gestures",
  note: "From launch to a focused room view in under a minute.",
  stages: [
    { num: "1", title: "Landing", body: "Open the AR app" },
    { num: "2", title: "Onboarding", body: "“Scan a flat surface to begin.”" },
    { num: "3", title: "World build", body: "City grid extrudes into 3D" },
    { num: "4", title: "Selection", body: "Tap a pulsing unit" },
    { num: "5", title: "Interior", body: "Floor plan becomes 3D" },
    { num: "6", title: "Room focus", body: "Tap a room for details" },
  ] as const,
  triggersLabel: "Interaction model",
  triggers: [
    { icon: "icon-pinch", title: "Pinch", body: "Zooms the 3D interior in or out" },
    { icon: "icon-tap-s", title: "Tap a pulsing icon", body: "Selects a unit from the cityscape" },
    { icon: "icon-label", title: "Tap a room label", body: "Jumps to bedroom, kitchen, living room" },
    { icon: "icon-walk", title: "Avatar walk", body: "A 3D figure walks into the room, cueing the camera" },
  ] as const,
};

export const CHALLENGES = {
  eyebrow: "Key challenges",
  heading: "Three problems worth the sprint",
  items: [
    {
      icon: "icon-anchor",
      title: "Plane tracking",
      body: "Buildings and floor plans had to land level and stable on the user’s real surface, with no drifting.",
      solved: "Multiple Vuforia anchor points let the experience snap between city, tower and apartment without losing tracking.",
    },
    {
      icon: "icon-scale",
      title: "Building scale",
      body: "Models had to read at full scale and stay detailed, without making the user walk around.",
      solved: "Assets were re-scaled and optimized by hand, and proximity to the device stood in for walking closer.",
    },
    {
      icon: "icon-city",
      title: "Full cityscape",
      body: "A real city made the development convincing, but building one risked doubling the work.",
      solved: "Surrounding blocks became low-detail blockouts with a holographic shader; only the development got full fidelity.",
    },
  ] as const,
};

export const FEATURES = {
  eyebrow: "Core features",
  heading: "The three that made it work",
  note: "Everything else stayed secondary.",
  items: [
    {
      num: "01",
      title: "Full models",
      body: "3D buildings materialize in the user’s own space, showing a development’s true scale.",
      src: "/case/ascension/media/city-blockout.webp",
    },
    {
      num: "02",
      title: "Furnished floor plans",
      body: "A tap moves the user inside to explore each room with real layouts and furniture.",
      src: "/case/ascension/media/floor-plan.webp",
    },
    {
      num: "03",
      title: "Unobtrusive details",
      body: "Property and room info lives in a panel beside the view, never crowding the 3D.",
      src: "/case/ascension/media/details-panel.webp",
    },
  ] as const,
};

export const MOCKUPS = {
  eyebrow: "Mockups · Vectary",
  heading: "From scan to close-up",
  note: "Frames from the demo build and the Vectary renders.",
  items: [
    { ph: "/case/ascension/media/city-blockout.webp", caption: "Scanning a surface, blockout cityscape appears" },
    { ph: "/case/ascension/media/city-scale.webp", caption: "Full low-poly cityscape at real-world scale" },
    { ph: "/case/ascension/media/floor-plan.webp", caption: "AR interior, wide view through the phone" },
    { ph: "/case/ascension/media/details-panel-2.webp", caption: "Furnished room, close-up AR detail" },
  ] as const,
};

export const RESULTS = {
  eyebrow: "Results",
  heading: "A concept became a working demo",
  impact: [
    { title: "Working app", body: "A functioning mobile AR platform, ready to demo end to end", tone: "violet" },
    { title: "Client-ready", body: "A sample project the team can put in front of prospects", tone: "dark" },
    { title: "Tenant to investor", body: "Built for the full range of real estate shoppers", tone: "dark" },
  ] as const,
  quote:
    "With a functioning platform and a sample project to showcase, the client is ready to build out the use case and change the way shoppers approach real estate.",
  credit:
    "Client work for a private real estate client, delivered at CXR Agency (Kinemeric) with a Creative Director, two 3D artists and two developers. This page shows my role and contributions.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · WebAR · Nonprofit",
    title: "Feed the Children",
    highlight: "Empty cabinets, full impact",
    href: "/projects/feed-the-children",
    thumbBg: "#1E1814",
    thumbFg: "#F2A27E",
  },
  {
    direction: "Next · VR · Mindfulness",
    title: "Made for Joy",
    highlight: "A world where the world is the interface",
    href: "/projects/made-for-joy",
    thumbBg: "#0F2422",
    thumbFg: "#7FD6C8",
  },
] as const;
