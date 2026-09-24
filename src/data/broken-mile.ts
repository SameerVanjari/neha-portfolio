/**
 * The Broken Mile — case study content.
 * Transcribed from Website Wireframes "Project 1: Broken a Mile" (node 115:904).
 * Media slots use real project assets from public/images/millennium + videos.
 */

export const HERO = {
  eyebrow: "The Broken Mile · 7th International VR Awards Finalist",
  title: "Immersive VR Training for Fiber Optic Technicians",
  subtitle: "Meta Quest 2 · Deployed via ArborXR & Meta Quest Store",
  role: "Lead Immersive Experience Designer · CXR Agency (Kinemeric)",
  meta: "September 2023 · 3 months",
  cta: { label: "Try it on Meta Quest", href: "https://www.behance.net/gallery/204895093/Immersive-VR-Training-for-Fiber-Optic-Technicians" },
  video: "/videos/vr-training-fiber.mp4",
  poster: "/images/vr-training-fiber-hero.jpg",
  overlayNote: "Muted loop · 15–20s of in-headset footage",
};

export const AT_A_GLANCE = [
  { label: "Role", value: "XR design lead" },
  { label: "Team", value: "Me + CD, UI/UX, 3D, 3 devs" },
  { label: "Platform", value: "Meta Quest 2" },
  { label: "Recognition", value: "VR Awards finalist" },
] as const;

export const PROBLEM = {
  label: "The problem",
  heading: "Technicians learned a dangerous job on live lines.",
  cards: [
    { icon: "expense", title: "Expensive to scale", body: "Classroom and video training across many locations" },
    { icon: "inconsistent", title: "Inconsistent skills", body: "Quality depended on who trained you" },
    { icon: "risk", title: "Real safety risk", body: "Field mistakes affect people and service" },
  ] as const,
};

export const CONTRIBUTIONS = {
  label: "What I did",
  heading: "From the first client call to launch",
  note: "The connecting point between client, Creative Director, UI/UX, 3D, and dev teams",
  items: [
    { icon: "research", title: "Research", body: "Asked technicians how the job is really done" },
    { icon: "storyboard", title: "Storyboard", body: "Interactive ShapesXR previz, approved first" },
    { icon: "3d", title: "3D direction", body: "Asset list, references, reviews, approvals" },
    { icon: "ux", title: "UX & gamification", body: "Wireframes, scoring, levels, haptics with devs" },
    { icon: "sound", title: "Sound", body: "Five-layer audio and every voice line" },
    { icon: "launch", title: "Test & launch", body: "Build testing, ArborXR assets, the trailer" },
  ] as const,
  stats: [
    { num: "8", label: "core design documents written" },
    { num: "4", label: "teams coordinated daily" },
    { num: "5", label: "audio layers designed" },
    { num: "13", label: "tools across 3D, UX, audio, and video" },
  ],
};

export const STORYBOARD = {
  label: "Storyboard",
  heading: "Real field workflow, previewed in VR first",
  note: "Pole heights, cable routes, and tool order all came from technician interviews",
  figure: {
    image: "/images/millennium/story-map-annotated.jpg",
    alt: "ShapesXR previsualization of the neighborhood and utility pole",
    caption:
      "ShapesXR previsualization of the neighborhood and utility pole, re-exported without the watermark. From “6. Concept & Storyboarding”",
  },
  scenes: [
    { num: "1", title: "Arrive & assess", image: "/images/millennium/problem-street.jpg", caption: "Scene: arrive at the pole" },
    { num: "2", title: "Choose tools & materials", image: "/images/millennium/materials-grid.jpg", caption: "Scene: select the right materials" },
    { num: "3", title: "Splice & verify", image: "/images/millennium/final-score-10.jpg", caption: "Scene: the splice" },
  ],
};

export const UX_WIREFRAMES = {
  label: "UX wireframes",
  heading: "Wireframe first. Then ship it in the headset.",
  panels: [
    {
      kind: "wireframe" as const,
      image: "/images/millennium/task-problem-id.jpg",
      caption: "Core task panel wireframes, from “8. UX & Design Decisions”",
      tag: "Wireframe",
    },
    {
      kind: "shipped" as const,
      image: "/images/millennium/task-solved.jpg",
      caption: "The same panels as shipped, from “8. UX & Design Decisions – 2”",
      tag: "Shipped",
    },
  ],
  cards: [
    { vignette: "tiers", title: "Three training tiers", body: "Assessment removes “skip step,” so scores are earned" },
    { vignette: "retry", title: "Segmented practice", body: "Retrain one failed step, not the whole run" },
    { vignette: "supervisor", title: "Supervisor view", body: "Headset runs become team accountability via ArborXR" },
  ] as const,
};

export const KEY_DECISIONS = {
  label: "Key decisions",
  heading: "Four calls that made it work in the headset",
  items: [
    { vignette: "gaze", title: "Confirm with your eyes", body: "Hold your gaze and the ring fills. No button, because hands are busy." },
    { vignette: "clock", title: "Mistakes cost time, not progress", body: "Wrong picks add seconds instead of blocking the run." },
    { vignette: "lines", title: "Three lines, max", body: "People stop reading in a headset. A tool image beats a tool name." },
    { vignette: "labels", title: "Labels live on the part", body: "Short commands pinned to what needs action, so eyes never leave the task." },
  ] as const,
};

export const WORLD_3D = {
  label: "3D world",
  heading: "Tools a real technician recognizes",
  figure: {
    image: "/images/millennium/cherry-truck.jpg",
    caption: "Splice case, fusion splicer, and pole hardware, from “7. 3D Environment”",
  },
  tags: ["90 Hz on Quest 2", "LOD + texture atlasing", "Fewer draw calls"],
};

export const SOUND = {
  label: "Sound",
  heading: "Audio that guides without distracting",
  rows: [
    { label: "Voice-over", value: "Task steps & quizzes", tone: "darkest" },
    { label: "Character", value: "The wire-chewing squirrel", tone: "dark" },
    { label: "Interaction", value: "Tools, markers, falls", tone: "mid" },
    { label: "UI", value: "Select, hover, right, wrong", tone: "light" },
    { label: "Ambient & score", value: "Always underneath", tone: "outline" },
  ] as const,
};

export const IMPACT = {
  label: "Impact",
  heading: "Shipped, recognized, and in the field",
  stats: [
    { num: "Finalist", label: "7th International VR Awards", tone: "red" },
    { num: "30%", label: "shorter development cycles", tone: "dark" },
    { num: "Live", label: "Meta Quest Store + ArborXR fleet", tone: "dark" },
  ] as const,
  quote: {
    text: "We've never seen anything like it in our training modules. Realism and simplicity, exactly what we needed.",
    name: "VP of Marketing, client",
  },
  disclaimer:
    "Work done at CXR Agency (Kinemeric); also published by the company as “Inside the Fiber: VR Field Training for Network Technicians.” This page shows my role and contributions.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · AI · Conversational assistant",
    title: "VisaGenie",
    highlight: "95% task conversion",
    href: "/projects/visagenie",
    thumbDark: false,
  },
  {
    direction: "Next · AR · Social campaign",
    title: "Charm City Kings",
    highlight: "Official HBO Max campaign filter",
    href: "/projects/hbo-charm-city-kings",
    thumbDark: true,
  },
] as const;
