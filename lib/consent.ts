// Вибір відвідувача щодо cookie.
// "all"       — погодився, мітка рекомендації працює
// "essential" — тільки необхідне, мітку видаляємо й більше не ставимо
// ""          — ще не обирав, показуємо банер

export type Consent = "all" | "essential" | "";

const CONSENT_COOKIE = "aw_consent";
export const REOPEN_EVENT = "aw:cookie-settings"; // підвал просить показати банер знову
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

/** Запам'ятовує вибір на рік. Якщо відмова — стираємо мітку рекомендації. */
export function setConsent(choice: Exclude<Consent, "">): void {
  if (typeof document === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${choice}; Max-Age=${YEAR}; Path=/; SameSite=Lax${secure}`;

  if (choice === "essential") {
    document.cookie = `aw_ref=; Max-Age=0; Path=/; SameSite=Lax${secure}`;
    try {
      localStorage.removeItem("aw_ref");
    } catch {
      // приватний режим — там її й так немає
    }
  }
}

/** Відкрити банер знову — викликається з посилання «Файли cookie» в підвалі */
export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(REOPEN_EVENT));
}
