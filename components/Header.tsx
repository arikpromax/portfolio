"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import TgLogo from "@/components/TgLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { useContent } from "@/components/ContentProvider";

// Глобальне меню вгорі (як «Модели / Покупки» на сайті-зразку): якір → ключ підпису в адмінці
const links = [
  { hash: "#solution", key: "nav_services" },
  { hash: "#cases", key: "nav_cases" },
  { hash: "#about", key: "nav_about" },
  { hash: "#price", key: "nav_price" },
];

// Вкладки розділів у липкій смузі — підсвічуються під час прокрутки
const tabs = [
  { id: "top", key: "tab_top" },
  { id: "solution", key: "tab_solution" },
  { id: "process", key: "tab_process" },
  { id: "cases", key: "tab_cases" },
  { id: "price", key: "tab_price" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("top");
  const tabsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t, contacts } = useContent();

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
      for (const tb of tabs) {
        const el = document.getElementById(tb.id);
        if (el && el.getBoundingClientRect().top <= 160) current = tb.id;
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
                {t(l.key)}
              </a>
            ))}
          </nav>
          <div className="gh__right">
            <a href={to("#contact")} className="gh__cta">
              <i className="fa-solid fa-calculator"></i>
              <span>{t("header_cta")}</span>
            </a>
            <a href={contacts.tgUrl} target="_blank" rel="noopener" className="gh__tg" aria-label="Telegram">
              <TgLogo id="head" />
            </a>
            <ThemeToggle />
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
            {t(l.key)}
          </a>
        ))}
        <a href={to("#contact")} className="btn btn--primary" onClick={() => setOpen(false)}>
          <i className="fa-solid fa-calculator"></i>
          {t("header_cta")}
        </a>
      </nav>

      <div className="subnav">
        <div className="subnav__model">
          {t("subnav_year") && <span className="subnav__year">{t("subnav_year")}</span>}
          <b>{t("subnav_name")}</b>
        </div>
        <div className="subnav__tabs" ref={tabsRef}>
          {tabs.map((tb) => (
            <a
              key={tb.id}
              href={to(`#${tb.id}`)}
              data-tab={tb.id}
              className={onHome && active === tb.id ? "on" : ""}
            >
              {t(tb.key)}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
