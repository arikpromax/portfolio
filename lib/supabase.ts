import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Тип одного кейса — 1-в-1 відповідає таблиці `cases` у Supabase
export type CaseItem = {
  id?: number;
  url_label: string; // адреса у віконці-макеті браузера, напр. "dentacare.ua"
  accent: string; // основний колір макета
  accent2: string; // темніший відтінок макета
  meta: string; // ніша · місто, напр. "Стоматологія · Київ"
  title: string;
  description: string; // звичайний текст опису
  result: string; // фраза-результат, виводиться жирним у кінці
  link: string; // реальне посилання на сайт ("" — якщо ще немає)
  sort_order: number;
};

// Демо-кейси: показуються, поки база порожня або Supabase не підключений
export const demoCases: CaseItem[] = [
  {
    url_label: "dentacare.ua",
    accent: "#0FA39B",
    accent2: "#0F3D52",
    meta: "Стоматологія · Київ",
    title: "DentaCare",
    description: "Сайт клініки: онлайн-запис, лікарі, обладнання, відгуки.",
    result: "+40% записів за перший місяць.",
    link: "",
    sort_order: 1,
  },
  {
    url_label: "nailstudio.ua",
    accent: "#E26AA6",
    accent2: "#7A1F58",
    meta: "Б'юті-студія · Львів",
    title: "Nail&Studio",
    description: "Запис онлайн 24/7, портфоліо робіт, прайс і майстри.",
    result: "Запис без дзвінків.",
    link: "",
    sort_order: 2,
  },
  {
    url_label: "budmayster.ua",
    accent: "#E8943A",
    accent2: "#7A4A12",
    meta: "Будівництво · Дніпро",
    title: "БудМайстер",
    description: "Каталог об'єктів, етапи робіт, матеріали й форма прорахунку.",
    result: "Заявки на кошторис.",
    link: "",
    sort_order: 3,
  },
  {
    url_label: "coffeepoint.ua",
    accent: "#9B6A43",
    accent2: "#3E2A1B",
    meta: "Кав'ярня · Одеса",
    title: "CoffeePoint",
    description: "Меню, бронювання столиків і карта на сайті.",
    result: "Гості бачать усе одразу.",
    link: "",
    sort_order: 4,
  },
];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && key);

let client: SupabaseClient | null = null;

// Повертає клієнт Supabase або null, якщо ключі ще не налаштовані
export function getSupabase(): SupabaseClient | null {
  if (!url || !key) return null;
  if (!client) client = createClient(url, key);
  return client;
}
