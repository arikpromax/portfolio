"use client";

import { useEffect, useRef, useState } from "react";
import { SectTitle } from "@/components/Blocks";
import {
  MockChat,
  MockDemo,
  MockSitemap,
  MockDesign,
  MockCode,
  MockLaunch,
} from "@/components/Mocks";

const steps = [
  {
    tab: "Бриф",
    title: "Бриф",
    text: "Розбираюся у вашому бізнесі, клієнтах і меті сайту.",
    visual: (
      <MockChat
        lines={[
          [true, "Потрібен сайт для клініки"],
          [false, "Хто ваші пацієнти і що вони шукають першим?"],
          [true, "Ціни й запис онлайн"],
        ]}
      />
    ),
  },
  {
    tab: "Демосайт",
    title: "Демосайт — безкоштовно",
    text: "Показую, як виглядатиме ваш сайт. До будь-якої оплати й без зобов'язань.",
    visual: <MockDemo />,
  },
  {
    tab: "Структура",
    title: "Структура та контент",
    text: "Складаю логіку сторінок і тексти, що ведуть до заявки.",
    visual: <MockSitemap />,
  },
  {
    tab: "Дизайн",
    title: "Дизайн",
    text: "Малюю сучасний макет під вашу нішу й бренд.",
    visual: <MockDesign />,
  },
  {
    tab: "Розробка",
    title: "Розробка",
    text: "Збираю швидкий адаптивний сайт із формами та інтеграціями.",
    visual: <MockCode />,
  },
  {
    tab: "Запуск",
    title: "Запуск і підтримка",
    text: "Публікуємо сайт, і я лишаюся на зв'язку для правок.",
    visual: <MockLaunch />,
  },
];

// Цифри, що «набігають» з нуля, коли блок з'являється на екрані
const stats = [
  { label: "Сайт під ключ", prefix: "1–", from: 1, value: 3, unit: "дні" },
  { label: "Демосайт до оплати", prefix: "$", value: 0, unit: "безкоштовно" },
  { label: "Вартість сайту", prefix: "від $", value: 500, unit: "фінальна — після прорахунку" },
];

function Counter({ value, from = 0 }: { value: number; from?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Без анімації — одразу кінцеве число
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1400;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = duration ? Math.min(1, (now - start) / duration) : 1;
          setShown(Math.round(from + (value - from) * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, from]);

  return <span ref={ref}>{shown}</span>;
}

export default function Process() {
  const [cur, setCur] = useState(0);
  const step = steps[cur];

  return (
    <section className="sect" id="process">
      <SectTitle>Як я працюю</SectTitle>

      <div className="lead-block reveal">
        <h3>Від ідеї до запуску — зрозуміло й по кроках</h3>
        <p>Ви завжди знаєте, на якому етапі ми зараз і що буде далі.</p>
      </div>

      <div className="stats wrap">
        {stats.map((s) => (
          <div key={s.label} className="stat reveal">
            <span className="stat__label">{s.label}</span>
            <b className="stat__num">
              {s.prefix}
              <Counter value={s.value} from={s.from} />
            </b>
            <span className="stat__unit">{s.unit}</span>
          </div>
        ))}
      </div>

      <div className="tabs" role="tablist" aria-label="Етапи роботи">
        {steps.map((s, i) => (
          <button
            key={s.tab}
            role="tab"
            aria-selected={i === cur}
            className={`tabs__btn${i === cur ? " on" : ""}`}
            onClick={() => setCur(i)}
          >
            <span className="tabs__num">{String(i + 1).padStart(2, "0")}</span>
            {s.tab}
          </button>
        ))}
      </div>
      <div className="tabpane" role="tabpanel" key={cur}>
        <div className="tabpane__text">
          <h3>{step.title}</h3>
          <p>{step.text}</p>
          {cur === 1 && (
            <a href="#contact" className="btn btn--primary">
              <i className="fa-solid fa-gift"></i>Хочу демосайт
            </a>
          )}
        </div>
        <div className="tabpane__visual" aria-hidden="true">
          {step.visual}
        </div>
      </div>
    </section>
  );
}
