"use client";

import { useState } from "react";
import type { HomeLensId } from "@/data/lenses";
import { LENSES } from "@/data/lenses";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Proof from "@/components/home/Proof";
import Work from "@/components/home/Work";
import Statement from "@/components/home/Statement";
import About from "@/components/home/About";
import Footer from "@/components/home/Footer";

/**
 * Homepage — "Home — Web 1440" (Figma 583:300).
 * Selecting a lens in the hero timeline swaps the hero copy, the highlighted
 * journey node and the work row (they swap together; the work filter can
 * also be driven by its own chips). The About portrait follows the lens.
 * Statement copy and Footer stay fixed.
 * The default lens is Product (the first option in the journey); nothing
 * auto-rotates. The periodic-table toolkit moves to the About page (design
 * note); the homepage keeps a one-line summary inside the About rows.
 */
export default function LensHome() {
  const [lensId, setLensId] = useState<HomeLensId>("product");
  const [workFilter, setWorkFilter] = useState<"all" | HomeLensId>("all");
  const lens = LENSES[lensId];

  return (
    <div className="home-root min-h-screen w-full overflow-x-clip">
      <Header />
      <main>
        <Hero
          lens={lens}
          onSelect={(id) => {
            setLensId(id);
            setWorkFilter(id);
          }}
        />
        <Proof />
        <Work filter={workFilter} onFilter={setWorkFilter} />
        <Statement />
        <About lens={lens} />
      </main>
      <Footer />
    </div>
  );
}
