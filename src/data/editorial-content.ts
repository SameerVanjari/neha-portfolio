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
  /** Optional "In their words" recognition block (quote + where it was presented + event photos). */
  recognition?: {
    quote: string;
    quoteBy: string;
    presented: string;
    photos: EditorialVisual[];
  };
};

export const EDITORIAL_PAGE_CONTENT: Record<string, EditorialContent> = {
  "vr-training-fiber": {
    category: "Immersive VR · Enterprise Training",
    recognition: {
      quote:
        "We've never seen anything like it in our training modules. Realism and simplicity, exactly what we needed.",
      quoteBy: "VP of Marketing, Millennium",
      presented:
        "Guest lecture, IDC IIT Bombay (2022) and the Seekar Innovation & Entrepreneurship Symposium, MIT ADT University.",
      photos: [
        {
          src: "/images/millennium/present-01.jpg",
          alt: "Live VR demo of the fiber training simulation projected on stage",
          caption: "The simulation live on the big screen — a hand-tracked demo runs above the audience.",
        },
        {
          src: "/images/millennium/present-02.jpg",
          alt: "Neha wearing the Meta Quest 2 headset, presenting at the SEEKERS Innovation and Entrepreneurship Symposium, MIT ADT University",
          caption: "On stage at SEEKERS — Innovation & Entrepreneurship Symposium, MIT ADT University (Sept 2022).",
        },
        {
          src: "/images/millennium/present-03.jpg",
          alt: "Guest lecture at IIT Bombay presenting the ShapesXR storyboarding process",
          caption: "Guest lecture at IDC, IIT Bombay — walking through the ShapesXR storyboarding process.",
        },
      ],
    },
    description:
      "VR fiber-optic field training deployed via ArborXR, published on the Meta Quest Store — a fail-safe place to learn splicing and fault diagnosis.",
    meta: {
      role: "Lead Immersive Experience Designer",
      client: "Millennium",
      team: "XR design (me) · Creative Director · UI/UX · 3D · Dev",
      timeline: "2022",
      tools: ["Meta Quest 2", "Unity 3D", "ShapesXR", "Blender", "ArborXR"],
    },
    overview:
      "Sole experience designer on a Meta Quest 2 VR training program for Millennium. Owned research, client discovery, storyline, interaction design, gamification, ShapesXR storyboarding, asset selection, sound design, and 7+ design documents through to final deployment.",
    problem: {
      quote: "You can't practice on a live line",
      body:
        "Field techs learned splicing and fault diagnosis by shadowing senior technicians and by trial and error on real customer equipment — expensive when it went wrong, and inconsistent as a way to build judgment. Fiber-optic field work is high-stakes and costly to train in situ; technicians need safe, repeatable practice.",
      visual: {
        src: "/images/millennium/hook-squirrel-chew.jpg",
        alt: "Close-up of a squirrel perched on the chewed fiber line in the VR sim",
        caption: "A chewed line up close — the sim's opening problem before a single tool is touched.",
      },
    },
    phases: [
      {
        title: "Research",
        body: "Shadowed field technicians to map the real troubleshooting sequence — not the brief's version of it — before any design started.",
      },
      {
        title: "Storyboard",
        body: "Built gamified learning loops on Meta Quest 2 and previsualized the run as an interactive ShapesXR storyboard before production.",
      },
      {
        title: "Build",
        body: "Modeled the fiber cabinet and hand-tracked splice interactions, with haptic-aligned steps and layered sound design.",
      },
      {
        title: "Deploy",
        body: "Packaged the result for ArborXR fleet management, with guided and free-play modes so skills build in stages.",
      },
    ],
    turn: { left: "ACT I — THE PROBLEM", right: "ACT II — THE SOLUTION" },
    finalDesign: {
      statics: [],
      mobile: undefined,
    },
    outcomes: [
      "Published on the Meta Quest Store and deployed via ArborXR to Millennium's field technician onboarding.",
      "Replacing live-equipment shadowing with a repeatable, fail-safe practice environment.",
      "Enterprise VR training that scales onboarding safely and retains procedural knowledge through play.",
    ],
    reflection:
      "From the first client call to a training program now used in the field — also published by Kinemeric as “Inside the Fiber: VR Field Training for Network Technicians.”",
  },

  "ascension-realty": {
    category: "XR · AR · Real Estate",
    description:
      "A solo, 3-week AR proof-of-concept for 'reality ecommerce' — buyers preview a pre-construction home room-by-room, on the actual lot, from their phone.",
    meta: {
      role: "Solo AR Designer",
      client: "Ascension Realty",
      team: "Me + 2 developers + 2 3D artists",
      timeline: "2025",
      tools: ["AR", "Mobile", "Vuforia", "3D"],
    },
    overview:
      "Ascension Realty wanted to test whether AR could let a buyer preview a home before construction finished — walking room-to-room, on the actual lot, from their phone. Built solo as a three-week proof-of-concept for a 'reality ecommerce' model.",
    problem: {
      quote: "You're selling a house that doesn't exist yet",
      body:
        "Pre-construction listings rely on flat floor plans and renders, leaving buyers to imagine scale, light, and flow for themselves. Ascension Realty needed an unbuilt home to feel real enough to commit to.",
      visual: {
        src: "/images/ascension-01.png",
        alt: "Ascension Realty AR still",
        caption: "Room-by-room preview on the actual lot — placement anchored to the phone.",
      },
    },
    phases: [
      {
        title: "Ideate",
        body: "Full ownership of ideation and storyboard for the 'reality ecommerce' concept — what a buyer needs to feel before committing.",
      },
      {
        title: "Curate",
        body: "3D assets pulled from TurboSquid and optimized for mobile AR — real estate scale without the framerate cost.",
      },
      {
        title: "Materialize",
        body: "Holographic material shaders gave placement feedback, supported by spatial UI and audio.",
      },
      {
        title: "Validate",
        body: "On-site testing for placement accuracy, in sync with two developers and two 3D artists.",
      },
    ],
    turn: { left: "ACT I — THE PROBLEM", right: "ACT II — THE SOLUTION" },
    finalDesign: {
      statics: [
        { src: "/images/ascension-02.png", alt: "Ascension Realty AR still 002", caption: "Walkthrough: room-to-room preview from the buyer's phone." },
        { src: "/images/ascension-03.png", alt: "Ascension Realty AR still 004", caption: "Scale, light, and flow readable before construction finishes." },
        { src: "/images/ascension-04.png", alt: "Ascension Realty AR still 001", caption: "Renderer-light asset set keeps the walkthrough smooth on mobile." },
      ],
      mobile: {
        src: "/images/ascension-05.png",
        alt: "Ascension Realty AR still 003",
        caption: "On the lot: the phone becomes the model home.",
      },
    },
    outcomes: [
      "Delivered a working proof-of-concept for 'reality ecommerce' in 3 weeks.",
      "Validated AR walkthroughs as a pre-construction sales tool for Ascension Realty.",
    ],
    reflection:
      "Ascension Realty wanted an unbuilt home to feel real enough to commit to — three weeks and one phone later, buyers could walk it.",
  },

  "made-for-joy": {
    category: "3D · Motion",
    description:
      "A joy-driven 3D motion piece — a camera-choreographed animation and rendered stills that give a brand's emotional core room to move.",
    meta: {
      role: "Director & 3D Designer",
      timeline: "2024",
      tools: ["Blender", "Camera Choreography", "Lighting", "Rendering"],
    },
    overview:
      "A joy-driven 3D motion piece — a camera-choreographed animation and rendered stills that give a brand's emotional core room to move. Built as a self-contained piece, from concept and camera direction through to final render.",
    problem: {
      quote: "Joy, without a product to anchor it",
      body:
        "Turn a feeling — joy — into something tangible, with no product or interface to anchor the story to. The emotion had to carry the design alone.",
      visual: {
        src: "/images/made-for-joy-01.png",
        alt: "Made for Joy rendered still",
        caption: "A rendered still from the final piece.",
      },
    },
    phases: [
      {
        title: "Concept",
        body: "Held the piece to one brief: joy, nothing else — no product, no interface, no copy to lean on.",
      },
      {
        title: "Choreograph",
        body: "Directed camera choreography, lighting, and asset direction end-to-end.",
      },
      {
        title: "Iterate",
        body: "Rendered, reviewed, and re-lit until the tone landed — the emotion is the checklist.",
      },
    ],
    turn: { left: "ACT I — THE PROBLEM", right: "ACT II — THE SOLUTION" },
    finalDesign: {
      statics: [
        { src: "/images/made-for-joy-01.png", alt: "Made for Joy render still 01", caption: "Final render — the joy beat." },
        { src: "/images/made-for-joy-02.png", alt: "Made for Joy render still 02", caption: "Rendered still for the brand's marketing cuts." },
      ],
      mobile: undefined,
    },
    outcomes: [
      "A finished 3D camera animation and rendered stills.",
      "Ready to carry the brand across motion and marketing.",
    ],
    reflection:
      "Built as a self-contained piece, from concept and camera direction through to final render.",
  },

  "hbo-charm-city-kings": {
    category: "AR · Social Campaign",
    description:
      "A 2-week Spark AR filter campaign for HBO Max's Charm City Kings — 'They call me…' face filters that turn fans into the movie's Baltimore nicknames.",
    meta: {
      role: "AR Filter Designer",
      client: "HBO Max",
      timeline: "2020",
      tools: ["Spark AR", "Blender", "Instagram", "Social Campaign"],
    },
    overview:
      "A social AR campaign for HBO Max's first exclusive movie, Charm City Kings — Instagram face filters and a character name generator that let fans claim a Baltimore street name of their own.",
    problem: {
      quote: "A moment of participation, not a passive view",
      body:
        "Charm City Kings arrived on HBO Max with no theatrical release, so awareness had to be won in feeds rather than lobbies. The campaign needed shareable, participatory content that put the movie's world — Baltimore dirt-bike culture, nicknames, swagger — into fans' own faces.",
    },
    phases: [
      {
        title: "Research",
        body: "Pulled visual language from the film's dirt-bike and Baltimore street culture — the nicknames were the hook.",
      },
      {
        title: "Build",
        body: "Built the AR triggers and overlays in Spark AR and Blender: a polaroid frame that dots the viewer's face and stamps a random street name.",
      },
      {
        title: "Align",
        body: "Aligned type and metrics to HBO Max's campaign guidelines — one visual language from filter to feed.",
      },
      {
        title: "Launch",
        body: "Cross-device tested and submitted to Instagram and Facebook ahead of the October 8 premiere.",
      },
    ],
    turn: { left: "ACT I — THE PROBLEM", right: "ACT II — THE SOLUTION" },
    finalDesign: {
      statics: [
        { src: "/projects/hbo-charm-city-kings/mouse-and-blax-poster.jpg", alt: "Mouse and Blax — Charm City Kings filter poster", caption: "They call me… Mouse and Blax." },
        { src: "/projects/hbo-charm-city-kings/they-call-me-blax-poster.jpg", alt: "They call me Blax — Charm City Kings filter poster", caption: "They call me Blax." },
        { src: "/projects/hbo-charm-city-kings/they-call-me-mouse-poster.jpg", alt: "They call me Mouse — Charm City Kings filter poster", caption: "They call me Mouse." },
        { src: "/projects/hbo-charm-city-kings/they-call-me-nicki-poster.jpg", alt: "They call me Nicki — Charm City Kings filter poster", caption: "They call me Nicki." },
      ],
      mobile: undefined,
    },
    outcomes: [
      "Shipped as an official HBO Max campaign filter, live on Instagram and Facebook.",
      "Fans shared their filter selfies with new nicknames — turning a passive trailer moment into organic promotion.",
    ],
    reflection:
      "Built for HBO Max — the Charm City Kings Instagram filters and name generator that shipped with the streaming premiere campaign.",
  },
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
