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

};

export function editorialContentFor(project: Project): EditorialContent | null {
  return EDITORIAL_PAGE_CONTENT[project.id] ?? null;
}
