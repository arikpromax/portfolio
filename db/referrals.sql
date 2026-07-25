-- Реферальні посилання: у кожного партнера свій код (напр. oleg-k7d),
-- заявки з сайту зберігають цей код, тому видно, хто привів клієнта.
-- Виконати один раз у Supabase → SQL Editor → New query → Run.

-- 1. Персональний код партнера
alter table public.partner_leads add column if not exists ref_code text;

create unique index if not exists partner_leads_ref_code_key
  on public.partner_leads (ref_code)
  where ref_code is not null and ref_code <> '';

-- 2. Заявки з головної форми сайту (з міткою партнера, якщо вона є)
create table if not exists public.leads (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text not null,
  method     text not null default '',
  contact    text not null default '',
  business   text not null default '',
  message    text not null default '',
  ref_code   text not null default '',
  status     text not null default 'new'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_ref_code_idx on public.leads (ref_code);

alter table public.leads enable row level security;

-- Будь-хто з сайту може лишити заявку…
drop policy if exists "anyone can submit lead" on public.leads;
create policy "anyone can submit lead"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- …читати й вести їх може лише власник
drop policy if exists "owner can read leads" on public.leads;
create policy "owner can read leads"
  on public.leads for select
  to authenticated using (true);

drop policy if exists "owner can update leads" on public.leads;
create policy "owner can update leads"
  on public.leads for update
  to authenticated using (true) with check (true);

drop policy if exists "owner can delete leads" on public.leads;
create policy "owner can delete leads"
  on public.leads for delete
  to authenticated using (true);
