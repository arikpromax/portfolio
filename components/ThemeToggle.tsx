"use client";

/**
 * Перемикач світлої / темної теми. Тема — атрибут data-theme на <html>;
 * вибір запамʼятовується в localStorage (aw_theme) і ставиться ще до першого кадру
 * скриптом у app/layout.tsx, тож сторінка не блимає світлим.
 * Яку іконку показати, вирішує CSS за data-theme — тому сервер і браузер малюють однаково.
 */
export const THEME_KEY = "aw_theme";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // приватний режим — тема просто не запамʼятається
    }
  };

  return (
    <button
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
