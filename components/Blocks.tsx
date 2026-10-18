// Повторювані будівельні блоки сторінки — ті самі, з яких складено сайт-зразок

/** Великий заголовок розділу по центру («ДИЗАЙН», «ПРОИЗВОДИТЕЛЬНОСТЬ» у зразку) */
export function SectTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="sect-title reveal">{children}</h2>;
}

/**
 * Повноширинна ілюстрація з текстом поверх.
 * pos: bl — знизу ліворуч, br — знизу праворуч, r — праворуч по центру, l — ліворуч по центру
 */
export function Panel({
  pos = "bl",
  tone = "light",
  visual,
  title,
  children,
}: {
  pos?: "bl" | "br" | "r" | "l";
  tone?: "light" | "dark";
  visual: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`panel panel--${tone} panel--${pos}`}>
      <div className="panel__visual" aria-hidden="true">
        {visual}
      </div>
      <div className="panel__text reveal">
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}

export type CardItem = { visual: React.ReactNode; title: string; text: string };

/** Ряд карток «ілюстрація + заголовок + текст» на 2 чи 3 колонки */
export function Cards({ cols = 3, items }: { cols?: 2 | 3; items: CardItem[] }) {
  return (
    <div className={`cards cards--${cols}`}>
      {items.map((it) => (
        <article key={it.title} className="card reveal">
          <div className="card__shot" aria-hidden="true">
            {it.visual}
          </div>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </article>
      ))}
    </div>
  );
}
