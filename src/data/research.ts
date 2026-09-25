/**
 * Research Recommender (AI + UX) — transcribed from Website Wireframes
 * node 215:217. Copy and layout specs are from Figma as-is. Screenshots
 * are the project's own final screens and boards from Drive.
 */

const C = "/case/research";

export const HERO = {
  eyebrowLead: "Research Recommender",
  eyebrowRest: " · AI + UX · 2025",
  title: "Find papers, take notes, cite them, in one place",
  subtitle:
    "A research paper recommender with smart note-taking and automatic APA, MLA and Chicago citations. Designed and coded end to end.",
  role: "Designer & Developer ",
  roleOrg: "· Self-initiated project",
  roleNote: "Research, UX, UI, and the Python + Flask build",
  cta: "Watch the demo",
  browser: {
    src: `${C}/final.webp`,
    alt: "Research Recommender interface with paper detail, notes and citations",
  },
};

export const FACTS = [
  { icon: "icon-fact-role", label: "ROLE", value: "Designer who codes, end to end" },
  { icon: "icon-fact-code", label: "STACK", value: "Python · Flask · scikit-learn · PyMuPDF" },
  { icon: "icon-fact-brain", label: "MODEL", value: "TF-IDF + cosine similarity, NIPS dataset" },
  { icon: "icon-fact-users", label: "USERS", value: "Grad students, PhD researchers, academics" },
] as const;

export const PROBLEM = {
  eyebrow: "The problem",
  heading: "Notes and citations scattered across a dozen PDFs",
  quoteLabel: "WHY I BUILT IT",
  quote:
    "“As a researcher and student, I often struggled with organizing key points and citations across multiple academic papers.”",
  pains: [
    {
      icon: "icon-search",
      title: "Keep track of relevant content",
      body: "Finding the right papers takes longer than reading them.",
    },
    {
      icon: "icon-note",
      title: "Organize notes and citations",
      body: "Quotes, figures and formulas end up in different places, with citations retyped by hand.",
    },
    {
      icon: "icon-compare",
      title: "Compare papers across topics",
      body: "No easy way to hold two papers side by side.",
    },
  ] as const,
};

export const GOALS = {
  eyebrow: "Project goal",
  heading: "One tool for the whole literature review",
  cards: [
    { icon: "icon-g-search", title: "Recommend", body: "Relevant papers from a keyword search", hot: false as const },
    { icon: "icon-g-compare", title: "Compare", body: "Multiple papers side by side, in tabs", hot: false as const },
    { icon: "icon-g-note", title: "Take notes", body: "By category: text, chart, formula, figure", hot: false as const },
    { icon: "icon-g-check", title: "Cite", body: "Auto APA, MLA and Chicago", hot: true as const },
    { icon: "icon-g-target", title: "Export", body: "Notes as .txt for assignments", hot: false as const },
  ] as const,
  usersLabel: "Target users",
  users: [
    "Graduate students & PhD researchers",
    "Professors & academic writers",
    "Anyone needing fast, accurate literature review",
  ] as const,
};

export const FLOW = {
  eyebrow: "UX flow",
  heading: "From a search to a finished citation",
  steps: [
    { num: "01", title: "Land on the homepage", body: "Clean search bar, one call to action" },
    { num: "02", title: "Search “neural networks”", body: "Results sorted by cosine similarity" },
    { num: "03", title: "Or upload a paper", body: "Drag and drop a PDF or Word doc, or paste a link" },
    { num: "04", title: "Open a paper card", body: "Goes to the paper detail view" },
    { num: "05", title: "Read on the left", body: "Take categorized notes on the right" },
    { num: "06", title: "Select key phrases", body: "Choose a category; a citation is generated" },
    { num: "07", title: "Compare in tabs", body: "Open other papers side by side" },
    { num: "08", title: "Download notes", body: "With citations, copied or exported", last: true as const },
  ] as const,
};

export const IA = {
  eyebrow: "Information architecture & wireframes",
  heading: "Three views: home, results, paper detail",
  note: "A split view keeps the paper on the left and your notes on the right.",
  frames: [
    { src: `${C}/ia.webp`, alt: "Information architecture diagram", note: "rr-frame-information-architecture.png", caption: "Information architecture" },
    { src: `${C}/frame-home.webp`, alt: "Homepage wireframes with search and upload", note: "rr-frame-wireframes-home.png", caption: "Homepage: search and upload" },
    { src: `${C}/frame-results.webp`, alt: "Result cards with score badges and split detail view", note: "rr-frame-wireframes-results-detail.png", caption: "Result cards with score badges, and the split detail view" },
    { src: `${C}/frame-citations.webp`, alt: "Highlight to note, citation options and download", note: "rr-frame-wireframes-citations.png", caption: "Highlight to note, citation options, download" },
  ] as const,
};

export const SYSTEM = {
  eyebrow: "Visual design",
  heading: "Calm blue for focus, sunshine for action",
  palette: [
    { name: "Electric Sapphire", hex: "#0055FF" },
    { name: "Blue Ribbon", hex: "#57A0FF" },
    { name: "Sky Breeze", hex: "#82B9FF" },
    { name: "Frosted Sky", hex: "#F1F7FF" },
    { name: "Snow Drift", hex: "#F9F9F9" },
    { name: "Pure White", hex: "#FFFFFF" },
    { name: "Sunbeam", hex: "#FEF7A3" },
    { name: "Sunburst", hex: "#FFD233" },
  ] as const,
  type: [
    {
      face: "Poppins",
      weights: "Regular · Medium · SemiBold · Bold",
      body: "Headings and UI. Geometric, friendly, highly legible across screen sizes.",
    },
    {
      face: "Albert Sans",
      weights: "Regular · Medium · SemiBold · Bold",
      body: "Body and research content. Clean and professional for complex reading.",
    },
  ] as const,
};

export const HOOD = {
  eyebrow: "Under the hood",
  heading: "Classical NLP, built by a designer who codes",
  note: "TF-IDF weighting and cosine similarity recommend papers from the NIPS dataset.",
  pipeline: [
    { num: "01", title: "Data ingestion", hot: false as const },
    { arrow: true as const },
    { num: "02", title: "Preprocessing", hot: false as const },
    { arrow: true as const },
    { num: "03", title: "TF-IDF model", hot: true as const },
    { arrow: true as const },
    { num: "04", title: "Similarity scoring", hot: true as const },
    { arrow: true as const },
    { num: "05", title: "Paper display", hot: false as const },
    { arrow: true as const },
    { num: "06", title: "Citation generator", hot: false as const },
  ] as const,
  models: [
    {
      src: `${C}/model-tfidf.webp`,
      alt: "TF-IDF matrix visualization",
      note: "rr-15-tfidf-matrix.png",
      caption: "TF-IDF matrix: each cell is a term’s weight in an abstract",
    },
    {
      src: `${C}/model-algo.webp`,
      alt: "Recommendation algorithm code",
      note: "rr-16-recommendation-algorithm.png",
      caption: "The recommendation algorithm",
    },
  ] as const,
  data: [
    {
      src: `${C}/data-loading.webp`,
      alt: "Data loading and preprocessing",
      note: "rr-07-data-loading.png",
      caption: "Data loading & preprocessing",
    },
    {
      src: `${C}/data-merge.webp`,
      alt: "Merging authors across three CSVs",
      note: "rr-13-merge-authors-1.png",
      caption: "Merging authors across three CSVs",
    },
    {
      src: `${C}/data-nan.webp`,
      alt: "Handling missing values",
      note: "rr-10-nan-handling.png",
      caption: "Handling missing values",
    },
  ] as const,
};

export const NOTES = {
  eyebrow: "Structured citation logic",
  heading: "Highlight a line, get a citation",
  note: "Template-based formatting pulls authors, title and year to build APA, MLA and Chicago, with copy to clipboard.",
  frames: [
    {
      src: `${C}/note-highlight.webp`,
      alt: "Highlight to save a note",
      note: "rr-22-final-highlight-notes.png",
      caption: "Highlight to save a note",
    },
    {
      src: `${C}/note-pdf.webp`,
      alt: "PDF viewer integration",
      note: "rr-23-final-pdf-view.png",
      caption: "PDF viewer integration",
    },
    {
      src: `${C}/note-citations.webp`,
      alt: "In-text and reference citations",
      note: "rr-24-final-citations.png",
      caption: "In-text and reference citations",
    },
  ] as const,
};

export const ITERATIONS = {
  eyebrow: "Flask interface · iterations",
  heading: "Five rounds to a finished interface",
  steps: [
    { src: `${C}/iter-1.webp`, alt: "Iteration 1", note: "rr-17-iter-cards.png", caption: "First working cards" },
    { src: `${C}/iter-2.webp`, alt: "Iteration 2", note: "rr-18-iter-author-year.png", caption: "Author and year added" },
    { src: `${C}/iter-3.webp`, alt: "Iteration 3", note: "rr-19-iter-ui-updated.png", caption: "UI refresh" },
    { src: `${C}/iter-4.webp`, alt: "Iteration 4", note: "rr-20-iter-keyword-highlight.png", caption: "Keyword highlight" },
    { src: `${C}/iter-5.webp`, alt: "Iteration 5", note: "rr-21-iter-hyperlink.png", caption: "Titles become links" },
  ] as const,
  final: {
    src: `${C}/final.webp`,
    alt: "Final interface with search, recommendations, notes and citations",
    note: "rr-25-final-full-ui.png",
    caption:
      "The final interface: search bar, recommendation cards, note panel, PDF viewer, citation dropdowns, download and copy",
  },
};

export const CLOSING = {
  statement: "Designed for student-researchers. Powered by AI. Built by a designer who codes.",
  stack: ["Python", "Flask", "scikit-learn", "Pandas", "NumPy", "PyMuPDF", "HTML", "VS Code", "GitHub", "Figma"] as const,
  credit:
    "Self-initiated project. I designed and built it end to end: research, UX, UI and the Python/Flask implementation.",
};

export const NEIGHBORS = [
  {
    direction: "Previous · VR · Virtual retail",
    title: "IFSG",
    highlight: "A luxury shopping metaverse you can reach into",
    href: "/projects/ifsg-virtual-retail",
    thumbBg: "#141210",
    thumbFg: "#E3C27A",
  },
  {
    direction: "Next · AI · Career co-pilot",
    title: "Vantage AI",
    highlight: "One resume. Every role. Told your way.",
    href: "/projects/vantage-ai",
    thumbBg: "#0B1733",
    thumbFg: "#82B9FF",
  },
] as const;
