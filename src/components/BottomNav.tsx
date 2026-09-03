"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Theme } from "@/data/themes";

const ITEMS = [
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function BottomNav({ theme, activeSection }: { theme: Theme; activeSection?: string }) {
  const pathname = usePathname();

  const isActive = (id: string) => {
    if (pathname === "/projects" && id === "projects") return true;
    if (pathname === "/about" && id === "about") return true;
    if (pathname === "/" && activeSection === id) return true;
    return false;
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col gap-1 rounded-2xl border bg-white/90 px-4 py-3 backdrop-blur-md md:bottom-8 md:left-8"
      style={{ borderColor: "rgba(0,0,0,0.06)", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
    >
      {ITEMS.map((item) => {
        const active = isActive(item.id);
        const isContactAnchor = item.id === "contact" && pathname === "/";
        if (isContactAnchor) {
          return (
            <a
              key={item.id}
              href="#contact"
              aria-current={active ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
              className="font-mono text-[11px] tracking-[0.14em] transition-colors"
              style={{
                color: active ? "#111827" : theme.muted,
                fontWeight: active ? 700 : 400,
              }}
            >
              {active ? "— " : ""}{item.label}
            </a>
          );
        }
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="font-mono text-[11px] tracking-[0.14em] transition-colors hover:text-zinc-900"
            style={{
              color: active ? "#111827" : theme.muted,
              fontWeight: active ? 700 : 400,
            }}
          >
            {active ? "— " : ""}{item.label}
          </Link>
        );
      })}
    </nav>
  );
}
