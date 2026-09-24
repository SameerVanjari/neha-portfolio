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
  title: "NEHA — Perception, Intelligence, Design",
  description:
    "Neha Mayacharya — AI experience, XR, UX, and product designer. Available 2026 · STEM OPT. Work for TD Bank, Harvard MedTech, IFSG, and more.",
};

import BarbaProvider from "@/components/BarbaProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import { PerceptionProvider } from "@/context/PerceptionContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${hankenDisplay.variable} ${hankenBody.variable} ${newsreader.variable} antialiased`}>
      <body className="bg-[#F2EEE7] text-[#17161B]">
        <PerceptionProvider>
          <SmoothScroll>
            <BarbaProvider>{children}</BarbaProvider>
          </SmoothScroll>
          <Loader />
        </PerceptionProvider>
      </body>
    </html>
  );
}
