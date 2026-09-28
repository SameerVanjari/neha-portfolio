import raw from "./testimonials.json";

export interface SiteTestimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  relation: string;
  source: string;
  year: string | null;
  verified: boolean;
  note?: string;
}

export interface PullQuote {
  id: string;
  text: string;
  name: string;
  title: string;
  source: string;
  note: string;
}

/** Six testimonials that lead the site (doc: "Featured testimonials"). */
export const FEATURED_TESTIMONIALS = raw.featured as SiteTestimonial[];

/** Seven full library recommendations for About / a longer page / backups. */
export const TESTIMONIAL_LIBRARY = raw.library as SiteTestimonial[];

/** Optional pull quotes (e.g. Aditya's Instagram story line). Not public until approved. */
export const TESTIMONIAL_PULL_QUOTES = raw.pullQuotes as PullQuote[];

/** Internal pre-publish checklist — never rendered on the site. */
export const TESTIMONIAL_CHECKLIST = raw.checklist as string[];

export function monogramOf(name: string): string {
  const parts = name.replace(/^(Prof\.?|Dr\.?)\s+/i, "").trim().split(/\s+/);
  return `${parts[0][0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
}
