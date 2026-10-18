"use client";

import { usePathname } from "next/navigation";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { useContent } from "@/components/ContentProvider";

export default function Footer() {
  // На головній — просто прокрутка вгору, з інших сторінок — перехід на головну
  const top = usePathname() === "/" ? "#top" : "/#top";
  const { t, contacts: c } = useContent();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <a href={top} className="logo">
            <span className="logo__mark">a</span>arawebsite
          </a>
          <div className="footer__contacts">
            {c.tgUser && (
              <a href={c.tgUrl}>
                <i className="fa-brands fa-telegram"></i>@{c.tgUser}
              </a>
            )}
            {c.phone && (
              <a href={c.phoneHref}>
                <i className="fa-solid fa-phone"></i>
                {c.phone}
              </a>
            )}
            {c.email && (
              <a href={`mailto:${c.email}`}>
                <i className="fa-solid fa-envelope"></i>
                {c.email}
              </a>
            )}
          </div>
        </div>
        <div className="footer__copy">
          {t("footer_copy")}
          {/* Стриманий рядок службових посилань */}
          <span className="footer__links">
            <a href="/privacy">Політика конфіденційності</a>
            <a href="/cookies">Файли cookie</a>
            <CookieSettingsLink label="Налаштування cookie" />
          </span>
        </div>
      </div>
    </footer>
  );
}
