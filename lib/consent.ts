// Вибір відвідувача щодо cookie.
// "all"       — погодився, працює Google Analytics
// "essential" — тільки необхідне, аналітика не завантажується, її cookie стираємо
// ""          — ще не обирав, показуємо банер

export type Consent = "all" | "essential" | "";

export const GA_ID = "G-BS7N5LW9RQ";

const CONSENT_COOKIE = "aw_consent";
export const REOPEN_EVENT = "aw:cookie-settings"; // підвал просить показати банер знову
export const CHANGE_EVENT = "aw:consent-change"; // вибір змінився — аналітика вмикається чи вимикається
const YEAR = 365 * 24 * 60 * 60;

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const hit = document.cookie.split("; ").find((p) => p.startsWith(`${name}=`));
  return hit ? decodeURIComponent(hit.slice(name.length + 1)) : "";
}

export function getConsent(): Consent {
  const value = readCookie(CONSENT_COOKIE);
  return value === "all" || value === "essential" ? value : "";
}

/** Стирає _ga і _ga_<id>. Google ставить їх на найвищий домен (.arawebsite.com), тож пробуємо всі рівні */
function clearAnalyticsCookies(): void {
  const names = document.cookie
    .split("; ")
    .map((p) => p.split("=")[0])
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; Domain=.${parts.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
  }
}

/** Запам'ятовує вибір на рік. Якщо відмова — вимикаємо Google Analytics і стираємо його cookie. */
export function setConsent(choice: Exclude<Consent, "">): void {
  if (typeof document === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${YEAR}; Path=/; SameSite=Lax${secure}`;

  // Офіційний вимикач gtag: якщо скрипт уже завантажено, він перестає надсилати дані й ставити cookie
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = choice !== "all";
  if (choice === "essential") clearAnalyticsCookies();

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Відкрити банер знову — викликається з посилання «Налаштування cookie» в підвалі */
export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(REOPEN_EVENT));
}
