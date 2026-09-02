"use client";

import type { Theme } from "@/data/themes";

export default function GradientOrbs({ theme }: { theme: Theme }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0" style={{ background: theme.bgGradient }} />

      {/* CSS-only orbs — compositor-driven, no JS rAF. 3 orbs max, blur ≤20px, will-change: transform */}
      <div
        className="orb orb-1"
        aria-hidden
        style={
          {
            ["--a" as string]: theme.accent,
            ["--as" as string]: theme.accentStrong,
            ["--w" as string]: theme.wash,
          } as React.CSSProperties
        }
      />
      <div
        className="orb orb-2"
        aria-hidden
        style={
          {
            ["--a" as string]: theme.accent,
            ["--w" as string]: theme.wash,
            ["--b" as string]: theme.bg,
          } as React.CSSProperties
        }
      />
      <div
        className="orb orb-3"
        aria-hidden
        style={
          {
            ["--a" as string]: theme.accent,
            ["--as" as string]: theme.accentStrong,
          } as React.CSSProperties
        }
      />

      <style>{`
        .orb{
          position:absolute;
          border-radius:9999px;
          will-change: transform;
          pointer-events:none;
        }
        @media (prefers-reduced-motion: reduce){
          .orb{ animation: none !important; }
        }
        .orb-1{
          width: 72vw; height: 72vw; max-width: 880px; max-height: 880px;
          left:-18%; top:2%;
          opacity:0.58;
          background: radial-gradient(circle at 35% 35%, var(--as) 0%, var(--a) 22%, color-mix(in srgb, var(--a) 52%, transparent) 36%, transparent 70%);
          filter: blur(18px);
          animation: orb-drift-1 18s ease-in-out infinite;
        }
        .orb-2{
          width: 64vw; height: 64vw; max-width: 780px; max-height: 780px;
          right:-16%; top:14%;
          opacity:0.62;
          background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--a) 66%, transparent) 0%, var(--w) 24%, color-mix(in srgb, var(--w) 54%, transparent) 44%, transparent 76%);
          filter: blur(20px);
          animation: orb-drift-2 22s ease-in-out infinite;
        }
        .orb-3{
          width: 88vw; height: 88vw; max-width: 1100px; max-height: 1100px;
          left:12%; bottom:-28%;
          opacity:0.52;
          background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--w) 82%, transparent) 0%, var(--w) 20%, var(--b) 38%, transparent 72%);
          filter: blur(16px);
          animation: orb-drift-3 26s ease-in-out infinite;
        }
        @keyframes orb-drift-1{
          0%{ transform: translate3d(0,0,0) scale(1); }
          33%{ transform: translate3d(88px,-56px,0) scale(1.06); }
          66%{ transform: translate3d(-56px,36px,0) scale(0.96); }
          100%{ transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes orb-drift-2{
          0%{ transform: translate3d(0,0,0) scale(1); }
          35%{ transform: translate3d(-72px,48px,0) scale(1.05); }
          70%{ transform: translate3d(48px,-32px,0) scale(0.97); }
          100%{ transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes orb-drift-3{
          0%{ transform: translate3d(0,0,0) scale(1); }
          40%{ transform: translate3d(44px,-36px,0) scale(1.04); }
          75%{ transform: translate3d(-36px,24px,0) scale(0.98); }
          100%{ transform: translate3d(0,0,0) scale(1); }
        }
      `}</style>
    </div>
  );
}
