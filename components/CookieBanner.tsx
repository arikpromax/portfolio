"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent, REOPEN_EVENT } from "@/lib/consent";

/**
 * Картка по центру екрана з питанням про cookie. Фон не затемнює й нічого не
 * блокує — сайт можна читати й гортати, поки вона висить.
 * Три рівноцінні дії: «Прийняти», «Відхилити», «Налаштувати». У налаштуваннях видно,
 * що необхідні cookie не вимикаються, а статистику й карту Google можна вимкнути.
 * Повернути банер після вибору можна посиланням у підвалі.
 */
export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [settings, setSettings] = useState(false);
  // Перемикач за замовчуванням вимкнений: попередньо увімкнена галочка — не згода
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    if (!getConsent()) setShow(true);

    // Підвал попросив показати банер знову — щоб змінити рішення
    const reopen = () => {
      setAnalyticsAllowed(getConsent() === "all");
      setSettings(false);
      setLeaving(false);
      setShow(true);
    };
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  const choose = (choice: "all" | "essential") => {
    setConsent(choice);
    setLeaving(true);
    setTimeout(() => {
      setShow(false);
      setSettings(false);
    }, 300);
  };

  if (!show) return null;

  return (
    <div
      className={`ck${settings ? "" : " ck--square"}${leaving ? " ck--out" : ""}`}
      role="region"
      aria-label="Файли cookie"
    >
      {settings ? (
        <div className="ck__panel">
          <p className="ck__panel-title">Налаштування cookie</p>
          <p className="ck__panel-sub">Необхідні працюють завжди, статистику можна вимкнути.</p>

          <div className="ck-row">
            <div className="ck-row__txt">
              <b>Необхідні</b>
              <span>
                Запамʼятовують ваш вибір у цьому віконці, щоб не питати щоразу. Без них сайт не може
                виконати саме ваше рішення.
              </span>
            </div>
            <div className="ck-row__ctl">
              <span
                className="ck-toggle on locked"
                role="switch"
                aria-checked="true"
                aria-disabled="true"
                aria-label="Необхідні — не вимикаються"
              >
                <span className="ck-toggle__knob">
                  <i className="fa-solid fa-lock"></i>
                </span>
              </span>
              <span className="ck-row__state">Не вимикаються</span>
            </div>
          </div>

          <div className="ck-row">
            <div className="ck-row__txt">
              <b>Статистика й карта · Google</b>
              <span>
                Google Analytics рахує, скільки людей заходить на сайт, звідки і які розділи читають, а карта
                Google показується одразу. Імʼя, контакти й текст заявки туди не потрапляють.
              </span>
            </div>
            <div className="ck-row__ctl">
              <button
                type="button"
                className={`ck-toggle${analyticsAllowed ? " on" : ""}`}
                role="switch"
                aria-checked={analyticsAllowed}
                aria-label="Статистика відвідувань"
                onClick={() => setAnalyticsAllowed((v) => !v)}
              >
                <span className="ck-toggle__knob"></span>
              </button>
              <span className="ck-row__state">{analyticsAllowed ? "Увімкнено" : "Вимкнено"}</span>
            </div>
          </div>

          <div className="ck__btns ck__btns--panel">
            <button type="button" className="ck__btn" onClick={() => setSettings(false)}>
              Назад
            </button>
            <button
              type="button"
              className="ck__btn ck__btn--primary"
              onClick={() => choose(analyticsAllowed ? "all" : "essential")}
            >
              Зберегти вибір
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="ck__txt">
            <i className="fa-solid fa-cookie-bite"></i>
            <p>
              Ми використовуємо cookie Google Analytics, щоб бачити, скільки людей заходить на сайт і
              що їм цікаво, і показуємо карту Google. Вмикаємо їх лише з вашої згоди. <a href="/cookies">Про файли cookie</a>
            </p>
          </div>
          <div className="ck__btns">
            <button type="button" className="ck__btn ck__btn--primary" onClick={() => choose("all")}>
              Прийняти
            </button>
            <button type="button" className="ck__btn" onClick={() => choose("essential")}>
              Відхилити
            </button>
            <button type="button" className="ck__btn" onClick={() => setSettings(true)}>
              Налаштувати
            </button>
          </div>
        </>
      )}
    </div>
  );
}
