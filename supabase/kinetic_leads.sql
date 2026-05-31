create extension if not exists pgcrypto;

create table if not exists public.kinetic_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  selected_model text not null,
  purchase_timeframe text not null,
  financing_interest text not null,
  reserve_deposit_interest text not null,
  location text not null,
  message text,
  intent text not null,
  source text not null,
  status text not null default 'new'
);

alter table public.kinetic_leads enable row level security;

create index if not exists kinetic_leads_created_at_idx
  on public.kinetic_leads (created_at desc);

create index if not exists kinetic_leads_status_idx
  on public.kinetic_leads (status);
