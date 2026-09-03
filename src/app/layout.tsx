import type { Metadata } from "next";
import { Bricolage_Grotesque, Sora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

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
  title: {
    default: "NEHA — AI · XR · UX Designer",
    template: "%s | NEHA",
  },
  description: "I design the interfaces where intelligent systems and human needs meet — across every reality.",
  metadataBase: new URL("https://neha.design"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${sora.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
