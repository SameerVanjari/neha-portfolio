import Nav from "@/components/Nav";
import HeroLens from "@/components/landing/HeroLens";
import AboutIntro from "@/components/landing/AboutIntro";
import ClientsRow from "@/components/landing/ClientsRow";
import SelectedWork from "@/components/landing/SelectedWork";
import HowIWork from "@/components/landing/HowIWork";
import FeaturedQuote from "@/components/landing/FeaturedQuote";
import SiteFooter from "@/components/landing/SiteFooter";

/**
 * Landing page — mirrors Website Wireframes "Landing — Desktop (1440)":
 * Header → Hero (XR lens) → About → Clients → Selected work →
 * How I work → In their words → Footer.
 */
export default function Home() {
  return (
    <>
      <Nav />

      <main>
        <HeroLens />
        <AboutIntro />
        <ClientsRow />
        <SelectedWork />
        <HowIWork />
        <FeaturedQuote />
      </main>

      <SiteFooter />
    </>
  );
}
