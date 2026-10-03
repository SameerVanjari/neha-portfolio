/**
 * Inspirit VR DNA case study — content transcribed from Figma
 * "Website Wireframes" → "Inspirit VR DNA — Case study (1440)" (node 430:217).
 *
 * The Figma frame is a 1440px desktop layout with 202px gutters, so the
 * content column is 1036px wide. Every figure is a labelled drop-frame in the
 * design; `FigSlot` keeps the frame tone, play slot and caption exactly as
 * specified so a real export can be dropped in at /case/inspirit-dna/<file>
 * and nothing else has to move.
 *
 * Palette sampled off the same frame: cool paper #f4f5f4, hero indigo→violet
 * gradient #2a3590 → #4e2a7a, deep-night #17163a, dusk card #1f1e4a,
 * curriculum purple #4f3fa0 and a gold #fbb424.
 */

export const HERO = {
  eyebrowLead: "Inspirit VR",
  eyebrowRest: " · Graduation internship project",
  headline: "Molecular structure of DNA, explored and built by hand",
  support:
    "A spaceship carries students into a eukaryotic cell, through the nucleus and into the chromatin, where they explore DNA’s structure and then construct it themselves.",
  role: "VR Design Intern",
  roleRest: " · Inspirit VR",
  roleNote:
    "Research, storyboarding, 3D, UI, sound and learning assessment · December 2019, 4 weeks",
  cta: "Enter the cell",
  coverFigure: "dn-01-cover.jpg",
} as const;

export const FACTS = [
  { label: "Role", value: "VR Design Intern", icon: "idn-icon-role" },
  {
    label: "Context",
    value: "Graduation internship project, Immersive Media Design",
    icon: "idn-icon-grad",
  },
  {
    label: "Platform",
    value: "Google Cardboard (3DoF) · Unity, Maya",
    icon: "idn-icon-headset",
  },
  { label: "Timeline", value: "December 2019 · 4 weeks", icon: "idn-icon-clock" },
] as const;

export const BRIEF = {
  eyebrow: "The brief",
  heading: "Turning a hard-to-picture topic into a place you can stand inside",
  cardLabel: "December 2019",
  cardLead:
    "Inspirit VR invited me to intern on designed experiences for the NGSS K-12 science curriculum, part of a catalogue meant to help students visualize inherently complex subjects.",
  cardBody:
    "The focus: interactive, immersive storytelling, and how interaction and animation in 6DoF VR can teach.",
  figure: "dn-02-brief.jpg",
  figureCaption: "The brief, from my project deck",
  slides: [
    {
      file: "dn-36-inspirit-background.jpg",
      caption: "Inspirit: a virtual library of next-generation science modules",
    },
    {
      file: "dn-37-brief-goals.jpg",
      caption: "Brief: STEM K-12 biology, physics and chemistry",
    },
  ],
} as const;

export const PROCESS = {
  eyebrow: "Design process",
  heading: "Six stages, from requirements to usability testing",
  stages: [
    { n: "1", title: "Understand", body: "Requirements, users and personas" },
    { n: "2", title: "Research", body: "Competitors, latest trends and standard guidelines" },
    { n: "3", title: "Sketch", body: "Gathering ideas: storyboards and illustrations" },
    {
      n: "4",
      title: "Design",
      body: "Visuals and functions: assets, environment, icons, micro-interactions",
    },
    {
      n: "5",
      title: "Development",
      body: "Building those assets, environment, icons and micro-interactions",
    },
    { n: "6", title: "Evaluate", body: "Usability testing to identify improvements" },
  ],
  goalsLabel: "EXPERIENCE GOALS",
  goals: ["Immersion 360", "Human-centric", "Future-proof classrooms", "Engage your senses", "Learn. Excel."],
} as const;

export const RESEARCH = {
  eyebrow: "Biological research",
  heading: "Learning the science before designing the story",
  note: "I mapped the story from cell to nucleus to chromosome to DNA, then down to nucleotides and bonds.",
  facts: [
    {
      title: "Cell → DNA",
      body: "Eukaryotic cells keep DNA in a true nucleus, carried on chromosomes.",
      accent: "#4f3fa0",
    },
    {
      title: "DNA = nucleotides",
      body: "DNA is a polymer built from repeating nucleotide units.",
      accent: "#1ba99c",
    },
    {
      title: "3 parts",
      body: "Each nucleotide: a phosphate, a deoxyribose sugar and a nitrogenous base.",
      accent: "#f59322",
    },
    {
      title: "A–T, G–C",
      body: "Complementary base pairing aligns the two strands, 5′ to 3′.",
      accent: "#fbb424",
    },
  ],
  slides: [
    { file: "dn-03-biological-research.jpg", caption: "Functionality of the cell" },
    { file: "dn-04-nucleotides.jpg", caption: "Structure of a nucleotide" },
    { file: "dn-05-formation-of-bonds.jpg", caption: "Formation of bonds and base pairing" },
  ],
} as const;

export const TECH = {
  eyebrow: "Technical research",
  heading: "Designed for a VR headset any school can afford",
  note: "I designed within the limits of a 3DoF viewer: head rotation is tracked, but not movement through space.",
  cards: [
    {
      title: "Google Cardboard",
      body: "A low-cost, portable fold-out viewer: insert a smartphone and you’re in VR. Its SDK runs on Android and iOS.",
      icon: "idn-icon-card",
      dark: false,
    },
    {
      title: "3 degrees of freedom",
      body: "Roll, pitch and yaw are tracked; walking is not. So the spaceship does the moving, and learners look and select.",
      icon: "idn-icon-rotate",
      dark: false,
    },
  ],
  software: {
    label: "Software",
    rows: ["Unity: the build", "Maya: 3D modelling", "Visual Studio: scripting"],
  },
  slides: [
    {
      file: "dn-30-technical-research.jpg",
      caption: "Technical research: Google Cardboard and 3DoF",
      wide: true,
    },
    { file: "dn-40-nucleotide-strands.jpg", caption: "Nucleotides joining into strands", wide: false },
  ],
} as const;

export const STORYBOARD = {
  eyebrow: "Storyboarding",
  heading: "Every scene planned across four tracks",
  note: "Each moment specifies the environment, animation, audio and any learning assessment (LA).",
  columns: ["Environment", "Animation", "Audio", "Learning assessment"],
  rows: [
    {
      cells: ["In the skybox, two options float: 1. Explore, 2. Construct.", "The two options float", "Space sound", ""],
    },
    {
      cells: [
        "Choosing Explore takes the learner inside the eukaryotic cell by spaceship.",
        "Cell organelles float",
        "Spaceship sound",
        "",
      ],
    },
    {
      cells: [
        "Entering the cell, an assessment pops up.",
        "",
        "Water drop, plus right and wrong answer sounds",
        "Where do you find DNA in the cell? Nucleus and mitochondria (0.5 marks each)",
      ],
    },
    {
      cells: [
        "Into the nucleus, then the chromatin skybox: a 360° loop of DNA around the learner, open at the back like a bracelet. A voiceover starts after 1 second.",
        "DNA scales up and rotates in a wave",
        "Background sound + voiceover",
        "",
      ],
    },
    {
      cells: ["Adenine highlights and a text box pops up: “Adenine”.", "Highlighting adenine", "Notification sound", ""],
    },
  ],
  screens: [
    { file: "dn-c7-main-screen.jpg", caption: "Main screen, scene 1: Explore or Construct", tall: false },
    {
      file: "dn-08-spaceship-control-unit.jpg",
      caption: "Spaceship control unit: “Identifying nucleus cell”",
      tall: true,
    },
  ],
  pages: [
    { file: "dn-24-storyboard-table-2.jpg", caption: "Storyboard, page 2" },
    { file: "dn-25-storyboard-table-3.jpg", caption: "Storyboard, page 3" },
    { file: "dn-43-storyboard-table-4.jpg", caption: "Storyboard, page 4" },
  ],
} as const;

export const MODES = {
  eyebrow: "Two ways in",
  heading: "Explore it first, then construct it yourself",
  explore: {
    title: "Explore",
    body: "A door opens onto a path to the spaceship, which flies off to find the eukaryotic cell. Inside, learners pass through the pore and chromatin into the nucleus, where each base, the hydrogen bonds, then sugar and phosphate pop up with labels.",
    icon: "idn-icon-rocket",
  },
  construct: {
    title: "Construct",
    body: "Colorless DNA floats around the learner. Each base appears with its molecular structure and a question asks for its complementary pair. Every right answer colors a base, until the learner has painted the entire DNA.",
    icon: "idn-icon-puzzle",
  },
  scenes: {
    file: "dn-17-scenes-26-27.jpg",
    caption: "Scenes 26–27: leaving the cell, then choosing Construct opens the door to the DNA lab",
  },
  microLabel: "Microinteractions",
  micro: [
    { file: "dn-28-microinteractions-explore.jpg", caption: "Animated Explore icon states" },
    { file: "dn-26-microinteractions-construct.jpg", caption: "Animated Construct icon states" },
  ],
  script: {
    file: "dn-32-script.jpg",
    caption: "The script: the Explore and Construct storylines",
  },
} as const;

export const BUILD = {
  eyebrow: "Modelling & development",
  heading: "Designed in 2D, modelled in Maya, built in Unity",
  note: "A double-sided shader for the spaceship hull, and a Fresnel glow shader to highlight each part of DNA.",
  row: [
    { file: "dn-09-modelling-maya.jpg", caption: "Modelling in Maya, with a double-sided shader" },
    { file: "dn-10-console-modelling.jpg", caption: "The spaceship console, in engine" },
  ],
  big: {
    file: "dn-11-initial-development.jpg",
    caption: "Initial development stage: the assessment, labelled bases, and the DNA lab",
  },
} as const;

export const JOURNEY = {
  eyebrow: "Scene by scene",
  heading: "Every scene specified for caption, sound, animation and effect",
  note: "All 33 scenes were specified with caption, sound, animation and effect. In order:",
  scenes: [
    { file: "dn-21-scenes-02-03.jpg", caption: "Scenes 2–3: the path to the spaceship" },
    { file: "dn-41-scenes-04-05.jpg", caption: "Scenes 4–5: inside the spaceship" },
    { file: "dn-12-scenes-06-07.jpg", caption: "Scenes 6–7: the door opens on the cell" },
    { file: "dn-23-scenes-08-09.jpg", caption: "Scenes 8–9: the first assessment question" },
    { file: "dn-13-scenes-10-11.jpg", caption: "Scenes 10–11: through the pore and chromatin" },
    { file: "dn-35-scenes-12-13.jpg", caption: "Scenes 12–13: into the nucleus, surrounded by DNA" },
    { file: "dn-39-scenes-14-15.jpg", caption: "Scenes 14–15: adenine and thymine labelled" },
    { file: "dn-38-scenes-16-17.jpg", caption: "Scenes 16–17: guanine and cytosine labelled" },
    { file: "dn-14-scenes-18-19.jpg", caption: "Scenes 18–19: base pairs flip out, hydrogen bonds appear" },
    { file: "dn-15-scenes-20-21.jpg", caption: "Scenes 20–21: sugar and phosphate highlighted" },
    { file: "dn-16-scenes-22-23.jpg", caption: "Scenes 22–23: back out of the nucleus" },
    { file: "dn-31-scenes-24-25.jpg", caption: "Scenes 24–25: leaving the cell" },
    { file: "dn-17-scenes-26-27.jpg", caption: "Scenes 26–27: choosing Construct" },
    { file: "dn-29-scenes-28-29.jpg", caption: "Scenes 28–29: colorless DNA in the lab" },
    { file: "dn-27-scenes-30-31.jpg", caption: "Scenes 30–31: answering to color each base" },
    { file: "dn-18-scenes-32-33.jpg", caption: "Scenes 32–33: the last question, then the score card" },
  ],
  renders: [
    { file: "dn-33-spaceship-interior-scene4.jpg", caption: "Scene 4: “Nucleus cell identified”" },
    { file: "dn-34-spaceship-door-opening.jpg", caption: "Scene 4: the spaceship door opening" },
    { file: "dn-42-cell-exploration-scene5.jpg", caption: "Scene 5: cell exploration" },
  ],
} as const;

export const ASSESSMENT = {
  eyebrow: "Learning assessment",
  heading: "Questions inside the world, and a score at the end",
  quiz: { file: "dn-c3-scene32-quiz.jpg", caption: "Select the complementary base for C: one mark per answer" },
  notes: [
    {
      title: "In-world questions",
      body: "Questions appear at key moments, like “Where do you find DNA in the cell?” as the learner enters the cell.",
    },
    {
      title: "Right and wrong feedback",
      body: "Distinct sounds, and green or red answers, confirm each choice instantly.",
    },
    {
      title: "A score card to finish",
      body: "“Module completed” shows the score and time taken, then returns to the Inspirit main menu.",
    },
  ],
  score: { file: "dn-c6-scene33-score.jpg", caption: "Module completed: score 4, duration 90 seconds" },
  video: {
    prompt: "Drop video",
    file: "dn-video-walkthrough.mp4 (or dn-video-poster.jpg)",
    caption: "Five-minute walkthrough of the full experience",
  },
  mentors: [
    {
      label: "INDUSTRY MENTORS",
      value: "Aditya Vishwanath and Amrutha Vasan, co-founders of Inspirit VR",
    },
    { label: "ACADEMIC MENTOR", value: "Prof. Shakti Banerjee, HOD, Immersive Media Design" },
  ],
  note: "Graduation internship project at Inspirit VR (December 2019, 4 weeks). This page shows my role and contributions.",
} as const;

export const MORE_PROJECTS = {
  label: "MORE PROJECTS",
  allWork: "All work",
  cards: [
    {
      href: "/projects/inspirit-biology",
      kicker: "Previous · VR · Education",
      title: "Inspirit VR Biology",
      body: "Fly a spaceship inside the cell",
      thumbBg: "#1e1b33",
      thumbLabel: "#a99bf0",
    },
    {
      href: "/projects/maternal-care",
      kicker: "Next · Product Design · Healthcare",
      title: "Emergency Delivery Aid",
      body: "Field research into rural childbirth",
      thumbBg: "#0f2a26",
      thumbLabel: "#8fcdbb",
    },
  ],
} as const;
