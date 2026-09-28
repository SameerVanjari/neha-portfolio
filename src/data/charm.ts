/**
 * Charm City Kings (AR Filter) — transcribed from Website Wireframes
 * node 151:217. Copy and layout specs are from Figma as-is.
 *
 * Clips were synced from the project Drive folder and re-encoded for the web
 * (silent, muted autoplay loops, except the 44s behind-the-scenes cut which
 * gets native controls). `note` keeps the original Drive filename.
 */

const IMG = "/projects/hbo-charm-city-kings";
const VID = "/videos/charm-city-kings";

export const HERO = {
  eyebrowLead: "Charm City Kings",
  eyebrowRest: " · HBO Max · AR campaign",
  titleLead: "They call",
  titleAccent: " me…",
  subtitle:
    "An AR face filter and social campaign that turned fans into the film’s characters, for HBO Max’s first exclusive movie.",
  role: "AR Experience & Motion Designer",
  roleAgency: " · CXR Agency (Kinemeric)",
  roleNote: "Client: HBO Max, via 19th and Park · 2020",
  cta: "Play Video",
  polaroids: [
    {
      name: "Mouse",
      note: "HBO file · 06 · Mouse card still",
      src: `${IMG}/they-call-me-mouse-poster.jpg`,
      alt: "They call me Mouse — AR filter still",
    },
    {
      name: "Blax",
      note: "HBO file · 06 · Blax card still",
      src: `${IMG}/they-call-me-blax-poster.jpg`,
      alt: "They call me Blax — AR filter still",
    },
    {
      name: "Holy Savage",
      note: "HBO file · 01 · Holy Savage reveal still",
      src: `${IMG}/hero-filter.jpg`,
      alt: "They call me Holy Savage — AR filter still",
    },
  ] as const,
};

export const FACTS = [
  { icon: "icon-fact-role", label: "ROLE", value: "AR Experience & Motion Designer" },
  { icon: "icon-fact-client", label: "CLIENT", value: "HBO Max, via 19th and Park" },
  { icon: "icon-fact-layers", label: "DELIVERABLES", value: "AR face filter + 20 social assets" },
  { icon: "icon-fact-tools", label: "TOOLS", value: "Unity 3D · After Effects · Premiere Pro" },
] as const;

export const OVERVIEW = {
  eyebrow: "Overview",
  heading: "HBO Max’s first exclusive movie needed a launch moment",
  stat: "28M+",
  statBody: "HBO Max subscribers by September 2020, ahead of the film’s October launch",
  context:
    "HBO Max launched in May 2020. Its first exclusive film, Charm City Kings (featuring Meek Mill), released that October. With HBO Max’s in-house team fully booked and time running out, HBO Max and 19th and Park asked our team to build a creative social campaign for the launch, fast.",
  constraintsEyebrow: "Three constraints shaped the approach",
  constraints: [
    {
      icon: "icon-clock",
      title: "Speed",
      body: "The in-house team was at capacity and the release date wasn’t moving.",
    },
    {
      icon: "icon-sparkle",
      title: "Cut through the feed",
      body: "A trailer cut or static poster wouldn’t stand out. The mechanic had to invite participation.",
    },
    {
      icon: "icon-grid",
      title: "Consistency at scale",
      body: "Several lead characters, one system that flexes without breaking brand or slowing production.",
    },
  ] as const,
};

export const ROLE = {
  eyebrow: "What I did",
  heading: "A repeatable system, built to move fast",
  note: "From the full film to a live AR filter, every step ran through one template.",
  steps: [
    { icon: "icon-step-search", title: "Curate", body: "Picked the strongest character moments from the full film" },
    { icon: "icon-step-pen", title: "Template", body: "Designed the “They call me…” visual system" },
    { icon: "icon-step-sparkle", title: "Animate", body: "Transitions and title reveals in After Effects" },
    { icon: "icon-step-film", title: "Edit", body: "Cut and refined GIFs and videos in Premiere Pro" },
    { icon: "icon-step-face", title: "Build", body: "Brought the template to life as an AR filter with the Unity developer" },
  ] as const,
  tiles: [
    { num: "20", body: "static and dynamic social assets", tone: "magenta" as const },
    { num: "4", body: "characters, one template", tone: "dark" as const },
    { num: "1", body: "live AR face filter for Instagram & Facebook", tone: "dark" as const },
    { num: "+2", body: "a name generator and a writing-contest portal", tone: "dark" as const },
  ] as const,
};

export const SYSTEM = {
  eyebrow: "Visual system",
  heading: "One template, four characters",
  note: "Every character gets the same emotional beat, so the campaign scales without breaking brand.",
  cards: [
    {
      name: "Holy Savage",
      note: "HBO file · 06 · Holy Savage reveal still",
      src: `${IMG}/hero-filter.jpg`,
      alt: "They call me Holy Savage",
    },
    {
      name: "Mouse",
      note: "HBO file · 06 · Mouse card still",
      src: `${IMG}/they-call-me-mouse-poster.jpg`,
      alt: "They call me Mouse",
    },
    {
      name: "Blax",
      note: "HBO file · 06 · Blax card still",
      src: `${IMG}/they-call-me-blax-poster.jpg`,
      alt: "They call me Blax",
    },
    {
      name: "Nicki",
      note: "HBO file · 06 · Nicki card still",
      src: `${IMG}/they-call-me-nicki-poster.jpg`,
      alt: "They call me Nicki",
    },
  ] as const,
  anatomy: [
    { icon: "icon-frame", title: "Polaroid frame", body: "Nods to the film’s documentary tone" },
    { icon: "icon-sparkle-magenta", title: "Neon-script title", body: "Matches the film’s key art" },
    { icon: "icon-face", title: "“They call me…”", body: "The same emotional beat for every character" },
  ] as const,
};

export const CAMPAIGN = {
  eyebrow: "The campaign in motion",
  heading: "Sizzle reel, character spotlights, social cuts",
  note: "Produced as 20 static and dynamic assets, optimized for Instagram’s specs without losing polish.",
  sizzle: {
    src: `${VID}/sizzle-reel.mp4`,
    poster: `${IMG}/sizzle-reel-poster.webp`,
    alt: "The “They call me… Holy Savage” card drifting across a blurred backdrop: a portrait in a white polaroid frame, the name in neon pink script, and the Charm City Kings logo",
    note: "VIDEO · FULL_SIZZLE_VIDEO_W_O_TEXT.mp4 (HBO file · 05)",
    video: true as const,
  },
  spotlights: [
    {
      label: "They call me… Mouse",
      src: `${VID}/they-call-me-mouse.mp4`,
      poster: `${IMG}/they-call-me-mouse-poster.jpg`,
      alt: "The “They call me… Mouse” card: a portrait inside a white polaroid frame, the name in neon pink script",
      note: "VIDEO · THEY_CALL_ME_MOUSE.mp4",
      video: true as const,
    },
    {
      label: "They call me… Blax",
      src: `${VID}/they-call-me-blax.mp4`,
      poster: `${IMG}/they-call-me-blax-poster.jpg`,
      alt: "The “They call me… Blax” card: a portrait inside a white polaroid frame, the name in neon pink script",
      note: "VIDEO · THEY_CALL_ME_BLAX.MP4",
      video: true as const,
    },
    {
      label: "They call me… Nicki",
      src: `${VID}/they-call-me-nicki.mp4`,
      poster: `${IMG}/they-call-me-nicki-poster.jpg`,
      alt: "The “They call me… Nicki” card: a portrait inside a white polaroid frame, the name in neon pink script",
      note: "VIDEO · THEY_CALL_ME_NICKI.mp4",
      video: true as const,
    },
  ] as const,
  cuts: [
    {
      label: "Mouse & Blax",
      src: `${VID}/mouse-and-blax.mp4` as string | undefined,
      poster: `${IMG}/mouse-and-blax-poster.jpg` as string | undefined,
      alt: "Mouse and Blax together under the Charm City Kings logo",
      note: "VIDEO · MOUSE_AND_BLAX.mp4",
      video: true as const,
    },
    {
      label: "Three Friends",
      src: `${VID}/three-friends.mp4` as string | undefined,
      poster: `${IMG}/three-friends-poster.webp` as string | undefined,
      alt: "A fan in sunglasses cast as a character: “They call me… SwearTagawd” in neon pink script over the Charm City Kings logo",
      note: "VIDEO · THREE_FRIENDS.mp4",
      video: true as const,
    },
  ] as const,
};

export const MECHANIC = {
  eyebrow: "How it works",
  heading: "The live AR mechanic",
  note: "Built in Unity 3D with live face-tracking for Instagram and Facebook.",
  phones: [
    {
      src: `${VID}/hbo-filter.mp4`,
      poster: `${IMG}/hbo-filter-poster.webp`,
      alt: "The filter running inside a phone frame: the “They call me… Holy Savage” card tracking the user’s face",
      note: "VIDEO · HBO_Filter.mp4 (filter reveal)",
      video: true as const,
    },
    {
      src: `${VID}/face-filter-ig-demo.mp4`,
      poster: `${IMG}/face-filter-ig-demo-poster.webp`,
      alt: "The filter full screen on Instagram: the Holy Savage polaroid with the neon script title resolving over the face",
      note: "VIDEO · face_filter_IG_Demo.MOV (Instagram demo)",
      video: true as const,
    },
  ] as const,
  steps: [
    {
      icon: "icon-face",
      title: "Face-tracked, live",
      body: "The filter follows the fan’s face in real time on Instagram and Facebook.",
    },
    {
      icon: "icon-frame",
      title: "A Polaroid, built around you",
      body: "The same frame as the character cards, so fans join the cast.",
    },
    {
      icon: "icon-sparkle",
      title: "Your nickname, in neon",
      body: "The “They call me…” reveal lands the moment worth sharing.",
    },
  ] as const,
  recordingsEyebrow: "Captured live · screen recordings",
  recordings: [
    {
      src: `${VID}/filter-recording-1.mp4`,
      poster: `${IMG}/filter-recording-1-poster.webp`,
      alt: "After Effects screen recording: the Blax character card comp being built in the timeline",
      note: "VIDEO · Filter_screen_recording_1.mp4",
      video: true as const,
    },
    {
      src: `${VID}/filter-recording-2.mp4`,
      poster: `${IMG}/filter-recording-2-poster.webp`,
      alt: "After Effects screen recording: the neon script title and underline animating onto the Blax card",
      note: "VIDEO · Filter_screen_recording_2.mp4",
      video: true as const,
    },
    {
      src: `${VID}/filter-recording-3.mp4`,
      poster: `${IMG}/filter-recording-3-poster.webp`,
      alt: "After Effects screen recording: the Blax card comp previewed at full size in the composition panel",
      note: "VIDEO · Filter_screen_recording_3.mp4",
      video: true as const,
    },
    {
      src: `${VID}/filter-recording-4.mp4`,
      poster: `${IMG}/filter-recording-4-poster.webp`,
      alt: "After Effects screen recording: the Blax card comp previewed in the composition panel",
      note: "VIDEO · Filter_screen_recording_4.mp4",
      video: true as const,
    },
  ] as const,
};

export const BTS = {
  eyebrow: "Behind the scenes",
  heading: "Building the assets",
  // 44s is far too long to loop, so this one gets native controls and only
  // loads when the visitor asks for it.
  video: {
    src: `${VID}/bts-making-process.mp4`,
    poster: `${IMG}/bts-making-process-poster.webp`,
    alt: "After Effects screen recording of the build: footage curation in the project panel, the comp in two program monitors, and the full timeline",
    note: "VIDEO · CCK_Gifs_making_process.mp4 (HBO file · 14)",
    video: true as const,
    controls: true as const,
  },
  body: "Footage curation, template design, and motion work happened in After Effects and Premiere Pro, then handed off to Unity for the live face-tracking build.",
  tools: ["After Effects", "Premiere Pro", "Unity 3D"] as const,
};

export const RESULTS = {
  eyebrow: "Results",
  heading: "A campaign that reached beyond the feed",
  impact: [
    {
      title: "Official filter",
      body: "Shipped as HBO Max’s campaign filter on Instagram and Facebook",
    },
    {
      title: "Ongoing reach",
      body: "Continued driving engagement across platforms after launch",
    },
    {
      title: "Star power",
      body: "Engaged Snoop Dogg, Will Smith, and Meek Mill",
    },
  ] as const,
  quote:
    "The project combined the reach of a traditional digital marketing push with the novelty of AR, giving Charm City Kings a launch moment built for its audience.",
  source: "Source: Kinemeric’s own case study for this project",
  credit:
    "Client work for HBO Max via 19th and Park, delivered at CXR Agency (Kinemeric) with a Unity developer. This page shows my role and contributions.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · VR · Mindfulness",
    title: "Made for Joy",
    highlight: "A world where the world is the interface",
    href: "/projects/made-for-joy",
    thumbBg: "#0F2422",
    thumbFg: "#7FD6C8",
  },
  {
    direction: "Next · WebAR · Brand activation",
    title: "TD Bank One Vanderbilt",
    highlight: "A cardboard skyscraper that comes alive in AR",
    href: "/projects/td-bank-one-vanderbilt",
    thumbBg: "#17101A",
    thumbFg: "#FF8FB8",
  },
] as const;
