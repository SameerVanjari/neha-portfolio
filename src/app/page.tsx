import SceneRoot from "@/components/canvas/SceneRoot";
import ScrollSync from "@/components/providers/ScrollSync";
import Scanlines from "@/components/chrome/Scanlines";
import CursorGlow from "@/components/chrome/CursorGlow";
import ProgressBar from "@/components/chrome/ProgressBar";
import Nav from "@/components/chrome/Nav";
import Boot from "@/components/chrome/Boot";
import Journey from "@/components/cinema/dom/Journey";
import PortfolioWorld from "@/components/cinema/dom/PortfolioWorld";

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
        <Journey />
        <PortfolioWorld />
      </main>
      <ScrollSync />
    </>
  );
}
