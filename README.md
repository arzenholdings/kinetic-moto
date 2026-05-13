# Kinetic Moto

Next.js 16 storefront for the Kinetic Moto electric motorcycle catalog, contact flow, Supabase lead capture, merchant-readiness policy pages, and lightweight lead review admin.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and fill the values that apply:

```bash
RESEND_API_KEY=
CONTACT_EMAIL_TO=
CONTACT_EMAIL_FROM=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

The storefront and contact page still render when Supabase or Resend are missing. Lead storage, admin lead loading, and email delivery only run when their env vars are configured.

For the current production email setup, use `CONTACT_EMAIL_TO=info@kinetic-moto.com` and `CONTACT_EMAIL_FROM=info@kinetic-moto.com`. The Resend account must keep `kinetic-moto.com` verified before production contact emails will send.

`/admin/leads` is protected with an admin login session. Configure `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` in local and production environments before using the admin route. HTTP Basic Auth is still accepted as a fallback for scripted smoke tests.

Turnstile spam protection is optional. If `TURNSTILE_SECRET_KEY` is configured, contact submissions must include a valid Cloudflare Turnstile token. Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to render the widget on the contact form.

## Supabase Setup

Run these SQL files in Supabase SQL Editor:

1. `docs/supabase-contact-leads.sql`
2. `docs/supabase-products.sql`

For a one-paste setup, `docs/supabase-phase3-safe-retry.sql` combines both migrations and avoids replacing existing triggers destructively.

`supabase-contact-leads.sql` creates and migrates `public.contact_leads` with lead intent fields, status, priority, follow-up date, notes, and review timestamp.

`supabase-products.sql` creates `public.bikes` and seeds it with the current catalog from `lib/bikes.ts`. Product loading uses Supabase when configured and falls back to the local catalog when Supabase is unavailable or returns an unexpected response.

For repeatable launch work, see:

- `docs/setup-inventory.md` - current setup findings and fixes
- `docs/launch-checklist.md` - go-live verification checklist
- `docs/service-delivery-playbook.md` - reusable service delivery model
- `docs/real-reseller-catalog-plan.md` - real SKU sourcing and asset policy
- `docs/manufacturer-outreach.md` - dealer account outreach tracker and email templates
- `docs/merchant-support-plan.md` - checkout and financing approval plan

## Key Routes

- `/` - storefront home with featured bikes
- `/about` - reseller positioning and local support model
- `/bikes` - launch catalog preview
- `/bikes/[slug]` - bike detail pages with contact and financing CTAs
- `/contact` - contact, booking, and financing lead capture
- `/partners` - manufacturer and distributor outreach page
- `/policies` - terms, privacy, shipping, returns, warranty, financing, and legal pages
- `/admin/leads` - dense operator view for lead review and follow-up
