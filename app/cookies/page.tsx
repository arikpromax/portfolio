import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieSettingsLink from "@/components/CookieSettingsLink";

export const metadata: Metadata = {
  title: "Файли cookie — arawebsite",
  description: "Повний перелік файлів cookie на сайті arawebsite: назви, призначення, терміни.",
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="doc">
        <div className="wrap doc__wrap">
          <h1>Файли cookie</h1>
          <p className="doc__upd">Чинна з 13 жовтня 2026 року</p>

          <p className="doc__lead">
            Тут перелічені <b>усі</b> файли cookie цього сайту — їх три. Один власний, щоб
            запамʼятати ваш вибір, і два від Google Analytics, які зʼявляються <b>лише</b> після
            того, як ви натиснете «Прийняти».
          </p>

          <h2>Що є на сайті</h2>
          <div className="doc__tablewrap">
            <table className="doc__table">
              <thead>
                <tr>
                  <th>Назва</th>
                  <th>Для чого</th>
                  <th>Термін</th>
                  <th>Категорія</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>aw_consent</code>
                  </td>
                  <td>Запамʼятовує ваш вибір у віконці про cookie, щоб не питати вас щоразу.</td>
                  <td>1 рік</td>
                  <td>Необхідна</td>
                </tr>
                <tr>
                  <td>
                    <code>_ga</code>
                  </td>
                  <td>
                    Google Analytics. Випадковий номер, за яким статистика відрізняє повторний візит
                    від нового. Імені чи контактів у ньому немає.
                  </td>
                  <td>2 роки</td>
                  <td>Статистика, лише за згодою</td>
                </tr>
                <tr>
                  <td>
                    <code>_ga_BS7N5LW9RQ</code>
                  </td>
                  <td>
                    Google Analytics. Памʼятає, що триває той самий візит, щоб перегляд кількох
                    сторінок рахувався як одне відвідування.
                  </td>
                  <td>2 роки</td>
                  <td>Статистика, лише за згодою</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Чого на сайті немає</h2>
          <ul>
            <li>Facebook Pixel, Google Ads та інших рекламних трекерів;</li>
            <li>кнопок і віджетів соцмереж, що ставлять свої cookie;</li>
            <li>чатів, карт і відео зі сторонніх сервісів.</li>
          </ul>

          <h2>Ваш вибір</h2>
          <p>
            Коли ви заходите вперше, сайт показує віконце з трьома варіантами. Що вони роблять
            насправді:
          </p>
          <ul>
            <li>
              <b>«Прийняти»</b> — завантажується Google Analytics і ставить свої дві cookie.
            </li>
            <li>
              <b>«Відхилити»</b> — скрипт Google Analytics не завантажується зовсім, тож
              Google нічого про ваш візит не дізнається. Якщо раніше ви погоджувалися, його cookie
              одразу видаляються.
            </li>
            <li>
              <b>«Налаштувати»</b> — показує, що можна вимкнути, а що ні: необхідна cookie
              не вимикається, а перемикач статистики вимкнений, поки ви самі його не увімкнете.
            </li>
          </ul>
          <p>
            Поки ви нічого не обрали, сайт поводиться так само, як після «Відхилити».
          </p>

          <p>
            Змінити рішення можна будь-коли: <CookieSettingsLink />
          </p>

          <h2>Як прибрати cookie самостійно</h2>
          <p>
            Усі три cookie можна видалити в налаштуваннях браузера — розділ конфіденційності,
            «Файли cookie та дані сайтів». Там же можна заборонити їх зовсім. Сайт від цього
            працювати не перестане, лише віконце про cookie зʼявиться знову.
          </p>

          <h2>Сторонні ресурси</h2>
          <p>
            Cookie вони не ставлять, але бачать вашу IP-адресу, бо браузер завантажує з них файли:
            шрифти Google Fonts та іконки Font Awesome із Cloudflare. Детальніше — у{" "}
            <a href="/privacy">політиці конфіденційності</a>.
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
