"use client";

/**
 * Вбудований скрипт, що спрацьовує ще до першого кадру (див. посібник Next.js
 * «Preventing flash before hydration»). На сервері він виконуваний (text/javascript),
 * а під час гідрації в браузері — text/plain, тож React не попереджає про <script>
 * у розмітці; розбіжність типу гасить suppressHydrationWarning.
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
