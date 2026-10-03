/**
 * Inspirit VR Physics case study — content transcribed from Figma
 * "Website Wireframes" → "Inspirit VR Physics — Case study (1440)" (node 423:217).
 *
 * The Figma frame is a 1440px desktop layout with 202px gutters, so the
 * content column is 1036px wide. Every figure is a labelled drop-frame in the
 * design; `FigSlot` keeps the frame tone, play icon and caption exactly as
 * specified so a real export can be dropped in by adding `src` and nothing
 * else has to move.
 *
 * Palette sampled off the same frame: warm paper #f4f3ef, charcoal #232325,
 * ink #1e1e20, carnival amber #f5b21b, curriculum blue #2e7db8.
 */

export const HERO = {
  eyebrowLead: "Inspirit VR",
  eyebrowRest: " · VR education · NGSS physics",
  headline: "A sci-fi carnival where physics is something you do",
  support:
    "Launch a cannon, throw objects and walk under their parabolas. A VR physics lab built on the NGSS curriculum, tested in real classrooms.",
  role: "VR Design Intern",
  roleRest: " · Inspirit VR",
  roleNote: "Theme, environment, assets, UI/UX, testing and user validation",
  cta: "Enter the carnival",
  /** Image slots — exports drop in as /case/inspirit/<file>. */
  shots: [
    { file: "iv-c1-dome-cannon-hud.jpg", w: 600, h: 366, top: 130 },
    { file: "iv-c2-ferris-wheel-domes.jpg", w: 360, h: 172, top: 470 },
  ],
} as const;

export const FACTS = [
  { label: "Role", value: "VR Design Intern", icon: "iv-icon-role" },
  { label: "Company", value: "Inspirit VR, founded by Stanford researchers", icon: "iv-icon-school" },
  { label: "Platform", value: "VR headset · built in Unity 3D", icon: "iv-icon-headset" },
  { label: "Curriculum", value: "NGSS physics: projectile motion, forces", icon: "iv-icon-atom" },
] as const;

export const BRIEF = {
  eyebrow: "The brief",
  heading: "Turn a physics curriculum into a place to explore",
  cardLabel: "Brief",
  cardLead:
    "Design the entire theme and its experience based on the physics curriculum (NGSS standard) in virtual reality.",
  cardBody:
    "The goal: help students understand physics through experience rather than equations on a board.",
  layoutFigure: "iv-02-brief-layout.jpg",
  layoutCaption: "The carnival layout: an entrance dome and ten tents around a central green",
} as const;

export const METHODOLOGY = {
  eyebrow: "Design methodology",
  heading: "Six steps, from curriculum to classroom",
  steps: [
    {
      num: "01",
      title: "Design research",
      body: "Understanding the physics curriculum thoroughly, and finding the theme’s inspiration from the storyline.",
    },
    {
      num: "02",
      title: "Creative content",
      body: "Composing the storyline from the curriculum hierarchy, finding metaphors for each concept, and designing lesson plans.",
    },
    {
      num: "03",
      title: "Ideating",
      body: "Turning metaphors into tents, assets and interactions for each module.",
    },
    {
      num: "04",
      title: "UI / UX",
      body: "Designing data as UI: instructions, guidelines and graphs, plus the visual language of the interface.",
    },
    {
      num: "05",
      title: "Testing the VR space",
      body: "Ergonomics: posture, visual perception, head movement and where each asset sits.",
    },
    {
      num: "06",
      title: "User validation",
      body: "Testing with a school teacher in the office, then with students in Atlanta schools.",
    },
  ],
  diagramFigure: "iv-01-design-methodology.jpg",
  diagramCaption: "The original methodology diagram",
} as const;

export const THEME = {
  eyebrow: "Theme & ideation",
  heading: "Ten tents, ten physics modules",
  note: "Every tent holds one module of complex physics concepts. Students explore and experiment inside any tent.",
  themeFigure: "iv-03-scifi-carnival-theme.jpg",
  themeCaption: "The sci-fi carnival theme",
  ideasFigure: "iv-04-ideations.jpg",
  ideasCaption: "Ideations: futuristic tent exteriors and the final form",
  tentDesignFigure: "iv-05-tent-design.jpg",
  tentDesignCaption: "Tent design: each module’s assets and functionality aligned to its concept",
  tentStudiesFigure: "iv-06-tent-interior-studies.jpg",
  tentStudiesCaption: "Exterior, mesh geometry, interior and roof details",
} as const;

export const ASSETS = {
  eyebrow: "Designing assets",
  heading: "One cannon, many versions, until it felt right in the hand",
  note: "Material palettes and forms explored for the cannon, the centerpiece of the projectile module.",
  figure: "iv-07-designing-assets.jpg",
  caption: "Cannon design explorations, from concept to in-engine",
} as const;

export const ENVIRONMENT = {
  eyebrow: "Environment made in Unity 3D",
  heading: "From illustration to a world you can walk through",
  archFigure: "iv-c4-carnival-arch.jpg",
  archCaption: "The carnival entrance arch",
  domesFigure: "iv-c2-ferris-wheel-domes.jpg",
  domesCaption: "Tent domes and the Ferris wheel",
  detailingFigure: "iv-09-detailings.jpg",
  detailingCaption: "Detailing: background assets that carry the theme",
  artDirection: {
    label: "Art direction",
    body: "I marked up in-engine screenshots for the team: what to add, scale, stack and turn, from ladders and jute ropes to the cannon’s facing direction.",
  },
  notesFigure: "iv-10-art-direction-notes.jpg",
  notesCaption: "Annotated feedback for the environment build",
} as const;

export const MODULES = {
  eyebrow: "Two modules",
  heading: "Physics you can throw, launch, push and pause",
  items: [
    {
      eyebrow: "Module 01",
      title: "Projectile motion",
      body: "Throw objects, launch a cannon and view vector variables. Walk under the parabolas you create, and use live graphs to see how initial velocity affects time of flight, maximum height and range.",
      objective:
        "Learn how objects move along the curvature of the Earth under gravity when projected near the surface.",
      heroFigure: "iv-c1-dome-cannon-hud.jpg",
      outcomes: [
        "Identify the variables of projectile motion: maximum height, range, acceleration and trajectory.",
        "Analyze how velocity changes over time, and find unknown variables at points along the trajectory.",
        "Evaluate how launch angle and initial velocity shape the trajectory.",
        "Calculate time of flight, maximum height and range for a projectile.",
      ],
      shots: [
        { caption: "Live position and velocity graphs", file: "iv-c3-live-graphs.jpg" },
        { caption: "Velocity and angle readouts on the cannon", file: "iv-12-projectile-motion.jpg" },
      ],
    },
    {
      eyebrow: "Module 02",
      title: "Forces and their types",
      body: "Test frictional and gravitational forces with an inclined plane and boxes of different weights. Pause an experiment to see its 3D free-body diagram, and build an intuitive feel for diagrams usually drawn on a whiteboard.",
      objective:
        "Learn the types of forces, how they influence an object’s motion, and how to describe them with vectors.",
      heroFigure: "iv-c5-inclined-plane.jpg",
      outcomes: [
        "Define normal, gravitational and frictional forces.",
        "Apply Newton’s laws of motion to problems with a variety of forces.",
        "Use trigonometric identities to resolve forces into components.",
        "Break down free-body diagrams involving several forces.",
      ],
      shots: [
        { caption: "Pause to see the 3D free-body diagram", file: "iv-c7-free-body-vectors.jpg" },
        { caption: "Surface, force and weight controls", file: "iv-c6-forces-control-panel.jpg" },
      ],
    },
  ],
  controllerFigure: "iv-c8-controller-tutorial.jpg",
  controllerCaption: "In-world instructions show exactly which controller button to press",
} as const;

export const VALIDATION = {
  eyebrow: "User validation",
  heading: "Tested with a teacher, then in Atlanta schools",
  note: "I ran sessions in the office with a school teacher, then with students in classrooms, alongside lesson plans I designed.",
  testingFigure: "iv-14-user-validation.jpg",
  testingCaption: "Testing in the office with a school teacher, and in Atlanta schools",
  classroomFigure: "iv-c9-testing-atlanta-school.jpg",
  classroomCaption: "A student session in an Atlanta classroom",
  quotesLabel: "What students and teachers said",
  quotes: [
    {
      quote:
        "The controls were super simple and easy, so anyone who had never played a video game or done anything like this before could easily jump into it and get started.",
      by: "John, student · East Palo Alto, CA",
      dark: false,
    },
    {
      quote:
        "Man, that VR thing was hard. It was so cool and super fun, but man, was it hard. I think we missed an answer to a question and we need to go back in so that we can find the answer.",
      by: "Jessica, student · East Palo Alto, CA",
      dark: false,
    },
    {
      quote:
        "Our school has done a lot in VR in the past, but your content is by far the highest quality VR we’ve seen in a while. I also love that you are compatible across platforms.",
      by: "Sally, teacher · Atlanta, GA",
      dark: true,
    },
  ],
  video: {
    prompt: "Drop video",
    file: "iv-video-walkthrough.mp4 (or iv-video-poster.jpg)",
    caption: "In-headset walkthrough of the experience",
  },
  footnote: "Created during my VR design internship at Inspirit VR. This page shows my role and contributions.",
} as const;

export const MORE_PROJECTS = {
  label: "MORE PROJECTS",
  allWork: "All work",
  cards: [
    {
      href: "/projects/atrium",
      kicker: "Previous · XR · Social VR (NDA)",
      title: "Atrium",
      body: "Social VR workspace for distributed teams",
      thumbBg: "#070c12",
      thumbLabel: "#5fd3cf",
    },
    {
      href: "/projects/inspirit-biology",
      kicker: "Next · VR · Education",
      title: "Inspirit VR Biology",
      body: "Fly a spaceship inside the cell",
      thumbBg: "#1e1b33",
      thumbLabel: "#a99bf0",
    },
  ],
} as const;
