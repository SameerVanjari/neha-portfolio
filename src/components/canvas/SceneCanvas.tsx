"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import JourneyScene from "@/components/cinema/JourneyScene";

export default function SceneCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 52, position: [0, 0.5, 5.8], near: 0.1, far: 200 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <JourneyScene />
      </Suspense>
    </Canvas>
  );
}
