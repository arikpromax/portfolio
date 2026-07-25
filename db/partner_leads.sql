-- Таблиця анкет партнерської програми (40% за приведеного клієнта).
-- Виконати один раз у Supabase → SQL Editor → New query → Run.

create table if not exists public.partner_leads (
  id             bigint generated always as identity primary key,
  created_at     timestamptz not null default now(),
  name           text not null,
  method         text not null default '',
  contact        text not null default '',
  who            text not null default '',
  payout         text not null default '',
  has_client     boolean not null default false,
  client_niche   text not null default '',
  client_city    text not null default '',
  client_contact text not null default '',
  client_when    text not null default '',
  message        text not null default '',
  status         text not null default 'new'
);

-- Нові анкети — зверху списку в адмінці
create index if not exists partner_leads_created_at_idx
  on public.partner_leads (created_at desc);

alter table public.partner_leads enable row level security;

-- Будь-хто з сайту може ЗАЛИШИТИ анкету…
drop policy if exists "anyone can submit partner lead" on public.partner_leads;
create policy "anyone can submit partner lead"
  on public.partner_leads for insert
  to anon, authenticated
  with check (true);

-- …але читати, змінювати статус і видаляти може лише власник (той, хто увійшов в адмінку)
drop policy if exists "owner can read partner leads" on public.partner_leads;
create policy "owner can read partner leads"
  on public.partner_leads for select
  to authenticated
  using (true);

drop policy if exists "owner can update partner leads" on public.partner_leads;
create policy "owner can update partner leads"
  on public.partner_leads for update
  to authenticated
  using (true) with check (true);

drop policy if exists "owner can delete partner leads" on public.partner_leads;
create policy "owner can delete partner leads"
  on public.partner_leads for delete
  to authenticated
  using (true);
