import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader, Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

// Design system (from Website Wireframes — Landing Desktop 1440).
// Legacy pages keep Hanken Grotesk (display + body point at the same family
// so existing component references keep working); serif (Newsreader) retained
// for case-study/editorial pages.
//
// The redesigned homepage uses its own pairing from the new Figma design:
// Bricolage Grotesque (display) + Instrument Sans (body), exposed as
// --font-bricolage / --font-instrument so the home theme can opt in without
// restyling the rest of the site.

const hankenDisplay = Hanken_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const hankenBody = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["wdth"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "NEHA · Perception, Intelligence, Design",
  description:
    "Neha Mayacharya, AI experience, XR, UX, and product designer. Available 2026 · STEM OPT. Work for TD Bank, Harvard MedTech, IFSG, and more.",
};

import BarbaProvider from "@/components/BarbaProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import { LoadStageProvider } from "@/components/LoadStage";
import { PerceptionProvider } from "@/context/PerceptionContext";
import MotionPrefs from "@/components/MotionPrefs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${hankenDisplay.variable} ${hankenBody.variable} ${newsreader.variable} ${bricolage.variable} ${instrument.variable} antialiased`}
    >
      <body className="bg-[#F2EEE7] text-[#17161B]">
        <PerceptionProvider>
          <LoadStageProvider>
            <MotionPrefs>
              <SmoothScroll>
                <BarbaProvider>{children}</BarbaProvider>
              </SmoothScroll>
              <Loader />
            </MotionPrefs>
          </LoadStageProvider>
        </PerceptionProvider>
        {/* Every entrance animation writes an inline opacity:0 on first paint.
            Without JS those never clear, so force everything visible for
            no-JS visitors rather than showing them a blank page. */}
        <noscript>
          <style>{`[style*="opacity:0"],.rise,.rise-scale,.fade{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
