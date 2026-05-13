# Real Reseller Catalog Plan

Kinetic Moto is a reseller/dealer storefront for brand-name electric motorcycles and high-performance e-motos. The site should start ecommerce-first and grow into ecommerce plus local showroom, pickup, service, and support.

## Positioning

The store should combine two patterns:

- broad ecommerce catalog depth, similar to e-moto specialty retailers
- local shop trust, service, and "come see us" support

The site should not present invented Kinetic Moto bike models as if they are real inventory. The Phase 6 generated renders are acceptable temporary concept placeholders only while real SKUs and approved assets are being sourced.

## Asset Policy

Do not scrape competitor product images or copy.

Approved asset sources:

- manufacturer press kits or product pages with allowed dealer use
- distributor/supplier media provided to Kinetic Moto
- brand-approved dealer portal assets
- original photos shot by Kinetic Moto
- customer/shop photos with written permission
- licensed stock or generated lifestyle images for non-product scenes

Not approved:

- copying images from competitor stores
- copying product descriptions from competitor stores
- using third-party product photography without permission
- listing a product as available before source, price, and fulfillment path are confirmed

## Catalog Migration Path

1. Keep the current six concept bikes as temporary placeholders only.
2. Build the real product matrix below.
3. Pick the first 6-10 real launch SKUs.
4. Replace `lib/bikes.ts` with real reseller products.
5. Update Supabase product seed SQL.
6. Add brand/category filters once there are enough SKUs.
7. Add "visit showroom", "local pickup", "assembly", and "service support" calls to action.

## Launch Product Matrix

Use this table as the source of truth before adding a product to the live storefront.

| Status | Brand | Model | Category | Supplier URL | Official media source | Asset permission | Price/MSRP | Key specs | Fulfillment | Local support notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Candidate | E Ride Pro | Pro SR | Performance off-road | TBD | Manufacturer/dealer portal needed | Needed | TBD | TBD | TBD | Assembly, setup, service fit TBD |
| Candidate | E Ride Pro | Pro SS / 3.0 | Off-road / trail | TBD | Manufacturer/dealer portal needed | Needed | TBD | TBD | TBD | Popular launch SKU candidate |
| Candidate | E Ride Pro | Mini | Youth / compact | TBD | Manufacturer/dealer portal needed | Needed | TBD | TBD | TBD | Needs safety/legal positioning |
| Candidate | Rawrr | Mantis X Pro | Off-road / trail | TBD | Manufacturer/dealer portal needed | Needed | TBD | TBD | TBD | Candidate for high-intent buyers |
| Candidate | Talaria | Sting MX5 | Off-road / trail | TBD | Manufacturer/dealer portal needed | Needed | TBD | TBD | TBD | Confirm dealer/source path |
| Candidate | Surron | Light Bee X | Off-road / trail | TBD | Manufacturer/dealer portal needed | Needed | TBD | TBD | TBD | Confirm authorized supply |
| Candidate | Surron | Ultra Bee | Off-road / enduro | TBD | Manufacturer/dealer portal needed | Needed | TBD | TBD | TBD | Premium support/service candidate |
| Candidate | Ventus | V1+ / One | Performance off-road | TBD | Manufacturer/dealer portal needed | Needed | TBD | TBD | TBD | Confirm naming and specs |
| Candidate | Altis | Sigma | Performance off-road | TBD | Manufacturer/dealer portal needed | Needed | TBD | TBD | TBD | Strong premium SKU candidate |
| Candidate | 79Bike | Falcon Pro | Performance off-road | TBD | Manufacturer/dealer portal needed | Needed | TBD | TBD | TBD | Confirm source and support coverage |

## Required Fields For Real Products

Each live SKU needs:

- brand
- model
- slug
- category
- legal/use classification note
- price or "call for price"
- availability status
- range or battery capacity
- motor power
- top speed, if appropriate
- charge time
- warranty/support note
- approved image set
- supplier URL/internal source
- local support/service note

## Site Changes For Reseller Direction

Homepage:

- keep ecommerce entry point
- add "shop online, pick up locally, get support from real people"
- include showroom/service trust band
- use lifestyle/shop imagery instead of only product renders

Catalog:

- replace concept model names with real brands/models
- add brand and category labels
- add availability labels: `In stock`, `Preorder`, `Call to confirm`
- add "Visit showroom" and "Ask about setup" CTAs

Product detail:

- add brand/model
- add approved product image gallery
- add key specs table
- add assembly/service/support section
- add local pickup or delivery note
- add legal/off-road disclaimer where needed

Admin/leads:

- keep existing lead flow
- use `bike_slug` for real SKU interest
- keep financing interest, purchase timeframe, priority, and follow-up

## Copy Direction

Use this voice:

- knowledgeable local shop
- ecommerce convenience
- no hype that sounds unsafe
- clear about off-road vs street/legal use
- encourages riders to call, visit, or ask about setup

Example positioning:

> Shop brand-name electric motorcycles online, then get real setup, service, and local support from Kinetic Moto.

## Next Inputs Needed

To safely replace the temporary concept catalog, collect:

- confirmed launch brands
- confirmed launch models
- wholesale/supplier source for each model
- whether Kinetic Moto is authorized to use official media
- current price and availability
- shop address or service area, when ready
- phone number and preferred contact email

## Related Tracks

- `docs/manufacturer-outreach.md` tracks brand/dealer account outreach and email templates.
- `docs/merchant-support-plan.md` tracks checkout, financing, BNPL, wire/manual invoice, and merchant underwriting.
