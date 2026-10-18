"use client";

import { useContent } from "@/components/ContentProvider";

export default function Hero() {
  const { t, photo } = useContent();
  const img = photo("hero") || "/hero.webp";

  return (
    <section className="hero" id="top">
      <div className="hero__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="Знак arawebsite на робочому столі поруч із телефоном і ноутбуком" fetchPriority="high" />
      </div>

      <div className="wrap intro">
        <div className="intro__head reveal">
          {t("hero_kicker") && <p className="kicker">{t("hero_kicker")}</p>}
          <h1>{t("hero_title")}</h1>
        </div>
        <div className="intro__body reveal">
          {t("hero_btn") && (
            <div className="intro__actions">
              <a href="#cases" className="btn btn--ghost">
                {t("hero_btn")}
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
