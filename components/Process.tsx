"use client";

import { useEffect, useRef, useState } from "react";
import { SectTitle } from "@/components/Blocks";
import { Visual } from "@/components/Mocks";
import { useContent, src } from "@/components/ContentProvider";

// Цифри, що «набігають» до числа, коли блок з'являється на екрані
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

// Число з адмінки: «500», «1 200» → 500, 1200. Не число — показуємо як є, без анімації
const toNum = (v: string) => {
  const n = Number(v.replace(/\s/g, "").replace(",", "."));
  return v.trim() !== "" && Number.isFinite(n) ? n : null;
};

export default function Process() {
  const { t, list, x } = useContent();
  const stats = list("stats");
  const steps = list("steps");
  const [picked, setCur] = useState(0);
  const cur = Math.min(picked, Math.max(steps.length - 1, 0)); // власник міг видалити етап
  const step = steps[cur];

  return (
    <section className="sect" id="process">
      <SectTitle>{t("proc_h")}</SectTitle>

      {(t("proc_lead_h") || t("proc_lead_p")) && (
        <div className="lead-block reveal">
          {t("proc_lead_h") && <h3>{t("proc_lead_h")}</h3>}
          {t("proc_lead_p") && <p>{t("proc_lead_p")}</p>}
        </div>
      )}

      {stats.length > 0 && (
        <div className="stats wrap">
          {stats.map((s, i) => {
            const n = toNum(x(s, "number"));
            const from = toNum(x(s, "from")) ?? 0;
            return (
              <div key={i} className="stat reveal">
                <span className="stat__label">{s.title}</span>
                <b className="stat__num">
                  {x(s, "prefix")}
                  {n === null ? x(s, "number") : <Counter value={n} from={from} />}
                </b>
                {s.text && <span className="stat__unit">{s.text}</span>}
              </div>
            );
          })}
        </div>
      )}

      {step && (
        <>
          <div className="tabs" role="tablist" aria-label="Етапи роботи">
            {steps.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === cur}
                className={`tabs__btn${i === cur ? " on" : ""}`}
                onClick={() => setCur(i)}
              >
                <span className="tabs__num">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </button>
            ))}
          </div>
          <div className="tabpane" role="tabpanel" key={cur}>
            <div className="tabpane__text">
              <h3>{x(step, "heading") || step.title}</h3>
              {step.text && <p>{step.text}</p>}
              {x(step, "btn") && (
                <a href="#contact" className="btn btn--primary">
                  <i className="fa-solid fa-gift"></i>
                  {x(step, "btn")}
                </a>
              )}
            </div>
            <div className="tabpane__visual" aria-hidden="true">
              <Visual k={x(step, "visual")} img={step.image_url ? src(step.image_url) : ""} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
