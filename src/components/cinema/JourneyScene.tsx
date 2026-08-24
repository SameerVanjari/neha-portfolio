"use client";

import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { damp, keyframes, sceneState } from "@/lib/sceneState";
import AmbientSpace from "./AmbientSpace";
import Bird from "./Bird";
import Tunnel from "./Tunnel";
import Fragments from "./Fragments";
import Platform from "./Platform";
import Timeline3D from "./Timeline3D";
import DimensionOrbs from "./DimensionOrbs";
import SentientEye from "./SentientEye";
import Logo from "./Logo";

type V3 = [number, number, number];

const CAM_POS: [number, V3][] = [
  [0.0, [0, 0.5, 5.8]],
  [0.05, [0, 0.4, 5.4]],
  [0.09, [-0.4, 0.45, 5.2]],
  [0.13, [0, 0.8, 3.2]],
  [0.16, [0, 0.9, 2.6]],
  [0.2, [0, 0.95, 1.8]],
  [0.24, [0, 0.85, 0.6]],
  [0.26, [0, 0.75, 0.0]],
  [0.3, [0, 0.7, -1.4]],
  [0.33, [0, 0.95, -0.2]],
  [0.36, [0, 1.35, 3.6]],
  [0.4, [0, 1.5, 4.4]],
  [0.44, [-2.5, 1.1, 3.8]],
  [0.48, [-0.5, 1.1, 3.9]],
  [0.52, [2.2, 1.1, 3.9]],
  [0.55, [0, 0.7, 7.2]],
  [0.64, [0, 0.7, 7.0]],
  [0.66, [0, 0.6, 3.8]],
  [0.71, [0, 0.45, 2.4]],
  [0.74, [0, 0.42, 1.9]],
  [0.78, [0, 0.42, 1.7]],
  [0.8, [0, 0.4, 4.8]],
  [0.84, [0, 0.4, 5.2]],
  [0.86, [0.3, 0.55, 5.6]],
  [1.0, [0.5, 0.6, 5.8]],
] as [number, V3][];

const CAM_LOOK: [number, V3][] = [
  [0.0, [0.8, 0.3, 0]],
  [0.09, [0.8, 0.3, 0]],
  [0.13, [0, 0.7, -1.0]],
  [0.2, [0, 0.7, -2.5]],
  [0.26, [0, 0.5, -4]],
  [0.3, [0, 0.4, -6]],
  [0.33, [0, 0.4, -3]],
  [0.36, [0, 0.1, 0]],
  [0.52, [0, 0.1, 0]],
  [0.55, [0, 0.6, 0]],
  [0.64, [0, 0.6, 0]],
  [0.66, [0, 0.45, 0.5]],
  [0.71, [0, 0.42, 0.5]],
  [0.78, [0, 0.42, 0.4]],
  [0.8, [0, 0.5, 0]],
  [0.84, [0, 0.5, 0]],
  [1.0, [0, 0.3, 0]],
] as [number, V3][];

const FOV: [number, number][] = [
  [0.0, 52],
  [0.13, 62],
  [0.26, 66],
  [0.33, 58],
  [0.4, 48],
  [0.52, 55],
  [0.64, 44],
  [0.71, 32],
  [0.78, 34],
  [0.8, 48],
  [1.0, 48],
];

function v3(keys: [number, V3][], p: number): V3 {
  if (p <= keys[0][0]) return keys[0][1];
  if (p >= keys[keys.length - 1][0]) return keys[keys.length - 1][1];
  for (let i = 1; i < keys.length; i++) {
    const [pa, va] = keys[i - 1];
    const [pb, vb] = keys[i];
    if (p <= pb) {
      const t = (p - pa) / (pb - pa);
      return [
        va[0] + (vb[0] - va[0]) * t,
        va[1] + (vb[1] - va[1]) * t,
        va[2] + (vb[2] - va[2]) * t,
      ] as V3;
    }
  }
  return keys[keys.length - 1][1];
}

function CameraRig() {
  useFrame((state, delta) => {
    const p = sceneState.progress;
    const pos = v3(CAM_POS, p);
    const look = v3(CAM_LOOK, p);
    const cam = state.camera as THREE.PerspectiveCamera;

    let px = pos[0];
    let lx = look[0];
    if (sceneState.selected >= 0 && p >= 0.52 && p <= 0.71) {
      const orbX = (sceneState.selected - 1.5) * 2;
      px += orbX * sceneState.selectedDeep * 0.6;
      lx += orbX * sceneState.selectedDeep * 0.35;
    }

    cam.position.x = damp(cam.position.x, px, 2, delta);
    cam.position.y = damp(cam.position.y, pos[1], 2, delta);
    cam.position.z = damp(cam.position.z, pos[2], 2, delta);

    const fov = keyframes(FOV, p);
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = damp(cam.fov, fov, 3, delta);
      cam.updateProjectionMatrix();
    }
    cam.lookAt(lx, look[1], look[2]);
  });
  return null;
}

export default function JourneyScene() {
  return (
    <>
      <color attach="background" args={["#04060c"]} />
      <fog attach="fog" args={["#04060c", 12, 55]} />

      <AmbientSpace />
      <Tunnel />
      <Fragments />
      <Platform />
      <Timeline3D />
      <DimensionOrbs />
      <SentientEye />
      <Logo />
      <Bird />

      <CameraRig />

      <EffectComposer>
        <Bloom
          intensity={1.35}
          luminanceThreshold={0.14}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.8}
        />
        <Noise opacity={0.035} />
        <Vignette eskil={false} offset={0.24} darkness={0.88} />
      </EffectComposer>
    </>
  );
}
