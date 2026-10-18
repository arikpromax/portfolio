import { Browser } from "@/components/Mocks";

/** Темний банер на всю ширину з круглою кнопкою — як «Обзор 360» у зразку */
export default function DemoBanner() {
  return (
    <section className="banner" aria-labelledby="demo-title">
      <div className="banner__bg" aria-hidden="true">
        <Browser a="#E26AA6" b="#7A1F58" url="nailstudio.ua" />
        <Browser url="dentacare.ua" />
        <Browser a="#E8943A" b="#7A4A12" url="budmayster.ua" />
      </div>
      <div className="banner__in reveal">
        <p className="kicker">Спершу подивіться — потім вирішуйте</p>
        <h2 id="demo-title">Демосайт — безкоштовно</h2>
        <a href="#contact" className="banner__btn" aria-label="Замовити безкоштовний демосайт">
          <i className="fa-solid fa-arrow-right"></i>
        </a>
        <p className="banner__sub">Показую, як виглядатиме ваш сайт, до будь-якої оплати й без зобов&apos;язань</p>
      </div>
    </section>
  );
}
