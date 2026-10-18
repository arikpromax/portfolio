"use client";

import { useRef } from "react";

/**
 * Перемикач світлої / темної теми. Тема — атрибут data-theme на <html>;
 * вибір запамʼятовується в localStorage (aw_theme) і ставиться ще до першого кадру
 * скриптом у app/layout.tsx, тож сторінка не блимає світлим.
 * Яку іконку показати, вирішує CSS за data-theme — тому сервер і браузер малюють однаково.
 * Нова тема розходиться колом від кнопки (View Transitions); де їх немає
 * або людина просила менше анімації — тема просто перемикається.
 */
export const THEME_KEY = "aw_theme";

export default function ThemeToggle() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // приватний режим — тема просто не запамʼятається
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const btn = btnRef.current;
    if (reduce || !btn || typeof document.startViewTransition !== "function") {
      apply();
      return;
    }

    // Коло з центром у кнопці, якого вистачає, щоб накрити найдальший кут екрана
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(apply);
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
        );
      })
      .catch(() => {
        // перехід перервано (наприклад, подвійний клік) — тема вже застосована
      });
  };

  return (
    <button
      ref={btnRef}
      type="button"
      className="theme-btn"
      onClick={toggle}
      aria-label="Перемкнути світлу чи темну тему"
      title="Світла / темна тема"
    >
      <i className="fa-solid fa-moon i-moon"></i>
      <i className="fa-solid fa-sun i-sun"></i>
    </button>
  );
}
