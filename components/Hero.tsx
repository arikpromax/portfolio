"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  size: string;
  left: string;
  top: string;
  opacity: string;
  animation: string;
};

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  const magBtnRef = useRef<HTMLAnchorElement>(null);

  // Частинки генеруються лише в браузері — випадкові значення
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const count = window.innerWidth < 640 ? 22 : 40;
    setParticles(
      Array.from({ length: count }, () => ({
        size: (Math.random() * 3 + 2).toFixed(1) + "px",
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        opacity: (Math.random() * 0.4 + 0.15).toFixed(2),
        animation: `pdrift ${(Math.random() * 6 + 6).toFixed(1)}s ease-in-out ${(Math.random() * 5).toFixed(1)}s infinite`,
      }))
    );
  }, []);

  // «Магнітна» кнопка + паралакс магніта за курсором
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const magBtn = magBtnRef.current;
    const section = sectionRef.current;
    const magnet = magnetRef.current;
    if (reduce || !magBtn || !section || !magnet) return;

    const onBtnMove = (e: MouseEvent) => {
      const r = magBtn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      magBtn.style.transform = `translate(${x * 0.18}px, ${y * 0.28 - 2}px)`;
    };
    const onBtnLeave = () => {
      magBtn.style.transform = "";
    };
    magBtn.addEventListener("mousemove", onBtnMove);
    magBtn.addEventListener("mouseleave", onBtnLeave);

    let onSecMove: ((e: MouseEvent) => void) | null = null;
    let onSecLeave: (() => void) | null = null;
    if (window.matchMedia("(pointer:fine)").matches) {
      onSecMove = (e: MouseEvent) => {
        const r = section.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        magnet.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(10px)`;
      };
      onSecLeave = () => {
        magnet.style.transform = "";
      };
      section.addEventListener("mousemove", onSecMove);
      section.addEventListener("mouseleave", onSecLeave);
    }

    return () => {
      magBtn.removeEventListener("mousemove", onBtnMove);
      magBtn.removeEventListener("mouseleave", onBtnLeave);
      if (onSecMove) section.removeEventListener("mousemove", onSecMove);
      if (onSecLeave) section.removeEventListener("mouseleave", onSecLeave);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <div className="hero-particles" aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              opacity: p.opacity,
              animation: p.animation,
            }}
          />
        ))}
      </div>
      <div className="wrap hero__grid">
        <div className="hero__copy reveal">
          <span className="eyebrow">Веб-студія «arawebsite»</span>
          <h1>
            Сайт, який приносить <span className="hl">заявки</span> вашому бізнесу — а не просто
            висить в інтернеті
          </h1>
          <p className="hero__sub">
            Розробляю сайти під будь-який бізнес — від лендингу до каталогу. Роблю так, щоб
            відвідувач не закрив вкладку, а залишив заявку, подзвонив або записався на прийом.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary btn--lg" ref={magBtnRef}>
              <i className="fa-solid fa-calculator"></i>Отримати розрахунок сайту
            </a>
            <a href="#cases" className="btn btn--ghost btn--lg">
              <i className="fa-solid fa-folder-open"></i>Дивитись кейси
            </a>
          </div>
          {/* Коли з'являться реальні клієнти, можна вписати їх сюди */}
          <p className="hero__trust">
            <i className="fa-solid fa-circle-check"></i>Працюєте напряму зі мною: чесні терміни,
            прозора ціна й підтримка після запуску
          </p>
        </div>

        <div className="magnet reveal" aria-hidden="true" ref={magnetRef}>
          <div className="magnet__ring ring-1"></div>
          <div className="magnet__ring ring-2"></div>
          <div className="magnet__core">
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#0F3D52" />
                  <stop offset="1" stopColor="#0FA39B" />
                </linearGradient>
              </defs>
              <path
                d="M25 18 a25 25 0 0 1 50 0 v30 h-17 v-30 a8 8 0 0 0 -16 0 v30 h-17 z"
                fill="url(#mg)"
              />
              <rect x="25" y="48" width="17" height="14" fill="#E11D48" />
              <rect x="58" y="48" width="17" height="14" fill="#E5E9EC" />
            </svg>
          </div>
          <div className="lead-pill pill-1">
            <i className="fa-solid fa-pen-to-square"></i>Нова заявка
          </div>
          <div className="lead-pill pill-2">
            <i className="fa-solid fa-phone"></i>Дзвінок клієнта
          </div>
          <div className="lead-pill pill-3">
            <i className="fa-solid fa-calendar-check"></i>Запис на прийом
          </div>
        </div>
      </div>
    </section>
  );
}
