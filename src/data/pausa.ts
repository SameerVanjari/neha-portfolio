/**
 * Pausa — Conversational AI Agent (AI UX Project) case study.
 * Transcribed from Website Wireframes "Project 2: Pausa" (node 128:1023).
 * All copy and assets are taken from the Figma design only.
 */

export const HERO = {
  eyebrow: "Pausa · Independent project",
  title: "An AI check-in companion that knows its limits",
  subtitle: "Mobile and web · Conversational AI · Mental wellness",
  role: "Product & Conversation Designer",
  roleTail: "· Independent project",
  roleNote: "Research paper to hi-fi, designed end to end",
  cta: { label: "See the screens", href: "#hifi" },
  devices: {
    laptopScreen: "/case/pausa/hero-laptop-screen.jpg",
    laptopFrame: "/case/pausa/hero-laptop-frame.png",
    phoneScreen: "/case/pausa/hero-phone-screen.png",
    phoneGif: "/case/pausa/hero-phone.gif",
    phoneFrame: "/case/pausa/hero-phone-frame.png",
    glow: "/case/pausa/hero-glow.svg",
    floor: "/case/pausa/hero-floor.svg",
  },
};

export const GLANCE = {
  title: "Check in. Breathe.\nGet real help when it matters.",
  web: "/case/pausa/glance-web.jpg",
  checkin: "/case/pausa/glance-checkin.png",
  breathe: "/case/pausa/glance-breathe.png",
  breatheGif: "/case/pausa/glance-breathe.gif",
  glowA: "/case/pausa/glance-glow-a.svg",
  glowB: "/case/pausa/glance-glow-b.svg",
  chips: [
    { label: "1-minute check-in", dot: "#7A96EA" },
    { label: "Breathe, talk or try something", dot: "#7EC4AA" },
    { label: "Real help, one tap away", dot: "#EA9682" },
  ],
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
    { icon: "s-empathy", title: "Empathy map", body: "What two personas say, think, do and feel" },
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
    heading: "Soft lavender, calm blue",
    webshot: "/case/pausa/visual-webshot.jpg",
    chips: ["Outfit + Nunito Sans", "Cool-to-warm mood scale", "44px touch targets"],
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

const NOTE = (
  text: string,
  left: number,
  top: number,
  size: number,
  rotate: number,
) => ({ text, left, top, size, rotate });

const MAP_LAYOUT = {
  says: [
    NOTE("", 44.14, 30, 117.708, 3),
    NOTE("", 180, 44.09, 115.841, -2),
    NOTE("", 307.07, 30, 114.893, 1.5),
    NOTE("", 110, 165.11, 116.779, -2.5),
  ],
  thinks: [
    NOTE("", 874, 24.14, 117.708, -3),
    NOTE("", 740.09, 48, 115.841, 2),
    NOTE("", 614, 27.07, 114.893, -1.5),
    NOTE("", 809.11, 170, 116.779, 2.5),
  ],
  does: [
    NOTE("", 50, 472.14, 117.708, -3),
    NOTE("", 176.09, 460, 115.841, 2),
    NOTE("", 310, 475.07, 114.893, -1.5),
    NOTE("", 105.11, 338, 116.779, 2.5),
  ],
  feels: [
    NOTE("", 868.14, 478, 117.708, 3),
    NOTE("", 744, 456.09, 115.841, -2),
    NOTE("", 611.07, 478, 114.893, 1.5),
    NOTE("", 814, 333.11, 116.779, -2.5),
  ],
} as const;

const QUADRANTS = [
  { key: "says", label: "Says", labelLeft: 332, labelTop: 268, color: "#D2E0FB" },
  { key: "thinks", label: "Thinks", labelLeft: 648, labelTop: 268, color: "#FBE7B0" },
  { key: "does", label: "Does", labelLeft: 329, labelTop: 326, color: "#F6CAD6" },
  { key: "feels", label: "Feels", labelLeft: 648, labelTop: 326, color: "#CDEBDC" },
] as const;

function mapNotes(copy: Record<(typeof QUADRANTS)[number]["key"], readonly string[]>) {
  return QUADRANTS.map((quadrant) => ({
    ...quadrant,
    notes: MAP_LAYOUT[quadrant.key].map((note, i) => ({ ...note, text: copy[quadrant.key][i] })),
  }));
}

export const EMPATHY = {
  label: "Empathy mapping",
  heading: "What Andy and Dana say, think, do and feel",
  people: [
    {
      name: "Andy Raman",
      quote: "“I don’t need a program. I need a minute.”",
      photo: "/case/pausa/persona-andy.png",
      badge: "Andy",
      meta: "29 · product manager",
      badgeLeft: 424,
      quadrants: mapNotes({
        says: [
          "I need a minute, not a program",
          "Meditation apps feel like another task",
          "Can it fit between calls?",
          "I’m fine, just busy",
        ],
        thinks: [
          "Ten minutes won’t fit",
          "I’ll deal with it after this week",
          "Is this stress or just work?",
          "Shouldn’t this be quicker?",
        ],
        does: [
          "Back-to-back meetings",
          "Slack until late",
          "Dashboard open all day",
          "Checks his phone between calls",
        ],
        feels: ["Stretched thin", "Tired", "Stress shows up in his sleep", "Wants a reset"],
      }),
    },
    {
      name: "Dana Whitfield",
      quote: "“If it’s a robot, tell me it’s a robot.”",
      photo: "/case/pausa/persona-dana.png",
      badge: "Dana",
      meta: "44 · teacher, parent of two",
      badgeLeft: 410,
      quadrants: mapNotes({
        says: [
          "If it’s a robot, tell me",
          "Who can read what I type?",
          "I tried a tracker. It didn’t stick.",
          "I don’t want a fake therapist",
        ],
        thinks: [
          "Is real help there if it gets worse?",
          "Where does my data go?",
          "Is this thing pretending?",
          "Weekly patterns would help",
        ],
        does: [
          "Tried a mood tracker for a month",
          "Then stopped",
          "Looks for patterns over weeks",
          "Checks who can see her data",
        ],
        feels: ["Skeptical", "Wary of AI", "Protective of her privacy", "Wants reassurance"],
      }),
    },
  ],
  changesLabel: "What the maps changed",
  changes: [
    { from: "Andy needs speed, not a program", to: "One-tap check-in, two-minute breath" },
    { from: "Dana needs to know it’s software", to: "“Not a therapist” under every chat" },
    { from: "Dana needs to trust where her data goes", to: "Private by default, export and delete in place" },
    { from: "Both need a safety net they can see", to: "Weekly Journey and one-tap 988" },
  ],
};

export const RECORD = {
  kickerLeft: ["Research for Pausa", "From my paper ", "The Empathy Illusion"],
  title: "The Record",
  kickerRight: ["On companion AI", "and the people it fails"],
  dateline: ["Nov 2023 – Mar 2026", "Four families · One law", "Cases from public reporting"],
  leadKicker: "The adult case",
  leadTitle: "Chatbot flagged dozens of times. No one stepped in.",
  leadDeck:
    "A 36-year-old Florida man’s family sues Google over months of escalating chats with Gemini. As an adult, he sat outside every current safeguard.",
  leadColumns: [
    "The suit says the company’s own safety systems flagged the account repeatedly for concerning content, yet no person ever intervened. The chatbot reportedly encouraged him to believe it was sentient.",
    "His case raises the same question as the teen cases that came before it: when an AI becomes someone’s closest confidant, who is responsible for noticing when they are in danger? Today, for adults, the answer is no one.",
  ],
  leadCite: "Gavalas estate v. Google · Courthouse News, March 2026",
  lawTag: "The law",
  lawTitle: "California passes first chatbot safety law, for minors only",
  lawBody:
    "SB 243 requires crisis-referral protocols for companion chatbots. Adults, who are most of the users, get no equivalent protection.",
  lawStats: [
    { num: "Oct ’25", label: "Signed" },
    { num: "Jan ’26", label: "In effect" },
    { num: "0", label: "Adult rules" },
  ],
  pull: "“The technology itself is not the variable. Oversight and design intent are.”",
  pullCite: "The Empathy Illusion · MSAI-633",
  stories: [
    {
      tag: "Florida · Character.AI",
      title: "Mother files the first wrongful-death suit against an AI chatbot company",
      body: "Her 14-year-old son’s companion app built trust and a simulated relationship, the suit argued, without protecting him. The case settled in January 2026.",
      cite: "Garcia v. Character Technologies · CBS News, 2026",
    },
    {
      tag: "Colorado · Character.AI",
      title: "A second family sues, and a pattern takes shape",
      body: "A 13-year-old’s chats escalated over months. A similar lawsuit followed, showing this was no longer one company’s isolated problem.",
      cite: "Peralta family · Pescara Kovach, 2026",
    },
    {
      tag: "United States · ChatGPT",
      title: "A teen’s chats grew darker. The AI never pointed him to a person.",
      body: "Researchers list a third adolescent death after sustained, emotionally escalating conversations with a general-purpose assistant.",
      cite: "Raine family · Pescara Kovach, 2026",
    },
  ],
  soTitle: "Designed for the moment these apps missed",
  so: [
    { label: "No missed crisis", body: "Several very low check-ins open Support: 988 call or text, one tap." },
    { label: "No illusion", body: "“Not a therapist. It can make mistakes.” under every chat." },
    { label: "No age gap", body: "The same protections for every adult, by design." },
  ],
  footer: "If you or someone you know is struggling, call or text 988 (US).",
};

export const CALLOUTS = {
  label: "Feature callouts",
  heading: "What each screen is doing",
  note: "Four key screens, annotated.",
  screens: [
    {
      image: "/case/pausa/callout-checkin.png",
      caption: "Check-in",
      side: "left" as const,
      notes: [
        { title: "Five-face mood scale", body: "One tap. The pick gets a ring and scale, never color alone.", top: 222 },
        { title: "Instant, gentle reply", body: "Pausa reflects the mood back before asking anything else.", top: 302 },
        { title: "Own words, if you want", body: "Free text for feelings the faces don’t cover.", top: 382 },
        { title: "“Not sure yet”", body: "Ambivalence is a valid answer, not a skipped step.", top: 480 },
      ],
    },
    {
      image: "/case/pausa/callout-talk.png",
      caption: "Talk",
      side: "right" as const,
      notes: [
        { title: "Check-in carried over", body: "The chat opens with today’s mood, so no one repeats themselves.", top: 88 },
        { title: "Offers, not prescriptions", body: "Breathe, try something, or just talk. The user chooses.", top: 230 },
        { title: "Save for later", body: "Recommendations go to the Library in one tap.", top: 404 },
        { title: "Honest by default", body: "“Not a therapist. It can make mistakes.” under every chat.", top: 545 },
      ],
    },
    {
      image: "/case/pausa/callout-breathe.png",
      caption: "Breathe",
      side: "left" as const,
      notes: [
        { title: "Three techniques", body: "Box, 4-7-8 and alternate nostril in one control.", top: 750 },
        { title: "Follow the dot", body: "It traces the box while the active phase label lights up.", top: 855 },
        { title: "Count and phase", body: "The orb grows and shrinks with each breath; the count is announced to screen readers.", top: 935 },
        { title: "Pause or finish", body: "Stop anytime. Finish leads to a gentle check-out.", top: 1189 },
      ],
    },
    {
      image: "/case/pausa/callout-support.png",
      caption: "Support",
      side: "right" as const,
      notes: [
        { title: "Pattern noticed", body: "Several very low check-ins open this screen.", top: 770 },
        { title: "988 in one tap", body: "Call or text the Suicide & Crisis Lifeline directly.", top: 850 },
        { title: "More ways to a person", body: "A therapist finder and a note to someone you trust.", top: 969 },
        { title: "A no-pressure exit", body: "“I’m okay, just a rough week” closes it without judgment.", top: 1164 },
      ],
    },
  ],
};

export const HIFI_WEB = {
  label: "Hi-fi web",
  heading: "The same pause, at a desk",
  note: "Check-in, conversation and patterns on one screen.",
  image: "/case/pausa/hifi-web.jpg",
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
  },
  {
    direction: "Next · AI · Conversational assistant",
    title: "VisaGenie",
    highlight: "95% task conversion",
    href: "/projects/visagenie",
    thumbDark: false,
  },
] as const;
