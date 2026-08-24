"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, remap, sceneState } from "@/lib/sceneState";

const RING_COUNT = 26;
const RING_PTS = 110;
const RING_DATA = new Float32Array(RING_COUNT * RING_PTS * 3);
const RING_COLORS = new Float32Array(RING_COUNT * RING_PTS * 3);
const PALETTE = [
  [0, 229, 255],
  [139, 92, 255],
  [255, 43, 214],
  [56, 182, 255],
] as const;
for (let i = 0; i < RING_COUNT; i++) {
  const z = 6 - i * 2;
  const radius = 2.3 + Math.sin(i * 1.7) * 0.5;
  const twist = i * 0.35;
  for (let j = 0; j < RING_PTS; j++) {
    const a = (j / RING_PTS) * Math.PI * 2 + twist;
    const idx = i * RING_PTS + j;
    RING_DATA[idx * 3] = Math.cos(a) * radius;
    RING_DATA[idx * 3 + 1] = Math.sin(a) * radius;
    RING_DATA[idx * 3 + 2] = z;
    const c = PALETTE[(i + j) % PALETTE.length];
    RING_COLORS[idx * 3] = c[0] / 255;
    RING_COLORS[idx * 3 + 1] = c[1] / 255;
    RING_COLORS[idx * 3 + 2] = c[2] / 255;
  }
}

const STREAM_COUNT = 2600;
const STREAM = new Float32Array(STREAM_COUNT * 3);
const STREAM_COLORS = new Float32Array(STREAM_COUNT * 3);
for (let i = 0; i < STREAM_COUNT; i++) {
  const a = Math.random() * Math.PI * 2;
  const r = Math.pow(Math.random(), 0.6) * 3.4;
  STREAM[i * 3] = Math.cos(a) * r;
  STREAM[i * 3 + 1] = Math.sin(a) * r;
  STREAM[i * 3 + 2] = 6 - Math.random() * 46;
  const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  STREAM_COLORS[i * 3] = c[0] / 255;
  STREAM_COLORS[i * 3 + 1] = c[1] / 255;
  STREAM_COLORS[i * 3 + 2] = c[2] / 255;
}

function Trail({ seed }: { seed: number }) {
  const N = 14;
  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    const side = seed % 2 === 0 ? 1 : -1;
    const radius = 2.2 + (seed % 7) * 0.22;
    for (let i = 0; i < N; i++) {
      const z = 5 - i * 2.4;
      const sway = Math.sin(seed * 3.1 + i * 0.55) * (0.35 + radius * 0.18);
      arr[i * 3] = (side * radius * 0.6) + sway;
      arr[i * 3 + 1] = side * Math.cos(seed * 1.3 + i * 0.4) * radius * 0.5;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [seed]);
  const colors = useMemo(() => {
    const arr = new Float32Array(N * 3);
    const c = PALETTE[seed % PALETTE.length];
    for (let i = 0; i < N; i++) {
      const f = 1 - i / N;
      arr[i * 3] = (c[0] / 255) * f;
      arr[i * 3 + 1] = (c[1] / 255) * f;
      arr[i * 3 + 2] = (c[2] / 255) * f;
    }
    return arr;
  }, [seed]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
    </line>
  );
}

export default function Tunnel() {
  const ringsMat = useRef<THREE.PointsMaterial>(null);
  const streamMat = useRef<THREE.PointsMaterial>(null);
  const streamRef = useRef<THREE.Points>(null);
  const vortexGroup = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;

    const vis = remap(p, 0.13, 0.2) * (1 - remap(p, 0.33, 0.4));
    const deeper = remap(p, 0.24, 0.31) * (1 - remap(p, 0.33, 0.38));
    const total = Math.min(1, vis + deeper);

    if (ringsMat.current)
      ringsMat.current.opacity = damp(ringsMat.current.opacity, total * 0.85, 3, delta);
    if (streamMat.current)
      streamMat.current.opacity = damp(streamMat.current.opacity, total, 3, delta);

    // Stream particles flow toward the camera, accelerating in DEEPER.
    const geo = streamRef.current?.geometry as THREE.BufferGeometry | undefined;
    if (geo) {
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const speed = (8 + deeper * 22) * delta;
      for (let i = 0; i < STREAM_COUNT; i++) {
        let z = pos.getZ(i) + speed;
        if (z > 7) z -= 46;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
    }

    if (vortexGroup.current) {
      vortexGroup.current.rotation.z += delta * 0.4;
      vortexGroup.current.children.forEach((child, i) => {
        child.rotation.x = t * 0.5 + i * 0.4;
        child.rotation.y = -t * 0.3 + i;
        const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        m.opacity = damp(m.opacity, deeper * 0.5, 3, delta);
      });
    }
  });

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[RING_DATA, 3]} />
          <bufferAttribute attach="attributes-color" args={[RING_COLORS, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={ringsMat}
          size={0.07}
          vertexColors
          transparent
          opacity={0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points ref={streamRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[STREAM, 3]} />
          <bufferAttribute attach="attributes-color" args={[STREAM_COLORS, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={streamMat}
          size={0.06}
          vertexColors
          transparent
          opacity={0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {Array.from({ length: 14 }, (_, i) => (
        <Trail key={i} seed={i} />
      ))}

      {/* Vortex rings — gravitational structures */}
      <group ref={vortexGroup}>
        {[4, 0, -4, -8, -12, -16, -20].map((z, i) => (
          <mesh key={z} position={[0, 0, z]} rotation={[0.6 + i * 0.2, 0, 0]} scale={2 + i * 0.18}>
            <torusGeometry args={[1, 0.02, 8, 90]} />
            <meshBasicMaterial
              color={["#00e5ff", "#8b5cff", "#ff2bd6", "#38b6ff"][i % 4]}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
