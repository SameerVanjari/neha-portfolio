export interface MediaVideo {
  label: string;
  src: string;
  poster: string;
}

export interface MediaImage {
  src: string;
  alt: string;
}

export interface ProjectMedia {
  heroVideo: string | null;
  heroVideoPoster: string | null;
  videos: MediaVideo[];
  images: MediaImage[];
}

import vrTrainingFiber from "./projects/vr-training-fiber.json";
import virtualRetail from "./projects/virtual-retail.json";
import hboCharmCityKings from "./projects/hbo-charm-city-kings.json";

type MediaFile = {
  id: string;
  media?: ProjectMedia;
};

const files: MediaFile[] = [
  vrTrainingFiber,
  virtualRetail,
  hboCharmCityKings,
];

export const PROJECT_MEDIA: Record<string, ProjectMedia> = files.reduce(
  (acc, f) => {
    if (f.media) acc[f.id] = f.media as ProjectMedia;
    return acc;
  },
  {} as Record<string, ProjectMedia>
);