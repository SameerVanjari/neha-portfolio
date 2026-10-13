"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { HomeLens } from "@/data/lenses";

/**
 * The 3D "Sentient Eye" — placed at the anchor element's screen position, so a
 * single full-hero canvas can host both this model and a full-bleed backdrop.
 * Material is per-lens: wood / lattice mesh / glossy prismatic / particle cloud.
 */

const MODEL = "/models/sentient-eye.glb";
useGLTF.preload(MODEL);

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
  ctx.fillStyle = "#6f4620";
  ctx.fillRect(0, 0, s, s);
  for (let i = 0; i < 520; i++) {
    const x = Math.random() * s;
    ctx.strokeStyle = `rgba(45,26,10,${0.05 + Math.random() * 0.16})`;
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
    ctx.strokeStyle = `rgba(205,150,95,${0.04 + Math.random() * 0.1})`;
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

function makeLatticeTexture(): THREE.Texture {
  const s = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, s, s);
  ctx.fillStyle = "rgba(190, 205, 230, 0.12)";
  ctx.fillRect(0, 0, s, s);
  const line = (x1: number, y1: number, x2: number, y2: number) => {
    ctx.strokeStyle = "rgba(26, 36, 66, 0.85)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(216, 230, 250, 1)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };
  line(0, 0, 0, s);
  line(0, 0, s, 0);
  line(s / 2, 0, s / 2, s);
  line(0, s / 2, s, s / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(30, 30);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ---- materials -------------------------------------------------------- */

function makeMaterial(lens: HomeLens): THREE.Material {
  switch (lens.id) {
    case "product":
      return new THREE.MeshStandardMaterial({ map: makeWoodTexture(), roughness: 0.72, metalness: 0.0 });
    case "ux":
      return new THREE.MeshBasicMaterial({
        map: makeLatticeTexture(),
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
    case "xr":
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#5b95ff"),
        metalness: 0.2,
        roughness: 0.05,
        transparent: true,
        opacity: 0.6,
        clearcoat: 1,
        clearcoatRoughness: 0.03,
        iridescence: 1,
        iridescenceIOR: 1.5,
        iridescenceThicknessRange: [120, 780],
        emissive: new THREE.Color(lens.accent),
        emissiveIntensity: 0.4,
        envMapIntensity: 1.4,
      });
    default:
      return new THREE.MeshStandardMaterial({ color: new THREE.Color(lens.accent) });
  }
}

function makePointsMaterial(accent: string): THREE.PointsMaterial {
  const mat = new THREE.PointsMaterial({
    color: new THREE.Color(accent),
    size: 0.03,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("void main() {", "attribute float aSize;\nvoid main() {")
      .replace("gl_PointSize = size;", "gl_PointSize = size * aSize;");
  };
  mat.customProgramCacheKey = () => "points-per-size";
  return mat;
}

/** Thin + jitter the geometry and give each point a wide random size. */
function subsampledPoints(geometry: THREE.BufferGeometry, step: number): THREE.BufferGeometry {
  const pos = geometry.getAttribute("position");
  const count = Math.ceil(pos.count / step);
  const arr = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  let j = 0;
  for (let i = 0; i < pos.count; i += step) {
    const k = j / 3;
    arr[j++] = pos.getX(i) + (Math.random() - 0.5) * 0.05;
    arr[j++] = pos.getY(i) + (Math.random() - 0.5) * 0.05;
    arr[j++] = pos.getZ(i) + (Math.random() - 0.5) * 0.05;
    sizes[k] = 0.6 + Math.random() * 5.4; // 0.6 × → 6.0 ×
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
  g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  g.userData.mine = true;
  return g;
}

/* ---- model ------------------------------------------------------------ */

export default function EyeModel({
  lens,
  pointer,
  anchorRef,
}: {
  lens: HomeLens;
  pointer: PointerRef;
  anchorRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scene } = useGLTF(MODEL);
  const { gl, camera } = useThree();
  const root = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const vel = useRef({ x: 0, y: 0 });
  const targetPos = useRef(new THREE.Vector3());
  const targetScale = useRef(0.6);

  const object = useMemo(() => {
    const cloned = scene.clone(true);
    if (lens.id === "ai") {
      const group = new THREE.Group();
      cloned.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.isMesh) {
          const geo = subsampledPoints(mesh.geometry, 9);
          const pts = new THREE.Points(geo, makePointsMaterial(lens.accent));
          pts.position.copy(mesh.position);
          pts.quaternion.copy(mesh.quaternion);
          pts.scale.copy(mesh.scale);
          group.add(pts);
        }
      });
      return group;
    }
    const material = makeMaterial(lens);
    cloned.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) mesh.material = material;
    });
    return cloned;
  }, [scene, lens]);

  useEffect(() => {
    const rootObj = object;
    return () => {
      rootObj.traverse((o) => {
        const mesh = o as THREE.Mesh & { material?: THREE.Material | THREE.Material[] };
        const geo = mesh.geometry as THREE.BufferGeometry | undefined;
        if (geo?.userData?.mine) geo.dispose();
        const mats = mesh.material;
        if (!mats) return;
        for (const m of Array.isArray(mats) ? mats : [mats]) {
          const mm = m as THREE.Material & { map?: THREE.Texture; alphaMap?: THREE.Texture };
          mm.map?.dispose();
          mm.alphaMap?.dispose();
          m.dispose();
        }
      });
    };
  }, [object]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 30);
    const cam = camera as THREE.PerspectiveCamera;

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
        {/* Blender is Z-up; the carved face becomes +Y on export. Tilt to +Z. */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={object} />
        </group>
      </group>
    </group>
  );
}
