/**
 * Turtle Bay Resort (WebAR portal) — transcribed from Website Wireframes
 * node 202:217. Copy and layout specs are from Figma as-is. Only the two
 * hero frames hold image fills; all other slots are labeled drop-zones.
 */

const C = "/case/turtle";

export const HERO = {
  eyebrowLead: "Turtle Bay Resort ",
  eyebrowRest: "· WebAR portal",
  title: "A door onto the beach at Turtle Bay",
  subtitle:
    "Place a door in any room, step through, and you’re on the resort’s private beach at sunrise, with sea turtles, spatial sound and a picnic waiting. No app to install.",
  role: "XR Designer",
  roleAgency: " · CXR Agency (Kinemeric)",
  roleNote: "Experience design, UX, sound, 3D quality and testing · 3–4 weeks",
  cta: "Step through",
  shells: {
    src: `${C}/hero-shells.webp`,
    alt: "Following the glowing shells on the beach",
    note: "tb-05-follow-shells.jpg",
  },
  video: {
    src: `${C}/hero-video.webp`,
    alt: "Sunrise beach portal view",
    note: "tb-v01-hero-sunrise-beach.mp4 (muted loop)",
  },
};

export const FACTS = [
  { icon: "icon-fact-role", label: "ROLE", value: "Experience design, UX, sound, 3D quality" },
  { icon: "icon-fact-client", label: "CLIENT", value: "Turtle Bay Resort, Oʻahu" },
  { icon: "icon-fact-phone", label: "PLATFORM", value: "WebAR on 8th Wall, mobile browsers" },
  { icon: "icon-fact-team", label: "TEAM", value: "Me, CD, PM, 2 3D artists, 2–3 devs" },
] as const;

export const BRIEF = {
  eyebrow: "The brief",
  heading: "Show the beach, don’t describe it",
  note: "Turtle Bay wanted people to feel its private beach before they’d ever booked.",
  cards: [
    {
      icon: "icon-users",
      title: "Two audiences",
      body: "Visitors walking past a conference booth, and anyone tapping a social or web ad.",
    },
    {
      icon: "icon-clock",
      title: "One minute, any room",
      body: "On their own phone, wherever they stood. It had to open reliably in a browser and hold up at human scale.",
    },
    {
      icon: "icon-turtle",
      title: "Turtles, done right",
      body: "The resort’s green sea turtles were the heart of the scene. A turtle that moves wrong breaks the spell fastest.",
    },
  ] as const,
};

export const JOURNEY = {
  eyebrow: "How a visit unfolds",
  heading: "The only thing you tap is something that belongs on a beach",
  steps: [
    { note: "tb-01-loading.jpg", title: "Arrive", body: "A branded loader, timed so the wait feels like the resort" },
    { note: "tb-02-sound-prompt.jpg", title: "Turn up the sound", body: "Asked before the camera opens. Half of this is the sea" },
    { note: "tb-03-scan-floor.jpg", title: "Find the floor", body: "Scan a flat, well-lit surface for the door" },
    { note: "tb-04-step-through.jpg", title: "Step through", body: "Tap the door and walk in. Spatial audio fades up" },
    { note: "tb-05-follow-shells.jpg", title: "Follow the shells", body: "Glowing shells wake the turtles" },
    { note: "tb-06-invitation.jpg", title: "Plan the visit", body: "“Learn more” hands off to the resort’s site" },
  ] as const,
};

export const TESTING = {
  eyebrow: "Testing on device",
  heading: "Making the illusion hold",
  note: "I tested every build on a phone, recorded what broke, and annotated it for the 3D artists and developers.",
  scale: {
    title: "Scale and presence",
    sub: "The world had to sit at human height, at the door and on the move.",
    captures: [
      { note: "tb-07-portal-height.jpg", title: "Portal height", body: "Where the threshold meets the real floor" },
      { note: "tb-08-ground-standing.jpg", title: "Ground from standing height", body: "The picnic reads at human scale" },
      { note: "tb-09-height-walking.jpg", title: "Holding height while walking", body: "Eye height stays right mid-walk" },
      { note: "tb-10-blocking-view.jpg", title: "Blocking the view", body: "Props frame the sea, not hide it" },
    ] as const,
  },
  integrity: {
    title: "World integrity",
    sub: "Anything that flickers, floats or flattens reads as fake.",
    captures: [
      { note: "tb-v02-moving-with-camera.mp4", title: "Moving with the camera", video: true as const },
      { note: "tb-v03-flat-surface.mp4", title: "Flat surface", video: true as const },
      { note: "tb-v04-lighting-glitch.mp4", title: "Lighting glitch", video: true as const },
      { note: "tb-11-highlighted-patches.jpg", title: "Highlighted patches", video: false as const },
      { note: "tb-v05-signage-texture.mp4", title: "Signage texture", video: true as const },
    ] as const,
  },
  sound: {
    title: "Sound and waiting",
    sub: "The first seconds decide whether someone stays.",
    captures: [
      { note: "tb-v06-sound-before.mp4", title: "Before · original volume", body: "", video: true as const },
      { note: "tb-v07-sound-after.mp4", title: "After · volume up 10%", body: "So the sea carries on a phone speaker", video: true as const },
      { note: "tb-v08-loading-time.mp4", title: "Loading screen time", body: "Timed against a real phone connection", video: true as const },
    ] as const,
  },
};

export const BUILDS = {
  eyebrow: "Iteration",
  heading: "Three builds, one week",
  note: "Each round went on device, got recorded end to end, and came back as notes for the next build.",
  cards: [
    {
      note: "tb-12-build-jul12.jpg",
      build: "BUILD 1",
      date: "12 July",
      body: "First full walk-through: beach, turtles, signage and picnic. No onboarding or invitation yet.",
    },
    {
      note: "tb-13-build-jul18.jpg",
      build: "BUILD 2",
      date: "18 July",
      body: "Onboarding added: sound prompt, camera permission, surface-scan guidance, and the invitation card.",
    },
    {
      note: "tb-14-build-jul19.jpg",
      build: "BUILD 3",
      date: "19 July",
      body: "The complete loop: door, beach, shell, invitation, and a clean handoff to the resort’s site.",
    },
  ] as const,
};

export const CRAFT = {
  eyebrow: "Craft",
  heading: "What makes a portal feel like a place",
  cards: [
    {
      icon: "icon-craft-sound",
      title: "Spatial sound",
      body: "The waves sit where the water is, so turning around changes the mix. I designed the soundscape and tuned levels on device, because what sounds right at a desk disappears on a phone speaker at a booth.",
    },
    {
      icon: "icon-craft-cube",
      title: "3D direction",
      body: "I managed the assets from our two 3D artists and reviewed quality: the turtle’s crawl, the sunrise light, and how much detail a phone browser could carry before loading suffered. Every prop had to earn its polygons.",
    },
  ] as const,
};

export const FINISHED = {
  eyebrow: "The finished experience",
  heading: "It showed the resort instead of selling it",
  note: "From a hotel lobby, a conference hall or a living room, anyone with a phone could stand on the beach, meet the turtles, and choose to find out more.",
  wide: {
    note: "tb-15-finished-three-screens.jpg",
    caption: "Welcome screen, a turtle on the beach, and the invitation to visit",
  },
  walkthrough: {
    note: "tb-v09-finished-walkthrough.mp4",
    caption: "Full walkthrough, recorded on a phone",
  },
};

export const CONTRIBUTIONS = {
  eyebrow: "My role",
  heading: "The idea was a door. The work was making sure nobody noticed the seams.",
  rows: [
    [
      { icon: "icon-sparkle-white", title: "AR experience design & ideation", lead: true as const },
      { icon: "icon-layout", title: "UX, onboarding & the in-world interaction model", lead: false as const },
      { icon: "icon-cube", title: "3D asset management & quality review", lead: false as const },
    ],
    [
      { icon: "icon-sound", title: "Sound design", lead: false as const },
      { icon: "icon-check", title: "Testing & validation on device", lead: false as const },
      { icon: "icon-team", title: "Coordination across 3D, dev, creative direction & PM", lead: false as const },
    ],
  ] as const,
  credit:
    "Client work for Turtle Bay Resort, delivered at CXR Agency (Kinemeric). I was the only XR designer, working with two 3D artists, a Creative Director, a project manager and 2–3 developers. This page shows my role and contributions.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · VR · Healthcare",
    title: "Harvard MedTech",
    highlight: "Immersive Meditation Universe",
    href: "/projects/harvard-medtech",
    thumbBg: "#18201A",
    thumbFg: "#A9D4B3",
  },
  {
    direction: "Next · VR · Virtual retail",
    title: "IFSG",
    highlight: "A luxury shopping metaverse you can reach into",
    href: "/projects/ifsg-virtual-retail",
    thumbBg: "#10272B",
    thumbFg: "#FFB997",
  },
] as const;
