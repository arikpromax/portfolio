-- Посилення доступу до даних: прибирає попередження Supabase «RLS policy always true»
-- і захищає таблиці від сміттєвих записів через публічний ключ сайту.
--
-- УВАГА: після цього файлу керувати даними зможе ЛИШЕ акаунт із поштою нижче.
-- Якщо колись заведете інший акаунт для адмінки — змініть пошту тут і виконайте файл ще раз.
--
-- Виконати у Supabase → SQL Editor → New query → Run.
-- Після виконання перевірте сайт: кейси мають лишитись на місці, форми — надсилатись.

-- 1. Хто власник: одна функція, щоб не дублювати пошту в кожній політиці
create or replace function public.is_owner()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'arikpro92@gmail.com';
$$;

-- 2. Знімаємо всі старі політики з трьох таблиць (нижче створимо натомість точніші)
do $$
declare
  t text;
  p record;
begin
  foreach t in array array['cases', 'leads', 'partner_leads'] loop
    for p in
      select policyname from pg_policies where schemaname = 'public' and tablename = t
    loop
      execute format('drop policy %I on public.%I', p.policyname, t);
    end loop;
  end loop;
end $$;

-- ============ cases: кейси на сайті ============
-- Читати може будь-хто — інакше сайт не покаже портфоліо
create policy "cases are public" on public.cases
  for select to anon, authenticated using (true);

-- Змінювати — лише власник
create policy "owner manages cases" on public.cases
  for all to authenticated using (public.is_owner()) with check (public.is_owner());

-- ============ leads: заявки з головної форми ============
-- Лишити заявку може будь-хто, але рядок мусить бути схожим на справжню заявку:
-- ім'я є й не гігантське, тексти в межах розумного, статус — лише початковий
create policy "anyone can submit a sane lead" on public.leads
  for insert to anon, authenticated
  with check (
    char_length(name) between 1 and 120
    and char_length(contact) <= 200
    and char_length(business) <= 200
    and char_length(message) <= 3000
    and char_length(ref_code) <= 40
    and status = 'new'
  );

-- Читати, вести й видаляти — лише власник
create policy "owner reads leads" on public.leads
  for select to authenticated using (public.is_owner());

create policy "owner updates leads" on public.leads
  for update to authenticated using (public.is_owner()) with check (public.is_owner());

create policy "owner deletes leads" on public.leads
  for delete to authenticated using (public.is_owner());

-- ============ partner_leads: анкети партнерів ============
create policy "anyone can submit a sane partner lead" on public.partner_leads
  for insert to anon, authenticated
  with check (
    char_length(name) between 1 and 120
    and char_length(contact) <= 200
    and char_length(who) <= 200
    and char_length(payout) <= 200
    and char_length(client_niche) <= 300
    and char_length(client_city) <= 120
    and char_length(client_contact) <= 200
    and char_length(client_when) <= 120
    and char_length(message) <= 3000
    and char_length(coalesce(ref_code, '')) <= 40
    and status = 'new'
  );

create policy "owner reads partner leads" on public.partner_leads
  for select to authenticated using (public.is_owner());

create policy "owner updates partner leads" on public.partner_leads
  for update to authenticated using (public.is_owner()) with check (public.is_owner());

create policy "owner deletes partner leads" on public.partner_leads
  for delete to authenticated using (public.is_owner());
