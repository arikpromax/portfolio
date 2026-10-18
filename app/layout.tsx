import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import InlineScript from "@/components/InlineScript";
import ContentProvider from "@/components/ContentProvider";
import { getContent } from "@/lib/content";

// Ставить збережену тему ще до першого кадру, щоб темна сторінка не блимала світлим
const themeInit = `try{var t=localStorage.getItem("aw_theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

// Публічна адреса сайту. Власний домен підключено 27.07.2026;
// стара адреса на vercel.app продовжує працювати як дублікат
const SITE_URL = "https://arawebsite.com/";

// Заголовок і опис для Google та соцмереж — з адмінки (розділ «Google і соцмережі»)
export async function generateMetadata(): Promise<Metadata> {
  const { texts } = await getContent();
  const title = texts.seo_title;
  const description = texts.seo_desc;
  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: SITE_URL,
      images: [{ url: `${SITE_URL}preview.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}preview.jpg`],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Тексти й картки з адмінки (або стандартні з lib/content.json) — для всіх сторінок
  const content = await getContent();
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <InlineScript html={themeInit} />
      </head>
      <body>
        <ContentProvider value={content}>
          {children}
          {/* Банер згоди на всіх сторінках; GA вантажиться лише після «Прийняти» */}
          <CookieBanner />
          <Analytics />
        </ContentProvider>
      </body>
    </html>
  );
}
