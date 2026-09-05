import type { ThemeId } from "@/data/themes";

export type ProjectDetails = {
  challenge: string;
  approach: string;
  result: string;
};

export type Project = {
  id: string;
  title: string;
  perception: ThemeId;
  subtitle?: string;
  dimension: string;
  year: string;
  blurb: string;
  description: string;
  details: ProjectDetails;
  tags: string[];
  accent: string;
  color: string;
  image: string;
  imageAlt: string;
  url?: string;
  galleryId?: string;
  appreciations?: number;
  views?: number;
  client?: string | null;
  source?: string;
  images?: string[];
};

export type Island = {
  id: ThemeId;
  label: string;
  title: string;
  subtitle: string;
  color: string;
  description: string;
  image: string;
  imageAlt: string;
  stat: string;
};

export type Recognition = {
  kind: string;
  place: string;
  meta: string;
  body: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  year: string;
};

export type Experience = {
  when: string;
  what: string;
  where: string;
  desc: string;
};
