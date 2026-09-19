import type { Project } from "@/types/portfolio";

/**
 * Editorial (Loop/Heatwave-style) case-study content config.
 * Copy is kept as-is per project — this file only maps existing project copy
 * into the template's slots so any project can adopt the layout.
 */
export type EditorialVisual = { src: string; alt: string; caption?: string };

export type EditorialContent = {
  category: string;
  title?: string;
  description: string;
  meta: { role?: string; client?: string; team?: string; timeline?: string; tools?: string[] };
  scope?: { role?: string; client?: string; team?: string; timeline?: string };
  overview: string;
  problem: { quote: string; body: string; visual?: EditorialVisual };
  phases: { title: string; body: string; visual?: EditorialVisual }[];
  turn: { left: string; right: string };
  finalDesign: {
    statics: EditorialVisual[];
    mobile?: EditorialVisual;
  };
  outcomes: string[];
  reflection: string;
};

export const EDITORIAL_PAGE_CONTENT: Record<string, EditorialContent> = {
  "feed-the-children-truesense": {
    category: "WebAR · Nonprofit Activation",
    description:
      "A QR-triggered, browser-based AR pantry for Feed the Children — meet a real class, stock the shelves, and tap to donate, no app required.",
    meta: {
      role: "Experience Designer",
      client: "Feed the Children × Truesense",
      team: "Truesense fundraising team + XR design (me)",
      timeline: "2022",
      tools: ["WebAR", "8th Wall", "Mobile Browser", "3D Asset Optimization"],
    },
    overview:
      "A web-based AR donation experience for Feed the Children, developed with the Truesense fundraising team. No app install — scanning a code opens the browser and places a shoppable classroom pantry in the donor's room.",
    problem: {
      quote: "Why this needed to exist",
      body:
        "Donors give more when they can see who they're helping. Feed the Children needed an activation that turned abstract statistics — a dollar providing $9 of food and essentials — into something tangible, without an app-download barrier in front of the give-flow.",
      visual: {
        src: "/projects/feed-the-children-truesense/concept-fridge.webp",
        alt: "Storyboard of the QR-triggered AR fridge concept",
        caption: "Storyboard of the QR-triggered AR fridge concept.",
      },
    },
    phases: [
      {
        title: "Scan",
        body: "A printed QR magnet launches the experience in the browser — no app download between the donor and the give-flow.",
      },
      {
        title: "Place",
        body: "8th Wall WebAR places a 3D classroom food pantry on any surface, grounded to the donor's room.",
      },
      {
        title: "Explore",
        body: "Drag the kiosk to move it, open the cabinet doors, and browse a real class roster with the kids' photos.",
      },
      {
        title: "Give",
        body: "A hand-written “Tap here to donate today” sign hands off to the secure feedthechildren.org donation page.",
      },
    ],
    turn: { left: "ACT I — THE PROBLEM", right: "ACT II — THE SOLUTION" },
    finalDesign: {
      statics: [
        {
          src: "/projects/feed-the-children-truesense/ar-kiosk.jpg",
          alt: "WebAR classroom pantry kiosk with the class roster and donate sign",
          caption: "The kiosk: stocked pantry, real class roster, and the hand-written donate sign.",
        },
        {
          src: "/projects/feed-the-children-truesense/ar-pantry.jpg",
          alt: "WebAR pantry cabinet opened, stocked with canned food",
          caption: "Cabinet doors open — interactions mirror physical behavior.",
        },
      ],
      mobile: {
        src: "/projects/feed-the-children-truesense/donation-page.webp",
        alt: "Feed the Children mobile donation page reached from the AR prompt",
        caption: "Hand-off to the secure mobile donation page.",
      },
    },
    outcomes: [
      "A full prototype journey from physical touchpoint → AR → donation page, keeping the donor inside one narrative.",
      "Scan, meet the class, stock the pantry, give — the classroom shelf becomes the ask itself.",
      "No app-download barrier in front of the give-flow.",
    ],
    reflection:
      "Designed for Feed the Children with Truesense — a QR-triggered, browser-based AR pantry that turns a classroom shelf into a donation funnel.",
  },
};

export function editorialContentFor(project: Project): EditorialContent | null {
  return EDITORIAL_PAGE_CONTENT[project.id] ?? null;
}
