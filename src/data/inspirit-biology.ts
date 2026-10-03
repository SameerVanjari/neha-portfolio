/**
 * Inspirit VR Biology case study — content transcribed from Figma
 * "Website Wireframes" → "Inspirit VR Biology — Case study (1440)" (node 427:217).
 *
 * The Figma frame is a 1440px desktop layout with 202px gutters, so the
 * content column is 1036px wide. Every figure is a labelled drop-frame in the
 * design; the `bv-*` exports now ship from the client's Drive
 * "Inspirit-Biology-Figma-images" set and land in /case/inspirit-biology/
 * under the exact filenames the design specifies, so the component resolves
 * each slot by name and a replacement export only has to keep the name.
 *
 * Palette sampled off the same frame: cool paper #f1f2f7, hero ink #1c1a2e,
 * night band #1e1b33, deep #15132a, curriculum purple #5b4ba8, wristband red
 * #e8343e.
 */

export const HERO = {
  eyebrowLead: "Inspirit VR",
  eyebrowRest: " · Biology · NGSS high school",
  headline: "Fly a spaceship inside the cell to learn how life copies itself",
  support:
    "Four biology modules, from building a eukaryotic cell to transcription, DNA replication and translation, storyboarded and designed for HTC Vive and Oculus Quest.",
  role: "VR Design Intern",
  roleRest: " · Inspirit VR",
  roleNote: "Research, storyboarding, environment, UI/UX and testing · 6 weeks",
  cta: "Board the spaceship",
  shipShot: {
    file: "bv-15-spaceship-exterior.jpg",
    width: 560,
    height: 441,
    top: 150,
  },
} as const;

export const FACTS = [
  { label: "Role", value: "VR Design Intern", icon: "icon-role" },
  { label: "Modules", value: "Eukaryotic cell, transcription, DNA replication, translation", icon: "icon-dna" },
  { label: "Platform", value: "6DoF VR: HTC Vive and Oculus Quest", icon: "icon-headset" },
  { label: "Duration", value: "6 weeks", icon: "icon-clock" },
] as const;

export const CURRICULUM = {
  eyebrow: "Inspirit VR curriculum",
  heading: "Five-minute experiences that make core science feel real",
  note: "A high-school curriculum across biology, chemistry and physics, aligned with the Next Generation Science Standards.",
  categories: [
    {
      title: "Experiment",
      body: "Gamified experiments for active learning and deep engagement.",
      icon: "icon-flask",
      tile: "#c8f0df",
    },
    {
      title: "Explore",
      body: "New worlds, macroscopic to microscopic, that spark curiosity and reasoning.",
      icon: "icon-search",
      tile: "#d7eef9",
    },
    {
      title: "Exercise",
      body: "Quizzes, brain teasers and immersive puzzles for long-term retention.",
      icon: "icon-dumbbell",
      tile: "#fde9c4",
    },
    {
      title: "Empathize",
      body: "Perspective-taking that nurtures interest and sensitivity toward science.",
      icon: "icon-heart",
      tile: "#fbdce0",
    },
  ],
  figure: { file: "bv-03-subject-tiles.jpg", caption: "Biology, Physics and Chemistry tracks" },
} as const;

export const BRIEF = {
  eyebrow: "The brief",
  heading: "From storyboard to development, for four biology modules",
  cardEyebrow: "Brief",
  card: "Design immersive, engaging experiences for the assigned modules, from storyboarding the experience to directing the development approach.",
  rolesEyebrow: "My role",
  roles: [
    {
      title: "Design research",
      body: "Learning the biological terminology and theory, how each organelle works, and the best way to teach it: visually, through sound, and through interaction.",
      icon: "icon-search-dim",
      wide: false as const,
    },
    {
      title: "Creative content",
      body: "Filtering scientific content into creative ideas, and finding the right moment to immerse the learner in the action.",
      icon: "icon-pen",
      wide: false as const,
    },
    {
      title: "Storyboarding",
      body: "The entire experience, from start to finish, for every module.",
      icon: "icon-film",
      wide: false as const,
    },
    {
      title: "Designing (UI/UX)",
      body: "Environment, characters, interaction patterns, markers, voiceovers, color, UI, sound, information architecture, wireframes, gamification and guidelines.",
      icon: "icon-layout",
      wide: true as const,
    },
    {
      title: "Testing",
      body: "Observing learners’ actions in the headset, recording their feedback, and collecting team suggestions.",
      icon: "icon-check",
      wide: true as const,
    },
  ],
} as const;

export const TOPICS = {
  eyebrow: "Biology topics",
  heading: "Four modules, each a journey through the cell",
  modules: [
    {
      title: "1 · Building a eukaryotic cell",
      file: "bv-05-topic-eukaryotic-cell.jpg",
      width: 510,
      height: 290,
    },
    {
      title: "2 · Transcription",
      file: "bv-06-topic-transcription.jpg",
      width: 510,
      height: 290,
    },
    {
      title: "3 · DNA replication",
      file: "bv-07-topic-dna-replication.jpg",
      width: 510,
      height: 290,
    },
    {
      title: "4 · Translation",
      file: "bv-08-topic-translation.jpg",
      width: 510,
      height: 290,
    },
  ],
} as const;

export const STORYBOARDING = {
  eyebrow: "Storyboarding",
  heading: "Every module drawn frame by frame, before it was built",
  note: "Hand-drawn storyboards set the flow, the hints and the moment each process completes.",
  row1: [
    {
      file: "bv-09-sb-eukaryotic-cell.jpg",
      caption: "Building a eukaryotic cell: assemble the organelles, then raise both controllers to finish",
      width: 510,
      height: 660,
    },
    {
      file: "bv-10-sb-spaceship-tutorial.jpg",
      caption: "Spaceship tour: a tutorial on flying with the controllers",
      width: 510,
      height: 856,
    },
  ],
  big: {
    file: "bv-11-sb-nucleus.jpg",
    caption: "Entering the nucleus: choosing transcription or DNA replication",
    width: 1036,
    height: 1176,
  },
  row2: [
    {
      file: "bv-12-sb-transcription.jpg",
      caption: "Transcription: initiation, elongation, termination, intron splicing",
      width: 340,
      height: 625,
    },
    {
      file: "bv-13-sb-dna-replication.jpg",
      caption: "DNA replication: helicase to telomerase",
      width: 340,
      height: 540,
    },
    {
      file: "bv-14-sb-translation.jpg",
      caption: "Translation: codons, anticodons and the polypeptide",
      width: 324,
      height: 746,
    },
  ],
} as const;

export const SHIP = {
  eyebrow: "Design",
  heading: "A spaceship that carries the learner through the cell",
  note: "The spaceship is both the vehicle and the classroom: learners fly it between organelles and land where each process happens.",
  row1: [
    {
      file: "bv-15-spaceship-exterior.jpg",
      caption: "Spaceship exterior",
      width: 510,
      height: 402,
    },
    {
      file: "bv-16-spaceship-interior.jpg",
      caption: "Spaceship interior",
      width: 510,
      height: 326,
    },
  ],
  row2: [
    {
      file: "bv-17-spaceship-console.jpg",
      caption: "Console: take off, land, stabilize",
      width: 336,
      height: 222,
    },
    {
      file: "bv-18-spaceship-door.jpg",
      caption: "Door-side details",
      width: 336,
      height: 216,
    },
    {
      file: "bv-19-launchpad.jpg",
      caption: "The launchpad",
      width: 336,
      height: 203,
    },
  ],
  gloveFigure: { file: "bv-20-glove-design.jpg", width: 520, height: 580 },
  gloveNote: {
    eyebrow: "Glove design",
    title: "The smart element in the environment",
    body: "A glove lets learners hover over and point at elements in each space. I explored an alternative design before landing on the final one.",
  },
} as const;

export const MARKERS = {
  eyebrow: "Markers & UI",
  heading: "A small visual language for guiding learners in 3D",
  note: "Standard markers on the spaceship’s display, plus controller instructions for both headsets.",
  figures: [
    {
      file: "bv-21-standard-markers.jpg",
      caption: "Guiding icon, identification mark, direction UI, take-off and landing",
      width: 400,
      height: 231,
    },
    {
      file: "bv-22-controller-uis.jpg",
      caption: "Controller UIs for HTC Vive (left) and Oculus Quest (right)",
      width: 620,
      height: 474,
    },
  ],
  subEyebrow: "6DoF application · HTC Vive and Oculus Quest",
  app: [
    {
      file: "bv-23-home-6dof.jpg",
      caption: "Home: Biology, Physics and Chemistry",
      width: 510,
      height: 263,
    },
    {
      file: "bv-24-biology-menu.jpg",
      caption: "Biology menu, with type standards in Stolz",
      width: 510,
      height: 324,
    },
  ],
  video: {
    file: "bv-video-walkthrough.mp4 (or bv-video-poster.jpg)",
    caption: "In-headset walkthrough",
    width: 1036,
    height: 1001,
    poster: "bv-video-poster.jpg",
    videoSrc: "/videos/inspirit-biology-walkthrough.mp4",
  },
  mentors: [
    {
      label: "INDUSTRY MENTORS",
      value: "Aditya Vishwanath and Amrutha Vasan, co-founders of Inspirit VR",
    },
    {
      label: "ACADEMIC MENTOR",
      value: "Prof. Shakti Banerjee",
    },
  ],
  footnote: "Created during my VR design internship at Inspirit VR (Project 2, 6 weeks). This page shows my role and contributions.",
} as const;

export const MORE_PROJECTS = {
  label: "MORE PROJECTS",
  allWork: "All work",
  cards: [
    {
      href: "/projects/inspirit-physics",
      kicker: "Previous · VR · Education",
      title: "Inspirit VR Physics",
      body: "A sci-fi carnival where physics is something you do",
      thumbBg: "#232325",
      thumbLabel: "#f5b21b",
    },
    {
      href: "/projects/inspirit-dna",
      kicker: "Next · VR · Education",
      title: "Inspirit VR DNA",
      body: "Molecular structure of DNA, explored and built by hand",
      thumbBg: "#1f1e4a",
      thumbLabel: "#fbb424",
    },
  ],
} as const;
