"use client";

import { useState } from "react";
import { SectTitle } from "@/components/Blocks";
import { MockLayers, MockContent, MockIntegrations, MockPalette } from "@/components/Mocks";

// Вкладки з «носиком» над великою ілюстрацією й картка праворуч — як навігація TomTom у зразку
const factors = [
  {
    tab: "Обсяг сторінок",
    text: "Лендинг чи багатосторінковий каталог. Що більше сторінок і розділів, то більше роботи над структурою й версткою.",
    visual: <MockLayers />,
  },
  {
    tab: "Контент",
    text: "Чи є готові тексти й фото, чи готую їх я. Якщо матеріалів немає — напишу тексти й підберу зображення.",
    visual: <MockContent />,
  },
  {
    tab: "Інтеграції",
    text: "Форми, онлайн-запис, карта, чат, аналітика. Підключаю лише те, що справді потрібно вашому бізнесу.",
    visual: <MockIntegrations />,
  },
  {
    tab: "Дизайн",
    text: "Шаблонний підхід чи унікальний макет. Унікальний дизайн довше, зате сайт ні з ким не сплутати.",
    visual: <MockPalette />,
  },
];

export default function Pricing() {
  const [cur, setCur] = useState(0);
  const f = factors[cur];

  return (
    <section className="sect" id="price">
      <SectTitle>Вартість</SectTitle>
      <div className="price-head reveal">
        <p className="price-head__big">
          <span>від</span> $600
        </p>
        <p className="price-head__sub">
          Сайт під ваш бізнес. Точну вартість рахую під вашу задачу й озвучую до старту — жодних
          прихованих платежів і сюрпризів у процесі.
        </p>
      </div>

      <div className="tabs tabs--notch" role="tablist" aria-label="Що впливає на ціну">
        {factors.map((x, i) => (
          <button
            key={x.tab}
            role="tab"
            aria-selected={i === cur}
            className={`tabs__btn${i === cur ? " on" : ""}`}
            onClick={() => setCur(i)}
          >
            {x.tab}
          </button>
        ))}
      </div>
      <div className="feature" role="tabpanel">
        <div className="feature__visual" aria-hidden="true" key={cur}>
          {f.visual}
        </div>
        <div className="feature__card">
          <p className="kicker">Що впливає на ціну</p>
          <h3>{f.tab}</h3>
          <p>{f.text}</p>
          <p className="feature__note">
            <i className="fa-solid fa-circle-info"></i>Фінальна ціна — після прорахунку
          </p>
          <a href="#contact" className="btn btn--primary">
            <i className="fa-solid fa-calculator"></i>Дізнатись точну вартість
          </a>
        </div>
      </div>
    </section>
  );
}
