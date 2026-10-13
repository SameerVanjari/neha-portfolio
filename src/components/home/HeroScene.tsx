"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { HomeLens } from "@/data/lenses";
import { useMotionPref } from "@/components/motion/reveal";
import Backdrop from "@/components/home/Backdrop";
import EyeModel from "@/components/home/EyeModel";

/**
 * Full-hero WebGL layer: the animated per-lens backdrop covers the whole hero,
 * and the model is anchored (via `anchorRef`) to its slot in the layout.
 * Pointer-driven so the model + field lean with the cursor on hover.
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
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        frameloop={reduce ? "demand" : "always"}
        onCreated={() => onReady?.(true)}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        <Suspense fallback={null}>
          <Backdrop lens={lens} pointer={pointer} />
          <EyeModel lens={lens} pointer={pointer} anchorRef={anchorRef} />
          <Environment resolution={256}>
            <Lightformer intensity={1.8} position={[0, 3, 3]} scale={[6, 6, 1]} color="#ffffff" />
            <Lightformer intensity={1.2} position={[-4, 1, 3]} scale={[4, 4, 1]} color="#ffffff" />
            <Lightformer intensity={1.1} position={[4, -1, 3]} scale={[4, 4, 1]} color={lens.accent} />
            <Lightformer intensity={0.9} position={[0, -3, 3]} scale={[6, 6, 1]} color="#ffffff" />
            <Lightformer intensity={0.8} position={[0, 1, -4]} scale={[6, 6, 1]} color="#ffffff" />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}
