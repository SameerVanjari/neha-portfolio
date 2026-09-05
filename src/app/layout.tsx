import type { Metadata } from "next";
import { Bricolage_Grotesque, Sora } from "next/font/google";
import "./globals.css";

// Brandkit — 2 sets / 3 weights
// Strategy: NEHA is a perception system — how intelligence is seen across realities.
// Visual world: light paper washes (full-bleed gradients) vs dark charcoal island as
// the emission source. Typography must carry calm authority with construction.
// Set 1 — Display: Bricolage Grotesque (ink traps + rounded terminals = tool + warmth)
//   400 Regular for UI, 600 SemiBold for headings, 800 ExtraBold for NEHA wordmark
// Set 2 — Body: Sora (generous apertures, neutral grotesk, calm reading)
//   300 Light for hero large type, 400 Regular for body, 600 SemiBold for labels

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "NEHA — Perception, Intelligence, Design",
  description:
    "I design the interfaces where intelligent systems and human needs meet — across every reality.",
};

import BarbaProvider from "@/components/BarbaProvider";
import { PerceptionProvider } from "@/context/PerceptionContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${sora.variable} antialiased`}>
      <body className="bg-white text-zinc-900">
        <PerceptionProvider>
          <BarbaProvider>{children}</BarbaProvider>
        </PerceptionProvider>
      </body>
    </html>
  );
}
