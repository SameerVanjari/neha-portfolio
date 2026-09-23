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
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible, content]);

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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <div
      ref={containerRef}
      className={cn("relative inline-block", containerClassName)}
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={String(isVisible)}
            initial={{ height: 0, opacity: 1 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-[300px] max-w-[calc(100vw-48px)] -translate-x-1/2 overflow-hidden rounded-[12px] border border-transparent bg-white shadow-[0_16px_48px_rgba(22,22,30,0.14)] ring-1 shadow-black/5 ring-black/5"
          >
            <div ref={contentRef} className="p-4 text-sm text-neutral-600">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
