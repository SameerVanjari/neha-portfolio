"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { HomeLens } from "@/data/lenses";
import { useMotionPref } from "@/components/motion/reveal";
import Backdrop from "@/components/home/Backdrop";
import EyeModel from "@/components/home/EyeModel";

/**
 * Full-hero WebGL layer: the model is anchored (via `anchorRef`) to its slot
 * in the layout. The animated backdrop sits behind the model, while the
 * supplied Figma particle mask is the exact loading reference beneath it.
 */
export default function HeroScene({
  lens,
  anchorRef,
  onReady,
}: {
  lens: HomeLens;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  onReady?: (ready: boolean) => void;
}) {
  const reduce = useMotionPref();
  const pointer = useRef({ x: 0, y: 0 });
  // The Product GLB carries authored punctual lights. Keep them, but reduce
  // the generic hero lighting so the asset is not lit twice as aggressively.
  const externalLightScale = lens.id === "product" ? 0.4 : lens.id === "xr" ? 0 : 1;
  const keyPosition = lens.id === "product" ? ([5, 7, 14] as const) : ([3, 4, 5] as const);

  useEffect(() => {
    if (reduce || typeof window === "undefined") return;
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const reset = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", reset);
      document.removeEventListener("mouseleave", reset);
    };
  }, [reduce]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={[1, 1.5]} // cap DPR: phones at dpr 3 pay 8× fragments for no gain
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduce ? "demand" : "always"}
      >
        <ambientLight intensity={0.5 * externalLightScale} />
        <directionalLight position={keyPosition} intensity={1.1 * externalLightScale} />
        {lens.id === "product" && (
          <hemisphereLight args={["#fff4df", "#2b1a15", 0.44]} />
        )}
        <Suspense fallback={null}>
          <Backdrop lens={lens} pointer={pointer} />
          <EyeModel lens={lens} pointer={pointer} anchorRef={anchorRef} onReady={onReady} />
          <Environment resolution={256}>
            <Lightformer intensity={1.8 * externalLightScale} position={[0, 3, 3]} scale={[6, 6, 1]} color="#ffffff" />
            <Lightformer intensity={1.2 * externalLightScale} position={[-4, 1, 3]} scale={[4, 4, 1]} color="#ffffff" />
            <Lightformer intensity={1.1 * externalLightScale} position={[4, -1, 3]} scale={[4, 4, 1]} color={lens.accent} />
            <Lightformer intensity={0.9 * externalLightScale} position={[0, -3, 3]} scale={[6, 6, 1]} color="#ffffff" />
            <Lightformer intensity={0.8 * externalLightScale} position={[0, 1, -4]} scale={[6, 6, 1]} color="#ffffff" />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
