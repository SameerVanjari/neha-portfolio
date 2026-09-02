# Clay 3D — replace placeholders with your 4 images

This folder is mapped in `src/components/IslandNav.tsx` as:

| Perception | File | Your Image |
|---|---|---|
| XR (Spatial Worlds) | `xr.png` | **Image 3** — olive VR goggles |
| UX (Human Flows) | `ux.png` | **Image 1** — orange tablet + pencil |
| AI (Kind Intelligence) | `ai.png` | **Image 4** — grey robot cube |
| PRODUCT | `product.png` | **Image 2** — terracotta stool |

### Instructions
1. Export each uploaded image as **PNG with transparent background** (remove the light beige/grey/black surround and the Grok watermark; keep only the clay object).
2. Name them exactly as above and drop in `public/clay/`.
3. Recommended export: 512×512 or 1024×1024, object centered, ~75% canvas — the component displays at 66px / 78px with `object-contain` and allows the object to bleed outside the island.
4. No code change needed — the island nav automatically swaps the line icon for the clay image when a perception is active, keeping the same center position and letting the 3D object protrude ~12–16px beyond the island pill.

### Why placeholders?
These generated PNGs let you preview the *size + position + bleed* immediately. Replace them with your transparent exports for the final look.
