"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Anchored popover (tooltip-style trigger). Opens on hover/tap, stays open
 * while the pointer is over the trigger OR the card itself, so links inside
 * are clickable. Opening uses a Motion spring (height expand), always a light
 * card regardless of color scheme.
 */
export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState(0);
  const [below, setBelow] = useState(false);
  const [shiftX, setShiftX] = useState(0);
  const contentRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | null>(null);

  // Viewport-aware placement: flip below the trigger when there is not
  // enough space above, and clamp horizontally so the card never leaves
  // the viewport. Recomputed while open on scroll/resize.
  const place = () => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;
    const rect = container.getBoundingClientRect();
    // Measure the content, not the animating card box: the spring grows the
    // card from height 0, so offsetHeight is ~0 on open and placement would
    // be computed against a card that does not exist yet. scrollHeight
    // reports the full content height regardless of the animated clip.
    const cardH = (contentRef.current?.scrollHeight ?? 0) + 2;
    const cardW = card.offsetWidth || 300;
    setBelow(rect.top < cardH + 16);
    const center = rect.left + rect.width / 2;
    const min = cardW / 2 + 12;
    const max = window.innerWidth - cardW / 2 - 12;
    setShiftX(Math.min(Math.max(center, min), Math.max(min, max)) - center);
  };

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible, content]);

  useEffect(() => {
    if (!isVisible) return;
    place();
    const raf = window.requestAnimationFrame(place);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place);
    };
  }, [isVisible, height]);

  const cancelScheduledClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const open = () => {
    cancelScheduledClose();
    setIsVisible(true);
  };

  const scheduleClose = () => {
    cancelScheduledClose();
    // Short grace period bridges the gap between trigger and card
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      setIsVisible(false);
    }, 140);
  };

  // Close on outside pointerdown (tap-to-dismiss on touch, click-away on desktop)
  useEffect(() => {
    if (!isVisible) return;
    const onDocPointer = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        cancelScheduledClose();
        setIsVisible(false);
      }
    };
    document.addEventListener("pointerdown", onDocPointer);
    return () => document.removeEventListener("pointerdown", onDocPointer);
  }, [isVisible]);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    // Toggle on tap for touch devices — never intercept links
    if (window.matchMedia("(hover: none)").matches) {
      if ((e.target as HTMLElement).closest("a")) return;
      e.preventDefault();
      if (isVisible) {
        cancelScheduledClose();
        setIsVisible(false);
      } else {
        open();
      }
    }
  };

  useEffect(() => cancelScheduledClose, []);

  return (
    <span
      ref={containerRef}
      className={cn("relative inline-block", containerClassName)}
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.span
            key={String(isVisible)}
            ref={cardRef}
            initial={{ height: 0, opacity: 1 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            style={{ marginLeft: shiftX }}
            className={`absolute left-1/2 z-50 w-[300px] max-w-[calc(100vw-48px)] -translate-x-1/2 overflow-hidden rounded-[12px] border border-transparent bg-white shadow-[0_16px_48px_rgba(22,22,30,0.14)] ring-1 shadow-black/5 ring-black/5 ${
              below ? "top-full mt-2" : "bottom-full mb-2"
            }`}
          >
            <span ref={contentRef} className="block max-h-[70vh] overflow-y-auto p-4 text-sm text-neutral-600">
              {content}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
