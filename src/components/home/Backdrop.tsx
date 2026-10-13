"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { HomeLens } from "@/data/lenses";

/**
 * Per-lens animated backdrop, matching each hero image:
 *   product → warm gold dust        ux → sparse cool squares
 *   xr → soft blue bokeh            ai → violet constellation (dots + lines)
 * A position-based drift field keeps the AI dots and their connecting lines in
 * sync, and the whole field leans with the pointer (hover).
 */

type PointerRef = { current: { x: number; y: number } };

interface FieldCfg {
  color: string;
  count: number;
  sizeMin: number;
  sizeMax: number;
  soft: number;
  square: boolean;
  lines: boolean;
  opacity: number;
  linkOpacity: number;
  spread: number;
  link: number;
}

const FIELD: Record<HomeLens["id"], FieldCfg> = {
  product: { color: "#e0ab72", count: 1800, sizeMin: 0.7, sizeMax: 2.8, soft: 0.5, square: false, lines: false, opacity: 1, linkOpacity: 0, spread: 6.6, link: 0 },
  ux: { color: "#c4d2e6", count: 1000, sizeMin: 0.6, sizeMax: 1.6, soft: 0.65, square: true, lines: false, opacity: 0.9, linkOpacity: 0, spread: 6.6, link: 0 },
  xr: { color: "#8fbcff", count: 700, sizeMin: 1.4, sizeMax: 4.0, soft: 1.0, square: false, lines: false, opacity: 0.8, linkOpacity: 0, spread: 6.2, link: 0 },
  ai: { color: "#c0a6ff", count: 160, sizeMin: 0.9, sizeMax: 2.4, soft: 0.4, square: false, lines: true, opacity: 1, linkOpacity: 0.32, spread: 5.8, link: 1.8 },
};

const DRIFT = /* glsl */ `
vec3 drift(vec3 p, float t) {
  return vec3(
    sin(t * 0.12 + p.y * 1.3 + p.z * 0.7) * 0.35,
    cos(t * 0.10 + p.x * 1.1) * 0.30,
    sin(t * 0.08 + p.x * 0.6) * 0.20
  );
}
`;

const POINT_VERT = /* glsl */ `
attribute float aSize;
attribute float aPhase;
uniform float uTime;
uniform vec2 uPointer;
uniform float uSizeScale;
varying float vTw;
${DRIFT}
void main() {
  vec3 p = position + drift(position, uTime);
  p.xy += uPointer * 0.6;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vTw = 0.55 + 0.45 * sin(uTime * 1.6 + aPhase * 6.2831);
  gl_PointSize = aSize * uSizeScale / -mv.z;
}
`;

const POINT_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uSoft;
uniform float uSquare;
uniform float uOpacity;
varying float vTw;
void main() {
  float a;
  if (uSquare > 0.5) {
    a = 1.0;
  } else {
    float r = length(gl_PointCoord - 0.5);
    a = smoothstep(0.5, 0.5 - uSoft, r);
    if (a <= 0.001) discard;
  }
  gl_FragColor = vec4(uColor, a * vTw * uOpacity);
}
`;

const LINE_VERT = /* glsl */ `
uniform float uTime;
uniform vec2 uPointer;
${DRIFT}
void main() {
  vec3 p = position + drift(position, uTime);
  p.xy += uPointer * 0.6;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const LINE_FRAG = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
void main() {
  gl_FragColor = vec4(uColor, uOpacity);
}
`;

function buildField(cfg: FieldCfg) {
  const n = cfg.count;
  const pos = new Float32Array(n * 3);
  const sizes = new Float32Array(n);
  const phases = new Float32Array(n);
  const sx = cfg.spread;
  const sy = cfg.spread * 0.6;
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (Math.random() * 2 - 1) * sx;
    pos[i * 3 + 1] = (Math.random() * 2 - 1) * sy;
    pos[i * 3 + 2] = -6.0 + Math.random() * 6.2;
    sizes[i] = cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin);
    phases[i] = Math.random();
  }
  const points = new THREE.BufferGeometry();
  points.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  points.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  points.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

  let lines: THREE.BufferGeometry | null = null;
  if (cfg.lines) {
    const verts: number[] = [];
    const maxD = cfg.link;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (Math.hypot(dx, dy, dz) < maxD) {
          verts.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
          verts.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        }
      }
    }
    lines = new THREE.BufferGeometry();
    lines.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  }
  return { points, lines };
}

export default function Backdrop({ lens, pointer }: { lens: HomeLens; pointer: PointerRef }) {
  const cfg = FIELD[lens.id];
  const { points, lines } = useMemo(() => buildField(cfg), [cfg]);
  const { size, viewport } = useThree();

  const pointMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: POINT_VERT,
        fragmentShader: POINT_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2() },
          uColor: { value: new THREE.Color(cfg.color) },
          uSizeScale: { value: 20 },
          uSoft: { value: cfg.soft },
          uSquare: { value: cfg.square ? 1 : 0 },
          uOpacity: { value: cfg.opacity },
        },
      }),
    [cfg],
  );

  const lineMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: LINE_VERT,
        fragmentShader: LINE_FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2() },
          uColor: { value: new THREE.Color(cfg.color) },
          uOpacity: { value: cfg.linkOpacity },
        },
      }),
    [cfg],
  );

  useEffect(() => {
    return () => {
      points.dispose();
      lines?.dispose();
      pointMat.dispose();
      lineMat.dispose();
    };
  }, [points, lines, pointMat, lineMat]);

  useFrame((_, dt) => {
    const scale = size.height * viewport.dpr * 0.03;
    /* eslint-disable react-hooks/immutability -- per-frame shader uniforms */
    pointMat.uniforms.uTime.value += dt;
    pointMat.uniforms.uSizeScale.value = scale;
    (pointMat.uniforms.uPointer.value as THREE.Vector2).set(pointer.current.x, pointer.current.y);
    if (lines) {
      lineMat.uniforms.uTime.value += dt;
      (lineMat.uniforms.uPointer.value as THREE.Vector2).set(pointer.current.x, pointer.current.y);
    }
    /* eslint-enable react-hooks/immutability */
  });

  return (
    <group position={[0, 0, 0]}>
      <points geometry={points} material={pointMat} />
      {lines && <lineSegments geometry={lines} material={lineMat} />}
    </group>
  );
}
