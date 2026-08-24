import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, keyframes, remap, sceneState } from "@/lib/sceneState";

const COUNT = 80;

interface Building {
  x: number;
  z: number;
  w: number;
  h: number;
  stagger: number;
}

const BUILDINGS: Building[] = Array.from({ length: COUNT }, (_, i) => {
  const a = Math.random() * Math.PI * 2;
  const r = 1.6 + Math.random() * 5.5;
  return {
    x: Math.cos(a) * r,
    z: Math.sin(a) * r,
    w: 0.22 + Math.random() * 0.5,
    h: 0.8 + Math.random() * 3.4,
    stagger: (i % 11) * 0.035,
  };
});

const GROUP_OPACITY = [
  [0.0, 0.0],
  [0.38, 0.0],
  [0.5, 1.0],
  [0.82, 1.0],
  [0.9, 0.0],
  [1.0, 0.0],
] as [number, number][];

const FLOOR_OPACITY = [
  [0.0, 0.0],
  [0.36, 0.0],
  [0.48, 0.55],
  [0.84, 0.55],
  [0.92, 0.0],
  [1.0, 0.0],
] as [number, number][];

const dummy = new THREE.Object3D();

export default function CityGrid() {
  const grid = useRef<THREE.GridHelper>(null);
  const buildings = useRef<THREE.InstancedMesh>(null);
  const buildingMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    const p = sceneState.progress;
    const groupOpacity = keyframes(GROUP_OPACITY, p);
    const floorOpacity = keyframes(FLOOR_OPACITY, p);

    if (grid.current) {
      const m = grid.current.material as THREE.LineBasicMaterial;
      m.transparent = true;
      m.opacity = damp(m.opacity, floorOpacity, 4, delta);
    }
    if (buildingMat.current) {
      buildingMat.current.opacity = damp(buildingMat.current.opacity, groupOpacity * 0.9, 4, delta);
    }

    const mesh = buildings.current;
    const mat = buildingMat.current;
    if (!mesh || !mat) return;
    const revealBase = remap(p, 0.4, 0.6);
    const t = performance.now() / 1000;
    mat.color.setHSL(0.52, 0.6, 0.12 + Math.sin(t * 2.1) * 0.015);

    BUILDINGS.forEach((d, i) => {
      const reveal = Math.min(1, Math.max(0, revealBase - d.stagger));
      dummy.position.set(d.x, -2.1 + (d.h / 2) * reveal, d.z);
      dummy.scale.set(d.w, d.h, d.w);
      dummy.rotation.y = (i * 1.7) % Math.PI;
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <gridHelper ref={grid} args={[26, 26, "#00f0ff", "#12324a"]} position={[0, -2.1, 0]} />
      <instancedMesh ref={buildings} args={[undefined, undefined, COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial ref={buildingMat} color="#13303f" transparent opacity={0} />
      </instancedMesh>
    </group>
  );
}
