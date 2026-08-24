"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { damp, keyframes, sceneState } from "@/lib/sceneState";
import NeuralCore from "./NeuralCore";
import OrbitRing from "./OrbitRing";
import HoloRing from "./HoloRing";
import ParticleField from "./ParticleField";
import CityGrid from "./CityGrid";
import Beacon from "./Beacon";

type Vec3 = [number, number, number];

const CAM_POS: [number, Vec3][] = [
  [0.0, [0, 0, 6.6]],
  [0.2, [1.2, 0.15, 6.2]],
  [0.42, [0, 1.6, 5.2]],
  [0.58, [0, 2.3, 5.0]],
  [0.7, [0, 0.55, 7.0]],
  [0.9, [0, 0.0, 4.6]],
  [1.0, [0, 0.0, 4.1]],
];

const CAM_LOOK: [number, Vec3][] = [
  [0.0, [0, 0, 0]],
  [0.4, [0, -0.4, 0]],
  [0.6, [0, -1.4, 0]],
  [0.7, [0, 0, 0]],
  [1.0, [0, 0, 0]],
];

const FOV: [number, number][] = [
  [0.0, 55],
  [0.7, 50],
  [0.9, 46],
  [1.0, 46],
];

function vkeyframe(keys: [number, Vec3][], p: number) {
  const k = keys[keys.length - 1][0];
  const v = Math.min(1, Math.max(0, p));
  if (v <= keys[0][0]) return keys[0][1];
  if (v >= k) return keys[keys.length - 1][1];
  for (let i = 1; i < keys.length; i++) {
    const [pa, va] = keys[i - 1];
    const [pb, vb] = keys[i];
    if (v <= pb) {
      const t = (v - pa) / (pb - pa);
      return [
        va[0] + (vb[0] - va[0]) * t,
        va[1] + (vb[1] - va[1]) * t,
        va[2] + (vb[2] - va[2]) * t,
      ] as Vec3;
    }
  }
  return keys[keys.length - 1][1];
}

function CameraRig() {
  useFrame((state, delta) => {
    const p = sceneState.progress;
    const pos = vkeyframe(CAM_POS, p);
    const look = vkeyframe(CAM_LOOK, p);
    const cam = state.camera as THREE.PerspectiveCamera;

    cam.position.x = damp(cam.position.x, pos[0], 2, delta);
    cam.position.y = damp(cam.position.y, pos[1], 2, delta);
    cam.position.z = damp(cam.position.z, pos[2], 2, delta);

    const fov = keyframes(FOV, p);
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = damp(cam.fov, fov, 3, delta);
      cam.updateProjectionMatrix();
    }
    cam.lookAt(look[0], look[1], look[2]);
  });
  return null;
}

export default function Scene() {
  const drift = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (drift.current) drift.current.rotation.y += delta * 0.012;
  });

  return (
    <>
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 9, 24]} />

      <group ref={drift}>
        <NeuralCore />
        <OrbitRing
          color="#00f0ff"
          radiusKeys={[
            [0, 2.2],
            [0.4, 0.3],
            [0.7, 2.2],
            [0.9, 1.2],
            [1, 0.7],
          ]}
          opacityKeys={[
            [0, 0.9],
            [0.4, 0.15],
            [0.7, 0.9],
            [1, 0.9],
          ]}
        />
        <OrbitRing
          color="#ff2bd6"
          tilt={-0.9}
          spin={-0.24}
          radiusKeys={[
            [0, 2.9],
            [0.4, 0.45],
            [0.7, 3.0],
            [0.9, 1.6],
            [1, 1.0],
          ]}
          opacityKeys={[
            [0, 0.7],
            [0.4, 0.12],
            [0.7, 0.8],
            [1, 0.8],
          ]}
        />
        <OrbitRing
          color="#7c5cff"
          tilt={0.9}
          spin={0.16}
          size={0.07}
          count={70}
          radiusKeys={[
            [0, 3.6],
            [0.4, 0.6],
            [0.7, 3.8],
            [0.9, 2.0],
            [1, 1.3],
          ]}
          opacityKeys={[
            [0, 0.4],
            [0.4, 0.1],
            [0.7, 0.6],
            [1, 0.6],
          ]}
        />

        <HoloRing
          radius={2.2}
          color="#00f0ff"
          opacityKeys={[
            [0, 0],
            [0.68, 0],
            [0.74, 0.5],
            [1, 0.5],
          ]}
        />
        <HoloRing
          radius={3.0}
          color="#7c5cff"
          y={0.15}
          tilt={[1.4, 0.4, 0]}
          speed={-0.16}
          opacityKeys={[
            [0, 0],
            [0.7, 0],
            [0.76, 0.45],
            [1, 0.45],
          ]}
        />
        <HoloRing
          radius={3.8}
          color="#ff2bd6"
          y={-0.1}
          tilt={[0.9, -0.3, 0]}
          speed={0.2}
          opacityKeys={[
            [0, 0],
            [0.72, 0],
            [0.78, 0.4],
            [1, 0.4],
          ]}
        />

        <CityGrid />
        <Beacon />
      </group>

      <ParticleField />
      <Sparkles
        count={110}
        scale={[12, 8, 12]}
        position={[0, 1, -2]}
        size={2.4}
        speed={0.35}
        opacity={0.5}
        color="#00f0ff"
      />

      <CameraRig />

      <EffectComposer>
        <Bloom
          intensity={1.15}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.75}
        />
        <Noise opacity={0.04} />
        <Vignette eskil={false} offset={0.28} darkness={0.85} />
      </EffectComposer>
    </>
  );
}
