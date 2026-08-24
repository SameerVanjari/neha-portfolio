import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, keyframes, sceneState } from "@/lib/sceneState";

const OPACITY = [
  [0.0, 0.0],
  [0.9, 0.0],
  [0.93, 1.0],
  [1.0, 1.0],
] as [number, number][];

const SCALE = [
  [0.0, 0.0],
  [0.9, 0.0],
  [0.93, 0.5],
  [1.0, 0.85],
] as [number, number][];

export default function Beacon() {
  const mesh = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const haloMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    const p = sceneState.progress;
    const opacity = keyframes(OPACITY, p);
    const scale = keyframes(SCALE, p);
    const t = performance.now() / 1000;
    const pulse = 1 + Math.sin(t * 3.4) * 0.08;

    if (mesh.current) {
      mesh.current.scale.setScalar(damp(mesh.current.scale.x, scale * pulse, 4, delta));
      mesh.current.rotation.y += delta * 0.6;
    }
    if (halo.current) {
      halo.current.scale.setScalar(damp(halo.current.scale.x, scale * 6 * (1 + Math.sin(t * 2.2) * 0.12), 4, delta));
    }
    if (mat.current) mat.current.opacity = damp(mat.current.opacity, opacity, 5, delta);
    if (haloMat.current) haloMat.current.opacity = damp(haloMat.current.opacity, opacity * 0.5, 5, delta);
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial ref={mat} color="#ffffff" transparent opacity={0} />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          ref={haloMat}
          color="#00f0ff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
