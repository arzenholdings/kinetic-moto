-- Kinetic Moto Phase 3 safe retry migration
-- Use this if Supabase warns/fails on destructive trigger replacement.
-- Run in Supabase SQL Editor for project aljdtiyucqxrqdeyyuxq.

-- === Contact leads ===
create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  source text not null default 'contact_form',
  bike_slug text,
  interest_type text not null default 'general',
  financing_interest boolean not null default false,
  budget_range text,
  purchase_timeframe text,
  status text not null default 'new',
  priority text not null default 'normal',
  follow_up_at timestamptz,
  internal_notes text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

create index if not exists contact_leads_email_idx
  on public.contact_leads (email);

alter table public.contact_leads
  add column if not exists bike_slug text;

alter table public.contact_leads
  add column if not exists interest_type text not null default 'general';

alter table public.contact_leads
  add column if not exists financing_interest boolean not null default false;

alter table public.contact_leads
  add column if not exists budget_range text;

alter table public.contact_leads
  add column if not exists purchase_timeframe text;

alter table public.contact_leads
  add column if not exists status text not null default 'new';

alter table public.contact_leads
  add column if not exists priority text not null default 'normal';

alter table public.contact_leads
  add column if not exists follow_up_at timestamptz;

alter table public.contact_leads
  add column if not exists internal_notes text;

alter table public.contact_leads
  add column if not exists reviewed_at timestamptz;

alter table public.contact_leads
  add column if not exists updated_at timestamptz not null default now();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $kinetic$
begin
  create trigger contact_leads_set_updated_at
  before update on public.contact_leads
  for each row
  execute function public.set_updated_at();
exception
  when duplicate_object then null;
end;
$kinetic$;

create index if not exists contact_leads_bike_slug_idx
  on public.contact_leads (bike_slug);

create index if not exists contact_leads_status_priority_idx
  on public.contact_leads (status, priority);

create index if not exists contact_leads_follow_up_at_idx
  on public.contact_leads (follow_up_at);

alter table public.contact_leads enable row level security;


-- === Products / bikes ===
create table if not exists public.bikes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  range text not null,
  top_speed text not null,
  charge_time text not null,
  price text not null,
  description text not null,
  accent text not null,
  media jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $kinetic$
begin
  create trigger bikes_set_updated_at
  before update on public.bikes
  for each row
  execute function public.set_updated_at();
exception
  when duplicate_object then null;
end;
$kinetic$;

create index if not exists bikes_active_created_at_idx
  on public.bikes (active, created_at asc);

create index if not exists bikes_slug_idx
  on public.bikes (slug);

insert into public.bikes (
  slug,
  name,
  category,
  range,
  top_speed,
  charge_time,
  price,
  description,
  accent,
  media,
  active
) values
(
  'volt-rs',
  'Volt RS',
  'Street performance',
  '180 mi',
  '128 mph',
  '28 min',
  '$18,900',
  'A compact streetfighter tuned for quick launches, canyon exits, and weekday commutes. Volt RS pairs a low-mounted battery pack with sharp steering geometry and configurable ride modes.',
  'from-orange-500 via-amber-500 to-stone-800',
  '{"images":[{"src":"/bikes/volt-rs-side.png","alt":"Volt RS side profile electric motorcycle render","width":1200,"height":800},{"src":"/bikes/volt-rs-front.png","alt":"Volt RS front three-quarter electric motorcycle render","width":1200,"height":800}]}'::jsonb,
  true
),
(
  'terra-x',
  'Terra X',
  'Adventure',
  '210 mi',
  '105 mph',
  '34 min',
  '$21,400',
  'A long-range dual-sport built for riders who split their week between pavement, gravel, and fire-road miles. Terra X adds upright ergonomics, protected bodywork, and utility mounting points.',
  'from-emerald-500 via-lime-500 to-stone-800',
  '{"images":[{"src":"/bikes/terra-x-side.png","alt":"Terra X side profile adventure electric motorcycle render","width":1200,"height":800},{"src":"/bikes/terra-x-front.png","alt":"Terra X front three-quarter adventure electric motorcycle render","width":1200,"height":800}]}'::jsonb,
  true
),
(
  'pulse-c',
  'Pulse C',
  'Urban commuter',
  '145 mi',
  '92 mph',
  '24 min',
  '$14,800',
  'A lightweight commuter with quiet acceleration, simple charging, and city-friendly proportions. Pulse C is built for daily riders who want predictable range without giving up weekend fun.',
  'from-sky-500 via-cyan-400 to-stone-800',
  '{"images":[{"src":"/bikes/pulse-c-side.png","alt":"Pulse C side profile urban electric motorcycle render","width":1200,"height":800},{"src":"/bikes/pulse-c-front.png","alt":"Pulse C front three-quarter urban electric motorcycle render","width":1200,"height":800}]}'::jsonb,
  true
),
(
  'vector-gt',
  'Vector GT',
  'Grand touring',
  '240 mi',
  '118 mph',
  '38 min',
  '$24,600',
  'A composed electric tourer for longer rides, passenger comfort, and fast highway passing. Vector GT brings wind protection, stable geometry, and the largest estimated pack in the lineup.',
  'from-violet-500 via-fuchsia-500 to-stone-800',
  '{"images":[{"src":"/bikes/vector-gt-side.png","alt":"Vector GT side profile touring electric motorcycle render","width":1200,"height":800},{"src":"/bikes/vector-gt-front.png","alt":"Vector GT front three-quarter touring electric motorcycle render","width":1200,"height":800}]}'::jsonb,
  true
),
(
  'ridge-mx',
  'Ridge MX',
  'Trail',
  '120 mi',
  '84 mph',
  '22 min',
  '$13,900',
  'A quiet trail platform for technical terrain, steep climbs, and quick line changes. Ridge MX keeps weight low and response immediate for riders who care about control more than noise.',
  'from-yellow-500 via-orange-500 to-stone-800',
  '{"images":[{"src":"/bikes/ridge-mx-side.png","alt":"Ridge MX side profile trail electric motorcycle render","width":1200,"height":800},{"src":"/bikes/ridge-mx-front.png","alt":"Ridge MX front three-quarter trail electric motorcycle render","width":1200,"height":800}]}'::jsonb,
  true
),
(
  'metro-s',
  'Metro S',
  'City sport',
  '155 mi',
  '98 mph',
  '26 min',
  '$15,700',
  'A compact city sport bike with lively acceleration, confident brakes, and daily-friendly ergonomics. Metro S is aimed at dense streets, short hops, and riders who want an easy electric step-up.',
  'from-rose-500 via-red-500 to-stone-800',
  '{"images":[{"src":"/bikes/metro-s-side.png","alt":"Metro S side profile city electric motorcycle render","width":1200,"height":800},{"src":"/bikes/metro-s-front.png","alt":"Metro S front three-quarter city electric motorcycle render","width":1200,"height":800}]}'::jsonb,
  true
)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  range = excluded.range,
  top_speed = excluded.top_speed,
  charge_time = excluded.charge_time,
  price = excluded.price,
  description = excluded.description,
  accent = excluded.accent,
  media = excluded.media,
  active = excluded.active;


alter table public.bikes enable row level security;

