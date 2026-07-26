-- Скільки місця займає база. Виконати у Supabase → SQL Editor → New query → Run.
-- Нічого не змінює, лише показує — можна запускати будь-коли.

-- 1. Уся база одним числом (ліміт безкоштовного тарифу — 500 MB)
select pg_size_pretty(pg_database_size(current_database())) as "уся база";

-- 2. Де саме лежать ті мегабайти — по схемах.
--    public — ваші дані. auth, storage, realtime, extensions — службове,
--    його створює сам Supabase, і воно займає місце навіть у порожньому проєкті.
select
  n.nspname                                          as "схема",
  pg_size_pretty(sum(pg_total_relation_size(c.oid))) as "займає"
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where c.relkind in ('r', 'm')
group by n.nspname
having sum(pg_total_relation_size(c.oid)) > 0
order by sum(pg_total_relation_size(c.oid)) desc;

-- 3. Скільки займає кожна таблиця і скільки в ній рядків
select
  c.relname                                        as "таблиця",
  pg_size_pretty(pg_total_relation_size(c.oid))    as "займає всього",
  pg_size_pretty(pg_relation_size(c.oid))          as "з них дані",
  coalesce(s.n_live_tup, 0)                        as "рядків"
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
left join pg_stat_user_tables s on s.relid = c.oid
where n.nspname = 'public'
  and c.relkind = 'r'
order by pg_total_relation_size(c.oid) desc;

-- 4. Скільки важить у середньому один рядок заявки —
--    щоб прикинути, на скільки вистачить 500 MB
select
  count(*)                                                     as "заявок зараз",
  pg_size_pretty(pg_total_relation_size('public.leads'))       as "займають",
  case when count(*) > 0
       then pg_size_pretty((pg_total_relation_size('public.leads') / count(*))::bigint)
       else '—' end                                            as "одна заявка"
from public.leads;
