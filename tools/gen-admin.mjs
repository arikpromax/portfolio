// Адмінка портфоліо arawebsite на платформі адмінок (D:/claude/platform).
// Бере вміст із lib/content.json і список ілюстрацій із lib/visuals.json,
// додає назви вкладок, полів і підказки — і пише SQL-міграцію для Supabase.
//
//   node tools/gen-admin.mjs
//   → ../platform/db/migration-arawebsite.sql
//
// Перевіряє, що кожен текст і кожна колекція з content.json є у вкладках адмінки.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const content = JSON.parse(fs.readFileSync(path.join(root, "lib/content.json"), "utf8"));
const visuals = JSON.parse(fs.readFileSync(path.join(root, "lib/visuals.json"), "utf8"));
const out = path.join(root, "..", "platform", "db", "migration-arawebsite.sql");

const SLUG = "arawebsite";
const NAME = "arawebsite — портфоліо";

/* ---------- Тексти: назва поля людською мовою + де це на сайті ---------- */
const T = (key, name, hint, multiline) => ({ key, name, hint, ...(multiline ? { multiline: true } : {}) });
const texts = [
  // Контакти
  T("tg_user", "Telegram (нікнейм)", "Без @. Кругла кнопка праворуч унизу, значок у шапці, підвал і панель «Про нас». Напр.: arikpromax"),
  T("phone", "Телефон", "У підвалі. Посилання для дзвінка сайт складе сам. Напр.: +380 95 764 34 16"),
  T("email", "Email", "У підвалі. Напр.: arikpro92@gmail.com"),
  // Перший екран
  T("hero_kicker", "Маленький напис над заголовком", "Бірюзовий рядок великими літерами. Порожньо — напису немає."),
  T("hero_title", "Головний заголовок", "Найбільший текст під фото. Напр.: Сайт, який приносить заявки"),
  T("hero_btn", "Кнопка праворуч", "Веде до блоку «Кейси». Порожньо — кнопки немає."),
  // Знайомо?
  T("pain_h", "Заголовок розділу", "Великими літерами по центру. Напр.: Знайомо?"),
  T("pain_panel_h", "Темний блок: заголовок", "Великий текст у темному блоці з ілюстрацією."),
  T("pain_panel_p", "Темний блок: текст", "Абзац під заголовком темного блоку.", true),
  // Що я роблю
  T("sol_h", "Заголовок розділу", "Великими літерами по центру. Напр.: Що я роблю"),
  T("sol_panel_h", "Сірий блок: заголовок", "Великий текст праворуч від ілюстрації з ноутбуком і телефоном."),
  T("sol_panel_p", "Сірий блок: текст", "Абзац під заголовком.", true),
  T("sol_admin_h", "Сайт + адмін-панель: заголовок", "Блок зі знімком адмінки після карток. Порожньо — блоку немає. Напр.: Сайт + адмін-панель"),
  T("sol_admin_p", "Сайт + адмін-панель: текст", "Абзац під заголовком.", true),
  // Банер
  T("demo_kicker", "Маленький напис угорі", "Бірюзовий рядок над великим заголовком."),
  T("demo_h", "Великий заголовок", "Курсивом великими літерами. Напр.: Демосайт — безкоштовно"),
  T("demo_sub", "Текст під круглою кнопкою", "Кругла кнопка зі стрілкою веде до форми заявки.", true),
  // Як я працюю
  T("proc_h", "Заголовок розділу", "Великими літерами по центру. Напр.: Як я працюю"),
  T("proc_lead_h", "Підзаголовок", "Під заголовком розділу, над цифрами."),
  T("proc_lead_p", "Рядок під підзаголовком", "Порожньо — рядка немає.", true),
  // Кейси
  T("cases_h", "Заголовок розділу", "Великими літерами по центру. Напр.: Кейси"),
  T("cases_card_h", "Біла картка: заголовок", "Над перемикачами кейсів."),
  T("cases_card_p", "Біла картка: текст", "Між заголовком і перемикачами.", true),
  // Чому я
  T("why_h", "Заголовок розділу", "Великими літерами по центру. Напр.: Чому я"),
  T("why_sub", "Рядок під заголовком", "Сірий текст по центру. Порожньо — рядка немає."),
  // Вартість
  T("price_h", "Заголовок розділу", "Великими літерами по центру. Напр.: Вартість"),
  T("price_from", "Слово перед ціною", "Дрібно ліворуч від ціни. Напр.: від"),
  T("price_value", "Ціна", "Величезні цифри. Напр.: $500. Число в розділі «Як я працюю» міняється окремо — у картках «Цифри»."),
  T("price_sub", "Текст під ціною", "", true),
  T("price_kicker", "Біла картка: напис угорі", "Над назвою вкладки. Напр.: Що впливає на ціну"),
  T("price_note", "Біла картка: примітка", "Сірий рядок з іконкою. Напр.: Фінальна ціна — після прорахунку"),
  T("price_btn", "Біла картка: кнопка", "Веде до форми заявки. Порожньо — кнопки немає."),
  T("price_integrations", "Інтеграції на ілюстрації", "Вкладка «Інтеграції»: кожна з нового рядка. Іконку сайт добере сам за назвою (Telegram, Instagram, оплата, CRM…).", true),
  T("price_integr_more", "Остання бірюзова плашка", "Після списку інтеграцій. Напр.: І будь-що інше. Порожньо — плашки немає."),
  // Заявка
  T("contact_kicker", "Маленький напис угорі", "Бірюзовий рядок над заголовком."),
  T("contact_h", "Заголовок", "Великий текст ліворуч від форми."),
  T("contact_lead", "Текст під заголовком", "", true),
  T("contact_points", "Пункти з галочками", "Кожен пункт з нового рядка.", true),
  T("form_h", "Форма: заголовок", "Угорі білої форми. Напр.: Отримати розрахунок"),
  T("form_sub", "Форма: рядок під заголовком", ""),
  T("form_business", "Форма: варіанти «Тип бізнесу»", "Кожен варіант з нового рядка — це список, з якого обирає клієнт.", true),
  T("form_nocall", "Форма: галочка під номером", "Видно, коли клієнт обрав «Телефон». Відмітка приходить у заявці поруч зі способом зв'язку. Порожньо — галочки немає."),
  T("form_btn", "Форма: кнопка", "Напр.: Надіслати заявку"),
  T("form_ok", "Форма: повідомлення після відправки", "Зелена плашка, коли заявку надіслано.", true),
  T("form_note", "Форма: рядок під кнопкою", "Дрібно, з замочком. Напр.: Дані використовую лише для зв'язку з вами"),
  // Про нас
  T("about_h", "Заголовок панелі", "Панель, що відкривається круглою кнопкою ліворуч унизу або пунктом меню. Напр.: Про нас"),
  // Шапка й підвал
  T("header_cta", "Кнопка в шапці", "Праворуч угорі, веде до форми заявки. Напр.: Розрахувати сайт"),
  T("nav_services", "Меню: пункт 1", "Веде до розділу «Що я роблю». Напр.: Послуги"),
  T("nav_cases", "Меню: пункт 2", "Веде до розділу «Кейси»."),
  T("nav_about", "Меню: пункт 3", "Відкриває панель «Про нас»."),
  T("nav_price", "Меню: пункт 4", "Веде до розділу «Вартість»."),
  T("subnav_year", "Сіра смужка: рік", "Ліворуч під шапкою. Порожньо — року немає."),
  T("subnav_name", "Сіра смужка: назва", "Поруч із роком. Напр.: arawebsite · сайти для бізнесу"),
  T("tab_top", "Вкладка 1", "Смуга вкладок під шапкою: перший екран. Напр.: Огляд"),
  T("tab_solution", "Вкладка 2", "Розділ «Що я роблю». Напр.: Рішення"),
  T("tab_process", "Вкладка 3", "Розділ «Як я працюю»."),
  T("tab_cases", "Вкладка 4", "Розділ «Кейси»."),
  T("tab_price", "Вкладка 5", "Розділ «Вартість»."),
  T("footer_copy", "Підвал: рядок унизу", "Напр.: © 2026 Веб-студія «arawebsite». Сайти, які приносять заявки."),
  // Google
  T("seo_title", "Заголовок у Google і на вкладці браузера", "До 60 символів."),
  T("seo_desc", "Опис у Google і соцмережах", "1–2 речення, до 160 символів. Показується під заголовком у пошуку й у прев'ю посилання.", true),
];

/* ---------- Колекції (картки) ---------- */
const visualField = {
  type: "select",
  key: "visual",
  name: "Ілюстрація",
  extra: true,
  options: visuals,
  hint: "Намальований макет над текстом. Якщо завантажите своє фото нижче — замість макета покажеться фото.",
};
const ownPhoto = (aspect) => ({
  type: "image",
  key: "image",
  name: "Своє фото замість ілюстрації",
  aspect,
  hint: "Необовʼязково. Щоб повернути ілюстрацію — приберіть фото.",
});
const simpleCards = (key, name, where) => ({
  key,
  name,
  fields: [
    { type: "text", key: "title", name: "Заголовок картки", hint: where },
    { type: "textarea", key: "text", name: "Текст", hint: "Сірий текст під заголовком." },
    visualField,
    ownPhoto(16 / 9),
  ],
});

const collections = [
  {
    key: "site_photos",
    name: "Фото на сайті",
    noAdd: true,
    noDelete: true,
    fields: [{ type: "image", key: "image", name: "Фото", aspect: 16 / 9, hint: "Горизонтальне 16:9, щонайменше 1920 пікселів завширшки." }],
  },
  simpleCards("pains", "Картки проблем", "Картки під темним блоком, по дві в ряд."),
  simpleCards("features", "Картки «Що я роблю»", "Картки під сірим блоком, по три в ряд."),
  {
    key: "screens",
    name: "Сайт на екранах",
    noAdd: true,
    noDelete: true,
    fields: [
      { type: "text", key: "title", name: "Чий це сайт", hint: "Для вас, на сайті не видно. Напр.: Fish Family" },
      { type: "text", key: "url_label", name: "Адреса у віконці браузера", extra: true, hint: "Сірий рядок над знімком компʼютера. Напр.: fishfamily" },
      { type: "image", key: "image", name: "Знімок на компʼютері", aspect: 1.6, hint: "Перший екран сайту, горизонтальний 16:10 (напр. 1440×900)." },
      { type: "image", key: "image_tablet", name: "Знімок на планшеті", extra: true, aspect: 0.75, hint: "Вертикальний 3:4 (напр. 768×1024)." },
      { type: "image", key: "image_mobile", name: "Знімок на телефоні", extra: true, aspect: 390 / 844, hint: "Вертикальний, як екран телефона (напр. 390×844). Показується в iPhone." },
    ],
  },
  {
    key: "stats",
    name: "Цифри",
    fields: [
      { type: "text", key: "title", name: "Підпис над числом", hint: "Дрібно великими літерами. Напр.: Сайт під ключ" },
      { type: "text", key: "prefix", name: "Перед числом", extra: true, hint: "Напр.: «від $» або «1–». Можна лишити порожнім." },
      { type: "text", key: "number", name: "Число", extra: true, hint: "Лише цифри — вони «набігають» при прокрутці. Напр.: 500" },
      { type: "text", key: "from", name: "З якого числа рахувати", extra: true, hint: "Зазвичай 0. Для «1–3 дні» — 1, щоб не мигнуло «1–0»." },
      { type: "text", key: "text", name: "Підпис під числом", hint: "Напр.: дні" },
    ],
  },
  {
    key: "steps",
    name: "Етапи роботи",
    fields: [
      { type: "text", key: "title", name: "Назва на вкладці", hint: "Коротко: Бриф, Дизайн, Запуск…" },
      { type: "text", key: "heading", name: "Великий заголовок", extra: true, hint: "Порожньо — такий самий, як на вкладці. Напр.: Демосайт — безкоштовно" },
      { type: "textarea", key: "text", name: "Опис" },
      { type: "text", key: "btn", name: "Кнопка до заявки", extra: true, hint: "Необовʼязково. Напр.: Хочу демосайт — кнопка веде до форми заявки." },
      visualField,
      ownPhoto(1.6),
    ],
  },
  {
    key: "cases",
    name: "Кейси",
    fields: [
      { type: "text", key: "title", name: "Назва проєкту", hint: "Біля перемикача. Напр.: Fuji Sushi" },
      { type: "text", key: "meta", name: "Ніша · місто", extra: true, hint: "Бірюзово великими літерами. Напр.: Доставка суші · Умань" },
      { type: "textarea", key: "text", name: "Опис", hint: "Що зроблено на сайті." },
      { type: "text", key: "result", name: "Результат", extra: true, hint: "Жирним після опису. Пишіть лише правду. Напр.: Замовлення одразу в Telegram." },
      { type: "text", key: "link", name: "Посилання на сайт", extra: true, hint: "Повна адреса з https://. Порожньо — напис «Сайт готується до запуску»." },
      { type: "text", key: "url_label", name: "Адреса у віконці браузера", extra: true, hint: "Сірий рядок над скриншотом. Напр.: fujisushi.com.ua" },
      { type: "image", key: "image", name: "Скриншот на компʼютері", aspect: 1.6, hint: "Перший екран сайту, горизонтальний 16:10 (напр. 1280×800)." },
      { type: "image", key: "image_mobile", name: "Скриншот на телефоні", extra: true, aspect: 390 / 844, hint: "Вертикальний, як екран телефона (напр. 390×844). Показується в iPhone." },
      { type: "checkbox", key: "dev", name: "Сайт ще в розробці", extra: true, hint: "Біля ніші зʼявиться жовта позначка «В розробці»." },
    ],
  },
  simpleCards("usps", "Картки «Чому я»", "Картки по три в ряд."),
  {
    key: "factors",
    name: "Що впливає на ціну",
    fields: [
      { type: "text", key: "title", name: "Назва вкладки", hint: "І заголовок білої картки. Напр.: Дизайн" },
      { type: "textarea", key: "text", name: "Пояснення", hint: "Текст у білій картці." },
      visualField,
      ownPhoto(1.6),
    ],
  },
  {
    key: "team",
    name: "Команда",
    fields: [
      { type: "text", key: "title", name: "Імʼя", hint: "Напр.: Ярослав" },
      { type: "text", key: "role", name: "Роль", extra: true, hint: "Бірюзова плашка під імʼям. Напр.: Засновник, Дизайнер, Розробник" },
      { type: "textarea", key: "text", name: "Коротко про людину", hint: "Що робить у команді, 1–3 речення." },
      { type: "image", key: "image", name: "Фото", aspect: 1, hint: "Квадратне, обличчя по центру — на сайті воно в колі." },
    ],
  },
];

/* ---------- Вкладки адмінки в порядку блоків сайту (номери адмінка ставить сама) ---------- */
const sections = [
  { name: "Контакти", note: "Вписуєте один раз — змінюється на всьому сайті: кнопки, шапка, підвал, панель «Про нас».", texts: ["tg_user", "phone", "email"] },
  { name: "Перший екран", note: "Велике фото на всю ширину, під ним заголовок і кнопка.", texts: ["hero_kicker", "hero_title", "hero_btn"], photos: ["hero"] },
  { name: "Знайомо?", note: "Темний блок з ілюстрацією і картки під ним. Картку можна додати, прибрати чи перетягнути — сайт сам розкладе їх по дві в ряд.", texts: ["pain_h", "pain_panel_h", "pain_panel_p"], collections: ["pains"] },
  { name: "Що я роблю", note: "Сірий блок з ноутбуком і телефоном (на них — знімки кейсу Alexon з вкладки «Кейси»; якщо його перейменувати чи видалити, стане перший кейс), картки по три в ряд, а під ними блок «Сайт + адмін-панель» зі знімком адмінки.", texts: ["sol_h", "sol_panel_h", "sol_panel_p", "sol_admin_h", "sol_admin_p"], collections: ["features", "screens"], photos: ["admin"] },
  { name: "Банер «Демосайт»", note: "Темна смуга на всю ширину з круглою кнопкою.", texts: ["demo_kicker", "demo_h", "demo_sub"] },
  { name: "Як я працюю", note: "Заголовок, великі цифри, що «набігають», і вкладки з етапами.", texts: ["proc_h", "proc_lead_h", "proc_lead_p"], collections: ["stats", "steps"] },
  { name: "Кейси", note: "Скриншот сайту в браузері й телефоні, біла картка з перемикачами. Кожен кейс — окрема картка.", texts: ["cases_h", "cases_card_h", "cases_card_p"], collections: ["cases"] },
  { name: "Чому я", note: "Заголовок, рядок під ним і картки по три в ряд.", texts: ["why_h", "why_sub"], collections: ["usps"] },
  { name: "Вартість", note: "Велика ціна, вкладки «що впливає на ціну» з ілюстрацією і білою карткою.", texts: ["price_h", "price_from", "price_value", "price_sub", "price_kicker", "price_note", "price_btn", "price_integrations", "price_integr_more"], collections: ["factors"] },
  { name: "Заявка", note: "Сірий блок унизу: текст ліворуч і форма праворуч. Заявки, як і раніше, приходять у вашу таблицю.", texts: ["contact_kicker", "contact_h", "contact_lead", "contact_points", "form_h", "form_sub", "form_business", "form_nocall", "form_btn", "form_ok", "form_note"] },
  { name: "Про нас", note: "Панель, що виїжджає зліва: кругла кнопка ліворуч унизу або пункт меню. Нова людина в команді — нова картка.", texts: ["about_h"], collections: ["team"] },
  { name: "Шапка й підвал", note: "Меню, кнопка в шапці, сіра смужка з вкладками і рядок у підвалі.", texts: ["header_cta", "nav_services", "nav_cases", "nav_about", "nav_price", "subnav_year", "subnav_name", "tab_top", "tab_solution", "tab_process", "tab_cases", "tab_price", "footer_copy"] },
  { name: "Google і соцмережі", note: "Як сайт виглядає в пошуку Google і коли посиланням діляться в месенджерах.", texts: ["seo_title", "seo_desc"] },
];

/* ---------- Перевірки: усе з content.json має місце в адмінці ---------- */
const problems = [];
const textKeys = new Set(texts.map((t) => t.key));
const colKeys = new Set(collections.map((c) => c.key));
for (const k of Object.keys(content.texts)) if (!textKeys.has(k)) problems.push(`текст ${k} без опису поля`);
for (const t of texts) if (!(t.key in content.texts)) problems.push(`поле ${t.key} без тексту в content.json`);
const inSections = new Set(sections.flatMap((s) => s.texts ?? []));
for (const k of textKeys) if (!inSections.has(k)) problems.push(`текст ${k} не потрапив у вкладку`);
const secCols = new Set(sections.flatMap((s) => s.collections ?? []));
for (const k of Object.keys(content.lists)) {
  if (!colKeys.has(k)) problems.push(`колекція ${k} без опису`);
  if (k !== "site_photos" && !secCols.has(k)) problems.push(`колекція ${k} не потрапила у вкладку`);
}
const slots = new Set(sections.flatMap((s) => s.photos ?? []));
for (const p of content.lists.site_photos) if (!slots.has(p.extra.slot)) problems.push(`фото ${p.extra.slot} без вкладки`);
const visualKeys = new Set(visuals.map((v) => v.value));
for (const [k, list] of Object.entries(content.lists))
  for (const it of list) if (it.extra.visual && !visualKeys.has(it.extra.visual)) problems.push(`${k}: невідома ілюстрація ${it.extra.visual}`);
if (problems.length) {
  console.error("Не згенеровано:\n- " + problems.join("\n- "));
  process.exit(1);
}

/* ---------- SQL ---------- */
const q = (s) => "'" + String(s).replace(/'/g, "''") + "'";
const config = { collections, texts, sections };

let sql = `-- ============================================================
--  ARAWEBSITE (портфоліо) у платформі адмінок
--  Згенеровано з D:/claude/portfolio/tools/gen-admin.mjs — не правте руками.
--
--  Виконати в Supabase → SQL Editor (весь файл разом).
--  Повторний запуск безпечний: оновлюється лише опис адмінки,
--  тексти лягають через on conflict do nothing, а картки
--  засіваються тільки в порожні колекції — наредаговане не затреться.
--  Після запуску внизу буде номер сайту — його вписати в
--  portfolio/lib/content.ts → SITE.
-- ============================================================

-- ---------- 1) Сайт і опис адмінки ----------
insert into public.sites (slug, name, paid_until, config) values (
  ${q(SLUG)},
  ${q(NAME)},
  current_date + 3650,
  ${q(JSON.stringify(config, null, 2))}::jsonb
)
on conflict (slug) do update set config = excluded.config, name = excluded.name;
`;

for (const [col, list] of Object.entries(content.lists)) {
  if (col === "site_photos") {
    for (const [i, it] of list.entries()) {
      sql += `
-- ---------- фото на сайті: ${it.extra.slot} ----------
with s as (select id from public.sites where slug = ${q(SLUG)})
insert into public.items (site_id, collection, title, text, image_url, extra, sort_order)
select s.id, ${q(col)}, ${q(it.title)}, ${q(it.text)}, ${q(it.image_url)}, ${q(JSON.stringify(it.extra))}::jsonb, ${i + 1}
from s
where not exists (select 1 from public.items i, s where i.site_id = s.id and i.collection = ${q(col)} and i.extra->>'slot' = ${q(it.extra.slot)});
`;
    }
    continue;
  }
  const rows = list
    .map(
      (it, i) =>
        `  (${q(col)}, ${q(it.title)}, ${q(it.text)}, ${q(it.image_url)}, ${q(JSON.stringify(it.extra))}, ${i + 1})`
    )
    .join(",\n");
  sql += `
-- ---------- картки: ${col} ----------
with s as (select id from public.sites where slug = ${q(SLUG)})
insert into public.items (site_id, collection, title, text, image_url, extra, sort_order)
select s.id, v.collection, v.title, v.text, v.image_url, v.extra::jsonb, v.n
from s, (values
${rows}
) as v(collection, title, text, image_url, extra, n)
where not exists (select 1 from public.items i, s where i.site_id = s.id and i.collection = ${q(col)});
`;
}

sql += `
-- ---------- тексти ----------
with s as (select id from public.sites where slug = ${q(SLUG)})
insert into public.texts (site_id, key, value)
select s.id, v.key, v.value
from s, (values
${Object.entries(content.texts)
  .map(([k, v]) => `  (${q(k)}, ${q(v)})`)
  .join(",\n")}
) as v(key, value)
on conflict (site_id, key) do nothing;

-- ---------- номер сайту (вписати в portfolio/lib/content.ts → SITE) ----------
select id as "SITE для content.ts", slug, name from public.sites where slug = ${q(SLUG)};
`;

fs.writeFileSync(out, sql);
console.log(`ok: ${out}`);
console.log(`вкладок ${sections.length}, текстів ${texts.length}, колекцій ${collections.length}, карток ${Object.values(content.lists).flat().length}`);
