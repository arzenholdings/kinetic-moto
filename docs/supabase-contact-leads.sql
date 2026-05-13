create extension if not exists pgcrypto;

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

drop trigger if exists contact_leads_set_updated_at on public.contact_leads;

create trigger contact_leads_set_updated_at
before update on public.contact_leads
for each row
execute function public.set_updated_at();

create index if not exists contact_leads_bike_slug_idx
  on public.contact_leads (bike_slug);

create index if not exists contact_leads_status_priority_idx
  on public.contact_leads (status, priority);

create index if not exists contact_leads_follow_up_at_idx
  on public.contact_leads (follow_up_at);

alter table public.contact_leads enable row level security;
