# Kinetic Moto

Next.js 16 storefront for the Kinetic Moto electric motorcycle catalog, contact flow, Supabase lead capture, and lightweight lead review admin.

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
```

The storefront and contact page still render when Supabase or Resend are missing. Lead storage, admin lead loading, and email delivery only run when their env vars are configured.

For the current production email setup, use `CONTACT_EMAIL_TO=info@kinetic-moto.com` and `CONTACT_EMAIL_FROM=info@kinetic-moto.com`. The Resend account must keep `kinetic-moto.com` verified before production contact emails will send.

## Supabase Setup

Run these SQL files in Supabase SQL Editor:

1. `docs/supabase-contact-leads.sql`
2. `docs/supabase-products.sql`

For a one-paste setup, `docs/supabase-phase3-safe-retry.sql` combines both migrations and avoids replacing existing triggers destructively.

`supabase-contact-leads.sql` creates and migrates `public.contact_leads` with lead intent fields, status, priority, follow-up date, notes, and review timestamp.

`supabase-products.sql` creates `public.bikes` and seeds it with the current catalog from `lib/bikes.ts`. Product loading uses Supabase when configured and falls back to the local catalog when Supabase is unavailable or returns an unexpected response.

## Key Routes

- `/` - storefront home with featured bikes
- `/bikes` - full bike catalog
- `/bikes/[slug]` - bike detail pages with contact and financing CTAs
- `/contact` - contact, booking, and financing lead capture
- `/admin/leads` - dense operator view for lead review and follow-up
