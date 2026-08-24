"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, remap, sceneState } from "@/lib/sceneState";

const ORBS = [
  { x: -3, color: "#00e5ff", core: "#bdf4ff" },
  { x: -1, color: "#ffc94d", core: "#fff0c2" },
  { x: 1, color: "#ff2bd6", core: "#ffd0f4" },
  { x: 3, color: "#8b5cff", core: "#dcc9ff" },
];

export default function DimensionOrbs() {
  const group = useRef<THREE.Group>(null);
  const orbs = useRef<(THREE.Group | null)[]>([]);

  useFrame((state, delta) => {
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;
    const vis = remap(p, 0.52, 0.58) * (1 - remap(p, 0.66, 0.72));

    orbs.current.forEach((orb, i) => {
      if (!orb) return;
      const hovered = sceneState.hovered === i;
      const selected = sceneState.selected === i;
      let target = vis * (selected || hovered ? 1 : 0.5);
      if (sceneState.hovered >= 0 && !hovered && !selected) target = vis * 0.22;

      orb.position.y = 1.35 + Math.sin(t * 1.1 + i * 1.7) * 0.12;
      const scale = (selected ? 1.55 : hovered ? 1.25 : 1) * (0.3 + vis * 0.7);
      orb.scale.setScalar(damp(orb.scale.x, scale, 4, delta));

      orb.children.forEach((child, ci) => {
        const mesh = child as THREE.Mesh;
        const m = mesh.material as THREE.MeshBasicMaterial;
        const base = ci === 0 ? 0.9 : ci === 1 ? 0.75 : 0.5;
        m.opacity = damp(m.opacity, target * base, 4, delta);
        if (selected) m.color.set(ORBS[i].core);
      });
    });
  });

  return (
    <group ref={group}>
      {ORBS.map((orb, i) => (
        <group
          key={orb.color}
          ref={(el) => {
            orbs.current[i] = el;
          }}
          position={[orb.x, 1.35, 0]}
        >
          <mesh>
            <sphereGeometry args={[0.32, 24, 24]} />
            <meshBasicMaterial
              color={orb.core}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh>
            <torusGeometry args={[0.52, 0.035, 12, 64]} />
            <meshBasicMaterial
              color={orb.color}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[0.78, 0.018, 12, 80]} />
            <meshBasicMaterial
              color={orb.color}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.95, 24, 24]} />
            <meshBasicMaterial
              color={orb.color}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              wireframe
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
