import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";

// Design system (from Website Wireframes — Landing Desktop 1440).
// Single type family: Hanken Grotesk everywhere (400 Regular, 500 Medium,
// 600 SemiBold). Display + body vars point at the same family so existing
// component references keep working; serif (Newsreader) retained for
// case-study/editorial pages.

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
    <html lang="en" className={`${hankenDisplay.variable} ${hankenBody.variable} ${newsreader.variable} antialiased`}>
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
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
