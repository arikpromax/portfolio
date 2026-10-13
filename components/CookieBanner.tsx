"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent, REOPEN_EVENT } from "@/lib/consent";

/**
 * Картка по центру екрана з питанням про cookie. Фон не затемнює й нічого не
 * блокує — сайт можна читати й гортати, поки вона висить.
 * «Налаштування» розкривають панель із реальним перемикачем на Google Analytics.
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
          <p className="ck__panel-title">Налаштування файлів cookie</p>

          <div className="ck-row">
            <div className="ck-row__txt">
              <b>Необхідні</b>
              <span>
                Запамʼятовують ваш вибір у цьому віконці, щоб не питати щоразу. Без них сайт не може
                виконати саме ваше рішення.
              </span>
            </div>
            <span className="ck-row__fixed">Завжди увімкнені</span>
          </div>

          <div className="ck-row">
            <div className="ck-row__txt">
              <b>Статистика відвідувань</b>
              <span>
                Google Analytics рахує, скільки людей заходить на сайт, звідки і які розділи читають.
                Імʼя, контакти й текст заявки туди не потрапляють.
              </span>
            </div>
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
          </div>

          <div className="ck__btns ck__btns--panel">
            <button type="button" className="ck__btn" onClick={() => setSettings(false)}>
              Назад
            </button>
            <button
              type="button"
              className="ck__btn"
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
              Google Analytics показує мені, скільки людей заходить на сайт і що їм цікаво. Він
              ставить cookie, тому вмикається лише з вашої згоди.{" "}
              <a href="/cookies">Про файли cookie</a>
            </p>
          </div>
          <div className="ck__btns">
            <button type="button" className="ck-link ck-link--inline" onClick={() => setSettings(true)}>
              Налаштування
            </button>
            <button type="button" className="ck__btn" onClick={() => choose("essential")}>
              Тільки необхідні
            </button>
            <button type="button" className="ck__btn ck__btn--primary" onClick={() => choose("all")}>
              Прийняти
            </button>
          </div>
        </>
      )}
    </div>
  );
}
