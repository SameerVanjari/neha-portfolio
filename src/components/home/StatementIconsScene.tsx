"use client";

import { Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL = "/models/glass-icon-set.gltf";
const ICON_NAMES = ["Cube Icon", "Bubble Icon", "Compass Icon"] as const;
// The source scene is authored at a 0.01 root scale, so these positions are in
// its local hundred-unit coordinates. They keep each glass mark in its own
// quiet pocket around the statement rather than clustering at the source poses.
const ICON_LAYOUT: Record<(typeof ICON_NAMES)[number], [number, number, number]> = {
  "Cube Icon": [-430, 190, 0],
  "Bubble Icon": [430, 145, 20],
  "Compass Icon": [-360, -215, 12],
};
useGLTF.preload(MODEL);

type AnimatedIcon = {
  node: THREE.Object3D;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  phase: number;
  speed: number;
};

function GlassIcons() {
  const { scene } = useGLTF(MODEL);
  const { viewport } = useThree();
  const { model, icons } = useMemo(() => {
    const model = new THREE.Group();
    // Match the authored scene's 0.01 root scale while removing its original
    // all-icons-at-once hierarchy and camera nodes.
    model.scale.setScalar(0.01);
    const animated: AnimatedIcon[] = ICON_NAMES.flatMap((name, index) => {
      const source = scene.getObjectByName(name);
      if (!source) return [];
      const node = source.clone(true);
      node.matrixAutoUpdate = true;
      node.position.set(...ICON_LAYOUT[name]);
      node.updateMatrix();
      node.traverse((child) => {
        child.visible = true;
        if ((child as THREE.Mesh).isMesh) child.frustumCulled = false;
      });
      model.add(node);
      return [{
        node,
        position: node.position.clone(),
        rotation: node.rotation.clone(),
        phase: index * 1.9,
        speed: 0.72 + index * 0.08,
      }];
    });

    // Preserve the light authored in the GLTF, without carrying over its
    // camera or the original unseparated icon hierarchy.
    for (const lightName of ["Directional Light", "Default Ambient Light"]) {
      const source = scene.getObjectByName(lightName);
      if (source) model.add(source.clone(true));
    }
    model.traverse((child) => {
      child.visible = true;
      if ((child as THREE.Mesh).isMesh) child.frustumCulled = false;
    });
    model.updateMatrixWorld(true);
    return { model, icons: animated };
  }, [scene]);

  /* eslint-disable react-hooks/immutability -- Three.js scene nodes are intentionally animated imperatively per frame. */
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    for (const icon of icons) {
      const wave = time * icon.speed + icon.phase;
      icon.node.position.y = icon.position.y + Math.sin(wave) * 10;
      icon.node.rotation.x = icon.rotation.x + Math.sin(wave * 0.8) * 0.055;
      icon.node.rotation.z = icon.rotation.z + Math.cos(wave * 0.7) * 0.045;
    }
  });
  /* eslint-enable react-hooks/immutability */

  // The source scene spans roughly twelve world units. Fit it on narrow
  // screens without changing the authored spacing between the three icons.
  const fit = Math.min(1, Math.max(0.65, viewport.width / 13));

  return (
    <group scale={fit}>
      <primitive object={model} />
    </group>
  );
}

export default function StatementIconsScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 36 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <GlassIcons />
        </Suspense>
      </Canvas>
    </div>
  );
}
