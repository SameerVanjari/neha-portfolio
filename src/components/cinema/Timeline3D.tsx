"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, remap, sceneState } from "@/lib/sceneState";

const MILESTONES = [
  { x: -3, color: "#00e5ff" },
  { x: -1, color: "#8b5cff" },
  { x: 1, color: "#ff2bd6" },
  { x: 3, color: "#ffc94d" },
];

export default function Timeline3D() {
  const group = useRef<THREE.Group>(null);
  const lineMat = useRef<THREE.MeshBasicMaterial>(null);
  const markers = useRef<(THREE.Group | null)[]>([]);

  useFrame((state, delta) => {
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;
    const vis = remap(p, 0.4, 0.46) * (1 - remap(p, 0.52, 0.58));

    if (lineMat.current) lineMat.current.opacity = damp(lineMat.current.opacity, vis * 0.8, 3, delta);

    markers.current.forEach((marker, i) => {
      if (!marker) return;
      const active = sceneState.milestone === i;
      const pulse = 1 + Math.sin(t * 2 + i) * (active ? 0.25 : 0.08);
      marker.scale.setScalar(damp(marker.scale.x, active ? 1.5 * pulse : pulse, 4, delta));
      marker.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const m = mesh.material as THREE.MeshBasicMaterial;
        m.opacity = damp(m.opacity, vis * (active ? 1 : 0.5), 4, delta);
      });
    });
  });

  return (
    <group ref={group}>
      {/* Glowing rail */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[10.2, 0.02, 0.02]} />
        <meshBasicMaterial
          ref={lineMat}
          color="#00e5ff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {MILESTONES.map((m, i) => (
        <group
          key={m.x}
          ref={(el) => {
            markers.current[i] = el;
          }}
          position={[m.x, 0.55, 0]}
        >
          <mesh>
            <torusGeometry args={[0.34, 0.025, 8, 48]} />
            <meshBasicMaterial
              color={m.color}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial
              color={m.color}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
