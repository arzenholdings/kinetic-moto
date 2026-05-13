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

## Admin

- `/admin/leads` returns `401` without Basic Auth.
- `/admin/leads` returns `200` with the configured admin credentials.
- Credentials are stored only in local/Vercel environment variables.

## Contact Flow

- `/contact?bike=volt-rs&intent=financing&financing=true` preselects:
  - bike slug
  - financing interest
  - financing checkbox
- Honeypot submissions return success without storing a real lead.
- Too-fast submissions return `400`.
- Normal submissions return success, store in Supabase, and send email.

## SEO And Analytics

- `/robots.txt` returns `200` and disallows `/admin/`.
- `/sitemap.xml` returns `200` and includes:
  - homepage
  - `/bikes`
  - bike detail pages
  - `/contact`
- Vercel Web Analytics is enabled through `@vercel/analytics`.
- Page metadata has canonical and OpenGraph basics.

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
```

Expected:

- public routes return `200`
- `/admin/leads` returns `401` without credentials

Then submit one clearly marked test lead through the contact form and verify it in `/admin/leads`.
