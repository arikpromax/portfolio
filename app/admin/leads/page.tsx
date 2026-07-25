"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, type Lead } from "@/lib/supabase";

const STATUSES = [
  { key: "new", label: "Нова" },
  { key: "talking", label: "Спілкуємось" },
  { key: "deal", label: "Домовились" },
  { key: "done", label: "Зроблено" },
  { key: "closed", label: "Закрито" },
];

const statusLabel = (key?: string) => STATUSES.find((s) => s.key === key)?.label ?? "Нова";

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleString("uk-UA", { dateStyle: "short", timeStyle: "short" }) : "";

type Notice = { kind: "ok" | "err"; text: string } | null;

export default function LeadsAdminPage() {
  const supabase = getSupabase();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [onlyRef, setOnlyRef] = useState(false);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error)
      setNotice({
        kind: "err",
        text: "Не вдалося завантажити заявки: " + error.message + ". Чи виконано db/referrals.sql?",
      });
    else setLeads((data ?? []) as Lead[]);
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
            <h1>Заявки з сайту</h1>
            <p className="admin-note">Supabase ще не підключено.</p>
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

  if (!session) {
    return (
      <main className="admin">
        <div className="wrap">
          <div className="admin-card admin-login">
            <h1>Потрібен вхід</h1>
            <p className="admin-note" style={{ marginBottom: 18 }}>
              Заявки бачить лише власник сайту.
            </p>
            <a href="/admin" className="btn btn--primary">
              <i className="fa-solid fa-right-to-bracket"></i>Увійти в адмінку
            </a>
          </div>
        </div>
      </main>
    );
  }

  const setStatus = async (lead: Lead, status: string) => {
    if (!lead.id) return;
    setBusy(true);
    const { error } = await supabase.from("leads").update({ status }).eq("id", lead.id);
    if (error) setNotice({ kind: "err", text: "Не вдалося змінити статус: " + error.message });
    else setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    setBusy(false);
  };

  const remove = async (lead: Lead) => {
    if (!lead.id) return;
    if (!window.confirm(`Видалити заявку «${lead.name}»? Дію не можна скасувати.`)) return;
    setBusy(true);
    const { error } = await supabase.from("leads").delete().eq("id", lead.id);
    if (error) setNotice({ kind: "err", text: "Не вдалося видалити: " + error.message });
    else {
      setNotice({ kind: "ok", text: "Заявку видалено." });
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
    }
    setBusy(false);
  };

  const shown = onlyRef ? leads.filter((l) => l.ref_code) : leads;
  const newCount = leads.filter((l) => (l.status ?? "new") === "new").length;
  const refCount = leads.filter((l) => l.ref_code).length;

  return (
    <main className="admin">
      <div className="wrap">
        <div className="admin-head">
          <h1>
            Заявки з сайту {newCount > 0 && <span className="adm-badge">{newCount} нових</span>}
          </h1>
          <div className="admin-actions">
            <a href="/admin/partners" className="btn btn--ghost btn--sm">
              <i className="fa-solid fa-handshake"></i>Партнери
            </a>
            <a href="/admin" className="btn btn--ghost btn--sm">
              <i className="fa-solid fa-images"></i>Кейси
            </a>
          </div>
        </div>

        {notice && <div className={`admin-status ${notice.kind}`}>{notice.text}</div>}

        <div className="adm-filters">
          <button
            className={`pn-chip adm-chip${!onlyRef ? " on" : ""}`}
            onClick={() => setOnlyRef(false)}
          >
            Усі ({leads.length})
          </button>
          <button
            className={`pn-chip adm-chip${onlyRef ? " on" : ""}`}
            onClick={() => setOnlyRef(true)}
          >
            Від партнерів ({refCount})
          </button>
        </div>

        <div className="admin-card">
          {shown.length === 0 && (
            <p className="admin-note">
              {leads.length === 0
                ? "Заявок поки немає. Вони з'являться тут, щойно хтось заповнить форму «Отримати розрахунок»."
                : "Заявок від партнерів поки немає."}
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
                      {l.ref_code && (
                        <span className="adm-tag">
                          <i className="fa-solid fa-link"></i>
                          {l.ref_code}
                        </span>
                      )}
                    </b>
                    <span>
                      {l.method}: {l.contact} · {l.business || "—"} · {formatDate(l.created_at)}
                    </span>
                  </div>
                  <span className="adm-status-pill">{statusLabel(l.status)}</span>
                  <i className={`fa-solid fa-chevron-${open ? "up" : "down"} adm-caret`}></i>
                </div>

                {open && (
                  <div className="adm-lead__body">
                    <div className="adm-kv">
                      <b>Зв&apos;язок</b>
                      <span>
                        {l.method}: {l.contact}
                      </span>
                    </div>
                    <div className="adm-kv">
                      <b>Тип бізнесу</b>
                      <span>{l.business || "—"}</span>
                    </div>
                    <div className="adm-kv">
                      <b>Хто привів</b>
                      <span>
                        {l.ref_code ? (
                          <>
                            партнер <b>{l.ref_code}</b> — винагорода 40%
                          </>
                        ) : (
                          "клієнт прийшов сам"
                        )}
                      </span>
                    </div>
                    {l.message && (
                      <div className="adm-kv">
                        <b>Повідомлення</b>
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
