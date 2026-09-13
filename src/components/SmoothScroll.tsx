"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function LenisGsapBridge() {
  const lenis = useLenis();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!lenis) {
      setLenisInstance(null);
      return;
    }
    setLenisInstance(lenis);
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
      setLenisInstance(null);
    };
  }, [lenis]);

  useEffect(() => {
    const root = document.documentElement;
    if (reduce) {
      root.classList.remove("lenis", "lenis-smooth");
      return;
    }
    root.classList.add("lenis", "lenis-smooth");
    return () => root.classList.remove("lenis", "lenis-smooth");
  }, [reduce]);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        respectReducedMotion: true,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
