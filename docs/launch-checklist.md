# Kinetic Moto Launch Checklist

Use this before any production launch or major go-live change.

## Environment

- Vercel Production has:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
  - `CONTACT_EMAIL_TO=info@kinetic-moto.com`
  - `CONTACT_EMAIL_FROM=info@kinetic-moto.com`
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - `ADMIN_SESSION_SECRET`
- Optional Cloudflare Turnstile vars are configured together:
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - `TURNSTILE_SECRET_KEY`
- `.env.local` has matching local development values.
- No `.env*` files are committed.

## Supabase

- `public.contact_leads` exists with Phase 3 fields.
- `public.bikes` exists and has 6 active seeded bikes.
- RLS is enabled on `public.contact_leads`.
- RLS is enabled on `public.bikes`.
- A test lead can be inserted through `/api/contact`.
- Admin updates persist:
  - status
  - priority
  - follow-up date
  - internal notes
  - reviewed timestamp

## Resend

- `kinetic-moto.com` is verified in Resend.
- `info@kinetic-moto.com` can be used as the sender.
- A test contact email arrives at `info@kinetic-moto.com`.
- Clearly marked smoke-test leads are removed after verification.

## Admin

- `/admin/leads` returns `401` without Basic Auth.
- `/admin/leads` redirects unauthenticated browser traffic to `/admin/login`.
- `/api/admin/*` returns `401` without an admin session.
- `/admin/leads` returns `200` after signing in with the configured admin credentials.
- Admin login attempts are rate limited.
- Credentials are stored only in local/Vercel environment variables.

## Contact Flow

- `/contact?bike=volt-rs&intent=financing&financing=true` preselects:
  - bike slug
  - financing interest
  - financing checkbox
- Honeypot submissions return success without storing a real lead.
- Too-fast submissions return `400`.
- Turnstile submissions return `400` when `TURNSTILE_SECRET_KEY` is configured and the token is missing or invalid.
- Normal submissions return success, store in Supabase, and send email.

## SEO And Analytics

- `/robots.txt` returns `200` and disallows `/admin/`.
- `/sitemap.xml` returns `200` and includes:
  - homepage
  - `/bikes`
  - bike detail pages
  - `/contact`
- Vercel Web Analytics is enabled through `@vercel/analytics`.
- Conversion events are tracked for catalog clicks, detail-page CTAs, and contact submission outcomes.
- Page metadata has canonical and OpenGraph basics.

## Catalog

- Homepage hero shows real catalog imagery rather than a placeholder drawing.
- `/bikes` cards show the primary image for each model.
- `/bikes/[slug]` gallery renders side and front images for each model.
- Supabase bike rows match the descriptions in `lib/bikes.ts`.

## Verification Commands

```bash
npm run lint
npm run build
npm audit --omit=dev --audit-level=high
```

## Production Smoke Test

```bash
curl -I https://kinetic-moto.com
curl -I https://kinetic-moto.com/bikes
curl -I https://kinetic-moto.com/bikes/volt-rs
curl -I https://kinetic-moto.com/contact?bike=volt-rs\\&intent=financing\\&financing=true
curl -I https://kinetic-moto.com/robots.txt
curl -I https://kinetic-moto.com/sitemap.xml
curl -I https://kinetic-moto.com/admin/leads
curl -I https://kinetic-moto.com/admin/login
```

Expected:

- public routes return `200`
- `/admin/leads` redirects to `/admin/login` without credentials
- `/admin/login` returns `200`

Then submit one clearly marked test lead through the contact form and verify it in `/admin/leads`.
