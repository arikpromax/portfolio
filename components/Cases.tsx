"use client";

import { useState } from "react";
import { demoCases } from "@/lib/cases";
import { SectTitle } from "@/components/Blocks";
import { Browser, Phone } from "@/components/Mocks";

/** Велика ілюстрація з білою карткою поверх і перемикачами — як «Страницы производительности» у зразку */
export default function Cases() {
  const [idx, setIdx] = useState(0);
  const c = demoCases[idx];

  return (
    <section className="sect" id="cases">
      <SectTitle>Кейси</SectTitle>

      <div className="showcase">
        <div className="showcase__visual" aria-hidden="true" key={idx}>
          {c.image_url ? (
            <Browser url={c.url_label} className="showcase__desk">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image_url} alt="" />
            </Browser>
          ) : (
            <Browser a={c.accent} b={c.accent2} url={c.url_label} className="showcase__desk" />
          )}
          <Phone a={c.accent} b={c.accent2} className="showcase__phone" />
        </div>

        <div className="showcase__card reveal">
          <h3>Кілька прикладів роботи</h3>
          <p className="showcase__lead">
            Різні ніші, одна логіка: зрозуміла структура, довіра й проста дорога до заявки.
          </p>
          <div className="radios" role="radiogroup" aria-label="Кейс">
            {demoCases.map((item, i) => (
              <button
                key={item.title}
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
              {c.meta}
              {c.status === "dev" && <span className="showcase__dev">В розробці</span>}
            </span>
            <p>
              {c.description} <b>{c.result}</b>
            </p>
            {c.link ? (
              <a className="showcase__link" href={c.link} target="_blank" rel="noopener">
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
      <p className="note">Демо-приклади — справжні кейси з&apos;являться тут згодом.</p>
    </section>
  );
}
