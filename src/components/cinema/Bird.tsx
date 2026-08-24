"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, keyframes, sceneState } from "@/lib/sceneState";

type V3 = [number, number, number];

const POS: [number, V3][] = [
  [0.0, [3.6, 1.7, 1.6]],
  [0.02, [3.1, 1.4, 0.9]],
  [0.05, [2.7, 1.15, 0.4]],
  [0.065, [2.5, 1.05, 0.3]],
  [0.09, [2.35, 0.8, 0.5]],
  [0.13, [2.3, 0.62, 0.6]],
  [0.15, [1.6, 1.15, 0.7]],
  [0.17, [0.7, 1.5, 0.5]],
  [0.2, [0.15, 1.35, -0.6]],
  [0.24, [0, 0.8, -1.8]],
  [0.26, [0, 0.55, -3.2]],
  [0.3, [0, 0.45, -5.4]],
  [0.33, [0, 0.6, -2.6]],
  [0.36, [0, 0.5, -0.9]],
  [0.4, [0, 0.12, 0.1]],
  [0.41, [0, 0.45, 0.6]],
  [0.46, [-2.6, 0.5, 0.6]],
  [0.52, [2.6, 0.5, 0.6]],
  [0.55, [0, 0.35, 0.8]],
  [0.64, [0, 0.4, 1.0]],
  [0.71, [0, 0.42, 1.1]],
  [0.8, [2.2, 0.7, 1.6]],
  [0.84, [2.4, 0.7, 1.7]],
  [0.9, [3.0, 0.6, 1.6]],
  [1.0, [3.4, 0.6, 1.8]],
] as [number, V3][];

const YAW: [number, number][] = [
  [0.0, -1.57],
  [0.05, -0.6],
  [0.09, -0.25],
  [0.13, -0.15],
  [0.15, -1.2],
  [0.17, -3.0],
  [0.2, 3.0],
  [0.24, 3.1],
  [0.3, 3.0],
  [0.33, 2.9],
  [0.36, 0.5],
  [0.4, 0.0],
  [1.0, 0.0],
] as [number, number][];

const PITCH: [number, number][] = [
  [0.0, 0.0],
  [0.09, 0.0],
  [0.15, -0.28],
  [0.2, 0.0],
  [0.26, 0.32],
  [0.33, 0.2],
  [0.36, 0.12],
  [0.4, 0.0],
  [1.0, 0.0],
] as [number, number][];

const FLAP: [number, number][] = [
  [0.0, 0.08],
  [0.13, 0.1],
  [0.15, 0.5],
  [0.2, 0.92],
  [0.26, 0.95],
  [0.33, 0.72],
  [0.36, 0.3],
  [0.4, 0.08],
  [0.64, 0.05],
  [0.71, 0.04],
  [0.84, 0.06],
  [1.0, 0.05],
] as [number, number][];

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

export default function Bird() {
  const rig = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const wingL = useRef<THREE.Group>(null);
  const wingR = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Group>(null);
  const pupilL = useRef<THREE.Mesh>(null);
  const pupilR = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const rigRef = rig.current;
    if (!rigRef) return;
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;

    const target = v3(POS, p);
    const yaw = keyframes(YAW, p);
    const pitch = keyframes(PITCH, p);
    const flap = keyframes(FLAP, p);

    // Selection offset — bird drifts toward the chosen dimension orb.
    let tx = target[0];
    if (sceneState.selected >= 0 && p >= 0.52 && p <= 0.71) {
      const orbX = (sceneState.selected - 1.5) * 2;
      tx += (orbX - target[0]) * sceneState.selectedDeep * 0.55;
    }
    // Milestone hover — bird perches toward a milestone in the timeline scene.
    if (sceneState.milestone >= 0 && p >= 0.4 && p <= 0.52) {
      const mx = sceneState.milestone * 2 - 3;
      tx += (mx - target[0]) * 0.5;
    }

    rigRef.position.x = damp(rigRef.position.x, tx, 2.2, delta);
    rigRef.position.y = damp(rigRef.position.y, target[1], 2.6, delta);
    rigRef.position.z = damp(rigRef.position.z, target[2], 2.2, delta);

    rigRef.rotation.y = damp(rigRef.rotation.y, yaw, 2.6, delta);
    rigRef.rotation.x = damp(rigRef.rotation.x, pitch, 2.4, delta);

    // Hover bob
    const bob = p < 0.4 || p > 0.71 ? Math.sin(t * 1.6) * 0.05 : Math.sin(t * 2.2) * 0.035;
    rigRef.position.y += bob * (p > 0.4 ? 0.5 : 1);

    // Flap
    const flapAmp = flap * 0.85;
    const flapSpeed = flap > 0.5 ? 11 : 6;
    const f = Math.sin(t * flapSpeed);
    if (wingL.current) wingL.current.rotation.z = 0.55 + f * flapAmp;
    if (wingR.current) wingR.current.rotation.z = -0.55 - f * flapAmp;
    if (tail.current) tail.current.rotation.y = Math.sin(t * 1.4) * 0.08;

    // Head look target
    let lx = 0;
    let ly = 0;
    let lz = 2;
    if (sceneState.birdLook >= 0 && p >= 0.52 && p <= 0.71) {
      lx = (sceneState.birdLook - 1.5) * 2 - rigRef.position.x;
      ly = 1.3 - rigRef.position.y;
      lz = 0;
    } else if (sceneState.milestone >= 0 && p >= 0.4 && p <= 0.52) {
      lx = (sceneState.milestone * 2 - 3) - rigRef.position.x;
      lz = 0;
    }
    let hy = 0;
    let hp = 0;
    if (head.current) {
      hy = Math.atan2(lx, lz);
      const dist = Math.hypot(lx, lz);
      hp = Math.atan2(ly, dist || 1);
      head.current.rotation.y = damp(head.current.rotation.y, hy, 3, delta);
      head.current.rotation.x = damp(head.current.rotation.x, hp, 3, delta);
    }

    // Pupils track the look target
    const pl = 0.35 * Math.sin(hy);
    const pp = 0.35 * Math.sin(hp);
    if (pupilL.current) pupilL.current.position.set(pl, pp, 0.16);
    if (pupilR.current) pupilR.current.position.set(pl, pp, 0.16);

    // Body subtle sway
    if (body.current) body.current.rotation.z = Math.sin(t * 0.8) * 0.03;
  });

  return (
    <group ref={rig}>
      {/* ---- Body ---- */}
      <group ref={body}>
        <mesh scale={[0.85, 0.72, 1.25]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color="#0d1626" transparent opacity={0.95} />
        </mesh>
        <mesh scale={[0.85, 0.72, 1.25]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.1} />
        </mesh>
        <mesh position={[0, -0.18, 0.12]} scale={[0.5, 0.3, 0.85]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color="#0a2a3a"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Wings */}
        <group ref={wingL} position={[0.52, 0.12, 0]}>
          <mesh position={[0, 0, -0.55]} scale={[0.16, 0.035, 1.2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#1a3a5a" transparent opacity={0.95} />
          </mesh>
          <mesh position={[0, 0, -1.05]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#8b5cff" />
          </mesh>
        </group>
        <group ref={wingR} position={[-0.52, 0.12, 0]}>
          <mesh position={[0, 0, -0.55]} scale={[0.16, 0.035, 1.2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#1a3a5a" transparent opacity={0.95} />
          </mesh>
          <mesh position={[0, 0, -1.05]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#ff2bd6" />
          </mesh>
        </group>

        {/* Tail */}
        <group ref={tail} position={[0, 0.05, -1.05]}>
          <mesh position={[-0.28, 0, 0]} rotation={[0, 0.5, 0]} scale={[0.09, 0.025, 1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#8b5cff" transparent opacity={0.9} />
          </mesh>
          <mesh scale={[0.1, 0.025, 1.15]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#12324a" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0.28, 0, 0]} rotation={[0, -0.5, 0]} scale={[0.09, 0.025, 1]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.8} />
          </mesh>
        </group>
      </group>

      {/* ---- Head ---- */}
      <group ref={head} position={[0, 0.62, 0.62]}>
        <mesh>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshBasicMaterial color="#101c30" transparent opacity={0.95} />
        </mesh>
        {/* Beak */}
        <mesh position={[0, 0, 0.38]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.09, 0.34, 8]} />
          <meshBasicMaterial color="#ffc94d" transparent opacity={0.95} />
        </mesh>
        {/* Crest */}
        <mesh position={[0, 0.3, -0.02]} rotation={[-0.4, 0, 0]}>
          <coneGeometry args={[0.07, 0.22, 8]} />
          <meshBasicMaterial color="#0a2a3a" transparent opacity={0.9} />
        </mesh>

        {/* Eyes */}
        <group position={[0.16, 0.08, 0.22]}>
          <mesh>
            <sphereGeometry args={[0.095, 16, 16]} />
            <meshBasicMaterial color="#111a2e" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.9} />
          </mesh>
          <mesh ref={pupilR}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color="#020308" />
          </mesh>
        </group>
        <group position={[-0.16, 0.08, 0.22]}>
          <mesh>
            <sphereGeometry args={[0.095, 16, 16]} />
            <meshBasicMaterial color="#111a2e" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.9} />
          </mesh>
          <mesh ref={pupilL}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color="#020308" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
