/*
  Вміст сайту: тексти й картки. За замовчуванням — lib/content.json (те, що на сайті зараз).
  Коли SITE має номер сайту в адмінці платформи arawebsite, поверх нього лягає те,
  що власник написав в адмінці (Supabase, лише читання публічним ключем).
  Дані кешуються на 60 секунд — правка з адмінки зʼявляється на сайті протягом хвилини.
  Адмінку описує tools/gen-admin.mjs → platform/db/migration-arawebsite.sql.
*/
import defaults from "./content.json";

// Номер сайту в адмінці (рядок sites.id). 0 — адмінку ще не підключено, сайт живе на content.json.
export const SITE = 110;

const DB = "https://ortiatyxntdikaldepbp.supabase.co/rest/v1";
const KEY = "sb_publishable_UW1Z8ukEU1XWVCdQxIGkDw_firK4hpO"; // публічний ключ, лише читання

export type Item = {
  title: string;
  text: string;
  image_url: string;
  extra: Record<string, unknown>;
};
export type Content = {
  texts: Record<string, string>;
  lists: Record<string, Item[]>;
};

type Row = Item & { collection: string };

const fallback = defaults as unknown as Content;

async function get<T>(path: string): Promise<T> {
  const r = await fetch(DB + path, {
    headers: { apikey: KEY },
    next: { revalidate: 60, tags: ["content"] },
  });
  if (!r.ok) throw new Error(`content ${r.status}`);
  return r.json() as Promise<T>;
}

export async function getContent(): Promise<Content> {
  if (!SITE) return fallback;
  try {
    const [texts, items] = await Promise.all([
      get<{ key: string; value: string }[]>(`/texts?site_id=eq.${SITE}&select=key,value`),
      get<Row[]>(
        `/items?site_id=eq.${SITE}&select=collection,title,text,image_url,extra&order=sort_order.asc,id.asc`
      ),
    ]);
    // Тексти: те, що є в адмінці, перекриває стандартне; нові ключі з коду лишаються стандартними
    const t = { ...fallback.texts };
    for (const row of texts) t[row.key] = row.value ?? "";
    // Картки: база — головна, навіть якщо власник видалив усі картки блоку
    const lists: Record<string, Item[]> = {};
    for (const key of Object.keys(fallback.lists)) lists[key] = [];
    for (const row of items) {
      (lists[row.collection] ??= []).push({
        title: row.title ?? "",
        text: row.text ?? "",
        image_url: row.image_url ?? "",
        extra: row.extra ?? {},
      });
    }
    return { texts: t, lists };
  } catch {
    // база недоступна — показуємо стандартний вміст, а не порожній сайт
    return fallback;
  }
}
