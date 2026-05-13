# Merchant Support And Financing Plan

Goal: give Kinetic Moto the same practical buying options customers expect from mature e-moto stores while staying underwritten, compliant, and supportable.

## Target Checkout Options

Kinetic Moto should support:

- credit/debit cards
- Apple Pay
- Google Pay
- Shop Pay
- PayPal
- PayPal Pay Later, if approved
- Affirm or Shop Pay Installments, if approved
- Klarna, if approved
- Afterpay/Clearpay, if approved
- manual invoice / wire transfer for high-ticket bikes
- deposit/preorder workflow for bikes not in stock
- local pickup/showroom payment support

## Recommended Platform Direction

Short-term:

- Keep the Next/Vercel site as the brand and lead-capture storefront.
- Add "Request invoice", "Ask about financing", and "Reserve / preorder" lead flows.
- Do not process high-ticket vehicle checkout until merchant underwriting is clear.

Medium-term:

- Either add a Shopify checkout/catalog backend or integrate a commerce provider that can support powersports/e-moto categories.
- Keep Next.js as the premium frontend if Shopify headless makes sense.

## Merchant Underwriting Packet

Prepare this before applying for payment/financing providers:

- legal business name
- EIN
- DBA
- business bank account
- business address
- owner identity/KYC docs
- website URL: `https://kinetic-moto.com`
- product category explanation
- refund/return policy
- shipping/freight policy
- warranty/disclaimer language
- privacy policy
- terms of service
- expected monthly volume
- average order value
- highest ticket item
- chargeback prevention process
- supplier/dealer authorization proof

## Policies Needed Before Full Checkout

Baseline policy pages now exist in the app and are linked from the footer:

- `/policies/terms`
- `/policies/privacy`
- `/policies/shipping-pickup`
- `/policies/returns-cancellations`
- `/policies/warranty`
- `/policies/legal`
- `/policies/financing`

Before processing full vehicle checkout, review these pages with the final supplier, merchant, and legal requirements.

## Financing Provider Notes

### Shop Pay Installments / Affirm

Likely easiest if Kinetic Moto uses Shopify or a Shopify checkout path. For a Next-first storefront, investigate whether checkout should hand off to Shopify for financed orders.

Questions:

- Are e-motos/powersports allowed?
- Are high-ticket carts approved?
- What is the max financeable amount?
- Any restrictions for off-road vehicles?

### Klarna

Common ecommerce BNPL option. Needs underwriting and category review.

Questions:

- Are electric motorcycles/e-motos allowed?
- What are cart limits?
- Is monthly financing available?
- Any prohibited-product restrictions?

### Afterpay / Clearpay

Useful for lower-ticket accessories and possibly deposits, but high-ticket bikes may exceed practical limits.

Questions:

- Max transaction amount?
- Powersports/e-moto category allowed?
- Can it be used for deposits/accessories only?

### PayPal

Useful as a trust signal and backup method. PayPal Pay Later may be available after approval.

Questions:

- Are e-motos allowed?
- Any reserves/holds expected?
- Can PayPal be used for deposits/invoices?

### Wire / Manual Invoice

Useful for high-ticket vehicles and preorder deposits.

Requirements:

- written invoice
- clear cancellation policy
- inventory/fulfillment confirmation
- fraud checks
- signed acknowledgement for off-road/legal disclaimers

## Site Requirements For Payment Approval

Before applying widely, make the site show or finalize:

- real business contact email: `info@kinetic-moto.com`
- phone number, once available
- business address or service area, once available
- support response expectations
- policy pages linked in footer: done
- clear product availability
- clear refund/cancellation terms
- no fake/invented products listed as real inventory

## Implementation Track

1. Add policy pages to the current Next app. Done.
2. Add footer links for policies/contact. Done.
3. Add "Request invoice" and "Ask about financing" CTAs.
4. Decide Shopify checkout vs custom checkout.
5. Apply for Shopify Payments/Shop Pay and PayPal.
6. Apply for Affirm/Klarna/Afterpay after supplier authorization and policy pages are ready.
7. Add checkout/payment badges only after approval.

## Merchant Support Outreach Email

Subject: Merchant account / financing support for electric motorcycle reseller

```text
Hi [Provider Team],

I'm launching Kinetic Moto, an ecommerce-first reseller for brand-name electric motorcycles and high-performance e-motos, with local setup and support capabilities.

Website: https://kinetic-moto.com
Contact: info@kinetic-moto.com
Business location/service area: [City, State]

We are preparing our checkout and financing stack and want to confirm whether your platform supports our product category before going live with full vehicle checkout.

Could you confirm:

- whether electric motorcycles / off-road e-motos are supported
- any restricted-product rules for this category
- maximum transaction or financing amounts
- whether deposits/preorders are supported
- whether manual invoices are supported
- underwriting requirements for approval
- documents you need from us before review

We can provide business registration, supplier/dealer authorization, product policies, shipping/freight policies, warranty process, and expected volume/AOV.

Thanks,

[Name]
Kinetic Moto
info@kinetic-moto.com
https://kinetic-moto.com
```
