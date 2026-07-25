"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getRef } from "@/lib/referral";

const links = [
  { hash: "#problem", label: "Проблема" },
  { hash: "#solution", label: "Рішення" },
  { hash: "#cases", label: "Кейси" },
  { hash: "#about", label: "Про мене" },
  { hash: "#process", label: "Як працюю" },
  { hash: "#price", label: "Ціна" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPartners, setShowPartners] = useState(false);
  const pathname = usePathname();

  // Клієнту, якого привів партнер, партнерку в меню не показуємо:
  // він не має бачити, що з його замовлення хтось отримує відсоток
  useEffect(() => {
    setShowPartners(!getRef());
  }, []);

  // На головній лишаємо чистий якір (#cases) — тоді браузер просто прокручує.
  // З інших сторінок (/partners) потрібен повний шлях, щоб спершу перейти на головну.
  const onHome = pathname === "/";
  const to = (hash: string) => (onHome ? hash : `/${hash}`);

  // Один готовий список пунктів — і для десктопного меню, і для мобільного
  const items = [
    ...links.map((l) => ({ href: to(l.hash), label: l.label })),
    ...(showPartners ? [{ href: "/partners", label: "Партнерам" }] : []),
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav">
          <a href={to("#top")} className="logo">
            <span className="logo__mark">a</span>arawebsite
          </a>
          <nav className="nav__links">
            {items.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav__cta">
            <a href={to("#contact")} className="btn btn--primary">
              <i className="fa-solid fa-calculator"></i>
              <span>Розрахувати сайт</span>
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
        {items.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href={to("#contact")} className="btn btn--primary" onClick={() => setOpen(false)}>
          <i className="fa-solid fa-calculator"></i>Розрахувати сайт
        </a>
      </nav>
    </>
  );
}
