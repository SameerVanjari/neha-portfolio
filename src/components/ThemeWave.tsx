"use client";

import { motion, useReducedMotion } from "framer-motion";
import { THEMES, type ThemeId } from "@/data/themes";

const EASE_WAVE: [number, number, number, number] = [0.32, 0.72, 0, 1];

export default function ThemeWave({
  baseId,
  overlayId,
  onOverlayDone,
}: {
  baseId: ThemeId;
  overlayId: ThemeId | null;
  onOverlayDone: () => void;
}) {
  const reduce = useReducedMotion();

  const base = THEMES[baseId];

  if (reduce) {
    // reduced: simple crossfade of background color, no clip
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          key={baseId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0"
          style={{ background: base.bgGradient }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
      {/* base — always full */}
      <div className="absolute inset-0" style={{ background: base.bgGradient }} />

      {/* wave overlay — emerges from island (50% 92%) */}
      {overlayId && (
        <motion.div
          key={overlayId}
          initial={{ clipPath: "circle(0% at 50% 92%)" }}
          animate={{ clipPath: "circle(150% at 50% 92%)" }}
          transition={{ duration: 2.05, ease: EASE_WAVE }}
          onAnimationComplete={onOverlayDone}
          className="absolute inset-0 will-change-[clip-path]"
          style={{ background: THEMES[overlayId].bgGradient }}
        />
      )}

      {/* subtle paper grain — stays */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
