"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 1800;
const STARS = new Float32Array(STAR_COUNT * 3);
const STAR_COLORS = new Float32Array(STAR_COUNT * 3);
const PALETTE = [
  [0, 229, 255],
  [139, 92, 255],
  [255, 43, 214],
  [56, 182, 255],
  [233, 237, 246],
] as const;
for (let i = 0; i < STAR_COUNT; i++) {
  const r = 12 + Math.random() * 26;
  const a = Math.random() * Math.PI * 2;
  const b = Math.acos(2 * Math.random() - 1);
  STARS[i * 3] = r * Math.sin(b) * Math.cos(a);
  STARS[i * 3 + 1] = r * Math.cos(b) * 0.5;
  STARS[i * 3 + 2] = r * Math.sin(b) * Math.sin(a) - 4;
  const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  STAR_COLORS[i * 3] = c[0] / 255;
  STAR_COLORS[i * 3 + 1] = c[1] / 255;
  STAR_COLORS[i * 3 + 2] = c[2] / 255;
}

export default function AmbientSpace() {
  const stars = useRef<THREE.Points>(null);
  const drift = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (stars.current) stars.current.rotation.y += delta * 0.004;
    if (drift.current) {
      drift.current.rotation.y += delta * 0.006;
      drift.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.06;
    }
  });

  return (
    <group ref={drift}>
      <points ref={stars}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[STARS, 3]} />
          <bufferAttribute attach="attributes-color" args={[STAR_COLORS, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Nebula washes */}
      <mesh position={[-8, 2, -14]} scale={9}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#8b5cff"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[9, -1, -16]} scale={10}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.045}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[3, 4, -18]} scale={8}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#ff2bd6"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
