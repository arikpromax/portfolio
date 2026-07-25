"use client";

import { useRef, useState } from "react";
import { getSupabase, type PartnerLead } from "@/lib/supabase";

const methods = [
  { name: "Telegram", icon: "fa-brands fa-telegram", ph: "@username" },
  { name: "Телефон", icon: "fa-solid fa-phone", ph: "+380 XX XXX XX XX" },
  { name: "Instagram", icon: "fa-brands fa-instagram", ph: "@username" },
  { name: "Email", icon: "fa-solid fa-envelope", ph: "you@example.com" },
  { name: "Viber", icon: "fa-brands fa-viber", ph: "+380 XX XXX XX XX" },
] as const;

type MethodName = (typeof methods)[number]["name"];
type Status = { kind: "ok" | "err"; icon: string; text: string } | null;

const whoOptions = [
  "Дизайнер / маркетолог",
  "Майстер, підрядник, сервіс",
  "Власник бізнесу",
  "SMM, блогер, спільнота",
  "Просто маю широке коло знайомих",
  "Інше",
];

const payoutOptions = [
  "Картка українського банку",
  "Крипта (USDT)",
  "PayPal / Wise",
  "Готівка (Київ)",
  "Обговоримо особисто",
];

const whenOptions = ["Потрібен уже зараз", "Протягом місяця", "Найближчі 2–3 місяці", "Поки лише цікавиться"];

export default function PartnerForm() {
  const [method, setMethod] = useState<MethodName>("Telegram");
  const [contact, setContact] = useState("");
  const [hasClient, setHasClient] = useState(false);
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
    const name = String(fd.get("p-name") || "").trim();
    const contactVal = contact.trim();

    // Перевіряємо контакт за обраним способом зв'язку
    let valErr = "";
    if (!name) {
      valErr = "Будь ласка, вкажіть ім'я.";
    } else if (method === "Email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal))
        valErr = "Вкажіть коректний email — наприклад, you@example.com";
    } else if (method === "Телефон" || method === "Viber") {
      if ((contactVal.match(/\d/g) || []).length < 9)
        valErr = "Вкажіть коректний номер з кодом — наприклад, +380 67 123 45 67";
    } else if (contactVal.replace(/^@/, "").length < 2) {
      valErr = "Вкажіть ваш нікнейм — наприклад, @username";
    }
    if (valErr) {
      setStatus({ kind: "err", icon: "fa-solid fa-triangle-exclamation", text: valErr });
      contactRef.current?.focus();
      return;
    }

    const lead: PartnerLead = {
      name,
      method,
      contact: contactVal,
      who: String(fd.get("p-who") || ""),
      payout: String(fd.get("p-payout") || ""),
      has_client: hasClient,
      client_niche: hasClient ? String(fd.get("p-niche") || "").trim() : "",
      client_city: hasClient ? String(fd.get("p-city") || "").trim() : "",
      client_contact: hasClient ? String(fd.get("p-cl-contact") || "").trim() : "",
      client_when: hasClient ? String(fd.get("p-when") || "") : "",
      message: String(fd.get("p-message") || "").trim(),
    };

    setStatus(null);
    setSending(true);
    const supabase = getSupabase();
    if (!supabase) {
      // База не підключена — не вдаємо, що анкету збережено
      setStatus({
        kind: "err",
        icon: "fa-solid fa-triangle-exclamation",
        text: "Форма тимчасово недоступна. Напишіть мені в Телеграм @arikpromax — оформимо партнерство там.",
      });
      setSending(false);
      return;
    }

    const { error } = await supabase.from("partner_leads").insert(lead);
    if (error) {
      setStatus({
        kind: "err",
        icon: "fa-solid fa-triangle-exclamation",
        text: "Не вдалося надіслати. Напишіть мені в Телеграм @arikpromax — і ми все вирішимо.",
      });
    } else {
      setStatus({
        kind: "ok",
        icon: "fa-solid fa-circle-check",
        text: "Анкету отримано! Напишу вам протягом дня — розповім умови й дам матеріали для клієнтів.",
      });
      form.reset();
      setContact("");
      setHasClient(false);
    }
    setSending(false);
  };

  return (
    <div className="pn-form reveal" id="partner-form">
      <div className="pn-form__head">
        <span className="pn-form__badge">
          <i className="fa-solid fa-file-signature"></i>Анкета партнера
        </span>
        <h3>Заповніть анкету — і ви в програмі</h3>
        <p>
          Хвилина часу. Після відповіді я дам вам матеріали для клієнтів: приклади робіт, ціни й
          коротке пояснення, як подати пропозицію.
        </p>
      </div>

      <form ref={formRef} onSubmit={onSubmit} noValidate>
        <div className="pn-grid2">
          <div className="field">
            <label htmlFor="p-name">Ваше ім&apos;я</label>
            <input type="text" id="p-name" name="p-name" placeholder="Як до вас звертатися" required />
          </div>
          <div className="field">
            <label htmlFor="p-who">Чим займаєтесь</label>
            <select id="p-who" name="p-who" defaultValue={whoOptions[0]}>
              {whoOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
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

        <div className="pn-grid2">
          <div className="field">
            <label htmlFor="p-contact">Контакт</label>
            <input
              type="text"
              id="p-contact"
              name="p-contact"
              placeholder={active.ph}
              required
              ref={contactRef}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="p-payout">Як зручно отримувати винагороду</label>
            <select id="p-payout" name="p-payout" defaultValue={payoutOptions[0]}>
              {payoutOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Перемикач: якщо клієнт уже є — питаємо про нього */}
        <button
          type="button"
          className={`pn-switch${hasClient ? " on" : ""}`}
          aria-pressed={hasClient}
          onClick={() => setHasClient((v) => !v)}
        >
          <span className="pn-switch__track">
            <span className="pn-switch__knob"></span>
          </span>
          <span className="pn-switch__txt">
            <b>У мене вже є клієнт на прикметі</b>
            <span>Увімкніть — і розкажіть про нього кількома словами</span>
          </span>
        </button>

        {hasClient && (
          <div className="pn-client">
            <div className="pn-grid2">
              <div className="field">
                <label htmlFor="p-niche">Ніша клієнта</label>
                <input
                  type="text"
                  id="p-niche"
                  name="p-niche"
                  placeholder="Наприклад: стоматологія, автосервіс, кав&#39;ярня"
                />
              </div>
              <div className="field">
                <label htmlFor="p-city">Місто</label>
                <input type="text" id="p-city" name="p-city" placeholder="Київ" />
              </div>
            </div>
            <div className="pn-grid2">
              <div className="field">
                <label htmlFor="p-when">Коли йому потрібен сайт</label>
                <select id="p-when" name="p-when" defaultValue={whenOptions[0]}>
                  {whenOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="p-cl-contact">
                  Контакт клієнта <span className="opt">(якщо він уже погодився)</span>
                </label>
                <input
                  type="text"
                  id="p-cl-contact"
                  name="p-cl-contact"
                  placeholder="Телефон, Telegram або Instagram"
                />
              </div>
            </div>
            <p className="pn-client__note">
              <i className="fa-solid fa-shield-halved"></i> Клієнта закріплюю за вами одразу, щойно
              отримаю анкету — навіть якщо він звернеться до мене через місяць.
            </p>
          </div>
        )}

        <div className="field">
          <label htmlFor="p-message">
            Питання чи коментар <span className="opt">(необов&apos;язково)</span>
          </label>
          <textarea
            id="p-message"
            name="p-message"
            rows={3}
            placeholder="Наприклад: скільки клієнтів реально приводити на місяць?"
          ></textarea>
        </div>

        <button type="submit" className="btn btn--primary btn--lg" disabled={sending}>
          {sending ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i> Надсилаю…
            </>
          ) : (
            <>
              <i className="fa-solid fa-handshake"></i>Стати партнером
            </>
          )}
        </button>

        {status && (
          <div className={`form-status ${status.kind}`}>
            <i className={status.icon}></i> {status.text}
          </div>
        )}
        <p className="form-note">
          <i className="fa-solid fa-lock"></i> Анкета ні до чого не зобов&apos;язує — жодних внесків
          і жодних зобов&apos;язань з вашого боку
        </p>
      </form>
    </div>
  );
}
