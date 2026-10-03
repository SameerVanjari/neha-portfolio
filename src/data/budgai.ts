/**
 * BudgAI (Chatoor.ai) case study — content transcribed from Figma
 * "Website Wireframes" → "BudgAI (Chatoor.ai) — Case study (1440)" (node 406:217).
 *
 * The Figma file is a 1440px desktop layout with 202px gutters, so the
 * content column is 1036px wide.
 *
 * Figure sources: every drop-frame in the wireframe (node 406:217) maps to an
 * export from the design's presentation deck — "Chatoor-AI-UX" slides
 * (file WmJkLkpsPb1kMlq3XHR3aX). The final app screens (slides 10-13) are
 * rendered from their own Figma nodes; persona portraits and the cover phone
 * render come from the deck's bitmap fills. Assets already exported live in
 * /case/budgai/, named after the wireframe's own slot tags (cb-*.png).
 * Anything without a matching export keeps its labelled drop-frame.
 */

export const HERO = {
  eyebrowLead: "BudgAI",
  eyebrowRest: " · Personal finance · AI + UX",
  headline: "One global money app, with answers you can check",
  support:
    "Scan to pay, send abroad at live rates, split with anyone, and ask plain questions about your spending. AI suggests; you decide.",
  role: "Product Design Consultant",
  roleRest: " · Chatoor.ai",
  roleNote: "UX, UI and interaction design · 2024 app, redesigned as BudgAI in 2026",
  cta: "Try the prototype",
  // The two hero phones: home (taller, left) and global (smaller, right).
  phones: [
    {
      file: "cb-hi-home.png",
      src: "/case/budgai/cb-hi-home.png",
      alt: "BudgAI Home dashboard: total balance in dollars, quick actions, renewals and budget",
      height: 563,
      width: 260,
    },
    {
      file: "cb-hi-global.png",
      src: "/case/budgai/cb-hi-global.png",
      alt: "BudgAI Global screen: currency wallets valued in dollars at live rates",
      height: 498,
      width: 230,
    },
  ],
} as const;

export const FACTS = [
  { label: "Role", value: "Product Design Consultant, Chatoor.ai", icon: "icon-role" },
  { label: "Platform", value: "Mobile and web app", icon: "icon-phone" },
  { label: "Scope", value: "Research, flows, IA, UI and interaction", icon: "icon-globe" },
  { label: "Timeline", value: "2024 consulting", icon: "icon-clock" },
] as const;

export const PROBLEM = {
  eyebrow: "The problem",
  heading: "One app to pay, another to send, a spreadsheet to track",
  cardEyebrow: "What goes wrong",
  card:
    "People pay with one app, send money abroad with another, and track it in a spreadsheet, so fees hide inside exchange rates and subscriptions renew unnoticed.",
  goalsEyebrow: "Goals",
  goals: [
    { title: "Pay anywhere, with live rates upfront", icon: "icon-scan" },
    { title: "Simplify tracking and give clear visual insights", icon: "icon-chart" },
    { title: "Enable shared budgets and splitting", icon: "icon-split" },
    { title: "AI answers from your own transactions", icon: "icon-chat" },
  ],
} as const;

export const EVOLUTION = {
  eyebrow: "From Chatoor AI to BudgAI",
  heading: "An India-first expense tracker became a global money app",
  shifts: [
    {
      from: "India-first",
      to: "Global",
      body: "Multi-currency wallets and international transfers",
    },
    {
      from: "UPI-only",
      to: "Any rail",
      body: "QR, cards, bank transfer, Apple Pay, UPI and PIX",
    },
    {
      from: "Tracking",
      to: "Answers",
      body: "Ask a question, get an answer grounded in your data",
    },
    {
      from: "Two personas",
      to: "Three",
      body: "Tomás tests the cross-border use case",
    },
  ],
  figure2024Caption: "2024 at Chatoor.ai: the UX flow and wireframes for the original expense tracker",
  figures2024: [
    { file: "cb-2024-ux-flow.png", src: "/case/budgai/cb-2024-ux-flow.png", width: 520, height: 293 },
    { file: "cb-2024-wire-home.png", src: "/case/budgai/cb-2024-wire-home.png", width: 158, height: 281 },
    { file: "cb-2024-wire-scan-receipt.png", src: "/case/budgai/cb-2024-wire-scan-receipt.png", width: 158, height: 281 },
    { file: "cb-2024-wire-expense-planner.png", src: "/case/budgai/cb-2024-wire-expense-planner.png", width: 158, height: 281 },
  ],
} as const;

export const PERSONAS = {
  eyebrow: "User personas",
  heading: "Three people, three ways money moves",
  people: [
    {
      name: "Arjun Mehta",
      meta: "34 · Product manager · Bangalore",
      quote: "“Too many manual entries and no meaningful insights.”",
      body: "Switches between GPay, Excel and card apps; forgets small expenses.",
      figure: "cb-03-persona-arjun.png",
      src: "/case/budgai/cb-03-persona-arjun.png",
      alt: "Arjun Mehta: a product manager at a laptop",
      tone: "light" as const,
    },
    {
      name: "Sunita Rane",
      meta: "41 · Homemaker · Pune",
      quote: "“Family members pay from different apps, so nothing adds up.”",
      body: "Bills and renewals arrive without warning; finance apps feel built for experts.",
      figure: "cb-04-persona-sunita.png",
      src: "/case/budgai/cb-04-persona-sunita.png",
      alt: "Sunita Rane: a homemaker in the kitchen",
      tone: "light" as const,
      /** Square source in a short, wide frame: anchor the crop to the top so
          the face is not cut off. */
      objectPosition: "top" as const,
    },
    {
      name: "Tomás Herrera",
      meta: "31 · Freelance designer · Lisbon",
      quote: "“How much will I lose converting this?”",
      body: "Banks hide markup in the rate; money spread across three accounts and currencies.",
      figure: "cb-05-persona-tomás.png",
      src: "/case/budgai/cb-05-persona-tomas.svg",
      alt: "Tomás Herrera: teal monogram portrait tile",
      tone: "dark" as const,
    },
  ],
} as const;

export const JOURNEY = {
  eyebrow: "Customer journey · Tomás",
  heading: "Where the money leaks, and where BudgAI steps in",
  brandTag: "BUDGAI",
  stages: [
    {
      n: "1",
      title: "Get paid",
      quote: "“How much will I lose converting this?”",
      moment: "Wallets show value in dollars at live rates",
    },
    {
      n: "2",
      title: "Convert & send",
      quote: "“Is this rate good, or should I wait?”",
      moment: "Full cost, rate lock and arrival time upfront",
    },
    {
      n: "3",
      title: "Pay day to day",
      quote: "“Which card has no foreign fee here?”",
      moment: "Scan any QR, pick the cheapest method",
    },
    {
      n: "4",
      title: "Split",
      quote: "“Did Diego ever pay me back?”",
      moment: "Auto-balances and a 3-payment settle-up",
    },
    {
      n: "5",
      title: "Review",
      quote: "“Where did $400 go?”",
      moment: "One dashboard in the currency he chooses",
    },
    {
      n: "6",
      title: "Ask & decide",
      quote: "“Are we still paying for that?”",
      moment: "Plain-word answers with linked transactions",
    },
  ],
  mapFigureCaption:
    "The full journey map: doing, thinking, feeling, pain points and BudgAI moments",
  mapFigure: "cb-06-journey-map.png",
  mapSrc: "/case/budgai/cb-06-journey-map.png",
} as const;

export const FLOWS = {
  eyebrow: "User flows & information architecture",
  heading: "Three jobs, one starting point",
  note: "Every money-moving step ends with a human confirmation. Scan sits at the center; Ask BudgAI is reachable from every screen.",
  figures: [
    {
      file: "cb-07-user-flows.png",
      src: "/case/budgai/cb-07-user-flows.png",
      caption: "User flows: pay nearby, send abroad, understand",
    },
    {
      file: "cb-08-information-architecture.png",
      src: "/case/budgai/cb-08-information-architecture.png",
      caption: "Seven top-level areas and the Home hierarchy",
    },
  ],
} as const;

export const FIDELITY = {
  eyebrow: "From low to high fidelity",
  heading: "The same Home screen at each stage",
  note: "Every layout decision was tested before color and detail were added.",
  stages: [
    {
      label: "LOW FIDELITY",
      caption: "Structure and priority only",
      file: "cb-lo-home.png",
      src: "/case/budgai/cb-lo-home.png",
      alt: "Low-fidelity Home screen: structure with placeholder bars and real labels",
      tone: "light" as const,
    },
    {
      label: "MID FIDELITY",
      caption: "Real copy and hierarchy in grayscale",
      file: "cb-mid-home.png",
      src: "/case/budgai/cb-mid-home.png",
      alt: "Mid-fidelity Home screen: real copy and hierarchy in grayscale",
      tone: "light" as const,
    },
    {
      label: "HIGH FIDELITY",
      caption: "Deep teal for trust, amber for decisions",
      file: "cb-hi-home.png",
      src: "/case/budgai/cb-hi-home.png",
      alt: "High-fidelity Home screen: deep teal balance card and amber decisions",
      tone: "dark" as const,
    },
  ],
} as const;

export const FINAL = {
  eyebrow: "Final screens",
  heading: "Pay, send, ask and split",
  note: "30+ screens across Home, Insights, Global, Profile and shared flows.",
  screens: [
    {
      file: "cb-hi-home.png",
      src: "/case/budgai/cb-hi-home.png",
      caption: "Home: balances by currency",
    },
    {
      file: "cb-hi-insights.png",
      src: "/case/budgai/cb-hi-insights.png",
      caption: "Insights: where it went",
    },
    {
      file: "cb-hi-global.png",
      src: "/case/budgai/cb-hi-global.png",
      caption: "Global: wallets and live rates",
    },
    {
      file: "cb-hi-profile.png",
      src: "/case/budgai/cb-hi-profile.png",
      caption: "Profile",
    },
    {
      file: "cb-hi-scan-pay.png",
      src: "/case/budgai/cb-hi-scan-pay.png",
      caption: "Scan & pay: any QR",
    },
    {
      file: "cb-hi-send-abroad.png",
      src: "/case/budgai/cb-hi-send-abroad.png",
      caption: "Send abroad",
    },
    {
      file: "cb-hi-ask-budgai.png",
      src: "/case/budgai/cb-hi-ask-budgai.png",
      caption: "Ask BudgAI: linked answers",
    },
    {
      file: "cb-final-split.png",
      src: "/case/budgai/cb-final-split.png",
      caption: "Split with anyone",
    },
  ],
} as const;

export const TRUST = {
  eyebrow: "Trust built into every step",
  heading: "No surprise costs, and AI that never moves money",
  figures: [
    {
      file: "cb-final-review-lock-rate.png",
      src: "/case/budgai/cb-final-review-lock-rate.png",
      caption: "Rate locked for 30 minutes",
    },
    {
      file: "cb-final-transfer-tracking.png",
      src: "/case/budgai/cb-final-transfer-tracking.png",
      caption: "Tracked until delivered",
    },
    {
      file: "cb-final-subscriptions.png",
      src: "/case/budgai/cb-final-subscriptions.png",
      caption: "Renewals in view",
    },
  ],
  principlesEyebrow: "Design principles",
  principles: [
    {
      title: "Show the source",
      body: "Every AI answer links to the transactions behind it.",
    },
    {
      title: "AI suggests, you decide",
      body: "The assistant can read and explain, but never moves money.",
    },
    {
      title: "No surprise costs",
      body: "Fee, markup and arrival time appear before you confirm.",
    },
    {
      title: "Rates you can check",
      body: "Every rate is labeled live, with when it was fetched.",
    },
  ],
} as const;

export const NEXT_STEPS = {
  eyebrow: "What comes next",
  heading: "From prototype to product",
  steps: [
    {
      n: "01",
      title: "Usability testing",
      body: "Five sessions per persona on the send-abroad and ask flows.",
      lead: true,
    },
    {
      n: "02",
      title: "Real rate data",
      body: "Connect a licensed FX provider in place of the demo feed.",
      lead: false,
    },
    {
      n: "03",
      title: "Accessibility audit",
      body: "Contrast, screen reader labels and dynamic type.",
      lead: false,
    },
    {
      n: "04",
      title: "Component library",
      body: "Turn repeated cards, fields and dropdowns into components.",
      lead: false,
    },
  ],
  prototypeLabel: "Try the working prototype",
  /** The design's own artifact link. */
  prototypeHref: "https://claude.ai/artifact/PjL7DjWs2nBAFPqTJzM1RK",
  prototypeText: "claude.ai/artifact/PjL7DjWs2nBAFPqTJzM1RK",
  note: "Started during my Product Design Consultant role at Chatoor.ai (2024). The BudgAI redesign (2026) extends that work. This page shows my role and contributions.",
} as const;

export const MORE_PROJECTS = {
  label: "MORE PROJECTS",
  allWork: "All work",
  cards: [
    {
      href: "/projects/visagenie",
      kicker: "Previous · AI · Conversational",
      title: "VisaGenie",
      body: "Empowering transparent visa journeys",
      thumbBg: "#1d2a38",
    },
    {
      href: "/projects/focus",
      kicker: "Next · UX · Attention & wellbeing",
      title: "Focus",
      body: "Hold the boundaries you set",
      thumbBg: "#15201a",
    },
  ],
} as const;

