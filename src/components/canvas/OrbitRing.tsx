import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, keyframes, sceneState } from "@/lib/sceneState";

interface OrbitRingProps {
  count?: number;
  color: string;
  radiusKeys: [number, number][];
  opacityKeys: [number, number][];
  spin?: number;
  tilt?: number;
  y?: number;
  size?: number;
}

export default function OrbitRing({
  count = 140,
  color,
  radiusKeys,
  opacityKeys,
  spin = 0.18,
  tilt = 0.6,
  y = 0,
  size = 0.05,
}: OrbitRingProps) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);

  const { unit, positions } = useMemo(() => {
    const unit = new Float32Array(count * 3);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      unit[i * 3] = Math.cos(a);
      unit[i * 3 + 1] = Math.sin(a);
      unit[i * 3 + 2] = 0;
      positions[i * 3] = unit[i * 3];
      positions[i * 3 + 1] = unit[i * 3 + 1];
      positions[i * 3 + 2] = 0;
    }
    return { unit, positions };
  }, [count]);

  useFrame((_, delta) => {
    const p = sceneState.progress;
    const radius = keyframes(radiusKeys, p);
    const opacity = keyframes(opacityKeys, p);

    if (group.current) group.current.rotation.y += delta * spin;
    if (mat.current) mat.current.opacity = damp(mat.current.opacity, opacity, 4, delta);

    const geo = points.current?.geometry as THREE.BufferGeometry | undefined;
    if (geo) {
      const pos = geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        pos.setXYZ(i, unit[i * 3] * radius, unit[i * 3 + 1] * radius, unit[i * 3 + 2]);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <group ref={group} rotation={[tilt, 0, 0]} position={[0, y, 0]}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={mat}
          color={color}
          size={size}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
