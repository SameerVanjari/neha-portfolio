import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, keyframes, sceneState } from "@/lib/sceneState";

const SCALE = [
  [0.0, 1.0],
  [0.2, 0.62],
  [0.42, 0.4],
  [0.68, 0.4],
  [0.74, 0.88],
  [0.9, 1.05],
  [1.0, 1.05],
] as [number, number][];

const OPACITY = [
  [0.0, 1.0],
  [0.36, 1.0],
  [0.42, 0.3],
  [0.66, 0.3],
  [0.72, 0.95],
  [1.0, 1.0],
] as [number, number][];

const X = [
  [0.0, 0.0],
  [0.18, 0.85],
  [0.36, 0.85],
  [0.55, 0.0],
  [1.0, 0.0],
] as [number, number][];

export default function NeuralCore() {
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  const wireMat = useRef<THREE.MeshBasicMaterial>(null);
  const innerMat = useRef<THREE.MeshBasicMaterial>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    const p = sceneState.progress;
    const scale = keyframes(SCALE, p);
    const opacity = keyframes(OPACITY, p);
    const x = keyframes(X, p);

    const g = group.current;
    if (!g) return;
    g.position.x = damp(g.position.x, x, 3, delta);
    g.scale.setScalar(damp(g.scale.x, scale, 3.5, delta));

    if (outer.current) {
      outer.current.rotation.y += delta * 0.28;
      outer.current.rotation.x += delta * 0.07;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.42;
      inner.current.rotation.z += delta * 0.12;
    }
    if (glow.current) {
      const t = performance.now() / 1000;
      glow.current.rotation.z = t * 0.1;
    }

    if (wireMat.current)
      wireMat.current.opacity = damp(wireMat.current.opacity, opacity, 4, delta);
    if (innerMat.current)
      innerMat.current.opacity = damp(innerMat.current.opacity, opacity * 0.7, 4, delta);
    if (glowMat.current)
      glowMat.current.opacity = damp(glowMat.current.opacity, opacity * 0.25, 4, delta);
  });

  return (
    <group ref={group}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial ref={wireMat} color="#00f0ff" wireframe transparent opacity={0.9} />
      </mesh>
      <mesh ref={inner} scale={0.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial ref={innerMat} color="#ff2bd6" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={glow} scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial ref={glowMat} color="#7c5cff" transparent opacity={0.14} />
      </mesh>
    </group>
  );
}
