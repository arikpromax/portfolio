"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, type CaseItem } from "@/lib/supabase";

// Порожній кейс — заготовка для кнопки «Додати»
const emptyCase: CaseItem = {
  url_label: "",
  accent: "#0FA39B",
  accent2: "#0F3D52",
  meta: "",
  title: "",
  description: "",
  result: "",
  link: "",
  image_url: "",
  sort_order: 0,
};

type Notice = { kind: "ok" | "err"; text: string } | null;

export default function AdminPage() {
  const supabase = getSupabase();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authBusy, setAuthBusy] = useState(false);

  const [items, setItems] = useState<CaseItem[]>([]);
  const [editing, setEditing] = useState<CaseItem | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) setNotice({ kind: "err", text: "Не вдалося завантажити кейси: " + error.message });
    else setItems(data ?? []);
  }, [supabase]);

  // Слідкуємо, чи власник увійшов
  useEffect(() => {
    if (!supabase) {
      setCheckingAuth(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingAuth(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (session) load();
  }, [session, load]);

  // Supabase ще не підключений — підказуємо, чого бракує
  if (!supabase) {
    return (
      <main className="admin">
        <div className="wrap">
          <div className="admin-card admin-login">
            <h1>Адмінка</h1>
            <p className="admin-note">
              Supabase ще не підключено. Потрібні змінні <code>NEXT_PUBLIC_SUPABASE_URL</code> і{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> у файлі <code>.env.local</code> (локально) та
              в налаштуваннях Vercel (для живого сайту).
            </p>
          </div>
        </div>
      </main>
    );
  }

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthBusy(true);
    setNotice(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setNotice({ kind: "err", text: "Не вдалося увійти: невірний email або пароль." });
    setAuthBusy(false);
    setPassword("");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setItems([]);
    setEditing(null);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (!editing.title.trim()) {
      setNotice({ kind: "err", text: "Вкажіть назву кейса." });
      return;
    }
    setBusy(true);
    const row = { ...editing };
    if (!row.id) {
      delete row.id;
      // новий кейс стає останнім у каруселі
      row.sort_order = items.length ? Math.max(...items.map((i) => i.sort_order)) + 1 : 1;
    }
    const { error } = await supabase.from("cases").upsert(row);
    if (error) setNotice({ kind: "err", text: "Не вдалося зберегти: " + error.message });
    else {
      setNotice({ kind: "ok", text: "Збережено ✔ На сайті з'явиться протягом хвилини." });
      setEditing(null);
      await load();
    }
    setBusy(false);
  };

  const remove = async (item: CaseItem) => {
    if (!item.id) return;
    if (!window.confirm(`Видалити кейс «${item.title}»?`)) return;
    setBusy(true);
    const { error } = await supabase.from("cases").delete().eq("id", item.id);
    if (error) setNotice({ kind: "err", text: "Не вдалося видалити: " + error.message });
    else {
      setNotice({ kind: "ok", text: "Видалено." });
      await load();
    }
    setBusy(false);
  };

  // Поміняти кейс місцями з сусіднім (вгору/вниз)
  const move = async (index: number, dir: -1 | 1) => {
    const a = items[index];
    const b = items[index + dir];
    if (!a || !b || !a.id || !b.id) return;
    setBusy(true);
    const { error: e1 } = await supabase
      .from("cases")
      .update({ sort_order: b.sort_order })
      .eq("id", a.id);
    const { error: e2 } = await supabase
      .from("cases")
      .update({ sort_order: a.sort_order })
      .eq("id", b.id);
    if (e1 || e2) setNotice({ kind: "err", text: "Не вдалося переставити." });
    await load();
    setBusy(false);
  };

  const set = (patch: Partial<CaseItem>) =>
    setEditing((prev) => (prev ? { ...prev, ...patch } : prev));

  // Завантаження скриншота у сховище Supabase (bucket "case-images")
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    setNotice(null);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `case-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("case-images").upload(path, file);
    if (error) {
      setNotice({ kind: "err", text: "Не вдалося завантажити фото: " + error.message });
    } else {
      const { data } = supabase.storage.from("case-images").getPublicUrl(path);
      set({ image_url: data.publicUrl });
    }
    setUploading(false);
    e.target.value = "";
  };

  if (checkingAuth) {
    return (
      <main className="admin">
        <div className="wrap">
          <div className="admin-card admin-login">
            <p className="admin-note">Завантаження…</p>
          </div>
        </div>
      </main>
    );
  }

  // Екран входу
  if (!session) {
    return (
      <main className="admin">
        <div className="wrap">
          <div className="admin-card admin-login">
            <h1>Вхід в адмінку</h1>
            <p className="admin-note" style={{ marginBottom: 18 }}>
              Лише для власника сайту.
            </p>
            {notice && <div className={`admin-status ${notice.kind}`}>{notice.text}</div>}
            <form onSubmit={signIn}>
              <div className="field">
                <label htmlFor="adm-email">Email</label>
                <input
                  id="adm-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="field">
                <label htmlFor="adm-pass">Пароль</label>
                <input
                  id="adm-pass"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn btn--primary" disabled={authBusy}>
                {authBusy ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Входжу…
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-right-to-bracket"></i>Увійти
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Головний екран адмінки
  return (
    <main className="admin">
      <div className="wrap">
        <div className="admin-head">
          <h1>Кейси на сайті</h1>
          <div className="admin-actions">
            <a href="/" className="btn btn--ghost btn--sm">
              <i className="fa-solid fa-house"></i>На сайт
            </a>
            <button className="btn btn--ghost btn--sm" onClick={signOut}>
              <i className="fa-solid fa-right-from-bracket"></i>Вийти
            </button>
          </div>
        </div>

        {notice && <div className={`admin-status ${notice.kind}`}>{notice.text}</div>}

        <div className="admin-card">
          {items.length === 0 && (
            <p className="admin-note">
              У базі поки немає кейсів — на сайті показуються демо-приклади. Додайте перший!
            </p>
          )}
          {items.map((c, i) => (
            <div key={c.id} className="admin-item">
              <span
                className="admin-item__dot"
                style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent2})` }}
              ></span>
              <div className="admin-item__txt">
                <b>{c.title}</b>
                <span>{c.meta}</span>
              </div>
              <div className="admin-actions">
                <button
                  className="btn btn--ghost btn--sm btn--icon"
                  aria-label="Вище"
                  disabled={busy || i === 0}
                  onClick={() => move(i, -1)}
                >
                  <i className="fa-solid fa-arrow-up"></i>
                </button>
                <button
                  className="btn btn--ghost btn--sm btn--icon"
                  aria-label="Нижче"
                  disabled={busy || i === items.length - 1}
                  onClick={() => move(i, 1)}
                >
                  <i className="fa-solid fa-arrow-down"></i>
                </button>
                <button
                  className="btn btn--ghost btn--sm"
                  disabled={busy}
                  onClick={() => {
                    setNotice(null);
                    setEditing({ ...c });
                  }}
                >
                  <i className="fa-solid fa-pen"></i>Редагувати
                </button>
                <button className="btn btn--danger btn--sm" disabled={busy} onClick={() => remove(c)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {!editing && (
          <button
            className="btn btn--primary"
            onClick={() => {
              setNotice(null);
              setEditing({ ...emptyCase });
            }}
          >
            <i className="fa-solid fa-plus"></i>Додати кейс
          </button>
        )}

        {editing && (
          <div className="admin-card">
            <h2 style={{ fontSize: "1.15rem", marginBottom: 18 }}>
              {editing.id ? `Редагування: ${editing.title}` : "Новий кейс"}
            </h2>
            <form onSubmit={save}>
              <div className="admin-grid2">
                <div className="field">
                  <label htmlFor="c-title">Назва</label>
                  <input
                    id="c-title"
                    type="text"
                    required
                    value={editing.title}
                    onChange={(e) => set({ title: e.target.value })}
                    placeholder="DentaCare"
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-meta">Ніша · місто</label>
                  <input
                    id="c-meta"
                    type="text"
                    value={editing.meta}
                    onChange={(e) => set({ meta: e.target.value })}
                    placeholder="Стоматологія · Київ"
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-url">Адреса в макеті</label>
                  <input
                    id="c-url"
                    type="text"
                    value={editing.url_label}
                    onChange={(e) => set({ url_label: e.target.value })}
                    placeholder="dentacare.ua"
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-link">
                    Посилання на сайт <span className="opt">(необов&apos;язково)</span>
                  </label>
                  <input
                    id="c-link"
                    type="url"
                    value={editing.link}
                    onChange={(e) => set({ link: e.target.value })}
                    placeholder="https://…"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-desc">Опис</label>
                <textarea
                  id="c-desc"
                  rows={2}
                  value={editing.description}
                  onChange={(e) => set({ description: e.target.value })}
                  placeholder="Сайт клініки: онлайн-запис, лікарі, обладнання, відгуки."
                ></textarea>
              </div>
              <div className="field">
                <label htmlFor="c-result">Результат (виділяється жирним)</label>
                <input
                  id="c-result"
                  type="text"
                  value={editing.result}
                  onChange={(e) => set({ result: e.target.value })}
                  placeholder="+40% записів за перший місяць."
                />
              </div>
              <div className="field">
                <label htmlFor="c-photo">
                  Скриншот сайту{" "}
                  <span className="opt">(необов&apos;язково — без нього буде стилізований макет)</span>
                </label>
                {editing.image_url ? (
                  <div className="admin-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editing.image_url} alt="Скриншот кейса" />
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => set({ image_url: "" })}
                    >
                      Прибрати фото
                    </button>
                  </div>
                ) : (
                  <input
                    id="c-photo"
                    type="file"
                    accept="image/*"
                    onChange={uploadPhoto}
                    disabled={uploading}
                  />
                )}
                {uploading && <p className="admin-note">Завантажую фото…</p>}
              </div>
              <div className="admin-grid2">
                <div className="field">
                  <label htmlFor="c-accent">Основний колір макета</label>
                  <input
                    id="c-accent"
                    type="color"
                    value={editing.accent}
                    onChange={(e) => set({ accent: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-accent2">Темний відтінок макета</label>
                  <input
                    id="c-accent2"
                    type="color"
                    value={editing.accent2}
                    onChange={(e) => set({ accent2: e.target.value })}
                  />
                </div>
              </div>
              <div className="admin-actions">
                <button type="submit" className="btn btn--primary btn--sm" disabled={busy}>
                  {busy ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Зберігаю…
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk"></i>Зберегти
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  disabled={busy}
                  onClick={() => setEditing(null)}
                >
                  Скасувати
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
