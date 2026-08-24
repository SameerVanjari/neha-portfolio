import SceneRoot from "@/components/canvas/SceneRoot";
import ScrollSync from "@/components/providers/ScrollSync";
import Scanlines from "@/components/chrome/Scanlines";
import CursorGlow from "@/components/chrome/CursorGlow";
import ProgressBar from "@/components/chrome/ProgressBar";
import Nav from "@/components/chrome/Nav";
import Boot from "@/components/chrome/Boot";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Capabilities from "@/components/sections/Capabilities";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Scanlines />
      <CursorGlow />
      <SceneRoot />
      <ProgressBar />
      <Nav />
      <Boot />
      <main className="relative z-10">
        <Hero />
        <Ticker />
        <About />
        <Work />
        <Capabilities />
        <Contact />
      </main>
      <ScrollSync />
    </>
  );
}
