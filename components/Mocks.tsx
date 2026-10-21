/*
  Ілюстрації-макети замість фотографій. На сайті-зразку в кожній картці стоїть фото;
  для веб-студії чесніше показувати сам продукт — екрани сайтів, форми, пошук, карту.
  Усе намальовано розміткою й CSS (класи .mk-*), без картинок і емодзі.
*/
import { useState } from "react";
import { useContent, lines } from "@/components/ContentProvider";

type Tone = { a?: string; b?: string };
const vars = ({ a = "#0FA39B", b = "#0F3D52" }: Tone) =>
  ({ "--a": a, "--b": b }) as React.CSSProperties;

/** Мініатюра сторінки сайту: меню, перший екран із кнопкою, ряд карток */
export function MiniSite({ a, b, dim }: Tone & { dim?: boolean }) {
  return (
    <div className={`mk-site${dim ? " mk-site--dim" : ""}`} style={vars({ a, b })}>
      <div className="mk-site__nav">
        <i></i>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="mk-site__hero">
        <span className="l1"></span>
        <span className="l2"></span>
        <span className="cta"></span>
      </div>
      <div className="mk-site__cards">
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  );
}

export function Browser({
  a,
  b,
  url = "arawebsite.com",
  dim,
  className = "",
  children,
}: Tone & { url?: string; dim?: boolean; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`mk-browser ${className}`}>
      <div className="mk-browser__bar">
        <i></i>
        <i></i>
        <i></i>
        <span>{url}</span>
      </div>
      {children ?? <MiniSite a={a} b={b} dim={dim} />}
    </div>
  );
}

export function Phone({
  a,
  b,
  className = "",
  children,
}: Tone & { className?: string; children?: React.ReactNode }) {
  // Корпус iPhone 14 Pro з Devices.css (MIT) — розмітка частин як у бібліотеці
  return (
    <div className={`device device-iphone-14-pro mk-phone ${className}`}>
      <div className="device-frame">
        <div className="device-screen">{children ?? <MiniSite a={a} b={b} />}</div>
      </div>
      <div className="device-stripe"></div>
      <div className="device-header"></div>
      <div className="device-sensors"></div>
      <div className="device-btns"></div>
      <div className="device-power"></div>
      <div className="device-home"></div>
    </div>
  );
}

export function Toast({ icon, children, className = "" }: { icon: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`mk-toast ${className}`}>
      <i className={icon}></i>
      {children}
    </div>
  );
}

/* ---------- Великі сцени для повноширинних блоків ---------- */

/** Сайт на ноутбуці й телефоні, до них прилітають заявки */
export function SceneDevices() {
  return (
    <div className="mk-scene mk-scene--devices">
      <Browser className="mk-scene__desk" />
      <Phone className="mk-scene__phone" />
      <Toast icon="fa-solid fa-pen-to-square" className="mk-float f1">
        Нова заявка
      </Toast>
      <Toast icon="fa-solid fa-calendar-check" className="mk-float f2">
        Запис на прийом
      </Toast>
      <Toast icon="fa-solid fa-phone" className="mk-float f3">
        Дзвінок клієнта
      </Toast>
    </div>
  );
}

/** Сайт є, а в статистиці заявок — нуль */
export function SceneQuiet() {
  return (
    <div className="mk-scene mk-scene--quiet">
      <Browser dim url="vash-sait.ua" className="mk-scene__desk" />
      <div className="mk-stat">
        <span className="mk-stat__label">Заявки за місяць</span>
        <b className="mk-stat__num">0</b>
        <svg viewBox="0 0 200 50" className="mk-stat__line" aria-hidden="true">
          <path d="M0 40 L40 41 L80 40 L120 42 L160 41 L200 42" />
        </svg>
      </div>
    </div>
  );
}

/* ---------- Малі макети для карток ---------- */

export function MockEmptyCalls() {
  return (
    <Phone className="mk-center">
      <div className="mk-calls">
        <b>Вхідні</b>
        <i className="fa-solid fa-phone-slash"></i>
        <span>Дзвінків немає</span>
      </div>
    </Phone>
  );
}

export function MockRival() {
  return (
    <div className="mk-rival">
      <Browser dim url="vash-sait.ua" className="mk-rival__old" />
      <Browser a="#0FA39B" b="#0F3D52" url="konkurent.ua" className="mk-rival__new" />
      <span className="mk-rival__badge">
        <i className="fa-solid fa-star"></i>4,9
      </span>
    </div>
  );
}

export function MockBroken() {
  return (
    // Сайт, зверстаний лише під комп'ютер: на телефоні все дрібне й вилазить за край
    <Phone className="mk-center">
      <div className="mk-broken">
        <div className="mk-broken__nav">
          <span>Головна</span>
          <span>Про нас</span>
          <span>Послуги</span>
          <span>Ціни</span>
          <span>Контакти</span>
          <span>Галерея</span>
        </div>
        <span className="mk-broken__h">Ласкаво просимо на наш офіційний сайт</span>
        <span className="mk-broken__p">
          Наша компанія працює на ринку понад десять років і пропонує широкий спектр послуг для
          приватних і корпоративних клієнтів у вашому місті та області
        </span>
        <div className="mk-broken__row">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <span className="mk-broken__btn">Детальніше</span>
        <span className="mk-broken__scroll">
          <i></i>
        </span>
      </div>
    </Phone>
  );
}

export function MockNoPrice() {
  return (
    <div className="mk-price">
      <span className="mk-price__label">Вартість послуги</span>
      <b className="mk-price__q">???</b>
      <span className="mk-price__hint">Уточнюйте за телефоном</span>
    </div>
  );
}

export function MockProof() {
  return (
    <div className="mk-proof">
      <div className="mk-proof__photos">
        <i></i>
        <i></i>
        <i></i>
      </div>
      <div className="mk-proof__review">
        <span className="mk-stars">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </span>
        <span className="mk-line"></span>
        <span className="mk-line s"></span>
      </div>
    </div>
  );
}

export function MockForm() {
  return (
    <div className="mk-form">
      <span className="mk-form__field">Ваше імʼя</span>
      <span className="mk-form__field">+380</span>
      <span className="mk-form__btn">Надіслати</span>
      <Toast icon="fa-solid fa-circle-check" className="mk-form__ok">
        Заявку надіслано
      </Toast>
    </div>
  );
}

export function MockScreens() {
  return (
    <div className="mk-screens">
      <Browser className="mk-screens__desk" />
      <div className="mk-screens__tab">
        <MiniSite />
      </div>
      <Phone className="mk-screens__phone" />
    </div>
  );
}

export function MockSpeed() {
  return (
    <div className="mk-speed">
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <path className="track" d="M10 62 A50 50 0 0 1 110 62" />
        <path className="fill" d="M10 62 A50 50 0 0 1 98 32" />
        <line className="needle" x1="60" y1="62" x2="93" y2="36" />
        <circle cx="60" cy="62" r="5" />
      </svg>
      <span>Відкривається одразу</span>
    </div>
  );
}

// Карта світу Google. Поки людина не натисне «Відкрити карту», це знімок (public/map-world.jpg)
// і до Google сайт не звертається; після натискання вантажиться жива карта — Google
// бачить IP-адресу й може поставити свої cookie (так написано в /cookies і політиці).
const GMAP = "https://maps.google.com/maps?ll=38,15&z=2&t=m&hl=uk&output=embed";
export function MockGoogleMap() {
  const [live, setLive] = useState(false);
  if (live)
    return <iframe className="gmap__frame" src={GMAP} title="Карта Google" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />;
  return (
    <div className="gmap">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="vis-photo" src="/map-world.jpg" alt="Карта світу Google" loading="lazy" />
      <button type="button" className="gmap__btn" onClick={() => setLive(true)}>
        <i className="fa-solid fa-map-location-dot"></i>
        <span>
          Відкрити карту
          <small>завантажиться з Google</small>
        </span>
      </button>
    </div>
  );
}

export function MockSearch() {
  return (
    <div className="mk-search">
      <span className="mk-search__box">
        <i className="fa-solid fa-magnifying-glass"></i>стоматологія поруч
      </span>
      <div className="mk-search__res top">
        <b>Ваш сайт</b>
        <span className="mk-line"></span>
      </div>
      <div className="mk-search__res">
        <span className="mk-line t"></span>
        <span className="mk-line"></span>
      </div>
      <div className="mk-search__res">
        <span className="mk-line t"></span>
        <span className="mk-line"></span>
      </div>
    </div>
  );
}

/** Листування: lines — [хто пише, текст]; me — повідомлення від клієнта праворуч */
export function MockChat({ lines }: { lines: [boolean, string][] }) {
  return (
    <div className="mk-chat">
      {lines.map(([me, text], i) => (
        <span key={i} className={`mk-chat__msg${me ? " me" : ""}`}>
          {text}
        </span>
      ))}
    </div>
  );
}

export function MockDemo() {
  return (
    <div className="mk-demo">
      <Browser url="demo.arawebsite.com" a="#E26AA6" b="#7A1F58" />
      <span className="mk-demo__ribbon">Демо · 0 ₴</span>
    </div>
  );
}

/*
  Структура сайту як схема бази даних: сторінки — таблиці з полями й типами,
  лінії показують, що з чим пов'язано. Координати в одиницях viewBox 600×340.
*/
type DbTable = { name: string; x: number; y: number; w: number; hl?: boolean; rows: [string, string][] };
const DB_HEAD = 28;
const DB_ROW = 24;
const dbTables: DbTable[] = [
  {
    name: "Головна",
    x: 20,
    y: 40,
    w: 160,
    rows: [
      ["Перший екран", "блок"],
      ["Послуги", "блок"],
      ["Кейси", "блок"],
      ["Відгуки", "блок"],
      ["Заявка", "форма"],
    ],
  },
  {
    name: "Послуги",
    x: 230,
    y: 16,
    w: 150,
    rows: [
      ["Список послуг", "список"],
      ["Ціни", "таблиця"],
      ["Кнопка заявки", "кнопка"],
    ],
  },
  {
    name: "Кейси",
    x: 230,
    y: 196,
    w: 150,
    rows: [
      ["Фото робіт", "галерея"],
      ["Опис", "текст"],
      ["Посилання", "url"],
    ],
  },
  {
    name: "Заявка",
    x: 430,
    y: 120,
    w: 150,
    hl: true,
    rows: [
      ["Імʼя", "текст"],
      ["Телефон", "tel"],
      ["Тип бізнесу", "вибір"],
    ],
  },
  {
    name: "Telegram-бот",
    x: 430,
    y: 250,
    w: 150,
    rows: [
      ["Нова заявка", "бот"],
      ["Сповіщення", "push"],
    ],
  },
];
// Зв'язки: [звідки x, y, куди x, y]
const dbLinks: [number, number, number, number][] = [
  [180, 104, 230, 30], // Головна.Послуги → Послуги
  [180, 128, 230, 210], // Головна.Кейси → Кейси
  [180, 176, 430, 134], // Головна.Заявка → Заявка
  [380, 104, 430, 134], // Послуги.Кнопка заявки → Заявка
];

export function MockSitemap() {
  return (
    <div className="mk-db">
      <svg viewBox="0 0 600 340" aria-hidden="true">
        {dbLinks.map(([x1, y1, x2, y2], i) => {
          const mx = (x1 + x2) / 2;
          return (
            <g key={i} className="mk-db__link">
              <path d={`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`} />
              <circle cx={x1} cy={y1} r="3.5" />
              <circle cx={x2} cy={y2} r="3.5" />
            </g>
          );
        })}
        {/* Заявка → Telegram-бот: пряма лінія вниз */}
        <g className="mk-db__link">
          <path d={`M505 ${120 + DB_HEAD + 3 * DB_ROW} L505 250`} />
          <circle cx="505" cy={120 + DB_HEAD + 3 * DB_ROW} r="3.5" />
          <circle cx="505" cy="250" r="3.5" />
        </g>
        {dbTables.map((t) => {
          const h = DB_HEAD + t.rows.length * DB_ROW;
          return (
            <g key={t.name} className={`mk-db__table${t.hl ? " hl" : ""}`}>
              <rect className="mk-db__box" x={t.x} y={t.y} width={t.w} height={h} rx="8" />
              <path
                className="mk-db__head"
                d={`M${t.x} ${t.y + DB_HEAD} V${t.y + 8} Q${t.x} ${t.y} ${t.x + 8} ${t.y} H${t.x + t.w - 8} Q${t.x + t.w} ${t.y} ${t.x + t.w} ${t.y + 8} V${t.y + DB_HEAD} Z`}
              />
              <rect className="mk-db__key" x={t.x + 12} y={t.y + 10} width="8" height="8" rx="2" />
              <text className="mk-db__name" x={t.x + 28} y={t.y + 18.5}>
                {t.name}
              </text>
              {t.rows.map(([field, type], i) => {
                const ry = t.y + DB_HEAD + i * DB_ROW;
                return (
                  <g key={field}>
                    {i > 0 && <line className="mk-db__sep" x1={t.x} x2={t.x + t.w} y1={ry} y2={ry} />}
                    <text className="mk-db__field" x={t.x + 12} y={ry + 15.5}>
                      {field}
                    </text>
                    <text className="mk-db__type" x={t.x + t.w - 10} y={ry + 15.5} textAnchor="end">
                      {type}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Вікно редактора макетів: шари, полотно з виділеною кнопкою, кольори й шрифт */
export function MockDesign() {
  const layers: [string, string, boolean?][] = [
    ["fa-solid fa-hashtag", "Головна"],
    ["fa-solid fa-bars", "Меню"],
    ["fa-solid fa-font", "Заголовок"],
    ["fa-regular fa-square", "Кнопка", true],
    ["fa-solid fa-table-cells-large", "Картки послуг"],
    ["fa-solid fa-star", "Відгуки"],
    ["fa-solid fa-location-dot", "Карта"],
  ];
  const colors: [string, string][] = [
    ["#0F3D52", "0F3D52"],
    ["#0B8079", "0B8079"],
    ["#34D1C4", "34D1C4"],
    ["#E6F7F5", "E6F7F5"],
  ];
  return (
    <div className="mk-figma">
      <div className="mk-figma__bar">
        <i></i>
        <i></i>
        <i></i>
        <span>Макет · Головна</span>
        <b>100%</b>
      </div>
      <div className="mk-figma__body">
        <div className="mk-figma__layers">
          <span className="mk-figma__h">Шари</span>
          {layers.map(([ic, name, on]) => (
            <span key={name} className={`mk-figma__layer${on ? " on" : ""}`}>
              <i className={ic}></i>
              <em>{name}</em>
            </span>
          ))}
        </div>
        <div className="mk-figma__canvas">
          <div className="mk-figma__frame">
            <div className="nav">
              <i></i>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="t1">Усмішка без болю</span>
            <span className="t2"></span>
            <span className="mk-figma__cta">
              Записатись
              <em className="mk-figma__size">180 × 48</em>
            </span>
            <div className="cards">
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
        </div>
        <div className="mk-figma__props">
          <span className="mk-figma__h">Кольори</span>
          {colors.map(([c, hex]) => (
            <span key={hex} className="mk-figma__sw">
              <i style={{ background: c }}></i>#{hex}
            </span>
          ))}
          <span className="mk-figma__h">Шрифт</span>
          <span className="mk-figma__font">Аа</span>
          <span className="mk-figma__muted">Fira Sans · 800</span>
          <span className="mk-figma__h">Кути</span>
          <span className="mk-figma__muted">Радіус 4</span>
        </div>
      </div>
    </div>
  );
}

export function MockCode() {
  return (
    <div className="mk-code">
      <span>
        <em>&lt;section</em> <u>id</u>=<s>&quot;contact&quot;</s>
        <em>&gt;</em>
      </span>
      <span className="i1">
        <em>&lt;form</em> <u>onSubmit</u>=<s>{"{send}"}</s>
        <em>&gt;</em>
      </span>
      <span className="i2">
        <em>&lt;input</em> <u>type</u>=<s>&quot;tel&quot;</s> <em>/&gt;</em>
      </span>
      <span className="i2">
        <em>&lt;button&gt;</em>Надіслати<em>&lt;/button&gt;</em>
      </span>
      <span className="i1">
        <em>&lt;/form&gt;</em>
      </span>
      <span>
        <em>&lt;/section&gt;</em>
      </span>
    </div>
  );
}

export function MockLaunch() {
  return (
    <div className="mk-launch">
      <Browser url="vash-biznes.ua" />
      <Toast icon="fa-solid fa-rocket" className="mk-launch__toast">
        Сайт опубліковано
      </Toast>
    </div>
  );
}

/** Від лендингу до каталогу — стопка сторінок */
export function MockLayers() {
  return (
    <div className="mk-layers">
      <Browser url="каталог" className="l3" a="#E8943A" b="#7A4A12" />
      <Browser url="сайт-візитка" className="l2" a="#9B6A43" b="#3E2A1B" />
      <Browser url="лендинг" className="l1" />
    </div>
  );
}

export function MockNiches() {
  const items = [
    "fa-solid fa-tooth",
    "fa-solid fa-helmet-safety",
    "fa-solid fa-spa",
    "fa-solid fa-mug-hot",
    "fa-solid fa-dumbbell",
    "fa-solid fa-store",
  ];
  return (
    <div className="mk-niches">
      {items.map((ic) => (
        <span key={ic}>
          <i className={ic}></i>
        </span>
      ))}
    </div>
  );
}

// Іконка для інтеграції за назвою; невідома назва — «вилка»
const INTEGR_ICONS: [RegExp, string][] = [
  [/форм/i, "fa-solid fa-pen-to-square"],
  [/запис/i, "fa-solid fa-calendar-check"],
  [/apple/i, "fa-brands fa-apple-pay"],
  [/google pay/i, "fa-brands fa-google-pay"],
  [/оплат|liqpay|monobank|wayforpay/i, "fa-solid fa-credit-card"],
  [/кошик|замовл/i, "fa-solid fa-cart-shopping"],
  [/нова пошта/i, "fa-solid fa-truck-fast"],
  [/укрпошт|доставк/i, "fa-solid fa-box"],
  [/telegram/i, "fa-brands fa-telegram"],
  [/viber/i, "fa-brands fa-viber"],
  [/whatsapp/i, "fa-brands fa-whatsapp"],
  [/чат/i, "fa-solid fa-comments"],
  [/instagram/i, "fa-brands fa-instagram"],
  [/facebook/i, "fa-brands fa-facebook"],
  [/tiktok/i, "fa-brands fa-tiktok"],
  [/youtube/i, "fa-brands fa-youtube"],
  [/map|карт/i, "fa-solid fa-location-dot"],
  [/відгук/i, "fa-solid fa-star"],
  [/analytics|аналіт/i, "fa-solid fa-chart-line"],
  [/pixel|meta/i, "fa-brands fa-meta"],
  [/таблиц|sheets/i, "fa-solid fa-table"],
  [/crm/i, "fa-solid fa-address-book"],
  [/календар/i, "fa-solid fa-calendar-days"],
  [/sms/i, "fa-solid fa-comment-sms"],
  [/email|розсилк|пошта/i, "fa-solid fa-envelope-open-text"],
  [/калькулятор/i, "fa-solid fa-calculator"],
  [/промокод|знижк/i, "fa-solid fa-ticket"],
  [/мов/i, "fa-solid fa-language"],
  [/адмінк/i, "fa-solid fa-sliders"],
];
const integrIcon = (name: string) => INTEGR_ICONS.find(([re]) => re.test(name))?.[1] ?? "fa-solid fa-plug";

/** Усе, що можна підключити до сайту — список редагується в адмінці (по одному на рядок) */
export function MockIntegrations() {
  const { t } = useContent();
  const more = t("price_integr_more");
  return (
    <div className="mk-integr">
      {lines(t("price_integrations")).map((name, i) => (
        <span key={i}>
          <i className={integrIcon(name)}></i>
          {name}
        </span>
      ))}
      {more && (
        <span className="more">
          <i className="fa-solid fa-plug"></i>
          {more}
        </span>
      )}
    </div>
  );
}

export function MockContent() {
  return (
    <div className="mk-content">
      <div className="mk-content__photo">
        <i className="fa-solid fa-camera"></i>
      </div>
      <div className="mk-content__text">
        <span className="mk-line t"></span>
        <span className="mk-line"></span>
        <span className="mk-line"></span>
        <span className="mk-line s"></span>
      </div>
    </div>
  );
}

/* ---------- Реєстр ілюстрацій для карток ----------
   Картка в адмінці зберігає ключ ілюстрації (lib/visuals.json — ті самі ключі й назви
   для списку в адмінці) або власне фото. Невідомий ключ — «комп'ютер, планшет і телефон». */
const VISUALS: Record<string, () => React.ReactNode> = {
  calls: () => <MockEmptyCalls />,
  rival: () => <MockRival />,
  broken: () => <MockBroken />,
  noprice: () => <MockNoPrice />,
  proof: () => <MockProof />,
  form: () => <MockForm />,
  screens: () => <MockScreens />,
  speed: () => <MockSpeed />,
  map: () => <MockGoogleMap />,
  search: () => <MockSearch />,
  "chat-brief": () => (
    <MockChat
      lines={[
        [true, "Потрібен сайт для клініки"],
        [false, "Хто ваші пацієнти і що вони шукають першим?"],
        [true, "Ціни й запис онлайн"],
      ]}
    />
  ),
  "chat-support": () => (
    <MockChat
      lines={[
        [true, "Можна поміняти фото на головній?"],
        [false, "Так, уже замінив — гляньте"],
      ]}
    />
  ),
  demo: () => <MockDemo />,
  sitemap: () => <MockSitemap />,
  design: () => <MockDesign />,
  code: () => <MockCode />,
  launch: () => <MockLaunch />,
  layers: () => <MockLayers />,
  niches: () => <MockNiches />,
  integrations: () => <MockIntegrations />,
  content: () => <MockContent />,
};

// Ілюстрації, з якими можна взаємодіяти: їх не ховаємо від екранних читачів
export const INTERACTIVE_VISUALS = new Set(["map"]);

/** Ілюстрація картки: власне фото, якщо його завантажили, інакше макет за ключем */
export function Visual({ k, img }: { k?: string; img?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (img) return <img className="vis-photo" src={img} alt="" />;
  return <>{(VISUALS[k ?? ""] ?? VISUALS.screens)()}</>;
}
