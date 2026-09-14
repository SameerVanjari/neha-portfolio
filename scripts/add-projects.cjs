const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = path.join(root, "src", "data", "portfolio.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

const thumb = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

const ascension = {
  id: "ascension-realty",
  title: "Ascension Realty — AR Mobile Experience",
  perception: "xr",
  subtitle: "XR · AR · Real Estate",
  dimension: "XR",
  year: "2025",
  blurb:
    "An AR mobile experience letting buyers scan a surface and walk through a full building — down to a single apartment — before it's ever built.",
  description:
    "An AR mobile experience built for a private real estate client, letting buyers scan a surface and walk through a full building, down to a single apartment, before it's ever built. Designed end-to-end in a three-week sprint.",
  details: {
    challenge:
      "A private real estate client had an early-stage idea — use AR to let buyers experience developments virtually — but with no clarity, no structure, and no defined user journey, under a three-week deadline and no existing app to reference.",
    approach:
      "Owned concept, storyboard, asset direction, UX, interaction design, and sound. Built a city-to-room AR journey — scan a surface, then move from a city skyline to a tower to a floor plan to a single furnished room — sourcing and optimizing 3D assets and using Vuforia anchor points for stable tracking.",
    result:
      "Delivered a functioning AR platform and a client-ready demo in three weeks, turning a rough idea into proof that AR belongs in real estate marketing.",
  },
  tags: ["AR", "Mobile", "Real Estate", "Vuforia", "3D"],
  accent: "neon",
  color: "#ff2bd6",
  image: thumb("1V4IFogf_wYS4I_RM9FxSrwRZhC6CO5-b"),
  imageAlt: "Ascension Realty AR mobile experience",
  url: "https://www.figma.com/design/HE8cOOBzOHoLc4xM9nALNy/Ascension-Realty",
  galleryId: undefined,
  appreciations: undefined,
  views: undefined,
  client: "Ascension Realty",
  source: "figma",
  images: [
    thumb("1nAMb8Out5zvbMuDQNkkvt4ALJUjJ9XVc"),
    thumb("1H5UE_XG-qEL1Gdhz_hogxggkKWOuvV1i"),
    thumb("1jNGkZwRG5TT__Aazn0ilr7IzeNZHQ5H3"),
    thumb("1X1zvUaKvhLHOeHxdJcaY9u_IQOLlIQef"),
    thumb("1wPEdb1_gq1uhoDxCNpcnKwCfksBGnH3a"),
  ],
};

const madeForJoy = {
  id: "made-for-joy",
  title: "Made for Joy",
  perception: "xr",
  subtitle: "XR · Experience",
  dimension: "XR",
  year: "2025",
  blurb:
    "A joy-driven 3D experience — camera-choreographed animation and rendered visuals that give a brand's emotional core room to move.",
  description:
    "A joy-driven 3D experience — a camera-choreographed animation and rendered visuals that give a brand's emotional core room to move. Built as a self-contained motion piece, from concept and camera direction through to final render.",
  details: {
    challenge:
      "Translate a feeling — joy — into a tangible 3D experience, without a product or interface to anchor the story to.",
    approach:
      "Directed a 3D camera animation end-to-end: concept, camera choreography, lighting, and asset direction, iterating through renders to land the emotional tone.",
    result:
      "A polished 3D camera animation and a set of rendered stills, ready to carry the brand across motion and marketing touchpoints.",
  },
  tags: ["3D", "Motion", "Experience"],
  accent: "neon",
  color: "#ff2bd6",
  image: thumb("1kqJYuprc6Pv6CZQtwafFXeNesdKFYT9v"),
  imageAlt: "Made for Joy 3D experience",
  url: undefined,
  galleryId: undefined,
  appreciations: undefined,
  views: undefined,
  client: null,
  source: "drive",
  images: [
    thumb("16NCVY4MVbhgdGUANd6uw-4ZjVrJ4FHF_"),
    thumb("1WwGEXfzB9dwt-n_-EUQpj_zeJiRTtzxd"),
  ],
};

// Strip undefined values to keep JSON clean.
function clean(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out;
}

const existing = new Set(data.projects.map((p) => p.id));
const toAdd = [];
if (!existing.has("ascension-realty")) toAdd.push(clean(ascension));
if (!existing.has("made-for-joy")) toAdd.push(clean(madeForJoy));

if (toAdd.length) {
  data.projects = [...toAdd, ...data.projects];
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("added", toAdd.map((p) => p.id).join(", "));
} else {
  console.log("already present");
}
