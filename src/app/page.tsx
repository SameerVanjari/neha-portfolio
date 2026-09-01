import Nav from "@/components/chrome/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import Dimensions from "@/components/sections/Dimensions";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import ScrollReveal from "@/components/sections/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollReveal>
        <main>
          <Hero />
          <About />
          <Timeline />
          <Dimensions />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </ScrollReveal>
    </>
  );
}