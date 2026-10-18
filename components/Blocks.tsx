"use client";

// Повторювані будівельні блоки сторінки — ті самі, з яких складено сайт-зразок
import { Visual } from "@/components/Mocks";
import { useContent, src } from "@/components/ContentProvider";
import type { Item } from "@/lib/content";

/** Великий заголовок розділу по центру («ДИЗАЙН», «ПРОИЗВОДИТЕЛЬНОСТЬ» у зразку) */
export function SectTitle({ children }: { children: React.ReactNode }) {
  if (!children) return null;
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
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

/**
 * Картки з адмінки рядами по `per` штук: ілюстрація (макет або власне фото), заголовок, текст.
 * Останній ряд стає ширшим, якщо в ньому менше карток, — додане в адмінці завжди стає на місце.
 */
export function CardRows({ items, per }: { items: Item[]; per: 2 | 3 }) {
  const { x } = useContent();
  const rows: Item[][] = [];
  for (let i = 0; i < items.length; i += per) rows.push(items.slice(i, i + per));
  return (
    <>
      {rows.map((row, r) => (
        <div key={r} className={`cards cards--${row.length}`}>
          {row.map((it, i) => (
            <article key={i} className="card reveal">
              <div className="card__shot" aria-hidden="true">
                <Visual k={x(it, "visual")} img={it.image_url ? src(it.image_url) : ""} />
              </div>
              <h3>{it.title}</h3>
              {it.text && <p>{it.text}</p>}
            </article>
          ))}
        </div>
      ))}
    </>
  );
}
