import type { Metadata } from "next";
import Header from "@/components/Header";
import Partner from "@/components/Partner";
import BackToTop from "@/components/BackToTop";
import TelegramFab from "@/components/TelegramFab";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import ScrollProgress from "@/components/ScrollProgress";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Партнерська програма — 40% за приведеного клієнта | arawebsite",
  description:
    "Приведіть бізнес, якому потрібен сайт, — отримайте 40% вартості проєкту. Без внесків і зобов'язань: ви знайомите, решту роблю я.",
};

// Партнерська програма живе окремо від головної, щоб клієнт,
// який прийшов замовляти сайт, не бачив розміру винагороди партнера
export default function PartnersPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="pn-page">
        <Partner />
      </main>
      <BackToTop />
      <TelegramFab />
      <Footer />
      <SiteEffects />
      <CookieBanner />
    </>
  );
}
