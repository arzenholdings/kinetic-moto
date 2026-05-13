# Service Delivery Playbook

Use this as the repeatable operating model for future "clean up and ship the half-built app" client work.

## Offer Shape

Sell the outcome as a go-live rescue and hardening sprint:

- inventory the current build
- make environment variables and secrets understandable
- connect database, email, hosting, and project tracking
- finish the core lead or revenue flow
- harden obvious launch risks
- leave the client with a checklist and clean handoff

Avoid selling the service as generic AI setup. The practical value is reliability, documentation, and a working production path.

## Intake

Collect these before starting:

- repository URL and local working directory
- production domain
- hosting provider and project name
- database provider and project name
- email provider and verified sending domain
- project tracker workspace and project name
- list of must-work user flows
- known broken areas and recent screenshots

Do not ask the client to understand every tool. Ask for access or screenshots, then turn that into a concrete inventory.

## Phase 1: Inventory

Create or update a setup inventory document:

- current repo, branch, and deployment target
- environment variables present and missing
- database tables and migrations present and missing
- external services configured and unconfigured
- current build, lint, and smoke-test status
- risky unknowns

Keep secrets out of git. Store only names, locations, and status.

## Phase 2: Core Flow

Pick one money-facing flow and make it work end to end.

For Kinetic Moto, that flow is:

- bike detail CTA
- contextual contact form
- Supabase lead storage
- Resend notification
- admin lead review and follow-up

For a services client, this may be:

- quote request
- booking
- onboarding form
- paid consultation
- service package inquiry

## Phase 3: Backend And Data

Normalize the backend:

- create idempotent SQL or migrations
- seed required production data
- add fallback behavior when env vars are missing
- keep server-side secrets server-side
- verify direct API writes and reads
- document how to rerun safely

## Phase 4: Launch Hardening

Before go-live, add the boring protections:

- protect admin/operator routes
- add basic spam controls to public forms
- add analytics
- add sitemap and robots rules
- run dependency audit
- run production smoke checks
- write a launch checklist

## Phase 5: Handoff

Finish with a small handoff package:

- what shipped
- what changed in production
- where secrets live
- how to verify the main flow
- how to recover from common failures
- open risks and next recommended work

For project tracking, create one Done issue per completed phase and one next-step issue for the next sellable slice.

## Reusable Verification

Run these checks for web apps:

```bash
npm run lint
npm run build
npm audit --omit=dev --audit-level=high
```

Then smoke test:

- homepage
- main conversion page
- form with realistic data
- protected admin page without auth
- protected admin page with auth
- sitemap
- robots

## Service Packaging Notes

Good package names:

- Go-Live Rescue Sprint
- Automation Cleanup Sprint
- Lead Flow Hardening
- Launch Readiness Audit

Useful tiers:

- Audit only: inventory, risks, and action plan
- Rescue sprint: fix the core flow and launch blockers
- Operate: weekly checks, small fixes, and reporting

The strongest niche is not "we build websites." It is "we turn messy, half-connected business systems into something your team can actually use."
