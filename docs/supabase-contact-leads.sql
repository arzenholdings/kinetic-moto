create extension if not exists pgcrypto;

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  source text not null default 'contact_form',
  internal_notes text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

create index if not exists contact_leads_email_idx
  on public.contact_leads (email);

alter table public.contact_leads
  add column if not exists internal_notes text;

alter table public.contact_leads
  add column if not exists reviewed_at timestamptz;

alter table public.contact_leads enable row level security;
