/*
  Ілюстрації-макети замість фотографій. На сайті-зразку в кожній картці стоїть фото;
  для веб-студії чесніше показувати сам продукт — екрани сайтів, форми, пошук, карту.
  Усе намальовано розміткою й CSS (класи .mk-*), без картинок і емодзі.
*/

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
  return (
    <div className={`mk-phone ${className}`}>
      <div className="mk-phone__screen">{children ?? <MiniSite a={a} b={b} />}</div>
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

/** Етапи роботи як дошка з галочками */
export function SceneTimeline() {
  const rows = ["Бриф", "Демосайт", "Структура", "Дизайн", "Розробка", "Запуск"];
  return (
    <div className="mk-scene mk-scene--timeline">
      <div className="mk-timeline">
        {rows.map((r, i) => (
          <div key={r} className={`mk-timeline__row${i < 4 ? " done" : i === 4 ? " now" : ""}`}>
            <span className="mk-timeline__dot">
              {i < 4 ? <i className="fa-solid fa-check"></i> : i + 1}
            </span>
            <span className="mk-timeline__name">{r}</span>
            <span className="mk-timeline__bar">
              <i style={{ width: i < 4 ? "100%" : i === 4 ? "55%" : "0%" }}></i>
            </span>
          </div>
        ))}
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
    <Phone className="mk-center">
      <div className="mk-broken">
        <span className="w1"></span>
        <span className="w2"></span>
        <span className="w3"></span>
        <span className="w4"></span>
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

export function MockMap() {
  return (
    <div className="mk-map">
      <span className="mk-map__road r1"></span>
      <span className="mk-map__road r2"></span>
      <span className="mk-map__road r3"></span>
      <i className="fa-solid fa-location-dot mk-map__pin"></i>
      <Toast icon="fa-solid fa-route" className="mk-map__card">
        Прокласти маршрут
      </Toast>
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

export function MockSitemap() {
  return (
    <div className="mk-tree">
      <span className="mk-tree__node root">Головна</span>
      <div className="mk-tree__row">
        <span className="mk-tree__node">Послуги</span>
        <span className="mk-tree__node">Роботи</span>
        <span className="mk-tree__node">Ціни</span>
        <span className="mk-tree__node hl">Заявка</span>
      </div>
    </div>
  );
}

export function MockPalette() {
  return (
    <div className="mk-palette">
      <div className="mk-palette__sw">
        <i style={{ background: "#0F3D52" }}></i>
        <i style={{ background: "#0FA39B" }}></i>
        <i style={{ background: "#34D1C4" }}></i>
        <i style={{ background: "#E6F7F5" }}></i>
      </div>
      <span className="mk-palette__type">Аа</span>
      <div className="mk-palette__grid">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
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

export function MockIntegrations() {
  const items: [string, string][] = [
    ["fa-solid fa-pen-to-square", "Форма заявки"],
    ["fa-solid fa-calendar-check", "Онлайн-запис"],
    ["fa-solid fa-location-dot", "Карта"],
    ["fa-brands fa-telegram", "Чат"],
    ["fa-solid fa-chart-line", "Аналітика"],
  ];
  return (
    <div className="mk-integr">
      {items.map(([ic, t]) => (
        <span key={t}>
          <i className={ic}></i>
          {t}
        </span>
      ))}
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
