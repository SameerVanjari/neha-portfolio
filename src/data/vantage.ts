/**
 * Vantage AI (Career co-pilot) — transcribed from Website Wireframes
 * node 220:217. Copy and layout specs are from Figma as-is. All media
 * slots are drop-zones: the Figma file holds placeholder frames only.
 */

export const HERO = {
  eyebrowLead: "Vantage AI",
  eyebrowRest: " · Career co-pilot · Self-initiated",
  titleLead: "One resume. Every role. ",
  titleAccent: "Told your way.",
  subtitle:
    "An AI career co-pilot that turns one resume into a role-specific story: tailored to each job, styled to who you are, and approved by you line by line.",
  role: "Sole product designer and builder",
  roleNote: "Research to working build · Claude Design, Claude API, Streamlit, Python",
  cta: "See the co-pilot",
  browserNote: "va-hifi-05-preview.png",
};

export const FACTS = [
  { icon: "icon-fact-role", label: "ROLE", value: "Sole product designer and builder" },
  { icon: "icon-fact-tools", label: "TOOLS", value: "Claude Design · Claude API · Streamlit · Python" },
  { icon: "icon-fact-spark", label: "TYPE", value: "Self-initiated and solo, no client brief" },
  { icon: "icon-fact-users", label: "FOR", value: "Multi-role applicants, career switchers" },
] as const;

export const PROBLEM = {
  eyebrow: "01 · Problem statement",
  heading: "Job seekers rewrite the same resume dozens of times, and still can’t tell why it isn’t landing.",
  pains: [
    {
      num: "PAIN 01",
      title: "One resume, many roles",
      body: "Tailoring for every job is slow, manual work, so most people send one generic version everywhere.",
    },
    {
      num: "PAIN 02",
      title: "Scores without guidance",
      body: "Keyword scanners return a number and missing terms, not how to tell the story so a recruiter sees the fit.",
    },
    {
      num: "PAIN 03",
      title: "AI that flattens voice",
      body: "Chat assistants produce polished but interchangeable bullets, overwrite your voice, and can overstate what you did.",
    },
  ] as const,
  statementLabel: "Problem statement",
  statementLead:
    "Job seekers applying across multiple roles need a fast way to tailor each resume, see exactly where they fall short, and keep their own voice, because today’s tools either ",
  statementA: "score without guiding",
  statementMid: " or ",
  statementB: "generate without understanding who the person is",
  audiencesLabel: "WHO IT IS FOR",
  audiences: [
    "Multi-role applicants",
    "Career switchers",
    "International candidates",
    "People with non-linear paths",
  ] as const,
};

export const HMWS = {
  eyebrow: "02 · How might we",
  heading: "Five questions that shaped every screen",
  items: [
    { num: "HMW 01", tag: "SPEED", body: "How might we tailor a resume to each role in minutes rather than hours?" },
    { num: "HMW 02", tag: "CLARITY", body: "How might we turn a match score into specific, actionable next steps?" },
    { num: "HMW 03", tag: "CONTROL", body: "How might we let AI do the heavy lifting while the person stays the final decision-maker on every line?" },
    { num: "HMW 04", tag: "IDENTITY", body: "How might we reflect who someone is, not just which keywords they have, in how their resume looks and reads?" },
    { num: "HMW 05", tag: "CONTINUITY", body: "How might we keep tailoring, exporting and tracking in one connected flow?" },
  ] as const,
};

export const RESEARCH = {
  eyebrow: "03 · Research · comparative analysis",
  heading: "Existing tools solve one slice. None connect the whole job.",
  cols: ["ATS keyword scanners", "AI resume builders", "General chat assistants", "Vantage AI"] as const,
  rows: [
    { label: "Match score against a specific JD", cells: ["Core", "Varies", "Manual", "Core"] as const },
    { label: "Explains gaps with next steps", cells: ["Partial", "Partial", "If prompted", "Core"] as const },
    { label: "Rewrites bullets", cells: ["Rare", "Core", "Core", "Core"] as const },
    { label: "You approve every change", cells: ["n/a", "Rare", "Manual", "Core"] as const },
    { label: "Style reflects the person", cells: ["No", "Templates", "No", "Archetypes"] as const },
    { label: "Application tracking", cells: ["Varies", "Varies", "No", "Core"] as const },
    { label: "ATS-safe export", cells: ["Core", "Varies", "No", "Core"] as const },
  ] as const,
  insights: [
    { num: "INSIGHT 01", body: "Scanners diagnose but do not treat: the user still has to work out how to fix the resume." },
    { num: "INSIGHT 02", body: "Builders and chat assistants treat but do not diagnose, and rarely ask the user to approve each change." },
    { num: "INSIGHT 03", body: "Nobody starts from who the person is. Every tool starts from a template or a blank prompt." },
  ] as const,
};

export const IDEATION = {
  eyebrow: "04 · Ideation",
  heading: "From a resume fixer to a career co-pilot",
  note: "Ideas grouped into four pillars; anything that did not serve one was cut.",
  pillars: [
    {
      num: "PILLAR 01",
      title: "Identity",
      body: "A three-question Identity Quest maps each person to an archetype that sets their resume’s type, palette and layout.",
    },
    {
      num: "PILLAR 02",
      title: "Intelligence",
      body: "The Forge reads the job description, scores role fit, surfaces skill gaps and rewrites bullets with the X-Y-Z formula.",
    },
    {
      num: "PILLAR 03",
      title: "Control",
      body: "Nothing is applied silently. Every suggestion can be accepted, edited or rejected.",
    },
    {
      num: "PILLAR 04",
      title: "Continuity",
      body: "The Vault exports PDF, DOCX and ATS-safe TXT plus a live link, and hands off to the Job Tracker.",
    },
  ] as const,
  flowLabel: "CORE FLOW",
  flow: ["Portal", "Identity Quest", "Reveal", "The Forge", "Preview", "Vault", "Job Tracker"] as const,
  archetypesLabel: "FOUR ARCHETYPES",
  archetypes: [
    { name: "Architect", style: "Grid, Swiss, data-heavy" },
    { name: "Visionary", style: "Editorial, serif, bold" },
    { name: "Specialist", style: "Monospace, technical" },
    { name: "Humanist", style: "Warm, rounded, story-first" },
  ] as const,
};

export const JOURNEY = {
  eyebrow: "05 · Why this works · journey mapping",
  heading: "The same journey, without the dips",
  note: "Proto-persona: the multi-role job seeker. Dashed = today, solid = with Vantage.",
  stages: ["01", "02", "03", "04", "05"] as const,
  stageNames: ["Find a role", "Tailor resume", "Check the fit", "Apply", "Track and follow up"] as const,
  doing: [
    "Saves roles across job boards",
    "Rewrites bullets by hand for each JD",
    "Runs a keyword scan, guesses at fixes",
    "Exports, reformats for each portal",
    "Keeps a spreadsheet, loses track of versions",
  ] as const,
  thinking: [
    "“Which of these am I actually a fit for?”",
    "“This takes hours per application.”",
    "“The score went up but I don’t know why.”",
    "“The portal mangled my formatting.”",
    "“Which resume did I send them?”",
  ] as const,
  withVantage: [
    "Role-fit score before you commit time",
    "The Forge drafts from the JD in one pass",
    "Gaps explained, X-Y-Z rewrites to approve",
    "PDF, DOCX and ATS-safe TXT from the Vault",
    "Tracker keeps the resume version per application",
  ] as const,
};

export const WIREFRAMES = {
  eyebrow: "06 · UX wireframes",
  heading: "Lo-fi, mid-fi, hi-fi. Seven screens, three passes.",
  note: "Every screen was drawn three times, from structure to a dark, finished design system.",
  groups: [
    { title: "Portal", passes: ["va-lofi-01-portal.png", "va-midfi-01-portal.png", "va-hifi-01-portal.png"] as const },
    { title: "Reveal: your archetype", passes: ["va-lofi-03-reveal.png", "va-midfi-03-reveal.png", "va-hifi-03-reveal.png"] as const },
    { title: "Preview: score, gaps, approve each line", passes: ["va-lofi-05-preview.png", "va-midfi-05-preview.png", "va-hifi-05-preview.png"] as const },
  ] as const,
  passLabels: ["LO-FI", "MID-FI", "HI-FI"] as const,
};

export const HIFI = {
  eyebrow: "07 · Hi-fi",
  heading: "The full co-pilot, from Portal to Job Tracker",
  note: "A dark design system in Fraunces and IBM Plex, built as a working app.",
  rows: [
    [
      { note: "va-hifi-01-portal.png", caption: "Portal: start your profile" },
      { note: "va-hifi-02-identity-quest.png", caption: "Identity Quest: three questions" },
    ],
    [
      { note: "va-hifi-03-reveal.png", caption: "Reveal: archetype and design DNA" },
      { note: "va-hifi-04-the-forge.png", caption: "The Forge: role plus JD in, draft out" },
    ],
    [
      { note: "va-hifi-05-preview.png", caption: "Preview: fit score, gaps, accept or keep" },
      { note: "va-hifi-06-vault.png", caption: "Vault: PDF, DOCX, ATS-safe TXT, live link" },
    ],
  ] as const,
  tracker: {
    note: "va-hifi-07-job-tracker.png",
    caption: "Job Tracker: every application, with the resume you sent",
  },
};

export const PROTOTYPING = {
  eyebrow: "08 · Prototyping with Claude",
  heading: "Claude as a design partner, not an autopilot",
  note: "Claude Design to explore and prototype the experience; the Claude API as the engine behind The Forge.",
  steps: [
    { num: "01", title: "Frame", body: "Mapped the six-step flow and each screen’s job before prompting, so the AI worked to a structure." },
    { num: "02", title: "Prototype", body: "Prototyped the multi-screen co-pilot in Claude Design, with one coherent design system across screens." },
    { num: "03", title: "Prompt", body: "Designed the coaching prompts. Framing the model as an expert career coach gave far more specific feedback." },
    { num: "04", title: "Build", body: "Built the working app on the Claude API and Streamlit, then redesigned it with a dark design system." },
  ] as const,
  workedLabel: "WHAT WORKED",
  worked: "A consistent visual system across every generated screen, and a fast loop from idea to clickable flow.",
  challengeLabel: "MAIN CHALLENGE",
  challenge:
    "Scope creep. Every iteration invited another feature. I locked the six-step core flow and parked everything that did not serve the four pillars.",
};

export const SOLVES = {
  eyebrow: "09 · What problem it solves",
  heading: "From guesswork to a guided, owned process",
  rows: [
    { before: "Hours of rewriting for each application", after: "One pass from job description to tailored draft in The Forge" },
    { before: "A score with no explanation", after: "Role-fit score plus named gaps and specific bullet rewrites" },
    { before: "AI that overwrites your voice", after: "Every change is proposed; you accept, edit or keep your own" },
    { before: "A resume that looks like everyone else’s", after: "An archetype-driven layout that reflects how you work" },
    { before: "Versions scattered across folders and spreadsheets", after: "Vault exports and a tracker that remembers what you sent" },
  ] as const,
};

export const BETTER = {
  eyebrow: "10 · How it is better",
  heading: "Other tools optimise a document. Vantage coaches a person.",
  cards: [
    { num: "01", title: "Starts with identity, not a template", body: "The Identity Quest sets how the resume looks and reads before a bullet is written." },
    { num: "02", title: "Human in the loop by design", body: "AI guides and analyses; the person makes every call. Nothing is applied silently." },
    { num: "03", title: "Explains, not just scores", body: "Every score comes with the gaps behind it and a concrete way to close them." },
    { num: "04", title: "JD-aware, measurable rewrites", body: "X-Y-Z bullets against the specific role, with placeholders instead of invented numbers." },
    { num: "05", title: "End to end in one place", body: "Tailor, export PDF, DOCX or ATS-safe TXT, share a live link and track the application." },
  ] as const,
  credit: "Designed, prototyped and built end to end by me as a self-initiated project.",
  signature: "Neha Mayacharya · Product & Experience Designer",
};

export const NEIGHBORS = [
  {
    direction: "Previous · AI · Research tool",
    title: "Research Recommender",
    highlight: "Find papers, take notes, cite them, in one place",
    href: "/projects/research-recommender",
    thumbBg: "#0B1733",
    thumbFg: "#82B9FF",
  },
  {
    direction: "Next · XR · VR training",
    title: "The Broken Mile",
    highlight: "VR Awards finalist, live on Meta Quest",
    href: "/projects/broken-mile",
    thumbBg: "#16171C",
    thumbFg: "#7C9CFF",
  },
] as const;
