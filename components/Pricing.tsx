"use client";

import { useState } from "react";
import { SectTitle } from "@/components/Blocks";
import { Visual } from "@/components/Mocks";
import { useContent, src } from "@/components/ContentProvider";

// Вкладки з «носиком» над великою ілюстрацією й картка праворуч — як навігація TomTom у зразку
export default function Pricing() {
  const { t, list, x } = useContent();
  const factors = list("factors");
  const [picked, setCur] = useState(0);
  const cur = Math.min(picked, Math.max(factors.length - 1, 0)); // власник міг видалити фактор
  const f = factors[cur];

  return (
    <section className="sect" id="price">
      <SectTitle>{t("price_h")}</SectTitle>
      <div className="price-head reveal">
        <p className="price-head__big">
          {t("price_from") && <span>{t("price_from")}</span>} {t("price_value")}
        </p>
        {t("price_sub") && <p className="price-head__sub">{t("price_sub")}</p>}
      </div>

      {f && (
        <>
          <div className="tabs tabs--notch" role="tablist" aria-label={t("price_kicker") || "Що впливає на ціну"}>
            {factors.map((it, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === cur}
                className={`tabs__btn${i === cur ? " on" : ""}`}
                onClick={() => setCur(i)}
              >
                {it.title}
              </button>
            ))}
          </div>
          <div className="feature" role="tabpanel">
            <div className="feature__visual" aria-hidden="true" key={cur}>
              <Visual k={x(f, "visual")} img={f.image_url ? src(f.image_url) : ""} />
            </div>
            <div className="feature__card">
              {t("price_kicker") && <p className="kicker">{t("price_kicker")}</p>}
              <h3>{f.title}</h3>
              {f.text && <p>{f.text}</p>}
              {t("price_note") && (
                <p className="feature__note">
                  <i className="fa-solid fa-circle-info"></i>
                  {t("price_note")}
                </p>
              )}
              {t("price_btn") && (
                <a href="#contact" className="btn btn--primary">
                  <i className="fa-solid fa-calculator"></i>
                  {t("price_btn")}
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
