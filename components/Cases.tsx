"use client";

import { useRef, useState } from "react";
import { demoCases, type CaseItem } from "@/lib/supabase";

const SWIPE_THRESHOLD = 55;

export default function Cases({ items }: { items?: CaseItem[] }) {
  // Якщо база порожня чи недоступна — показуємо вбудовані демо-кейси
  const usingDemo = !items || items.length === 0;
  const cases = usingDemo ? demoCases : items;

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
    // Клік почався на посиланні — не вмикаємо перетягування, хай посилання спрацює
    if ((e.target as HTMLElement).closest("a")) return;
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

  // Клік по картці (без потягування) відкриває сайт кейса
  const onStackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return; // посилання обробляє себе саме
    if (Math.abs(drag.current.lastDx) > 8) return; // це був свайп, а не клік
    const current = cases[idx];
    if (current.link) window.open(current.link, "_blank", "noopener");
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
          onClick={onStackClick}
        >
          {cases.map((c, i) => (
            <div
              key={c.id ?? c.title}
              className={slideClass(i)}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
            >
              <article className={`cs-card${c.link ? " cs-card--linked" : ""}`}>
                <div className="cs-browser">
                  <div className="cs-bar">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span className="cs-url">{c.url_label}</span>
                  </div>
                  {c.image_url ? (
                    // Справжній скриншот сайту, завантажений через адмінку
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="cs-shot" src={c.image_url} alt={`Скриншот сайту ${c.title}`} />
                  ) : (
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
                  )}
                </div>
                <div className="cs-info">
                  <span className="cs-meta">{c.meta}</span>
                  <h3 className="cs-title">{c.title}</h3>
                  <p className="cs-res">
                    {c.description} <b>{c.result}</b>
                  </p>
                  {c.link ? (
                    <a className="cs-link" href={c.link} target="_blank" rel="noopener">
                      Дивитись сайт <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  ) : (
                    // Посилання ще немає — нікуди не ведемо
                    <a className="cs-link" href="#" onClick={(e) => e.preventDefault()}>
                      Дивитись сайт <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  )}
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
                key={c.id ?? c.title}
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
        {usingDemo && (
          <p className="cs-note">Демо-приклади — справжні кейси з&apos;являться тут згодом.</p>
        )}
      </div>
    </section>
  );
}
