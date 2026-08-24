"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export default function SceneCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 55, position: [0, 0, 6.6] }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
