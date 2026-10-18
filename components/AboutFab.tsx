"use client";

import { useEffect, useRef, useState } from "react";
import TgLogo from "@/components/TgLogo";
import { useContent, src } from "@/components/ContentProvider";


/**
 * Кругла кнопка ліворуч (пара до кнопки Telegram праворуч) — відкриває панель «Про нас».
 * Панель також відкривається з посилання «Про нас» у шапці: воно веде на #about.
 */
export default function AboutFab() {
  const [open, setOpen] = useState(false);
  // Команда — колекція «Команда» в адмінці: нова людина = нова картка
  const { t, list, x, contacts } = useContent();
  const team = list("team");
  const closeRef = useRef<HTMLButtonElement>(null);

  // #about в адресі — відкрити панель (посилання в шапці, перехід з /privacy чи /cookies)
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#about") setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("about-open");
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("about-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    // прибираємо #about, щоб посилання в шапці спрацювало й наступного разу
    if (window.location.hash === "#about") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  return (
    <>
      <button className="fab fab--left" aria-label="Про нас" aria-expanded={open} onClick={() => setOpen(true)}>
        <i className="fa-solid fa-user-group"></i>
      </button>

      <div className={`about-veil${open ? " on" : ""}`} onClick={close} aria-hidden="true"></div>
      <aside className={`about${open ? " on" : ""}`} aria-label="Про нас" aria-hidden={!open}>
        <button className="about__close" aria-label="Закрити" onClick={close} ref={closeRef} tabIndex={open ? 0 : -1}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2>{t("about_h")}</h2>

        <div className="about__team">
          {team.map((m, i) => (
            <div key={i} className="about__person">
              <div className="about__who">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {m.image_url && <img src={src(m.image_url)} alt={m.title} />}
                <div>
                  <b>{m.title}</b>
                  {x(m, "role") && <span className="about__role">{x(m, "role")}</span>}
                </div>
              </div>
              {m.text && <p>{m.text}</p>}
            </div>
          ))}
        </div>

        <div className="about__actions">
          <a href="#contact" className="btn btn--primary" onClick={close} tabIndex={open ? 0 : -1}>
            <i className="fa-solid fa-comments"></i>Обговорити проєкт
          </a>
          <a
            href={contacts.tgUrl}
            target="_blank"
            rel="noopener"
            className="btn btn--ghost"
            tabIndex={open ? 0 : -1}
          >
            <TgLogo id="about" className="about__tg" />
            Telegram
          </a>
        </div>
      </aside>
    </>
  );
}
