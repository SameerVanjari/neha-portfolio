interface HUDCardProps {
  children: React.ReactNode;
  className?: string;
  corners?: boolean;
}

export default function HUDCard({ children, className, corners = true }: HUDCardProps) {
  return (
    <div className={`hud-panel ${className ?? ""}`}>
      {corners && <div className="corner-frames" aria-hidden />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
