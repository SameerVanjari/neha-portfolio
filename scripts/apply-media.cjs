const fs = require("fs");
const path = require("path");

const root = process.cwd();
const dir = path.join(root, "src", "data", "projects");

const thumb = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
const vid = (id) => `https://drive.google.com/uc?export=download&id=${id}`;

// Media inventory from the Google Drive folder (publicly shared).
const MEDIA = {
  "vr-training-fiber": {
    heroVideo: vid("1ecTIGoMnc9322T-vOR_kEf8ncMag1GPn"), // Millennium_Hero.mp4
    heroVideoPoster: thumb("1ecTIGoMnc9322T-vOR_kEf8ncMag1GPn"),
    videos: [
      { label: "Trailer", src: vid("1BG_OINXUq9XxL9VjyvlvVlmlNICu_Or9"), poster: thumb("1BG_OINXUq9XxL9VjyvlvVlmlNICu_Or9") },
      { label: "Footage", src: vid("1Kn8sxe6DH85XWbrMoWfnjE4Pfayke4Bf"), poster: thumb("1Kn8sxe6DH85XWbrMoWfnjE4Pfayke4Bf") },
    ],
    images: [],
  },
  "virtual-retail": {
    heroVideo: vid("1O8TZHRMEH-0Iw86zczFTEGwct5ji_EFy"), // IFSG_VR.mp4
    heroVideoPoster: thumb("1O8TZHRMEH-0Iw86zczFTEGwct5ji_EFy"),
    videos: [],
    images: [],
  },
  "ascension-realty": {
    heroVideo: vid("1V4IFogf_wYS4I_RM9FxSrwRZhC6CO5-b"), // HERO_-AscensionRealty_AR_Fin.mp4
    heroVideoPoster: thumb("1V4IFogf_wYS4I_RM9FxSrwRZhC6CO5-b"),
    videos: [],
    images: [
      { alt: "Ascension Realty AR still", src: thumb("1nAMb8Out5zvbMuDQNkkvt4ALJUjJ9XVc") },
      { alt: "Ascension Realty AR still 002", src: thumb("1H5UE_XG-qEL1Gdhz_hogxggkKWOuvV1i") },
      { alt: "Ascension Realty AR still 004", src: thumb("1jNGkZwRG5TT__Aazn0ilr7IzeNZHQ5H3") },
      { alt: "Ascension Realty AR still 001", src: thumb("1X1zvUaKvhLHOeHxdJcaY9u_IQOLlIQef") },
      { alt: "Ascension Realty AR still 003", src: thumb("1wPEdb1_gq1uhoDxCNpcnKwCfksBGnH3a") },
    ],
  },
  "made-for-joy": {
    heroVideo: vid("1kqJYuprc6Pv6CZQtwafFXeNesdKFYT9v"), // Made_for_joy_CamAnim_02.mp4
    heroVideoPoster: thumb("1kqJYuprc6Pv6CZQtwafFXeNesdKFYT9v"),
    videos: [],
    images: [
      { alt: "Made for Joy — render 23", src: thumb("16NCVY4MVbhgdGUANd6uw-4ZjVrJ4FHF_") },
      { alt: "Made for Joy — render 24", src: thumb("1WwGEXfzB9dwt-n_-EUQpj_zeJiRTtzxd") },
    ],
  },
};

function emptySections() {
  const labels = {
    overview: "Story",
    problem: "Problem",
    approach: "Approach",
    outcomes: "Outcomes",
    toolkit: "Toolkit",
    credits: "Credits",
  };
  const headings = {
    overview: "Overview",
    problem: "Why this needed to exist",
    approach: "How the work got done",
    outcomes: "What changed once it shipped",
    toolkit: "What it was made with",
    credits: "One last thing",
  };
  const out = {};
  for (const id of Object.keys(labels)) {
    out[id] = { label: labels[id], heading: headings[id], body: "", images: [] };
  }
  return out;
}

function applyMedia(obj, media) {
  obj.media = {
    heroVideo: media.heroVideo || null,
    heroVideoPoster: media.heroVideoPoster || null,
    videos: media.videos || [],
    images: media.images || [],
  };
  if (media.heroVideoPoster && !obj.heroImage) {
    obj.heroImage = media.heroVideoPoster;
    obj.heroImageAlt = obj.heroImageAlt || obj.title;
  }
  // Put stills into the overview (Story) section images.
  if (media.images && media.images.length) {
    obj.sections.overview.images = media.images;
  }
  return obj;
}

// 1. Update existing project files.
for (const id of ["vr-training-fiber", "virtual-retail"]) {
  const file = path.join(dir, `${id}.json`);
  const obj = JSON.parse(fs.readFileSync(file, "utf8"));
  applyMedia(obj, MEDIA[id]);
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + "\n");
  console.log("updated", id);
}

// 2. Create new project files for folders that have media but no entry yet.
const NEW = {
  "ascension-realty": {
    title: "Ascension Realty — AR Experience",
    subtitle: "XR · WebAR",
    dimension: "XR",
    perception: "xr",
    client: "Ascension Realty",
  },
  "made-for-joy": {
    title: "Made for Joy",
    subtitle: "XR · Wellness",
    dimension: "XR",
    perception: "xr",
    client: null,
  },
};

for (const [id, meta] of Object.entries(NEW)) {
  const media = MEDIA[id];
  const obj = {
    id,
    title: meta.title,
    subtitle: meta.subtitle,
    dimension: meta.dimension,
    perception: meta.perception,
    year: "",
    client: meta.client,
    color: "#ff2bd6",
    accent: "neon",
    tags: [],
    url: null,
    heroImage: media.heroVideoPoster || "",
    heroImageAlt: meta.title,
    sections: emptySections(),
  };
  applyMedia(obj, media);
  const file = path.join(dir, `${id}.json`);
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + "\n");
  console.log("created", id);
}
