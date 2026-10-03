/**
 * Focus case study — content transcribed from Figma
 * "Website Wireframes" → "Focus — Case study (1440)" (node 411:217).
 *
 * The Figma frame is a 1440px desktop layout with 202px gutters, so the
 * content column is 1036px wide. The case's own Figma file ("Focus — Case
 * Study", file RKQ3b0TDtKhEutnlfCMtWF) exports every slot under the design's
 * filenames (fc-07-persona-rachel.png, fc-dark-4-lock-screen.png …), so the
 * component resolves each figure by name from /case/focus/ and a replacement
 * export only has to keep the name.
 *
 * Palette sampled off the same frame: warm paper #f4f1e8, moss ink #15201a,
 * moss green #56705c, amber #d9a441, and a deep moss band #0f1812.
 */

export const HERO = {
  eyebrowLead: "Focus",
  eyebrowRest: " · Attention & wellbeing · Concept",
  headlinePlain: "Hold the boundaries you set. ",
  headlineAmber: "Don’t guess at intentions.",
  support:
    "A distraction-to-intention app that protects what you picked up your phone to do, instead of guessing what you meant.",
  role: "Designer",
  roleRest: " · Independent concept project",
  roleNote: "Research, product strategy, interaction design and prototyping",
  cta: "See the prototype",
} as const;

export const FACTS = [
  { label: "Role", value: "Research, strategy, interaction design, prototyping", icon: "icon-role" },
  { label: "Type", value: "Independent concept project", icon: "icon-spark" },
  { label: "Tools", value: "Figma, HTML prototype", icon: "icon-tools" },
  { label: "Context", value: "Interaction Design Foundation", icon: "icon-book" },
] as const;

export const MOMENT = {
  eyebrow: "Where it started",
  heading: "I picked up my phone to sketch an idea. Twenty minutes later, I hadn’t.",
  story: [
    "I unlocked my phone to check one message before sketching a design concept. On the way, a stack of LinkedIn, Instagram and Facebook notifications pulled me somewhere else entirely.",
    "Nothing was wrong with my intention. The problem was everything standing between unlocking the phone and doing the thing I picked it up for.",
  ],
  windowLabel: "The moment worth designing for",
  window:
    "The few seconds after unlock, when intention is still intact and the notification stack is already competing for it.",
} as const;

export const PROBLEM = {
  eyebrow: "The problem",
  heading: "The apps competing for attention have no reason to give it back",
  issues: [
    {
      num: "01",
      title: "Hijacked, not undisciplined",
      body: "People usually open their phone with a clear purpose. Notification stacks interrupt it before it’s finished.",
    },
    {
      num: "02",
      title: "Blocking creates rebellion",
      body: "Hard blockers treat the user as the problem. They get bypassed or deleted once frustration outweighs the goal.",
    },
    {
      num: "03",
      title: "Nudges fade",
      body: "A common complaint in low reviews of focus apps: they work for a week and become invisible by week three.",
    },
  ],
  questionLabel: "The design question",
  questionPlain: "How might we protect what someone meant to do, ",
  questionAmber: "without the app pretending to know what that is?",
} as const;

export const PIVOT = {
  eyebrow: "The pivot",
  heading: "I disagreed with the AI’s first answer, and the product changed shape",
  cards: [
    {
      rejected: true,
      label: "AI’S FIRST DRAFT",
      title: "Intention detection",
      body: "The system would infer what you meant to do, resurface abandoned hobbies, and redirect you when you drifted.",
      note: "Why I rejected it: inferring intent was too fragile to trust. I’d rather the system hold a rule I set than guess at one.",
    },
    {
      rejected: false,
      label: "MY MODEL",
      title: "Time-based boundaries",
      body: "The user defines the rules: when focus time is, which apps matter, who can always reach them. The system only holds those rules.",
      note: "The principle: hold the boundaries the user sets. Don’t infer intentions.",
    },
  ],
} as const;

export const PERSONAS = {
  eyebrow: "Who it’s for",
  heading: "Three schedules broke the idea of a single setup",
  people: [
    {
      dark: false,
      tag: "FIXED 9 TO 5",
      name: "Rachel",
      meta: "Working professional, Charlotte NC",
      body: "Set focus hours once and have them repeat. No daily reconfiguring.",
      reliesOn: "Scheduled windows · One calm prompt · Dashboard",
      figure: "fc-07-persona-rachel.png",
    },
    {
      dark: true,
      tag: "CHANGES EVERY DAY",
      name: "Marcus",
      meta: "Third-year medical student on rotations",
      body: "One-tap focus. Hospital pages must always get through: a patient-safety requirement, not a preference.",
      reliesOn: "Manual trigger · Emergency allowlist · Do Not Disturb",
      figure: "fc-08-persona-marcus.png",
    },
    {
      dark: false,
      tag: "EVENINGS AT HOME",
      name: "Diane",
      meta: "Public librarian, less tech-fluent",
      body: "One question at setup: which evening hours to protect. No settings to manage.",
      reliesOn: "Evening window · One calm prompt · Simple dashboard",
      figure: "fc-09-persona-diane.png",
    },
  ],
} as const;

export const COMPETITIVE = {
  eyebrow: "Competitive landscape",
  heading: "Three kinds of help, and the gap none of them cover",
  categories: [
    {
      title: "Hard blockers",
      apps: "Opal · Freedom · Forest",
      body: "Lock apps or reward staying away. Effective in the moment, but bypassed, and users resent being policed.",
    },
    {
      title: "Mindful friction",
      apps: "One Sec · ScreenZen · Intently",
      body: "A pause before a distracting app opens. Closest to my calm prompt, with the same risk: habituation within weeks.",
    },
    {
      title: "Platform-native nudges",
      apps: "Instagram’s night-time reminder",
      body: "Proves a soft, dismissible prompt works at scale. But the platform has little reason to make it stick.",
    },
  ],
  gapLabel: "THE GAP",
  gap: "No major competitor offers selective notification surfacing on unlock, or a manual focus trigger for people without a fixed routine.",
} as const;

export const FEATURES = {
  eyebrow: "The solution",
  heading: "Seven features, each traced to a real need",
  note: "Features 06 and 07 are the new ground: the calm prompt and selective surfacing.",
  items: [
    {
      num: "01",
      title: "Scheduled focus windows",
      body: "Set once, repeats automatically. For Rachel and Diane.",
      lead: false,
    },
    {
      num: "02",
      title: "Manual focus trigger",
      body: "One tap and a duration, for days with no routine. For Marcus.",
      lead: false,
    },
    {
      num: "03",
      title: "Daily time budgets per app",
      body: "A target the user sets, not a limit the app imposes.",
      lead: false,
    },
    {
      num: "04",
      title: "Do Not Disturb + emergency allowlist",
      body: "Chosen contacts always ring through, with no prompt. For Marcus.",
      lead: false,
    },
    {
      num: "05",
      title: "Passive usage dashboard",
      body: "Usage against the user’s own target, with no shame framing.",
      lead: false,
    },
    {
      num: "06",
      title: "One calm prompt",
      body: "Appears once if a distracting app opens during focus. Never repeated.",
      lead: true,
    },
    {
      num: "07",
      title: "Selective surfacing on unlock",
      body: "Chosen apps show in full; everything else collapses to one quiet line.",
      lead: true,
    },
  ],
} as const;

export const FIDELITY = {
  eyebrow: "From low to high fidelity",
  heading: "Eight states, four passes",
  note: "Layout first, then real copy in grayscale, then the moss-and-amber system in dark and light mode.",
  passes: [
    { figure: "fc-wf-low-fidelity.png", caption: "Low fidelity: layout and hierarchy only" },
    { figure: "fc-wf-mid-fidelity.png", caption: "Mid fidelity: real copy and states, still grayscale" },
    {
      figure: "fc-wf-high-light.png",
      caption: "High fidelity, light mode: warm cream with deeper amber and terracotta for daylight contrast",
    },
  ],
} as const;

export const PROTOTYPE = {
  eyebrow: "Prototype · dark mode",
  heading: "A fully wired seven-screen prototype",
  note: "Every screen shares live state: changing a setting changes what the lock screen shows. Built in HTML, then rebuilt in Claude Design.",
  screens: [
    { figure: "fc-dark-1-onboarding.png", caption: "1 Onboarding" },
    { figure: "fc-dark-2-dashboard.png", caption: "2 Dashboard" },
    { figure: "fc-dark-3a-focus-recurring.png", caption: "3a Focus setup, recurring" },
    { figure: "fc-dark-3b-focus-manual.png", caption: "3b Focus setup, manual" },
    { figure: "fc-dark-4-lock-screen.png", caption: "4 Lock screen, selective surfacing" },
    { figure: "fc-dark-5-calm-prompt.png", caption: "5 The calm prompt" },
    { figure: "fc-dark-6-digest.png", caption: "6 Digest" },
    { figure: "fc-dark-7-settings.png", caption: "7 Settings" },
  ],
} as const;

export const AI_PROCESS = {
  eyebrow: "AI in my process",
  heading: "AI handed me a tracing book, not a finished drawing",
  gaveMe: {
    label: "WHAT AI GAVE ME",
    body: "The outline: seven screens, their basic elements and the rough sequence of the flow. Fast, and useful as structure.",
  },
  filledIn: {
    label: "WHAT I FILLED IN",
    body: "The character: the moss-and-amber palette, the serif and sans pairing, the calm prompt’s quiet tone, cross-screen state logic, and accessibility fixes AI never flagged, such as relying on color alone for toggle state.",
  },
  quote:
    "“The outline told me where a notification card should sit. It had no opinion on whether the app should feel clinical or calm.”",
} as const;

export const REFLECTION = {
  eyebrow: "Reflection & next steps",
  heading: "What I learned, and what I’d test next",
  carryForward: [
    "Specific real-world context was a bigger lever than prompting technique. “Third-year med student on rotations, hospital paging” produced a requirement I wouldn’t have designed for otherwise.",
    "AI was useful for fast first drafts once given sharp constraints, but never caught its own generic assumptions until a real scenario pushed back.",
  ],
  validateNext: [
    "Habituation: does the calm prompt still work in week three, or do people tap through it on autopilot?",
    "The gap: is selective surfacing a real opportunity, or a sign nobody needs it? Only user testing can tell.",
    "Micro-interactions that make people want to return, not just tolerate the app.",
  ],
  note: "Independent concept project, created in the context of the Interaction Design Foundation. Not yet user-tested; next steps above describe how I would validate it.",
} as const;

export const MORE_PROJECTS = {
  label: "MORE PROJECTS",
  allWork: "All work",
  cards: [
    {
      href: "/projects/budgai",
      kicker: "Previous · AI · Personal finance",
      title: "BudgAI (Chatoor.ai)",
      body: "One global money app, with answers you can check",
      thumbBg: "#0e2a30",
    },
    {
      href: "/projects/atrium",
      kicker: "Next · XR · Social VR (NDA)",
      title: "Atrium",
      body: "Social VR workspace for distributed teams",
      thumbBg: "#070c12",
    },
  ],
} as const;
