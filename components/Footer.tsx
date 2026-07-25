"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getRef } from "@/lib/referral";

export default function Footer() {
  // На головній — просто прокрутка вгору, з інших сторінок — перехід на головну
  const top = usePathname() === "/" ? "#top" : "/#top";

  // Клієнту від партнера партнерську програму не показуємо — так само, як у меню
  const [showPartners, setShowPartners] = useState(false);
  useEffect(() => {
    setShowPartners(!getRef());
  }, []);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <a href={top} className="logo">
            <span className="logo__mark">a</span>arawebsite
          </a>
          <div className="footer__contacts">
            <a href="https://t.me/arikpromax">
              <i className="fa-brands fa-telegram"></i>@arikpromax
            </a>
            <a href="tel:+380957643416">
              <i className="fa-solid fa-phone"></i>+380 95 764 34 16
            </a>
            <a href="mailto:arikpro92@gmail.com">
              <i className="fa-solid fa-envelope"></i>arikpro92@gmail.com
            </a>
          </div>
        </div>
        <div className="footer__copy">
          © 2026 Веб-студія «arawebsite». Сайти, які приносять заявки.
          {/* Стримане посилання для тих, хто шукає партнерство — клієнта воно не відволікає */}
          {showPartners && (
            <a className="footer__partners" href="/partners">
              Партнерська програма
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
