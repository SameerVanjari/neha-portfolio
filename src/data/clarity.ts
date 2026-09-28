/**
 * Clarity — An AI copilot for the mortgage lifecycle.
 * Transcribed from Website Wireframes "Project 3: Clarity" (node 142:217).
 * All copy and visual specs are taken from the Figma design only.
 *
 * Media was recovered from the project Drive folder, which holds HTML exports of
 * the design rather than image files. Three screens had actually been built and
 * were rasterised at 2x; the remaining frames shipped empty, so those slots point
 * at live `screen` components — concept reconstructions in ClarityCase.tsx,
 * built in the same design language. `note` keeps the original Figma filename.
 */

const C = "/case/clarity";

export const HERO = {
  eyebrow: "Clarity · Self-initiated concept",
  title: "An AI copilot for the mortgage lifecycle",
  subtitle: "Borrower app · Loan officer copilot · Regulated fintech",
  principle: "AI guides. Humans decide.",
  role: "Product & AI Experience Designer · Self-initiated concept",
  roleNote: "Task analysis to hi-fi, designed end to end",
  cta: { label: "See the screens", href: "#hifi" },
  copilot: {
    src: `${C}/adam-risk-review.webp`,
    alt: "The loan officer copilot on Laura Bennett’s file: Clarity has flagged an income calculation anomaly with the citation behind it, and the decision — recalculate, request history or clear — is Adam’s to record",
    note: "01-hero-adam-risk-review.png",
  },
  borrower: {
    src: `${C}/laura-underwriting.webp`,
    alt: "Laura’s borrower app mid-underwriting: a five-stage tracker, a plain-language note naming Adam Webb as the owner, and nothing needed from her",
    note: "02-hero-laura-home.png",
  },
};

export const FACTS = [
  { icon: "icon-role", label: "Role", value: "Product Designer" },
  { icon: "icon-scope", label: "Scope", value: "Borrower app · Loan officer copilot" },
  { icon: "icon-methods", label: "Methods", value: "Task analysis · Service blueprints · Prototyping" },
  { icon: "icon-context", label: "Context", value: "ECOA · Reg B · TRID" },
] as const;

export const PROBLEM = {
  label: "The problem",
  heading: "The mortgage lifecycle spans two disconnected worlds.",
  note: "Borrowers move through an opaque process with almost no real-time visibility. Loan officers reconcile information that already exists somewhere, just not in front of them.",
  personas: [
    {
      initials: "LB",
      avatarDark: false,
      name: "Laura Bennett, 34",
      role: "First-time homebuyer · Charlotte, NC",
      quote: "“I can handle complexity, I can’t handle silence.”",
      pains: [
        "Visibility blackouts at the highest-stakes moments: underwriting and closing",
        "Generic rejections (“document not valid”) with no reason or next step",
        "Surprises land late: a $1,200 fee change two days before signing",
      ],
      chip: "Core problem: visibility",
    },
    {
      initials: "AW",
      avatarDark: true,
      name: "Adam Webb, 41",
      role: "Senior loan officer · 12 years · NMLS-licensed",
      quote: "“I didn’t get into this job to be a data-entry clerk between five systems.”",
      pains: [
        "8–12 systems: origination, compliance checklists, pricing engines, CRMs",
        "Manual cross-referencing of data that already exists elsewhere in the org",
        "Requests and updates scattered across email and phone",
      ],
      chip: "Core problem: fragmentation",
    },
  ] as const,
  constraint: {
    label: "Constraint",
    body: 'Fair lending law (ECOA, Regulation B) requires a documented, human-owned rationale behind every credit decision. “AI decides” isn’t a design option. It’s a compliance non-starter.',
  },
};

export const JOURNEY = {
  label: "Current-state journey",
  heading: "Where it breaks, stage by stage",
  note: "From the task analysis across five lifecycle stages",
  stages: ["Pre-approval", "Application", "Underwriting", "Closing", "Servicing"] as const,
  rows: [
    {
      who: "Laura",
      sub: "borrower",
      cells: [
        "Unsure what pre-approval actually commits her to",
        "“Document not valid.” No reason, no next step",
        "Nine days of silence. No idea who has her file or why",
        "$1,200 fee surprise two days before signing",
        "Handed to a servicer she’s never heard of",
      ],
      flagged: [false, false, true, true, false],
    },
    {
      who: "Adam",
      sub: "loan officer",
      cells: [
        "Re-keys the same data into pricing engine and origination system",
        "Chases missing pages by email and phone",
        "Reconciles income by hand across application, pay stubs, W-2s",
        "Fee changes arrive from the title company with no alert",
        "Loses visibility once the loan funds",
      ],
      flagged: [false, false, true, true, false],
    },
  ],
  confidence: {
    who: "Laura’s",
    sub: "confidence",
    points: [
      { x: 88.6, y: 22, low: false },
      { x: 273.8, y: 40, low: false },
      { x: 459, y: 84, low: true },
      { x: 644.2, y: 82, low: true },
      { x: 829.4, y: 28, low: false },
    ],
  },
  patterns: [
    { label: "Pattern 1", text: "Manual reconciliation across disconnected systems" },
    { label: "Pattern 2", text: "Opacity at the borrower’s most anxious moments" },
    { label: "Pattern 3", text: "No structured, two-way communication" },
  ],
};

export const HMW = {
  eyebrow: "How might we",
  statement:
    "How might we design a connected AI experience, spanning borrower and loan officer, that reduces fragmentation and cognitive load through guidance and analysis, while keeping the human as the sole decision-maker at every consequential step?",
  patterns: [
    { label: "From pattern 1 · Reconciliation", text: "…let AI do the cross-checking, so Adam starts from the discrepancy instead of the raw data?" },
    { label: "From pattern 2 · Opacity", text: "…replace silence with continuous, honest visibility at Laura’s most anxious moments?" },
    { label: "From pattern 3 · Communication", text: "…give both sides one shared source of truth, where nothing reaches Laura without Adam’s review?" },
  ],
  success:
    "Success looks like: fewer systems in Adam’s day · no silent stretches for Laura · every decision traceable to a named human",
};

export const COMPARATIVE = {
  label: "Comparative analysis",
  heading: "Not a midpoint. A different architecture.",
  table: [
    {
      product: "Wells Fargo",
      productSub: "Your Loan Tracker",
      solves: "Visibility: status, to-do lists, secure messaging",
      pill: "None",
      tone: "none",
    },
    {
      product: "Bank of America",
      productSub: "Home Loan Navigator",
      solves: "Visibility: status, to-do lists, secure messaging",
      pill: "None",
      tone: "none",
    },
    {
      product: "Rocket Mortgage",
      productSub: null,
      solves:
        "Automated income and asset verification; underwriting judgment stays human, an emergent pattern, not a stated principle",
      pill: "Partial, upstream",
      tone: "partial",
    },
    {
      product: "Better.com",
      productSub: "Tinman",
      solves:
        "Conversational AI that underwrites end to end, in as little as 47 seconds; underwriters join only on AI-flagged variances",
      pill: "AI is the decision",
      tone: "wrong",
    },
    {
      product: "Clarity",
      productSub: null,
      solves: "AI on every file, every time, with a flag-or-clear moment reviewed by a named, accountable person",
      pill: "Guides only",
      tone: "clarity",
    },
  ] as const,
  map: {
    label: "Market positioning",
    yLabel: "AI decision authority →",
    xLabel: "AI presence on every file →",
    dots: [
      { name: "Wells Fargo", x: 58, y: 251, r: 5, tone: "gray", labelAbove: true },
      { name: "Bank of America", x: 91.6, y: 231, r: 5, tone: "gray", labelAbove: true },
      { name: "Rocket Mortgage", x: 170, y: 171, r: 5, tone: "teal", labelAbove: true },
      { name: "Better.com", x: 270.8, y: 41, r: 5, tone: "orange", labelAbove: true },
      { name: "Clarity", x: 276.4, y: 256, r: 8, tone: "clarity", labelAbove: true },
    ],
    note: "high presence, zero authority",
    noteAt: { x: 185, y: 230 },
  },
};

export const IDEATION = {
  label: "Ideation · three directions",
  heading: "Where should the AI sit?",
  note: "Each direction was tested against the same two questions: does it solve both Laura’s visibility and Adam’s fragmentation, and who owns the decision?",
  directions: [
    {
      tag: "Direction A",
      title: "Two point solutions",
      diagram: "two-boxes",
      body: "A borrower status tracker plus a separate efficiency tool for loan officers, the pattern most banks ship today.",
      asideLabel: "Set aside",
      aside:
        "Laura’s visibility depends on Adam’s reconciliation. Solving them separately leaves the tracker showing stale status.",
      dark: false,
    },
    {
      tag: "Direction B",
      title: "AI decides, humans handle exceptions",
      diagram: "ai-human",
      body: "Full automation end to end; a licensed underwriter joins only when the AI itself raises a variance.",
      asideLabel: "Set aside",
      aside:
        "No human-owned rationale on most files: a hard problem under ECOA / Reg B at a large regulated lender.",
      dark: false,
    },
    {
      tag: "Direction C · Chosen",
      title: "Connected copilot: guide, don’t decide",
      diagram: "copilot",
      body: "AI on every file, every time: surfacing, flagging, drafting. One shared record feeds both apps. Every consequential step ends with a named human.",
      asideLabel: "Why",
      aside:
        "Solves visibility and fragmentation with one system, and makes the compliance constraint part of the structure.",
      dark: true,
    },
  ] as const,
};

export const PRINCIPLE = {
  eyebrow: "Design principle",
  heading: "Guide, don’t decide, at every stage",
  note: "The AI’s role never changes category: it surfaces, flags, drafts and cross-checks. A person confirms, approves, decides and sends.",
  columns: ["AI surfaces", "Adam decides", "Laura sees"] as const,
  rows: [
    {
      stage: "Pre-approval",
      ai: "Pulls income and credit data; drafts loan scenarios",
      adam: "Chooses the program; issues the letter",
      laura: "What pre-approval means, in plain words",
    },
    {
      stage: "Application",
      ai: "Checks each upload within minutes; drafts specific requests",
      adam: "Reviews and edits every message before it sends",
      laura: "The exact reason, and what’s still outstanding",
    },
    {
      stage: "Underwriting",
      ai: "Cross-checks income and assets; flags anomalies with citations",
      adam: "Recalculates, requests or clears, with rationale logged",
      laura: "Calm status, who’s handling it, how long it takes",
    },
    {
      stage: "Closing",
      ai: "Compares disclosure versions; detects fee changes on arrival",
      adam: "Verifies with title; approves the explanation",
      laura: "Changes flagged with timestamps, days before signing",
    },
    {
      stage: "Servicing",
      ai: "Watches for escrow and payment changes; drafts notices",
      adam: "Confirms before anything reaches the borrower",
      laura: "An early heads-up instead of a surprise bill",
    },
  ],
  rule: "The left column never moves right. Not by stage, not by persona, not by confidence score.",
};

export const UX_FLOW = {
  label: "UX flow · information architecture",
  heading: "Two apps, one shared case record",
  note: "The borrower app and the loan officer copilot never talk to each other directly. Both read from and write to a single source of truth.",
  connectors: {
    top: "synced in, reconciled once",
    leftTop: "uploads",
    leftBottom: "approved updates",
    rightTop: "decisions",
    rightBottom: "flags, drafts",
    noDirect: "no direct channel",
  },
  sourceSystems: {
    label: "Source systems",
    body: "Origination · Pricing · Compliance · Credit · Title",
  },
  sharedRecord: {
    title: "Shared case record",
    sub: "single source of truth",
    items: ["Loan data & documents", "Flags & decision log", "Messages (approved only)", "Stage timeline", "Named owner per decision"],
  },
  borrowerApp: {
    title: "Borrower app",
    sub: "Laura · mobile",
    items: ["Home dashboard", "Documents & rejections", "Stage status", "Closing Disclosure", "Messages with Adam"],
  },
  copilot: {
    title: "Loan officer copilot",
    sub: "Adam · desktop",
    items: ["Pipeline (triage-first)", "Customer tabs", "Risk review", "Document request drafts", "Closing verification"],
  },
  aiLayer: {
    title: "AI layer",
    body: "Reads the record · cross-checks · flags · drafts",
    strong: "Writes nothing without Adam’s approval",
  },
  why: {
    label: "Why this shape",
    body: "The AI that fixes Adam’s reconciliation problem is the same AI that gives Laura her visibility, but only through a record Adam has signed off on.",
  },
  flow: {
    eyebrow: "One underwriting flag, end to end",
    heading: "Every branch routes through Adam first",
    note: "Every file gets a flag-or-clear moment reviewed by a named person, however confident the AI is. Laura hears only what Adam has approved.",
    placeholder: "Drop image 03-flow-underwriting-flag.png",
    screen: "flow-underwriting-flag",
    alt: "The underwriting flag end to end: the borrower uploads, Clarity cross-checks and cites the rule, Adam decides, and only then is Laura told — with a note that no file skips the human, however confident the AI is",
  },
};

export const WIREFRAMES = {
  label: "UX, wireframes to hi-fi",
  heading: "Lo-fi, mid-fi, then hi-fi. One screen at a time.",
  note: "Structure was settled in grayscale before any color, copy or data went in.",
  groups: [
    {
      title: "Adam · Risk review",
      size: "desktop" as const,
      stages: [
        {
          tag: "LO-FI",
          screen: "wf-adam-lofi",
          alt: "Lo-fi desktop layout for Adam’s risk review: a navigation rail beside a column of three stacked file panels",
          placeholder: "Drop image 06-lofi-adam-risk-review.png",
        },
        {
          tag: "MID-FI",
          screen: "wf-adam-midfi",
          alt: "Mid-fi desktop layout for Adam’s risk review: a two-column working area, three risk items on the left and a decision panel of three options on the right",
          placeholder: "Drop image 09-midfi-adam-risk-review.png",
        },
        {
          tag: "HI-FI",
          src: `${C}/adam-risk-review.webp`,
          alt: "The built screen: the income anomaly Clarity flagged, the DTI impact, the citation, and the three decisions Adam can record",
          placeholder: "Drop image 16-adam-risk-review.png",
        },
      ],
    },
    {
      title: "Laura · Home",
      size: "mobile",
      stages: [
        {
          tag: "LO-FI",
          src: `${C}/laura-lofi-home.webp`,
          alt: "Lo-fi wireframe of the borrower home screen: a five-stage progress tracker, a plain-language status summary card, a nothing-pending state, three quick-glance stats and a four-item tab bar",
          placeholder: "Drop image 04-lofi-laura-home.png",
        },
        { tag: "MID-FI", screen: "wf-laura-midfi", alt: "Mid-fi mobile layout for Laura’s home: a greeting, the five-stage tracker, a plain-language status card and three quick-glance stats", placeholder: "Drop image 07-midfi-laura-home.png" },
        { tag: "HI-FI", screen: "hi-laura-home", alt: "The built home screen: nothing to do today, the next outstanding item, and documents, timing and closing date at a glance", placeholder: "Drop image 10-laura-home.png" },
      ],
    },
  ] as const,
};

export const KEY_DECISIONS = {
  eyebrow: "Key decisions",
  heading: "Four calls that keep a human accountable",
  items: [
    {
      art: "/case/clarity/kd-guide.png",
      title: "Guide, don’t decide",
      body: "Clarity flags, explains and cites. Adam picks the outcome and writes the rationale.",
    },
    {
      art: "/case/clarity/kd-reviewed.png",
      title: "Nothing reaches Laura unreviewed",
      body: "Every AI draft waits for Adam to edit and send. The AI’s path never reaches Laura directly.",
    },
    {
      art: "/case/clarity/kd-named.png",
      title: "Every decision has a name on it",
      body: "Rationales are logged under the person who decided, ready for fair-lending review (ECOA / Reg B).",
    },
    {
      art: "/case/clarity/kd-reassure.png",
      title: "Reassurance for Laura, triage for Adam",
      body: "One flag, two views: a calm status with a named owner for Laura, a ranked queue for Adam.",
    },
  ] as const,
};

export const HIFI = {
  eyebrow: "Hi-fi",
  heading: "The full loop, on both sides",
  note: "Laura’s side is reassurance-first. Adam’s is triage-first. The same flag moves through both without ever skipping Adam.",
  laura: {
    title: "Laura · Borrower app",
    screens: [
      {
        screen: "hi-laura-home",
        alt: "Home dashboard: nothing to do today, the one outstanding item, and documents, timing and closing date at a glance",
        placeholder: "Drop image 10-laura-home.png",
        caption: "Home dashboard",
      },
      {
        screen: "hi-laura-rejection",
        alt: "Document rejection with a specific reason — page 2 of the W-2 was cut off — and exactly what to do instead of a generic rejection",
        placeholder: "Drop image 11-laura-document-rejection.png",
        caption: "Document rejection",
      },
      {
        src: `${C}/laura-underwriting.webp`,
        alt: "The borrower app during underwriting: a five-stage tracker with the current stage marked, a note naming Adam Webb as the owner, and three figures for documents, timing and closing date",
        placeholder: "Drop image 12-laura-underwriting-status.png",
        caption: "Underwriting status",
      },
      {
        screen: "hi-laura-closing",
        alt: "Closing Disclosure with the $1,200 title fee change flagged 11 days before signing, itemised against the previous version",
        placeholder: "Drop image 13-laura-closing-disclosure.png",
        caption: "Closing Disclosure",
      },
    ],
  },
  adam: {
    title: "Adam · Loan officer copilot",
    screens: [
      {
        screen: "hi-adam-pipeline",
        alt: "Pipeline ordered by risk: four customer tabs, what Clarity suggests clearing, and which one needs a human call",
        placeholder: "Drop image 14-adam-pipeline.png",
        caption: "Pipeline dashboard",
      },
      {
        screen: "hi-adam-docreq",
        alt: "Document request draft: the borrower’s file on the left, and the message Clarity drafted on the right, unsent until Adam edits and sends it",
        placeholder: "Drop image 15-adam-document-request.png",
        caption: "Document request draft",
      },
      {
        src: `${C}/adam-risk-review.webp`,
        alt: "Risk review on Laura Bennett’s file: the income anomaly Clarity flagged, the DTI impact, the regulation cited, and the three decisions Adam can record",
        placeholder: "Drop image 16-adam-risk-review.png",
        caption: "Risk review",
      },
      {
        screen: "hi-adam-closing",
        alt: "Closing verification: version 3 of the disclosure line by line against version 2, with the $200 title fee movement flagged and ready for Adam to approve the explanation",
        placeholder: "Drop image 17-adam-closing-verification.png",
        caption: "Closing verification",
      },
    ],
  },
  component: {
    screen: "component-tabbar",
    alt: "The customer tab bar in four states — default, hover, flagged, and active plus flagged — so an open flag is visible without clicking in",
    placeholder: "Drop image 18-component-tab-bar.png",
    label: "Component",
    title: "Customer tab bar",
    body: "Four states, so an open flag is seen without clicking in: default, hover, flagged, and active + flagged.",
  },
};

export const OUTCOME = {
  eyebrow: "Outcome",
  heading: "One AI, two completely different jobs, and one accountable human.",
  stats: [
    {
      num: "9 days → 0",
      body: "silent days in underwriting, replaced by a live status with a named owner and an expected window",
      tone: "amber",
    },
    {
      num: "11 days early",
      body: "the $1,200 fee change is caught and explained before the disclosure is final, not at the signing table",
      tone: "dark",
    },
    {
      num: "4 minutes",
      body: "from upload to a specific “page 2 of 2 missing” message, drafted by AI and sent by Adam",
      tone: "dark",
    },
  ] as const,
  caption: "Outcomes from the designed scenario, not measured results.",
  showsLabel: "What this project shows",
  capabilities: [
    { title: "Service & systems thinking", body: "Task analysis, blueprints and a shared-record architecture" },
    { title: "A defensible AI stance", body: "Enforced by structure, consistent across five stages" },
    { title: "Regulated-industry fluency", body: "ECOA, Reg B, TRID and NMLS shape the constraint" },
    { title: "Range across two users", body: "Same reasoning, translated for a first-time buyer and a 12-year loan officer" },
  ] as const,
  disclaimer:
    "Clarity is a self-initiated design concept. Laura Bennett and Adam Webb are fictional personas; the product is not affiliated with any lender, and nothing here is legal or lending advice.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · AI · Mental wellness",
    title: "Pausa",
    highlight: "An AI check-in companion that knows its limits",
    href: "/projects/pausa",
    thumbDark: true,
    thumb: "/case/pausa/hero-fan.png",
  },
  {
    direction: "Next · WebAR · Nonprofit",
    title: "Feed the Children",
    highlight: "Empty cabinets, full impact",
    href: "/projects/feed-the-children",
    thumbDark: false,
    thumb: "/case/ftc/media/ar-pantry.jpg",
  },
] as const;
