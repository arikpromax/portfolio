"use client";

import { useRef, useState } from "react";
import { useContent, lines } from "@/components/ContentProvider";

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
  const { t, contacts } = useContent();
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
        text: t("form_ok"),
      });
      form.reset();
      setContact("");
    } catch {
      setStatus({
        kind: "err",
        icon: "fa-solid fa-triangle-exclamation",
        text: `Не вдалося надіслати. Напишіть у Телеграм @${contacts.tgUser} — і ми все вирішимо.`,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap contact__grid">
        <div className="reveal">
          {t("contact_kicker") && <p className="kicker">{t("contact_kicker")}</p>}
          <h2>{t("contact_h")}</h2>
          {t("contact_lead") && <p className="lead">{t("contact_lead")}</p>}
          <div className="contact__list">
            {lines(t("contact_points")).map((p, i) => (
              <div key={i}>
                <i className="fa-solid fa-circle-check"></i>
                {p}
              </div>
            ))}
          </div>
        </div>

        <div className="form-card reveal">
          <h3>{t("form_h")}</h3>
          {t("form_sub") && <p className="sub">{t("form_sub")}</p>}
          <form ref={formRef} onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Ваше ім&apos;я</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Як до вас звертатися"
                maxLength={120}
                required
              />
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
                maxLength={200}
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
                {lines(t("form_business")).map((b) => (
                  <option key={b}>{b}</option>
                ))}
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
                maxLength={3000}
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
                  <i className="fa-solid fa-paper-plane"></i>
                  {t("form_btn")}
                </>
              )}
            </button>
            {status && (
              <div className={`form-status ${status.kind}`}>
                <i className={status.icon}></i> {status.text}
              </div>
            )}
            <p className="form-note">
              <i className="fa-solid fa-lock"></i> {t("form_note")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
