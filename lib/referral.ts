// Реферальні мітки партнерів.
// Партнер дає клієнту посилання виду https://сайт/?ref=oleg-k7d.
// Сайт запам'ятовує мітку на 90 днів — стільки ж, скільки клієнт
// закріплений за партнером за умовами програми.

const KEY = "aw_ref"; // ключ у localStorage
const COOKIE = "aw_ref"; // cookie, яку ставить сервер (proxy.ts)
const TTL = 90 * 24 * 60 * 60 * 1000; // 90 днів у мілісекундах

// Код може містити лише латиницю, цифри й дефіс — усе інше ігноруємо
const VALID = /^[a-z0-9-]{2,32}$/;

// Українська → латиниця, щоб з імені «Олег» вийшло «oleh»
const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ie", ж: "zh",
  з: "z", и: "y", і: "i", ї: "i", й: "i", к: "k", л: "l", м: "m", н: "n",
  о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ь: "", ю: "iu", я: "ia", ъ: "", ы: "y", э: "e", ё: "e",
};

/** «Олег Петренко» → «oleh-petrenko» */
export function slugify(name: string): string {
  const latin = name
    .toLowerCase()
    .split("")
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join("");
  const slug = latin
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 20)
    .replace(/-+$/, "");
  return slug || "partner";
}

/** Персональний код партнера: ім'я + короткий хвіст, щоб коди не збігались */
export function makeRefCode(name: string): string {
  const tail = Math.random().toString(36).slice(2, 5);
  return `${slugify(name)}-${tail}`;
}

/** Повне посилання, яке партнер дає клієнтам */
export function refLink(code: string, origin?: string): string {
  const base =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/?ref=${code}`;
}

/** Мітка з cookie, яку поставив сервер */
function fromCookie(): string {
  if (typeof document === "undefined") return "";
  const hit = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${COOKIE}=`));
  if (!hit) return "";
  const code = decodeURIComponent(hit.slice(COOKIE.length + 1)).toLowerCase();
  return VALID.test(code) ? code : "";
}

/** Мітка з localStorage, якщо ще не протермінована */
function fromStorage(): string {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return "";
    const { code, ts } = JSON.parse(raw) as { code?: string; ts?: number };
    if (!code || !ts || Date.now() - ts > TTL) {
      localStorage.removeItem(KEY);
      return "";
    }
    return VALID.test(code) ? code : "";
  } catch {
    return "";
  }
}

function remember(code: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ code, ts: Date.now() }));
  } catch {
    // приватний режим браузера — залишиться лише cookie
  }
}

/**
 * Тримає мітку у двох незалежних місцях: cookie (її ставить сервер) і
 * localStorage. Якщо якесь одне сховище браузер почистить — мітка виживе
 * у другому. Викликається на кожному завантаженні сторінки.
 */
export function captureRef(): void {
  if (typeof window === "undefined") return;

  // Зазвичай ref уже прибрано з адреси сервером, але якщо ні — беремо звідти
  const fromUrl = new URLSearchParams(window.location.search).get("ref");
  const code = (fromUrl ?? "").toLowerCase().trim();
  if (VALID.test(code)) {
    remember(code);
    return;
  }

  // Сервер поклав мітку в cookie — дублюємо її в localStorage
  const cookie = fromCookie();
  if (cookie && cookie !== fromStorage()) remember(cookie);
}

/** Мітка партнера, якщо вона ще жива. Порожній рядок — заявка «своя». */
export function getRef(): string {
  if (typeof window === "undefined") return "";
  return fromCookie() || fromStorage();
}
