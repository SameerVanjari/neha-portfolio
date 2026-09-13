/**
 * Millennium — "A Broken Mile" VR training case study.
 * Content transcribed from Figma page "Final Refined Portfolio Ready Presentation"
 * (file: Millennium Final, page id 2015:2). Copy is Neha's own case-study text.
 * Color scheme sampled from the same Figma page (dark + signal red).
 */

export const MILLENNIUM_FIGMA_THEME = {
  bg: "#19191B",
  surface: "#1F1F1F",
  surfaceDeep: "#151516",
  text: "#FFFFFF",
  muted: "#B6B6BC",
  figmaMuted: "#626262",
  accent: "#FF1E1E",
  accentStrong: "#DC021D",
  border: "rgba(255,255,255,0.10)",
  accentBorder: "rgba(255,30,30,0.28)",
} as const;

export const MILLENNIUM_HERO = {
  kicker: "Immersive VR Training — for Fiber Optic Technicians",
  award: "A BROKEN MILE · 7th International VR Awards Finalist",
  platform: "Meta Quest 2 | Deployed via ArborXR & Meta Store",
  role: "Lead Immersive Experience Designer · CXR Agency (now Kinemeric)",
  date: "September 1, 2023 · Duration: 3 Months",
} as const;

export const MILLENNIUM_PROBLEM = {
  eyebrow: "01 / PROBLEM & SCOPE",
  hmw: "How might we standardize fiber optic repair training across distributed technician teams, without sacrificing hands-on skill-building or safety?",
  problemStatement:
    "Training fiber optic technicians at scale is expensive, inconsistent, and time-intensive. Classroom and video-based methods fail to build real hands-on competence, and mistakes in the field carry genuine safety and service risk.",
  designChallenge:
    "Translate a highly technical, physical, safety-critical procedure into a simulation realistic enough to build actual skill, with none of the real-world risk of live fieldwork.",
  scope:
    "End-to-end experience design for a native Meta Quest 2 application, client research, design documentation, storyboarding, spatial and UI/UX design, 3D asset direction, sound design, and deployment preparation for enterprise rollout via ArborXR.",
  goals:
    "Build an interactive, gamified training program that mirrors real field conditions, produces measurable outcomes, and deploys securely at scale through ArborXR's enterprise VRDM.",
  disclaimer:
    "This project was designed for Millennium. Brand colors and visual identity elements are used here for case study representation purposes.",
} as const;

export const MILLENNIUM_ABOUT = {
  eyebrow: "02 / ABOUT MILLENNIUM & PARTNERS",
  title: "Who was behind this build",
  body: "Millennium supplies fiber optic cable, equipment, and engineering support to broadband builders across 20+ U.S. locations. The company operates several specialized divisions — Rentals, GeoSpatial Engineering, Infrastructure Fund, and Veteran Supply — supporting fiber builds from planning through deployment. This program was built for their field technician workforce.",
  divisions: [
    "Millennium Rentals",
    "Millennium GeoSpatial",
    "Millennium Infrastructure Fund",
    "Veteran Supply",
  ],
  partners: [
    {
      name: "Kinemeric",
      note: "formerly CXR Agency",
      body: "Designed and developed the experience end-to-end, from research through deployment.",
    },
    {
      name: "ArborXR",
      note: "Enterprise VRDM",
      body: "VR device management platform — handled enterprise distribution, content updates, and completion tracking.",
    },
    {
      name: "Meta Quest Store",
      note: "Public channel",
      body: "Public distribution channel for the Meta Quest 2 build.",
    },
  ],
} as const;

export const MILLENNIUM_ROLE = {
  eyebrow: "03 / MY CONTRIBUTIONS & TOOLKIT",
  title: "From Research to Launch",
  team: "XR Designer (me) · Creative Director · UI/UX Team · 3D Team (3–4) · Developers (3)",
  streams: [
    {
      name: "Discovery & Direction",
      body: "Led client research and requirements gathering across calls from day one. Authored 8 core design documents defining the client, the build, and the approach. Synced continuously with the Creative Director to shape and approve the plan.",
    },
    {
      name: "Concept & Content",
      body: "Built early wireframes as an interactive ShapesXR storyboard, approved before production. Directed 3D asset creation — asset list, references, review, and final approval. Designed sound across environment, voice, and UI, plus supporting content documentation.",
    },
    {
      name: "Technical & Production",
      body: "Documented how real tools and materials should function and feel in VR hands. Collaborated directly with developers on haptic feedback mechanics. Coordinated daily across UI/UX, 3D, and dev teams; tracked progress for the PM and Creative Director.",
    },
    {
      name: "Quality & Launch",
      body: "Ran build testing cycles and delivered detailed iteration feedback. Designed gamification systems: scoring, level selection, and the technician-role transition. Designed ArborXR deployment assets and the experience trailer.",
    },
  ],
} as const;

export const MILLENNIUM_CONCEPT = {
  eyebrow: "04 / CONCEPT & STORYBOARDING",
  title: "Where the story actually came from",
  asking: {
    name: "Asking the Right Questions",
    body: "Before any concept work started, I pushed past the creative brief and went straight to Millennium's technicians with technical questions: how is fiber optic equipment actually mounted on a utility pole in the field? How is the hardware configured? What does a technician's real task sequence look like, in order, from arrival to final splice? Those answers — not assumptions — became the spatial and procedural backbone of the entire simulation. Every pole height, cable routing, and tool sequence in the final build traces back to that research.",
  },
  storyboard: {
    name: "Storyboarding in ShapesXR",
    body: "With the real workflow understood, I built the experience's narrative and early spatial layout as an interactive storyboard directly in ShapesXR, previsualizing camera viewpoints, environment scale, and the user's path through the scene before a single production asset was built. This was reviewed and approved by the Creative Director as the foundation the 3D and dev teams then built against.",
    caption:
      "Early ShapesXR previsualization, establishing the neighborhood environment and the utility pole where the training scenario begins.",
  },
} as const;

export const MILLENNIUM_WORLD = {
  eyebrow: "05 / 3D ENVIRONMENT & ASSET PRODUCTION",
  title: "Building the world technicians would recognize",
  blocks: [
    {
      name: "From Storyboard to Environment",
      body: "With the storyboard approved, the neighborhood, utility poles, and field equipment moved from ShapesXR pre-visualization into full 3D production. I directed the 3D team on scale, placement, and fidelity, making sure the environment matched the real spatial references gathered during discovery, not just the storyboard's rough layout.",
    },
    {
      name: "Asset Direction",
      body: "Every tool, splice enclosure, and piece of field equipment needed to be recognizable to an actual technician. I built the asset list and reference documentation, reviewed and approved each model as it came in, and built select assets directly where needed.",
    },
    {
      name: "Asset Pipeline & Optimization",
      body: "With training scenarios relying on fine motor interactions, precision models of tools and hardware were vital. We authored clean utility pole systems, splice enclosures, fiber cable runs, and realistic hand tools in Blender. To secure solid 90Hz performance in VR, we optimized geometries with tight LOD curves, compressed texture maps via aggressive atlasing, and combined draw calls wherever possible.",
    },
  ],
  captions: [
    "Millennium-branded field vehicles placed on-site, grounding the training scenario in the client's real fleet identity.",
    "Modeled equipment detail — the splice case, fusion splicer, and pole hardware were built to match real technician tools, since the training depends on the user recognizing and handling them correctly.",
  ],
} as const;

export const MILLENNIUM_WIREFRAMES = {
  eyebrow: "06 / UX & DESIGN DECISIONS",
  title: "Before the polish: Wireframes",
  lede: "Low-fidelity structure for the core task flow, built before any visual design was applied — establishing header state, panel placement, and primary/secondary actions for the dev and UI teams to build against.",
  notes: [
    "Gaze-held reticle fills over time, no controller input needed to confirm the task.",
    "Never more than three numbered lines — the tool render on the right answers “which object” faster than a name would.",
    "Score is set before the name field; the technician is confirming a result, not competing blind.",
    "Entry point after launch — task count and time estimate shown before the technician commits to a full run.",
    "Comfort settings a technician sets once and forgets; Help stays pinned in the lower-left rather than living in this menu.",
    "The one screen in the system built for a supervisor, not a technician — turns individual headset runs into fleet-level accountability, pulling status directly from ArborXR's device management.",
    "Segmented practice retrains a single failed step without repeating the full ~18-minute run. Segment scores don't touch the record.",
    "Three tiers trade guidance for realism; Assessment removes skip-step entirely once a score needs to count.",
    "Eight named items, five correct — feedback lands on the score counter in the header, not on the tile itself.",
    "Time, tasks, and penalty are the only three numbers shown, keeping the scoring model legible at a glance.",
    "Two exits only — main menu or lesson selection, no third path off this screen.",
  ],
  shippedTitle: "From structure to shipped decisions",
  shippedLede:
    "Each wireframe above became a specific, deliberate interface decision once it reached the headset. Three examples, with the reasoning behind them.",
  shippedGroups: [
    {
      name: "Problem Identification",
      decisions: ["GAZE — Ring is the only progress affordance, no controller press, so the panel needs no button for the primary action.", "SKIP — Skip step is always secondary and always bottom-left, so it never competes with the task.", "TIMER — Time reads as a label, not a countdown: pressure without a fail state."],
    },
    {
      name: "Select the Correct Materials",
      decisions: ["GRID — Consistent columns at panel width keep every tile inside a comfortable head turn.", "SCORE — A live count in the header is the reward loop; it moves on every correct pick.", "PENALTY — Wrong picks are not blocked; they cost seconds, which keeps the run moving instead of stalling on a mistake."],
    },
    {
      name: "Step-by-Step Instruction Card",
      decisions: ["THREE LINES — Never more than three instructions per card; beyond that, users stop reading in headset.", "TOOL RENDER — A render of the actual tool answers “which object” faster than a name alone does.", "PLACEMENT — Card is body-locked and tilted toward the work surface, so it never floats disconnected from the task."],
    },
    {
      name: "In-World Contextual Labels",
      decisions: ["ATTACHED — The label is pinned to the exact part needing action, not a separate panel the user has to look away to find.", "IMPERATIVE — Short command verbs (Open, Close, Place) read faster mid-task than a full instruction sentence would.", "CONTINUOUS — Guidance persists through the entire splicing sequence; distinct from the step card's single fixed panel, this is what keeps a fine-motor, multi-part task from losing the user between steps."],
    },
  ],
} as const;

export const MILLENNIUM_SOUND = {
  eyebrow: "07 / SOUND DESIGN",
  title: "Layering the audio that guides every step",
  hierarchy:
    "Sound needed to guide a technician through a fine-motor procedure without ever pulling focus from the task in front of them. I structured the audio as a layered hierarchy — ambient environment underneath everything, with UI, interaction, voice, and character audio layered on top only when they earned the user's attention.",
  role: "I designed the sound across every layer of that hierarchy — environment ambience, UI feedback, interaction cues, voice-guided instruction, and character audio for the squirrel — and wrote the content documentation defining what every voice line and on-screen instruction needed to say. I synced directly with the UI design team throughout so the audio and the instructional text always landed together, never in conflict or out of step with each other.",
  layers: [
    { name: "Background Score", note: "Ambient Environment" },
    { name: "UI Sounds", note: "Selection, hover, correct & incorrect answers" },
    { name: "Interaction Sound", note: "Tools, materials, loading ring, markers, accidental-fall cues" },
    { name: "Voice Over", note: "Guided audio for task steps & quiz prompts" },
    { name: "Character Sounds", note: "Squirrel: grinning, walking, chewing wires" },
  ],
} as const;

export const MILLENNIUM_OUTCOMES = {
  eyebrow: "08 / OUTCOMES & SUCCESS",
  title: "What changed once it shipped",
  quote: "“We've never seen anything like it in our training modules. Realism and simplicity, exactly what we needed.”",
  quoteBy: "— VP of Marketing, Millennium",
  outcomes: [
    "Reduced training time and cost compared to traditional classroom and video-based methods.",
    "Improved safety protocols and higher quality standards in actual fieldwork.",
    "Raised overall skill levels and consistency across technicians trained on the program.",
    "Users praised the realism and simplicity of the experience across training sessions.",
  ],
  presented: "Guest lecture, IDC IIT Bombay (2022) and the Seekar Innovation & Entrepreneurship Symposium, MIT ADT University.",
} as const;

export const MILLENNIUM_CREDITS = {
  eyebrow: "09 / CREDITS",
  title: "One last thing",
  thanks:
    "Thank you for reading through the full story, from the first client call to a training program now used in the field.",
  published:
    "This project is also published by Kinemeric as “Inside the Fiber: VR Field Training for Network Technicians” — the case study above reflects my own role and contributions on the team.",
  tryIt: "Try it yourself: The Broken Mile is live on the Meta Quest Store — meta.com/experiences/the-broken-mile",
} as const;
