import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Ловить реферальну мітку ?ref=код на сервері — ще до того, як сторінка
 * почне малюватись у браузері. Так надійніше, ніж чекати JavaScript:
 * мітка встановиться навіть якщо скрипти повільні або заблоковані.
 *
 * Далі мітка живе в cookie 90 днів і сама їде з кожним запитом.
 * Адресу після цього чистимо — клієнт не бачить у ній нічого дивного
 * і не рознесе чуже посилання далі.
 */

const COOKIE = "aw_ref";
const DAYS_90 = 90 * 24 * 60 * 60;
const VALID = /^[a-z0-9-]{2,32}$/;

// Службові слова: посилання /?ref=clear стирає мітку.
// Потрібно, щоб перевірити чуже реф-посилання й не лишитись поміченим на 90 днів.
const RESET = ["clear", "none", "off", "reset", "0"];

export function proxy(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("ref");
  if (!raw) return NextResponse.next();

  // Із месенджерів посилання нерідко приїжджає з зайвим хвостом:
  // «?ref=oleh-k7d.» або «?ref=oleh-k7d)» — обрізаємо все, що не код
  const code = raw
    .toLowerCase()
    .trim()
    .replace(/^[^a-z0-9]+/, "")
    .replace(/[^a-z0-9]+$/, "");

  // Прибираємо ref з адреси й перекидаємо на чисте посилання
  const url = request.nextUrl.clone();
  url.searchParams.delete("ref");

  // Скидання мітки. Cookie стираємо тут, а щоб зникла й копія в localStorage —
  // лишаємо в адресі позначку, яку підхватить сторінка
  if (RESET.includes(code)) {
    url.searchParams.set("refcleared", "1");
    const reset = NextResponse.redirect(url);
    reset.cookies.set({ name: COOKIE, value: "", maxAge: 0, path: "/" });
    return reset;
  }

  const response = NextResponse.redirect(url);

  if (VALID.test(code)) {
    response.cookies.set({
      name: COOKIE,
      value: code,
      maxAge: DAYS_90,
      path: "/",
      sameSite: "lax",
      // читати мітку має і браузер — форма підставляє її в заявку
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  // Тільки сторінки: без статики, картинок і адмінки
  matcher: ["/((?!_next/|api/|admin|.*\\.).*)"],
};
