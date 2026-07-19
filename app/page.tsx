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
import { getSupabase, type CaseItem } from "@/lib/supabase";

// Раз на хвилину сторінка перевіряє, чи не з'явились у базі нові кейси
export const revalidate = 60;

export default async function Home() {
  // Кейси беремо з Supabase; якщо він не налаштований або база порожня —
  // компонент Cases сам покаже вбудовані демо-приклади
  let items: CaseItem[] | undefined;
  const supabase = getSupabase();
  if (supabase) {
    const { data } = await supabase
      .from("cases")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data && data.length > 0) items = data as CaseItem[];
  }

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Header />
      <Hero />
      <Marquee />
      <Problem />
      <Solution />
      <Cases items={items} />
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
