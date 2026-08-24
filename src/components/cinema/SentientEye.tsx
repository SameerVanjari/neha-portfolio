"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, remap, sceneState, scene } from "@/lib/sceneState";
import { S } from "@/lib/journey";

const WEB_COUNT = 900;
const WEB = new Float32Array(WEB_COUNT * 3);
const WEB_COLORS = new Float32Array(WEB_COUNT * 3);
const WPALETTE = [
  [0, 229, 255],
  [139, 92, 255],
  [255, 43, 214],
] as const;
for (let i = 0; i < WEB_COUNT; i++) {
  const layer = Math.floor(i / 300);
  const r = 0.1 + Math.random() * 0.5 * (layer + 1) * 0.6;
  const a = Math.random() * Math.PI * 2;
  WEB[i * 3] = Math.cos(a) * r;
  WEB[i * 3 + 1] = Math.sin(a) * r;
  WEB[i * 3 + 2] = (Math.random() - 0.5) * 0.28;
  const c = WPALETTE[i % WPALETTE.length];
  WEB_COLORS[i * 3] = c[0] / 255;
  WEB_COLORS[i * 3 + 1] = c[1] / 255;
  WEB_COLORS[i * 3 + 2] = c[2] / 255;
}

export default function SentientEye() {
  const group = useRef<THREE.Group>(null);
  const irisMat = useRef<THREE.MeshBasicMaterial>(null);
  const pupilMat = useRef<THREE.MeshBasicMaterial>(null);
  const webMat = useRef<THREE.PointsMaterial>(null);
  const webRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;
    const s8 = scene(S.EYE);
    const s9 = scene(S.SENTIENT);

    const vis = remap(p, 0.62, 0.7) * (1 - remap(p, 0.78, 0.82));

    const g = group.current;
    if (!g) return;
    g.position.set(0, 0.42, 0.35);
    const scale = 0.15 + s8 * 2.0 + s9 * 0.85;
    g.scale.setScalar(damp(g.scale.x, scale, 3.5, delta));
    g.rotation.z = damp(g.rotation.z, t * (0.1 + s9 * 0.5), 3, delta);

    if (irisMat.current) irisMat.current.opacity = damp(irisMat.current.opacity, vis, 3, delta);
    if (pupilMat.current) pupilMat.current.opacity = damp(pupilMat.current.opacity, vis, 3, delta);
    if (webMat.current) {
      webMat.current.opacity = damp(webMat.current.opacity, vis * s9 * 1.2, 3, delta);
    }

    if (webRef.current) {
      webRef.current.rotation.z += delta * (0.4 + s9 * 1.6);
      webRef.current.rotation.y = Math.sin(t * 0.6) * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (0.6 + s9 * 2.4);
      const m = ringRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = damp(m.opacity, vis * (0.4 + s9 * 0.6), 3, delta);
    }
  });

  return (
    <group ref={group}>
      {/* Sclera */}
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#0a1020" side={THREE.DoubleSide} />
      </mesh>
      {/* Rim glow */}
      <mesh>
        <torusGeometry args={[1.0, 0.035, 8, 96]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Iris base */}
      <mesh scale={[1, 1, 0.32]}>
        <sphereGeometry args={[0.66, 40, 40]} />
        <meshBasicMaterial ref={irisMat} color="#241a52" transparent opacity={0} />
      </mesh>
      {/* Iris ring */}
      <mesh>
        <torusGeometry args={[0.5, 0.05, 12, 72]} />
        <meshBasicMaterial
          color="#8b5cff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Neural web */}
      <points ref={webRef} position={[0, 0, 0.22]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[WEB, 3]} />
          <bufferAttribute attach="attributes-color" args={[WEB_COLORS, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={webMat}
          size={0.045}
          vertexColors
          transparent
          opacity={0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {/* Fast energy ring */}
      <mesh ref={ringRef} position={[0, 0, 0.2]}>
        <torusGeometry args={[0.3, 0.015, 8, 64]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Pupil */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial ref={pupilMat} color="#010207" transparent opacity={0} />
      </mesh>
      {/* Glint */}
      <mesh position={[0.18, 0.2, 0.86]} scale={0.07}>
        <sphereGeometry args={[1, 16, 16]} />
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
