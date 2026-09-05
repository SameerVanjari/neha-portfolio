"use client";

import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn("grid gap-4 md:auto-rows-[18rem] md:grid-cols-3", className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[20px] border bg-white p-5 md:p-6",
        "transition-colors hover:bg-zinc-50/50",
        className
      )}
      style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}
    >
      <div className="flex flex-1 flex-col">
        {header && <div className="mb-4 flex h-28 items-center justify-center overflow-hidden rounded-[14px] bg-zinc-50 md:h-32">{header}</div>}
        {icon && <div className="mb-3 h-8 w-8 text-zinc-900">{icon}</div>}
        <div className="font-display text-[15px] font-semibold tracking-[-0.02em] text-zinc-900 md:text-[16px]" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </div>
        <div className="mt-1.5 text-[13px] leading-[1.6] text-zinc-500" style={{ fontFamily: "var(--font-body)" }}>
          {description}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(0,0,0,0.04), transparent 40%)" }} />
    </div>
  );
};
