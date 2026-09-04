"use client";

import { cn } from "@/lib/utils";
import { WordStagger } from "./word-stagger";

export function HoverBorderGradient({
  children,
  className,
  as: Component = "a",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.HTMLAttributes<HTMLElement>) {
  const isString = typeof children === "string";
  return (
    <Component
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full bg-white p-[1px]",
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 0deg, #FF2BD6, #FFC94D, #8B5CF6, #06B6D4, #FF2BD6)`,
          filter: "blur(0.5px)",
        }}
      />
      <span className="relative inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-mono text-[11px] tracking-[0.12em] text-zinc-900 transition-colors group-hover:bg-zinc-900 group-hover:text-white">
        {isString ? <WordStagger text={children as string} /> : children}
      </span>
    </Component>
  );
}

export function AceternityCTA({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  const label = typeof children === "string" ? (children as string) : null;
  if (variant === "dark") {
    return (
      <a
        href={href}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-6 py-3 font-mono text-[11px] tracking-[0.14em] text-white"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#FF2BD6]/20 via-[#8B5CF6]/20 to-[#06B6D4]/20 transition-transform duration-700 group-hover:translate-x-0" aria-hidden />
        <span className="relative">{label ? <WordStagger text={label} /> : children}</span>
        <span aria-hidden className="relative">→</span>
      </a>
    );
  }
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-2 rounded-full border bg-white px-6 py-3 font-mono text-[11px] tracking-[0.14em] text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900"
      style={{ borderColor: "rgba(0,0,0,0.08)" }}
    >
      <span className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "radial-gradient(300px circle at 50% 0%, rgba(139,92,246,0.08), transparent 70%)" }} aria-hidden />
      <span className="relative">{label ? <WordStagger text={label} /> : children}</span>
      <span aria-hidden className="relative">→</span>
    </a>
  );
}
