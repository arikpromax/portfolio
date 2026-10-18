import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import DemoBanner from "@/components/DemoBanner";
import Process from "@/components/Process";
import Cases from "@/components/Cases";
import Why from "@/components/Why";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import TelegramFab from "@/components/TelegramFab";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";

// Порядок блоків повторює сторінку-зразок: огляд → розділи з великими ілюстраціями,
// картками й вкладками → галерея. Кейси лежать у lib/cases.ts.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <DemoBanner />
        <Process />
        <Cases />
        <Why />
        <About />
        <Pricing />
        <Gallery />
        <Contact />
      </main>
      <BackToTop />
      <TelegramFab />
      <Footer />
      <SiteEffects />
    </>
  );
}
