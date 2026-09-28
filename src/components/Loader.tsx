"use client";

import { useEffect, useRef, useState } from "react";
import { useLoadStage } from "@/components/LoadStage";

const SLOT_IMAGES = [
  { src: "/loader/robo.png", alt: "AI" },
  { src: "/loader/stylus.png", alt: "UX" },
  { src: "/loader/lamp.png", alt: "Product" },
  { src: "/loader/goggle.png", alt: "XR" },
];

// Reel is doubled for a seamless loop (translateX(-100% of one set)).
const REEL = [...SLOT_IMAGES, ...SLOT_IMAGES];

/** Don't flash the preloader on a warm cache. */
const MIN_VISIBLE_MS = 900;
/** Must match the loader-fade duration in globals.css. */
const FADE_MS = 550;

export default function Loader() {
  const { assetsReady, revealText } = useLoadStage();
  const [phase, setPhase] = useState<"show" | "exit" | "gone">("show");
  const shownAt = useRef<number>(0);

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  // Hold until the critical media has actually arrived, but never flash.
  useEffect(() => {
    if (!assetsReady || phase !== "show") return;
    const elapsed = Date.now() - shownAt.current;
    const t = window.setTimeout(() => setPhase("exit"), Math.max(0, MIN_VISIBLE_MS - elapsed));
    return () => window.clearTimeout(t);
  }, [assetsReady, phase]);

  // The copy is released only once the overlay is out of the way.
  useEffect(() => {
    if (phase !== "exit") return;
    const t = window.setTimeout(() => {
      revealText();
      setPhase("gone");
    }, FADE_MS);
    return () => window.clearTimeout(t);
  }, [phase, revealText]);

  if (phase === "gone") return null;

  return (
    <div className="loader-overlay" data-exiting={phase === "exit"} aria-hidden>
      <div className="loader-mark">NEHA</div>
      <div className="loader-viewport">
        <div className="loader-reel">
          {REEL.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={img.src} alt={img.alt} draggable={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
