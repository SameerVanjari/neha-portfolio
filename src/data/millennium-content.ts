/**
 * Millennium — "A Broken Mile" VR training case study (summary format).
 * Condensed to the Loop-style structure: lede, hero media, four narrative
 * blocks (Overview / Challenge / Approach / Outcome), quote, credits.
 * One image per story point — imagery carries the message, the prose carries the arc.
 */

export const MILLENNIUM_IMAGES = {
  wantedPoster: "/images/millennium/wanted-poster.jpg",
  squirrelChew: "/images/millennium/hook-squirrel-chew.jpg",
  problemStreet: "/images/millennium/problem-street.jpg",
  briefingWhiteboard: "/images/millennium/briefing-whiteboard.jpg",
  storyMapAnnotated: "/images/millennium/story-map-annotated.jpg",
  cherryTruck: "/images/millennium/cherry-truck.jpg",
  finalScore10: "/images/millennium/final-score-10.jpg",
} as const;

export const MILLENNIUM_HERO = {
  award: "7th International VR Awards Finalist",
  tags: "Meta Quest 2 · Enterprise · 2023",
  blurb:
    "Standardize fiber-optic repair training for Millennium's distributed technicians — through an immersive VR run they can fail safely in.",
} as const;

export const MILLENNIUM_OVERVIEW = {
  eyebrow: "Overview",
  body:
    "“A Broken Mile” turns one of the most common — and most dangerous — training gaps in broadband into a game: a squirrel has chewed through a neighborhood fiber line, and the technician has to read the outage, outfit the truck, climb, and splice it back together. On Meta Quest 2, every run is a complete, scored field day where a mistake costs nothing. I led the experience design end-to-end at CXR Agency (now Kinemeric), from client research through deployment on ArborXR.",
  figCaption: "The premise is play — a wanted squirrel with a $70,158 bounty — wrapped around a deadly-serious procedure.",
} as const;

export const MILLENNIUM_CHALLENGE = {
  eyebrow: "Challenge",
  body:
    "Fiber repair is precision, safety-critical, fine-motor work — the only real rehearsal is the live field, where new technicians learn by risking outages and their own safety. The simulation had to be faithful enough to build real skill — every tool recognizable, every step true to the field sequence — yet deployable, measurable, and repeatable at enterprise scale.",
  figCaption: "The classroom is this street. The sim recreates it — neighborhood, pole, truck, damaged line — with none of the risk.",
} as const;

export const MILLENNIUM_APPROACH = {
  eyebrow: "Approach",
  lede:
    "Built from the field up. I asked the technicians how the work actually happens before anything else, storyboarded the whole run in ShapesXR, then directed it into a 90Hz-stable 3D world.",
  steps: [
    {
      title: "Research",
      body: "Workshops with Millennium's technicians — real mount procedures and task sequences became the backbone; 8 core design documents followed.",
      src: MILLENNIUM_IMAGES.briefingWhiteboard,
      alt: "Whiteboard briefing room scene from the storyboard",
      caption: "Day one: the whiteboard brief built from technicians' answers, not the client brief.",
    },
    {
      title: "Storyboard",
      body: "An interactive ShapesXR storyboard previsualized viewpoints, scale, and the user's path — approved before a production asset existed.",
      src: MILLENNIUM_IMAGES.storyMapAnnotated,
      alt: "Annotated top-down map of the neighborhood marking squirrel, route, and home",
      caption: "The schematic underneath the story: strike zone, truck route, user start.",
    },
    {
      title: "Production",
      body: "Directed 3D, haptics, and sound so every splice enclosure and hand tool reads instantly in-hand — optimized for solid 90Hz performance.",
      src: MILLENNIUM_IMAGES.cherryTruck,
      alt: "Cherry-picker truck staged at the utility pole",
      caption: "Scale validated against real equipment — the boom truck has to feel like the truck.",
    },
  ],
} as const;

export const MILLENNIUM_OUTCOME = {
  eyebrow: "Outcome",
  quote: "“We've never seen anything like it in our training modules. Realism and simplicity, exactly what we needed.”",
  quoteBy: "VP of Marketing, Millennium",
  points: [
    { stat: "Less seat time", body: "Training time and cost reduced versus classroom and video methods." },
    { stat: "Safer fieldwork", body: "Better safety protocols and higher field quality standards." },
    { stat: "Consistent skill", body: "Uniform, raised skill levels across technicians trained on the program." },
  ],
  figCaption: "A scored run: read the damage, pick the gear, fix the line — 10/10 completes the loop.",
  trailerTitle: "See it running",
  tryIt: "“A Broken Mile” is live on the Meta Quest Store, and published by Kinemeric as “Inside the Fiber: VR Field Training for Network Technicians.”",
  presented: "Presented as a guest lecture at IDC IIT Bombay (2022) and the Seekar Innovation & Entrepreneurship Symposium, MIT ADT University.",
} as const;

export const MILLENNIUM_CREDITS = {
  eyebrow: "Credits",
  title: "One last thing",
  body: "Thank you for reading the short version of a three-month build. Want the full detail — design docs, storyboards, decisions? Let's talk.",
  tryIt: "Try it: A Broken Mile — meta.com/experiences/the-broken-mile",
} as const;
