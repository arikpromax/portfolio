"use client";

import { useRef, useState } from "react";

/*
  Форма шле заявки в Google Таблицю через Google Apps Script (як в оригіналі):
  1) Google Sheet → Розширення → Apps Script
  2) doPost, що пише дані в таблицю, опубліковано як Web App (доступ: будь-хто)
  3) URL веб-додатку:
*/
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyMbYPkJPcLCbwMcBySpvJiCRpnzNrl9MFwdAQ1LPaQNwy2lDSJIZ2AIY8Xm_uKTlVmqw/exec";

const methods = [
  { name: "Телефон", icon: "fa-solid fa-phone", type: "tel", ph: "+380 XX XXX XX XX" },
  { name: "Telegram", icon: "fa-brands fa-telegram", type: "text", ph: "@username" },
  { name: "Instagram", icon: "fa-brands fa-instagram", type: "text", ph: "@username" },
  { name: "Email", icon: "fa-solid fa-envelope", type: "email", ph: "you@example.com" },
  { name: "Viber", icon: "fa-brands fa-viber", type: "tel", ph: "+380 XX XXX XX XX" },
] as const;

type MethodName = (typeof methods)[number]["name"];
type Status = { kind: "ok" | "err"; icon: string; text: string } | null;

export default function Contact() {
  const [method, setMethod] = useState<MethodName>("Телефон");
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  const active = methods.find((m) => m.name === method)!;

  const pickMethod = (name: MethodName) => {
    setMethod(name);
    setContact("");
    contactRef.current?.focus();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || sending) return;

    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const business = String(fd.get("business") || "");
    const message = String(fd.get("message") || "").trim();
    const contactVal = contact.trim();

    // Валідація залежно від обраного способу зв'язку
    let valErr = "";
    if (!name) {
      valErr = "Будь ласка, вкажіть ім'я.";
    } else if (method === "Email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal))
        valErr = "Вкажіть коректний email — наприклад, you@example.com";
    } else if (method === "Телефон" || method === "Viber") {
      if ((contactVal.match(/\d/g) || []).length < 9)
        valErr = "Вкажіть коректний номер телефону з кодом — наприклад, +380 67 123 45 67";
    } else {
      // Telegram / Instagram
      if (contactVal.replace(/^@/, "").length < 2)
        valErr = "Вкажіть ваш нікнейм — наприклад, @username";
    }
    if (valErr) {
      setStatus({ kind: "err", icon: "fa-solid fa-triangle-exclamation", text: valErr });
      contactRef.current?.focus();
      return;
    }

    const data = {
      name,
      method,
      contact: contactVal,
      business,
      message,
      date: new Date().toLocaleString("uk-UA"),
    };

    setStatus(null);
    setSending(true);
    try {
      if (!WEB_APP_URL || WEB_APP_URL.startsWith("ВСТАВТЕ")) {
        // Демо-режим, поки не підключено таблицю
        await new Promise((r) => setTimeout(r, 700));
      } else {
        await fetch(WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(data),
        });
      }
      setStatus({
        kind: "ok",
        icon: "fa-solid fa-circle-check",
        text: "Дякую! Заявку отримано — я зв'яжуся з вами найближчим часом.",
      });
      form.reset();
      setContact("");
    } catch {
      setStatus({
        kind: "err",
        icon: "fa-solid fa-triangle-exclamation",
        text: "Не вдалося надіслати. Напишіть мені в Телеграм @arikpromax — і ми все вирішимо.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="final cursor-glow" id="contact">
      <div className="wrap final__grid">
        <div className="reveal">
          <span className="eyebrow">Залишилось питання?</span>
          <h2>Розкажіть про бізнес — порахую вартість сайту</h2>
          <p className="lead">
            Залиште заявку, і я зв'яжуся з вами, щоб уточнити деталі та назвати точну ціну. Без
            зобов'язань.
          </p>
          <div className="final__list">
            <div>
              <i className="fa-solid fa-circle-check"></i>Відповідаю протягом дня
            </div>
            <div>
              <i className="fa-solid fa-circle-check"></i>Порахую вартість саме під вашу нішу
            </div>
            <div>
              <i className="fa-solid fa-circle-check"></i>Підкажу, що варто, а що — зайве
            </div>
          </div>
        </div>

        <div className="form-card reveal">
          <h3>Отримати розрахунок</h3>
          <p className="sub">Заповніть форму — і я напишу вам першим.</p>
          <form ref={formRef} onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Ваше ім&apos;я</label>
              <input type="text" id="name" name="name" placeholder="Як до вас звертатися" required />
            </div>
            <div className="field">
              <label>Як з вами зв&apos;язатися?</label>
              <div className="method-grid">
                {methods.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    className={`method-btn${m.name === method ? " active" : ""}`}
                    onClick={() => pickMethod(m.name)}
                  >
                    <i className={m.icon}></i>
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label htmlFor="contactField">Контакт</label>
              <input
                type="text"
                inputMode={active.type as "tel" | "text" | "email"}
                id="contactField"
                name="contact"
                placeholder={active.ph}
                required
                ref={contactRef}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="business">Тип бізнесу</label>
              <select id="business" name="business" required defaultValue="">
                <option value="" disabled>
                  Оберіть напрямок
                </option>
                <option>Стоматологія / медицина</option>
                <option>Будівництво / ремонт</option>
                <option>Краса / послуги</option>
                <option>Торгівля / магазин</option>
                <option>Інше</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">
                Повідомлення <span className="opt">(необов&apos;язково)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Коротко про ваш проєкт або питання…"
              ></textarea>
            </div>
            <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
              {sending ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Надсилаю…
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i>Надіслати заявку
                </>
              )}
            </button>
            {status && (
              <div className={`form-status ${status.kind}`}>
                <i className={status.icon}></i> {status.text}
              </div>
            )}
            <p className="form-note">
              <i className="fa-solid fa-lock"></i> Дані використовую лише для зв&apos;язку з вами
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
