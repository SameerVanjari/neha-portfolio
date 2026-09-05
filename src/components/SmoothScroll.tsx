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
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(onTick);
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
      autoRaf={false}
      options={{
        autoRaf: false,
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
