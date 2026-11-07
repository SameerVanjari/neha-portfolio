"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL = "/models/glass-icon-set.gltf";
const ICON_NAMES = ["Cube Icon", "Bubble Icon", "Compass Icon"] as const;
type IconName = (typeof ICON_NAMES)[number];

/* Belief band geometry (node 583:462): compass upper-left, cube upper-right,
   bubble low-left. Coordinates are scene-local hundred-units with the GLTF's
   authored 0.01 root scale, so ±4.3 lands near a 13-unit viewport span. */
const ICON_LAYOUT: Record<IconName, [number, number, number]> = {
  "Cube Icon": [430, 190, 0],
  "Bubble Icon": [-230, -230, 20],
  "Compass Icon": [-420, 190, 12],
};
useGLTF.preload(MODEL);

type Pose = {
  node: THREE.Object3D;
  base: THREE.Vector3;
  startRot: THREE.Euler;
  phase: number;
};

/* Pointer behaviour per design note 583:525 — "overrule": the compass leans
   toward the cursor; "understand": the cube keeps turning, faster when close;
   "question": the bubble lifts and bobs when approached. */
function GlassIcons({ reduce }: { reduce: boolean }) {
  const { scene, pointer, camera, viewport } = useThree();
  const { model, icons } = useMemo(() => {
    const model = new THREE.Group();
    model.scale.setScalar(0.01);
    const icons: Pose[] = ICON_NAMES.flatMap((name, index) => {
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
      return [
        {
          node,
          base: node.position.clone(),
          startRot: node.rotation.clone(),
          phase: index * 1.9,
        },
      ];
    });
    // Preserve the light authored in the GLTF.
    for (const lightName of ["Directional Light", "Default Ambient Light"]) {
      const source = scene.getObjectByName(lightName);
      if (source) model.add(source.clone(true));
    }
    model.traverse((child) => {
      child.visible = true;
      if ((child as THREE.Mesh).isMesh) child.frustumCulled = false;
    });
    model.updateMatrixWorld(true);
    return { model, icons };
  }, [scene]);

  /* eslint-disable react-hooks/immutability -- Three.js scene nodes are intentionally animated imperatively per frame. */
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const world = new THREE.Vector3();
    for (const icon of icons) {
      icon.node.getWorldPosition(world);
      const ndc = world.clone().project(camera);
      const dist = Math.hypot(ndc.x - pointer.x, ndc.y - pointer.y);
      const near = Math.max(0, 1 - dist / 0.9);

      if (icon.node.name.includes("Compass")) {
        const angle = Math.atan2(pointer.y - ndc.y, pointer.x - ndc.x);
        const targetZ = reduce ? icon.startRot.z : angle;
        icon.node.rotation.z += (targetZ - icon.node.rotation.z) * 0.06;
        icon.node.rotation.x = icon.startRot.x + Math.sin(time + icon.phase) * 0.04;
      } else if (icon.node.name.includes("Cube")) {
        icon.node.rotation.y += 0.004 + near * 0.03;
        icon.node.position.y = icon.base.y + Math.sin(time * 0.9 + icon.phase) * 8;
      } else {
        icon.node.position.y =
          icon.base.y + Math.sin(time * 1.2 + icon.phase) * 8 + near * 26;
        icon.node.rotation.z = Math.cos(time * 0.7 + icon.phase) * 0.05;
      }
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

export default function StatementIconsScene({ reduce }: { reduce: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "240px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 36 }}
        dpr={[0.75, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce || !visible ? "demand" : "always"}
      >
        <Suspense fallback={null}>
          <GlassIcons reduce={reduce} />
        </Suspense>
      </Canvas>
    </div>
  );
}
