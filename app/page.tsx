import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Cases from "@/components/Cases";
import Process from "@/components/Process";
import Why from "@/components/Why";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import TelegramFab from "@/components/TelegramFab";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Header />
      <Hero />
      <Marquee />
      <Problem />
      <Solution />
      <Cases />
      <Process />
      <Why />
      <About />
      <Pricing />
      <Contact />
      <BackToTop />
      <TelegramFab />
      <Footer />
      <SiteEffects />
    </>
  );
}
