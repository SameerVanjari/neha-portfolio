import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, keyframes, sceneState } from "@/lib/sceneState";

interface HoloRingProps {
  radius: number;
  color: string;
  opacityKeys: [number, number][];
  speed?: number;
  tilt?: [number, number, number];
  y?: number;
}

export default function HoloRing({
  radius,
  color,
  opacityKeys,
  speed = 0.12,
  tilt = [1.2, 0, 0],
  y = 0,
}: HoloRingProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    const p = sceneState.progress;
    const opacity = keyframes(opacityKeys, p);
    if (mesh.current) {
      mesh.current.rotation.z += delta * speed;
      mesh.current.rotation.x = Math.sin(performance.now() / 4000) * 0.25;
    }
    if (mat.current) mat.current.opacity = damp(mat.current.opacity, opacity, 4, delta);
  });

  return (
    <mesh ref={mesh} position={[0, y, 0]} rotation={tilt}>
      <torusGeometry args={[radius, 0.012, 8, 128]} />
      <meshBasicMaterial ref={mat} color={color} transparent opacity={0} />
    </mesh>
  );
}
