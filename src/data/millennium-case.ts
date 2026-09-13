import type { CaseStudyTocItem } from "@/components/CaseStudyToc";

export const MILLENNIUM_TOC: CaseStudyTocItem[] = [
  { id: "overview", label: "Story" },
  { id: "problem", label: "Problem" },
  { id: "about", label: "Millennium" },
  { id: "role", label: "Role" },
  { id: "concept", label: "Concept" },
  { id: "world", label: "World" },
  { id: "decisions", label: "Decisions" },
  { id: "sound", label: "Sound" },
  { id: "outcomes", label: "Outcomes" },
  { id: "credits", label: "Credits" },
  { id: "related", label: "Related" },
  { id: "contact", label: "Contact" },
];

export const MILLENNIUM_DECISIONS = [
  {
    name: "Gaze",
    body: "The ring is the only progress affordance. No controller press, so the panel needs no button for the primary action. A gaze-held reticle fills over time.",
  },
  {
    name: "Skip",
    body: "Skip step is always secondary and always bottom-left, so it never competes with the task.",
  },
  {
    name: "Timer",
    body: "Time reads as a label, not a countdown: pressure without a fail state.",
  },
  {
    name: "Score",
    body: "A live count in the header is the reward loop. It moves on every correct pick. Feedback lands on the score counter, not on the tile itself.",
  },
  {
    name: "Grid",
    body: "Consistent columns at panel width keep every tile inside a comfortable head turn.",
  },
  {
    name: "Penalty",
    body: "Wrong picks are not blocked. They cost seconds, which keeps the run moving instead of stalling on a mistake.",
  },
  {
    name: "Three lines",
    body: "Never more than three numbered lines on an instruction card. Beyond that, users stop reading in headset.",
  },
  {
    name: "Tool render",
    body: "A render of the actual tool answers which object faster than a name would.",
  },
  {
    name: "Placement",
    body: "The instruction card is body-locked and tilted toward the work surface, so it never floats disconnected from the task.",
  },
  {
    name: "Attached",
    body: "In-world labels pin to the exact part needing action, not a separate panel the user has to look away to find.",
  },
  {
    name: "Imperative",
    body: "Short command verbs (Open, Close, Place) read faster mid-task than a full instruction sentence.",
  },
  {
    name: "Continuous",
    body: "Guidance persists through the entire splicing sequence, distinct from the step card's single fixed panel, so a fine-motor, multi-part task does not lose the user between steps.",
  },
];

export const MILLENNIUM_TOOLS = [
  "Unity 3D",
  "ShapesXR",
  "Blender",
  "Autodesk 3ds Max",
  "Autodesk Maya",
  "Sketch",
  "Figma",
  "Adobe Audition",
  "Adobe Premiere",
  "Adobe After Effects",
  "Adobe Illustrator",
  "Adobe Photoshop",
  "ArborXR",
];
