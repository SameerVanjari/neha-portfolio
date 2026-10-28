"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { HomeLens } from "@/data/lenses";
import { useMotionPref } from "@/components/motion/reveal";

/**
 * The hero 3D model ("bronze sphere") — placed at the anchor element's screen
 * position, so a single full-hero canvas can host both this model and a
 * full-bleed particle field. Material is per-lens: wood / lattice mesh /
 * glossy prismatic / particle cloud.
 */

const MODEL_PATHS = [
  "/models/bronze-sphere-dust.glb",
  "/models/wireframe-logo-ux-option-2.glb",
  "/models/wireframe-logo-ux.glb",
  "/models/ai-cosmic-sphere.glb",
  "/models/bronze-sphere.glb",
] as const;
for (const model of MODEL_PATHS) useGLTF.preload(model);

// Product currently uses the material authored inside bronze-sphere-dust.glb.
// Flip this only if we decide the procedural wood fallback looks better.
const USE_PROCEDURAL_PRODUCT_MATERIAL = false;
// XR uses the existing iridescent treatment on the newly imported mesh. This
// flag keeps the alternate imported-material path available for comparison.
const USE_PROCEDURAL_XR_MATERIAL = true;

type PointerRef = { current: { x: number; y: number } };

const MAX_TILT = 0.15; // radians ≈ 8.6°
const BASE_Y = -Math.PI / 12; // ≈ −15° resting turn (left on Y)
const STIFFNESS = 100;
const DAMPING = 10;

/* ---- procedural textures ---------------------------------------------- */

function makeWoodTexture(): THREE.Texture {
  const s = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#a56f43";
  ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 520; i++) {
    const x = Math.random() * s;
    ctx.strokeStyle = `rgba(70,40,18,${0.045 + Math.random() * 0.13})`;
    ctx.lineWidth = 1 + Math.random() * 5;
    ctx.beginPath();
    for (let y = 0; y <= s; y += 10) {
      const xx = x + Math.sin(y * 0.012 + i * 0.6) * 12 + Math.sin(y * 0.05 + i) * 4;
      if (y === 0) ctx.moveTo(xx, y);
      else ctx.lineTo(xx, y);
    }
    ctx.stroke();
  }
  for (let i = 0; i < 360; i++) {
    const x = Math.random() * s;
    ctx.strokeStyle = `rgba(239,190,137,${0.06 + Math.random() * 0.12})`;
    ctx.lineWidth = 1 + Math.random() * 3;
    ctx.beginPath();
    for (let y = 0; y <= s; y += 12) {
      const xx = x + Math.sin(y * 0.014 + i) * 9;
      if (y === 0) ctx.moveTo(xx, y);
      else ctx.lineTo(xx, y);
    }
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/* ---- ux shell web (limb-weighted procedural grid on the real geometry) --- */

/* Shared dissolve/reform GLSL pieces used by every lens transition. */
const DISSOLVE_VERT_DEFS = /* glsl */ `
uniform float uProgress;
varying vec3 vDPos;
vec3 dScatter(vec3 p) {
  return vec3(
    fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453),
    fract(sin(dot(p, vec3(269.5, 183.3, 246.1))) * 43758.5453),
    fract(sin(dot(p, vec3(113.5, 271.9, 124.6))) * 43758.5453)
  ) * 2.0 - 1.0;
}
`;

const DISSOLVE_FRAG_DEFS = /* glsl */ `
uniform float uProgress;
uniform vec3 uAccent;
varying vec3 vDPos;
float dNoise(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
}
`;

/** Sweep band along a diagonal (noise-ragged, glowing at the frontier). */
const DISSOLVE_FRAG_BODY = /* glsl */ `
float dBand = dot(normalize(vDPos), vec3(0.42, 0.82, 0.39)) * 0.85 + (dNoise(vDPos * 5.5) - 0.5) * 0.9;
float dVis = 1.35 - uProgress * 3.1;
float dEdge = smoothstep(0.2, 0.0, abs(dVis - dBand));
gl_FragColor.rgb += uAccent * dEdge;
gl_FragColor.a *= dBand < dVis ? 1.0 : 0.0;
`;

const DISSOLVE_FRAG_BODY_OPAQUE = DISSOLVE_FRAG_BODY.replace(
  "gl_FragColor.a *= dBand < dVis ? 1.0 : 0.0;",
  "if (dBand >= dVis) discard;",
);

/**
 * The ux placeholder shows a smoked-glass ball whose fine web hugs the outer
 * limb. The web is drawn procedurally from the real geometry's spherical UVs;
 * a faint solid panel tinted from the web color fills the cells so the ball
 * reads as a structured surface rather than bare wireframe.
 */
const SHELL_WEB_VERT = /* glsl */ `
${DISSOLVE_VERT_DEFS}
varying vec2 vWebUv;
varying vec3 vViewNormal;
varying vec3 vViewPos;
void main() {
  vDPos = position;
  vWebUv = uv;
  vViewNormal = normalMatrix * normal;
  vec3 scattered = position + dScatter(position) * uProgress * 0.45;
  vec4 mv = modelViewMatrix * vec4(scattered, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const SHELL_WEB_FRAG = (lon: number, lat: number, lit: boolean) => /* glsl */ `
${DISSOLVE_FRAG_DEFS}
uniform vec3 uGlass;
uniform vec3 uWeb;
uniform float uGlassAlpha;
uniform float uLineAlpha;
varying vec2 vWebUv;
varying vec3 vViewNormal;
varying vec3 vViewPos;

float webLines(vec2 uv, vec2 n) {
  vec2 g = abs(fract(uv * n - 0.5) - 0.5) / fwidth(uv * n);
  return 1.0 - min(min(g.x, g.y), 1.0);
}

void main() {
  vec3 n = normalize(vViewNormal);
  vec3 v = normalize(-vViewPos);
  if (!gl_FrontFacing) n = -n;
  float rim = pow(1.0 - abs(dot(n, v)), 1.6);

  // Keep the central face quiet and reserve the brightest web for the limb.
  // This lets the carved ribbon and inner sphere read through the shell.
  float facing = smoothstep(0.2, 0.9, abs(dot(n, v)));
  vec2 grid = mix(
    vec2(${lon.toFixed(1)}, ${lat.toFixed(1)}),
    vec2(${(lon * 1.7).toFixed(1)}, ${(lat * 1.7).toFixed(1)}),
    1.0 - facing
  );
  float lines = webLines(vWebUv, grid);
  float lineA = lines * mix(0.5, 1.0, 1.0 - facing) * uLineAlpha;
${
  lit
    ? `  // Inner sphere, lit from the front: the camera-facing side glows.
  float core = pow(1.0 - rim, 2.2);
  float fill = uGlassAlpha * (0.65 + 0.35 * core);
  vec3 col = mix(uGlass, uWeb * 1.02, core * 0.55) + uWeb * lineA + uWeb * rim * rim * 0.18;`
    : `  // Simple lit material under the wireframe: key-light lambert shades the
  // cell fill while the web stays drawn on top.
  float lambert = max(dot(n, normalize(vec3(0.35, 0.5, 0.8))), 0.0);
  float fill = uGlassAlpha * (0.25 + 0.35 * lambert + 0.45 * rim);
  vec3 col = uGlass * (0.35 + 0.7 * lambert) + uWeb * lineA + uWeb * pow(rim, 3.0) * 0.2;`
}

  gl_FragColor = vec4(col, clamp(fill + lineA, 0.0, 0.92));
${DISSOLVE_FRAG_BODY}
}
`;

function makeShellWebMaterial(
  lon = 26,
  lat = 18,
  opts: { lit?: boolean; accent?: string; inner?: boolean } = {},
): THREE.ShaderMaterial {
  const uniforms = {
    uGlass: { value: new THREE.Color(opts.inner ? "#25324a" : "#111a2a") },
    uWeb: { value: new THREE.Color("#c9e3ff") },
    uGlassAlpha: { value: opts.inner ? 0.3 : 0.14 },
    uLineAlpha: { value: opts.inner ? 0.72 : 1.0 },
    uProgress: { value: 1 },
    uAccent: { value: new THREE.Color(opts.accent ?? "#b49cff") },
  };
  const mat = new THREE.ShaderMaterial({
    vertexShader: SHELL_WEB_VERT,
    fragmentShader: SHELL_WEB_FRAG(lon, lat, !!opts.lit),
    uniforms,
    transparent: true,
    side: THREE.FrontSide,
    depthWrite: false,
    depthTest: true,
  });
  mat.userData.dissolve = uniforms;
  return mat;
}

/* ---- xr iridescent glass ------------------------------------------------ */

/**
 * The XR treatment is a solid glass-like surface: aqua and deep cobalt through
 * the body, with pale gold and pink iridescence on the turning rim.
 */
const IRIDESCENT_FRAG = /* glsl */ `
${DISSOLVE_FRAG_DEFS}
uniform vec3 uGlow;
uniform vec3 uStopA;
uniform vec3 uStopB;
uniform vec3 uStopC;
uniform vec3 uStopD;
varying vec3 vViewNormal;
varying vec3 vViewPos;

void main() {
  vec3 n = normalize(vViewNormal);
  vec3 v = normalize(-vViewPos);
  if (!gl_FrontFacing) n = -n;
  float facing = abs(dot(n, v));
  float rim = pow(1.0 - facing, 2.15);

  float t = atan(n.y, n.x) / 6.28318 + 0.5;
  vec3 g = t < 0.25 ? mix(uStopA, uStopB, t * 4.0)
         : t < 0.5  ? mix(uStopB, uStopC, t * 4.0 - 1.0)
         : t < 0.75 ? mix(uStopC, uStopD, t * 4.0 - 2.0)
                    : mix(uStopD, uStopA, t * 4.0 - 3.0);

  float pearl = smoothstep(0.22, 0.82, 1.0 - facing);
  float alpha = 0.96 + 0.04 * rim;
  vec3 body = mix(vec3(0.012, 0.025, 0.09), uGlow, 0.42 + 0.22 * pearl);
  vec3 col = mix(body, g, smoothstep(0.06, 0.88, rim));
  col = mix(col, vec3(0.52, 0.76, 1.0), 0.12 + 0.1 * pearl);
  col += g * pow(rim, 2.15) * 0.95;
  vec3 key = normalize(vec3(0.18, 0.8, 0.92));
  vec3 h = normalize(key + v);
  float spec = pow(max(dot(n, h), 0.0), 34.0);
  col += mix(vec3(0.82, 0.96, 1.0), g, 0.35) * spec * 1.5;
  col += vec3(0.78, 0.84, 1.0) * pow(max(dot(n, normalize(vec3(-0.55, 0.35, 0.75))), 0.0), 24.0) * 0.34;
  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
${DISSOLVE_FRAG_BODY}
}
`;

function makeIridescentMaterial(accent = "#7fb2ff"): THREE.ShaderMaterial {
  const uniforms = {
    uGlow: { value: new THREE.Color("#7d86ff") },
    uStopA: { value: new THREE.Color("#477dff") },
    uStopB: { value: new THREE.Color("#9677ed") },
    uStopC: { value: new THREE.Color("#ed8fd7") },
    uStopD: { value: new THREE.Color("#c7a5ff") },
    uProgress: { value: 1 },
    uAccent: { value: new THREE.Color(accent) },
  };
  const mat = new THREE.ShaderMaterial({
    vertexShader: SHELL_WEB_VERT,
    fragmentShader: IRIDESCENT_FRAG,
    uniforms,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: true,
    depthTest: true,
  });
  mat.userData.dissolve = uniforms;
  return mat;
}

/** Shader-independent dissolve for standard/physical materials: scatters
 *  vertices and gates alpha along the same diagonal, one shared program. */
function attachDissolve(material: THREE.Material, accent: string, opaque = false): void {
  const uniforms = {
    uProgress: { value: 1 },
    uAccent: { value: new THREE.Color(accent) },
  };
  material.userData.dissolve = uniforms;
  material.transparent = !opaque;
  material.depthWrite = opaque;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uProgress = uniforms.uProgress;
    shader.uniforms.uAccent = uniforms.uAccent;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\n${DISSOLVE_VERT_DEFS}`)
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>\n  vDPos = position;\n  transformed += dScatter(position) * uProgress * 0.45;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${DISSOLVE_FRAG_DEFS}`)
      .replace(
        /#include <(dithering|fog)_fragment>/,
        (m) => `${m}\n${opaque ? DISSOLVE_FRAG_BODY_OPAQUE : DISSOLVE_FRAG_BODY}`,
      );
  };
}

/* ---- materials -------------------------------------------------------- */

function makeMaterial(lens: HomeLens, inner = false): THREE.Material {
  switch (lens.id) {
    case "product":
      return new THREE.MeshPhysicalMaterial({
        map: makeWoodTexture(),
        color: new THREE.Color(inner ? "#7f5030" : "#d6a06d"),
        roughness: inner ? 0.4 : 0.28,
        metalness: 0,
        clearcoat: inner ? 0.08 : 0.24,
        clearcoatRoughness: 0.22,
        envMapIntensity: 0.8,
      });
    default:
      return new THREE.MeshStandardMaterial({ color: new THREE.Color(lens.accent) });
  }
}

function cloneImportedMaterial(
  material: THREE.Material,
  options: { solid?: boolean; unlit?: boolean } = {},
): THREE.Material {
  const source = material as THREE.MeshStandardMaterial;
  const cloned = options.unlit
    ? new THREE.MeshBasicMaterial({
        map: source.map ?? null,
        color: source.color?.clone() ?? new THREE.Color("#ffffff"),
        side: THREE.DoubleSide,
      })
    : material.clone();
  const withOpacity = cloned as THREE.Material & { opacity?: number };
  // The authored dust GLB uses blend alpha factors (.64/.74). Keep its maps,
  // roughness, and clearcoat, but make the hero model read as a solid object.
  if (options.solid && withOpacity.opacity !== undefined) {
    withOpacity.opacity = 1;
    cloned.transparent = false;
    cloned.depthWrite = true;
  }
  if (options.solid) {
    // The Product shell contains surfaces intentionally visible from both
    // sides. Front-face culling makes parts disappear as the hero tilts.
    cloned.side = THREE.DoubleSide;
  }
  // The GLB loader owns the embedded texture. Keep it alive when a lens
  // transition disposes this per-instance material clone.
  cloned.userData.ownsTextures = false;
  return cloned;
}

function makePointsMaterial(accent = "#b49cff"): THREE.PointsMaterial {
  const mat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.018,
    sizeAttenuation: true,
    transparent: true,
    vertexColors: true,
    depthWrite: false,
  });
  const dissolve = {
    uProgress: { value: 1 },
    uAccent: { value: new THREE.Color(accent) },
  };
  mat.userData.dissolve = dissolve;
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uColorA = { value: new THREE.Color("#5da2ff") };
    shader.uniforms.uColorB = { value: new THREE.Color("#9b6cff") };
    shader.uniforms.uProgress = dissolve.uProgress;
    shader.uniforms.uAccent = dissolve.uAccent;
    shader.vertexShader = shader.vertexShader
      .replace(
        "void main() {",
        `attribute float aSize;\nattribute float aOpacity;\nvarying float vGrad;\nvarying float vOpacity;\n${DISSOLVE_VERT_DEFS}\nvoid main() {`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>\n  vDPos = position;\n  transformed += dScatter(position) * uProgress * 0.18;`,
      )
      .replace("gl_PointSize = size;", "gl_PointSize = size * aSize;\n\tvGrad = vColor.r;\n\tvOpacity = aOpacity;");
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "void main() {",
        `uniform vec3 uColorA;\nuniform vec3 uColorB;\nvarying float vGrad;\nvarying float vOpacity;\n${DISSOLVE_FRAG_DEFS}\nvoid main() {`,
      )
      .replace(
        "#include <color_fragment>",
        [
          "diffuseColor.rgb = mix(uColorA, uColorB, vGrad);",
          "diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0), smoothstep(0.44, 0.5, vGrad) * (1.0 - smoothstep(0.5, 0.56, vGrad)));",
          "diffuseColor.a *= vOpacity;",
        ].join("\n"),
      )
      .replace(/#include <(dithering|fog)_fragment>/, (m) => `${m}\n${DISSOLVE_FRAG_BODY}`);
  };
  mat.customProgramCacheKey = () => "points-grad";
  return mat;
}

/** Sphere-project UVs onto meshes exported without them, so the procedural
 *  skins (wood grain / lattice) still wrap; seam sits behind the camera. */
function ensureSphericalUVs(geometry: THREE.BufferGeometry): void {
  if (geometry.getAttribute("uv")) return;
  const pos = geometry.getAttribute("position");
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const len = Math.hypot(x, y, z) || 1;
    uv[2 * i] = 0.5 + Math.atan2(x, z) / (2 * Math.PI);
    uv[2 * i + 1] = Math.acos(Math.min(1, Math.max(-1, y / len))) / Math.PI;
  }
  geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

/** Thin + jitter the geometry and give each point a wide random size and
 *  opacity (0.3–0.7). The vertex-color red channel carries a normalized-X
 *  gradient coordinate the shader sweeps over time; alpha carries opacity. */
function subsampledPoints(
  geometry: THREE.BufferGeometry,
  step: number,
  emphasis = 0.72,
  solid = false,
): THREE.BufferGeometry {
  const pos = geometry.getAttribute("position");
  // Gradient coordinate must span the mesh's own bounds — mesh-local X can be
  // in any unit range (the gltf ships ±250), so normalize before the sweep.
  let minX = Infinity;
  let maxX = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
  }
  const spanX = maxX - minX || 1;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    minZ = Math.min(minZ, pos.getZ(i));
    maxZ = Math.max(maxZ, pos.getZ(i));
  }
  const spanZ = maxZ - minZ || 1;
  const selected: number[] = [];
  for (let i = 0; i < pos.count; i += step) {
    const frontness = (pos.getZ(i) - minZ) / spanZ;
    const emphasisWeight = 0.12 + emphasis * Math.pow(frontness, 1.35);
    const hash = (Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
    if (Math.abs(hash) < emphasisWeight) selected.push(i);
  }
  const count = selected.length;
  const arr = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const opacities = new Float32Array(count);
  let j = 0;
  for (let k = 0; k < selected.length; k++) {
    const i = selected[k];
    arr[j++] = pos.getX(i) + (Math.random() - 0.5) * 0.05;
    arr[j++] = pos.getY(i) + (Math.random() - 0.5) * 0.05;
    arr[j++] = pos.getZ(i) + (Math.random() - 0.5) * 0.05;
    const frontness = (pos.getZ(i) - minZ) / spanZ;
    const seed = Math.abs(Math.sin(i * 4.123 + 1.7));
    sizes[k] = 0.75 + seed * 3.1;
    colors[k * 3] = (arr[k * 3] - minX) / spanX;
    colors[k * 3 + 1] = 0;
    colors[k * 3 + 2] = 0;
    opacities[k] = solid ? 1 : 0.2 + 0.62 * Math.pow(frontness, 0.72) + seed * 0.16;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  g.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  g.userData.mine = true;
  return g;
}

/* ---- model ------------------------------------------------------------ */

/** Built per lens and owned by the caller — dispose via disposeBuilt. */
function buildLensObject(scene: THREE.Object3D, lens: HomeLens): THREE.Object3D {
  const cloned = scene.clone(true);
  // The GLB scene is authored at a 0.01 root scale. Normalize its local
  // geometry once, instead of measuring the scaled bounds and scaling them a
  // second time. The anchor code below expects a two-unit object.
  cloned.scale.setScalar(1);
  cloned.position.set(0, 0, 0);
  cloned.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(cloned);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const k = 2 / (Math.max(size.x, size.y, size.z) || 1);
  cloned.scale.setScalar(k);
  cloned.position.copy(center).multiplyScalar(-k);
  cloned.updateMatrixWorld(true);

  if (lens.id === "product") {
    // The imported preview rig uses a close point/key setup. Let the hero's
    // softer environment handle the wood instead of stacking both rigs.
    cloned.traverse((o) => {
      if ((o as THREE.Light).isLight) o.visible = false;
    });
  }

  const useParticleModel = lens.id === "ai" && lens.model === "/models/bronze-sphere.glb";
  if (useParticleModel) {
    const group = new THREE.Group();
    cloned.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        const inner = mesh.name === "Floating Inner Sphere";
        const geo = subsampledPoints(
          mesh.geometry,
          inner ? 3 : 2,
          inner ? 0.72 : 0.95,
          true,
        );
        const pts = new THREE.Points(geo, makePointsMaterial(lens.accent));
        mesh.matrixWorld.decompose(pts.position, pts.quaternion, pts.scale);
        pts.renderOrder = inner ? 1 : 2;
        group.add(pts);
      }
    });
    group.userData.baseScale = 1;
    return group;
  }
  // UX: shell and inner sphere both wear the web shader (the inner ball lit
  // from the front at a finer density) so the structure stays defined.
  // XR: iridescent bubble shell with a light glossy core.
  let material: THREE.Material | null = null;
  let innerMaterial: THREE.Material | null = null;
  if (lens.id === "ux") {
    material = makeShellWebMaterial(26, 18, { accent: lens.accent });
    innerMaterial = makeShellWebMaterial(16, 12, { lit: true, inner: true, accent: lens.accent });
  } else if (lens.id === "xr" && USE_PROCEDURAL_XR_MATERIAL) {
    material = makeIridescentMaterial(lens.accent);
    innerMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#182140"),
      roughness: 0.1,
      metalness: 0.08,
      transmission: 0.62,
      thickness: 0.16,
      ior: 1.45,
      transparent: true,
      // Legacy XR fallback opacity. The imported XR asset is opaque.
      opacity: 0.32,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.3,
      emissive: new THREE.Color("#202858"),
      emissiveIntensity: 0.16,
    });
    attachDissolve(innerMaterial, lens.accent);
  } else if (lens.id === "product" && USE_PROCEDURAL_PRODUCT_MATERIAL) {
    material = makeMaterial(lens);
    innerMaterial = material;
    attachDissolve(material, lens.accent);
  }
  cloned.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (mesh.isMesh) {
      ensureSphericalUVs(mesh.geometry);
      const inner = mesh.name === "Floating Inner Sphere";
      const useImportedProduct = lens.id === "product" && !USE_PROCEDURAL_PRODUCT_MATERIAL;
      const useImportedXr = lens.id === "xr" && !USE_PROCEDURAL_XR_MATERIAL;
      const useImportedAi = lens.id === "ai";
      if (useImportedProduct || useImportedXr || useImportedAi) {
        const imported = Array.isArray(mesh.material)
          ? mesh.material.map((m) => cloneImportedMaterial(m, {
              solid: useImportedProduct,
              unlit: useImportedXr,
            }))
          : cloneImportedMaterial(mesh.material, {
              solid: useImportedProduct,
              unlit: useImportedXr,
            });
        if (useImportedProduct) {
          for (const importedMaterial of Array.isArray(imported) ? imported : [imported]) {
            attachDissolve(importedMaterial, lens.accent, true);
          }
        }
        mesh.material = imported;
      } else {
        mesh.material = inner ? innerMaterial! : material!;
      }
      mesh.renderOrder = inner ? 1 : 2;
    }
  });
  // Keep the normalized root scale when the transition loop updates the
  // object's scale. Replacing this with 1 expands the source GLB back to its
  // authored hundreds-of-units size and moves it outside the camera.
  cloned.userData.baseScale = k;
  return cloned;
}

/** Drive the dissolve channel of every material of a built object.
 *  progress 0 = intact, 1 = fully scattered and alpha-gated away. */
function setObjectProgress(root: THREE.Object3D, p: number): void {
  root.traverse((o) => {
    const mat = (o as THREE.Mesh).material;
    if (!mat) return;
    for (const m of Array.isArray(mat) ? mat : [mat]) {
      const dsg = (m as THREE.Material & { userData: { dissolve?: { uProgress: { value: number } } } })
        .userData.dissolve;
      if (dsg) dsg.uProgress.value = p;
    }
  });
}

function disposeBuilt(root: THREE.Object3D): void {
  root.traverse((o) => {
    const mesh = o as THREE.Mesh & { material?: THREE.Material | THREE.Material[] };
    const geo = mesh.geometry as THREE.BufferGeometry | undefined;
    if (geo?.userData?.mine) geo.dispose();
    const mats = mesh.material;
    if (!mats) return;
    for (const m of Array.isArray(mats) ? mats : [mats]) {
      const mm = m as THREE.Material & { map?: THREE.Texture; alphaMap?: THREE.Texture };
      if (m.userData.ownsTextures !== false) {
        mm.map?.dispose();
        mm.alphaMap?.dispose();
      }
      m.dispose();
    }
  });
}

/** Crossfade length for both the button glow and the model transition. */
const LENS_FADE = 0.6;

export default function EyeModel({
  lens,
  pointer,
  anchorRef,
  onReady,
}: {
  lens: HomeLens;
  pointer: PointerRef;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  onReady?: (ready: boolean) => void;
}) {
  const { scene } = useGLTF(lens.model);
  const { gl, camera } = useThree();
  const reduce = useMotionPref();
  const root = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const turn = useRef<THREE.Group>(null);
  const vel = useRef({ x: 0, y: 0 });
  const targetPos = useRef(new THREE.Vector3());
  const targetScale = useRef(0.6);
  const outGroup = useRef<THREE.Group>(null);

  const object = useMemo(() => buildLensObject(scene, lens), [scene, lens]);

  // Lens crossfade: on change, the previous build moves into `outGroup` and
  // fades out while the new one fades in.
  const prevRef = useRef<THREE.Object3D | null>(null);
  const objectRef = useRef(object);
  const enterRef = useRef(1);
  useEffect(() => {
    objectRef.current = object;
  }, [object]);

  useEffect(() => {
    onReady?.(true);
  }, [onReady]);

  useEffect(() => {
    const group = outGroup.current;
    const prev = prevRef.current;
    prevRef.current = object;
    if (turn.current) {
      // Enter from a shallow orbit so the imported model turns into the
      // anchored pose instead of simply popping through the dissolve.
      turn.current.rotation.set(
        0,
        reduce ? 0 : -Math.PI * 0.52,
        reduce ? 0 : Math.PI * 0.045,
      );
    }
    if (group && prev && prev !== object) {
      prev.userData.k = 1;
      group.add(prev);
    }
    enterRef.current = 0;
    setObjectProgress(object, 1);
  }, [object, reduce]);

  useEffect(() => {
    const group = outGroup.current;
    return () => {
      disposeBuilt(objectRef.current);
      if (group) {
        for (const child of [...group.children]) disposeBuilt(child);
        group.clear();
      }
    };
  }, []);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 30);
    const cam = camera as THREE.PerspectiveCamera;

    // Lens transition progress: entering object reforms from scattered
    // particles while the outgoing one disintegrates along the diagonal.
    enterRef.current = Math.min(1, enterRef.current + dt / LENS_FADE);
    const ease = 1 - Math.pow(1 - enterRef.current, 3);
    setObjectProgress(object, 1 - ease);
    if (turn.current) {
      const turnRemaining = reduce ? 0 : 1 - ease;
      turn.current.rotation.y = -Math.PI * 0.52 * turnRemaining;
      turn.current.rotation.z = Math.PI * 0.045 * turnRemaining;
    }
    const base = (object.userData.baseScale as number) ?? 1;
    object.scale.setScalar(base * (0.93 + 0.07 * ease));
    const group = outGroup.current;
    if (group && group.children.length > 0) {
      const spf = dt / LENS_FADE;
      for (const child of [...group.children]) {
        const k = ((child.userData.k as number) ?? 1) - spf;
        if (k <= 0) {
          group.remove(child);
          disposeBuilt(child);
          continue;
        }
        child.userData.k = k;
        setObjectProgress(child, 1 - k);
        const cs = (child.userData.baseScale as number) ?? 1;
        child.scale.setScalar(cs * (1 - 0.06 * (1 - k)));
      }
    }

    // Anchor the model to its DOM slot (screen-space → world at z = 0).
    const el = anchorRef.current;
    const canvasEl = gl.domElement;
    if (el && canvasEl) {
      const a = el.getBoundingClientRect();
      const c = canvasEl.getBoundingClientRect();
      if (c.width > 0 && c.height > 0) {
        const cx = a.left - c.left + a.width / 2;
        const cy = a.top - c.top + a.height / 2;
        const ndcX = (cx / c.width) * 2 - 1;
        const ndcY = -((cy / c.height) * 2 - 1);
        const d = cam.position.z;
        const vh = 2 * d * Math.tan((cam.fov * Math.PI) / 360);
        const vw = vh * (c.width / c.height);
        targetPos.current.set((ndcX * vw) / 2, (ndcY * vh) / 2, 0);
        targetScale.current = (a.height * 0.62) / (2 * (c.height / vh));
      }
    }
    if (root.current) {
      root.current.position.lerp(targetPos.current, 0.15);
      const s = THREE.MathUtils.damp(root.current.scale.x, targetScale.current, 8, dt);
      root.current.scale.setScalar(s);
    }

    // Cursor-follow tilt (offsets from the resting pose).
    if (tilt.current) {
      const tx = pointer.current.y * MAX_TILT;
      const ty = BASE_Y + pointer.current.x * MAX_TILT;
      const ax = STIFFNESS * (tx - tilt.current.rotation.x) - DAMPING * vel.current.x;
      vel.current.x += ax * dt;
      tilt.current.rotation.x += vel.current.x * dt;
      const ay = STIFFNESS * (ty - tilt.current.rotation.y) - DAMPING * vel.current.y;
      vel.current.y += ay * dt;
      tilt.current.rotation.y += vel.current.y * dt;
    }
  });

  return (
    <group ref={root} scale={0.6}>
      <group ref={tilt} rotation={[0, BASE_Y, 0]}>
        <group ref={turn}>
          <primitive object={object} />
        </group>
        <group ref={outGroup} />
      </group>
    </group>
  );
}
