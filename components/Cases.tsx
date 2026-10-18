"use client";

import { useState } from "react";
import { SectTitle } from "@/components/Blocks";
import { Browser, Phone } from "@/components/Mocks";
import { useContent, src } from "@/components/ContentProvider";

/** Велика ілюстрація з білою карткою поверх і перемикачами — як «Страницы производительности» у зразку */
export default function Cases() {
  const { t, list, x } = useContent();
  const cases = list("cases");
  const [picked, setIdx] = useState(0);
  const idx = Math.min(picked, Math.max(cases.length - 1, 0)); // власник міг видалити кейс
  const c = cases[idx];
  if (!c) return null;

  const desk = c.image_url ? src(c.image_url) : "";
  const mobile = x(c, "image_mobile") ? src(x(c, "image_mobile")) : "";
  const link = x(c, "link");
  const dev = c.extra?.dev === true || x(c, "dev") === "true";

  return (
    <section className="sect" id="cases">
      <SectTitle>{t("cases_h")}</SectTitle>

      <div className="showcase">
        <div className="showcase__visual" aria-hidden="true" key={idx}>
          {desk ? (
            <Browser url={x(c, "url_label")} className="showcase__desk">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={desk} alt="" />
            </Browser>
          ) : (
            <Browser url={x(c, "url_label")} className="showcase__desk" />
          )}
          <Phone className="showcase__phone">
            {mobile && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mobile} alt="" />
            )}
          </Phone>
        </div>

        <div className="showcase__card reveal">
          {t("cases_card_h") && <h3>{t("cases_card_h")}</h3>}
          {t("cases_card_p") && <p className="showcase__lead">{t("cases_card_p")}</p>}
          <div className="radios" role="radiogroup" aria-label="Кейс">
            {cases.map((item, i) => (
              <button
                key={i}
                role="radio"
                aria-checked={i === idx}
                className={`radio${i === idx ? " on" : ""}`}
                onClick={() => setIdx(i)}
              >
                <span className="radio__dot"></span>
                {item.title}
              </button>
            ))}
          </div>
          <div className="showcase__case">
            <span className="showcase__meta">
              {x(c, "meta")}
              {dev && <span className="showcase__dev">В розробці</span>}
            </span>
            <p>
              {c.text} {x(c, "result") && <b>{x(c, "result")}</b>}
            </p>
            {link ? (
              <a className="showcase__link" href={link} target="_blank" rel="noopener">
                Дивитись сайт <i className="fa-solid fa-arrow-right"></i>
              </a>
            ) : (
              // Сайт ще не запущено — не вдаємо посилання, чесно кажемо про стан
              <span className="showcase__link off">
                <i className="fa-solid fa-hammer"></i>Сайт готується до запуску
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
