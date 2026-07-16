import type { Metadata } from "next";
import "./globals.css";

// ⚠️ Після публікації заміни URL-и на адресу свого сайту (зараз — GitHub Pages з оригіналу)
const SITE_URL = "https://arik77777.github.io/portfolio/";

export const metadata: Metadata = {
  title: "arawebsite — сайти, які приносять заявки вашому бізнесу",
  description:
    "Розробляю сайти під будь-який бізнес — від лендингу до каталогу. Роблю так, щоб відвідувач залишив заявку, подзвонив або записався. Сайт під ваш бізнес — від $600.",
  openGraph: {
    type: "website",
    title: "arawebsite — сайти, які приносять заявки вашому бізнесу",
    description:
      "Сучасні сайти під будь-який бізнес: довіра, заявки в один клік, адаптив і швидке завантаження. Від $600.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}preview.jpg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "arawebsite — сайти, які приносять заявки",
    description: "Сучасні сайти під будь-який бізнес. Від $600.",
    images: [`${SITE_URL}preview.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
