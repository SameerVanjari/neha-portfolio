import type { Project } from "@/types/portfolio";

/**
 * Bio hover-lens annotations for the About page.
 * Each entry matches a phrase inside profile.bio and opens a small detail
 * pop-over: time spans, the projects behind the claim, or the specifics.
 * Copy is derived from the existing portfolio data (bio, experience, projects).
 */

export type BioAnnotation = {
  /** Exact phrase inside profile.bio (first occurrence is annotated). */
  phrase: string;
  title: string;
  rows?: { label: string; value: string }[];
  items?: string[];
  note?: string;
  /** Optional jump to a case page (id of a project). */
  linkTo?: string;
  linkLabel?: string;
};

export const BIO_ANNOTATIONS: BioAnnotation[] = [
  {
    phrase: "intelligent systems and spatial computing",
    title: "The two halves of the practice",
    rows: [
      { label: "Intelligence", value: "LLM agents, guided conversation, NLP ranking: UX that reads context" },
      { label: "Spatial", value: "Meta Quest 2 apps, 8th Wall WebAR, hand-tracked 3D" },
    ],
    note: "One skillset, two mediums, both end-to-end from research to shipped product.",
  },
  {
    phrase: "Over five years",
    title: "2019 → today",
    rows: [
      { label: "2019 · Immertive", value: "VR for healthcare" },
      { label: "2019–20 · Inspirit VR", value: "VR STEM designer & developer, 35% comprehension lift" },
      { label: "2020–23 · Cemtrex", value: "Immersive experience designer for TD Bank, Richemont, Vicon" },
      { label: "2023–24 · CXR Agency", value: "Lead immersive designer for Millennium, TD WebAR, Kraken" },
      { label: "2024 · Chatoor.ai", value: "Product design consultant, fintech dashboards" },
    ],
  },
  {
    phrase: "20+ digital products",
    title: "What shipped",
    items: [
      "TD Bank · WebAR showcase, One Vanderbilt NYC",
      "Harvard MedTech · VR therapy program",
      "IFSG · luxury metaverse retail",
      "Millennium · Quest 2 field training (Meta Quest Store)",
      "HBO Max · Charm City Kings AR filters",
      "VisaGenie · GPT-4 visa assistant, 95% completion",
    ],
    linkTo: "projects",
    linkLabel: "Browse the case studies",
  },
  {
    phrase: "healthcare, enterprise, and education",
    title: "Three industries, one lens",
    rows: [
      { label: "Healthcare", value: "Harvard MedTech VR therapy · Immertive" },
      { label: "Enterprise", value: "TD Bank · Chatoor.ai · Modelo × Seattle Kraken" },
      { label: "Education", value: "Inspirit VR · curriculum with 35% comprehension lift" },
    ],
  },
  {
    phrase: "AI-driven dashboards and conversational interfaces",
    title: "Recent intelligent systems",
    rows: [
      { label: "Chatoor.ai · 2024", value: "Fintech dashboards, 20% faster task completion" },
      { label: "VisaGenie · 2024", value: "Guided GPT-4 visa assistant · 95% task completion" },
      { label: "Recommender · 2024", value: "NLP research discovery with adaptive UX" },
    ],
    linkTo: "visagenie",
    linkLabel: "Open VisaGenie →",
  },
  {
    phrase: "immersive VR therapy programs",
    title: "Harvard MedTech · VR therapy",
    rows: [
      { label: "Program", value: "Home-based VR therapy for chronic pain" },
      { label: "When", value: "2023 · CXR Agency / Cemtrex" },
      { label: "My part", value: "Led design of a scalable VR home-therapy program" },
    ],
    linkTo: "meditation-universe",
    linkLabel: "Open the case →",
  },
  {
    phrase: "luxury metaverse retail",
    title: "IFSG · luxury metaverse retail",
    rows: [
      { label: "Client", value: "IFSG · 2023" },
      { label: "Delivery", value: "2D/3D concept, spatial and interaction design, UX" },
      { label: "Frame", value: "A virtual retail experience for a luxury goods brand" },
    ],
    linkTo: "virtual-retail",
    linkLabel: "Open the case →",
  },
  {
    phrase: "Executive Master's in Artificial Intelligence (GPA 4.0)",
    title: "Executive Master's in AI",
    rows: [
      { label: "When", value: "2025 to 2026, in progress" },
      { label: "Standing", value: "GPA 4.0" },
      { label: "Focus", value: "Sharpening the bridge between design craft and machine intelligence" },
    ],
  },
];

export function annotationLinkTarget(
  linkTo: string | undefined,
  projects: Project[]
): { href: string; label: string } | null {
  if (!linkTo) return null;
  if (linkTo === "projects") return { href: "/projects", label: "Browse the case studies →" };
  const p = projects.find((x) => x.id === linkTo);
  if (!p) return null;
  return { href: `/projects/${p.id}`, label: `Open ${p.title.split(":")[0]} →` };
}
