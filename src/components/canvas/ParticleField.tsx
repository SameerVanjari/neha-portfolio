import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 1600;
const PALETTE = [
  [0, 240, 255],
  [124, 92, 255],
  [255, 43, 214],
] as const;

const POSITIONS = new Float32Array(COUNT * 3);
const COLORS = new Float32Array(COUNT * 3);
for (let i = 0; i < COUNT; i++) {
  POSITIONS[i * 3] = (Math.random() - 0.5) * 24;
  POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 15;
  POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2;
  const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  COLORS[i * 3] = c[0] / 255;
  COLORS[i * 3 + 1] = c[1] / 255;
  COLORS[i * 3 + 2] = c[2] / 255;
}

export default function ParticleField() {
  const points = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.008;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
        <bufferAttribute attach="attributes-color" args={[COLORS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
