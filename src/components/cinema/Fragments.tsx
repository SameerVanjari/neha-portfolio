"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { damp, remap, sceneState } from "@/lib/sceneState";

const COUNT = 42;

interface Frag {
  x: number;
  y: number;
  z: number;
  s: number;
  rx: number;
  ry: number;
  rz: number;
  spin: number;
}

const FRAGS: Frag[] = Array.from({ length: COUNT }, () => ({
  x: (Math.random() - 0.5) * 9,
  y: (Math.random() - 0.5) * 5,
  z: 2 - Math.random() * 22,
  s: 0.15 + Math.random() * 0.5,
  rx: Math.random() * Math.PI,
  ry: Math.random() * Math.PI,
  rz: Math.random() * Math.PI,
  spin: (Math.random() - 0.5) * 0.8,
}));

const dummy = new THREE.Object3D();

export default function Fragments() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    const p = sceneState.progress;
    const t = state.clock.elapsedTime;
    const vis = remap(p, 0.25, 0.3) * (1 - remap(p, 0.33, 0.39));

    if (mat.current) mat.current.opacity = damp(mat.current.opacity, vis * 0.75, 3, delta);
    const im = mesh.current;
    if (!im) return;

    FRAGS.forEach((f, i) => {
      const wob = Math.sin(t * 0.7 + i) * 0.5;
      dummy.position.set(
        f.x + Math.sin(t * 0.4 + i * 2) * 0.4,
        f.y + Math.cos(t * 0.5 + i) * 0.3,
        f.z + wob * 0.4
      );
      dummy.rotation.set(f.rx + t * f.spin, f.ry + t * f.spin * 0.7, f.rz + t * 0.2);
      dummy.scale.setScalar(f.s * (1 + Math.sin(t + i) * 0.15));
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
    });
    im.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial ref={mat} color="#00e5ff" wireframe transparent opacity={0} />
    </instancedMesh>
  );
}
