// Кейси портфоліо. Раніше вони лежали в Supabase, тепер — просто тут:
// база портфоліо вимкнена, адмінка прибрана, кейси редагуються в цьому файлі.

// Тип одного кейса
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
  image_url: string; // адреса скриншоту сайту ("" — стилізований макет)
  status?: string; // "" — сайт запущено, "dev" — ще в розробці (показуємо значок)
  sort_order: number;
};


// Кейси, які показує сайт
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
    image_url: "",
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
    image_url: "",
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
    image_url: "",
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
    image_url: "",
    sort_order: 4,
  },
];

