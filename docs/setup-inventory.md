# Kinetic Moto Setup Inventory

This file tracks the setup issues discovered during Phase 3 so future Kinetic Moto builds can start cleanly. Do not store secret values here.

## Current Integration State

- Local app builds and lints successfully.
- Supabase URL is known and stored in `.env.local`.
- Supabase secret API key is stored in `.env.local`.
- Resend API key was corrected locally from the full key file.
- Supabase REST access works from the Node/app runtime.
- Supabase SQL migrations have not been applied yet.

## Issues Found

### Supabase Env Vars Were Missing

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` were absent from `.env.local`, so the app correctly skipped lead storage and showed the admin unconfigured state.

Clean setup fix:

- Add `SUPABASE_URL` from Supabase Project Settings > General or API.
- Add the backend secret key from Supabase Project Settings > API Keys > Secret keys.
- Never commit `.env.local`.

### New Supabase Key Names Were Confusing

Supabase now shows `Publishable key` and `Secret keys`. The older docs and code often say `anon` and `service_role`.

Clean setup fix:

- Use the publishable key only for browser/client code.
- Use the secret key only in server/API routes.
- In this repo, store the secret key in `SUPABASE_SERVICE_ROLE_KEY` for compatibility with existing code.

### SQL Migrations Were Not Applied

The existing Supabase project had `contact_leads`, but only with old columns:

- `id`
- `name`
- `email`
- `phone`
- `message`
- `source`
- `created_at`

The `bikes` table did not exist.

Clean setup fix:

- Run `docs/supabase-contact-leads.sql`.
- Run `docs/supabase-products.sql`.
- Confirm `contact_leads` has intent, financing, status, priority, follow-up, notes, and review columns.
- Confirm `bikes` exists and is seeded.

### Project API Keys Cannot Run SQL

The Supabase `sb_secret_...` key can read and write rows through PostgREST, but it cannot create tables or alter schemas.

Clean setup fix:

- Use Supabase SQL Editor manually, or
- Use a Supabase Personal Access Token for the Management API, or
- Use the Postgres connection string with a database password.

### Vercel Env Vars Were Sensitive

The Vercel project had the expected env var names, but they were configured as sensitive variables. The CLI could list names but could not pull usable values locally.

Clean setup fix:

- Keep a private deployment inventory outside git with where each secret lives.
- Do not rely on `vercel env pull` for sensitive variables.
- After setting env vars in Vercel, also store local dev values in `.env.local`.

### Resend API Key Was Truncated

`.env.local` had a short invalid `RESEND_API_KEY`, causing Resend to return `401 API key is invalid`.

Clean setup fix:

- Use the full Resend key.
- Confirm contact email aliases are present:
  - `CONTACT_EMAIL_TO` or `CONTACT_TO_EMAIL`
  - `CONTACT_EMAIL_FROM` or `CONTACT_FROM_EMAIL`
- Submit one test lead after updating the key.

### Resend Domain And Recipient

The verified Resend sending domain on this account is currently `kinetic-moto.com`.

Clean setup fix:

- Use `CONTACT_TO_EMAIL=info@kinetic-moto.com`.
- Use `CONTACT_FROM_EMAIL=info@kinetic-moto.com`.
- If the sender or recipient must move to `kineticmotosports.com`, add and verify `kineticmotosports.com` in Resend first, then update both env vars.

### Browser Automation Could Not Type Into Email Field

The in-app browser automation driver hit a typing/fill quirk on the `type=email` input. This was not an app bug.

Clean setup fix:

- Test the UI route visually for prefill behavior.
- Test final submission with a direct POST to `/api/contact` when browser automation is blocked.

## Clean Build Checklist

1. Clone or open the repo.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Fill local env vars:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL_TO` or `CONTACT_TO_EMAIL`
   - `CONTACT_EMAIL_FROM` or `CONTACT_FROM_EMAIL`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Run Supabase SQL:
   - `docs/supabase-contact-leads.sql`
   - `docs/supabase-products.sql`
6. Run `npm run lint`.
7. Run `npm run build`.
8. Start the app with `npm run dev`.
9. Visit `/contact?bike=volt-rs&intent=financing&financing=true`.
10. Submit a clearly marked test lead.
11. Confirm the lead appears in `/admin/leads`.
12. Update status, priority, follow-up date, notes, and reviewed state.

## Reusable Client Offering Notes

This cleanup pattern is a real service candidate:

- inventory broken setup
- normalize env vars
- document secret ownership
- apply database migrations
- verify email/API integrations
- run route smoke tests
- leave a repeatable handoff document

The service should sell outcomes, not AI hype: "we make your half-built automation reliable, documented, and testable."
