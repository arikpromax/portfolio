"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, type PartnerLead } from "@/lib/supabase";
import { refLink } from "@/lib/referral";

// Шлях анкети: нова → спілкуємось → клієнт погодився → виплачено (або закрито)
const STATUSES = [
  { key: "new", label: "Нова" },
  { key: "talking", label: "Спілкуємось" },
  { key: "deal", label: "Клієнт погодився" },
  { key: "paid", label: "Виплачено" },
  { key: "closed", label: "Закрито" },
];

const statusLabel = (key?: string) => STATUSES.find((s) => s.key === key)?.label ?? "Нова";

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleString("uk-UA", { dateStyle: "short", timeStyle: "short" }) : "";

type Notice = { kind: "ok" | "err"; text: string } | null;

export default function PartnersAdminPage() {
  const supabase = getSupabase();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [leads, setLeads] = useState<PartnerLead[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [filter, setFilter] = useState<string>("all");
  // Скільки заявок прийшло за посиланням кожного партнера: { ref_code: кількість }
  const [refCounts, setRefCounts] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState<string>("");

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("partner_leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error)
      setNotice({
        kind: "err",
        text:
          "Не вдалося завантажити анкети: " +
          error.message +
          ". Чи виконано db/partner_leads.sql у Supabase?",
      });
    else setLeads((data ?? []) as PartnerLead[]);

    // Рахуємо заявки за міткою кожного партнера
    const { data: siteLeads } = await supabase.from("leads").select("ref_code");
    if (siteLeads) {
      const counts: Record<string, number> = {};
      for (const row of siteLeads as { ref_code: string }[]) {
        if (row.ref_code) counts[row.ref_code] = (counts[row.ref_code] ?? 0) + 1;
      }
      setRefCounts(counts);
    }
  }, [supabase]);

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

  if (!supabase) {
    return (
      <main className="admin">
        <div className="wrap">
          <div className="admin-card admin-login">
            <h1>Анкети партнерів</h1>
            <p className="admin-note">
              Supabase ще не підключено. Потрібні змінні <code>NEXT_PUBLIC_SUPABASE_URL</code> і{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
            </p>
          </div>
        </div>
      </main>
    );
  }

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

  // Вхід — той самий, що й для кейсів
  if (!session) {
    return (
      <main className="admin">
        <div className="wrap">
          <div className="admin-card admin-login">
            <h1>Потрібен вхід</h1>
            <p className="admin-note" style={{ marginBottom: 18 }}>
              Анкети партнерів бачить лише власник сайту.
            </p>
            <a href="/admin" className="btn btn--primary">
              <i className="fa-solid fa-right-to-bracket"></i>Увійти в адмінку
            </a>
          </div>
        </div>
      </main>
    );
  }

  const setStatus = async (lead: PartnerLead, status: string) => {
    if (!lead.id) return;
    setBusy(true);
    const { error } = await supabase.from("partner_leads").update({ status }).eq("id", lead.id);
    if (error) setNotice({ kind: "err", text: "Не вдалося змінити статус: " + error.message });
    else {
      setNotice(null);
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    }
    setBusy(false);
  };

  const remove = async (lead: PartnerLead) => {
    if (!lead.id) return;
    if (!window.confirm(`Видалити анкету «${lead.name}»? Дію не можна скасувати.`)) return;
    setBusy(true);
    const { error } = await supabase.from("partner_leads").delete().eq("id", lead.id);
    if (error) setNotice({ kind: "err", text: "Не вдалося видалити: " + error.message });
    else {
      setNotice({ kind: "ok", text: "Анкету видалено." });
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
    }
    setBusy(false);
  };

  const copyLink = async (code: string) => {
    try {
      await navigator.clipboard.writeText(refLink(code));
      setCopied(code);
      setTimeout(() => setCopied(""), 2500);
    } catch {
      // буфер недоступний — посилання видно на екрані
    }
  };

  const shown = filter === "all" ? leads : leads.filter((l) => (l.status ?? "new") === filter);
  const newCount = leads.filter((l) => (l.status ?? "new") === "new").length;

  return (
    <main className="admin">
      <div className="wrap">
        <div className="admin-head">
          <h1>
            Анкети партнерів{" "}
            {newCount > 0 && <span className="adm-badge">{newCount} нових</span>}
          </h1>
          <div className="admin-actions">
            <a href="/admin/leads" className="btn btn--ghost btn--sm">
              <i className="fa-solid fa-inbox"></i>Заявки
            </a>
            <a href="/admin" className="btn btn--ghost btn--sm">
              <i className="fa-solid fa-images"></i>Кейси
            </a>
          </div>
        </div>

        {notice && <div className={`admin-status ${notice.kind}`}>{notice.text}</div>}

        <div className="adm-filters">
          <button
            className={`pn-chip adm-chip${filter === "all" ? " on" : ""}`}
            onClick={() => setFilter("all")}
          >
            Усі ({leads.length})
          </button>
          {STATUSES.map((s) => {
            const n = leads.filter((l) => (l.status ?? "new") === s.key).length;
            return (
              <button
                key={s.key}
                className={`pn-chip adm-chip${filter === s.key ? " on" : ""}`}
                onClick={() => setFilter(s.key)}
              >
                {s.label} ({n})
              </button>
            );
          })}
        </div>

        <div className="admin-card">
          {shown.length === 0 && (
            <p className="admin-note">
              {leads.length === 0
                ? "Анкет поки немає. Вони з'являться тут, щойно хтось заповнить форму в блоці «Партнерам»."
                : "У цьому статусі анкет немає."}
            </p>
          )}

          {shown.map((l) => {
            const open = openId === l.id;
            return (
              <div key={l.id} className={`adm-lead${open ? " open" : ""}`}>
                <div className="adm-lead__row" onClick={() => setOpenId(open ? null : l.id ?? null)}>
                  <span className={`adm-dot s-${l.status ?? "new"}`}></span>
                  <div className="admin-item__txt">
                    <b>
                      {l.name}
                      {l.has_client && (
                        <span className="adm-tag">
                          <i className="fa-solid fa-user-plus"></i>є клієнт
                        </span>
                      )}
                    </b>
                    <span>
                      {l.method}: {l.contact} · {l.who || "—"} · {formatDate(l.created_at)}
                      {l.ref_code && refCounts[l.ref_code] ? (
                        <b className="adm-refcount"> · привів {refCounts[l.ref_code]}</b>
                      ) : null}
                    </span>
                  </div>
                  <span className="adm-status-pill">{statusLabel(l.status)}</span>
                  <i className={`fa-solid fa-chevron-${open ? "up" : "down"} adm-caret`}></i>
                </div>

                {open && (
                  <div className="adm-lead__body">
                    <div className="adm-kv">
                      <b>Спосіб зв&apos;язку</b>
                      <span>
                        {l.method}: {l.contact}
                      </span>
                    </div>
                    <div className="adm-kv">
                      <b>Чим займається</b>
                      <span>{l.who || "—"}</span>
                    </div>
                    <div className="adm-kv">
                      <b>Виплата</b>
                      <span>{l.payout || "—"}</span>
                    </div>
                    {l.ref_code && (
                      <div className="adm-kv">
                        <b>Персональне посилання</b>
                        <span className="adm-ref">
                          <code>{refLink(l.ref_code)}</code>
                          <button
                            type="button"
                            className="btn btn--ghost btn--sm"
                            onClick={() => copyLink(l.ref_code!)}
                          >
                            <i className={copied === l.ref_code ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
                            {copied === l.ref_code ? "Скопійовано" : "Копіювати"}
                          </button>
                          <span className="adm-ref__count">
                            заявок за ним: <b>{refCounts[l.ref_code] ?? 0}</b>
                          </span>
                        </span>
                      </div>
                    )}
                    {l.has_client && (
                      <>
                        <div className="adm-kv">
                          <b>Клієнт: ніша</b>
                          <span>{l.client_niche || "—"}</span>
                        </div>
                        <div className="adm-kv">
                          <b>Клієнт: місто</b>
                          <span>{l.client_city || "—"}</span>
                        </div>
                        <div className="adm-kv">
                          <b>Клієнт: контакт</b>
                          <span>{l.client_contact || "—"}</span>
                        </div>
                        <div className="adm-kv">
                          <b>Коли потрібен сайт</b>
                          <span>{l.client_when || "—"}</span>
                        </div>
                      </>
                    )}
                    {l.message && (
                      <div className="adm-kv">
                        <b>Коментар</b>
                        <span>{l.message}</span>
                      </div>
                    )}

                    <div className="admin-actions" style={{ marginTop: 14 }}>
                      <select
                        className="adm-select"
                        value={l.status ?? "new"}
                        disabled={busy}
                        onChange={(e) => setStatus(l, e.target.value)}
                      >
                        {STATUSES.map((s) => (
                          <option key={s.key} value={s.key}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      <button
                        className="btn btn--danger btn--sm"
                        disabled={busy}
                        onClick={() => remove(l)}
                      >
                        <i className="fa-solid fa-trash"></i>Видалити
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
