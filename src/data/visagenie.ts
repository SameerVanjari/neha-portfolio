/**
 * VisaGenie case study — content transcribed from Figma
 * "Website Wireframes" → "VisaGenie — Case study (1440)" (node 291:217).
 *
 * The Figma file is a 1440px desktop layout with 202px gutters, so the
 * content column is 1036px wide. Every figure is a labelled drop-frame in the
 * design; `FIGURES` keeps the frame height, tone and caption exactly as
 * specified so a real export can be dropped in by adding `src` and nothing
 * else has to move.
 */

export const HERO = {
  eyebrowLead: "VisaGenie",
  eyebrowRest: " · AI visa assistant · 2025",
  headline: "Empowering transparent visa journeys",
  support:
    "An AI chatbot that gives free, professional-quality visa guidance, flags illegal employer charges, and explains why an application was rejected.",
  role: "Lead UX Researcher & Designer",
  roleNote: "Research, personas, prioritization, IA, UI and testing · 12 weeks",
  cta: "Meet the genie",
} as const;


export const FACTS = [
  { label: "Role", value: "Lead UX Researcher & Designer", icon: "icon-role" },
  { label: "Research", value: "47 interviews · 312 surveys · 9 experts", icon: "icon-search" },
  { label: "Stack", value: "GPT-4 · LangChain · Pinecone · Flask", icon: "icon-code" },
  { label: "Duration", value: "12 weeks, discovery to validated prototype", icon: "icon-clock" },
] as const;

export const RESULTS = [
  { value: "95%", body: "conversion to first message, up from 20% with onboarding", lead: true },
  { value: "2 min", body: "average time from landing to answer", lead: false },
  { value: "92%", body: "task success: users got what they needed", lead: false },
  { value: "3.2", body: "questions per session", lead: false },
] as const;

export const RESULTS_NOTE = "Measured in flow testing of the validated prototype.";

export const PROBLEM = {
  eyebrow: "The problem",
  heading: "Visa applications aren’t just confusing. They’re systematically exploitative.",
  note: "From 47 interviews and 312 survey responses: a $2.3B problem hiding in plain sight.",
  quote:
    "“My employer demanded $2,800 upfront for my visa sponsorship. I didn’t know this was illegal until I’d already paid.”",
  quoteBy: "Chris, research participant",
} as const;

export const THEMES = [
  {
    title: "Financial exploitation",
    icon: "icon-coin",
    stats: [
      { value: "67%", body: "of sponsored employees illegally charged by employers" },
      { value: "$2.3B", body: "wasted annually on unnecessary fees" },
      { value: "84%", body: "don’t know sponsors’ legal responsibilities" },
    ],
  },
  {
    title: "Information crisis",
    icon: "icon-info",
    stats: [
      { value: "89%", body: "can’t find clear, accurate information" },
      { value: "12+ hrs", body: "researching across 8+ sources" },
      { value: "$500–5k", body: "paid to agents for basic guidance" },
    ],
  },
  {
    title: "Systemic opacity",
    icon: "icon-eyeoff",
    stats: [
      { value: "89%", body: "of rejected applicants never learn why" },
      { value: "34%", body: "reapply without improvements and fail again" },
      { value: "3–6 mo", body: "of processing with zero visibility" },
    ],
  },
] as const;

export const RESEARCH = {
  eyebrow: "Research methodology",
  heading: "Mixed methods across five countries",
  note: "Four weeks of discovery across the US, Canada, UK, Australia and Germany, with consent protocols and secure data storage.",
  methods: [
    {
      value: "47",
      title: "User interviews",
      body: "45–60 minutes each, with current applicants and recent completers: pain points, costs, employer experiences.",
      lead: true,
    },
    {
      value: "312+",
      title: "Survey responses",
      body: "Quantitative validation of interview findings, plus cost analysis and rejection-rate data.",
      lead: false,
    },
    {
      value: "9",
      title: "Stakeholder interviews",
      body: "3 immigration lawyers, 2 former visa agents and 4 HR professionals who handle sponsorship.",
      lead: false,
    },
  ],
  figure: "vg-03-research-insights.png",
} as const;

export const PERSONAS = {
  eyebrow: "Personas",
  heading: "Three people, 89% of the pain points",
  people: [
    {
      name: "Struggling Student Sarah",
      meta: "23 · F-1 student visa · $500 budget",
      quote:
        "“I just need someone to tell me exactly what to do, step by step, without trying to sell me something.”",
      pain: "Can’t afford $1,500–3,000 agents but needs professional-quality guidance.",
      figure: "vg-04-persona-sarah.png",
    },
    {
      name: "Corporate Relocator Marcus",
      meta: "34 · H-1B work visa",
      quote:
        "“HR says this is ‘standard practice’ but something feels wrong. I can’t lose this promotion by pushing back.”",
      pain: "Employer illegally demanding $2,800 in visa fees, unaware it’s illegal.",
      figure: "vg-05-persona-marcus.png",
    },
    {
      name: "Family Reunification Rita",
      meta: "45 · IR-5 family visa",
      quote:
        "“After $3,200 and 14 months, I got a rejection saying ‘insufficient evidence.’ Evidence of what?!”",
      pain: "Rejected with a one-paragraph explanation and no idea what went wrong.",
      figure: "vg-06-persona-rita.png",
    },
  ],
} as const;

export const HOW_MIGHT_WE = {
  eyebrow: "How might we",
  heading: "12 design challenges from 359 data points",
  note: "Each theme became HMW statements before any feature was chosen. Six of the twelve:",
  /* Laid out as three rows of two in the design; kept flat and chunked on render. */
  statements: [
    {
      theme: "Financial exploitation",
      body: "How might we protect users from illegal employer practices without requiring legal expertise?",
    },
    {
      theme: "Financial exploitation",
      body: "How might we eliminate the need for expensive agents for basic applications?",
    },
    {
      theme: "Information crisis",
      body: "How might we centralize fragmented visa information without overwhelming users?",
    },
    {
      theme: "Information crisis",
      body: "How might we ensure users trust the information they receive?",
    },
    {
      theme: "Systemic opacity",
      body: "How might we help rejected applicants understand what went wrong?",
    },
    {
      theme: "Systemic opacity",
      body: "How might we improve reapplication success after rejection?",
    },
  ],
} as const;

export const PRIORITIZATION = {
  eyebrow: "Feature prioritization",
  heading: "Impact vs effort, then a decision matrix",
  note: "An impact/effort matrix chose what to build first; six solution types were scored against five criteria.",
  figure: "vg-07-impact-effort-matrix.png",
  figureCaption: "Impact vs effort: quick wins, big bets, fill-ins and time sinks",
  /* Bar widths are the design's own pixel values against a 300px track. */
  scores: [
    { name: "AI chatbot", score: 44, fill: 264, lead: true },
    { name: "Traditional website", score: 40, fill: 240, lead: false },
    { name: "Community forum", score: 35, fill: 210, lead: false },
    { name: "Native mobile app", score: 34, fill: 204, lead: false },
    { name: "Email / form service", score: 32, fill: 192, lead: false },
    { name: "Human expert chat", score: 23, fill: 138, lead: false },
  ],
  whyTitle: "Why the AI chatbot won",
  whyLead:
    "It combines instant access, personalized guidance, infinite scale and free use, the exact failures of existing options.",
  whyBody:
    "RAG over verified immigration data, with source citations on every answer, keeps GPT-4 grounded and limits hallucination.",
  phases: [
    { label: "PHASE 1 · MVP, 12 WEEKS", body: "AI chatbot, document checklist, multi-country support, LLM knowledge base", lead: true },
    { label: "PHASE 2", body: "Fraud detection, rejection analyzer, cost calculator", lead: false },
    { label: "PHASE 3", body: "Multi-language, community features, application tracking", lead: false },
  ],
} as const;

export const COMPETITIVE = {
  eyebrow: "Competitive landscape",
  heading: "The gap: expert guidance, free and always on",
  note: "Lawyers are reliable but costly; forums and general AI are free but unreliable. VisaGenie aims for both.",
  figures: [
    { file: "vg-08-competitive-landscape.png", caption: "Reliability vs accessibility" },
    { file: "vg-09-feature-comparison.png", caption: "Feature comparison: lawyers, LegalZoom, forums, general AI" },
  ],
} as const;

export const IA_FLOW = {
  eyebrow: "Information architecture & user flow",
  heading: "Get to value fast, whoever you are",
  note: "Three decisions balanced speed, flexibility and guidance.",
  decisions: [
    {
      label: "DECISION 01 · SPEED",
      title: "Guest-first access",
      body: "Skip onboarding and start chatting with just a country selection. 95% of users choose guest mode.",
    },
    {
      label: "DECISION 02 · FLEXIBILITY",
      title: "Three entry paths",
      body: "Guest, user login and admin login all converge on the same high-value chatbot.",
    },
    {
      label: "DECISION 03 · GUIDANCE",
      title: "Context-aware routing",
      body: "Mention employer fees and a fraud alert appears; mention a rejection and the analyzer is offered.",
    },
  ],
  figures: [
    { file: "vg-11-user-flow.png", caption: "Complete user flow" },
    {
      file: "vg-12-information-architecture.png",
      caption: "Information architecture: navigation, core content, contextual features",
    },
  ],
  journeys: {
    file: "vg-13-user-journeys.png",
    caption: "Three scenarios: Sarah’s F-1 checklist, Marcus’s fraud alert, Rita’s rejection analysis",
  },
} as const;

export const HIFI = {
  eyebrow: "High-fidelity UI",
  heading: "One chat, three journeys",
  note: "30+ screens across web, tablet and mobile, with the fraud alert and rejection analyzer surfacing in context.",
  figures: [
    { file: "vg-02-hifi-prototypes.png", caption: "High-fidelity prototypes", wide: true },
    { file: "vg-16-ui-chatbot.png", caption: "Chatbot UI with guided questions", wide: false },
    { file: "vg-17-ui-all-journeys.png", caption: "Fraud alert, rejection analyzer, chat history", wide: false },
  ],
  entry: [
    { file: "vg-14-ui-landing-login.png", caption: "Landing, login and guest entry" },
    { file: "vg-15-ui-welcome-country.png", caption: "Welcome and country selection" },
  ],
} as const;

export const VISUAL = {
  eyebrow: "Brand & visual design",
  heading: "Trust with a touch of magic",
  note: "Calm blues build trust; lavender and green add warmth and signal actions and status.",
  palette: [
    { name: "Deep Slate Blue", hex: "#2A4D69", value: "#2a4d69" },
    { name: "Soft Sky Blue", hex: "#5DADE2", value: "#5dade2" },
    { name: "Muted Lavender", hex: "#8572A3", value: "#8572a3" },
    { name: "Pastel Green", hex: "#A9DFBF", value: "#a9dfbf" },
    { name: "Dark Charcoal", hex: "#333333", value: "#333333" },
    { name: "Cool Light Gray", hex: "#D5DBDB", value: "#d5dbdb" },
    { name: "Off-White", hex: "#FDFDFD", value: "#fdfdfd" },
    { name: "Pure Black", hex: "#000000", value: "#000000" },
  ],
  brand: [
    { file: "vg-18-logo.png", caption: "Logo: travel, trust and a hint of magic" },
    { file: "vg-19-logo-devices.png", caption: "App icon on mobile and in the tablet app" },
  ],
  typeIcons: [
    { file: "vg-20-typography.png", caption: "Poppins, in four weights" },
    { file: "vg-22-iconography.png", caption: "Iconly Sharp and Bulk icons" },
  ],
} as const;

export const TESTING = {
  eyebrow: "Flow testing",
  heading: "Removing onboarding took conversion from 20% to 95%",
  insight:
    "The single biggest improvement came from removing the multi-step onboarding (name, email, country, visa type). Instant guest access with just a country selection lifted conversion from 20% to 95%.",
  edgeCases: [
    "AI can’t answer: official links and a lawyer referral",
    "Unsupported country: friendly message and email signup",
    "High traffic: wait estimate, then cached FAQ answers",
    "Returning users: skip country selection, restore context",
  ],
  stack: ["GPT-4", "LangChain", "Pinecone", "Python", "Flask", "React", "JavaScript", "HTML/CSS", "Figma"],
  note: "Research figures come from my own interviews and surveys. The $2.3B figure is my research estimate. This page shows my role as lead UX researcher and designer.",
} as const;

export const MORE_PROJECTS = {
  label: "MORE PROJECTS",
  allWork: "All work",
  cards: [
    {
      href: "/projects/vantage-ai",
      kicker: "Previous · AI · Career co-pilot",
      title: "Vantage AI",
      body: "One resume. Every role. Told your way.",
      thumbBg: "#16171c",
    },
    {
      href: "/projects/broken-mile",
      kicker: "Next · XR · VR training",
      title: "The Broken Mile",
      body: "VR Awards finalist, live on Meta Quest",
      thumbBg: "#2a2024",
    },
  ],
} as const;
