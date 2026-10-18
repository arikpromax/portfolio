"use client";

import { Browser } from "@/components/Mocks";
import { useContent } from "@/components/ContentProvider";

/** Темний банер на всю ширину з круглою кнопкою — як «Обзор 360» у зразку */
export default function DemoBanner() {
  const { t } = useContent();
  return (
    <section className="banner" aria-labelledby="demo-title">
      <div className="banner__bg" aria-hidden="true">
        <Browser a="#E26AA6" b="#7A1F58" url="nailstudio.ua" />
        <Browser url="dentacare.ua" />
        <Browser a="#E8943A" b="#7A4A12" url="budmayster.ua" />
      </div>
      <div className="banner__in reveal">
        {t("demo_kicker") && <p className="kicker">{t("demo_kicker")}</p>}
        <h2 id="demo-title">{t("demo_h")}</h2>
        <a href="#contact" className="banner__btn" aria-label={t("demo_h")}>
          <i className="fa-solid fa-arrow-right"></i>
        </a>
        {t("demo_sub") && <p className="banner__sub">{t("demo_sub")}</p>}
      </div>
    </section>
  );
}
