import type { Metadata } from "next";

// Адмінку не показуємо пошуковим системам
export const metadata: Metadata = {
  title: "Адмінка — arawebsite",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
