"use client";

import { useEffect, useState } from "react";

const SLOT_IMAGES = [
  { src: "/loader/robo.png", alt: "AI" },
  { src: "/loader/stylus.png", alt: "UX" },
  { src: "/loader/lamp.png", alt: "Product" },
  { src: "/loader/goggle.png", alt: "XR" },
];

// Reel is doubled for a seamless loop (translateX(-100% of one set)).
const REEL = [...SLOT_IMAGES, ...SLOT_IMAGES];

export default function Loader() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Unmount only after the CSS fade-out (2.8s delay + 550ms fade) has finished.
    const t = setTimeout(() => setMounted(false), 3500);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="loader-overlay" aria-hidden>
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
