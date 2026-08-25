import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Файли cookie — arawebsite",
  description: "Сайт arawebsite не використовує файли cookie: ні власних, ні сторонніх.",
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="doc">
        <div className="wrap doc__wrap">
          <h1>Файли cookie</h1>
          <p className="doc__upd">Чинна з 26 липня 2026 року</p>

          <p className="doc__lead">
            Коротко: <b>цей сайт не використовує файли cookie</b> — ні власних, ні сторонніх. Тому
            тут немає ні віконця про згоду, ні перемикачів: питати просто нема про що.
          </p>

          <h2>Чого на сайті немає</h2>
          <ul>
            <li>жодних власних cookie;</li>
            <li>Google Analytics та будь-якої іншої аналітики;</li>
            <li>Facebook Pixel та рекламних трекерів;</li>
            <li>кнопок і віджетів соцмереж, що ставлять свої cookie;</li>
            <li>чатів, карт і відео зі сторонніх сервісів.</li>
          </ul>

          <h2>Що сайт про вас знає</h2>
          <p>
            Нічого, поки ви самі не залишите заявку у формі. Сайт не веде вашу поведінку, не
            рахує відвідування й не звʼязує вас із іншими сайтами.
          </p>

          <h2>Сторонні ресурси</h2>
          <p>
            Cookie вони не ставлять, але бачать вашу IP-адресу, бо браузер завантажує з них файли:
            шрифти Google Fonts та іконки Font Awesome із Cloudflare. Детальніше — у{" "}
            <a href="/privacy">політиці конфіденційності</a>.
          </p>

          <h2>Якщо щось зміниться</h2>
          <p>
            Якщо колись на сайті зʼявиться аналітика чи інший інструмент із cookie, тут буде повний
            перелік, а вас спершу запитають про згоду.
          </p>

          <p className="doc__back">
            <a href="/">← На головну</a> &nbsp;·&nbsp;{" "}
            <a href="/privacy">Політика конфіденційності</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
