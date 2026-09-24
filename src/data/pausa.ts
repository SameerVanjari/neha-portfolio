/**
 * Pausa — Conversational AI Agent (AI UX Project) case study.
 * Transcribed from Website Wireframes "Project 2: Pausa" (node 128:1023).
 * All copy and assets are taken from the Figma design only.
 */

export const HERO = {
  eyebrow: "Pausa · Independent project",
  title: "An AI check-in companion that knows its limits",
  subtitle: "Mobile and web · Conversational AI · Mental wellness",
  role: "Product & Conversation Designer · Independent project",
  roleNote: "Research paper to hi-fi, designed end to end",
  cta: { label: "See the screens", href: "#hifi" },
  fan: "/case/pausa/hero-fan.png",
};

export const FACTS = [
  { icon: "role", label: "Role", value: "Product Designer" },
  { icon: "scope", label: "Scope", value: "Research, conversation, UX, UI" },
  { icon: "platform", label: "Platform", value: "iOS, Android and web" },
  { icon: "foundation", label: "Foundation", value: "My research paper on companion AI" },
] as const;

export const PROBLEM = {
  label: "The problem",
  heading: "People need a minute to check in. Most apps ask for ten.",
  cards: [
    { icon: "p-slow", title: "Too slow to start", body: "Programs and libraries ask for time on the days people have the least of it" },
    { icon: "p-log", title: "A log changes nothing", body: "Trackers record a mood, then leave the moment exactly as it was" },
    { icon: "p-limits", title: "AI that forgets its limits", body: "Companion chatbots can miss a crisis and never point people to real help" },
  ] as const,
};

export const WHAT_I_DID = {
  label: "What I did",
  heading: "From a research paper to hi-fi",
  note: "Research, conversation design, UX and visual design, all mine",
  steps: [
    { icon: "s-research", title: "Research", body: "My paper on companion AI and mental health" },
    { icon: "s-persona", title: "Agent persona", body: "Purpose, tone, fallback and exit, written first" },
    { icon: "s-flow", title: "Conversation flow", body: "Every mood path, silence and escalation" },
    { icon: "s-calmi", title: "Calmi v1", body: "First wireframes of the full check-in" },
    { icon: "s-redesign", title: "Redesign", body: "Lo-fi and mid-fi, real copy, accessibility" },
    { icon: "s-hifi", title: "Pausa hi-fi", body: "Visual system for mobile and web" },
  ] as const,
  stats: [
    { num: "5", label: "moods mapped, each with its own path" },
    { num: "31", label: "screens across lo-fi, mid-fi and hi-fi" },
    { num: "2", label: "platforms: mobile and web" },
    { num: "1", label: "escalation path to human help" },
  ],
};

export const RESEARCH = {
  label: "Research",
  heading: "What the research told me to design for",
  rows: [
    {
      finding: "The loneliest users benefit most, and are most exposed when the app fails in a crisis.",
      citation: "Nakagomi et al., 2026",
      response: "Very low check-ins over several days open Support.",
    },
    {
      finding: "Companion chatbots in documented cases failed to recognize a crisis or point to real help.",
      citation: "Pescara Kovach, 2026",
      response: "988 call and text, a therapist finder, a trusted contact.",
    },
    {
      finding: "Warm, always-on, human-like replies deepen attachment when users forget it is software.",
      citation: "Malfacini, 2025; Lipin, 2025",
      response: "“Not a therapist. It can make mistakes.” under every chat.",
    },
    {
      finding: "AI improved therapy outcomes only with clinician oversight and built-in guardrails.",
      citation: "Habicht et al., 2025",
      response: "A companion, never a clinician. Serious moments go to people.",
    },
    {
      finding: "California SB 243 requires crisis referral for companion chatbots, but only for minors.",
      citation: "SB 243 (2025)",
      response: "The same protections for every adult, by design.",
    },
  ],
};

export const CONVERSATION = {
  label: "Conversation design",
  heading: "Every mood has a path, including silence",
  note: "The agent’s tone, fallback and exit were written before any screen",
  flowImage: "/case/pausa/flow.png",
  thumbs: [
    {
      body: "Mood check-in, three next steps, then a gentle closure or reminder.",
      num: "1",
      title: "Everyday loop",
      tone: "dark",
    },
    {
      body: "A soft re-prompt for a number from 1 to 5. Still unclear? The face scale.",
      num: "2",
      title: "Unclear or no answer",
      tone: "dark",
    },
    {
      body: "A mood of 1 for three or more days in a row opens Support, never a dead end.",
      num: "3",
      title: "Escalation to humans",
      tone: "warm",
    },
  ] as const,
};

export const UX_HIFI = {
  label: "UX, wireframes to hi-fi",
  heading: "Sketch first. Then design for calm.",
  panels: [
    { kind: "wireframe", image: "/case/pausa/ux-wireframe.png", tag: "Wireframe" },
    { kind: "hifi", image: "/case/pausa/ux-hifi.png", tag: "Hi-fi" },
  ] as const,
  cards: [
    {
      title: '"Skip" became "Not sure yet"',
      body: "Ambivalence is a valid answer on a low day, not a failure to comply",
    },
    {
      title: "A disclaimer on every chat",
      body: '"An AI companion, not a therapist. It can make mistakes." never scrolls away',
    },
    {
      title: "988, named in full",
      body: '"Crisis line" became the 988 Suicide & Crisis Lifeline with call and text',
    },
  ] as const,
};

export const KEY_DECISIONS = {
  label: "Key decisions",
  heading: "Four calls that keep the AI honest",
  items: [
    {
      art: "/case/pausa/kd-companion.png",
      title: "Companion, not clinician",
      body: "It says what it is on every screen where it talks, so warmth never passes for therapy.",
    },
    {
      art: "/case/pausa/kd-person.png",
      title: "The person decides",
      body: "Three equal choices follow each check-in. Insights arrive as questions, never verdicts.",
    },
    {
      art: "/case/pausa/kd-988.png",
      title: "Hand off to humans",
      body: "A pattern of very low days opens Support: call or text 988, find a therapist, or reach someone you trust.",
    },
    {
      art: "/case/pausa/kd-private.png",
      title: "Private by default",
      body: '"Only you can see it." Check-ins can be exported or deleted anytime, right next to the data.',
    },
  ] as const,
};

export const VISUAL_VOICE = {
  visual: {
    label: "Visual system",
    heading: "Warm paper, calm blue",
    webshot: "/case/pausa/visual-webshot.png",
    chips: ["Newsreader + Poppins", "Cool-to-warm mood scale", "44px touch targets"],
  },
  voice: {
    label: "Voice",
    heading: "Words that stay calm on low days",
    rows: [
      { label: "Greeting", quote: "“How are you feeling today?”", tone: "deep" },
      { label: "Reflection", quote: "“Thanks for being honest with me today.”", tone: "blue" },
      { label: "Fallback", quote: "“Could you try sharing a bit more?”", tone: "mid" },
      { label: "Escalation", quote: "“You don’t have to carry that alone.”", tone: "light" },
      { label: "Exit", quote: "“I’m always here if you need to talk later.”", tone: "outline" },
    ] as const,
  },
};

export const HIFI = {
  label: "Hi-fi",
  heading: "The full loop on mobile",
  note: "Nine screens, one story, from welcome to support",
  screens: [
    { image: "/case/pausa/scr-welcome.png", caption: "Welcome" },
    { image: "/case/pausa/scr-signup.png", caption: "Sign up" },
    { image: "/case/pausa/scr-checkin.png", caption: "Check-in" },
    { image: "/case/pausa/scr-talk.png", caption: "Talk" },
    { image: "/case/pausa/scr-try.png", caption: "Try something" },
    { image: "/case/pausa/scr-breathe.png", caption: "Breathe" },
    { image: "/case/pausa/scr-closure.png", caption: "Closure" },
    { image: "/case/pausa/scr-journey.png", caption: "Journey" },
    { image: "/case/pausa/scr-support.png", caption: "Support" },
  ],
};

export const NEXT_STEPS = {
  label: "Where it goes next",
  heading: "Designed, and ready to be tested",
  stats: [
    { num: "Hi-fi", label: "Mobile and web, end to end", tone: "blue" },
    { num: "< 1 min", label: "Target time for a full check-in", tone: "dark" },
    { num: "Next", label: "Moderated usability test, 5 to 6 participants", tone: "dark" },
  ] as const,
  quote: {
    text: "The difference between harm and help is not the technology itself. It is whether companies choose to build it responsibly.",
    source: "From my research paper, The Empathy Illusion",
  },
  disclaimer:
    "Pausa is an independent design concept, not a medical device or a substitute for professional care. It began as Calmi; the agent persona, conversation flow and first wireframes were built under that name.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · XR · VR training",
    title: "The Broken Mile",
    highlight: "VR Awards finalist, live on Meta Quest",
    href: "/projects/broken-mile",
    thumbDark: true,
    thumb: "/projects/hbo-charm-city-kings/hero-filter.jpg",
  },
  {
    direction: "Next · AI · Conversational assistant",
    title: "VisaGenie",
    highlight: "95% task conversion",
    href: "/projects/visagenie",
    thumbDark: false,
    thumb:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
  },
] as const;
