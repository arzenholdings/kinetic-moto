# Kinetic Moto Setup Inventory

This file tracks the setup issues discovered during Phase 3 so future Kinetic Moto builds can start cleanly. Do not store secret values here.

## Current Integration State

- Local app builds and lints successfully.
- Supabase URL is known and stored in `.env.local`.
- Supabase secret API key is stored in `.env.local`.
- Resend API key was corrected locally from the full key file.
- Supabase REST access works from the Node/app runtime.
- Supabase Phase 3 SQL migrations have been applied.
- Production env vars are configured in Vercel for Supabase, Resend, and admin auth.
- `https://kinetic-moto.com` passes the Phase 4 production smoke check.

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
- For a safer one-paste retry, run `docs/supabase-phase3-safe-retry.sql`.
- Confirm `contact_leads` has intent, financing, status, priority, follow-up, notes, and review columns.
- Confirm `bikes` exists and is seeded.

Current state:

- The migration has been applied in production Supabase.
- `contact_leads` has the Phase 3 lead fields.
- `bikes` has 6 seeded rows.

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
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
   - Optional: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - Optional: `TURNSTILE_SECRET_KEY`
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

## Phase 4 Hardening Notes

- `/admin/leads` is protected by `proxy.ts`.
- `/admin/leads` now has a login form backed by a signed, HttpOnly session cookie.
- `/api/admin/*` routes are protected by the same admin session proxy.
- Contact submissions include a hidden honeypot field, a minimum submit time, and a small server-side rate limit.
- Cloudflare Turnstile can be enabled with `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
- Vercel Web Analytics is wired in through `@vercel/analytics`.
- CTA and contact-form conversion events are tracked with Vercel Analytics.
- `robots.ts` excludes `/admin/`, and `sitemap.ts` publishes the storefront, catalog, bike details, and contact page.
- `docs/launch-checklist.md` is the current go-live verification checklist.

## Phase 6 Catalog Notes

- The six-bike catalog now has stronger sellable descriptions in `lib/bikes.ts`.
- The generated raster bike renders in `public/bikes/` replaced the earlier placeholder-style artwork.
- Bike cards and the homepage hero now render catalog imagery directly.
- Supabase `bikes.description` rows were updated through the REST API so production content matches local fallback content.

## Phase 7 Reseller Pivot Notes

- Kinetic Moto should be treated as a reseller/dealer storefront for real brand-name electric motorcycles.
- Do not scrape product photos or descriptions from competitor stores.
- Use `docs/real-reseller-catalog-plan.md` as the source of truth for replacing temporary concept bikes with real SKUs.
- Approved product assets should come from manufacturer/dealer portals, supplier-provided media, original Kinetic Moto photos, or licensed assets.
- The public site now has merchant-review policy pages at `/policies/*`, an `/about` page, and footer links.
- Public copy now frames existing catalog entries as launch previews until authorized real SKUs, photos, pricing, and specifications are approved.
