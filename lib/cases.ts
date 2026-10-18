// Кейси портфоліо — справжні сайти, які я зробив. Редагуються в цьому файлі.
// Скриншоти лежать у public/cases: <id>.jpg — комп'ютер 1280×800, <id>-m.jpg — телефон 520×1125.

// Тип одного кейса
export type CaseItem = {
  id?: number;
  url_label: string; // адреса у віконці-макеті браузера, напр. "fujisushi.com.ua"
  accent: string; // основний колір макета (коли немає скриншоту)
  accent2: string; // темніший відтінок макета
  meta: string; // ніша · місто, напр. "Доставка суші · Умань"
  title: string;
  description: string; // звичайний текст опису
  result: string; // фраза-результат, виводиться жирним у кінці
  link: string; // реальне посилання на сайт ("" — якщо ще немає)
  image_url: string; // скриншот на комп'ютері ("" — стилізований макет)
  image_mobile?: string; // скриншот на телефоні — показується в iPhone
  status?: string; // "" — сайт запущено, "dev" — ще в розробці (показуємо значок)
  sort_order: number;
};

// Кейси, які показує сайт
export const cases: CaseItem[] = [
  {
    url_label: "justshopp.com.ua",
    accent: "#E11D48",
    accent2: "#111418",
    meta: "Магазин одягу · Київ",
    title: "Just Shop",
    description:
      "Інтернет-магазин оригінального одягу й взуття з Європи: каталог із розмірами, кошик і доставка Новою Поштою.",
    result: "Понад 300 товарів і адмінка для власника.",
    link: "https://justshopp.com.ua/",
    image_url: "/cases/justshop.jpg",
    image_mobile: "/cases/justshop-m.jpg",
    sort_order: 1,
  },
  {
    url_label: "arikpromax.github.io/tubass",
    accent: "#0073F2",
    accent2: "#0B0D0F",
    meta: "Майстер з ремонту · Едмонтон, Канада",
    title: "Alexon Home Services",
    description:
      "Сайт англійською для майстра з ремонту: послуги, слайдер «до / після», галерея робіт і форма зворотного дзвінка.",
    result: "Окрема сторінка на кожну послугу.",
    link: "https://arikpromax.github.io/tubass/",
    image_url: "/cases/alexon.jpg",
    image_mobile: "/cases/alexon-m.jpg",
    sort_order: 2,
  },
  {
    url_label: "fujisushi.com.ua",
    accent: "#E23B3B",
    accent2: "#1A1A1A",
    meta: "Доставка суші · Умань",
    title: "Fuji Sushi",
    description: "Сайт доставки з меню й кошиком. Замовлення одразу приходять у Telegram.",
    result: "Замовити можна без дзвінка.",
    link: "https://fujisushi.com.ua/",
    image_url: "/cases/fuji.jpg",
    image_mobile: "/cases/fuji-m.jpg",
    sort_order: 3,
  },
  {
    url_label: "sushijulia.com.ua",
    accent: "#D7263D",
    accent2: "#1C1C1C",
    meta: "Доставка суші · Ковель і Турійськ",
    title: "SushiЮ",
    description:
      "Сайт доставки для двох закладів: меню, кошик і вибір найближчої точки з її телефоном та графіком.",
    result: "Один сайт для обох міст.",
    link: "https://sushijulia.com.ua/",
    image_url: "/cases/sushiu.jpg",
    image_mobile: "/cases/sushiu-m.jpg",
    sort_order: 4,
  },
  {
    url_label: "sushishark.pl",
    accent: "#F04E37",
    accent2: "#141414",
    meta: "Доставка суші · Єленя-Ґура, Польща",
    title: "Sushi Shark",
    description:
      "Сайт польською: меню на 70 позицій, кошик і доставка. Меню й категорії власник редагує сам в адмінці.",
    result: "Власник сам оновлює меню.",
    link: "https://sushishark.pl/",
    image_url: "/cases/sushishark.jpg",
    image_mobile: "/cases/sushishark-m.jpg",
    sort_order: 5,
  },
  {
    url_label: "arikpromax.github.io/filin",
    accent: "#7A5533",
    accent2: "#2B1D12",
    meta: "Кафе, мотель і сауна · Кобеляки",
    title: "Кафе «Філін»",
    description: "Сайт закладу з домашньою кухнею: меню, номери, сауна й карта проїзду.",
    result: "Атмосфера закладу з першого екрана.",
    link: "https://arikpromax.github.io/filin/",
    image_url: "/cases/filin.jpg",
    image_mobile: "/cases/filin-m.jpg",
    sort_order: 6,
  },
];
