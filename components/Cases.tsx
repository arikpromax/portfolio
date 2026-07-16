"use client";

import { useRef, useState } from "react";

const cases = [
  {
    url: "dentacare.ua",
    accent: "#0FA39B",
    accent2: "#0F3D52",
    meta: "Стоматологія · Київ",
    title: "DentaCare",
    desc: (
      <>
        Сайт клініки: онлайн-запис, лікарі, обладнання, відгуки. <b>+40% записів</b> за перший
        місяць.
      </>
    ),
  },
  {
    url: "nailstudio.ua",
    accent: "#E26AA6",
    accent2: "#7A1F58",
    meta: "Б'юті-студія · Львів",
    title: "Nail&Studio",
    desc: (
      <>
        Запис онлайн 24/7, портфоліо робіт, прайс і майстри. <b>Запис без дзвінків.</b>
      </>
    ),
  },
  {
    url: "budmayster.ua",
    accent: "#E8943A",
    accent2: "#7A4A12",
    meta: "Будівництво · Дніпро",
    title: "БудМайстер",
    desc: (
      <>
        Каталог об'єктів, етапи робіт, матеріали й форма прорахунку. <b>Заявки на кошторис.</b>
      </>
    ),
  },
  {
    url: "coffeepoint.ua",
    accent: "#9B6A43",
    accent2: "#3E2A1B",
    meta: "Кав'ярня · Одеса",
    title: "CoffeePoint",
    desc: (
      <>
        Меню, бронювання столиків і карта на сайті. <b>Гості бачать усе одразу.</b>
      </>
    ),
  },
];

const SWIPE_THRESHOLD = 55;

export default function Cases() {
  const [idx, setIdx] = useState(0);
  const [hintHidden, setHintHidden] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const drag = useRef({ startX: 0, lastDx: 0, dragging: false, slide: null as HTMLDivElement | null });

  const total = cases.length;
  const go = (i: number) => setIdx(Math.max(0, Math.min(total - 1, i)));

  const slideClass = (i: number) => {
    if (i === idx) return "cs-slide active";
    if (i === idx + 1) return "cs-slide next";
    if (i > idx + 1) return "cs-slide after";
    if (i === idx - 1) return "cs-slide prev";
    return "cs-slide before";
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const slide = slideRefs.current[idx];
    if (!slide) return;
    drag.current = { startX: e.clientX, lastDx: 0, dragging: true, slide };
    slide.style.transition = "none";
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    setHintHidden(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.dragging || !d.slide) return;
    d.lastDx = e.clientX - d.startX;
    d.slide.style.transform = `translateX(${d.lastDx}px) rotate(${d.lastDx * 0.02}deg)`;
  };

  const endDrag = () => {
    const d = drag.current;
    if (!d.dragging || !d.slide) return;
    d.dragging = false;
    d.slide.style.transition = "";
    d.slide.style.transform = "";
    if (d.lastDx <= -SWIPE_THRESHOLD && idx < total - 1) go(idx + 1);
    else if (d.lastDx >= SWIPE_THRESHOLD && idx > 0) go(idx - 1);
  };

  return (
    <section className="section" id="cases">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="eyebrow">Кейси</span>
          <h2>Кілька прикладів роботи</h2>
          <p>Різні ніші, одна логіка: зрозуміла структура, довіра й проста дорога до заявки.</p>
        </div>

        <div
          className="cs-stack"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {cases.map((c, i) => (
            <div
              key={c.title}
              className={slideClass(i)}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
            >
              <article className="cs-card">
                <div className="cs-browser">
                  <div className="cs-bar">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span className="cs-url">{c.url}</span>
                  </div>
                  <div
                    className="cs-mini"
                    style={{ "--accent": c.accent, "--accent2": c.accent2 } as React.CSSProperties}
                  >
                    <div className="cs-nav">
                      <span className="cs-logo"></span>
                      <span className="cs-links">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </div>
                    <div className="cs-hero">
                      <span className="cs-h"></span>
                      <span className="cs-h s"></span>
                      <span className="cs-cta"></span>
                    </div>
                    <div className="cs-cards">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
                <div className="cs-info">
                  <span className="cs-meta">{c.meta}</span>
                  <h3 className="cs-title">{c.title}</h3>
                  <p className="cs-res">{c.desc}</p>
                  {/* Демо-посилання: не стрибати вгору. Реальні URL працюватимуть нормально */}
                  <a className="cs-link" href="#" onClick={(e) => e.preventDefault()}>
                    Дивитись сайт <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="cs-controls">
          <button
            className="cs-arrow"
            aria-label="Попередній"
            disabled={idx === 0}
            onClick={() => go(idx - 1)}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div className="cs-dots">
            {cases.map((c, i) => (
              <button
                key={c.title}
                className={`cs-dot${i === idx ? " on" : ""}`}
                aria-label={`Кейс ${i + 1}`}
                onClick={() => go(i)}
              ></button>
            ))}
          </div>
          <button
            className="cs-arrow"
            aria-label="Наступний"
            disabled={idx === total - 1}
            onClick={() => go(idx + 1)}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <p className={`cs-hint${hintHidden ? " hide" : ""}`}>
          <i className="fa-solid fa-hand-pointer"></i> Гортайте вбік або тягніть картку
        </p>
        <p className="cs-note">Демо-приклади — справжні кейси з&apos;являться тут згодом.</p>
      </div>
    </section>
  );
}
