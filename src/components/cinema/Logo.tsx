"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, keyframes, remap, sceneState } from "@/lib/sceneState";

const X: [number, number][] = [
  [0.76, 0],
  [0.82, 0],
  [0.86, 1.6],
  [1.0, 2.8],
];

const Y: [number, number][] = [
  [0.76, 0.55],
  [0.82, 0.55],
  [0.86, 0.62],
  [1.0, 0.7],
];

const SCALE: [number, number][] = [
  [0.76, 0.0],
  [0.82, 1.0],
  [0.84, 1.05],
  [0.86, 0.85],
  [1.0, 0.7],
];

export default function Logo() {
  const group = useRef<THREE.Group>(null);
  const ringOuter = useRef<THREE.Mesh>(null);
  const ringInner = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const spark = useRef<THREE.Mesh>(null);
  const haloMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;
    const vis = remap(p, 0.77, 0.82) * (1 - remap(p, 0.9, 1) * 0.2);

    const g = group.current;
    if (!g) return;
    g.position.x = damp(g.position.x, keyframes(X, p), 2.2, delta);
    g.position.y = damp(g.position.y, keyframes(Y, p), 2.2, delta);
    const s = keyframes(SCALE, p);
    g.scale.setScalar(damp(g.scale.x, s, 3, delta));
    g.rotation.y += delta * 0.2;

    if (ringOuter.current) ringOuter.current.rotation.z += delta * 0.3;
    if (ringInner.current) {
      ringInner.current.rotation.z -= delta * 0.5;
      ringInner.current.rotation.x = Math.sin(t * 0.6) * 0.4;
    }
    if (core.current) core.current.rotation.y += delta * 0.6;
    if (spark.current) {
      const m = spark.current.material as THREE.MeshBasicMaterial;
      m.opacity = damp(m.opacity, vis * (0.6 + Math.sin(t * 4) * 0.3), 4, delta);
    }
    if (haloMat.current) haloMat.current.opacity = damp(haloMat.current.opacity, vis * 0.35, 3, delta);
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial
          ref={haloMat}
          color="#8b5cff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringOuter}>
        <torusGeometry args={[0.85, 0.035, 12, 96]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringInner}>
        <torusGeometry args={[0.6, 0.02, 12, 80]} />
        <meshBasicMaterial
          color="#8b5cff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={core}>
        <octahedronGeometry args={[0.34, 0]} />
        <meshBasicMaterial
          color="#38b6ff"
          wireframe
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={spark} position={[0, 0, 0.18]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
