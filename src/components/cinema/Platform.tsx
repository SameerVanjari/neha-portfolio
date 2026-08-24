"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, remap, sceneState } from "@/lib/sceneState";

export default function Platform() {
  const group = useRef<THREE.Group>(null);
  const ringGroup = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;
    const vis = remap(p, 0.34, 0.42) * (1 - remap(p, 0.92, 1) * 0.65);

    if (ringGroup.current) {
      ringGroup.current.rotation.y += delta * 0.06;
      ringGroup.current.children.forEach((child, i) => {
        const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        m.opacity = damp(m.opacity, vis * (1 - i * 0.12), 3, delta);
      });
    }
    if (orbit.current) {
      orbit.current.rotation.y += delta * 0.3;
      const m = orbit.current.material as THREE.PointsMaterial;
      m.opacity = damp(m.opacity, vis * 0.8, 3, delta);
    }
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.4) * 0.02;
    }
  });

  return (
    <group ref={group}>
      {/* Glass disc */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[3.1, 3.1, 0.12, 64]} />
        <meshBasicMaterial color="#0a1424" transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.0, 64]} />
        <meshBasicMaterial
          color="#0d1f3a"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Concentric neon rings */}
      <group ref={ringGroup} position={[0, 0.02, 0]}>
        {[
          { r: 1.5, c: "#00e5ff" },
          { r: 2.15, c: "#8b5cff" },
          { r: 2.85, c: "#38b6ff" },
        ].map((ring, i) => (
          <mesh key={ring.r} rotation={[i === 2 ? -0.12 : 0, 0, 0]}>
            <torusGeometry args={[ring.r, 0.018, 8, 96]} />
            <meshBasicMaterial
              color={ring.c}
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
        <mesh>
          <torusGeometry args={[2.98, 0.04, 8, 96]} />
          <meshBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Orbiting dust */}
      <points ref={orbit}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              (() => {
                const n = 90;
                const arr = new Float32Array(n * 3);
                for (let i = 0; i < n; i++) {
                  const a = (i / n) * Math.PI * 2;
                  arr[i * 3] = Math.cos(a) * 2.4;
                  arr[i * 3 + 1] = 0.1;
                  arr[i * 3 + 2] = Math.sin(a) * 2.4;
                }
                return arr;
              })(),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#38b6ff"
          size={0.05}
          transparent
          opacity={0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
