"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#problem", label: "Проблема" },
  { href: "#solution", label: "Рішення" },
  { href: "#cases", label: "Кейси" },
  { href: "#about", label: "Про мене" },
  { href: "#process", label: "Як працюю" },
  { href: "#price", label: "Ціна" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          <a href="#top" className="logo">
            <span className="logo__mark">a</span>arawebsite
          </a>
          <nav className="nav__links">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav__cta">
            <a href="#contact" className="btn btn--primary">
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
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="btn btn--primary" onClick={() => setOpen(false)}>
          <i className="fa-solid fa-calculator"></i>Розрахувати сайт
        </a>
      </nav>
    </>
  );
}
