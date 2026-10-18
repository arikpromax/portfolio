"use client";

import { createContext, useContext } from "react";
import type { Content, Item } from "@/lib/content";

const Ctx = createContext<Content | null>(null);

/** Вміст сайту (тексти й картки) для всіх компонентів — його готує app/layout.tsx */
export default function ContentProvider({ value, children }: { value: Content; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// Фото, завантажені разом із сайтом, у базі записані повною адресою arawebsite.com —
// так їх видно й в адмінці. На самому сайті ведемо їх відносно, щоб працювали й на прев'ю.
const ORIGIN = "https://arawebsite.com";
export const src = (url: string) => (url.startsWith(ORIGIN + "/") ? url.slice(ORIGIN.length) : url);

/** Рядки багаторядкового поля: кожен непорожній рядок — окремий пункт */
export const lines = (v: string) =>
  v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

export function useContent() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useContent поза ContentProvider");
  const t = (key: string) => c.texts[key] ?? "";
  const list = (key: string): Item[] => c.lists[key] ?? [];
  const x = (item: Item, key: string) => {
    const v = item.extra?.[key];
    return v == null ? "" : String(v);
  };
  // Фото сайту за «слотом» (колекція «Фото на сайті»)
  const photo = (slot: string) => {
    const p = list("site_photos").find((i) => x(i, "slot") === slot);
    return p?.image_url ? src(p.image_url) : "";
  };
  // Контакти: один запис в адмінці — усі посилання на сайті
  const tgUser = t("tg_user").replace(/^@/, "");
  const contacts = {
    tgUser,
    tgUrl: `https://t.me/${tgUser}`,
    phone: t("phone"),
    phoneHref: "tel:" + t("phone").replace(/[^\d+]/g, ""),
    email: t("email"),
  };
  return { t, list, x, photo, contacts };
}
