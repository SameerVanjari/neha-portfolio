const fs = require("fs");
const path = require("path");

const root = process.cwd();
const data = JSON.parse(fs.readFileSync(path.join(root, "src/data/portfolio.json"), "utf8"));
const projects = data.projects;

const outDir = path.join(root, "src", "data", "projects");
fs.mkdirSync(outDir, { recursive: true });

function section(label, heading, body, items) {
  const s = {
    label,
    heading,
    body: typeof body === "string" ? body : "",
    images: [],
  };
  if (Array.isArray(items) && items.length) s.items = items;
  return s;
}

for (const p of projects) {
  const obj = {
    id: p.id,
    title: p.title,
    subtitle: p.subtitle || null,
    dimension: p.dimension,
    perception: p.perception,
    year: p.year,
    client: p.client || null,
    color: p.color,
    accent: p.accent,
    tags: Array.isArray(p.tags) ? p.tags : [],
    url: p.url || null,
    heroImage: p.image || "",
    heroImageAlt: p.imageAlt || "",
    sections: {
      overview: section("Story", "Overview", p.description || p.blurb || ""),
      problem: section("Problem", "Why this needed to exist", (p.details && p.details.challenge) || ""),
      approach: section("Approach", "How the work got done", (p.details && p.details.approach) || ""),
      outcomes: section("Outcomes", "What changed once it shipped", (p.details && p.details.result) || ""),
      toolkit: section("Toolkit", "What it was made with", "", p.tags),
      credits: section(
        "Credits",
        "One last thing",
        p.client ? `Designed for ${p.client} — ${p.blurb || ""}` : p.blurb || ""
      ),
    },
  };

  const file = path.join(outDir, `${p.id}.json`);
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + "\n");
  console.log("wrote", path.relative(root, file));
}
