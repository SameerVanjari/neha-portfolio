"use client";

import { useState } from "react";
import type { HomeLensId } from "@/data/lenses";
import { LENSES } from "@/data/lenses";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Proof from "@/components/home/Proof";
import Work from "@/components/home/Work";
import Statement from "@/components/home/Statement";
import Toolkit from "@/components/home/Toolkit";
import About from "@/components/home/About";
import Quote from "@/components/home/Quote";
import Footer from "@/components/home/Footer";

/**
 * Homepage — new dark "lens" design (Figma 525:100).
 * Selecting a lens in the hero timeline swaps the hero copy, the highlighted
 * journey node, the work row and the toolkit's featured tool. Everything else
 * is fixed. Layout only — no entrance animations.
 */
export default function LensHome() {
  const [active, setActive] = useState<HomeLensId>("product");
  const lens = LENSES[active];

  return (
    <div className="home-root min-h-screen w-full overflow-x-clip">
      <Header />
      <main>
        <Hero lens={lens} onSelect={setActive} />
        <Proof />
        <Work lens={lens} />
        <Statement />
        <Toolkit lens={lens} />
        <About />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}
