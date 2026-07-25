"use client";

import { useState } from "react";
import PartnerForm from "@/components/PartnerForm";

const RATE = 0.4; // 40% від вартості сайту — винагорода партнера
const PRESETS = [600, 900, 1500, 2500];

const steps = [
  {
    num: "01",
    icon: "fa-solid fa-comment-dots",
    title: "Розповідаєте про мене",
    text: "Знайомому, клієнту, сусідньому бізнесу — будь-кому, кому потрібен сайт.",
  },
  {
    num: "02",
    icon: "fa-solid fa-laptop-code",
    title: "Я роблю сайт",
    text: "Спілкуюся, рахую, розробляю й запускаю. Від вас більше нічого не потрібно.",
  },
  {
    num: "03",
    icon: "fa-solid fa-sack-dollar",
    title: "Ви отримуєте 40%",
    text: "Клієнт оплатив — протягом 3 днів переказую вашу частину. Без нагадувань.",
  },
];

const who = [
  {
    icon: "fa-solid fa-pen-nib",
    title: "Дизайнерам і маркетологам",
    text: "У вас питають про сайт, а ви його не робите — передайте мені й заробіть.",
  },
  {
    icon: "fa-solid fa-screwdriver-wrench",
    title: "Майстрам і підрядникам",
    text: "Ви щодня спілкуєтесь із власниками бізнесу — у половини з них немає сайту.",
  },
  {
    icon: "fa-solid fa-store",
    title: "Власникам бізнесу",
    text: "Порекомендуйте партнерам і сусідам по ТЦ — ваше коло вже вам довіряє.",
  },
  {
    icon: "fa-solid fa-users",
    title: "Активним людям",
    text: "SMM, спільноти, чати підприємців. Один пост — і клієнт може бути ваш.",
  },
];

const terms = [
  {
    icon: "fa-solid fa-percent",
    text: "40% від суми проєкту — з сайту за $600 це $240 вам.",
  },
  {
    icon: "fa-solid fa-infinity",
    text: "Кількість клієнтів не обмежена — приводьте хоч десятьох на місяць.",
  },
  {
    icon: "fa-solid fa-user-lock",
    text: "Клієнт закріплюється за вами на 90 днів — навіть якщо звернеться пізніше.",
  },
  {
    icon: "fa-solid fa-file-invoice-dollar",
    text: "Виплата протягом 3 днів після повної оплати клієнтом. Спосіб обираєте ви.",
  },
];

// Формат $2,500 — розділювач тисяч фіксований, щоб сервер і браузер малювали однаково
const money = (n: number) => "$" + n.toLocaleString("en-US");

export default function Partner() {
  const [price, setPrice] = useState(900);
  const reward = Math.round(price * RATE);

  return (
    <section className="section pn" id="partners">
      <div className="wrap">
        <div className="section__head reveal">
          <span className="eyebrow">Партнерська програма</span>
          <h2>Приведіть клієнта — заберіть 40% вартості сайту</h2>
          <p>
            Знаєте когось, кому потрібен сайт? Просто познайомте нас. Решту я беру на себе, а коли
            клієнт оплатить роботу — 40% суми ваші.
          </p>
        </div>

        <div className="pn-hero cursor-glow reveal">
          <div className="pn-hero__grid">
            <div className="pn-calc">
              <span className="pn-calc__label">Ваша винагорода</span>
              <div className="pn-calc__money">{money(reward)}</div>
              <p className="pn-calc__note">
                з одного клієнта із сайтом за <b>{money(price)}</b>
              </p>

              <input
                type="range"
                className="pn-range"
                min={600}
                max={3000}
                step={100}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                aria-label="Вартість сайту клієнта"
              />
              <div className="pn-range__ends">
                <span>{money(600)}</span>
                <span>{money(3000)}</span>
              </div>

              <div className="pn-chips">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`pn-chip${p === price ? " on" : ""}`}
                    onClick={() => setPrice(p)}
                  >
                    {money(p)}
                  </button>
                ))}
              </div>

              <a href="#partner-form" className="btn btn--light btn--lg">
                <i className="fa-solid fa-handshake"></i>Хочу стати партнером
              </a>
            </div>

            <div className="pn-how">
              <p className="factors-title">Як це працює</p>
              {steps.map((s) => (
                <div key={s.num} className="pn-step">
                  <div className="pn-step__ico">
                    <i className={s.icon}></i>
                  </div>
                  <div className="pn-step__txt">
                    <b>
                      <span className="pn-step__num">{s.num}</span>
                      {s.title}
                    </b>
                    <span>{s.text}</span>
                  </div>
                </div>
              ))}
              <div className="pn-how__note">
                <i className="fa-solid fa-circle-info"></i>
                Жодних внесків, курсів і зобов&apos;язань. Не привели клієнта — просто нічого не
                сталося.
              </div>
            </div>
          </div>
        </div>

        <div className="pn-who">
          {who.map((w) => (
            <div key={w.title} className="pn-card reveal">
              <div className="pn-card__ico">
                <i className={w.icon}></i>
              </div>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>

        <div className="pn-terms reveal">
          <p className="pn-terms__title">Умови — коротко й чесно</p>
          <div className="pn-terms__grid">
            {terms.map((t) => (
              <div key={t.text} className="pn-term">
                <i className={t.icon}></i>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        <PartnerForm />
      </div>
    </section>
  );
}
