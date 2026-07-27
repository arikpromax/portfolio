-- Позначка стану кейса: запущений сайт чи ще в розробці.
-- Порожнє значення = сайт працює, значка на картці немає.
-- Виконати у Supabase → SQL Editor → New query → Run.

alter table public.cases add column if not exists status text not null default '';

-- Дозволені значення: '' (запущений) або 'dev' (у розробці)
alter table public.cases drop constraint if exists cases_status_check;
alter table public.cases add constraint cases_status_check
  check (status in ('', 'dev'));
