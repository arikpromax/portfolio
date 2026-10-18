"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Глобальне меню вгорі (як «Модели / Покупки» на сайті-зразку)
const links = [
  { hash: "#solution", label: "Послуги" },
  { hash: "#cases", label: "Кейси" },
  { hash: "#about", label: "Про мене" },
  { hash: "#price", label: "Ціна" },
];

// Вкладки розділів у липкій смузі — підсвічуються під час прокрутки
const tabs = [
  { id: "top", label: "Огляд" },
  { id: "solution", label: "Рішення" },
  { id: "process", label: "Як працюю" },
  { id: "cases", label: "Кейси" },
  { id: "price", label: "Ціна" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const tabsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // На головній лишаємо чистий якір — браузер просто прокручує.
  // З інших сторінок (/privacy, /cookies) потрібен повний шлях, щоб спершу перейти на головну.
  const onHome = pathname === "/";
  const to = (hash: string) => (onHome ? hash : `/${hash}`);

  // Активна вкладка — останній розділ, верх якого вже пройшов під липкою смугою
  useEffect(() => {
    if (!onHome) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = tabs[0].id;
      for (const t of tabs) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= 160) current = t.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [onHome]);

  // На вузькому екрані вкладки гортаються вбік — тримаємо активну в полі зору
  useEffect(() => {
    const bar = tabsRef.current;
    const tab = bar?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!bar || !tab) return;
    const left = tab.offsetLeft - (bar.clientWidth - tab.offsetWidth) / 2;
    bar.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <header className="gh">
        <div className="gh__in">
          <a href={to("#top")} className="logo">
            <span className="logo__mark">a</span>arawebsite
          </a>
          <nav className="gh__links">
            {links.map((l) => (
              <a key={l.hash} href={to(l.hash)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="gh__right">
            <a href={to("#contact")} className="gh__cta">
              <i className="fa-solid fa-calculator"></i>
              <span>Розрахувати сайт</span>
            </a>
            <a href="https://t.me/arikpromax" target="_blank" rel="noopener" className="gh__tg" aria-label="Telegram">
              <i className="fa-brands fa-telegram"></i>
            </a>
            <button
              className="burger"
              aria-label="Меню"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <i className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
            </button>
          </div>
        </div>
      </header>

      <nav className={`mobile-menu${open ? " open" : ""}`}>
        {links.map((l) => (
          <a key={l.hash} href={to(l.hash)} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href={to("#contact")} className="btn btn--primary" onClick={() => setOpen(false)}>
          <i className="fa-solid fa-calculator"></i>Розрахувати сайт
        </a>
      </nav>

      <div className="subnav">
        <div className="subnav__model">
          <span className="subnav__year">2026</span>
          <b>arawebsite · сайти для бізнесу</b>
        </div>
        <div className="subnav__tabs" ref={tabsRef}>
          {tabs.map((t) => (
            <a
              key={t.id}
              href={to(`#${t.id}`)}
              data-tab={t.id}
              className={onHome && active === t.id ? "on" : ""}
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
